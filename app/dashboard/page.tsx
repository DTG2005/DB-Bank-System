import React from 'react';
import { Card, CreditCard , CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CircleDollarSign,
  Home,
  History,
  ArrowLeftRight,
  Plus,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle
} from 'lucide-react';

const DashboardPage = () => {
  const userInfo = {
    name: "Aayush",
    fullName: "Aayush Yadav",
    email: "aayu@gmail.com",
    currentBalance: 1250.35,
    bankAccounts: 1,
    cardBalance: 123.50,
    cardNumber: "•••• •••• •••• 1234",
    monthlyIncome: 4580.20,
    monthlyExpenses: 2345.80,
  };

  const notices = [
    {
      title: "Safeguard Yourself Against Fraud",
      description: "Never ever share your login credentials like password, OTP, ATM PIN, etc with anyone.",
    },
    {
      title: "Scholarship Application Open",
      description: "Merit-based scholarships for 2024-25 are now open for application.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rotate-45" />
            EverTrust
          </h1>
        </div>

        <nav className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-white bg-blue-500 rounded-lg">
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
          <History className="w-5 h-5" />
          Credit Cards
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <CircleDollarSign className="w-5 h-5" />
            Apply for Loans
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold">
              Welcome <span className="text-blue-500">{userInfo.name}</span>
            </h1>
            <p className="text-gray-600">
              Access and manage your account and transactions efficiently.
            </p>
          </div>

          {/* Balance Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-1">Total Balance</h2>
                    <p className="text-3xl font-bold text-blue-600">${userInfo.currentBalance.toLocaleString()}</p>
                  </div>
                  <div className="bg-blue-50 p-2 rounded-full">
                    <TrendingUp className="w-6 h-6 text-blue-500" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-green-600">Monthly Income</span>
                      <div className="bg-green-100 p-1 rounded-full">
                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                    <p className="text-xl font-semibold text-green-700">
                      ${userInfo.monthlyIncome.toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-red-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-red-600">Monthly Expenses</span>
                      <div className="bg-red-100 p-1 rounded-full">
                        <ArrowDownRight className="w-4 h-4 text-red-600" />
                      </div>
                    </div>
                    <p className="text-xl font-semibold text-red-700">
                      ${userInfo.monthlyExpenses.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">RECENT TRANSACTIONS</h2>
            {/* Add transaction list here */}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="fixed right-0 top-0 h-full w-80 bg-white border-l border-gray-200 p-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">
            A
          </div>
          <div>
            <h2 className="font-semibold">{userInfo.fullName}</h2>
            <p className="text-sm text-gray-600">{userInfo.email}</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative w-full h-48 bg-blue-800 rounded-xl p-4 text-white">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm opacity-80">{userInfo.fullName}</p>
                <p className="text-2xl font-bold mt-2">${userInfo.cardBalance}</p>
              </div>
              <div className="w-8 h-8">
                <svg viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M2 8.5H22M6 16.5H8M10.5 16.5H12.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-4 left-4">
              <p className="text-sm opacity-80">{userInfo.cardNumber}</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Important Notices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notices.map((notice, index) => (
                <div key={index} className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-semibold text-blue-800">{notice.title}</p>
                  <p className="text-sm text-blue-600 mt-1">{notice.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
