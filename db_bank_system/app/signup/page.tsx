"use client"; // Add this line to mark the component as a Client Component

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import Navbar from '../NavBar';


const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
    accountType: 'Savings', // default value
    address: '',
    dob: '',
    identificationNumber: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement sign-up logic, form validation, and data submission to the server
    console.log(formData);
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Create Your Bank Account</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="tel"
            name="mobileNumber"
            id="mobileNumber"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="accountType">Account Type</label>
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
          <label className="block text-sm font-medium mb-2" htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            name="dob"
            id="dob"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="identificationNumber">Identification Number (Aadhar)</label>
          <input
            type="text"
            name="identificationNumber"
            id="identificationNumber"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="address">Address</label>
          <textarea
            name="address"
            id="address"
            className="w-full p-2 border rounded"
            rows="3"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
