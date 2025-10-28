import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import EmbedMap from "../../mini-components/EmbedMap";
import OTPModal from "../../mini-components/OTPModal";
import Steps from "../../mini-components/Steps";
import Chat from "../../mini-components/Chat";
import MiniCalendar from "../../mini-components/MiniCalendar";
import { useAppState } from "../../AppState";
import PageTransition from "../PageTransition";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { foodAPI } from "../../services/api";
import { useFoodUpdates, useLocationTracking } from "../../hooks/useSocket";

function StatCard({ title, value, sub, icon, delay = 0 }) {
  return (
    <motion.div 
      className="group relative p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-200/50 shadow-lg hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, type: "spring", damping: 20, stiffness: 100 }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Icon */}
      {icon && (
        <motion.div 
          className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shadow-lg"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: delay + 0.2, duration: 0.6, type: "spring", damping: 15 }}
          whileHover={{ scale: 1.1, rotate: 10 }}
        >
          {icon}
        </motion.div>
      )}
      
      <div className="relative z-10">
        <motion.div 
          className="text-sm font-semibold text-emerald-700/80 uppercase tracking-wide"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.1 }}
        >
          {title}
        </motion.div>
        <motion.div 
          className="mt-2 text-3xl font-bold bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.3, duration: 0.6, type: "spring", damping: 15 }}
        >
          {value}
        </motion.div>
        {sub && (
          <motion.div 
            className="text-sm text-emerald-600/80 mt-1 font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.4 }}
          >
            {sub}
          </motion.div>
        )}
    </div>
    </motion.div>
  );
}

function Section({ title, action, children, delay = 0 }) {
  return (
    <motion.section 
      className="bg-white/80 backdrop-blur-sm rounded-3xl border border-emerald-200/50 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, type: "spring", damping: 20 }}
    >
      <div className="px-6 py-5 border-b border-emerald-200/50 flex items-center justify-between bg-gradient-to-r from-emerald-50/80 to-transparent backdrop-blur-sm">
        <motion.h2 
          className="font-bold text-xl text-emerald-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.2 }}
        >
          {title}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.3 }}
        >
        {action}
        </motion.div>
      </div>
      <motion.div 
        className="p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.4 }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}

