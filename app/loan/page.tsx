"use client";

import { useState } from 'react';
import Navbar from '@/components/NavBar';
import { Banknote, GraduationCap } from 'lucide-react';

const Loans: React.FC = () => {
  const [loanTypes] = useState([
    {
      title: "Personal Loan",
      description: "Flexible personal loans with competitive interest rates starting from 8.99% p.a.",
      icon: Banknote,
    },
    {
      title: "Student Loan",
      description: "Affordable education financing options to help you achieve your academic goals.",
      icon: GraduationCap,
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isScrolled={false} />
      <main className="container mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Loan Solutions</h2>
          <p className="text-gray-600 mt-4">
            Discover our range of loan products designed to meet your financial needs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loanTypes.map((loan, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <loan.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{loan.title}</h3>
              <p className="text-gray-600">{loan.description}</p>
              <div className="mt-6 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-32">Interest Rate:</span>
                  <span className="font-medium text-gray-700">
                    {index === 0 ? "8.99%" : "4.99%"} p.a.
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-32">Term Length:</span>
                  <span className="font-medium text-gray-700">
                    {index === 0 ? "1-5 years" : "5-15 years"}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-32">Max Amount:</span>
                  <span className="font-medium text-gray-700">
                    {index === 0 ? "$50,000" : "$100,000"}
                  </span>
                </div>
              </div>
              <button className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                Apply Now
              </button>
            </div>
          ))}
        </div>
        <div className="mt-16 bg-blue-50 p-8 rounded-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Loans?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <Banknote className="h-8 w-8 text-blue-600 mr-4" />
              <div>
                <h4 className="font-semibold mb-2">Competitive Rates</h4>
                <p className="text-gray-600 text-sm">Our interest rates are among the most competitive in the market.</p>
              </div>
            </div>
            <div className="flex items-start">
              <GraduationCap className="h-8 w-8 text-blue-600 mr-4" />
              <div>
                <h4 className="font-semibold mb-2">Student-Friendly</h4>
                <p className="text-gray-600 text-sm">Flexible repayment options that work with your academic schedule.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Banknote className="h-8 w-8 text-blue-600 mr-4" />
              <div>
                <h4 className="font-semibold mb-2">Secure & Transparent</h4>
                <p className="text-gray-600 text-sm">No hidden charges with complete transparency throughout the process.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Loans;