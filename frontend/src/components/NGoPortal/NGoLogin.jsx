"use client";
import React, { useState } from "react";
import AuthLayout from "./AuthLayout";

function NGOLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password, rememberMe });
  };

  return (
    <AuthLayout
      title="NGO Portal Login"
      subtitle="Access your organization's dashboard to manage food rescue operations"
    >
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="flex overflow-hidden flex-col px-8 py-9 mx-auto w-full text-sm rounded-xl border border-solid shadow-xl bg-white bg-opacity-30 border-white border-opacity-20 max-md:px-5 max-md:max-w-full"
        >
          <h2 className="self-start text-2xl font-bold leading-none text-slate-950 mb-6">
            Sign In
          </h2>

          <label className="self-start mt-2 font-medium leading-none text-slate-950">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@organization.org"
            required
            className="overflow-hidden px-3.5 py-3.5 mt-2.5 bg-white rounded-md border border-solid border-slate-200 text-slate-500 max-md:pr-5 max-md:max-w-full w-full"
          />

          <label className="self-start mt-5 font-medium leading-none text-slate-950">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="overflow-hidden px-3.5 py-3.5 mt-2.5 bg-white rounded-md border border-solid border-slate-200 text-slate-500 max-md:pr-5 max-md:max-w-full w-full"
          />

          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2 items-center">
              <div
                className={`flex justify-center items-center w-4 h-4 rounded border border-solid cursor-pointer ${
                  rememberMe
                    ? "bg-blue-600 border-blue-600"
                    : "border-slate-300"
                }`}
                onClick={() => setRememberMe(!rememberMe)}
              >
                {rememberMe && (
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
                className="text-sm text-slate-700 cursor-pointer"
                onClick={() => setRememberMe(!rememberMe)}
              >
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="px-16 py-4 mt-6 font-medium leading-none text-center bg-blue-600 rounded-md text-slate-50 hover:bg-blue-700 transition-colors max-md:px-5 max-md:max-w-full"
          >
            Sign In
          </button>

          <div className="mt-6 text-center text-slate-600">
            Don't have an account?{" "}
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Register your NGO
            </a>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

export default NGOLogin;
