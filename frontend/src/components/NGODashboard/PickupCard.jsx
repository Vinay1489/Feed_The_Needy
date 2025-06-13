import React, { useState } from "react";
import PickupDetail from "./PickupDetail";

function PickupCard({ pickup, onUpdateStatus }) {
  const [showDetail, setShowDetail] = useState(false);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    scheduled: "bg-blue-100 text-blue-800 border-blue-200",
    confirmed: "bg-green-100 text-green-800 border-green-200",
    "in-progress": "bg-purple-100 text-purple-800 border-purple-200",
    completed: "bg-gray-100 text-gray-800 border-gray-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
  };

  const formatDate = (dateString) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <>
      <article
        className="flex flex-col overflow-hidden rounded-xl border border-solid shadow-xl bg-white bg-opacity-30 border-white border-opacity-20 hover:shadow-2xl transition-shadow cursor-pointer"
        onClick={() => setShowDetail(true)}
      >
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-slate-950 line-clamp-1">
              {pickup.title}
            </h3>
            <span
              className={`px-2.5 py-1 text-xs font-medium rounded-full border ${
                statusColors[pickup.status]
              }`}
            >
              {pickup.status.charAt(0).toUpperCase() + pickup.status.slice(1)}
            </span>
          </div>

          <div className="flex items-center text-slate-500 mb-3">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>
              {formatDate(pickup.date)} • {pickup.time}
            </span>
          </div>

          <div className="flex items-start text-slate-500 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="line-clamp-2">{pickup.location}</span>
          </div>

          <div className="flex items-center text-slate-500 mb-3">
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span>{pickup.foodType}</span>
          </div>

          <div className="flex items-center text-slate-500">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span>{pickup.volunteer}</span>
          </div>
        </div>

        <div className="mt-auto border-t border-slate-100 p-4 flex justify-between">
          {pickup.recurring && (
            <div className="flex items-center text-slate-500 text-sm">
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
              {pickup.recurring}
            </div>
          )}
          <button
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            onClick={(e) => {
              e.stopPropagation();
              setShowDetail(true);
            }}
          >
            View Details
          </button>
        </div>
      </article>

      {showDetail && (
        <PickupDetail
          pickup={pickup}
          onClose={() => setShowDetail(false)}
          onUpdateStatus={onUpdateStatus}
        />
      )}
    </>
  );
}

export default PickupCard;
