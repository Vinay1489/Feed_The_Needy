"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi"; // Email & password icons
import { useAuth } from "../../contexts/FakeAuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
  };

  return (
    <section className="flex overflow-hidden flex-col px-8 py-9 mx-auto w-full text-sm rounded-xl border border-solid shadow-xl bg-white bg-opacity-30 border-white border-opacity-20 max-w-md bg-sky-50">
      <h2 className="text-2xl font-bold text-slate-950 text-center">
        Volunteer Login
      </h2>

      <form onSubmit={handleSubmit} className="mt-8">
        {/* Email Field */}
        <div className="flex flex-col mb-6">
          <label className="mb-1 font-medium text-slate-950">
            Email Address
          </label>
          <div className="flex items-center gap-2 px-3.5 py-3 mt-1 bg-white rounded-md border border-slate-200">
            <FiMail className="text-slate-500 text-lg" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="flex flex-col mb-6">
          <label className="mb-1 font-medium text-slate-950">Password</label>
          <div className="flex items-center gap-2 px-3.5 py-3 mt-1 bg-white rounded-md border border-slate-200">
            <FiLock className="text-slate-500 text-lg" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex justify-between items-center mb-6">
          <label className="flex gap-2 items-center font-medium text-slate-950">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border border-blue-600"
            />
            Remember me
          </label>
          <Link
            to="/"
            className="text-blue-600 text-sm hover:text-blue-700 font-medium"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-6 py-3 font-medium text-center bg-blue-600 rounded-md text-white hover:bg-blue-700 transition-colors"
        >
          Login
        </button>

        {/* Signup Link */}
        <p className="mt-6 text-center text-slate-500 text-sm">
          Don't have an account?{" "}
          <Link
            to="/volunteersignup"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Sign up as volunteer
          </Link>
        </p>
      </form>
    </section>
  );
};

export default LoginForm;
