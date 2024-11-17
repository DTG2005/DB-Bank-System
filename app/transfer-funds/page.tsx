"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CircleDollarSign,
  CreditCard,
  Home,
  History,
  ArrowLeftRight,
  Plus,
  ArrowRight,
  Search,
  Clock,
} from "lucide-react";
import DashNavBar from "../dashboard/dashnavbar";

const TransferFundsPage = () => {
  const [amount, setAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState(null);

  const userInfo = {
    name: "Adrian",
    fullName: "Adrian JSM",
    email: "contact@jsmastery.pro",
    currentBalance: 1250.35,
    accounts: [
      {
        id: 1,
        bankName: "Chase Bank",
        accountNumber: "****4523",
        balance: 1250.35,
        icon: "💳",
      },
      {
        id: 2,
        bankName: "Bank of America",
        accountNumber: "****7890",
        balance: 3420.5,
        icon: "🏦",
      },
    ],
    recentTransfers: [
      {
        id: 1,
        recipient: "John Doe",
        bank: "Chase Bank",
        amount: 250.0,
        date: "2024-03-15",
        status: "Completed",
      },
      {
        id: 2,
        recipient: "Jane Smith",
        bank: "Wells Fargo",
        amount: 1000.0,
        date: "2024-03-14",
        status: "Pending",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <DashNavBar activePage="transfer-funds" />

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold">Transfer Funds</h1>
            <p className="text-gray-600">
              Send money to your accounts or other banks securely.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Transfer Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Make a Transfer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enter Your Full Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search bank or account number"
                          className="w-full p-3 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                      </div>
                    </div>

                    {/* From Account */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        From Account
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search bank or account number"
                          className="w-full p-3 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                      </div>
                    </div>

                    {/* To Account */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        To Account
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search bank or account number"
                          className="w-full p-3 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                      </div>
                    </div>

                    {/* Amount */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amount
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <input
                          type="text"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0.00"
                          className="w-full p-3 pl-8 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Note */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        placeholder="Add a note to this transfer"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                      />
                    </div>

                    {/* Transfer Button */}
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors">
                      Transfer Now
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transfers */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transfers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userInfo.recentTransfers.map((transfer) => (
                      <div
                        key={transfer.id}
                        className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{transfer.recipient}</h4>
                          <span
                            className={`text-sm ${
                              transfer.status === "Completed"
                                ? "text-green-600"
                                : "text-orange-600"
                            }`}
                          >
                            {transfer.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>{transfer.bank}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span>${transfer.amount.toLocaleString()}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {new Date(transfer.date).toLocaleDateString()}
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
      </div>
    </div>
  );
};

export default TransferFundsPage;
