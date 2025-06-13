import React from "react";
import DashboardCard from "./DashboardCard";

export default function WelcomeBanner() {
  return (
    <DashboardCard>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Hi John, here's your dashboard!
          </h1>
          <p className="mt-1 text-slate-600 dark:text-slate-300">
            Your last donation was on April 10, 2025
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900 rounded-lg">
            <span className="text-green-700 dark:text-green-300">
              Next scheduled pickup: Tomorrow at 2 PM
            </span>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
