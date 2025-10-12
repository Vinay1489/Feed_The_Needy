import React from "react";

export default function MiniCalendar({ tasks = [] }) {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), 1);
  const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const days = [...Array(end.getDate())].map(
    (_, i) => new Date(today.getFullYear(), today.getMonth(), i + 1)
  );
  const taskDates = tasks.map((t) => new Date(t.expiry).getDate());
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold">
          {today.toLocaleString("default", { month: "long" })}{" "}
          {today.getFullYear()}
        </div>
        <div className="text-sm text-emerald-800/70">
          {start.toLocaleDateString()} - {end.toLocaleDateString()}
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-emerald-800/70 mb-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array(start.getDay())
          .fill(0)
          .map((_, i) => (
            <div key={`e${i}`} className="h-8" />
          ))}
        {days.map((d) => {
          const isToday = d.toDateString() === today.toDateString();
          const hasTask = taskDates.includes(d.getDate());
          return (
            <div
              key={d.toISOString()}
              className={`h-8 rounded-md grid place-content-center text-sm border ${
                isToday
                  ? "bg-emerald-600 text-white border-emerald-700"
                  : hasTask
                  ? "bg-emerald-50 text-emerald-900 border-emerald-100"
                  : "border-emerald-100"
              }`}
            >
              {d.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
