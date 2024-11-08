"use client";

import React, { useState } from "react";
import { Download } from "lucide-react";

interface Transaction {
  id: string;
  accountNumber: string;
  holderName: string;
  date: string;
  type: string;
  amount: number;
  balanceAfter: number;
  status: string;
  remarks?: string;
  recipientAccount?: string;
  universityName?: string;
  universityAccount?: string;
}

const sampleTransactions: Transaction[] = [
  { id: "TXN001", accountNumber: "1234567890", holderName: "John Doe", date: "2024-10-01", type: "Tuition Fee", amount: 500.0, balanceAfter: 1500.0, status: "Paid", remarks: "Semester fees" },
  { id: "TXN002", accountNumber: "0987654321", holderName: "Jane Smith", date: "2024-10-02", type: "Transfer", recipientAccount: "1122334455", amount: 200.0, balanceAfter: 1350.0, status: "Success", remarks: "Rent Payment" },
];

const TransactionPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions);
  const [newTransaction, setNewTransaction] = useState<Partial<Transaction>>({
    holderName: "",
    accountNumber: "",
    id: "",
    type: "",
    date: "",
    amount: 0,
    remarks: "",
  });

  const addTransaction = () => {
    if (newTransaction.holderName && newTransaction.accountNumber && newTransaction.id && newTransaction.type && newTransaction.date && newTransaction.amount) {
      setTransactions([
        ...transactions,
        {
          ...newTransaction,
          amount: parseFloat(newTransaction.amount.toString()),
          balanceAfter: parseFloat(newTransaction.amount.toString()) + 1000, // Sample balance logic
          status: "Pending",
        } as Transaction,
      ]);
      setNewTransaction({
        holderName: "",
        accountNumber: "",
        id: "",
        type: "",
        date: "",
        amount: 0,
        remarks: "",
        recipientAccount: "",
        universityName: "",
        universityAccount: "",
      });
    }
  };

  const exportTransactions = () => {
    alert("Transactions exported successfully!");
  };

  const filterTransactions = (type: string) => {
    if (type === "All") {
      setTransactions(sampleTransactions);
    } else {
      setTransactions(sampleTransactions.filter((transaction) => transaction.type === type));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-[100px] p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Transaction Management</h1>
        <button
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
          onClick={exportTransactions}
        >
          <Download className="h-5 w-5 mr-2" /> Export
        </button>
      </header>

      <section className="bg-white p-6 rounded-lg shadow-md mb-8 ">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Transaction</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Account Holder Name"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={newTransaction.holderName}
            onChange={(e) => setNewTransaction({ ...newTransaction, holderName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Account Number"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={newTransaction.accountNumber}
            onChange={(e) => setNewTransaction({ ...newTransaction, accountNumber: e.target.value })}
          />
          <input
            type="text"
            placeholder="Transaction ID"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={newTransaction.id}
            onChange={(e) => setNewTransaction({ ...newTransaction, id: e.target.value })}
          />
          <select
            className="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={newTransaction.type}
            onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
          >
            <option value="">Transaction Type</option>
            <option value="Tuition Fee">Tuition Fee</option>
            <option value="Transfer">Transfer</option>
            <option value="Withdrawal">Withdrawal</option>
            <option value="Deposit">Deposit</option>
          </select>

          {/* Conditionally render fields based on transaction type */}
          {newTransaction.type === "Transfer" && (
            <input
              type="text"
              placeholder="Recipient Account Number"
              className="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              value={newTransaction.recipientAccount}
              onChange={(e) => setNewTransaction({ ...newTransaction, recipientAccount: e.target.value })}
            />
          )}

          {newTransaction.type === "Tuition Fee" && (
            <>
              <input
                type="text"
                placeholder="University Name"
                className="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={newTransaction.universityName}
                onChange={(e) => setNewTransaction({ ...newTransaction, universityName: e.target.value })}
              />
              <input
                type="text"
                placeholder="University Account Number"
                className="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={newTransaction.universityAccount}
                onChange={(e) => setNewTransaction({ ...newTransaction, universityAccount: e.target.value })}
              />
            </>
          )}

          <input
            type="date"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={newTransaction.date}
            onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseFloat(e.target.value) })}
          />
          <input
            type="text"
            placeholder="Remarks (optional)"
            className="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={newTransaction.remarks}
            onChange={(e) => setNewTransaction({ ...newTransaction, remarks: e.target.value })}
          />
          <button
            type="button"
            onClick={addTransaction}
            className="col-span-full mt-4 bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition"
          >
            Add Transaction
          </button>
        </form>
      </section>

      {/* Transaction History and Filtering Code */}
    </div>
  );
};

export default TransactionPage;
