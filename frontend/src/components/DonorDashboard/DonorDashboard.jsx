"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import WelcomeBanner from "./WelcomeBanner";
import StatsSummary from "./StatsSummary";
import QuickActions from "./QuickActions";
import RecentDonations from "./RecentDonations";
import NotificationsPanel from "./NotificationsPanel";
import ProfileSection from "./ProfileSection";
import FeedbackSection from "./FeedbackSection";
import DarkModeToggle from "./DarkModeToggle";
import NewDonationModal from "./NewDonationModal";
import SchedulePickupModal from "./SchedulePickupModal";
import EditProfileModal from "./EditProfileModal";
import ViewProfileModal from "./ViewProfileModal";
import { useAuth } from "../../contexts/AuthContext";
import { foodAPI, userAPI } from "../../services/api";
import { useNotifications } from "../../hooks/useSocket";

export default function DonorDashboard() {
  const { user, updateUser } = useAuth();
  const { notifications, unreadCount } = useNotifications();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState({
    totalDonations: 0,
    activeDonations: 0,
    completedDonations: 0,
    totalImpact: 0
  });

  const [openModal, setOpenModal] = useState(null);

  // Fetch donor data
  useEffect(() => {
    const fetchDonorData = async () => {
      try {
        setLoading(true);
        
        // Fetch donor's food donations
        const donationsResponse = await foodAPI.getFoodByDonor(user?._id);
        setDonations(donationsResponse.data || []);
        
        // Calculate stats
        const completed = donationsResponse.data?.filter(d => d.status === 'delivered') || [];
        const active = donationsResponse.data?.filter(d => ['available', 'picked', 'in_transit'].includes(d.status)) || [];
        
        setStats({
          totalDonations: donationsResponse.data?.length || 0,
          activeDonations: active.length,
          completedDonations: completed.length,
          totalImpact: completed.length * 10 // Assuming 10 people fed per donation
        });
        
      } catch (error) {
        console.error('Error fetching donor data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDonorData();
    }
  }, [user]);

  const handleOpen = (type) => setOpenModal(type);
  const handleClose = () => setOpenModal(null);

  const handleDonationSubmit = async (donationData) => {
    try {
      await foodAPI.addFoodItem(donationData);
      toast.success('Food donation added successfully!');
      handleClose();
      // Refresh data
      window.location.reload();
    } catch (error) {
      toast.error('Failed to add food donation');
    }
  };

  const handleProfileUpdate = async (profileData) => {
    try {
      await updateUser(profileData);
      toast.success('Profile updated successfully!');
      handleClose();
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <main
      className={`min-h-screen p-6 ${
        isDarkMode ? "dark bg-slate-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <WelcomeBanner user={user} />
          <div className="flex items-center gap-4">
            <NotificationsPanel notifications={notifications} unreadCount={unreadCount} />
            <DarkModeToggle
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
            <ProfileSection
              user={user}
              onViewProfile={() => setOpenModal("viewProfile")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-12">
            <StatsSummary stats={stats} loading={loading} />
          </div>

          <div className="lg:col-span-12">
            <QuickActions onActionClick={handleOpen} />
          </div>

          <div className="lg:col-span-8">
            <RecentDonations donations={donations} loading={loading} />
          </div>

          <div className="lg:col-span-4 space-y-6">
            <NotificationsPanel notifications={notifications} unreadCount={unreadCount} />
          </div>

          <div className="lg:col-span-4">
            {/* <FeedbackSection /> */}
            {/* <PickupTracker/> this is pickup tracker*/}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {openModal === "donation" && (
          <NewDonationModal 
            isOpen={true} 
            onClose={handleClose}
            onSubmit={handleDonationSubmit}
          />
        )}
        {openModal === "pickup" && (
          <SchedulePickupModal 
            isOpen={true} 
            onClose={handleClose}
          />
        )}
        {openModal === "edit" && (
          <EditProfileModal 
            isOpen={true} 
            onClose={handleClose}
            userData={user}
            onUpdate={handleProfileUpdate}
          />
        )}
        {openModal === "viewProfile" && (
          <ViewProfileModal
            isOpen={true}
            onClose={() => setOpenModal(null)}
            user={user}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
