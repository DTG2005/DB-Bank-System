import { NextRequest, NextResponse } from 'next/server';
import { db } from "../../../../lib/db";  // Ensure this path is correct
import { RowDataPacket, FieldPacket } from 'mysql2';

// Enum to define transaction types
enum TransactionType {
  TRANSFER = 'TRANSFER',
  WITHDRAW = 'WITHDRAW',
  DEPOSIT = 'DEPOSIT',
  BILL_PAYMENT = 'BILL_PAYMENT'
}

// Interface for transaction details
interface TransferDetails {
  senderAccountId: string;
  senderName: string;
  recipientAccountId: string;
  amount: number;
}

interface WithdrawDetails {
  accountId: string;
  amount: number;
  name: string;
}

interface DepositDetails {
  accountId: string;
  amount: number;
  name: string;
}
interface BillPaymentDetails {
  accountId: string;
  billType: string;
  amount: number;
}

type TransactionDetails = TransferDetails | WithdrawDetails | DepositDetails | BillPaymentDetails;

// Function to handle all transaction types
async function handleTransaction(transactionType: TransactionType, details: TransactionDetails): Promise<string> {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    switch (transactionType) {
      case TransactionType.TRANSFER: {
        const { senderAccountId, senderName, recipientAccountId, amount } = details as TransferDetails;
      
    
        const [senderResult]: [RowDataPacket[], FieldPacket[]] = await connection.query(
          `SELECT a.AccountID, c.Firstname, c.Middlename, c.Lastname 
           FROM Account a 
           JOIN Customer c ON a.CustomerID = c.CustomerID 
           WHERE a.AccountID = ?`,
          [senderAccountId]
        );

        if (!senderResult.length) {
          throw new Error('Sender account not found');
        }

        const sender = senderResult[0];
        const fullSenderName = `${sender.Firstname} ${sender.Middlename} ${sender.Lastname}`.trim();

        if (fullSenderName !== senderName.trim()) {
          throw new Error('Sender information wrong!');
        }
        const senderBranchId = sender.BranchID; // Get the BranchID from the Account table

        // 2. Validate recipient account exists
        const [recipientResult]: [RowDataPacket[], FieldPacket[]] = await connection.query(
          'SELECT * FROM Account WHERE AccountID = ?',
          [recipientAccountId]
        );

        if (!recipientResult || recipientResult.length === 0) {
          throw new Error('Recipient account not found');
        }

        // 3. Check sender balance
        if (sender.Balance < amount) {
          throw new Error('Insufficient funds');
        }

        // 4. Perform transaction (debit sender, credit recipient)
        const transactionDate = new Date();
        const transactionDateFormatted = transactionDate.toISOString().split('T')[0]; // YYYY-MM-DD format
        const transactionTimeFormatted = transactionDate.toISOString().split('T')[1].split('.')[0]; // HH:MM:SS format

        // Debit sender account
        await connection.query('UPDATE Account SET Balance = Balance - ? WHERE AccountID = ?', [amount, senderAccountId]);
        // Credit recipient account
        await connection.query('UPDATE Account SET Balance = Balance + ? WHERE AccountID = ?', [amount, recipientAccountId]);

        // Log the sender transaction
        await connection.query(
          `INSERT INTO Transaction (AccountID, BranchID, TransactionType, Amount, Status, TransactionDate, TransactionTime, Description, TransactionFrom, TransactionTo) 
           VALUES (?, ?, 'TRANSFER', ?, true, ?, ?, 'Transfer to recipient account', ?, ?)`,
          [senderAccountId, senderBranchId, amount, transactionDateFormatted, transactionTimeFormatted, senderAccountId, recipientAccountId]
        );

       

        break;
      }

      case TransactionType.WITHDRAW: {
        const { accountId, amount, name } = details as WithdrawDetails;

        // Validate account and name
        const [accountResult]: [RowDataPacket[], FieldPacket[]] = await connection.query(
          `SELECT a.AccountID, c.Firstname, c.Middlename, c.Lastname, a.Balance 
           FROM Account a 
           JOIN Customer c ON a.CustomerID = c.CustomerID 
           WHERE a.AccountID = ?`,
          [accountId]
        );

        if (!accountResult.length) {
          throw new Error('Account not found');
        }

        const account = accountResult[0];
        const fullAccountName = `${account.Firstname} ${account.Middlename} ${account.Lastname}`.trim();

        if (fullAccountName !== name.trim()) {
          throw new Error('Incorrect information given!');
        }
        // 3. Check balance
        if (account.Balance < amount) {
          throw new Error('Insufficient funds');
        }

        // 4. Retrieve BranchID from the Account table
        const branchId = account.BranchID;

        // 5. Perform withdrawal
        await connection.query('UPDATE Account SET Balance = Balance - ? WHERE AccountID = ?', [amount, accountId]);

        // Log the transaction
        const transactionDate = new Date();
        const transactionDateFormatted = transactionDate.toISOString().split('T')[0]; // YYYY-MM-DD format
        const transactionTimeFormatted = transactionDate.toISOString().split('T')[1].split('.')[0]; // HH:MM:SS format

        await connection.query(
          `INSERT INTO Transaction (AccountID, BranchID, TransactionType, Amount, Status, TransactionDate, TransactionTime, Description, TransactionFrom) 
           VALUES (?, ?, 'WITHDRAW', ?, true, ?, ?, 'Withdraw from account', ?)`,
          [accountId, branchId, amount, transactionDateFormatted, transactionTimeFormatted, accountId]
        );

        break;
      }

      case TransactionType.DEPOSIT: {
        const { accountId, amount, name } = details as DepositDetails;

        // 1. Validate account exists and fetch account details
        // Validate account and name
        const [accountResult]: [RowDataPacket[], FieldPacket[]] = await connection.query(
          `SELECT a.AccountID, c.Firstname, c.Middlename, c.Lastname 
           FROM Account a 
           JOIN Customer c ON a.CustomerID = c.CustomerID 
           WHERE a.AccountID = ?`,
          [accountId]
        );

        if (!accountResult.length) {
          throw new Error('Account not found');
        }

        const account = accountResult[0];
        const fullAccountName = `${account.Firstname} ${account.Middlename} ${account.Lastname}`.trim();

        if (fullAccountName !== name.trim()) {
          throw new Error('Incorrect information given!');
        }
        // 3. Retrieve BranchID from the Account table
        const branchId = account.BranchID;

        // 4. Perform deposit
        await connection.query('UPDATE Account SET Balance = Balance + ? WHERE AccountID = ?', [amount, accountId]);

        // Log the transaction
        const transactionDate = new Date();
        const transactionDateFormatted = transactionDate.toISOString().split('T')[0]; // YYYY-MM-DD format
        const transactionTimeFormatted = transactionDate.toISOString().split('T')[1].split('.')[0]; // HH:MM:SS format

        await connection.query(
          `INSERT INTO Transaction (AccountID, BranchID, TransactionType, Amount, Status, TransactionDate, TransactionTime, Description, TransactionTo) 
           VALUES (?, ?, 'DEPOSIT', ?, true, ?, ?, 'Deposit to account', ?)`,
          [accountId, branchId, amount, transactionDateFormatted, transactionTimeFormatted, accountId]
        );

        break;
      }
      case TransactionType.BILL_PAYMENT: {
        const { accountId, billType, amount } = details as BillPaymentDetails;

        // Validate account exists
        const [accountResult]: [RowDataPacket[], FieldPacket[]] = await connection.query(
          'SELECT * FROM account WHERE AccountID = ?',
          [accountId]
        );

        if (!accountResult || accountResult.length === 0) {
          throw new Error('Account not found');
        }

        const account = accountResult[0];
        if (account.Balance < amount) {
          throw new Error('Insufficient funds');
        }

        // Deduct the amount
        await connection.query('UPDATE account SET Balance = Balance - ? WHERE AccountID = ?', [amount, accountId]);

        // Log the bill payment transaction
        const transactionDate = new Date().toISOString().split('T')[0];
        const transactionTime = new Date().toISOString().split('T')[1].split('.')[0];

        await connection.query(
          `INSERT INTO Transaction (AccountID, BranchID, TransactionType, Amount, Status, TransactionDate, TransactionTime, Description, TransactionFrom) 
           VALUES (?, ?, 'BILLPAY', ?, true, ?, ?, 'Billpayment: ${billType}', ?)`,
          [accountId, account.BranchID, amount, transactionDate, transactionTime, accountId]
        );

        break;}

      default:
        throw new Error('Invalid transaction type');
    }

    await connection.commit();

    // Return success message after committing
    return "Transaction successful!";
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

// Handle POST request for transactions
export async function POST(req: NextRequest) {
  try {
    const { transactionType, details } = await req.json();

    if (!transactionType || !details) {
      return NextResponse.json({ error: 'Transaction type or details missing' }, { status: 400 });
    }

    // Call the transaction handler
    const successMessage = await handleTransaction(transactionType as TransactionType, details);

    return NextResponse.json({ message: successMessage }, { status: 200 });
  } catch (error) {
    console.error("Error handling transaction:", error);

    // Send detailed error messages to the client
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred during the transaction' }, { status: 500 });
    }
  }
}

// Handle GET request for transaction history
export async function GET(req: NextRequest) {
  const accountId = req.nextUrl.searchParams.get('accountId');

  if (!accountId) {
    return NextResponse.json({ error: 'Account ID is required' }, { status: 400 });
  }

  const connection = await db.getConnection();

  try {
    const [transactions]: [RowDataPacket[], FieldPacket[]] = await connection.query(
      `
      SELECT *,
        CASE 
          WHEN TransactionFrom = ? THEN 'outgoing' 
          WHEN TransactionTo = ? THEN 'incoming' 
        END AS transactionType
      FROM Transaction 
      WHERE TRansactionFrom = ? OR TransactionTo = ?
      ORDER BY TransactionDate DESC
      `,
      [accountId, accountId, accountId, accountId]
    );

    return NextResponse.json({ transactions }, { status: 200 });
  } catch (error) {
    console.error("Error handling transaction:", error);
    return NextResponse.json({ error: 'An error occurred while fetching transaction history' }, { status: 500 });
  } finally {
    connection.release();
  }
}
