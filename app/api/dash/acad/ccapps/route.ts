import { NextRequest, NextResponse } from 'next/server';
import mysql2 from 'mysql2/promise';
import { FieldPacket } from 'mysql2';

export const db = mysql2.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

export async function POST(req: NextRequest) {
  const { accountID, creditCardNumber, expiryDate, creditLimit } = await req.json();

  try {
    // Ensure the expiryDate is in the correct format for MySQL (YYYY-MM-DD)
    const formattedExpiryDate = new Date(expiryDate).toISOString().split('T')[0]; // 'YYYY-MM-DD'

    // Set currentBalance equal to creditLimit
    const currentBalance = creditLimit;

    // Execute the SQL query to insert data into the CreditCard table
    const [result]: [any, FieldPacket[]] = await db.query(
      `INSERT INTO CreditCard (AccountID, CreditCardNumber, ExpiryDate, CreditLimit, CurrentBalance) 
      VALUES (?, ?, ?, ?, ?)`,
      [accountID, creditCardNumber, formattedExpiryDate, creditLimit, currentBalance]
    );

    // Access insertId properly from the result object
    const insertId = (result as any).insertId;

    // Return a successful response with the insertId
    return NextResponse.json({ message: 'Credit card application successful', insertId }, { status: 201 });
  } catch (error) {
    console.error('Error processing credit card application:', error);
    return NextResponse.json({ message: 'Failed to process credit card application' }, { status: 500 });
  }
}
