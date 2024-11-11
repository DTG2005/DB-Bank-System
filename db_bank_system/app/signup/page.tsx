"use client";
// Import the CSS module
import styles from "./Signup.module.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    accountType: "Savings",
    address: "",
    dob: "",
    identificationNumber: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);

    //Send a POST request to /api/auth/register
    //If successful, redirect to /login
    //If not, display an error
    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    router.push("/login");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.formTitle}>Create Your Bank Account</h1>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        {[
          { name: "firstName", type: "text", label: "First Name" },
          { name: "lastName", type: "text", label: "Last Name" },
          { name: "email", type: "email", label: "Email" },
          { name: "password", type: "password", label: "Password" },
          {
            name: "confirmPassword",
            type: "password",
            label: "Confirm Password",
          },
          { name: "mobileNumber", type: "tel", label: "Mobile Number" },
          { name: "dob", type: "date", label: "Date of Birth" },
          {
            name: "identificationNumber",
            type: "text",
            label: "Identification Number (Aadhar)",
          },
        ].map((field) => (
          <div className={styles.formGroup} key={field.name}>
            <label className={styles.label} htmlFor={field.name}>
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              id={field.name}
              className={styles.input}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="accountType">
            Account Type
          </label>
          <select
            name="accountType"
            id="accountType"
            className={styles.select}
            onChange={handleChange}
            value={formData.accountType}
            required
          >
            <option value="Savings">Savings</option>
            <option value="Current">Current</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="address">
            Address
          </label>
          <textarea
            name="address"
            id="address"
            className={styles.textarea}
            rows={3}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
