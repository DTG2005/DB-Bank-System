'use client';

import { useState, useEffect } from 'react';
import { Banknote, GraduationCap } from 'lucide-react';

const Scholarships: React.FC = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await fetch('/api/auth/scholarship'); // API to fetch scholarships
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setScholarships(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Scholarship Opportunities</h2>
          <p className="text-gray-600 mt-4">
            Explore the various scholarship options available for students pursuing higher education.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {scholarships.map((scholarship, index) => (
            <div
              key={scholarship.ScholarshipID}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Fix: Render icons directly */}
              {index === 0 ? (
                <Banknote className="h-12 w-12 text-blue-600 mb-4" />
              ) : (
                <GraduationCap className="h-12 w-12 text-blue-600 mb-4" />
              )}
              <h3 className="text-xl font-semibold mb-2">{scholarship.ScholarshipName}</h3>
              <p className="text-gray-600 mb-4">{scholarship.description}</p>
              <div className="mt-6 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-32">Amount:</span>
                  <span className="font-medium text-gray-700">${scholarship.Amount}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-32">Eligibility:</span>
                  <span className="font-medium text-gray-700">{scholarship.EligibilityCriteria}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-32">Deadline:</span>
                  <span className="font-medium text-gray-700">{new Date(scholarship.ApplicationDeadline).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 bg-blue-50 p-8 rounded-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Apply for Scholarships?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <Banknote className="h-8 w-8 text-blue-600 mr-4" />
              <div>
                <h4 className="font-semibold mb-2">Financial Support</h4>
                <p className="text-gray-600 text-sm">Scholarships help reduce the financial burden of higher education.</p>
              </div>
            </div>
            <div className="flex items-start">
              <GraduationCap className="h-8 w-8 text-blue-600 mr-4" />
              <div>
                <h4 className="font-semibold mb-2">Educational Opportunities</h4>
                <p className="text-gray-600 text-sm">Scholarships enable you to focus on your studies without financial stress.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Banknote className="h-8 w-8 text-blue-600 mr-4" />
              <div>
                <h4 className="font-semibold mb-2">Prestige & Recognition</h4>
                <p className="text-gray-600 text-sm">Being awarded a scholarship can enhance your resume and academic profile.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Updated Section: Visit Nearest Branch */}
        <div className="mt-8 bg-blue-50 p-8 rounded-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Need More Information?</h3>
          <p className="text-gray-600 mb-6">
            For additional details on available scholarships and assistance with your application, visit the nearest branch. Our team will be happy to guide you through the process and answer any questions you may have.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Scholarships;
