"use client";
import React, { useState } from "react";

function ImpactMetrics() {
  const [timeRange, setTimeRange] = useState("month"); // week, month, year, all

  // Sample data for impact metrics
  const impactStats = [
    {
      id: 1,
      label: "Food Rescued",
      value: "2,450 kg",
      change: "+12%",
      icon: "scale",
    },
    {
      id: 2,
      label: "CO₂ Emissions Saved",
      value: "4,655 kg",
      change: "+15%",
      icon: "leaf",
    },
    {
      id: 3,
      label: "Meals Provided",
      value: "8,167",
      change: "+12%",
      icon: "food",
    },
    {
      id: 4,
      label: "Water Saved",
      value: "980,000 L",
      change: "+10%",
      icon: "water",
    },
  ];

  const topContributors = [
    {
      id: 1,
      name: "John Doe",
      deliveries: 24,
      weight: "320 kg",
      impact: "1,067 meals",
    },
    {
      id: 2,
      name: "Maria Lopez",
      deliveries: 36,
      weight: "480 kg",
      impact: "1,600 meals",
    },
    {
      id: 3,
      name: "Alex Chen",
      deliveries: 18,
      weight: "240 kg",
      impact: "800 meals",
    },
    {
      id: 4,
      name: "Sarah Johnson",
      deliveries: 15,
      weight: "200 kg",
      impact: "667 meals",
    },
    {
      id: 5,
      name: "David Lee",
      deliveries: 8,
      weight: "110 kg",
      impact: "367 meals",
    },
  ];

  const topDonors = [
    {
      id: 1,
      name: "Metro Supermarket",
      donations: 42,
      weight: "560 kg",
      impact: "1,867 meals",
    },
    {
      id: 2,
      name: "Organic Foods",
      donations: 36,
      weight: "480 kg",
      impact: "1,600 meals",
    },
    {
      id: 3,
      name: "Daily Bread Bakery",
      donations: 28,
      weight: "350 kg",
      impact: "1,167 meals",
    },
    {
      id: 4,
      name: "Green Grocers",
      donations: 24,
      weight: "320 kg",
      impact: "1,067 meals",
    },
    {
      id: 5,
      name: "Fresh Farms Market",
      donations: 18,
      weight: "240 kg",
      impact: "800 meals",
    },
  ];

  const impactByCategory = [
    { category: "Fruits & Vegetables", percentage: 35, weight: "857.5 kg" },
    { category: "Bakery Items", percentage: 25, weight: "612.5 kg" },
    { category: "Dairy Products", percentage: 15, weight: "367.5 kg" },
    { category: "Packaged Foods", percentage: 15, weight: "367.5 kg" },
    { category: "Meat & Seafood", percentage: 10, weight: "245 kg" },
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
      case "leaf":
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
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
        );
      case "food":
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
              d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
            />
          </svg>
        );
      case "water":
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
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
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
        <h1 className="text-2xl font-bold text-slate-800">Impact Metrics</h1>
        <div className="flex space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors">
            Download Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactStats.map((stat) => (
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
                    from last {timeRange}
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

      {/* Impact Chart */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-slate-800">
            Impact Over Time
          </h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-xs font-medium rounded-md bg-blue-50 text-blue-600">
              Food Rescued
            </button>
            <button className="px-3 py-1 text-xs font-medium rounded-md text-slate-600">
              CO₂ Saved
            </button>
            <button className="px-3 py-1 text-xs font-medium rounded-md text-slate-600">
              Meals Provided
            </button>
          </div>
        </div>
        <div className="h-80 flex items-center justify-center bg-slate-50 rounded-lg">
          {/* Placeholder for chart */}
          <p className="text-slate-400">Impact Chart Visualization</p>
        </div>
      </div>

      {/* Top Contributors and Donors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Contributors */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-800">
              Top Volunteers
            </h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  <th className="px-4 py-3 border-b border-slate-200">
                    Volunteer
                  </th>
                  <th className="px-4 py-3 border-b border-slate-200">
                    Deliveries
                  </th>
                  <th className="px-4 py-3 border-b border-slate-200">
                    Weight
                  </th>
                  <th className="px-4 py-3 border-b border-slate-200">
                    Impact
                  </th>
                </tr>
              </thead>
              <tbody>
                {topContributors.map((contributor, index) => (
                  <tr key={contributor.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                          {index + 1}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-slate-800">
                            {contributor.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">
                      {contributor.deliveries}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">
                      {contributor.weight}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">
                      {contributor.impact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Donors */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-800">
              Top Food Donors
            </h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  <th className="px-4 py-3 border-b border-slate-200">Donor</th>
                  <th className="px-4 py-3 border-b border-slate-200">
                    Donations
                  </th>
                  <th className="px-4 py-3 border-b border-slate-200">
                    Weight
                  </th>
                  <th className="px-4 py-3 border-b border-slate-200">
                    Impact
                  </th>
                </tr>
              </thead>
              <tbody>
                {topDonors.map((donor, index) => (
                  <tr key={donor.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                          {index + 1}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-slate-800">
                            {donor.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">
                      {donor.donations}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">
                      {donor.weight}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">
                      {donor.impact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Food Categories */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-slate-800">
            Food Categories Rescued
          </h2>
          <button className="text-sm text-blue-600 hover:text-blue-800">
            View Details
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
            {/* Placeholder for pie chart */}
            <p className="text-slate-400">Food Categories Pie Chart</p>
          </div>
          <div>
            <div className="space-y-4">
              {impactByCategory.map((category) => (
                <div key={category.category}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">
                      {category.category}
                    </span>
                    <span className="text-sm font-medium text-slate-700">
                      {category.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {category.weight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-slate-800">
            Environmental Impact
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-green-50 rounded-lg text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-green-100 flex items-center justify-center text-green-600">
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
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-800">
              CO₂ Emissions Saved
            </h3>
            <p className="mt-2 text-3xl font-bold text-green-600">4,655 kg</p>
            <p className="mt-2 text-sm text-slate-600">
              Equivalent to taking 1 car off the road for a year
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
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
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-800">
              Water Saved
            </h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">980,000 L</p>
            <p className="mt-2 text-sm text-slate-600">
              Equivalent to 12,250 eight-minute showers
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-800">
              Land Saved
            </h3>
            <p className="mt-2 text-3xl font-bold text-purple-600">735 m²</p>
            <p className="mt-2 text-sm text-slate-600">
              Equivalent to 3 tennis courts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImpactMetrics;
