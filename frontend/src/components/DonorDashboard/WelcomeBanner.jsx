import React from "react";
import DashboardCard from "./DashboardCard";
import Lottie from "lottie-react";
import truckAnim from "../../assets/truck.json";

export default function WelcomeBanner() {
  return (
    <DashboardCard>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
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
          <div className="flex items-center gap-3 p-4 bg-blue-50 border rounded-md ml-48">
            <Lottie
              animationData={truckAnim}
              className="h-18 w-24"
              loop={true}
            />
            <span className="text-sm font-medium text-blue-700">
              Your pickup is scheduled for tomorrow at X'o clock
            </span>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
