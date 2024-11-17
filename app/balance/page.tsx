"use client";

import React, { useState, useEffect } from "react";

const BalanceCheckPage: React.FC = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // State to track loading status

  // Simulate fetching balance from an API
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setLoading(true); // Start loading
        const userBalance = await getBalanceFromAPI();
        setBalance(userBalance);
      } catch (error) {
        setError("Failed to load balance. Please try again later.");
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchBalance();
  }, []);

  // Simulating an API call to fetch balance (replace with actual API in a real scenario)
  const getBalanceFromAPI = async (): Promise<number> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockBalance = 5000; // Mock balance
        resolve(mockBalance);
      }, 1000); // Simulate a network delay
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-slate-900">
      <div className="max-w-md w-full bg-sky-900 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Check Balance</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {loading ? (
          <div className="text-center">
            <p className="text-lg text-gray-600">Loading balance...</p>
            <div className="loader"></div> {/* Add a loader here */}
          </div>
        ) : balance !== null ? (
          <div className="text-center">
            <h3 className="text-2xl text-gray-300 font-semibold mb-4">Your Current Balance</h3>
            <p className="text-4xl font-bold text-white">${balance.toFixed(2)}</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg text-gray-600">No balance available.</p>
          </div>
        )}
      </div>

      {/* Add some styling for the loader */}
      <style jsx>{`
        .loader {
          border: 8px solid #f3f3f3; /* Light grey */
          border-top: 8px solid #3498db; /* Blue */
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 20px auto; /* Center the loader */
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default BalanceCheckPage;