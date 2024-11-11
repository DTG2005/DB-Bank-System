import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/db"; // Adjust the path to your db connection module
import { RowDataPacket, FieldPacket } from "mysql2"; // Adjust import as necessary

enum TransactionType {
  TRANSFER = "TRANSFER",
  LOAN_DISBURSEMENT = "LOAN_DISBURSEMENT",
  PAYMENT = "PAYMENT",
}

interface TransferDetails {
  accountFrom: string;
  accountTo: string;
  amount: number;
}

interface LoanDisbursementDetails {
  loanAccountId: string;
  loanAmount: number;
}

interface PaymentDetails {
  paymentAccountId: string;
  paymentAmount: number;
}

type TransactionDetails =
  | TransferDetails
  | LoanDisbursementDetails
  | PaymentDetails;

// Main transaction handling function
async function handleTransaction(
  transactionType: TransactionType,
  details: TransactionDetails
): Promise<void> {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction(); // Start transaction

    switch (transactionType) {
      case TransactionType.TRANSFER:
        const { accountFrom, accountTo, amount } = details as TransferDetails;

        const [senderBalanceResult]: [RowDataPacket[], FieldPacket[]] =
          await connection.query<RowDataPacket[]>(
            "SELECT balance FROM accounts WHERE account_id = ?",
            [accountFrom]
          );

        // Validate the response
        if (
          !Array.isArray(senderBalanceResult) ||
          senderBalanceResult.length === 0
        ) {
          throw new Error("Account not found or no balance available");
        }

        const senderBalance = senderBalanceResult[0].balance; // Access the balance

        if (senderBalance < amount) {
          throw new Error("Insufficient funds");
        }

        // Deduct from sender
        await connection.query(
          "UPDATE accounts SET balance = balance - ? WHERE account_id = ?",
          [amount, accountFrom]
        );

        // Add to receiver
        await connection.query(
          "UPDATE accounts SET balance = balance + ? WHERE account_id = ?",
          [amount, accountTo]
        );

        console.log(
          `Transferred ${amount} from ${accountFrom} to ${accountTo}`
        );
        break;

      // Handle other transaction types as before...

      default:
        throw new Error("Invalid transaction type");
    }

    await connection.commit(); // Commit transaction
    console.log("Transaction successful");
  } catch (error: unknown) {
    await connection.rollback(); // Rollback on error

    if (error instanceof Error) {
      console.error("Transaction failed:", error.message);
    } else {
      console.error("Transaction failed with an unknown error:", error);
    }
  } finally {
    connection.release(); // Release connection
  }
}

const transactionHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const { transactionType, details } = req.body;

    try {
      await handleTransaction(transactionType, details);
      res.status(200).json({ message: "Transaction successful" });
    } catch (error: unknown) {
      // Type guard to handle the error safely
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default transactionHandler;
