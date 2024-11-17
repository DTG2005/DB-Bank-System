"use client";

import { useState, useEffect } from "react";
import { HandCoins, BookOpen, PiggyBank, ArrowLeftRight, Phone, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

const TransactionMainPage: React.FC = () => {
  const [textOpacity, setTextOpacity] = useState<number>(1); // State to track text opacity
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Adjust the opacity of the text based on scroll position
      const newOpacity = Math.max(0, 1 - scrollTop / 75); // Change 300 to adjust how quickly it fades
      setTextOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const TransactionType = [
    {
      icon: ArrowLeftRight,
      title: "Transfer Money",
      description: "Transfer Money easily",
      route: "/transferm",
    },
    {
      icon: HandCoins,
      title: "Withdraw/Deposit",
      description: "Deposit or withdraw money to your account",
      route: "/withdep",
    },
    {
      icon: PiggyBank,
      title: "Check Balance",
      description: "Check your bank balance",
      route: "/balance",
    },
    {
      icon: BookOpen,
      title: "University Fees",
      description: "Pay your university fees",
      route: "/univ",
    },
    {
      icon: BookOpen,
      title: "Bill Payment",
      description: "Pay your bills",
      route: "/univ",
    },
    {
      icon: BookOpen,
      title: "Transaction History",
      description: "See transaction history",
      route: "/univ",
    }
  ];

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
   
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Section */}
      <div className="pt-32 py-16 bg-gradient-to-r from-blue-900 to-slate-900">
        <div className="container mx-auto px-6">
          {/* Text Section with Opacity Transition */}
          <div style={{ opacity: textOpacity, transition: 'opacity 0.1s ease' }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Transaction Dashboard</h2>
            <p className="text-gray-400 mt-4">Most secured transactions as our bank's name suggests</p>
          </div>

          {/* Transaction Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10">
            {TransactionType.map((transaction, index) => (
              <div
                key={index}
                className="bg-sky-900 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col   "
               
              >
                <transaction.icon className="h-12 w-12 text-blue-50 mb-6" />
                <h3 className="text-xl font-semibold text-white mb-2">{transaction.title}</h3>
                <p className="text-gray-400 ">{transaction.description}</p>
                <button className="mt-4 text-blue-600 hover:text-red-700  flex items-center cursor-pointer" onClick={() => handleNavigation(transaction.route)}>
                Click Here
              </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionMainPage;
