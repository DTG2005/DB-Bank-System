"use client";

import { useState } from "react";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";

const TransactionPage: React.FC = () => {
  const [transactionType, setTransactionType] = useState<"deposit" | "withdraw" | null>(null);
  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Mark the function as async
  const handleTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear error messages
    setSuccessMessage(""); // Clear success message

    // Validation for all fields
    if (!name || !accountNumber || !amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please fill out all fields correctly.");
      return;
    }

    // Prepare the request body
    const requestData = {
      transactionType: transactionType === "deposit" ? "DEPOSIT" : "WITHDRAW",
      details: {
        accountId: accountNumber,
        amount: Number(amount),
      },
    };

    // Make the API call
    try {
      const response = await fetch("/api/auth/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(
          transactionType === "deposit"
            ? "Deposit confirmed! Your money has been successfully deposited."
            : "Withdrawal confirmed! Your money has been successfully withdrawn."
        );
      } else {
        setError(data.error || "An error occurred during the transaction.");
      }
    } catch (err) {
      setError("An error occurred while processing the transaction.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-slate-900 flex items-center justify-center px-4">
      <div className="bg-sky-900 w-full md:max-w-4xl p-8 shadow-lg rounded-lg space-y-8">
        <h2 className="text-3xl font-bold text-white text-center">
          {transactionType === "deposit"
            ? "Deposit Money"
            : transactionType === "withdraw"
            ? "Withdraw Money"
            : "Select Transaction Type"}
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {successMessage && (
          <p className="text-green-600 text-center mb-4 font-semibold">{successMessage}</p>
        )}

        {transactionType === null ? (
          <div className="flex justify-center space-x-4">
            <button
              className="w-48 bg-blue-500 text-white py-3 rounded-md font-semibold hover:bg-blue-600 transition duration-200 flex items-center justify-center space-x-2 shadow-md"
              onClick={() => setTransactionType("deposit")}
            >
              <ArrowBigUp className="w-6 h-6" />
              <span>Deposit Money</span>
            </button>
            <button
              className="w-48 bg-blue-500 text-white py-3 rounded-md font-semibold hover:bg-blue-600 transition duration-200 flex items-center justify-center space-x-2 shadow-md"
              onClick={() => setTransactionType("withdraw")}
            >
              <ArrowBigDown className="w-6 h-6" />
              <span>Withdraw Money</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleTransaction} className="w-full flex flex-col space-y-6">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="text-white font-medium">Your Name</label>
                <input
                  type="text"
                  className="mt-2 w-full p-3 rounded-lg bg-sky-800 text-white border-gray-300 focus:border-purple-300 focus:ring focus:ring-purple-200"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-white font-medium">Account Number</label>
                <input
                  type="text"
                  className="mt-2 w-full p-3 rounded-lg bg-sky-800 text-white border-gray-300 focus:border-purple-300 focus:ring focus:ring-purple-200"
                  placeholder="Enter your account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-white font-medium">Amount</label>
                <input
                  type="number"
                  className="mt-2 w-full p-3 rounded-lg bg-sky-800 text-white border-gray-300 focus:border-purple-300 focus:ring focus:ring-purple-200"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    // Only update state if the value is non-negative
                    if (value >= 0) {
                      setAmount(e.target.value);
                    }
                  }}
                  required
                />
              </div>
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label className="text-gray-300 font-medium">Confirm Transaction</label>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="confirmTransaction"
                  className="mr-2"
                  onChange={() => setIsConfirmed(!isConfirmed)}
                />
                <label htmlFor="confirmTransaction" className="text-gray-300">
                  Yes, I want to proceed
                </label>
              </div>
            </div>

            <div className="w-full flex inline-centre mt-4">
              <button
                type="submit"
                className="w-full lg:w-1/3 bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-purple-800 transition-all duration-300 focus:outline-none"
                disabled={!isConfirmed}
              >
                {transactionType === "deposit" ? "Deposit Money" : "Withdraw Money"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TransactionPage;
