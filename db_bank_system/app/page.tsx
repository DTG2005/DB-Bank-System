"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  HelpCircle,
  ChevronDown,
  Search,
  ArrowRight,
  Phone,
  Shield,
  Gift,
  CreditCard,
  Percent,
  Building,
  Users,
  AtSign,
} from "lucide-react";
import Navbar from "./NavBar";

const HomePage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isScrolled={isScrolled} />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <PrivilegesSection />
        <StatisticsSection />
        <DigitalBankingSection />
        <SecurityAlert />
      </main>
      <FloatingActionButtons />
    </div>
  );
};

const HeroSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const slides = [
    {
      title: "Elevate Exclusivity with digital cards",
      description: "Experience unlimited privileges and premium benefits",
      buttonText: "Apply Now",
      image: "/api/placeholder/600/400",
    },
    {
      title: "Fulfill your dream career",
      description:
        "Empower your academic growth with hassle-free university loans",
      buttonText: "Get Started",
      image: "/api/placeholder/600/400",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pt-32 pb-16 bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              {slides[activeSlide].title}
            </h1>
            <p className="text-xl text-gray-600">
              {slides[activeSlide].description}
            </p>
            <div className="flex space-x-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition-colors flex items-center">
                {slides[activeSlide].buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-red-600 text-red-600 hover:bg-red-50 px-8 py-3 rounded-lg transition-colors">
                Know More
              </button>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src={slides[activeSlide].image}
              alt="Hero"
              className="rounded-lg shadow-2xl transition-all duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedProducts: React.FC = () => {
  const products = [
    {
      icon: CreditCard,
      title: "Credit Cards",
      description: "Exclusive rewards and benefits",
    },
    {
      icon: Building,
      title: "Savings Account",
      description: "High interest rates",
    },
    {
      icon: Gift,
      title: "Personal Loans",
      description: "Quick approval process",
    },
    {
      icon: Percent,
      title: "Scholarships",
      description: "Attractive interest rates",
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Featured Products
          </h2>
          <p className="text-gray-600 mt-4">
            Discover our range of banking solutions
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <product.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-600">{product.description}</p>
              <button className="mt-4 text-blue-600 hover:text-blue-700 flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PrivilegesSection: React.FC = () => {
  const privileges = [
    {
      icon: Gift,
      title: "Ghotala Rewardz",
      description: "Join our exclusive rewards program",
    },
    {
      icon: Percent,
      title: "Ghotala Offers",
      description: "Personalized offers curated for you",
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Privileges that make banking a pleasure
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {privileges.map((privilege, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <privilege.icon className="h-16 w-16 text-blue-600 mb-6" />
              <h3 className="text-2xl font-semibold mb-4">{privilege.title}</h3>
              <p className="text-gray-600 mb-6">{privilege.description}</p>
              <button className="text-blue-600 hover:text-blue-700 flex items-center">
                Explore Now <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatisticsSection: React.FC = () => {
  const stats = [
    { value: "1450+", label: "Banking Outlets", icon: Building },
    { value: "880+", label: "Cities", icon: Users },
    { value: "9.70M+", label: "Customers", icon: AtSign },
    { value: "1,300+", label: "ATMs", icon: CreditCard },
  ];

  return (
    <div className="bg-blue-600 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <stat.icon className="h-8 w-8 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DigitalBankingSection: React.FC = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-white">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Experience Digital Banking
              </h2>
              <p className="text-blue-100 mb-8">
                Bank anywhere, anytime with our secure digital banking solutions
              </p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                Get Started
              </button>
            </div>
            <div className="relative">
              <img
                src="/api/placeholder/500/300"
                alt="Digital Banking"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SecurityAlert: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-6 w-6 mr-3 text-green-400" />
            <span>
              DIAL <span className="text-green-400 font-bold">1930</span> FOR
              ONLINE FINANCIAL FRAUD
            </span>
          </div>
          <div className="flex items-center">
            <Phone className="h-6 w-6 mr-3 text-green-400" />
            <span>
              Report cybercrime at{" "}
              <a
                href="https://cybercrime.gov.in"
                className="text-green-400 hover:underline"
              >
                WWW.CYBERCRIME.GOV.IN
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const FloatingActionButtons: React.FC = () => {
  return (
    <div className="fixed bottom-8 right-8 flex flex-col space-y-4">
      <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors">
        <Phone className="h-6 w-6" />
      </button>
      <button className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-colors">
        <HelpCircle className="h-6 w-6" />
      </button>
    </div>
  );
};

export default HomePage;
