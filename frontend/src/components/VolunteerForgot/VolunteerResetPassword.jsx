"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaLock, FaKey } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";

const VolunteerResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords do not match", { theme: "colored" });
      return;
    }

    toast.success("Password reset successfully!", { theme: "colored" });
    setPassword("");
    setConfirm("");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        {/* Lock icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-yellow-100 p-3 rounded-full">
            <FaLock className="text-yellow-600 text-xl" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-blue-800 mb-2">
          Volunteer Password Reset
        </h1>
        <p className="text-sm text-gray-700 mb-6">
          Enter and confirm your new password to regain access to your Volunteer
          dashboard.
        </p>

        <form onSubmit={handleSubmit} className="text-left">
          {/* New Password */}
          <label className="text-sm font-medium text-gray-800 flex items-center mb-1">
            <FaKey className="mr-1" /> New Password
          </label>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-3 py-2 text-sm border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <div
              className="absolute right-3 top-2.5 text-gray-600 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </div>
          </div>

          {/* Confirm Password */}
          <label className="text-sm font-medium text-gray-800 flex items-center mb-1">
            <FaLock className="mr-1" /> Confirm Password
          </label>
          <div className="relative mb-4">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-3 py-2 text-sm border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <div
              className="absolute right-3 top-2.5 text-gray-600 cursor-pointer"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <AiFillEyeInvisible /> : <AiFillEye />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md text-sm flex items-center justify-center"
          >
            🚀 Reset Password
          </button>
        </form>

        <p className="text-sm mt-4 text-gray-700 text-center">
          Remember your password?{" "}
          <Link
            to="/volunteerlogin"
            className="text-blue-700 font-medium hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </div>

      <ToastContainer />
    </main>
  );
};

export default VolunteerResetPassword;
