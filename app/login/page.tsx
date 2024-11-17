
"use client";
import React, { useState } from 'react';
import { Eye, EyeOff, Lock, CreditCard, Building2, ArrowRight } from 'lucide-react';

const BankingLogin = () => {
  const [credentials, setCredentials] = useState({
    bankingId: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Section - Brand & Info */}
        <div className="w-1/2 p-12 bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-lg relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full animate-pulse" />
            <div className="absolute bottom-40 right-20 w-32 h-32 bg-purple-500/20 rounded-full animate-pulse delay-700" />
            <div className="absolute top-40 right-10 w-24 h-24 bg-indigo-500/20 rounded-full animate-pulse delay-500" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-12">
              <Building2 className="w-10 h-10 text-blue-100" />
              <h1 className="text-3xl font-bold text-white">SecureBank</h1>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white leading-tight">
                Welcome to the Future of Banking
              </h2>
              <p className="text-blue-100 text-lg">
                Experience secure, seamless, and smart banking solutions tailored for you.
              </p>

              {/* Features List */}
              <div className="space-y-4 mt-8">
                {['24/7 Secure Access', 'Smart Banking Solutions', 'Global Transactions'].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 text-blue-100">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative Image */}
            <div className="absolute bottom-0 right-0 opacity-10">
              <svg className="w-64 h-64" viewBox="0 0 200 200">
                <path fill="currentColor" d="M45,-77.2C58.3,-71.3,69.1,-58.9,77.8,-44.7C86.5,-30.4,93.2,-14.2,92.4,1.5C91.5,17.2,83.1,32.4,73.5,46.5C63.8,60.6,52.9,73.5,39.2,79.7C25.4,85.9,8.8,85.4,-7.3,82.6C-23.4,79.8,-39,74.7,-52.1,66.2C-65.2,57.7,-75.8,45.8,-81.6,31.7C-87.4,17.6,-88.4,1.3,-85.5,-14C-82.6,-29.3,-75.8,-43.7,-65.1,-55.3C-54.4,-67,-39.8,-76,-25.2,-79.5C-10.5,-83,-2.1,-81.1,8.4,-77.6C18.8,-74.1,31.7,-69.1,45,-77.2Z" transform="translate(100 100)" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-1/2 p-12">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2">Login to Your Account</h2>
            <p className="text-blue-200 mb-8">Enter your credentials to access your account</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Banking ID Field */}
              <div className="space-y-2 group">
                <label className="block text-sm font-medium text-blue-100">
                  Banking ID
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 h-5 w-5 transition-colors group-hover:text-blue-400" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-blue-200/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-blue-200/50 text-white transition-all hover:bg-white/10"
                    placeholder="Enter your Banking ID"
                    value={credentials.bankingId}
                    onChange={(e) => setCredentials({...credentials, bankingId: e.target.value})}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2 group">
                <label className="block text-sm font-medium text-blue-100">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 h-5 w-5 transition-colors group-hover:text-blue-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-10 pr-12 py-3 bg-white/5 border border-blue-200/20 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-blue-200/50 text-white transition-all hover:bg-white/10"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-blue-100 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-blue-100 cursor-pointer group">
                  <input type="checkbox" className="mr-2 rounded border-blue-200/20 bg-white/5 focus:ring-blue-400 cursor-pointer" />
                  Remember me
                </label>
                <a href="#" className="text-blue-300 hover:text-blue-200 transition-colors">
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Logging in...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Login to Online Banking
                    <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </button>

              {/* Sign Up Link */}
              <p className="text-center text-blue-200">
                Don't have an account?{' '}
                <a href="#" className="text-blue-300 hover:text-blue-200 font-medium transition-colors">
                  Register now
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankingLogin;