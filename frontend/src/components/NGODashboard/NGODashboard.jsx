"use client";
import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import DashboardOverview from "./DashboardOverview";
import FoodRescueMap from "./FoodRescueMap";
import VolunteerManagement from "./VolunteerManagement";
import ImpactMetrics from "./ImpactMetrics";
import ScheduledPickups from "./ScheduledPickups";

function NGODashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Render the active section based on state
  const renderActiveSection = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />;
      case "map":
        return <FoodRescueMap />;
      case "volunteers":
        return <VolunteerManagement />;
      case "impact":
        return <ImpactMetrics />;
      case "pickups":
        return <ScheduledPickups />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <DashboardSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <DashboardHeader
          toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          collapsed={sidebarCollapsed}
        />

        <main className="flex-1 overflow-auto p-6">
          {renderActiveSection()}
        </main>

        <footer className="py-4 px-6 text-center text-sm text-slate-500 border-t border-slate-200">
          <p>
            © {new Date().getFullYear()} Food Rescue Network. All rights
            reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default NGODashboard;
