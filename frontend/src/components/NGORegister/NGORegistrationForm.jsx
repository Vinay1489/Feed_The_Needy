"use client";
import React from "react";

export function NGORegistrationForm() {
  return (
    <section className="p-8 rounded-xl border border-solid shadow-xl backdrop-blur bg-white bg-opacity-30 border-white border-opacity-20 w-[528px] max-md:w-full max-md:max-w-[600px] max-sm:p-5">
      <h2 className="mb-6 text-2xl font-bold text-slate-950">
        NGO Registration
      </h2>
      <form>
        <div className="mb-4">
          <label className="mb-1 text-sm font-medium text-slate-950">
            Organization Name
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Your NGO Name"
              className="p-3 w-full h-10 text-sm bg-white rounded-md border border-solid border-slate-200 text-slate-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-1 text-sm font-medium text-slate-950">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              placeholder="your@organization.org"
              className="p-3 w-full h-10 text-sm bg-white rounded-md border border-solid border-slate-200 text-slate-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-1 text-sm font-medium text-slate-950">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="••••••••"
              className="p-3 w-full h-10 text-sm bg-white rounded-md border border-solid border-slate-200 text-slate-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-1 text-sm font-medium text-slate-950">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="••••••••"
              className="p-3 w-full h-10 text-sm bg-white rounded-md border border-solid border-slate-200 text-slate-500"
            />
          </div>
        </div>
        <div className="flex justify-between mx-0 my-4">
          <a href="#" className="text-sm text-blue-600 no-underline">
            Already registered?
          </a>
          <a href="#" className="text-sm text-blue-600 no-underline">
            Login here
          </a>
        </div>
        <button className="w-full h-10 text-sm font-medium bg-blue-600 rounded-md cursor-pointer border-[none] text-slate-50">
          Register NGO
        </button>
      </form>
    </section>
  );
}
