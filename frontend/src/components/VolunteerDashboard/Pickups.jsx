import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppState } from "../../AppState";
import EmbedMap from "../../mini-components/EmbedMap";
import PageTransition from "../PageTransition";

function timeLeft(iso) {
  const ms = new Date(iso) - new Date();
  if (ms <= 0) return "Expired";
  const h = Math.floor(ms / 3600000);
  const m = Math.round((ms % 3600000) / 60000);
  return `${h}h ${m}m left`;
}

export default function Pickups() {
  const { pendingPickups, acceptPickup, rejectPickup } = useAppState();
  
  return (
    <PageTransition>
      <div className="space-y-8">
        {/* Header */}
        <motion.header
          className="text-center space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", damping: 20 }}
        >
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Food Pickup Management
          </motion.h1>
          <motion.p 
            className="text-emerald-700/80 text-lg font-medium max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Review active pickup requests and accept the ones you can fulfill to help reduce food waste.
          </motion.p>
        </motion.header>

        {/* Stats Summary */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.div 
            className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-2xl shadow-lg"
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Pending Requests</p>
                <p className="text-3xl font-bold">{pendingPickups.length}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
                  <path d="M3 7h13l5 5v5a2 2 0 0 1-2 2H3z" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="7.5" cy="19.5" r="1.5"/>
                  <circle cx="18.5" cy="19.5" r="1.5"/>
                </svg>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg"
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Active Today</p>
                <p className="text-3xl font-bold">{pendingPickups.filter(p => new Date(p.expiry) > new Date()).length}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="p-6 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-2xl shadow-lg"
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm font-medium">Urgent</p>
                <p className="text-3xl font-bold">{pendingPickups.filter(p => {
                  const ms = new Date(p.expiry) - new Date();
                  return ms > 0 && ms < 3600000; // Less than 1 hour
                }).length}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
                  <path d="M12 9v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Pickup Cards */}
        <div className="space-y-6">
          <AnimatePresence>
            {pendingPickups.length === 0 && (
              <motion.div 
                className="p-12 text-center bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-3xl border border-emerald-200/50"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-emerald-100 flex items-center justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.6, type: "spring", damping: 15 }}
                >
                  <svg viewBox="0 0 24 24" className="w-12 h-12 text-emerald-600">
                    <path d="M3 7h13l5 5v5a2 2 0 0 1-2 2H3z" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="7.5" cy="19.5" r="1.5"/>
                    <circle cx="18.5" cy="19.5" r="1.5"/>
                  </svg>
                </motion.div>
                <motion.h3 
                  className="text-2xl font-bold text-emerald-800 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  No Active Pickup Requests
                </motion.h3>
                <motion.p 
                  className="text-emerald-600/80 text-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Check back later for new opportunities to help reduce food waste!
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
          
          {pendingPickups.map((p, index) => {
            const timeRemaining = timeLeft(p.expiry);
            const isUrgent = timeRemaining.includes("m") && !timeRemaining.includes("h");
            const isExpired = timeRemaining === "Expired";
            
            return (
              <motion.div
                key={p.id}
                className={`group relative p-8 bg-white/80 backdrop-blur-sm border rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isExpired 
                    ? "border-red-200/50 hover:shadow-red-500/10" 
                    : isUrgent 
                    ? "border-amber-200/50 hover:shadow-amber-500/10" 
                    : "border-emerald-200/50 hover:shadow-emerald-500/10"
                }`}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.6, 
                  type: "spring", 
                  damping: 20 
                }}
                whileHover={{ y: -5 }}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isExpired 
                    ? "bg-gradient-to-br from-red-50/30 to-transparent" 
                    : isUrgent 
                    ? "bg-gradient-to-br from-amber-50/30 to-transparent" 
                    : "bg-gradient-to-br from-emerald-50/30 to-transparent"
                }`}></div>
                
                {/* Status indicator */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                  isExpired 
                    ? "bg-red-100 text-red-800" 
                    : isUrgent 
                    ? "bg-amber-100 text-amber-800 animate-pulse" 
                    : "bg-emerald-100 text-emerald-800"
                }`}>
                  {isExpired ? "EXPIRED" : isUrgent ? "URGENT" : "ACTIVE"}
                </div>
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex flex-wrap items-start gap-6 justify-between mb-6">
                    <div className="flex-1 min-w-0">
                      <motion.div 
                        className="font-bold text-2xl text-emerald-900 mb-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        {p.donor.name}
                      </motion.div>
                      <motion.div 
                        className="text-emerald-700/80 mb-4 flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <svg viewBox="0 0 24 24" className="w-5 h-5">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="none" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        {p.donor.address}
                      </motion.div>
                      
                      {/* Food Items */}
                      <motion.div 
                        className="mb-4 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200/30"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-600">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" fill="none" stroke="currentColor" strokeWidth="2"/>
                            <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          <span className="font-semibold text-emerald-800">Food Items:</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {p.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                              <span className="text-emerald-700">{item.name} ({item.qty})</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                      
                      {/* Expiry Time */}
                      <motion.div 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold ${
                          isExpired 
                            ? "bg-red-100 text-red-800" 
                            : isUrgent 
                            ? "bg-amber-100 text-amber-800" 
                            : "bg-emerald-100 text-emerald-800"
                        }`}>
                          <svg viewBox="0 0 24 24" className="w-4 h-4">
                            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          {timeRemaining}
                        </div>
                        {isUrgent && (
                          <div className="px-3 py-1 bg-amber-200 text-amber-900 rounded-lg text-sm font-bold animate-pulse">
                            ⚡ RUSH
                          </div>
                        )}
                      </motion.div>
                    </div>
                    
                    {/* Action Buttons */}
                    <motion.div 
                      className="flex flex-col sm:flex-row items-center gap-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.6 }}
                    >
                      <motion.button
                        onClick={() => acceptPickup(p)}
                        disabled={isExpired}
                        className={`px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 ${
                          isExpired 
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                            : "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:shadow-emerald-500/25"
                        }`}
                        whileHover={!isExpired ? { scale: 1.05 } : {}}
                        whileTap={!isExpired ? { scale: 0.95 } : {}}
                      >
                        <svg viewBox="0 0 24 24" className="w-5 h-5">
                          <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Accept Pickup
                      </motion.button>
                      <motion.button
                        onClick={() => rejectPickup(p)}
                        className="px-8 py-4 rounded-2xl bg-white/80 backdrop-blur-sm text-rose-700 font-bold border border-rose-200/50 hover:bg-rose-50/80 hover:shadow-lg transition-all duration-300 flex items-center gap-3"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg viewBox="0 0 24 24" className="w-5 h-5">
                          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Reject
                      </motion.button>
                    </motion.div>
                  </div>
                  
                  {/* Maps Section */}
                  <motion.div 
                    className="grid lg:grid-cols-2 gap-6 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.7 }}
                  >
                    <div className="relative overflow-hidden rounded-2xl border border-emerald-200/50 shadow-sm">
                      <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-emerald-600 text-white text-sm font-semibold rounded-lg">
                        Pickup Location
                      </div>
                      <EmbedMap
                        lat={p.donor.lat}
                        lng={p.donor.lng}
                        label={`Donor: ${p.donor.name}`}
                      />
                    </div>
                    <div className="relative overflow-hidden rounded-2xl border border-emerald-200/50 shadow-sm">
                      <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-lg">
                        Delivery Location
                      </div>
                      <EmbedMap
                        lat={p.ngo.lat}
                        lng={p.ngo.lng}
                        label={`NGO: ${p.ngo.name}`}
                      />
                    </div>
                  </motion.div>
                  
                  {/* Route Link */}
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.8 }}
                  >
                    <motion.a
                      className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-50 text-emerald-700 rounded-2xl font-semibold hover:bg-emerald-100 transition-all duration-300 shadow-sm hover:shadow-md"
                      href={`https://www.google.com/maps/dir/?api=1&origin=${p.donor.lat},${p.donor.lng}&destination=${p.ngo.lat},${p.ngo.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg viewBox="0 0 24 24" className="w-5 h-5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      Open route in Google Maps
                      <svg viewBox="0 0 24 24" className="w-4 h-4">
                        <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
