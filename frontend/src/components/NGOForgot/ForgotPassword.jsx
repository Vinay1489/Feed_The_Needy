"use client";
import React, { useState } from "react";
import { PageHeader } from "./PageHeader";
import { FormCard } from "./FormCard";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Montserrat:wght@700&display=swap"
        rel="stylesheet"
      />
      <main className="px-5 py-0 mx-auto my-0 max-w-[1400px] max-md:max-w-[991px] max-sm:max-w-screen-sm">
        <PageHeader
          title="NGO Portal"
          description="Reset your password to regain access to your NGO dashboard and continue managing food donations."
        />

        <div className="flex justify-center">
          <FormCard title="Reset Password" className="w-[528px]">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="mb-1 text-sm font-medium text-slate-950 block"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@organization.org"
                  className="p-3 w-full h-10 text-sm bg-white rounded-md border border-solid border-slate-200 text-slate-500"
                  required
                />
              </div>

              <div className="flex justify-between mx-0 my-4">
                <a href="#" className="text-sm text-blue-600 no-underline">
                  Back to Login
                </a>
                <a href="#" className="text-sm text-blue-600 no-underline">
                  Register your NGO
                </a>
              </div>

              <button
                type="submit"
                className="w-full h-10 text-sm font-medium bg-blue-600 rounded-md cursor-pointer border-[none] text-slate-50 hover:bg-blue-700 transition-colors"
              >
                Send Reset Link
              </button>
            </form>
          </FormCard>
        </div>
      </main>
    </>
  );
};

export default ForgotPassword;
