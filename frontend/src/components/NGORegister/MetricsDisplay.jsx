import React from "react";

export function MetricsDisplay() {
  return (
    <div className="flex gap-4 mb-4 max-sm:flex-col">
      <article className="flex-1 p-2 text-center bg-white rounded max-sm:mb-2">
        <h3 className="mb-1 text-xs text-slate-500">Today's Donations</h3>
        <p className="text-lg font-bold text-slate-950">127 kg</p>
      </article>
      <article className="flex-1 p-2 text-center bg-white rounded max-sm:mb-2">
        <h3 className="mb-1 text-xs text-slate-500">Active Pickups</h3>
        <p className="text-lg font-bold text-slate-950">8</p>
      </article>
      <article className="flex-1 p-2 text-center bg-white rounded max-sm:mb-2">
        <h3 className="mb-1 text-xs text-slate-500">Delivered Today</h3>
        <p className="text-lg font-bold text-slate-950">94 kg</p>
      </article>
    </div>
  );
}
