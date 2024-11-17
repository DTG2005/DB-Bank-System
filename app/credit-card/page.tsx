"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  CreditCard,
  Home,
  History,
  CircleDollarSign,
  Gift,
  Percent,
  Shield,
  Star,
  ArrowLeftRight,
} from "lucide-react";
import DashNavBar from "../dashboard/dashnavbar";

const CreditCardPortal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const creditCards = [
    {
      id: 1,
      name: "Premier Rewards Card",
      category: "rewards",
      annualFee: 0,
      apr: "15.99-24.99%",
      rewards: [
        "5% cash back on books and education",
        "3% on dining and entertainment",
        "1% on all other purchases",
      ],
      benefits: [
        "No annual fee",
        "Free credit score monitoring",
        "Purchase protection",
      ],
      requirements: [
        "Good credit score (680+)",
        "No credit history required",
        "Valid ID",
      ],
      color: "bg-gradient-to-r from-blue-500 to-purple-500",
    },
    {
      id: 2,
      name: "Elite Travel Plus",
      category: "travel",
      annualFee: 95,
      apr: "17.99-25.99%",
      rewards: [
        "3x points on travel bookings",
        "2x points on dining worldwide",
        "1x points on all other purchases",
      ],
      benefits: [
        "Airport lounge access",
        "Travel insurance",
        "No foreign transaction fees",
      ],
      requirements: [
        "Excellent credit score (720+)",
        "Minimum income $50,000",
        "Clean credit history",
      ],
      color: "bg-gradient-to-r from-emerald-500 to-teal-500",
    },
    {
      id: 3,
      name: "Cash Back Supreme",
      category: "cashback",
      annualFee: 0,
      apr: "14.99-23.99%",
      rewards: [
        "2% cash back on all purchases",
        "5% on rotating categories",
        "$200 welcome bonus",
      ],
      benefits: ["No annual fee", "Cell phone protection", "Extended warranty"],
      requirements: [
        "Good credit score (680+)",
        "Stable income",
        "US resident",
      ],
      color: "bg-gradient-to-r from-orange-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <DashNavBar activePage="credit-card" />

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold">Credit Cards</h1>
            <p className="text-gray-600">
              Find the perfect card for your lifestyle and financial goals.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4 mb-8">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search credit cards..."
                className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <select
              className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="rewards">Rewards</option>
              <option value="travel">Travel</option>
              <option value="cashback">Cash Back</option>
            </select>
          </div>

          {/* Credit Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {creditCards.map((card) => (
              <Card
                key={card.id}
                className="overflow-hidden hover:shadow-lg transition-all"
              >
                <div className={`h-32 ${card.color} p-6`}>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-white">
                      {card.name}
                    </h3>
                    <CreditCard className="w-8 h-8 text-white opacity-75" />
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Annual Fee</p>
                      <p className="font-semibold">${card.annualFee}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">APR</p>
                      <p className="font-semibold">{card.apr}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <Gift className="w-4 h-4 text-blue-500" />
                        Rewards
                      </h4>
                      <ul className="text-sm space-y-1">
                        {card.rewards.map((reward, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-blue-500 rounded-full" />
                            {reward}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-blue-500" />
                        Benefits
                      </h4>
                      <ul className="text-sm space-y-1">
                        {card.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-blue-500 rounded-full" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-blue-500" />
                        Requirements
                      </h4>
                      <ul className="text-sm space-y-1">
                        {card.requirements.map((requirement, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-blue-500 rounded-full" />
                            {requirement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors">
                      Apply Now
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardPortal;