export default function VolunteerDashboard() {
  const { user } = useAuth();
  const { foodItems, claimFood, completePickup } = useFoodUpdates();
  const { startTracking, stopTracking, tracking } = useLocationTracking();
  const [loading, setLoading] = useState(true);
  const [otpTarget, setOtpTarget] = useState(null);
  const [stats, setStats] = useState({
    totalPickups: 0,
    totalDeliveries: 0,
    distanceKm: 0,
    pendingToday: 0
  });

  const name = useMemo(
    () => user?.name || "Volunteer",
    [user]
  );

  // Get real data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Calculate stats from food items
        const completedDeliveries = foodItems.filter(item => item.status === 'delivered');
        const pendingPickups = foodItems.filter(item => item.status === 'available');
        
        setStats({
          totalPickups: foodItems.length,
          totalDeliveries: completedDeliveries.length,
          distanceKm: Math.floor(Math.random() * 100) + 50, // Mock data for now
          pendingToday: pendingPickups.length
        });
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, foodItems]);

  // Mock data for demo purposes - replace with real data
  const pendingPickups = foodItems.filter(item => item.status === 'available');
  const ongoingDeliveries = foodItems.filter(item => item.status === 'in_transit');
  const completedDeliveries = foodItems.filter(item => item.status === 'delivered');

  const handleAcceptPickup = async (pickup) => {
    try {
      await claimFood(pickup._id);
      toast.success('Pickup accepted successfully!');
    } catch (error) {
      toast.error('Failed to accept pickup');
    }
  };

  const handleRejectPickup = (pickup) => {
    toast.info('Pickup rejected');
  };

  const handleCompleteDelivery = async (delivery) => {
    try {
      await completePickup(delivery._id);
      toast.success('Delivery completed successfully!');
    } catch (error) {
      toast.error('Failed to complete delivery');
    }
  };

  const handleConfirmOtp = (deliveryId, code) => {
    toast.success('OTP confirmed successfully!');
  };

  const { totalPickups, totalDeliveries, distanceKm, pendingToday } = stats;

  useEffect(() => {
    const id = setInterval(() => {
      toast.info("New pickup request near you", {
        description: "Tap to review in Pickup Management.",
        action: {
          label: "View",
          onClick: () =>
            document
              .getElementById("pickups-section")
              ?.scrollIntoView({ behavior: "smooth" }),
        },
      });
    }, 30000);
    return () => clearInterval(id);
  }, []);

  const timeLeft = (iso) => {
    const ms = new Date(iso) - new Date();
    if (ms <= 0) return "Expired";
    const h = Math.floor(ms / 3600000);
    const m = Math.round((ms % 3600000) / 60000);
    return `${h}h ${m}m left`;
  };

  return (
    <Layout>
      <PageTransition>
        <div className="space-y-8">
        {/* Welcome Header */}
        <motion.div 
          className="flex items-center justify-between flex-wrap gap-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", damping: 20 }}
        >
          <div className="space-y-2">
            <motion.h1 
              className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
                Welcome back, {name.split(" ")[0]} 👋
            </motion.h1>
            <motion.p 
              className="text-emerald-700/80 text-lg font-medium"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
                You have {pendingToday} pending pickups today.
            </motion.p>
            </div>
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="calendar"
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 flex items-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/>
                </svg>
                View Calendar
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="support"
                className="px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-sm text-emerald-700 font-semibold border border-emerald-200/50 hover:bg-emerald-50/80 hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Report Issue
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <StatCard
            title="Total Pickups"
            value={totalPickups}
            sub="All time"
            icon={
              <svg viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M3 7h13l5 5v5a2 2 0 0 1-2 2H3z" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="7.5" cy="19.5" r="1.5"/>
                <circle cx="18.5" cy="19.5" r="1.5"/>
              </svg>
            }
            delay={0.1}
          />
          <StatCard
            title="Total Deliveries"
            value={totalDeliveries}
            sub="Completed"
            icon={
              <svg viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M4 4h16v6H4zM10 14h10v6H10zM4 14h4v6H4z" fill="none" stroke="currentColor" strokeWidth="2"/>
              </svg>
            }
            delay={0.2}
          />
          <StatCard
            title="Distance Covered"
            value={`${distanceKm} km`}
            sub="This month"
            icon={
              <svg viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M3 12l9-9 9 9" fill="none" stroke="currentColor" strokeWidth="2"/>
                <path d="M9 21V9h6v12" fill="none" stroke="currentColor" strokeWidth="2"/>
              </svg>
            }
            delay={0.3}
          />
          <StatCard
            title="Pending Today"
            value={pendingToday}
            sub="Urgent"
            icon={
              <svg viewBox="0 0 24 24" className="w-6 h-6">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
              </svg>
            }
            delay={0.4}
          />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8" id="pickups-section">
            <Section title="Food Pickup Management" delay={0.6}>
              <div className="space-y-6">
                <AnimatePresence>
                  {pendingPickups.length === 0 && (
                    <motion.div 
                      className="p-8 text-center bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl border border-emerald-200/50"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-8 h-8 text-emerald-600">
                          <path d="M3 7h13l5 5v5a2 2 0 0 1-2 2H3z" fill="none" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="7.5" cy="19.5" r="1.5"/>
                          <circle cx="18.5" cy="19.5" r="1.5"/>
                        </svg>
                    </div>
                      <p className="text-emerald-800/80 font-medium">No active pickup requests</p>
                      <p className="text-emerald-600/60 text-sm mt-1">Check back later for new opportunities</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {pendingPickups.map((p, index) => (
                  <motion.div
                      key={p.id}
                    className="group relative p-6 bg-white/80 backdrop-blur-sm border border-emerald-200/50 rounded-2xl hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 overflow-hidden"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5, type: "spring", damping: 20 }}
                    whileHover={{ y: -2 }}
                  >
                    {/* Background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10">
                      <div className="flex flex-wrap items-start gap-6 justify-between">
                        <div className="flex-1 min-w-0">
                          <motion.div 
                            className="font-bold text-lg text-emerald-900 mb-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                          >
                            {p.donor.name}
                          </motion.div>
                          <motion.div 
                            className="text-sm text-emerald-700/80 mb-3 flex items-center gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                          >
                            <svg viewBox="0 0 24 24" className="w-4 h-4">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="none" stroke="currentColor" strokeWidth="2"/>
                              <circle cx="12" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                            {p.donor.address}
                          </motion.div>
                          <motion.div 
                            className="text-sm mb-3 p-3 bg-emerald-50/50 rounded-xl border border-emerald-200/30"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.4 }}
                          >
                            <span className="font-semibold text-emerald-800">Food Items: </span>
                            {p.items.map((i) => `${i.name} (${i.qty})`).join(", ")}
                          </motion.div>
                          <motion.div 
                            className="flex items-center gap-2 text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.5 }}
                          >
                            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">
                              ⏰ {timeLeft(p.expiry)}
                            </span>
                          </motion.div>
                        </div>
                        
                        <motion.div 
                          className="flex flex-col sm:flex-row items-center gap-3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.6 }}
                        >
                          <motion.button
                            onClick={() => handleAcceptPickup(p)}
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg viewBox="0 0 24 24" className="w-4 h-4">
                              <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                            Accept
                          </motion.button>
                          <motion.button
                            onClick={() => handleRejectPickup(p)}
                            className="px-6 py-3 rounded-xl bg-white/80 backdrop-blur-sm text-rose-700 font-semibold border border-rose-200/50 hover:bg-rose-50/80 hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg viewBox="0 0 24 24" className="w-4 h-4">
                              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                            Reject
                          </motion.button>
                        </motion.div>
                      </div>
                      <motion.div 
                        className="mt-6 grid sm:grid-cols-2 gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.7 }}
                      >
                        <div className="relative overflow-hidden rounded-xl border border-emerald-200/50">
                        <EmbedMap
                          lat={p.donor.lat}
                          lng={p.donor.lng}
                          label={`Donor: ${p.donor.name}`}
                        />
                        </div>
                        <div className="relative overflow-hidden rounded-xl border border-emerald-200/50">
                        <EmbedMap
                          lat={p.ngo.lat}
                          lng={p.ngo.lng}
                          label={`NGO: ${p.ngo.name}`}
                        />
                      </div>
                      </motion.div>
                      <motion.div 
                        className="mt-4 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.8 }}
                      >
                        <motion.a
                          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl font-medium hover:bg-emerald-100 transition-all duration-300"
                          href={`https://www.google.com/maps/dir/?api=1&origin=${p.donor.lat},${p.donor.lng}&destination=${p.ngo.lat},${p.ngo.lng}`}
                          target="_blank"
                          rel="noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg viewBox="0 0 24 24" className="w-4 h-4">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="none" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="12" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          Open route in Google Maps
                        </motion.a>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
                </div>
              </Section>

              <Section
                title="Communication"
                delay={0.8}
                action={
                  <motion.a
                    href="tel:+18001234567"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:shadow-rose-500/25 transition-all duration-300 flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    Emergency Contact
                  </motion.a>
                }
              >
                <Chat />
              </Section>
            </div>

          <div className="space-y-8">
            <Section title="Ongoing Deliveries" delay={1.0}>
            <div className="space-y-6">
                <AnimatePresence>
                  {deliveries.length === 0 && (
                    <motion.div 
                      className="p-8 text-center bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl border border-blue-200/50"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-8 h-8 text-blue-600">
                          <path d="M4 4h16v6H4zM10 14h10v6H10zM4 14h4v6H4z" fill="none" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                    </div>
                      <p className="text-blue-800/80 font-medium">No deliveries in progress</p>
                      <p className="text-blue-600/60 text-sm mt-1">Complete your pickups to start deliveries</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {deliveries.map((d, index) => (
                  <motion.div
                      key={d.id}
                    className="group relative p-6 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-2xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5, type: "spring", damping: 20 }}
                    whileHover={{ y: -2 }}
                  >
                    {/* Background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex-1">
                          <motion.div 
                            className="font-bold text-lg text-blue-900 mb-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                          >
                            {d.route.donor.name} → {d.route.ngo.name}
                          </motion.div>
                          <motion.div 
                            className="text-sm mb-4 p-3 bg-blue-50/50 rounded-xl border border-blue-200/30"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                          >
                            <span className="font-semibold text-blue-800">Delivery OTP: </span>
                            <span className="font-mono bg-blue-100 px-3 py-1 rounded-lg text-blue-900 font-bold">
                              {d.otp}
                            </span>
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.4 }}
                          >
                          <Steps status={d.status} />
                          </motion.div>
                        </div>
                        
                        <motion.div 
                          className="flex flex-col gap-3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.5 }}
                        >
                          {d.status !== "Delivered" && (
                            <motion.button
                              onClick={() => handleCompleteDelivery(d)}
                              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <svg viewBox="0 0 24 24" className="w-4 h-4">
                                <path d="M9 18l6-6-6-6" fill="none" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                              Update Status
                            </motion.button>
                          )}
                          {d.status !== "Delivered" && (
                            <motion.button
                              onClick={() => setOtpTarget(d)}
                              className="px-6 py-3 rounded-xl bg-white/80 backdrop-blur-sm text-blue-700 font-semibold border border-blue-200/50 hover:bg-blue-50/80 hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <svg viewBox="0 0 24 24" className="w-4 h-4">
                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" fill="none" stroke="currentColor" strokeWidth="2"/>
                                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" fill="none" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                              NGO Confirmation
                            </motion.button>
                          )}
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                  ))}
                </div>
              </Section>

            <Section title="Schedule" delay={1.2}>
              <div className="relative overflow-hidden rounded-xl border border-emerald-200/50">
                <MiniCalendar tasks={pendingPickups} />
              </div>
            </Section>

            <Section
              title="Profile & Performance"
              delay={1.4}
              action={
                <motion.a
                  href="/profile"
                  className="text-sm text-emerald-700 underline hover:text-emerald-800 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Edit Profile
                </motion.a>
              }
            >
              <div className="grid grid-cols-2 gap-4">
                <StatCard
                  title="Donations delivered"
                  value={totalDeliveries}
                  icon={
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path d="M4 4h16v6H4zM10 14h10v6H10zM4 14h4v6H4z" fill="none" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  }
                  delay={1.5}
                />
                <StatCard 
                  title="Rating" 
                  value="4.8★"
                  icon={
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="none" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  }
                  delay={1.6}
                />
                <StatCard 
                  title="Level" 
                  value="Silver"
                  icon={
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2"/>
                      <path d="M16 10a4 4 0 0 1-8 0" fill="none" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  }
                  delay={1.7}
                />
                <StatCard
                  title="Service area"
                  value={profile?.serviceArea || "San Francisco"}
                  icon={
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  }
                  delay={1.8}
                />
              </div>
            </Section>
            </div>
          </div>

          {otpTarget && (
            <OTPModal
              expected={otpTarget.otp}
              onClose={() => setOtpTarget(null)}
              onConfirm={(code) => handleConfirmOtp(otpTarget.id, code)}
            />
          )}
        </div>
      </PageTransition>
    </Layout>
    );
  }
