import React from "react";
import DashboardCard from "./DashboardCard";

export default function FeedbackSection() {
  return (
    <DashboardCard>
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
        Your Impact
      </h2>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-600 dark:text-slate-400">
            Monthly Goal
          </span>
          <span className="text-slate-900 dark:text-white">50/100 meals</span>
        </div>
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
          <div className="w-1/2 h-full bg-green-600 rounded-full"></div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            🌟
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-white">
              First Donation
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Completed on March 15
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
            👑
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-white">
              Top Donor
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              This month's achievement
            </p>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
