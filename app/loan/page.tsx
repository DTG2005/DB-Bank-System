"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, Home, CreditCard, History, ArrowLeftRight, Calculator, FileText, ChevronRight, Info, Check } from 'lucide-react';

const LoanApplicationPage = () => {
  const [loanAmount, setLoanAmount] = useState('25000');
  const [loanTerm, setLoanTerm] = useState('36');
  const [selectedLoanType, setSelectedLoanType] = useState('personal');
  const [accountNumber, setAccountNumber] = useState('');
  const [collateral, setCollateral] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Define interest rates for different loan types
  const interestRates = {
    personal: 8.5,
    student: 5.5,
  };

  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    const principal = parseFloat(loanAmount);
    const monthlyRate = (interestRates[selectedLoanType] / 100) / 12;
    const numberOfPayments = parseInt(loanTerm);
    
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return isNaN(monthlyPayment) ? 0 : monthlyPayment;
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalPayment = monthlyPayment * parseInt(loanTerm);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    setLoading(true);

    // Validation for empty fields
    if (!accountNumber || !loanAmount || !loanTerm || !selectedLoanType) {
      setMessage('All fields are required.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/dash/acad/loan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountNumber,
          loanType: selectedLoanType === 'personal' ? 'Personal Loan' : 'Student Loan',
          principalAmount: loanAmount,
          collateral,
          timePeriod: loanTerm,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Loan application successful!');
      } else {
        setMessage(data.message || 'Error occurred during application.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }

    setLoading(false);
  };

  const handleLoanTypeSelect = (type) => {
    setSelectedLoanType(type);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rotate-45" />
            Horizon
          </h1>
        </div>

        <nav className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <Home className="w-5 h-5" />
            Home
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <ArrowLeftRight className="w-5 h-5" />
            Transfer Funds
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <History className="w-5 h-5" />
            Transaction History
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <CreditCard className="w-5 h-5" />
            Credit Cards
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-white bg-blue-500 rounded-lg">
            <ArrowLeftRight className="w-5 h-5" />
            Apply for Loan
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold">
              {selectedLoanType === 'personal' ? 'Personal' : 'Student'} Loan Application
            </h1>
            <p className="text-gray-600">Calculate and apply for a {selectedLoanType} loan that fits your needs.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Loan Calculator */}
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Loan Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Loan Type Selector */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Loan Type
                      </label>
                      <select
                        value={selectedLoanType}
                        onChange={(e) => setSelectedLoanType(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="personal">Personal Loan</option>
                        <option value="student">Student Loan</option>
                      </select>
                    </div>

                    {/* Loan Amount Slider */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Loan Amount
                      </label>
                      <input
                        type="range"
                        min="1000"
                        max="1000000"
                        step="1000"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between mt-2">
                        <span className="text-sm text-gray-600">$1,000</span>
                        <span className="text-lg font-semibold text-blue-600">${parseInt(loanAmount).toLocaleString()}</span>
                        <span className="text-sm text-gray-600">$1,000,000</span>
                      </div>
                    </div>

                    {/* Loan Term Slider */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Loan Term (Months)
                      </label>
                      <input
                        type="range"
                        min="12"
                        max="360"
                        step="6"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between mt-2">
                        <span className="text-sm text-gray-600">12 months</span>
                        <span className="text-lg font-semibold text-blue-600">{loanTerm} months</span>
                        <span className="text-sm text-gray-600">360 months</span>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Monthly Payment</p>
                        <p className="text-xl font-bold text-blue-600">
                          ${monthlyPayment.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Interest Rate</p>
                        <p className="text-xl font-bold text-green-600">{interestRates[selectedLoanType]}%</p>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Total Payment</p>
                        <p className="text-xl font-bold text-yellow-600">
                          ${totalPayment.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Loan Application Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="w-5 h-5" />
                    Apply for Loan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {message && (
                      <div className="p-4 text-center bg-red-50 text-red-600 rounded-lg">
                        {message}
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                      <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Collateral</label>
                      <input
                        type="text"
                        value={collateral}
                        onChange={(e) => setCollateral(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        className={`px-6 py-2 text-white rounded-md ${
                          loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                        disabled={loading}
                      >
                        {loading ? 'Applying...' : 'Submit Application'}
                      </button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanApplicationPage;
