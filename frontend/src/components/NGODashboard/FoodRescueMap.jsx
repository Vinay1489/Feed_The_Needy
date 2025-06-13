"use client";
import React, { useState } from "react";

function FoodRescueMap() {
  const [mapView, setMapView] = useState("active"); // active, scheduled, completed
  const [filterOpen, setFilterOpen] = useState(false);

  // Sample data for active rescues
  const activeRescues = [
    {
      id: 1,
      volunteer: "John Doe",
      pickup: "Metro Supermarket",
      dropoff: "Hope Community Center",
      status: "En Route to Pickup",
      timeRemaining: "10 min",
    },
    {
      id: 2,
      volunteer: "Maria Lopez",
      pickup: "Daily Bread Bakery",
      dropoff: "Sunshine Shelter",
      status: "At Pickup Location",
      timeRemaining: "5 min",
    },
    {
      id: 3,
      volunteer: "Alex Chen",
      pickup: "Green Grocers",
      dropoff: "Family Support Center",
      status: "En Route to Dropoff",
      timeRemaining: "15 min",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Food Rescue Map</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="px-4 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-600 hover:bg-slate-50 transition-colors flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filter
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors">
            Schedule New Pickup
          </button>
        </div>
      </div>

      {filterOpen && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Filter Options
            </h2>
            <button
              onClick={() => setFilterOpen(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Volunteer
              </label>
              <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Volunteers</option>
                <option>John Doe</option>
                <option>Maria Lopez</option>
                <option>Alex Chen</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Status
              </label>
              <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Statuses</option>
                <option>En Route to Pickup</option>
                <option>At Pickup Location</option>
                <option>En Route to Dropoff</option>
                <option>Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Date Range
              </label>
              <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Today</option>
                <option>Yesterday</option>
                <option>Last 7 Days</option>
                <option>This Month</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-600 hover:bg-slate-50 transition-colors">
              Reset
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors">
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Map View Selector */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-2">
        <div className="flex">
          <button
            onClick={() => setMapView("active")}
            className={`flex-1 py-2 text-sm font-medium rounded-md ${
              mapView === "active"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Active Rescues
          </button>
          <button
            onClick={() => setMapView("scheduled")}
            className={`flex-1 py-2 text-sm font-medium rounded-md ${
              mapView === "scheduled"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Scheduled Pickups
          </button>
          <button
            onClick={() => setMapView("completed")}
            className={`flex-1 py-2 text-sm font-medium rounded-md ${
              mapView === "completed"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Completed Rescues
          </button>
        </div>
      </div>

      {/* Map and Active Rescues */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="h-[500px] bg-slate-100 flex items-center justify-center">
            {/* Placeholder for map */}
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-slate-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              <p className="mt-2 text-slate-500">Interactive Map</p>
              <p className="text-sm text-slate-400">
                Showing{" "}
                {mapView === "active"
                  ? "active rescues"
                  : mapView === "scheduled"
                  ? "scheduled pickups"
                  : "completed rescues"}
              </p>
            </div>
          </div>
        </div>

        {/* Active Rescues List */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            {mapView === "active"
              ? "Active Rescues"
              : mapView === "scheduled"
              ? "Scheduled Pickups"
              : "Completed Rescues"}
          </h2>

          {mapView === "active" && (
            <div className="space-y-4">
              {activeRescues.map((rescue) => (
                <div
                  key={rescue.id}
                  className="p-4 rounded-lg border border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {rescue.volunteer}
                      </p>
                      <div className="mt-1 flex items-center text-xs text-slate-500">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                        <span>{rescue.status}</span>
                      </div>
                    </div>
                    <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      {rescue.timeRemaining}
                    </div>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-700">
                          Pickup
                        </p>
                        <p className="text-xs text-slate-500">
                          {rescue.pickup}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-700">
                          Dropoff
                        </p>
                        <p className="text-xs text-slate-500">
                          {rescue.dropoff}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end space-x-2">
                    <button className="px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-800">
                      Contact
                    </button>
                    <button className="px-2 py-1 text-xs font-medium text-slate-600 hover:text-slate-800">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {mapView === "scheduled" && (
            <div className="flex items-center justify-center h-64 text-slate-400">
              Scheduled pickups will appear here
            </div>
          )}

          {mapView === "completed" && (
            <div className="flex items-center justify-center h-64 text-slate-400">
              Completed rescues will appear here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodRescueMap;
