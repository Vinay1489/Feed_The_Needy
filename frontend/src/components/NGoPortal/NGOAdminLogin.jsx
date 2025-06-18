import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const NGOAdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("NGO Admin Login Submitted:", formData);
    // Integrate your backend API call here
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center px-4">
      <div className="bg-white p-12 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-2">
          🏢 NGO Admin Login
        </h1>
        <p className="text-center text-sm text-gray-600 mb-6">
          Sign in to manage your organization's food rescue operations
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaEnvelope className="text-blue-500" />
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@ngo.org"
              required
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
            />
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaLock className="text-gray-700" />
            </span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              <Link to="/ngologinforgot">Forgot password?</Link>
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-medium"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-700 mt-6">
          Don’t have an account?{" "}
          <a className="text-blue-600 font-semibold hover:underline">
            <Link to="/ngoregister"> Register Here</Link>
          </a>
        </p>
      </div>
    </div>
  );
};

export default NGOAdminLogin;
