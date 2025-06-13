import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ForgotPasswordDonor = () => {
  const [emailSent, setEmailSent] = useState(false);
  console.log(motion);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call success
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
    }, 4000); // Hide success message after 4s
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative overflow-hidden">
        <h2 className="text-3xl font-bold text-center text-blue-800 flex items-center justify-center mb-2">
          🔒 Reset Password
        </h2>
        <p className="text-center text-gray-600 text-sm mb-6">
          Reset your password to regain access to your Donor dashboard and
          continue making food donations.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-semibold text-gray-700 mb-1"
              htmlFor="email"
            >
              📧 Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@organization.org"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 mt-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            📩 Send Reset Link
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-6">
          Remember your password?{" "}
          <button
            onClick={()=>navigate("/donorlogin")}
            className="text-blue-600 hover:underline font-medium"
          >
            Go back to login
          </button>
        </div>

        {/* ✅ Success Animation */}
        <AnimatePresence>
          {emailSent && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-95 flex flex-col items-center justify-center text-center p-6 rounded-2xl shadow-md z-10"
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
                Please check your inbox for a password reset link.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ForgotPasswordDonor;
