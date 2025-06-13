"use client";
import React, { useState } from "react";
import PickupCalendar from "./PickupCalendar";
import PickupCard from "./PickupCard";
import PickupForm from "./PickupForm";

// Sample data for demonstration
const samplePickups = [
  {
    id: "1",
    title: "Restaurant Surplus Collection",
    location: "Green Plate Restaurant, 123 Main St",
    destination: "Community Food Bank",
    date: "2023-11-15",
    time: "10:00 AM",
    status: "scheduled",
    foodType: "Prepared meals, Produce",
    quantity: "15kg",
    volunteer: "John Doe",
    recurring: "Weekly",
    notes: "Restaurant closes at 10pm, pickup from back entrance",
  },
  {
    id: "2",
    title: "Grocery Store Donation",
    location: "Fresh Market, 456 Oak Ave",
    destination: "Homeless Shelter",
    date: "2023-11-16",
    time: "9:30 AM",
    status: "confirmed",
    foodType: "Bakery, Dairy, Produce",
    quantity: "25kg",
    volunteer: "Sarah Johnson",
    recurring: "Daily",
    notes: "Ask for manager Mike at customer service",
  },
  {
    id: "3",
    title: "Bakery End-of-Day Collection",
    location: "Sweet Delights Bakery, 789 Pine St",
    destination: "Youth Center",
    date: "2023-11-17",
    time: "7:00 PM",
    status: "pending",
    foodType: "Bread, Pastries",
    quantity: "8kg",
    volunteer: "Unassigned",
    recurring: "Daily",
    notes: "Bakery staff will have items packaged and ready",
  },
  {
    id: "4",
    title: "Farm Fresh Produce",
    location: "Green Acres Farm, Rural Route 5",
    destination: "Senior Center",
    date: "2023-11-18",
    time: "11:00 AM",
    status: "scheduled",
    foodType: "Fresh Vegetables, Fruits",
    quantity: "40kg",
    volunteer: "Michael Brown",
    recurring: "Weekly",
    notes: "Bring crates for transport, farm provides assistance with loading",
  },
];

function ScheduledPickups() {
  const [activeTab, setActiveTab] = useState("list");
  const [showForm, setShowForm] = useState(false);
  const [pickups, setPickups] = useState(samplePickups);
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredPickups =
    filterStatus === "all"
      ? pickups
      : pickups.filter((pickup) => pickup.status === filterStatus);

  const handleAddPickup = (newPickup) => {
    setPickups([
      ...pickups,
      { ...newPickup, id: (pickups.length + 1).toString() },
    ]);
    setShowForm(false);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setPickups(
      pickups.map((pickup) =>
        pickup.id === id ? { ...pickup, status: newStatus } : pickup
      )
    );
  };

  return (
    <section className="flex flex-col px-6 py-8 bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto w-full">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-950">
            Scheduled Pickups
          </h1>
          <p className="mt-2 text-lg text-slate-500">
            Manage and track all food rescue operations
          </p>
        </header>

        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("list")}
              className={`px-4 py-2 rounded-md font-medium ${
                activeTab === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 border border-slate-200"
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setActiveTab("calendar")}
              className={`px-4 py-2 rounded-md font-medium ${
                activeTab === "calendar"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 border border-slate-200"
              }`}
            >
              Calendar View
            </button>
          </div>

          <div className="flex space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-md text-slate-700"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="scheduled">Scheduled</option>
              <option value="confirmed">Confirmed</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Schedule New Pickup
            </button>
          </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-slate-950">
                    Schedule New Pickup
                  </h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-slate-500 hover:text-slate-700"
                  >
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <PickupForm
                  onSubmit={handleAddPickup}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "list" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPickups.length > 0 ? (
              filteredPickups.map((pickup) => (
                <PickupCard
                  key={pickup.id}
                  pickup={pickup}
                  onUpdateStatus={handleUpdateStatus}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-slate-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mb-4 text-slate-300"
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
                <p className="text-xl">No pickups found</p>
                <p className="mt-2">
                  Try changing your filter or schedule a new pickup
                </p>
              </div>
            )}
          </div>
        ) : (
          <PickupCalendar
            pickups={filteredPickups}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </div>
    </section>
  );
}

export default ScheduledPickups;
