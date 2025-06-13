import React from "react";
import DashboardCard from "./DashboardCard";

export default function StatsSummary() {
  
  {/*X means default values which we later get from db and backend*/}
  const stats = [
    {
      title: "Total Donations",
      value: "X",
      icon: "🍱",
      trend: "+X% from last month",
    },
    {
      title: "NGOs Donated To",
      value: "X",
      icon: "🏢",
      trend: "X new this month",
    },
    {
      title: "Last Donation",
      value: "on Xth day",
      icon: "📅",
      trend: "X days ago",
    },
    {
      title: "Active Pickups",
      value: "X",
      icon: "🟢",
      trend: "Scheduled for today",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <DashboardCard key={index}>
          <div className="flex items-center">
            <div className="text-3xl mr-4">{stat.icon}</div>
            <div>
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {stat.title}
              </h3>
              <p className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {stat.trend}
              </p>
            </div>
          </div>
        </DashboardCard>
      ))}
    </div>
  );
}
