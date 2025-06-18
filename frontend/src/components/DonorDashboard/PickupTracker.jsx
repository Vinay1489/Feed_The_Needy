import React from "react";

const stages = [
  { label: "Submitted", icon: "✅" },
  { label: "NGO Notified", icon: "📩" },
  { label: "Picked Up", icon: "🚚" },
  { label: "Delivered", icon: "🍽️" },
];

const PickupTracker = ({ currentStatus }) => {
  const currentIndex = stages.findIndex(
    (stage) => stage.label === currentStatus
  );

  return (
    <div className="p-4 bg-white rounded-2xl shadow-lg max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-blue-800 mb-4 text-center">
        📦 Pickup Status Tracker
      </h2>

      <div className="flex items-center justify-between relative">
        {stages.map((stage, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-center relative"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center z-10
                ${
                  index <= currentIndex
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }
              `}
            >
              {stage.icon}
            </div>
            <span
              className={`mt-1 text-sm font-medium ${
                index <= currentIndex ? "text-blue-700" : "text-gray-400"
              }`}
            >
              {stage.label}
            </span>

            {/* Line Connector */}
            {index < stages.length - 1 && (
              <div className="absolute top-5 left-1/2 w-full h-1 -z-0">
                <div className="w-full h-1 bg-gray-300 relative left-1/2 transform -translate-x-1/2">
                  <div
                    className={`h-1 ${
                      index < currentIndex ? "bg-blue-600" : "bg-gray-300"
                    }`}
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PickupTracker;
