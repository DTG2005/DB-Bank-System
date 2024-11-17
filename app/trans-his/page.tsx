"use client";


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign,CreditCard, Home, History, ArrowLeftRight, Search, Download, Filter, ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react';

const TransactionHistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const transactions = [
    {
      id: 1,
      type: 'credit',
      description: 'Salary Deposit',
      amount: 5000.00,
      date: '2024-03-15',
      category: 'Income',
      status: 'Completed',
      account: 'Main Account (...4523)',
      icon: '💰'
    },
    {
      id: 2,
      type: 'debit',
      description: 'Amazon Purchase',
      amount: 99.99,
      date: '2024-03-14',
      category: 'Shopping',
      status: 'Completed',
      account: 'Credit Card (...7890)',
      icon: '🛍️'
    },
    {
      id: 3,
      type: 'debit',
      description: 'Netflix Subscription',
      amount: 14.99,
      date: '2024-03-13',
      category: 'Entertainment',
      status: 'Recurring',
      account: 'Main Account (...4523)',
      icon: '📺'
    },
    {
      id: 4,
      type: 'credit',
      description: 'Freelance Payment',
      amount: 850.00,
      date: '2024-03-12',
      category: 'Income',
      status: 'Completed',
      account: 'Business Account (...6789)',
      icon: '💻'
    }
  ];

  const summary = {
    totalIncome: 5850.00,
    totalExpenses: 114.98,
    netFlow: 5735.02
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
          <button className="w-full flex items-center gap-3 px-4 py-3 text-white bg-blue-500 rounded-lg">
            <History className="w-5 h-5" />
            Transaction History
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
          <CreditCard className="w-5 h-5" />
          Credit Cards
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <CircleDollarSign className="w-5 h-5" />
            Apply for Loan
          </button>
          
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold">Transaction History</h1>
            <p className="text-gray-600">View and manage your transaction history across all accounts.</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 mb-1">Total Income</p>
                    <p className="text-2xl font-bold text-green-700">${summary.totalIncome.toLocaleString()}</p>
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
                    <p className="text-2xl font-bold text-red-700">${summary.totalExpenses.toLocaleString()}</p>
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
                    <p className="text-2xl font-bold text-blue-700">${summary.netFlow.toLocaleString()}</p>
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
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{transaction.icon}</div>
                        <div>
                          <h4 className="font-medium">{transaction.description}</h4>
                          <p className="text-sm text-gray-600">{transaction.account}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                              {transaction.category}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(transaction.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          transaction.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                        }`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;