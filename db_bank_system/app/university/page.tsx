"use client";

import { useState } from 'react';
import Navbar from '../NavBar';
import { Gift, Percent } from 'lucide-react';

const University: React.FC = () => {
  const [scholarships] = useState([
    {
      title: "Merit-based Scholarship",
      description: "Rewarding top performers with up to 50% fee waivers.",
      icon: Percent,
    },
    {
      title: "Need-based Financial Aid",
      description: "Financial assistance for deserving students.",
      icon: Gift,
    },
    {
      title: "Research Grants",
      description: "Special grants for research projects and initiatives.",
      icon: Gift,
    },
    {
      title: "Overseas Study Scholarships",
      description: "Support for students aspiring to study abroad.",
      icon: Percent,
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isScrolled={false} />
      <main className="container mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">University Scholarships</h2>
          <p className="text-gray-600 mt-4">Explore a variety of scholarships available for university students.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {scholarships.map((scholarship, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <scholarship.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{scholarship.title}</h3>
              <p className="text-gray-600">{scholarship.description}</p>
              <button className="mt-4 text-blue-600 hover:text-blue-700 flex items-center">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default University;
