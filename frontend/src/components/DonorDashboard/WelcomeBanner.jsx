import React from "react";
import DashboardCard from "./DashboardCard";

export default function WelcomeBanner() {
  return (
    <DashboardCard>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Hi X, here's your dashboard!
          </h1>
          <p className="mt-1 text-slate-600 dark:text-slate-300">
            Your last donation was on Xth day, X Year
            {/*X means default values which we later get from db and backend*/}
  
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900 rounded-lg">
            <span className="text-green-700 dark:text-green-300">
              Next scheduled pickup: Tomorrow at X time
            </span>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
