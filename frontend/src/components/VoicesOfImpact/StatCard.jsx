import React from "react";

function StatCard({ value, label }) {
  return (
    <article className="flex flex-col items-center p-6 rounded-xl border shadow-xl backdrop-blur-[[8px]] bg-white bg-opacity-30 border-white border-opacity-20">
      <p className="text-4xl font-bold text-slate-950">{value}</p>
      <p className="mt-4 text-sm text-slate-500">{label}</p>
    </article>
  );
}

export default StatCard;
