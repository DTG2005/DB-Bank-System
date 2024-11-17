import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { OkPacket, RowDataPacket } from 'mysql2';
import { db } from '@/lib/loan-utils';

interface LoanType {
  title: string;
  interestRate: number;
  loanLimit: number;
  maxTimePeriod: number;
}

export const loanTypes: LoanType[] = [
  {
    title: 'Personal Loan',
    interestRate: 8.99,
    loanLimit: 1000000,
    maxTimePeriod: 120, // in months (10 years)
  },
  {
    title: 'Student Loan',
    interestRate: 4.99,
    loanLimit: 100000,
    maxTimePeriod: 180, // in months (15 years)
  },
];

export async function GET(request: NextRequest) {
  return NextResponse.json(loanTypes);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accountNumber, loanType, principalAmount, collateral, timePeriod } = body;

    if (!accountNumber || !loanType || !principalAmount || !collateral || !timePeriod) {
      return NextResponse.json(
        { message: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Connect to the database and get CustomerID using AccountNumber
    const connection = await db.getConnection();
    const [rows] = await connection.execute<RowDataPacket[]>(
      `SELECT CustomerID FROM Account WHERE AccountNumber = ?`,
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
    const selectedLoan = loanTypes.find((loan) => loan.title === loanType);
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

    const [result] = await connection.execute<OkPacket>(
      `INSERT INTO Loan (CustomerID, LoanType, PrincipalAmount, Collateral, StartDate, EndDate, MonthlyPayment) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [customerID, loanType, principalAmount, collateral, startDate, endDate, monthlyPayment]
    );

    connection.release();

    if (result.affectedRows > 0) {
      return NextResponse.json(
        { message: 'Loan application submitted successfully.' },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: 'Failed to submit loan application.' },
        { status: 500 }
      );
    }

  } catch (error: any) {
    return NextResponse.json(
      { message: 'Error processing loan application: ' + error.message },
      { status: 500 }
    );
  }
}
