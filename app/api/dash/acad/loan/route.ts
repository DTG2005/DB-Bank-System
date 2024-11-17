import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { pool } from '@/lib/loan-utils';
import { addMonths, format } from 'date-fns';

// Create an Express application
const app = express();
const port = 3000;

// Body parser middleware to handle JSON requests
app.use(bodyParser.json());

// Interface for loan application request
interface LoanApplicationRequest {
  accountNumber: number;
  loanAmount: number;
  loanTerm: number; // in months
  selectedLoanType: string;
  loanPurpose: string;
  startDate: string; // in YYYY-MM-DD format
}

// Endpoint to handle loan application submission
app.post('/loan', async (req: Request<{}, {}, LoanApplicationRequest>, res: Response) => {
  const { 
    accountNumber, 
    loanAmount, 
    loanTerm, 
    selectedLoanType, 
    loanPurpose, 
    startDate 
  } = req.body;

  try {
    // Retrieve the CustomerID using the AccountNumber
    const customerQuery = `
      SELECT CustomerID 
      FROM Account 
      WHERE AccountNumber = ?
    `;
    
    const [customerResult] = await pool.query(customerQuery, [accountNumber]);
    const customerRows = customerResult as any[];
    
    if (!customerRows || customerRows.length === 0) {
      return res.status(404).json({ 
        message: 'Account not found.' 
      });
    }
    
    const customerID = customerRows[0].CustomerID;

    // Calculate the interest rate based on the loan type
    const interestRates: { [key: string]: number } = {
      personal: 8.5,
      student: 5.5,
    };

    const interestRate = interestRates[selectedLoanType] || 8.5; // Default to personal loan rate if invalid

    // Calculate monthly payment
    const monthlyPayment = calculateMonthlyPayment(loanAmount, loanTerm, interestRate);
    const totalPayment = monthlyPayment * loanTerm;

    // Calculate the end date
    const endDate = format(addMonths(new Date(startDate), loanTerm), 'yyyy-MM-dd');

    // Insert loan application into the Loan table
    const insertQuery = `
      INSERT INTO Loan (
        CustomerID, 
        LoanType, 
        PrincipleAmount, 
        InterestRate, 
        StartDate, 
        EndDate, 
        MonthlyPayment, 
        Collateral
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      customerID,
      selectedLoanType,
      loanAmount,
      interestRate,
      startDate,
      endDate,
      monthlyPayment,
      loanPurpose,
    ];

    // Execute the insert query
    const [insertResult] = await pool.query(insertQuery, values);
    const insertId = (insertResult as any).insertId;

    // Send the success response
    res.status(200).json({
      message: 'Loan application submitted successfully!',
      loanID: insertId,
      customerID: customerID,
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      startDate: startDate,
      endDate: endDate,
    });

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ 
      message: 'Error processing the loan application.',
      error: err instanceof Error ? err.message : 'Unknown error'
    });
  }
});

// Function to calculate the monthly payment
function calculateMonthlyPayment(principal: number, months: number, interestRate: number): number {
  const monthlyRate = (interestRate / 100) / 12;
  const numberOfPayments = months;

  const monthlyPayment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  return isNaN(monthlyPayment) ? 0 : monthlyPayment;
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
