"use client";
import React from "react";

function StatsCard({ value, title, description }) {
  return (
    <article className="flex-1 p-6 mb-12 rounded-xl border shadow-xl backdrop-blur-[[8px]] bg-white bg-opacity-30 border-white border-opacity-20 min-w-80">
      <h2 className="mb-4 text-4xl font-bold text-center text-slate-950">
        {value}
      </h2>
      <h3 className="mb-1 text-lg font-bold text-center text-slate-950">
        {title}
      </h3>
      <p className="text-sm text-center text-slate-500">{description}</p>
    </article>
  );
}

export default StatsCard;
