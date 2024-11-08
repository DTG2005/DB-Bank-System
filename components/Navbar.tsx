"use client";

import React from "react";
import { useRouter } from 'next/navigation';
import { Bell, HelpCircle, ChevronDown, Search } from 'lucide-react';

// Define props for the Navbar component
interface NavbarProps {
  isScrolled: boolean;
  username: string; // Add username prop
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled, username }) => {
  const router = useRouter(); 

  const handleLogoutClick = () => {
    // Logic to handle logout (you can implement this based on your auth mechanism)
    console.log("Logout clicked");
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-3 px-6">
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-bold text-blue-700 flex items-center">
              <span className="text-red-600">CBI</span> BANK
            </div>
            <div className="hidden md:flex space-x-6">
              {['PERSONAL', 'Student', 'Employee'].map((item) => (
                <button key={item} className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  {item} <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <HelpCircle className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-2">
              {/* Display username */}
              <span className="text-gray-800 font-semibold">{username}</span>
              {/* Logout button */}
              <button onClick={handleLogoutClick} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="bg-blue-600">
          <div className="container mx-auto px-6">
            <div className="flex space-x-8 py-3 overflow-x-auto">
              {['Accounts', 'Loans', 'Cards', 'University', 'Scholarships', 'Rewardz & Offers', 'Premium'].map((item) => (
                <button key={item} className="text-white hover:text-gray-200 transition-colors whitespace-nowrap">
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
