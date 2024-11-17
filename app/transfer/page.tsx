"use client";

import { useState } from "react";

const TransferMoneyPage: React.FC = () => {
  const [name, setName] = useState("");
  const [senderAccount, setSenderAccount] = useState("");
  const [recipientAccount, setRecipientAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // To show loading state during transaction

  // Handle form submission
  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true); // Start loading

    // Validate inputs before sending the request
    if (!name || !senderAccount || !recipientAccount || !amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please fill out all fields correctly.");
      setIsLoading(false); // Stop loading if validation fails
      return;
    }

    // Step 1: Ask the user for confirmation
    const isConfirmed = window.confirm(
      `Are you sure you want to transfer $${amount} from account ${senderAccount} to ${recipientAccount}?`
    );

    if (!isConfirmed) {
      setIsLoading(false); // Stop loading if user cancels
      return; // If the user cancels, stop the process
    }

    try {
      // Step 2: Send the transaction request to the backend API
      const response = await fetch("/api/auth/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transactionType: "TRANSFER", // Transaction type is 'TRANSFER'
          details: {
            senderAccountId: senderAccount, // Send sender account ID
            senderName: name,               // Send sender's full name
            recipientAccountId: recipientAccount, // Send recipient account ID
            amount: Number(amount),         // Send amount to transfer
          },
        }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Transaction failed");
      }

      // Step 3: After successful transaction, show success message
      setSuccessMessage("✅ Transfer confirmed! Your transaction has been processed.");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message); // Display the error message
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false); // Stop loading after the transaction is complete
    }
  };

  return (
    <div className="min-h-screen bg- flex items-center justify-center px-4">
      <div className="bg-sky-900 w-full max-w-5xl p-10 rounded-lg shadow-2xl flex flex-col space-y-6 transform">
        <h2 className="text-3xl font-bold text-white tracking-wide mb-6">Transfer Money</h2>

        {/* Error Message */}
        {error && <p className="text-red-200 mb-4 font-medium text-center">{error}</p>}

        {/* Success Message */}
        {successMessage && <p className="text-green-200 font-semibold text-center">{successMessage}</p>}

        {/* Form for transferring money */}
        <form onSubmit={handleTransfer} className="w-full flex flex-col space-y-6">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="text-white font-medium">Full Name</label>
              <input
                type="text"
                className="mt-2 w-full p-3 rounded-lg bg-sky-800 text-white border-gray-300 focus:border-purple-300 focus:ring focus:ring-purple-200"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-white font-medium">Sender Account Number</label>
              <input
                type="text"
                className="mt-2 w-full p-3 rounded-lg bg-sky-800 text-white border-gray-300 focus:border-purple-300 focus:ring focus:ring-purple-200"
                placeholder="Your account number"
                value={senderAccount}
                onChange={(e) => setSenderAccount(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-white font-medium">Recipient Account Number</label>
              <input
                type="text"
                className="mt-2 w-full p-3 rounded-lg bg-sky-800 text-white border-gray-300 focus:border-purple-300 focus:ring focus:ring-purple-200"
                placeholder="Recipient's account number"
                value={recipientAccount}
                onChange={(e) => setRecipientAccount(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-white font-medium">Amount</label>
              <input
                type="number"
                className="mt-2 w-full p-3 rounded-lg bg-sky-800 text-white border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200"
                placeholder="Amount to transfer"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Button positioned below the form */}
          <div className="w-full flex  mt-4">
            <button
              type="submit"
              className="w-full lg:w-1/3 bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-purple-800 transition-all duration-300 focus:outline-none"
              disabled={isLoading} // Disable the button during loading
            >
              {isLoading ? "Processing..." : "Transfer Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransferMoneyPage;
