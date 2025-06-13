"use client";
import React, { useState } from "react";
import PickupDetail from "./PickupDetail";

function PickupCalendar({ pickups, onUpdateStatus }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedPickup, setSelectedPickup] = useState(null);

  // Generate calendar days for the current month
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();

    // Total days in the month
    const daysInMonth = lastDay.getDate();

    // Calendar array with 6 weeks (42 days) to ensure we have enough rows
    const calendar = [];

    // Add days from previous month to fill the first row
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      calendar.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false,
      });
    }

    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push({
        date: new Date(year, month, day),
        isCurrentMonth: true,
      });
    }

    // Add days from next month to complete the calendar
    const remainingDays = 42 - calendar.length;
    for (let day = 1; day <= remainingDays; day++) {
      calendar.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
      });
    }

    return calendar;
  };

  const calendarDays = generateCalendarDays();

  // Format date to YYYY-MM-DD for comparison with pickup dates
  const formatDateForComparison = (date) => {
    return date.toISOString().split("T")[0];
  };

  // Get pickups for a specific date
  const getPickupsForDate = (date) => {
    const dateString = formatDateForComparison(date);
    return pickups.filter((pickup) => pickup.date === dateString);
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  // Navigate to current month
  const goToCurrentMonth = () => {
    setCurrentMonth(new Date());
  };

  // Format month and year for display
  const formatMonthYear = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  // Day names for the calendar header
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <>
      <div className="bg-white rounded-xl border border-solid shadow-xl border-white border-opacity-20 overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-950">
            {formatMonthYear(currentMonth)}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={goToPreviousMonth}
              className="p-2 rounded-md hover:bg-slate-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-slate-700"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={goToCurrentMonth}
              className="px-3 py-1 text-sm font-medium text-slate-700 border border-slate-200 rounded-md hover:bg-slate-50"
            >
              Today
            </button>
            <button
              onClick={goToNextMonth}
              className="p-2 rounded-md hover:bg-slate-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-slate-700"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 border-b border-slate-200">
          {dayNames.map((day, index) => (
            <div
              key={index}
              className="p-2 text-center text-sm font-medium text-slate-700"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 auto-rows-fr">
          {calendarDays.map((day, index) => {
            const dayPickups = getPickupsForDate(day.date);
            const isToday =
              formatDateForComparison(day.date) ===
              formatDateForComparison(new Date());

            return (
              <div
                key={index}
                className={`min-h-[100px] p-1 border-b border-r border-slate-100 ${
                  day.isCurrentMonth ? "bg-white" : "bg-slate-50 text-slate-400"
                } ${isToday ? "bg-blue-50" : ""}`}
              >
                <div className="flex justify-between items-center p-1">
                  <span
                    className={`text-sm font-medium ${
                      isToday
                        ? "bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center"
                        : ""
                    }`}
                  >
                    {day.date.getDate()}
                  </span>
                  {dayPickups.length > 0 && (
                    <span className="text-xs font-medium text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-full">
                      {dayPickups.length}
                    </span>
                  )}
                </div>

                <div className="mt-1 space-y-1">
                  {dayPickups.slice(0, 3).map((pickup, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedPickup(pickup)}
                      className={`px-1.5 py-1 text-xs rounded truncate cursor-pointer ${
                        pickup.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : pickup.status === "scheduled"
                          ? "bg-blue-100 text-blue-800"
                          : pickup.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : pickup.status === "in-progress"
                          ? "bg-purple-100 text-purple-800"
                          : pickup.status === "completed"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {pickup.time} - {pickup.title}
                    </div>
                  ))}

                  {dayPickups.length > 3 && (
                    <div className="px-1.5 py-0.5 text-xs text-center text-slate-500 hover:text-blue-600 cursor-pointer">
                      +{dayPickups.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedPickup && (
        <PickupDetail
          pickup={selectedPickup}
          onClose={() => setSelectedPickup(null)}
          onUpdateStatus={onUpdateStatus}
        />
      )}
    </>
  );
}

export default PickupCalendar;
