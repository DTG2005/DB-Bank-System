"use client";
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck, CreditCard, Search, DollarSign, CheckCircle, PlusCircle } from 'lucide-react';
import axios from 'axios'; // Import axios for API calls
import { Dialog, DialogOverlay, DialogContent } from "@/components/ui/dialog";

type Scholarship = {
  ScholarshipName: string;
  Amount: number;
  EligibilityCriteria: string;
  ApplicationDeadline: string;
  applied: boolean;
};

const ScholarshipPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  // Fetch scholarships from the database
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await axios.get<Scholarship[]>('/api/auth/scholarship'); // Adjust the API endpoint as needed
        setScholarships(response.data);
      } catch (error) {
        console.error("Error fetching scholarships: ", error);
      }
    };

    fetchScholarships();
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleApplyClick = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  const filteredScholarships = scholarships.filter(scholarship =>
    scholarship.ScholarshipName.toLowerCase().includes(searchTerm.toLowerCase())
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
                    {scholarship.ScholarshipName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2"><strong>Amount:</strong> ${scholarship.Amount}</p>
                  <p className="text-sm text-gray-600 mb-2"><strong>Eligibility:</strong> {scholarship.EligibilityCriteria}</p>
                  <p className="text-sm text-gray-600 mb-2"><strong>Deadline:</strong> {new Date(scholarship.ApplicationDeadline).toLocaleDateString()}</p>

                  <button
                    onClick={handleApplyClick}
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

      {/* Dialog Box */}
      {showDialog && (
        <DialogOverlay onClick={closeDialog} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <DialogContent onClick={(e) => e.stopPropagation()} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Visit Our Branch</h2>
            <p className="text-gray-600 mb-4">Please visit our nearest branch for more information on how to complete your scholarship application.</p>
            <button onClick={closeDialog} className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Close</button>
          </DialogContent>
        </DialogOverlay>
      )}
    </div>
  );
};

export default ScholarshipPage;
