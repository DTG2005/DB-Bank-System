"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Login: React.FC = () => {
  const [internetBankingId, setInternetBankingId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = () => {
    // Handle login logic
    console.log("Login attempted with:", { internetBankingId, password });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <main className="container mx-auto px-6 py-24">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Internet Banking Login
          </h2>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="internetBankingId"
                className="block text-gray-700 mb-2"
              >
                Internet Banking ID
              </label>
              <input
                type="text"
                id="internetBankingId"
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
                value={internetBankingId}
                onChange={(e) => setInternetBankingId(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-600" />
                  )}
                </button>
              </div>
            </div>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
