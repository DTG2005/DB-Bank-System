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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);

  const creditCards = [
    {
      id: 1,
      name: "Premium Card",
      category: "premium",
      annualFee: 150,
      apr: "12.99-20.99%",
      rewards: [
        "4% cash back on dining and travel",
        "2% on groceries",
        "1% on all other purchases",
      ],
      benefits: [
        "Airport lounge access",
        "Concierge service",
        "Exclusive events access",
      ],
      requirements: [
        "Excellent credit score (750+)",
        "Minimum income $75,000",
        "Clean credit history",
      ],
      color: "bg-gradient-to-r from-blue-500 to-purple-500",
    },
    {
      id: 2,
      name: "Student Card",
      category: "student",
      annualFee: 0,
      apr: "16.99-24.99%",
      rewards: [
        "1% cash back on all purchases",
        "Bonus points for first 3 months"
      ],
      benefits: [
        "No annual fee",
        "Free credit score tracking",
        "Flexible payment options"
      ],
      requirements: [
        "Must be a full-time student",
        "Valid student ID"
      ],
      color: "bg-gradient-to-r from-green-500 to-teal-500"
    }
  ];

  const handleApplyNow = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  // Function to submit the account number and card details to the backend
  const handleSubmitAccountNumber = async () => {
    if (accountNumber) {
      try {
        // Send POST request to the backend
        const response = await fetch('/api/dash/acad/ccapps', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accountID: accountNumber,  // Assuming accountID is equivalent to the accountNumber entered by the user
            cardType: selectedCard.category,  // 'premium' or 'student'
          }),
        });

        const result = await response.json();

        if (response.ok) {
          alert(`Loan application for the ${selectedCard.name} has been successfully submitted!`);
        } else {
          alert(`Error: ${result.message}`);
        }
      } catch (error) {
        console.error('Error submitting loan application:', error);
        alert('Failed to submit the loan application. Please try again.');
      }
      setIsModalOpen(false);
      setAccountNumber('');
    } else {
      alert('Please enter a valid account number.');
    }
  };

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
          </div>

          {/* Credit Cards Grid */}
          <div className="grid grid-cols-1 gap-6">
            {creditCards.map((card) => (
              <Card key={card.id} className="overflow-hidden hover:shadow-lg transition-all w-full">
                <div className={`h-24 ${card.color} p-4`}> {/* Reduced height */}
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-white">
                      {card.name}
                    </h3>
                    <CreditCard className="w-8 h-8 text-white opacity-75" />
                  </div>
                </div>

                <CardContent className="p-4"> {/* Reduced padding */}
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

                    <button
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors"
                      onClick={() => handleApplyNow(card)}
                    >
                      Apply Now
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Modal to Ask for Account Number */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h3 className="text-xl font-semibold mb-4">Enter Account Number</h3>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="Account Number"
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                />
                <div className="flex justify-between gap-4">
                  <button
                    className="bg-gray-500 text-white p-3 rounded-lg w-1/2"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-white p-3 rounded-lg w-1/2"
                    onClick={handleSubmitAccountNumber}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreditCardPortal;

