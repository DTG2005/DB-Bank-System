"use client";

import React, { useState, useEffect } from 'react';
import { ChevronRight, Phone, Mail, MapPin, Shield, DollarSign, PiggyBank, CreditCard, Building, ArrowRight } from 'lucide-react';
import GradualSpacing from "@/components/ui/gradual-spacing";
import HyperText from "@/components/ui/hyper-text";

const BankHomepage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-blue-600">EverTrust Bank</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Credit Cards</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Loan</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                Login
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <GradualSpacing
                className="font-display text-center text-4xl font-bold -tracking-widest text-blue-500 dark:text-blue-300 md:text-7xl md:leading-[5rem]"
                text="Banking Made Simple"
              />

            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Secure, convenient, and personalized banking solutions for your future
            </p>
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Banking</h3>
              <p className="text-gray-600">
                State-of-the-art security measures to protect your finances
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <PiggyBank className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Savings</h3>
              <p className="text-gray-600">
                Competitive interest rates and automated savings tools
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <CreditCard className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Digital Cards</h3>
              <p className="text-gray-600">
                Instant virtual cards and contactless payments
              </p>
            </div>
          </div>
        </div>
      </div>

      

      {/* Rates Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Current Rates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <HyperText className="text-3xl font-bold text-blue-800 mb-2" text="4.52% APY" />
              <div className="text-lg font-semibold">Savings Account</div>
              <p className="text-gray-600 mt-2">High-yield savings with no minimum balance</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <HyperText className="text-3xl font-bold text-blue-800 mb-2" text="4.52% APY" />
            <div className="text-lg font-semibold">Personal Loans</div>
              <p className="text-gray-600 mt-2">Competitive rates for your needs</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <HyperText className="text-3xl font-bold text-blue-800 mb-2" text="4.52% APY" />
            <div className="text-lg font-semibold">Mortgages</div>
              <p className="text-gray-600 mt-2">Fixed-rate home loans</p>
            </div>
          </div>
        </div>
      </div>
     
    {/* CTA Section */}
      <div className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to start your financial journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Open an account in minutes and experience modern banking
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            Open Account
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>EverTrust Bank</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  <span>support@securebank.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>123 Banking St, Finance City</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul>
                <li className="mb-2"><a href="#" className="hover:text-blue-400">Student Scholarships</a></li>
                <li className="mb-2"><a href="#" className="hover:text-blue-400">Loans</a></li>
                <li className="mb-2"><a href="#" className="hover:text-blue-400">Credit Cards</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BankHomepage;
