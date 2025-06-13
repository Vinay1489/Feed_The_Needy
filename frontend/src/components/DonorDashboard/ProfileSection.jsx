import React from "react";
import DashboardCard from "./DashboardCard";

export default function ProfileSection() {
  return (
    <DashboardCard>
      <div className="flex items-center">
        <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-2xl">
          JD
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            John Doe
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Premium Donor
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Email
          </span>
          <span className="text-sm text-slate-900 dark:text-white">
            john@example.com
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Phone
          </span>
          <span className="text-sm text-slate-900 dark:text-white">
            +1 234 567 890
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Location
          </span>
          <span className="text-sm text-slate-900 dark:text-white">
            New York, USA
          </span>
        </div>
      </div>

      <button className="mt-6 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Edit Profile
      </button>
    </DashboardCard>
  );
}
