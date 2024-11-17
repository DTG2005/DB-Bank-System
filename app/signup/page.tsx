"use client";
import { useState } from "react";
import {
  User,
  IdCard,
  MapPin,
  Building2,
  Mail,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Building,
  CreditCard,
} from "lucide-react";

const AccountCreation = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    identificationNumber: "",
    idType: "passport",
    address: "",
    accountType: "savings",
    branch: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const steps = [
    { title: "Personal Info", icon: User },
    { title: "Address", icon: MapPin },
    { title: "Account Setup", icon: Building2 },
    { title: "Security", icon: Mail },
  ];

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFinish = () => {
    // Handle finish logic here
    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          alert("Account created successfully!");
          window.location.href = "/login";
        } else {
          alert(data.error);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred while creating the account.");
      });
  };

  const getStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-6">
              Personal Info
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-blue-100">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-3 bg-white/5 border border-blue-200/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="text-blue-100">Middle Name</label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-3 bg-white/5 border border-blue-200/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="text-blue-100">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-3 bg-white/5 border border-blue-200/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="text-blue-100">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-3 bg-white/5 border border-blue-200/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white"
                />
              </div>
              <div>
                <label className="text-blue-100">Mobile Number</label>
                <input
                  type="mobile"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-3 bg-white/5 border border-blue-200/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-6">
              Address Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-blue-100">Address</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 h-5 w-5" />
                  <input
                    type="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full mt-1 pl-10 p-3 bg-white/5 border border-blue-200/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white"
                    placeholder="Enter address"
                  />
                </div>
              </div>
              <div>
                <label className="text-blue-100">ID Number</label>
                <div className="relative">
                  <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 h-5 w-5" />
                  <input
                    type="identificationNumber"
                    name="identificationNumber"
                    value={formData.identificationNumber}
                    onChange={handleInputChange}
                    className="w-full mt-1 pl-10 p-3 bg-white/5 border border-blue-200/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white"
                    placeholder="Enter ID Number"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-6">
              Account Setup
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-blue-100">Account Type</label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {["Savings", "Checking", "Business", "Student"].map(
                    (type) => (
                      <div
                        key={type}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.accountType.toLowerCase() ===
                          type.toLowerCase()
                            ? "border-blue-400 bg-blue-400/20"
                            : "border-blue-200/20 bg-white/5 hover:bg-white/10"
                        }`}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            accountType: type.toLowerCase(),
                          })
                        }
                      >
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-6 w-6 text-blue-200" />
                          <span className="text-white">{type}</span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div>
                <label className="text-blue-100">Branch Location</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 h-5 w-5" />
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    className="w-full mt-1 pl-10 p-3 bg-white/5 border border-blue-200/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white"
                  >
                    <option value="">Select branch</option>
                    <option value="Main Branch">Main Branch</option>
                    <option value="North Branch">North Branch</option>
                    <option value="South Branch">South Branch</option>
                    <option value="East Branch">East Branch</option>
                    <option value="West Branch">West Branch</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-6">
              Security Setup
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-blue-100">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 h-5 w-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full mt-1 pl-10 p-3 bg-white/5 border border-blue-200/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white"
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              <div>
                <label className="text-blue-100">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-3 bg-white/5 border border-blue-200/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white"
                  placeholder="Create password"
                />
              </div>
              <div>
                <label className="text-blue-100">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-3 bg-white/5 border border-blue-200/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white"
                  placeholder="Confirm password"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-6">
              Account Setup
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-blue-100">Account Type</label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {["Savings", "Checking", "Business", "Student"].map(
                    (type) => (
                      <div
                        key={type}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.accountType.toLowerCase() ===
                          type.toLowerCase()
                            ? "border-blue-400 bg-blue-400/20"
                            : "border-blue-200/20 bg-white/5 hover:bg-white/10"
                        }`}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            accountType: type.toLowerCase(),
                          })
                        }
                      >
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-6 w-6 text-blue-200" />
                          <span className="text-white">{type}</span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div>
                <label className="text-blue-100">Branch Location</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 h-5 w-5" />
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    className="w-full mt-1 pl-10 p-3 bg-white/5 border border-blue-200/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white"
                  >
                    <option value="">Select branch</option>
                    <option value="main">Main Branch</option>
                    <option value="north">North Branch</option>
                    <option value="south">South Branch</option>
                    <option value="east">East Branch</option>
                    <option value="west">West Branch</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-6">
              Security Setup
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-blue-100">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 h-5 w-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full mt-1 pl-10 p-3 bg-white/5 border border-blue-200/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white"
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              <div>
                <label className="text-blue-100">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-3 bg-white/5 border border-blue-200/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white"
                  placeholder="Create password"
                />
              </div>
              <div>
                <label className="text-blue-100">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-3 bg-white/5 border border-blue-200/20 rounded-lg focus:ring-2 focus:ring-blue-400 text-white"
                  placeholder="Confirm password"
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="max-w-lg w-full p-8 bg-gray-800 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          {steps.map((s, index) => (
            <div
              key={s.title}
              className={`flex items-center ${
                index + 1 <= step ? "text-blue-400" : "text-blue-200"
              }`}
            >
              <s.icon className="h-5 w-5" />
              <span className="ml-2 text-sm">{s.title}</span>
            </div>
          ))}
        </div>
        <div>{getStepContent()}</div>
        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Previous</span>
            </button>
          )}
          {step < steps.length ? (
            <button
              onClick={nextStep}
              className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition"
            >
              <span>Next</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="ml-auto px-4 py-2 bg-green-500 text-white rounded-lg flex items-center space-x-2 hover:bg-green-600 transition"
            >
              <CheckCircle className="h-5 w-5" />
              <span>Finish</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountCreation;
