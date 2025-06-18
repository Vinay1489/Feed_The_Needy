"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const ForgotPasswordVolunteer = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  console.log(motion,toast);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailSent(true);

    const delay = 3000;
    setTimeout(() => navigate("/volunteerlogin/reset"), delay);

    setTimeout(() => {
      setEmailSent(false);
    }, delay + 1000); // Hide success message after 4s
  };

  return (
    <>
      <main className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
        <div className="relative bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center overflow-hidden">
          <div className="flex justify-center mb-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <FaLock className="text-yellow-600 text-xl" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-blue-800 mb-2">
            Reset Password
          </h1>
          <p className="text-sm text-gray-700 mb-6">
            Forgot your password? Don’t worry. Enter your registered email
            address, and we’ll send you a link to reset your password and
            restore your access to the Volunteer dashboard.
          </p>

          <form onSubmit={handleSubmit} className="text-left">
            <label className="text-sm font-medium text-gray-800 flex items-center mb-1">
              <MdEmail className="mr-1" /> Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@volunteer.org"
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
            Remembered your password?{" "}
            <Link
              to="/volunteerlogin"
              className="text-blue-700 font-medium hover:underline"
            >
              Go back to login
            </Link>
          </p>

          <AnimatePresence>
            {emailSent && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center text-center p-6 rounded-2xl shadow-md"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-green-600 text-5xl mb-4"
                >
                  ✅
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Link Sent Successfully!
                </h3>
                <p className="text-gray-600 text-sm">
                  Please check your email inbox for the password reset link to
                  regain access to your Volunteer dashboard.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
};

export default ForgotPasswordVolunteer;
