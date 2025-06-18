import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const NGOResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // TODO: API call to reset password using token from email
    console.log("New Password Set:", password);

    // Show success alert and redirect
    alert("Password updated successfully!");
    navigate("/ngologin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-yellow-100 p-3 rounded-full">
            <FaLock className="text-yellow-600 text-xl" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-blue-800 mb-2">
          Set New Password
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Enter and confirm your new password to regain access to your NGO admin
          dashboard.
        </p>
        <form onSubmit={handleSubmit} className="text-left space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-medium"
          >
            🔒 Update Password
          </button>
        </form>
        <p className="text-sm mt-4 text-gray-700">
                    Remembered your password?{" "}
                    <Link
                      to="/ngologin"
                      className="text-blue-700 font-medium hover:underline"
                    >
                      Go back to login
                    </Link>
          </p>
    
      </div>
    </div>
  );
};

export default NGOResetPassword;
