import React from "react";
import DashboardCard from "./DashboardCard";

export default function NearbyNGOs() {
  const ngos = [
    {
      name: "Helping Hands NGO",
      distance: "2.5 km",
      needs: ["Vegetables", "Fruits", "Cooked Meals"],
      rating: 4.8,
    },
    {
      name: "Care Foundation",
      distance: "3.8 km",
      needs: ["Dry Rations", "Packaged Food"],
      rating: 4.6,
    },
  ];

  return (
    <DashboardCard>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          NGOs Nearby
        </h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
          View Map
        </button>
      </div>

      <div className="space-y-4">
        {ngos.map((ngo, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">
                  {ngo.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {ngo.distance} away
                </p>
              </div>
              <div className="flex items-center">
                <span className="text-yellow-400">⭐</span>
                <span className="ml-1 text-sm text-slate-700 dark:text-slate-300">
                  {ngo.rating}
                </span>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {ngo.needs.map((need, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                >
                  {need}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
