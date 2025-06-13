"use client";
import React from "react";

const WorkflowCard = ({ emoji, title, description, showArrow = false }) => {
  return (
    <article className="relative text-center rounded-xl border border-solid shadow-xl backdrop-blur bg-white bg-opacity-30 border-white border-opacity-20 h-[226px] w-[318px] max-md:w-[calc(50%_-_10px)] max-sm:w-full">
      <div className="mx-auto my-6 w-16 h-16 text-2xl leading-8 rounded-full shadow-lg flex items-center justify-center">
        {emoji}
      </div>
      <h3 className="mb-2.5 text-xl font-bold leading-7 text-slate-950">
        {title}
      </h3>
      <p className="px-5 py-0 text-sm leading-5 text-slate-500">
        {description}
      </p>

      {/* Arrow to the next card */}
      {showArrow && (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-[-25px] top-1/2 -translate-y-1/2"
        >
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </article>
  );
};

export default WorkflowCard;
