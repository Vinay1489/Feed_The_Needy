import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppState } from "../../AppState";
import MiniCalendar from "../../mini-components/MiniCalendar";
import PageTransition from "../PageTransition";

export default function Calendar() {
  const { pendingPickups, deliveries } = useAppState();
  const upcoming = [
    ...pendingPickups.map((p) => ({
      id: p.id,
      when: p.expiry,
      label: `Pickup: ${p.donor.name}`,
      type: "pickup",
      urgent: new Date(p.expiry) - new Date() < 3600000, // Less than 1 hour
      expired: new Date(p.expiry) - new Date() < 0,
    })),
    ...deliveries
      .filter((d) => d.status !== "Delivered")
      .map((d) => ({
        id: d.id,
        when: new Date().toISOString(),
        label: `Deliver: ${d.route.ngo.name}`,
        type: "delivery",
        urgent: false,
        expired: false,
        status: d.status,
      })),
  ].sort((a, b) => new Date(a.when) - new Date(b.when));

  const getEventIcon = (type, urgent, expired, status) => {
    if (expired) {
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-red-600">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2"/>
        </svg>
      );
    }
    
    if (urgent) {
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-600">
          <path d="M12 9v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
      );
    }
    
    if (type === "pickup") {
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-600">
          <path d="M3 7h13l5 5v5a2 2 0 0 1-2 2H3z" fill="none" stroke="currentColor" strokeWidth="2"/>
          <circle cx="7.5" cy="19.5" r="1.5"/>
          <circle cx="18.5" cy="19.5" r="1.5"/>
        </svg>
      );
    }
    
    if (type === "delivery") {
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-600">
          <path d="M4 4h16v6H4zM10 14h10v6H10zM4 14h4v6H4z" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
      );
    }
    
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-600">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
      </svg>
    );
  };

  const getEventColor = (type, urgent, expired) => {
    if (expired) return "red";
    if (urgent) return "amber";
    if (type === "pickup") return "emerald";
    if (type === "delivery") return "blue";
    return "gray";
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = date - now;
    
    if (diff < 0) return "Overdue";
    if (diff < 3600000) return "Within 1 hour";
    if (diff < 86400000) return "Today";
    if (diff < 172800000) return "Tomorrow";
    
    return date.toLocaleDateString();
  };

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
            className="text-4xl font-bold bg-gradient-to-r from-purple-800 via-purple-700 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Schedule & Calendar
          </motion.h1>
          <motion.p 
            className="text-purple-700/80 text-lg font-medium max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Manage your volunteer schedule and track upcoming pickups and deliveries.
          </motion.p>
        </motion.header>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.div 
            className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl shadow-lg"
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Events</p>
                <p className="text-3xl font-bold">{upcoming.length}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/>
                </svg>
          </div>
        </div>
          </motion.div>
          
          <motion.div 
            className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-2xl shadow-lg"
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Pickups</p>
                <p className="text-3xl font-bold">{upcoming.filter(e => e.type === "pickup").length}</p>
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
                <p className="text-blue-100 text-sm font-medium">Deliveries</p>
                <p className="text-3xl font-bold">{upcoming.filter(e => e.type === "delivery").length}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
                  <path d="M4 4h16v6H4zM10 14h10v6H10zM4 14h4v6H4z" fill="none" stroke="currentColor" strokeWidth="2"/>
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
                <p className="text-3xl font-bold">{upcoming.filter(e => e.urgent).length}</p>
                </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
                  <path d="M12 9v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <motion.header
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-purple-900">Calendar View</h2>
              <p className="text-purple-700/80">
                Visual overview of your upcoming tasks and events.
              </p>
            </motion.header>
            
            <motion.div 
              className="bg-white/80 backdrop-blur-sm border border-purple-200/50 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              whileHover={{ y: -2 }}
            >
              <MiniCalendar tasks={pendingPickups} />
            </motion.div>
          </motion.div>

          {/* Upcoming Events Sidebar */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.header
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h2 className="text-2xl font-bold text-purple-900">Upcoming Events</h2>
              <p className="text-purple-700/80">
                Your schedule for the coming days.
              </p>
            </motion.header>

            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <AnimatePresence>
                {upcoming.length === 0 && (
                  <motion.div 
                    className="p-8 text-center bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl border border-purple-200/50"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-8 h-8 text-purple-600">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <p className="text-purple-800/80 font-medium">No events scheduled</p>
                    <p className="text-purple-600/60 text-sm mt-1">Check back for new opportunities</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {upcoming.map((event, index) => {
                const color = getEventColor(event.type, event.urgent, event.expired);
                const icon = getEventIcon(event.type, event.urgent, event.expired, event.status);
                
                return (
                  <motion.div
                    key={event.id}
                    className={`group relative p-6 bg-white/80 backdrop-blur-sm border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                      event.expired 
                        ? "border-red-200/50 hover:shadow-red-500/10" 
                        : event.urgent 
                        ? "border-amber-200/50 hover:shadow-amber-500/10 animate-pulse" 
                        : `border-${color}-200/50 hover:shadow-${color}-500/10`
                    }`}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      delay: index * 0.1 + 0.9, 
                      duration: 0.5, 
                      type: "spring", 
                      damping: 20 
                    }}
                    whileHover={{ y: -3, scale: 1.02 }}
                  >
                    {/* Background gradient */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      event.expired 
                        ? "bg-gradient-to-br from-red-50/30 to-transparent" 
                        : event.urgent 
                        ? "bg-gradient-to-br from-amber-50/30 to-transparent" 
                        : `bg-gradient-to-br from-${color}-50/30 to-transparent`
                    }`}></div>
                    
                    {/* Status indicator */}
                    <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold ${
                      event.expired 
                        ? "bg-red-100 text-red-800" 
                        : event.urgent 
                        ? "bg-amber-100 text-amber-800 animate-pulse" 
                        : `bg-${color}-100 text-${color}-800`
                    }`}>
                      {event.expired ? "OVERDUE" : event.urgent ? "URGENT" : event.type.toUpperCase()}
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start gap-4">
                        <motion.div 
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            event.expired 
                              ? "bg-red-100 text-red-600" 
                              : event.urgent 
                              ? "bg-amber-100 text-amber-600" 
                              : `bg-${color}-100 text-${color}-600`
                          }`}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.1 + 1.0, duration: 0.6, type: "spring", damping: 15 }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {icon}
                        </motion.div>
                        
                        <div className="flex-1 min-w-0">
                          <motion.h3 
                            className={`font-bold text-lg mb-1 ${
                              event.expired 
                                ? "text-red-900" 
                                : event.urgent 
                                ? "text-amber-900" 
                                : `text-${color}-900`
                            }`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 1.1 }}
                          >
                            {event.label}
                          </motion.h3>
                          
                          <motion.div 
                            className={`text-sm mb-2 ${
                              event.expired 
                                ? "text-red-600" 
                                : event.urgent 
                                ? "text-amber-600" 
                                : `text-${color}-600`
                            }`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 1.2 }}
                          >
                            {new Date(event.when).toLocaleString()}
                          </motion.div>
                          
                          <motion.div 
                            className={`flex items-center gap-2 text-xs font-medium ${
                              event.expired 
                                ? "text-red-700" 
                                : event.urgent 
                                ? "text-amber-700" 
                                : `text-${color}-700`
                            }`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 1.3 }}
                          >
                            <svg viewBox="0 0 24 24" className="w-4 h-4">
                              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                            {formatTime(event.when)}
                          </motion.div>
                          
                          {event.status && (
                            <motion.div 
                              className="mt-2"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + 1.4 }}
                            >
                              <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                                event.status === "Picked Up" 
                                  ? "bg-blue-100 text-blue-800"
                                  : event.status === "In Transit"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-emerald-100 text-emerald-800"
                              }`}>
                                {event.status}
                              </span>
                            </motion.div>
                          )}
                        </div>
                      </div>
          </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
