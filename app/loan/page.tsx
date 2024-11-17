"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, Home, CreditCard, History, ArrowLeftRight, Calculator, FileText, BankIcon, ChevronRight, Info, Check } from 'lucide-react';

const LoanApplicationPage = () => {
  const [loanAmount, setLoanAmount] = useState('25000');
  const [loanTerm, setLoanTerm] = useState('36');
  const [selectedLoanType, setSelectedLoanType] = useState('personal');
  
  // Define interest rates for different loan types
  const interestRates = {
    personal: 8.5,
    student: 5.5
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

  // Handler for loan type selection
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
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Total Payment</p>
                        <p className="text-xl font-bold text-purple-600">
                          ${totalPayment.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Application Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Loan Application Form
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Employment Status
                      </label>
                      <select className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Full-time employed</option>
                        <option>Part-time employed</option>
                        <option>Self-employed</option>
                        <option>Student</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Income
                      </label>
                      <input
                        type="number"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Loan Purpose
                      </label>
                      <select className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {selectedLoanType === 'personal' ? (
                          <>
                            <option>Debt Consolidation</option>
                            <option>Home Improvement</option>
                            <option>Major Purchase</option>
                            <option>Other</option>
                          </>
                        ) : (
                          <>
                            <option>Tuition</option>
                            <option>Books and Supplies</option>
                            <option>Living Expenses</option>
                            <option>Other Educational Expenses</option>
                          </>
                        )}
                      </select>
                    </div>
                  <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Account Number
        </label>
        <input
          type="text"
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      </div>

                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors mt-6">
                    Submit Application
                  </button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div>
              {/* Loan Types */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Available Loan Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedLoanType === 'personal' 
                          ? 'bg-blue-50 border-blue-200' 
                          : 'border-gray-100 hover:bg-gray-50'
                      }`}
                      onClick={() => handleLoanTypeSelect('personal')}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Personal Loan</h4>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">From {interestRates.personal}% APR</p>
                    </div>
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedLoanType === 'student' 
                          ? 'bg-blue-50 border-blue-200' 
                          : 'border-gray-100 hover:bg-gray-50'
                      }`}
                      onClick={() => handleLoanTypeSelect('student')}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Student Loan</h4>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">From {interestRates.student}% APR</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Age Requirement</p>
                        <p className="text-sm text-gray-600">Must be 18 years or older</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Income Proof</p>
                        <p className="text-sm text-gray-600">
                          {selectedLoanType === 'personal' 
                            ? 'Recent pay stubs or tax returns'
                            : 'Financial aid award letter or pay stubs'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Credit Score</p>
                        <p className="text-sm text-gray-600">Minimum score of 650 required</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Bank Statements</p>
                        <p className="text-sm text-gray-600">Last 3 months of statements</p>
                      </div>
                    </div>
                  </div>
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