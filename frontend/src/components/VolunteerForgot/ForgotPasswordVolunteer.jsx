"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const ForgotPasswordVolunteer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Reset link has been sent to your email!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
    setEmail("");
  };

  return (
    <>
      <main className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <FaLock className="text-yellow-600 text-xl" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-blue-800 mb-2">
            Reset Password
          </h1>
          <p className="text-sm text-gray-700 mb-6">
            Reset your password to regain access to your Donor dashboard and
            continue making food donations.
          </p>

          <form onSubmit={handleSubmit} className="text-left">
            <label className="text-sm font-medium text-gray-800 flex items-center mb-1">
              <MdEmail className="mr-1" /> Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@organization.org"
              className="w-full mb-4 px-3 py-2 text-sm border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md text-sm flex items-center justify-center"
            >
              📩 Send Reset Link
            </button>
          </form>

          <p className="text-sm mt-4 text-gray-700">
            Remember your password?{" "}
            <Link
              to="/volunteer/login"
              className="text-blue-700 font-medium hover:underline"
            >
              Go back to login
            </Link>
          </p>
        </div>

        <ToastContainer />
      </main>
    </>
  );
};

export default ForgotPasswordVolunteer;
