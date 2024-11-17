"use client"; // Add this line to mark the component as a Client Component

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../NavBar";
import { Eye, EyeOff, Loader } from "lucide-react";

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    accountType: "Savings", // default value
    address: "",
    dob: "",
    identificationNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Redirect to login page upon successful registration
        router.push("/login");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to register. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isScrolled={false} />
      <div className="flex flex-col justify-center items-center py-12">
        <h1 className="text-3xl font-bold mb-8">Create Your Bank Account</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-full max-w-md"
        >
          {[
            { name: "firstName", label: "First Name", type: "text" },
            { name: "middleName", label: "Middle Name", type: "text" },
            { name: "lastName", label: "Last Name", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "password", label: "Password", type: "password" },
            {
              name: "confirmPassword",
              label: "Confirm Password",
              type: "password",
            },
            { name: "mobileNumber", label: "Mobile Number", type: "tel" },
            { name: "dob", label: "Date of Birth", type: "date" },
            {
              name: "identificationNumber",
              label: "Identification Number (Aadhar)",
              type: "text",
            },
          ].map(({ name, label, type }) => (
            <div className="mb-4" key={name}>
              <label className="block text-sm font-medium mb-2" htmlFor={name}>
                {label}
              </label>
              <input
                type={type}
                name={name}
                id={name}
                className="w-full p-2 border rounded"
                onChange={handleChange}
                required
              />
              {name === "password" && (
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
              )}
            </div>
          ))}

          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="accountType"
            >
              Account Type
            </label>
            <select
              name="accountType"
              id="accountType"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              value={formData.accountType}
              required
            >
              <option value="Savings">Savings</option>
              <option value="Current">Current</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="address">
              Address
            </label>
            <textarea
              name="address"
              id="address"
              className="w-full p-2 border rounded"
              rows={3}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white transition-all flex justify-center items-center ${
              isLoading
                ? "bg-blue-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin h-5 w-5 text-white" />
            ) : (
              "Sign Up"
            )}
          </button>
          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
