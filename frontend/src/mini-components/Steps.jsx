import React from "react";

export default function Steps({ status }) {
  const steps = ["Picked up", "In Transit", "Delivered"];
  const idx = steps.indexOf(status);
  return (
    <div className="mt-3 flex items-center gap-2">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className={`px-2 py-1 rounded-full text-xs border ${
              i <= idx
                ? "bg-emerald-600 text-white border-emerald-700"
                : "bg-emerald-50 text-emerald-700 border-emerald-100"
            }`}
          >
            {s}
          </div>
          {i < steps.length - 1 && <div className="w-6 h-px bg-emerald-200" />}
        </div>
      ))}
    </div>
  );
}
