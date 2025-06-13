"use client";
import React from "react";
import { Link } from "react-router-dom";

function CTAButtons() {
  return (
    <div className="flex gap-4 max-sm:flex-col">
      <button
        className="flex gap-3 justify-center items-center px-6 py-4 text-base font-medium bg-blue-600 rounded-md cursor-pointer text-slate-50"
        aria-label="Donate Food"
      >
        <span><Link to="/donorsignup">Donate Food</Link></span>
        <div>
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[16px] h-[16px]"
            aria-hidden="true"
          >
            <path
              d="M4.24341 8H13.5767"
              stroke="#F8FAFC"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.91016 3.33337L13.5768 8.00004L8.91016 12.6667"
              stroke="#F8FAFC"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
      <button
        className="px-6 py-4 text-base font-medium bg-white rounded-md border cursor-pointer border-slate-200 text-slate-950"
        aria-label="Partner as NGO"
      >
        <Link to="/volunteersignup">Join as a volunteer</Link>
      </button>
    </div>
  );
}

export default CTAButtons;
