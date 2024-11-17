"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";

const Login: React.FC = () => {
  const [internetBankingId, setInternetBankingId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = () => {
    setIsLoading(true);
    setError("");
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ internetBankingId, password }),
    })
      .then((response) => {
        setIsLoading(false);
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then(() => {
        window.location.href = "/dashboard";
      })
      .catch(() => {
        setIsLoading(false);
        setError(
          "Login failed. Please check your internet banking ID and password."
        );
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
      <main className="container mx-auto px-6 py-24">
        <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-10 space-y-6">
          <h2 className="text-4xl font-bold text-blue-800 text-center">
            Internet Banking Login
          </h2>
          {error && <p className="text-red-600 text-center">{error}</p>}
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
                className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200 transition-all"
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
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200 transition-all"
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
              className={`w-full py-3 rounded-lg text-white transition-all flex justify-center items-center ${
                isLoading
                  ? "bg-blue-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="animate-spin h-5 w-5 text-white" />
              ) : (
                "Login"
              )}
            </button>
            <div className="text-center text-gray-500">
              <a
                href="/forgot-password"
                className="underline hover:text-blue-700"
              >
                Forgot Password?
              </a>
              <span className="mx-2">|</span>
              <a href="/signup" className="underline hover:text-blue-700">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
