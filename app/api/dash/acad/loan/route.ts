import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { db } from '@/lib/loan-utils';  // Ensure you have a database utility file

interface LoanType {
  title: string;
  interestRate: number;
  loanLimit: number;
  maxTimePeriod: number;
}

export const loanTypes: LoanType[] = [
  {
    title: 'Personal Loan',
    interestRate: 8.5,
    loanLimit: 1000000,
    maxTimePeriod: 360, // in months (30 years)
  },
  {
    title: 'Student Loan',
    interestRate: 5.5,
    loanLimit: 1000000,
    maxTimePeriod: 360, // in months (5 years)
  },
];

export async function POST(request: NextRequest) {
  try {
    // Ensure content-type is application/json
    if (request.headers.get('content-type') !== 'application/json') {
      return NextResponse.json(
        { message: 'Invalid content type. Expected application/json.' },
        { status: 400 }
      );
    }

    // Parse the incoming request body
    const body = await request.json();
    console.log('Received body:', body);  // Log the received body for debugging

    const { accountNumber, loanType, principalAmount, collateral, timePeriod } = body;

    if (!accountNumber || !loanType || !principalAmount || !collateral || !timePeriod) {
      console.error('Missing fields:', body);  // Log missing fields
      return NextResponse.json(
        { message: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Connect to the database and get CustomerID using AccountNumber
    const connection = await db.getConnection();
    const [rows] = await connection.execute<any[]>(
      'SELECT CustomerID FROM Account WHERE AccountID = ?',
      [accountNumber]
    );

    if (rows.length === 0) {
      connection.release();
      return NextResponse.json(
        { message: 'Account not found.' },
        { status: 404 }
      );
    }

    const customerID = rows[0].CustomerID;

    // Find the selected loan type
    const selectedLoan = loanTypes.find(
      (loan) => loan.title === loanType
    );
    
    if (!selectedLoan) {
      connection.release();
      return NextResponse.json(
        { message: 'Invalid loan type.' },
        { status: 400 }
      );
    }

    // Check if the principal amount is within the loan limit
    if (principalAmount > selectedLoan.loanLimit) {
      connection.release();
      return NextResponse.json(
        { message: `Loan amount exceeds the limit of $${selectedLoan.loanLimit.toLocaleString()}.` },
        { status: 400 }
      );
    }

    // Check if the time period is within the allowed limit for the loan type
    if (timePeriod > selectedLoan.maxTimePeriod) {
      connection.release();
      return NextResponse.json(
        { message: `Loan term exceeds the maximum allowed period of ${selectedLoan.maxTimePeriod} months.` },
        { status: 400 }
      );
    }

    // Calculate the monthly payment using the loan formula
    const interestRate = selectedLoan.interestRate / 100; // Convert to decimal
    const monthlyRate = interestRate / 12; // Monthly interest rate
    const numberOfPayments = timePeriod; // Loan time period in months

    const monthlyPayment =
      (principalAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Insert the loan application into the database
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + timePeriod);

    const [result] = await connection.execute<any>(
      `INSERT INTO Loan (CustomerID, LoanType, PrincipalAmount, InterestRate, MonthlyPayment, StartDate, EndDate, Collateral)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        customerID,
        loanType,
        principalAmount,
        selectedLoan.interestRate,
        monthlyPayment.toFixed(2), // Round to 2 decimal places
        startDate,
        endDate,
        collateral,
      ]
    );

    connection.release();

    return NextResponse.json(
      {
        message: 'Loan application successful',
        loanID: result.insertId,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error in POST request:', error);  // Log the error details
    return NextResponse.json(
      { message: 'Error processing the request', error: (error as Error).message },
      { status: 500 }
    );
  }
}
