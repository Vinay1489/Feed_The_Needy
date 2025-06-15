import React, { useState } from "react";
import {
  FaBuilding,
  FaUserShield,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";

const InputField = ({
  icon,
  name,
  placeholder,
  value,
  onChange,
  type = "text",
}) => (
  <div className="relative w-full">
    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-lg">
      {icon}
    </span>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      required={name !== "website"}
    />
  </div>
);

const NGOAdminRegister = () => {
  const [formData, setFormData] = useState({
    organization: "",
    registration: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    website: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admin Registration:", formData);
    // Add form validation and API call
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-blue-800 flex items-center justify-center mb-2">
          🏢 Admin Profile Setup
        </h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Register your NGO with valid details and create your admin profile.
        </p>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <InputField
            icon={<FaBuilding className="text-yellow-600" />}
            name="organization"
            placeholder="Organization Name"
            value={formData.organization}
            onChange={handleChange}
          />
          <InputField
            icon={<FaUserShield className="text-purple-600" />}
            name="registration"
            placeholder="Registration Number"
            value={formData.registration}
            onChange={handleChange}
          />
          <InputField
            icon={<FaEnvelope className="text-pink-500" />}
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            icon={<FaPhone className="text-indigo-500" />}
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
          <InputField
            icon={<FaMapMarkerAlt className="text-red-500" />}
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          <InputField
            icon={<FaCity className="text-teal-600" />}
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
          <InputField
            icon={<FaCity className="text-cyan-600" />}
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
          />
          <InputField
            icon={<FaCity className="text-emerald-600" />}
            name="zip"
            placeholder="ZIP Code"
            value={formData.zip}
            onChange={handleChange}
          />
          <InputField
            icon={<FaGlobe className="text-green-600" />}
            name="website"
            placeholder="Website (Optional)"
            value={formData.website}
            onChange={handleChange}
          />
          <InputField
            icon={<FaLock className="text-gray-700" />}
            name="password"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <InputField
            icon={<FaLock className="text-gray-700" />}
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <div className="md:col-span-2 flex items-center mt-2">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              className="mr-2"
              required
            />
            <label className="text-sm">
              I agree to the{" "}
              <a href="#" className="text-blue-600 font-medium">
                terms and conditions
              </a>
            </label>
          </div>
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <FaCheckCircle /> Save Admin Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NGOAdminRegister;
