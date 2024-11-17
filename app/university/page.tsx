"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck,CreditCard, Search, DollarSign, CheckCircle, PlusCircle,  XCircle } from 'lucide-react';

const ScholarshipPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const scholarships = [
    {
      title: "Merit-Based Scholarship",
      description: "Awarded to students with outstanding academic achievements in the current year.",
      eligibility: "CGPA above 8.5",
      amount: 2000,
      deadline: "31st Dec 2024",
      applied: false
    },
    {
      title: "Sports Scholarship",
      description: "For students excelling in sports at the national or international level.",
      eligibility: "Active participation in university-level sports",
      amount: 1500,
      deadline: "15th Nov 2024",
      applied: false
    },
    {
      title: "Need-Based Scholarship",
      description: "For students from financially challenged backgrounds.",
      eligibility: "Family income below 5 LPA",
      amount: 1000,
      deadline: "30th Nov 2024",
      applied: false
    },
    {
      title: "Research Scholarship",
      description: "For students pursuing research in science and technology fields.",
      eligibility: "Currently enrolled in a research program",
      amount: 3000,
      deadline: "10th Dec 2024",
      applied: false
    }
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredScholarships = scholarships.filter(scholarship =>
    scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scholarship.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-4">
        
        <div className="mb-8">
          <h1 className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rotate-45" />
            Scholarship Portal
          </h1>
        </div>

        <nav className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <Search className="w-5 h-5" />
            Search Scholarships
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <ClipboardCheck className="w-5 h-5" />
            My Applications
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold">
              Apply for Scholarships
            </h1>
            <p className="text-gray-600">
              Browse and apply for available scholarships to support your education.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search scholarships"
              className="w-full p-4 border border-gray-300 rounded-lg"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Scholarship List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {filteredScholarships.map((scholarship, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                    {scholarship.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">{scholarship.description}</p>
                  <p className="text-sm text-gray-600 mb-2"><strong>Eligibility:</strong> {scholarship.eligibility}</p>
                  <p className="text-sm text-gray-600 mb-2"><strong>Amount:</strong> ${scholarship.amount}</p>
                  <p className="text-sm text-gray-600 mb-2"><strong>Deadline:</strong> {scholarship.deadline}</p>

                  <button
                    className={`w-full py-3 rounded-lg text-white ${scholarship.applied ? 'bg-green-500' : 'bg-blue-500'} hover:bg-blue-600`}
                    disabled={scholarship.applied}
                  >
                    {scholarship.applied ? (
                      <div className="flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Applied
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <PlusCircle className="w-5 h-5 mr-2" />
                        Apply Now
                      </div>
                    )}
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default ScholarshipPage;
