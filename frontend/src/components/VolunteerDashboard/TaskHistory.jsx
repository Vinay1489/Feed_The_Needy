"use client";
import React, { useState } from "react";
import {
  History,
  ChevronDown,
  ChevronUp,
  Calendar,
  MapPin,
  Package,
} from "lucide-react";

const HistoryItem = ({ task, isExpanded, toggleExpand }) => {
  return (
    <div className="border border-gray-200 rounded-lg mb-3 overflow-hidden">
      <div
        className="flex justify-between items-center p-3 cursor-pointer bg-gray-50"
        onClick={toggleExpand}
      >
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
            <Package className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">{task.title}</h3>
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="w-3 h-3 mr-1" />
              {task.date}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 mr-3">
            {task.quantity}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="p-3 bg-white">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">Source</p>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 text-indigo-600 mt-0.5 mr-1.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">{task.source}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Destination</p>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 text-red-500 mt-0.5 mr-1.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">{task.destination}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-500 mb-1">Time</p>
              <p className="text-sm font-medium text-gray-700">{task.time}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Distance</p>
              <p className="text-sm font-medium text-gray-700">
                {task.distance}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Impact</p>
              <p className="text-sm font-medium text-gray-700">{task.impact}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TaskHistory = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [historyTasks] = useState([
    {
      id: 1,
      title: "Food Rescue #1245",
      date: "Oct 10, 2023",
      quantity: "20 meals (12kg)",
      source: "Fresh Farms Co-op, 555 River Ln",
      destination: "Family Support Center, 777 Hill St",
      time: "45 minutes",
      distance: "3.2 miles",
      impact: "12kg CO₂ saved",
    },
    {
      id: 2,
      title: "Food Rescue #1242",
      date: "Oct 8, 2023",
      quantity: "15 meals (8kg)",
      source: "Green Grocers Market, 123 Main St",
      destination: "Hope Community Center, 456 Oak Ave",
      time: "30 minutes",
      distance: "2.5 miles",
      impact: "8kg CO₂ saved",
    },
    {
      id: 3,
      title: "Food Rescue #1238",
      date: "Oct 5, 2023",
      quantity: "10 meals (6kg)",
      source: "Daily Bread Bakery, 789 Elm St",
      destination: "Sunshine Shelter, 101 Pine Rd",
      time: "25 minutes",
      distance: "1.8 miles",
      impact: "6kg CO₂ saved",
    },
    {
      id: 4,
      title: "Food Rescue #1235",
      date: "Oct 3, 2023",
      quantity: "18 meals (10kg)",
      source: "Community Market, 222 Oak Dr",
      destination: "Youth Center, 333 Maple Ave",
      time: "35 minutes",
      distance: "2.8 miles",
      impact: "10kg CO₂ saved",
    },
  ]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="bg-white rounded-2xl shadow-xl p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <History className="w-5 h-5 text-indigo-600 mr-2" />
          Task History
        </h2>
        <div className="flex space-x-2">
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700">
            <option>All Time</option>
            <option>This Month</option>
            <option>Last Month</option>
          </select>
        </div>
      </div>

      <div className="overflow-y-auto max-h-[400px]">
        {historyTasks.map((task) => (
          <HistoryItem
            key={task.id}
            task={task}
            isExpanded={expandedId === task.id}
            toggleExpand={() => toggleExpand(task.id)}
          />
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 text-center">
        <button className="text-indigo-600 text-sm font-medium">
          Load More History
        </button>
      </div>
    </section>
  );
};

export default TaskHistory;
