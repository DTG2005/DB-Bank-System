import { NextRequest, NextResponse } from 'next/server';
import mysql2 from 'mysql2/promise';
import { FieldPacket } from 'mysql2';

// Create a MySQL connection pool using environment variables
export const db = mysql2.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Helper function to generate a random 16-digit credit card number
function generateCreditCardNumber() {
  const randomNumbers = Array.from({ length: 16 }, () => Math.floor(Math.random() * 10));
  return randomNumbers.join('');
}

// Helper function to calculate expiry date based on card type
function calculateExpiryDate(cardType: string) {
  const currentDate = new Date();
  const expiryDate = new Date(currentDate);

  if (cardType === 'premium') {
    expiryDate.setFullYear(currentDate.getFullYear() + 10); // 10 years for premium card
  } else if (cardType === 'student') {
    expiryDate.setFullYear(currentDate.getFullYear() + 5); // 5 years for student card
  }

  return expiryDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
}

// POST handler for handling credit card applications
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { accountID, cardType } = await req.json();  // cardType could be 'premium' or 'student'

    // Validate the incoming data
    if (!accountID || !cardType) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Determine the credit card limit based on card type
    const creditLimit = cardType === 'premium' ? 100000 : 10000;

    // Calculate the expiry date based on card type
    const expiryDate = calculateExpiryDate(cardType);

    // Generate a random credit card number
    const creditCardNumber = generateCreditCardNumber();

    // Set currentBalance to creditLimit by default
    const currentBalance = creditLimit;

    // Execute the SQL query to insert data into the CreditCard table
    const [result]: [any, FieldPacket[]] = await db.query(
      `INSERT INTO CreditCard (AccountID, CreditCardNumber, ExpiryDate, CreditLimit, CurrentBalance) 
      VALUES (?, ?, ?, ?, ?)`,
      [accountID, creditCardNumber, expiryDate, creditLimit, currentBalance]
    );

    // Retrieve the insertId from the result
    const insertId = (result as any).insertId;

    // Return a successful response with the insertId
    return NextResponse.json(
      { message: 'Credit card application successful', insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing credit card application:', error);

    // Return an error response with a message
    return NextResponse.json(
      { message: 'Failed to process credit card application' },
      { status: 500 }
    );
  }
}
