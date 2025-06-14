"use client";
import React, { useState } from "react";
import AuthLayout from "./AuthLayout";
import {
  FaUserTie,
  FaIdBadge,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
  FaLock,
  FaUnlockAlt,
} from "react-icons/fa";

function AdminSetup() {
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
    console.log("Admin Profile:", formData);
  };

  return (
    <AuthLayout
      title="Admin (NGO) Setup"
      subtitle="Configure your admin organization profile and secure access"
    >
      <div className="w-full max-w-4xl">
        <form
          onSubmit={handleSubmit}
          className="flex overflow-hidden flex-col px-8 py-9 mx-auto w-full text-sm rounded-xl border border-solid shadow-xl bg-white bg-opacity-30 border-white border-opacity-20 max-md:px-5 max-md:max-w-full"
        >
          <h2 className="text-2xl font-bold text-slate-950 mb-6">
            Admin Profile Setup
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                icon: <FaUserTie />,
                label: "Organization Name",
                name: "orgName",
                type: "text",
                placeholder: "Your organization name",
              },
              {
                icon: <FaIdBadge />,
                label: "Registration Number",
                name: "regNumber",
                type: "text",
                placeholder: "NGO registration number",
              },
              {
                icon: <FaEnvelope />,
                label: "Email Address",
                name: "email",
                type: "email",
                placeholder: "admin@example.org",
              },
              {
                icon: <FaPhoneAlt />,
                label: "Phone Number",
                name: "phone",
                type: "tel",
                placeholder: "Contact number",
              },
              {
                icon: <FaMapMarkerAlt />,
                label: "Address",
                name: "address",
                type: "text",
                placeholder: "Street address",
                fullWidth: true,
              },
              {
                icon: <FaCity />,
                label: "City",
                name: "city",
                type: "text",
                placeholder: "City",
              },
              {
                icon: <FaCity />,
                label: "State",
                name: "state",
                type: "text",
                placeholder: "State/Province",
              },
              {
                icon: <FaCity />,
                label: "ZIP Code",
                name: "zipCode",
                type: "text",
                placeholder: "ZIP/Postal code",
              },
              {
                icon: <FaGlobe />,
                label: "Website (Optional)",
                name: "website",
                type: "url",
                placeholder: "https://example.org",
              },
              {
                icon: <FaLock />,
                label: "Password",
                name: "password",
                type: "password",
                placeholder: "Create a strong password",
              },
              {
                icon: <FaUnlockAlt />,
                label: "Confirm Password",
                name: "confirmPassword",
                type: "password",
                placeholder: "Confirm password",
              },
            ].map((field, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  field.fullWidth ? "md:col-span-2" : ""
                }`}
              >
                <label className="font-medium text-slate-950 flex items-center gap-2">
                  {field.icon} {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required={field.name !== "website"}
                  className="px-3.5 py-4 mt-2.5 bg-white rounded-md border border-slate-200 text-slate-500 w-full"
                />
              </div>
            ))}
          </div>

          <div className="flex items-start gap-2 mt-6 font-medium text-slate-950">
            <div
              className={`w-4 h-4 border rounded cursor-pointer flex items-center justify-center ${
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
              className="cursor-pointer"
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
            className={`px-16 py-4 mt-6 font-medium text-center rounded-md text-white transition-colors ${
              formData.agreeTerms
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-400 cursor-not-allowed"
            }`}
          >
            Save Admin Profile
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}

export default AdminSetup;
