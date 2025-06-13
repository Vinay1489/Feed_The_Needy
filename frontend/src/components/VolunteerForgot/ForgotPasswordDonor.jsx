"use client";
import React, { useState } from "react";
import { PageHeader } from "./PageHeader";
import { FormCard } from "./FormCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const ForgotPasswordDonor = () => {
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
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Montserrat:wght@700&display=swap"
        rel="stylesheet"
      />
      <main className="min-h-screen flex flex-col justify-center px-5 py-12 max-w-[1400px] mx-auto bg-gradient-to-br from-blue-50 to-blue-100">
        <PageHeader
          title="Volunteer Portal"
          description="Reset your password to regain access to your volunteer dashboard and continue making food distributions."
        />

        <div className="flex justify-center">
          <div className="w-[528px] bg-white/40 backdrop-blur-lg shadow-2xl rounded-xl p-8 transition-transform duration-300 hover:scale-[1.01]">
            <FormCard title="Reset Password">
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
                    className="p-3 w-full h-10 text-sm bg-white rounded-md border border-solid border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-10 text-sm font-medium bg-blue-600 rounded-md text-white hover:bg-blue-700 transition-colors"
                >
                  <Link to="/donorforgot/reset">Send Reset Link</Link>
                </button>
              </form>
            </FormCard>
          </div>
        </div>
        <ToastContainer />
      </main>
    </>
  );
};

export default ForgotPasswordDonor;
