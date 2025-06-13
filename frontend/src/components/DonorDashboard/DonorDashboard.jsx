"use client";
import React, { useState } from "react";
import WelcomeBanner from "./WelcomeBanner";
import StatsSummary from "./StatsSummary";
import QuickActions from "./QuickActions";
import RecentDonations from "./RecentDonations";
import NearbyNGOs from "./NearbyNGOs";
import NotificationsPanel from "./NotificationsPanel";
import ProfileSection from "./ProfileSection";
import FeedbackSection from "./FeedbackSection";
import DarkModeToggle from "./DarkModeToggle";

export default function DonorDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <main
      className={`min-h-screen p-6 ${
        isDarkMode ? "dark bg-slate-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-end">
          <DarkModeToggle
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-12">
            <WelcomeBanner />
          </div>

          <div className="lg:col-span-12">
            <StatsSummary />
          </div>

          <div className="lg:col-span-12">
            <QuickActions />
          </div>

          <div className="lg:col-span-8">
            <RecentDonations />
          </div>

          <div className="lg:col-span-4 space-y-6">
            <NotificationsPanel />
            <ProfileSection />
          </div>

          <div className="lg:col-span-8">
            <NearbyNGOs />
          </div>

          <div className="lg:col-span-4">
            <FeedbackSection />
          </div>
        </div>
      </div>
    </main>
  );
}
