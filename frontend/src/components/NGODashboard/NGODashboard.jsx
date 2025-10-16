"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import DashboardOverview from "./DashboardOverview";
import FoodRescueMap from "./FoodRescueMap";
import VolunteerManagement from "./VolunteerManagement";
import ImpactMetrics from "./ImpactMetrics";
import ScheduledPickups from "./ScheduledPickups";
import { useAuth } from "../../contexts/AuthContext";
import { foodAPI, userAPI } from "../../services/api";
import { useNotifications } from "../../hooks/useSocket";

function NGODashboard() {
  const { user } = useAuth();
  const { notifications, unreadCount } = useNotifications();
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    foodInventory: [],
    volunteers: [],
    scheduledPickups: [],
    impactMetrics: {
      totalRecipients: 0,
      totalMealsServed: 0,
      totalDonations: 0,
      monthlyGrowth: 0
    }
  });

  // Fetch NGO dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch food inventory (donations received by this NGO)
        const foodResponse = await foodAPI.getAllFood();
        const ngoFoodItems = foodResponse.data?.filter(item => 
          item.ngo?._id === user?._id || item.ngo === user?._id
        ) || [];
        
        // Fetch volunteers
        const volunteersResponse = await userAPI.getAllUsers('volunteer');
        const volunteers = volunteersResponse.data || [];
        
        // Calculate impact metrics
        const completedDonations = ngoFoodItems.filter(item => item.status === 'delivered');
        const impactMetrics = {
          totalRecipients: completedDonations.length * 10, // 10 people per donation
          totalMealsServed: completedDonations.length * 20, // 20 meals per donation
          totalDonations: ngoFoodItems.length,
          monthlyGrowth: Math.floor(Math.random() * 25) + 5 // Mock growth percentage
        };
        
        setDashboardData({
          foodInventory: ngoFoodItems,
          volunteers: volunteers,
          scheduledPickups: ngoFoodItems.filter(item => 
            ['available', 'picked', 'in_transit'].includes(item.status)
          ),
          impactMetrics
        });
        
      } catch (error) {
        console.error('Error fetching NGO dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  // Render the active section based on state
  const renderActiveSection = () => {
    const commonProps = {
      loading,
      data: dashboardData
    };

    switch (activeSection) {
      case "overview":
        return <DashboardOverview {...commonProps} />;
      case "map":
        return <FoodRescueMap {...commonProps} />;
      case "volunteers":
        return <VolunteerManagement {...commonProps} />;
      case "impact":
        return <ImpactMetrics {...commonProps} />;
      case "pickups":
        return <ScheduledPickups {...commonProps} />;
      default:
        return <DashboardOverview {...commonProps} />;
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
          user={user}
          notifications={notifications}
          unreadCount={unreadCount}
        />

        <main className="flex-1 overflow-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderActiveSection()}
            </motion.div>
          </AnimatePresence>
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
