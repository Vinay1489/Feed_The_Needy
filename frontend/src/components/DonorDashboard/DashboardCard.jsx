import React from "react";

export default function DashboardCard({ children }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
      {children}
    </div>
  );
}
