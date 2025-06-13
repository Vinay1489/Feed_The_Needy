"use client";
import React from "react";
import { BarChart3, TrendingUp, Users, Star } from "lucide-react";

const MetricCard = ({ icon, title, value, trend, color }) => {
  const Icon = icon;

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="flex justify-between items-start mb-2">
        <div
          className={`w-10 h-10 rounded-full ${color} flex items-center justify-center`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trend && (
          <div className="flex items-center text-xs font-medium text-green-600">
            <TrendingUp className="w-3 h-3 mr-1" />
            {trend}
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mt-2">{value}</h3>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  );
};

const DashboardMetrics = () => {
  return (
    <section className="bg-white rounded-2xl shadow-xl p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <BarChart3 className="w-5 h-5 text-indigo-600 mr-2" />
          Impact Tracker
        </h2>
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <MetricCard
          icon={Users}
          title="Meals Delivered"
          value="120"
          trend="+15% vs last month"
          color="bg-indigo-600"
        />
        <MetricCard
          icon={Star}
          title="Points Earned"
          value="850"
          trend="+22% vs last month"
          color="bg-amber-500"
        />
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Food Waste Prevented
        </h3>
        <div className="bg-gray-100 h-4 rounded-full overflow-hidden">
          <div
            className="bg-green-500 h-full rounded-full"
            style={{ width: "65%" }}
          ></div>
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-600">
          <span>0 kg</span>
          <span>Target: 100 kg</span>
        </div>
        <p className="text-center mt-2 text-sm font-medium text-gray-700">
          65 kg prevented this month
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Carbon Footprint Reduction
        </h3>
        <div className="flex items-end h-20 space-x-2">
          {[30, 45, 25, 60, 40, 75, 50].map((height, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-indigo-500 rounded-t-sm"
                style={{ height: `${height}%` }}
              ></div>
              <span className="text-xs text-gray-500 mt-1">
                {["M", "T", "W", "T", "F", "S", "S"][index]}
              </span>
            </div>
          ))}
        </div>
        <p className="text-center mt-3 text-sm font-medium text-gray-700">
          36 kg CO₂ saved this week
        </p>
      </div>
    </section>
  );
};

export default DashboardMetrics;
