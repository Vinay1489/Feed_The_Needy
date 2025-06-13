"use client";

import React from "react";
import { Link } from "react-router-dom";

const MiniEstimatorForm = () => {
  return (
    <form className="flex flex-col gap-4 w-full max-w-md mx-auto bg-white bg-opacity-50 backdrop-blur-md rounded-xl p-6 shadow-md">
      <h3 className="text-xl font-semibold text-center text-slate-800">
        Quick Estimate
      </h3>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-slate-700">Food Name</label>
        <input
          type="text"
          placeholder="e.g. Bread"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-slate-700">Category</label>
        <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option>Select category</option>
          <option>Fruits</option>
          <option>Vegetables</option>
          <option>Cooked Food</option>
        </select>
      </div>

      <Link to="/estimator">
        <button
          type="button"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
        >
          Go to Full Estimator →
        </button>
      </Link>
    </form>
  );
};

export default MiniEstimatorForm;
