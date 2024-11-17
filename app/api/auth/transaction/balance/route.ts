import { NextRequest, NextResponse } from 'next/server';
import { db } from "../../../../../lib/db";  
import { RowDataPacket, FieldPacket } from 'mysql2';

// Function to fetch account balance
async function fetchBalance(accountId: string): Promise<number> {
  const connection = await db.getConnection();

  try {
    // Query to get the balance for the specified account
    const [result]: [RowDataPacket[], FieldPacket[]] = await connection.query(
      'SELECT Balance FROM Account WHERE AccountID = ?',
      [accountId]
    );

    if (!result || result.length === 0) {
      throw new Error('Account not found');
    }

    const balance = result[0].Balance;
    return balance;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

// Handle GET request for fetching balance
export async function GET(req: NextRequest) {
  const accountId = req.nextUrl.searchParams.get('accountId');

  if (!accountId) {
    return NextResponse.json({ error: 'Account ID is required' }, { status: 400 });
  }

  try {
    // Call the fetchBalance function to get the account balance
    const balance = await fetchBalance(accountId);

    return NextResponse.json({ balance }, { status: 200 });
  } catch (error) {
    console.error("Error fetching balance:", error);
    return NextResponse.json({ error: 'An error occurred while fetching the balance' }, { status: 500 });
  }
}
