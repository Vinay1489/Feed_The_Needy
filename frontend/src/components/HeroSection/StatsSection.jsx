"use client";
import React from "react";
import StatsCard from "./StatsCard";

function StatsSection() {
  const statsData = [
    {
      value: "548,320",
      title: "Meals Delivered",
      description: "to those in need",
    },
    {
      value: "127K",
      title: "Kilograms of Food",
      description: "rescued from waste",
    },
    {
      value: "68K",
      title: "CO₂ Emissions",
      description: "saved in kg",
    },
  ];

  return (
    <section className="flex gap-8 mt-16 max-md:flex-wrap max-sm:gap-6">
      {statsData.map((stat, index) => (
        <StatsCard
          key={index}
          value={stat.value}
          title={stat.title}
          description={stat.description}
        />
      ))}
    </section>
  );
}

export default StatsSection;
