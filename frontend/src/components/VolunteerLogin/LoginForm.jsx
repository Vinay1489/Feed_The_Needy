"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/FakeAuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    

  
  };

  return (
    <section className="flex overflow-hidden flex-col px-8 py-9 mx-auto w-full text-sm rounded-xl border border-solid shadow-xl bg-white bg-opacity-30 border-white border-opacity-20 max-md:px-5 max-md:mt-10 max-md:max-w-full bg-sky-50">
      <h2 className="self-start text-2xl font-bold leading-none text-slate-950">
        Volunteer Login
      </h2>

      <form onSubmit={handleSubmit} className="mt-8">
        <div className="flex flex-col mb-6">
          <label className="self-start font-medium leading-none text-slate-950">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="overflow-hidden px-3.5 py-4 mt-2.5 bg-white rounded-md border border-solid border-slate-200 text-slate-500 w-full"
          />
        </div>

        <div className="flex flex-col mb-6">
          <label className="self-start font-medium leading-none text-slate-950">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="overflow-hidden px-3.5 py-4 mt-2.5 bg-white rounded-md border border-solid border-slate-200 text-slate-500 w-full"
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          <label className="flex gap-2 items-center font-medium text-slate-950">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border border-blue-600 border-solid"
            />
            Remember me
          </label>
          <a className="text-blue-600 hover:text-blue-700">
            <Link to="/">Forgot Password?</Link>
          </a>
        </div>

        <button
          type="submit"
          className="w-full px-16 py-4 font-medium leading-none text-center bg-blue-600 rounded-md text-slate-50 hover:bg-blue-700 transition-colors max-md:px-5"
        >
          Login
        </button>

        <p className="mt-6 text-center text-slate-500">
          Don't have an account?{" "}
          <a className="text-blue-600 hover:text-blue-700">
            <Link to="/volunteersignup">Sign up as volunteer</Link>
          </a>
        </p>
      </form>
    </section>
  );
};

export default LoginForm;
