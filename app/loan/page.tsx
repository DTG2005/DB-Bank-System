'use client'; // Mark the file as a client-side component

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use this import for client-side navigation in App Router
import { Banknote } from 'lucide-react';
import axios from 'axios';

// Define the type for loan data
interface Loan {
  title: string;
  interestRate: number;
  loanLimit: number;
  maxTimePeriod: number;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>; 
}

const Loans: React.FC = () => {
  const [loanTypes, setLoanTypes] = useState<Loan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [timePeriod, setTimePeriod] = useState<string>('');
  const [collateral, setCollateral] = useState<string>('');
  const router = useRouter(); // Initialize router for navigation

  // Fetch loan types from the backend
  useEffect(() => {
    const fetchLoanTypes = async () => {
      try {
        const response = await axios.get('/api/dash/acad/loan');
        setLoanTypes(response.data); // Assuming the backend returns an array of loan types
        setLoading(false);
      } catch (error) {
        setError('Failed to load loan types');
        setLoading(false);
      }
    };
    fetchLoanTypes();
  }, []);

  const applyForLoan = (loan: Loan) => {
    setSelectedLoan(loan);
    setShowPopup(true); // Show the popup when "Apply Now" is clicked
  };

  const handleSubmitApplication = async () => {
    try {
      // Send loan application data to the backend
      const response = await axios.post('/api/dash/acad/loan', {
        accountNumber,
        loanType: selectedLoan?.title,
        principalAmount: parseFloat(loanAmount),
        collateral,
        timePeriod: parseInt(timePeriod),
      });
      
      if (response.status === 201) {
        alert('Loan application successful');
        setShowPopup(false); // Close the popup after submission
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('Error submitting application: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading loan types...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">{error}</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Loan Solutions</h2>
          <p className="text-gray-600 mt-4">
            Discover our range of loan products with detailed information to meet your financial needs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loanTypes.map((loan, index) => {
            const LoanIcon = loan.icon || Banknote; // Default to Banknote icon if none provided
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <LoanIcon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{loan.title}</h3>
                <p className="text-gray-600 mb-2">Interest Rate: {loan.interestRate}% p.a.</p>
                <p className="text-gray-600 mb-2">Loan Limit: ${loan.loanLimit.toLocaleString()}</p>
                <p className="text-gray-600">Max Time Period: {loan.maxTimePeriod} months</p>
                <button
                  onClick={() => applyForLoan(loan)} // Handle applying for the loan
                  className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Apply Now
                </button>
              </div>
            );
          })}
        </div>
      </main>

      {showPopup && selectedLoan && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl font-semibold mb-4">Apply for {selectedLoan.title}</h3>
            <label className="block mb-2">
              Account Number:
              <input
                type="text"
                className="w-full border-gray-300 rounded-lg p-2 mt-1"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </label>
            <label className="block mb-2">
              Loan Amount:
              <input
                type="text"
                className="w-full border-gray-300 rounded-lg p-2 mt-1"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
            </label>
            <label className="block mb-2">
              Time Period (in months):
              <input
                type="text"
                className="w-full border-gray-300 rounded-lg p-2 mt-1"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
              />
            </label>
            <label className="block mb-4">
              Collateral (Purpose):
              <input
                type="text"
                className="w-full border-gray-300 rounded-lg p-2 mt-1"
                value={collateral}
                onChange={(e) => setCollateral(e.target.value)}
              />
            </label>
            <button
              onClick={handleSubmitApplication}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 w-full"
            >
              Submit Application
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loans;