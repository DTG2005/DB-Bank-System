// app/dashboard/page.tsx
"use client";

import React from 'react';
import { useState } from 'react';
import {
  BookOpen,
  CreditCard,
  Building,
  History,
  TrendingUp,
  Bell,
  ArrowRight,
  DollarSign,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from '@/components/Navbar';

export default function DashboardPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isScrolled={isScrolled} />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <WelcomeSection />
          <QuickActions />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2">
              <RecentActivity />
            </div>
            <div className="lg:col-span-1">
              <UpcomingPayments />
              <ImportantNotices />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Components remain the same but need to be marked as 'use client' if they use hooks
const WelcomeSection = () => {
  const accountSummary = {
    name: "John Doe",
    studentId: "ST123456",
    totalBalance: "₹45,000",
    pendingDues: "₹12,500",
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {accountSummary.name}!</h1>
          <p className="text-gray-600">Student ID: {accountSummary.studentId}</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-4">
          <div className="text-center">
            <p className="text-gray-600">Total Balance</p>
            <p className="text-xl font-bold text-blue-600">{accountSummary.totalBalance}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Pending Dues</p>
            <p className="text-xl font-bold text-red-600">{accountSummary.pendingDues}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickActions = () => {
  const actions = [
    {
      title: "Academic Portal",
      icon: BookOpen,
      description: "Manage student loans, scholarships & fees",
      link: "/dashboard/academic",
      color: "bg-blue-600",
    },
    {
      title: "Loan Management",
      icon: Building,
      description: "Apply for or manage existing loans",
      link: "/dashboard/loans",
      color: "bg-green-600",
    },
    {
      title: "Credit Cards",
      icon: CreditCard,
      description: "Apply for new cards or manage existing ones",
      link: "/dashboard/cards",
      color: "bg-purple-600",
    },
    {
      title: "Transactions",
      icon: History,
      description: "View and manage all transactions",
      link: "/dashboard/transactions",
      color: "bg-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {actions.map((action, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
              <action.icon className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-lg">{action.title}</CardTitle>
            <CardDescription>{action.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <button className="text-blue-600 hover:text-blue-700 flex items-center">
              Access Now <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};


const RecentActivity = () => {
  const activities = [
    {
      type: "Fee Payment",
      amount: "₹15,000",
      date: "Today",
      status: "Successful",
      icon: DollarSign,
    },
    {
      type: "Scholarship Credit",
      amount: "₹25,000",
      date: "Yesterday",
      status: "Credited",
      icon: TrendingUp,
    },
    {
      type: "Loan Disbursement",
      amount: "₹50,000",
      date: "2 days ago",
      status: "Processing",
      icon: Building,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                  <activity.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold">{activity.type}</p>
                  <p className="text-sm text-gray-600">{activity.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{activity.amount}</p>
                <p className="text-sm text-green-600">{activity.status}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const UpcomingPayments = () => {
  const payments = [
    {
      title: "Semester Fee",
      amount: "₹30,000",
      dueDate: "May 15, 2024",
    },
    {
      title: "Loan EMI",
      amount: "₹12,500",
      dueDate: "May 20, 2024",
    },
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Upcoming Payments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {payments.map((payment, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{payment.title}</p>
                <p className="text-sm text-gray-600">Due: {payment.dueDate}</p>
              </div>
              <p className="font-semibold text-red-600">{payment.amount}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const ImportantNotices = () => {
  const notices = [
    {
      title: "Scholarship Application Open",
      description: "Merit-based scholarships for 2024-25 are now open for application.",
    },
    {
      title: "New Credit Card Offer",
      description: "Special student credit card with 2% cashback on educational expenses.",
    },
  ];

  return (
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
  );
};