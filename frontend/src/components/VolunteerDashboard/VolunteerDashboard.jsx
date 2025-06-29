"use client";
import React, { useState } from "react";
import ProfileSection from "./ProfileSection";
import ActiveTasksPanel from "./ActiveTasksPanel";
import UpcomingDeliveries from "./UpcomingDeliveries";
import TaskHistory from "./TaskHistory";
import DashboardMetrics from "./DashboardMetrics";
import ActionButtons from "./ActionButtons";
import VolunteerProfileModal from "./VolunteerProfileModal";

const VolunteerDashboard = () => {
  //const [activeTab, setActiveTab] = useState("dashboard");
  const [isAvailable,setIsAvailable] = useState(true);

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Volunteer Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Welcome back, let's make a difference today!
            </p>
          </div>

          <nav className="flex space-x-2 mt-4 md:mt-0">
            <button
              className={`px-4 py-1 ${
                isAvailable
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => setIsAvailable(true)}
            >
              Available
            </button>
            <button
              className={`px-4 py-1 ${
                !isAvailable
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => setIsAvailable(false)}
            >
              Unavailable
            </button>

            <VolunteerProfileModal isAvailable={isAvailable}/>
          </nav>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* <ProfileSection /> */}

          <div className="lg:col-span-2">
            <ActiveTasksPanel />
          </div>

          <UpcomingDeliveries />

          <DashboardMetrics />

          <div className="md:col-span-2">
            <TaskHistory />
          </div>
        </div>

        <ActionButtons />
      </div>
    </main>
  );
};

export default VolunteerDashboard;
