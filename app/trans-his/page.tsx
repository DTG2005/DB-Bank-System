"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";
import DashNavBar from "../dashboard/dashnavbar";

const TransactionHistoryPage = () => {
  type Transaction = {
    TransactionID: string; // Unique identifier for transactions
    transactionType: "incoming" | "outgoing";
    Amount: number;
    Description: string;
    TransactionDate: string;
    TransactionTime: string; // Assuming ISO date string
  };

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netFlow: 0,
  });
  const [accountNumber, setAccountNumber] = useState(""); // Controlled input state
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error handling

  const fetchTransactions = async () => {
    if (!accountNumber.trim()) {
      setError("Please enter a valid account number.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/auth/transaction?accountNumber=${accountNumber}`
      );
      const data = await response.json();

      if (response.ok) {
        const { transactions }: { transactions: Transaction[] } = data;

        // Calculate summary data
        const totalIncome = transactions
          .filter((txn) => txn.transactionType === "incoming")
          .reduce((sum, txn) => sum + txn.Amount, 0);

        const totalExpenses = transactions
          .filter((txn) => txn.transactionType === "outgoing")
          .reduce((sum, txn) => sum + txn.Amount, 0);

        setSummary({
          totalIncome,
          totalExpenses,
          netFlow: totalIncome - totalExpenses,
        });

        setTransactions(transactions);
      } else {
        setError(data.error || "Failed to fetch transactions.");
      }
    } catch (error) {
      setError("Error fetching transactions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <DashNavBar activePage="trans-his" />

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold">Transaction History</h1>
          <p className="text-gray-600 mb-8">
            View and manage your transactions by entering your account number.
          </p>

          {/* Account Number Input */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Enter Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-2"
            />
            <button
              onClick={fetchTransactions}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              disabled={isLoading}
            >
              {isLoading ? "Fetching..." : "Fetch Transactions"}
            </button>
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 mb-1">Total Income</p>
                    <p className="text-2xl font-bold text-green-700">
                      ${summary.totalIncome.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <ArrowUpRight className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-red-600 mb-1">Total Expenses</p>
                    <p className="text-2xl font-bold text-red-700">
                      ${summary.totalExpenses.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-full">
                    <ArrowDownRight className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 mb-1">Net Flow</p>
                    <p className="text-2xl font-bold text-blue-700">
                      ${summary.netFlow.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <CircleDollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transactions List */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.length === 0 ? (
                  <p className="text-gray-600">No transactions found.</p>
                ) : (
                  transactions.map((transaction) => (
                    <div
                      key={transaction.TransactionID}
                      className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">
                            {transaction.Description}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {new Date(
                              transaction.TransactionDate
                            ).toLocaleDateString()}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {transaction.TransactionTime}
                          </p>
                        </div>
                        <div>
                          <p
                            className={`font-medium ${
                              transaction.transactionType === "incoming"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {transaction.transactionType === "incoming"
                              ? "+"
                              : "-"}
                            ${transaction.Amount.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
