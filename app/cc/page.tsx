"use client";

import { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed
import { CreditCard, ShieldCheck } from 'lucide-react';

const CreditCards: React.FC = () => {
  const [creditCardOptions] = useState([
    {
      title: "Platinum Card",
      description: "Exclusive benefits and a high credit limit for premium customers.",
      icon: CreditCard,
      creditLimit: 20000,
      annualFee: 199,
    },
    {
      title: "Student Card",
      description: "A great starting card for students with low interest rates.",
      icon: ShieldCheck,
      creditLimit: 5000,
      annualFee: 49,
    },
  ]);

  const [accountID, setAccountID] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

  const handleApply = (cardIndex: number) => {
    setSelectedCardIndex(cardIndex);
    setShowInput(true);
  };

  const handleSubmit = async () => {
    if (!accountID) {
      alert('Please enter a valid Account ID');
      return;
    }

    const selectedCard = creditCardOptions[selectedCardIndex!];

    try {
      const response = await axios.post('/api/dash/acad/ccapps', {
        accountID,
        creditCardNumber: Math.floor(Math.random() * 1000000000000000), // Mock card number
        expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 3)), // 3 years from now
        creditLimit: selectedCard.creditLimit,
        currentBalance: 0.0,
      });
      alert(`Application successful! You have applied for the ${selectedCard.title}.`);
      setShowInput(false); // Hide input after successful submission
    } catch (error) {
      console.error('Failed to apply for the credit card:', error);
      alert('There was an error processing your application. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Credit Card Solutions</h2>
          <p className="text-gray-600 mt-4">
            Explore our range of credit card products tailored to your financial needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {creditCardOptions.map((card, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <card.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
              <div className="mt-6 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-32">Interest Rate:</span>
                  <span className="font-medium text-gray-700">
                    {index === 0 ? "12.99%" : "9.99%"} p.a.
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-32">Credit Limit:</span>
                  <span className="font-medium text-gray-700">
                    ${card.creditLimit}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-32">Annual Fee:</span>
                  <span className="font-medium text-gray-700">
                    ${card.annualFee}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleApply(index)}
                className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>

        {/* Account ID input box will be shown after clicking Apply Now */}
        {showInput && selectedCardIndex !== null && (
          <div className="flex justify-center mt-12">
            <div className="w-full md:w-1/3 p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <label htmlFor="accountID" className="block text-lg font-medium text-gray-700 mb-2">
                Enter your Account Number for {creditCardOptions[selectedCardIndex].title}
              </label>
              <input
                id="accountID"
                type="text"
                value={accountID}
                onChange={(e) => setAccountID(e.target.value)}
                className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                placeholder="Account Number"
              />
              <button
                onClick={handleSubmit}
                className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300"
              >
                Submit Application
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CreditCards;
