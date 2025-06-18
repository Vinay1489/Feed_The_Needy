"use client";
import React, { useState } from "react";
import WelcomeBanner from "./WelcomeBanner";
import StatsSummary from "./StatsSummary";
import QuickActions from "./QuickActions";
import RecentDonations from "./RecentDonations";
//import NearbyNGOs from "./NearbyNGOs";
import NotificationsPanel from "./NotificationsPanel";
import ProfileSection from "./ProfileSection";
import FeedbackSection from "./FeedbackSection";
import DarkModeToggle from "./DarkModeToggle";
import NewDonationModal from "./NewDonationModal";
import SchedulePickupModal from "./SchedulePickupModal";
import EditProfileModal from "./EditProfileModal";
import PickupTracker from "./PickupTracker";
// import ViewHistoryModal from "./ViewHistoryModal";

export default function DonorDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const user = {
    name:"harsha",
    photo:null,
  }

  const [openModal, setOpenModal] = useState(null);
  // Values: 'donation', 'pickup', 'edit', 'history', or null

  const handleOpen = (type) => setOpenModal(type);
  const handleClose = () => setOpenModal(null);

  return (
    <main
      className={`min-h-screen p-6 ${
        isDarkMode ? "dark bg-slate-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <WelcomeBanner />
          <div className="flex items-center gap-4">
            <DarkModeToggle
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
            <ProfileSection user={user}/>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-12">
            <StatsSummary />
          </div>

          <div className="lg:col-span-12">
            <QuickActions onActionClick={handleOpen} />
          </div>

          <div className="lg:col-span-8">
            <RecentDonations />
          </div>

          <div className="lg:col-span-4 space-y-6">
            <NotificationsPanel />
          </div>

          <div className="lg:col-span-4">
            {/* <FeedbackSection /> */}
            {/* <PickupTracker/> this is pickup tracker*/}
          </div>
        </div>
      </div>
      
      {openModal === "donation" && (
        <NewDonationModal isOpen={true} onClose={handleClose} />
      )}
      {openModal === "pickup" && (
        <SchedulePickupModal isOpen={true} onClose={handleClose} />
      )}
      {openModal === "edit" && (
        <EditProfileModal isOpen={true} onClose={handleClose} />
      )}

    </main>
  );
}
