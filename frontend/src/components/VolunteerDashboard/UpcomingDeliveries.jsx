"use client";
import React from "react";
import { CalendarDays, Clock, MapPin } from "lucide-react";

const DeliveryItem = ({ day, date, time, location, isToday }) => (
  <div
    className={`p-3 rounded-lg mb-3 ${isToday ? "bg-indigo-50" : "bg-gray-50"}`}
  >
    <div className="flex justify-between items-start mb-1">
      <div className="flex items-center">
        <span
          className={`text-sm font-semibold ${
            isToday ? "text-indigo-700" : "text-gray-700"
          }`}
        >
          {day}, {date}
        </span>
        {isToday && (
          <span className="ml-2 text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
            Today
          </span>
        )}
      </div>
      <div className="flex items-center text-xs text-gray-500">
        <Clock className="w-3 h-3 mr-1" />
        {time}
      </div>
    </div>

    <div className="flex items-start mt-2">
      <MapPin className="w-4 h-4 text-gray-500 mt-0.5 mr-1.5 flex-shrink-0" />
      <p className="text-sm text-gray-600">{location}</p>
    </div>
  </div>
);

const UpcomingDeliveries = () => {
  const deliveries = [
    {
      id: 1,
      day: "Tue",
      date: "Oct 12",
      time: "11:00 AM",
      location: "Green Grocers Market, 123 Main St",
      isToday: true,
    },
    {
      id: 2,
      day: "Wed",
      date: "Oct 13",
      time: "2:30 PM",
      location: "Daily Bread Bakery, 789 Elm St",
      isToday: false,
    },
    {
      id: 3,
      day: "Thu",
      date: "Oct 14",
      time: "5:00 PM",
      location: "Fresh Farms Co-op, 555 River Ln",
      isToday: false,
    },
    {
      id: 4,
      day: "Sat",
      date: "Oct 16",
      time: "10:00 AM",
      location: "Community Market, 222 Oak Dr",
      isToday: false,
    },
  ];

  return (
    <section className="bg-white rounded-2xl shadow-xl p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <CalendarDays className="w-5 h-5 text-indigo-600 mr-2" />
          Upcoming Deliveries
        </h2>
        <button className="text-sm text-indigo-600 font-medium">
          View All
        </button>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">This Week</span>
          <span className="text-xs text-gray-500">4 scheduled</span>
        </div>

        <div className="overflow-y-auto max-h-[300px]">
          {deliveries.map((delivery) => (
            <DeliveryItem
              key={delivery.id}
              day={delivery.day}
              date={delivery.date}
              time={delivery.time}
              location={delivery.location}
              isToday={delivery.isToday}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="w-full py-2.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium flex items-center justify-center">
          <CalendarDays className="w-4 h-4 mr-2" />
          Open Calendar View
        </button>
      </div>
    </section>
  );
};

export default UpcomingDeliveries;
