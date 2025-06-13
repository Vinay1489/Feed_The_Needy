import React from "react";
import StatCard from "./StatCard";

// Statistics data
const statistics = [
  {
    id: 1,
    value: "47+",
    label: "NGO Partners",
  },
  {
    id: 2,
    value: "124+",
    label: "Regular Donors",
  },
  {
    id: 3,
    value: "346+",
    label: "Active Volunteers",
  },
  {
    id: 4,
    value: "11",
    label: "Cities Covered",
  },
];

function StatisticsGrid() {
  return (
    <div className="grid grid-cols-4 gap-6 w-full max-md:grid-cols-2 max-sm:grid-cols-1">
      {statistics.map((stat) => (
        <StatCard key={stat.id} value={stat.value} label={stat.label} />
      ))}
    </div>
  );
}

export default StatisticsGrid;
