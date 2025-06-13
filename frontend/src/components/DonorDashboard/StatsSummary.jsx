import React from "react";
import DashboardCard from "./DashboardCard";

export default function StatsSummary() {
  const stats = [
    {
      title: "Total Donations",
      value: "156",
      icon: "🍱",
      trend: "+12% from last month",
    },
    {
      title: "NGOs Donated To",
      value: "8",
      icon: "🏢",
      trend: "2 new this month",
    },
    {
      title: "Last Donation",
      value: "Apr 10",
      icon: "📅",
      trend: "3 days ago",
    },
    {
      title: "Active Pickups",
      value: "2",
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
