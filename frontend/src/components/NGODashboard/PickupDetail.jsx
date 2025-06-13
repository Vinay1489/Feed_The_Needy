"use client";
import React, { useState } from "react";

function PickupDetail({ pickup, onClose, onUpdateStatus }) {
  const [status, setStatus] = useState(pickup.status);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    onUpdateStatus(pickup.id, newStatus);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-950">
              {pickup.title}
            </h2>
            <button
              onClick={onClose}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-slate-500 mb-1">
                Pickup Status
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "pending",
                  "scheduled",
                  "confirmed",
                  "in-progress",
                  "completed",
                  "cancelled",
                ].map((statusOption) => (
                  <button
                    key={statusOption}
                    onClick={() => handleStatusChange(statusOption)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border ${
                      status === statusOption
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {statusOption.charAt(0).toUpperCase() +
                      statusOption.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-500 mb-1">
                Assigned Volunteer
              </h3>
              <p className="text-slate-950 font-medium">{pickup.volunteer}</p>
              {pickup.volunteer === "Unassigned" && (
                <button className="mt-2 px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                  Assign Volunteer
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-slate-500 mb-1">
                Date & Time
              </h3>
              <p className="text-slate-950 font-medium">
                {new Date(pickup.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-slate-950">{pickup.time}</p>
              {pickup.recurring && (
                <div className="flex items-center mt-1 text-slate-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  <span>Recurring: {pickup.recurring}</span>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-500 mb-1">
                Food Details
              </h3>
              <p className="text-slate-950 font-medium">{pickup.foodType}</p>
              <p className="text-slate-950">
                Estimated quantity: {pickup.quantity}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-slate-500 mb-1">
                Pickup Location
              </h3>
              <p className="text-slate-950 font-medium">{pickup.location}</p>
              <button className="mt-2 flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
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
                View on Map
              </button>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-500 mb-1">
                Destination
              </h3>
              <p className="text-slate-950 font-medium">{pickup.destination}</p>
              <button className="mt-2 flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
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
                View on Map
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-500 mb-1">Notes</h3>
            <p className="text-slate-950 bg-slate-50 p-3 rounded-md">
              {pickup.notes}
            </p>
          </div>

          <div className="flex justify-between border-t border-slate-200 pt-6">
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-md text-slate-700 hover:bg-slate-50 transition-colors">
                Edit Pickup
              </button>
              <button className="px-4 py-2 bg-white border border-red-200 rounded-md text-red-600 hover:bg-red-50 transition-colors">
                Cancel Pickup
              </button>
            </div>

            <div>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PickupDetail;
