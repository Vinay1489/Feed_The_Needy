"use client";
import React, { useState } from "react";
import AuthLayout from "./AuthLayout";

function NGOSignup() {
  const [formData, setFormData] = useState({
    orgName: "",
    regNumber: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    website: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log(formData);
  };

  return (
    <AuthLayout
      title="NGO Registration"
      subtitle="Join our network of food rescue organizations and help reduce food waste"
    >
      <div className="w-full max-w-4xl">
        <form
          onSubmit={handleSubmit}
          className="flex overflow-hidden flex-col px-8 py-9 mx-auto w-full text-sm rounded-xl border border-solid shadow-xl bg-white bg-opacity-30 border-white border-opacity-20 max-md:px-5 max-md:max-w-full"
        >
          <h2 className="self-start text-2xl font-bold leading-none text-slate-950 mb-6">
            Register Your Organization
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label className="self-start font-medium leading-none text-slate-950">
                Organization Name
              </label>
              <input
                type="text"
                name="orgName"
                value={formData.orgName}
                onChange={handleChange}
                placeholder="Your organization's name"
                required
                className="overflow-hidden px-3.5 py-4 mt-2.5 bg-white rounded-md border border-solid border-slate-200 text-slate-500 w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="self-start font-medium leading-none text-slate-950">
                Registration Number
              </label>
              <input
                type="text"
                name="regNumber"
                value={formData.regNumber}
                onChange={handleChange}
                placeholder="NGO registration number"
                required
                className="overflow-hidden px-3.5 py-4 mt-2.5 bg-white rounded-md border border-solid border-slate-200 text-slate-500 w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="self-start font-medium leading-none text-slate-950">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="organization@example.org"
                required
                className="overflow-hidden px-3.5 py-4 mt-2.5 bg-white rounded-md border border-solid border-slate-200 text-slate-500 w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="self-start font-medium leading-none text-slate-950">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Organization contact number"
                required
                className="overflow-hidden px-3.5 py-4 mt-2.5 bg-white rounded-md border border-solid border-slate-200 text-slate-500 w-full"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="self-start font-medium leading-none text-slate-950">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street address"
                required
                className="overflow-hidden px-3.5 py-4 mt-2.5 bg-white rounded-md border border-solid border-slate-200 text-slate-500 w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="self-start font-medium leading-none text-slate-950">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
                className="overflow-hidden px-3.5 py-4 mt-2.5 bg-white rounded-md border border-solid border-slate-200 text-slate-500 w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="self-start font-medium leading-none text-slate-950">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State/Province"
                required
                className="overflow-hidden px-3.5 py-4 mt-2.5 bg-white rounded-md border border-solid border-slate-200 text-slate-500 w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="self-start font-medium leading-none text-slate-950">
                ZIP Code
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="ZIP/Postal code"
                required
                className="overflow-hidden px-3.5 py-4 mt-2.5 bg-white rounded-md border border-solid border-slate-200 text-slate-500 w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="self-start font-medium leading-none text-slate-950">
                Website (Optional)
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://yourorganization.org"
                className="overflow-hidden px-3.5 py-4 mt-2.5 bg-white rounded-md border border-solid border-slate-200 text-slate-500 w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="self-start font-medium leading-none text-slate-950">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                required
                className="overflow-hidden px-3.5 py-4 mt-2.5 bg-white rounded-md border border-solid border-slate-200 text-slate-500 w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="self-start font-medium leading-none text-slate-950">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                className="overflow-hidden px-3.5 py-4 mt-2.5 bg-white rounded-md border border-solid border-slate-200 text-slate-500 w-full"
              />
            </div>
          </div>

          <div className="flex gap-2 self-start mt-6 font-medium leading-none text-slate-950">
            <div
              className={`flex justify-center items-center shrink-0 w-4 h-4 rounded border border-solid cursor-pointer ${
                formData.agreeTerms
                  ? "bg-blue-600 border-blue-600"
                  : "border-blue-600"
              }`}
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  agreeTerms: !prev.agreeTerms,
                }))
              }
            >
              {formData.agreeTerms && (
                <svg
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 1L3.5 6.5L1 4"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <label
              className="flex-auto cursor-pointer"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  agreeTerms: !prev.agreeTerms,
                }))
              }
            >
              I agree to the terms and conditions and privacy policy
            </label>
          </div>

          <button
            type="submit"
            disabled={!formData.agreeTerms}
            className={`px-16 py-4 mt-6 font-medium leading-none text-center rounded-md text-slate-50 transition-colors max-md:px-5 max-md:max-w-full ${
              formData.agreeTerms
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-400 cursor-not-allowed"
            }`}
          >
            Register Organization
          </button>

          <div className="mt-6 text-center text-slate-600">
            Already registered?{" "}
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Sign in to your account
            </a>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

export default NGOSignup;
