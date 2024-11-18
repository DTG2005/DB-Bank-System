"use client";
import React from "react";
import { CircleDollarSign, Home, History, ArrowLeftRight } from "lucide-react";

interface DashNavBarProps {
  activePage: string; // The name of the active page (e.g., "dashboard", "transfer-funds")
}

const DashNavBar: React.FC<DashNavBarProps> = ({ activePage }) => {
  return (
    <>
      <div>DashNavBar</div>
      {/* Left Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rotate-45" />
            EverTrust
          </h1>
        </div>

        <nav className="space-y-2">
          <button
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
              activePage === "dashboard"
                ? "text-white bg-blue-500"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => {
              window.location.href = "/dashboard";
            }}
          >
            <Home className="w-5 h-5" />
            Home
          </button>
          <button
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
              activePage === "transfer-funds"
                ? "text-white bg-blue-500"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => (window.location.href = "/transfer-funds")}
          >
            <ArrowLeftRight className="w-5 h-5" />
            Transfer Funds
          </button>
          <button
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
              activePage === "trans-his"
                ? "text-white bg-blue-500"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => (window.location.href = "/trans-his")}
          >
            <History className="w-5 h-5" />
            Transaction History
          </button>
          <button
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
              activePage === "credit-card"
                ? "text-white bg-blue-500"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => (window.location.href = "/credit-card")}
          >
            <History className="w-5 h-5" />
            Credit Cards
          </button>
          <button
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
              activePage === "loan"
                ? "text-white bg-blue-500"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => (window.location.href = "/loan")}
          >
            <CircleDollarSign className="w-5 h-5" />
            Apply for Loans
          </button>
        </nav>
      </div>
    </>
  );
};

export default DashNavBar;
