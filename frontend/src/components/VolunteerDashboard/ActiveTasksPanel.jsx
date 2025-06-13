"use client";
import React, { useState } from "react";
import {
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

const TaskCard = ({ task }) => {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    "in-progress": "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-3">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-800">{task.title}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            statusColors[task.status]
          }`}
        >
          {task.status === "in-progress"
            ? "In Progress"
            : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
      </div>

      <div className="flex items-center text-sm text-gray-600 mb-2">
        <Clock className="w-4 h-4 mr-1.5 text-gray-500" />
        {task.time}
      </div>

      <div className="flex items-start mb-3">
        <div className="flex-shrink-0 mt-1">
          <MapPin className="w-4 h-4 text-indigo-600" />
        </div>
        <div className="ml-2">
          <p className="text-sm font-medium text-gray-700">Pickup</p>
          <p className="text-sm text-gray-600">{task.pickup}</p>
        </div>
      </div>

      <div className="flex items-center justify-center my-2">
        <div className="w-full h-px bg-gray-200"></div>
        <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
        <div className="w-full h-px bg-gray-200"></div>
      </div>

      <div className="flex items-start mb-3">
        <div className="flex-shrink-0 mt-1">
          <MapPin className="w-4 h-4 text-red-500" />
        </div>
        <div className="ml-2">
          <p className="text-sm font-medium text-gray-700">Dropoff</p>
          <p className="text-sm text-gray-600">{task.dropoff}</p>
        </div>
      </div>

      <div className="flex items-center text-sm text-gray-600 mb-3">
        <div className="flex items-center mr-4">
          <AlertCircle className="w-4 h-4 mr-1 text-gray-500" />
          <span>{task.quantity}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1 text-gray-500" />
          <span>{task.eta}</span>
        </div>
      </div>

      {task.status !== "completed" && (
        <div className="flex space-x-2">
          <button className="flex-1 bg-indigo-600 text-white text-sm font-medium py-2 px-3 rounded-lg flex items-center justify-center">
            <MapPin className="w-4 h-4 mr-1.5" />
            View Route
          </button>
          {task.status === "in-progress" && (
            <button className="flex-1 bg-green-600 text-white text-sm font-medium py-2 px-3 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 mr-1.5" />
              Mark Complete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const ActiveTasksPanel = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Food Rescue #1248",
      status: "in-progress",
      time: "Today, 2:30 PM",
      pickup: "Green Grocers Market, 123 Main St",
      dropoff: "Hope Community Center, 456 Oak Ave",
      quantity: "15 meals (8kg)",
      eta: "20 min remaining",
    },
    {
      id: 2,
      title: "Food Rescue #1249",
      status: "pending",
      time: "Today, 4:00 PM",
      pickup: "Daily Bread Bakery, 789 Elm St",
      dropoff: "Sunshine Shelter, 101 Pine Rd",
      quantity: "10 meals (5kg)",
      eta: "45 min total",
    },
    {
      id: 3,
      title: "Food Rescue #1245",
      status: "completed",
      time: "Today, 11:30 AM",
      pickup: "Fresh Farms Co-op, 555 River Ln",
      dropoff: "Family Support Center, 777 Hill St",
      quantity: "20 meals (12kg)",
      eta: "Completed",
    },
  ]);

  return (
    <section className="bg-white rounded-2xl shadow-xl p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Clock className="w-5 h-5 text-indigo-600 mr-2" />
          Active Tasks
        </h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium">
            All
          </button>
          <button className="px-3 py-1.5 bg-white text-gray-700 rounded-lg text-sm font-medium">
            In Progress
          </button>
          <button className="px-3 py-1.5 bg-white text-gray-700 rounded-lg text-sm font-medium">
            Pending
          </button>
        </div>
      </div>

      <div className="overflow-y-auto max-h-[500px] pr-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
};

export default ActiveTasksPanel;
