"use client";
import React from "react";

function DashboardOverview() {
  // Sample data for stats and charts
  const stats = [
    {
      id: 1,
      label: "Total Food Rescued",
      value: "2,450 kg",
      change: "+12%",
      icon: "scale",
    },
    {
      id: 2,
      label: "Active Volunteers",
      value: "128",
      change: "+5%",
      icon: "users",
    },
    {
      id: 3,
      label: "Completed Pickups",
      value: "342",
      change: "+18%",
      icon: "check",
    },
    { id: 4, label: "Food Donors", value: "56", change: "+3%", icon: "store" },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Pickup Completed",
      details: "15kg from Green Grocers",
      time: "10 minutes ago",
      user: "John D.",
    },
    {
      id: 2,
      action: "New Volunteer",
      details: "Sarah Smith joined the team",
      time: "1 hour ago",
      user: "System",
    },
    {
      id: 3,
      action: "Delivery Confirmed",
      details: "To Hope Community Center",
      time: "2 hours ago",
      user: "Maria L.",
    },
    {
      id: 4,
      action: "New Donor",
      details: "Fresh Farms Market registered",
      time: "Yesterday",
      user: "Admin",
    },
    {
      id: 5,
      action: "Pickup Scheduled",
      details: "Tomorrow at 10:00 AM",
      time: "Yesterday",
      user: "System",
    },
  ];

  const upcomingPickups = [
    {
      id: 1,
      donor: "Metro Supermarket",
      time: "Today, 2:00 PM",
      address: "123 Main St",
      quantity: "~20kg",
      status: "Assigned",
    },
    {
      id: 2,
      donor: "Organic Foods",
      time: "Today, 5:30 PM",
      address: "456 Oak Ave",
      quantity: "~15kg",
      status: "Pending",
    },
    {
      id: 3,
      donor: "Daily Bread Bakery",
      time: "Tomorrow, 9:00 AM",
      address: "789 Pine Rd",
      quantity: "~8kg",
      status: "Assigned",
    },
    {
      id: 4,
      donor: "Green Grocers",
      time: "Tomorrow, 4:00 PM",
      address: "101 Elm St",
      quantity: "~25kg",
      status: "Pending",
    },
  ];

  // Function to render the appropriate icon based on the id
  const renderStatIcon = (iconName) => {
    switch (iconName) {
      case "scale":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
            />
          </svg>
        );
      case "users":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        );
      case "check":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "store":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard Overview
        </h1>
        <div className="flex space-x-2">
          <select className="px-3 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-800">
                  {stat.value}
                </p>
                <div className="mt-2 flex items-center">
                  <span
                    className={`text-xs font-medium ${
                      stat.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="ml-1 text-xs text-slate-500">
                    from last month
                  </span>
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                {renderStatIcon(stat.icon)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Impact Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-800">
              Food Rescue Impact
            </h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs font-medium rounded-md bg-blue-50 text-blue-600">
                Weekly
              </button>
              <button className="px-3 py-1 text-xs font-medium rounded-md text-slate-600">
                Monthly
              </button>
              <button className="px-3 py-1 text-xs font-medium rounded-md text-slate-600">
                Yearly
              </button>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
            {/* Placeholder for chart */}
            <p className="text-slate-400">Impact Chart Visualization</p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm font-medium text-slate-500">Food Rescued</p>
              <p className="mt-1 text-lg font-bold text-slate-800">2,450 kg</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-500">CO₂ Saved</p>
              <p className="mt-1 text-lg font-bold text-slate-800">4,655 kg</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-500">
                Meals Provided
              </p>
              <p className="mt-1 text-lg font-bold text-slate-800">8,167</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-800">
              Recent Activity
            </h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start pb-4 border-b border-slate-100 last:border-0 last:pb-0"
              >
                <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 mr-3"></div>
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {activity.action}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {activity.details}
                  </p>
                  <div className="flex items-center mt-1 text-xs text-slate-400">
                    <span>{activity.time}</span>
                    <span className="mx-1">•</span>
                    <span>{activity.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Pickups */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-slate-800">
            Upcoming Pickups
          </h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors">
            Schedule New Pickup
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                <th className="px-4 py-3 border-b border-slate-200">Donor</th>
                <th className="px-4 py-3 border-b border-slate-200">
                  Pickup Time
                </th>
                <th className="px-4 py-3 border-b border-slate-200">Address</th>
                <th className="px-4 py-3 border-b border-slate-200">
                  Estimated Quantity
                </th>
                <th className="px-4 py-3 border-b border-slate-200">Status</th>
                <th className="px-4 py-3 border-b border-slate-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {upcomingPickups.map((pickup) => (
                <tr key={pickup.id} className="hover:bg-slate-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-slate-800">
                    {pickup.donor}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">
                    {pickup.time}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">
                    {pickup.address}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">
                    {pickup.quantity}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        pickup.status === "Assigned"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {pickup.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        View
                      </button>
                      <button className="text-slate-600 hover:text-slate-800">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
