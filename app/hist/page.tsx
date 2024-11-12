"use client";
import { useState } from 'react';

const TransactionHistory = () => {
  const [accountId, setAccountId] = useState<string>(''); // Store the account ID input
  const [transactions, setTransactions] = useState<any[]>([]); // Store fetched transactions
  const [error, setError] = useState<string>(''); // Error state

  // Function to fetch transaction history based on account ID
  const fetchTransactionHistory = async (accountId: string) => {
    try {
      const response = await fetch(`/api/auth/transaction?accountId=${accountId}`); // Make GET request to the backend API
      if (response.ok) {
        const data = await response.json();
        setTransactions(data.transactions); // Update the transactions state with the response
        setError(''); // Clear any previous error
      } else {
        setError('Failed to fetch transactions');
      }
    } catch (error) {
      setError('An error occurred while fetching transactions');
      console.error('Fetch error:', error);
    }
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (accountId) {
      fetchTransactionHistory(accountId); // Fetch transaction history when account ID is provided
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6" >
      <h1 className="text-3xl font-semibold mb-6">Transaction History</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex items-center space-x-4">
          <label htmlFor="accountId" className="text-lg font-medium">Account ID: </label>
          <input
            type="text"
            id="accountId"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-md w-full"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Get Transaction History</button>
      </form>

      {/* Display error if any */}
      {error && <p className="text-red-600">{error}</p>}

      {/* Transaction History Table */}
      {transactions.length > 0 && (
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Transaction ID</th>
              <th className="py-2 px-4 border-b text-left">Transaction Type</th>
              <th className="py-2 px-4 border-b text-left">Amount</th>
              {/* <th className="py-2 px-4 border-b text-left">Status</th> */}
              <th className="py-2 px-4 border-b text-left">Date</th>
              <th className="py-2 px-4 border-b text-left">Time</th>
              <th className="py-2 px-4 border-b text-left">From Account</th>
              <th className="py-2 px-4 border-b text-left">To Account</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction: any) => (
              <tr key={transaction.TransactionID} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{transaction.TransactionID}</td>
                <td className="py-2 px-4 border-b">{transaction.TransactionType}</td>
                <td className="py-2 px-4 border-b">{transaction.Amount >= 0 ? `+${transaction.Amount}` : transaction.Amount}</td>
                {/* <td className="py-2 px-4 border-b">{transaction.Status ? 'Success' : 'Failed'}</td> */}
                <td className="py-2 px-4 border-b">{transaction.TransactionDate}</td>
                <td className="py-2 px-4 border-b">{transaction.TransactionTime}</td>
                <td className="py-2 px-4 border-b">{transaction.TransactionFrom || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{transaction.TransactionTo || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionHistory;
