import React, { useMemo, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense } from "react";
import FullPageAnimation from "../../fallbacks/FullPageAnimation";
import PageTransition from "../PageTransition";
import NotificationCenter from "../NotificationCenter";
const nav = [
  {
    to: "/volunteerlogin/dashboard",
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path
          d="M3 12l9-9 9 9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M9 21V9h6v12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    to: "/volunteerlogin/dashboard/pickups",
    label: "Pickups",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path
          d="M3 7h13l5 5v5a2 2 0 0 1-2 2H3z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="7.5" cy="19.5" r="1.5" />
        <circle cx="18.5" cy="19.5" r="1.5" />
      </svg>
    ),
  },
  {
    to: "/volunteerlogin/dashboard/deliveries",
    label: "Deliveries",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path
          d="M4 4h16v6H4zM10 14h10v6H10zM4 14h4v6H4z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    to: "/volunteerlogin/dashboard/calendar",
    label: "Calendar",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <rect
          x="3"
          y="4"
          width="18"
          height="18"
          rx="2"
          ry="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    to: "/volunteerlogin/dashboard/profile",
    label: "Profile",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <circle cx="12" cy="7" r="4" />
        <path
          d="M4 21a8 8 0 0 1 16 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    to: "/volunteerlogin/dashboard/support",
    label: "Support",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path
          d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
];

export default function Layout({ children }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const email = useMemo(
    () => window.__APP_USER_EMAIL__ || "nohijo1720@movfull.com",
    []
  );
  const name = useMemo(
    () =>
      (email?.split("@")[0] || "Volunteer").replace(/\W/g, " ").trim() ||
      "Volunteer",
    [email]
  );

  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", damping: 25, stiffness: 200 } },
    closed: { x: "-100%", transition: { type: "spring", damping: 25, stiffness: 200 } }
  };

  const navItemVariants = {
    hover: { 
      scale: 1.02, 
      x: 4,
      transition: { type: "spring", damping: 15, stiffness: 300 }
    },
    tap: { scale: 0.98 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100/30 text-gray-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="flex relative">
        {/* Mobile overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <motion.aside
          variants={sidebarVariants}
          initial="closed"
          animate={sidebarOpen ? "open" : "closed"}
          className={`fixed md:relative md:flex md:w-72 flex-col gap-6 p-6 border-r border-emerald-200/50 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 shadow-xl md:shadow-none z-50 md:z-auto h-full md:h-auto ${
            sidebarOpen ? "flex" : "hidden md:flex"
          }`}
        >
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <motion.div 
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-500 text-white grid place-content-center font-bold shadow-lg group-hover:shadow-emerald-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                FR
              </motion.div>
              <div>
                <div className="text-emerald-800 font-bold text-lg leading-tight">
                  FoodRescue
                </div>
                <div className="text-xs text-emerald-600/80 font-medium">
                  Volunteer Console
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Navigation */}
          <nav className="flex-1">
            <motion.ul 
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {nav.map((n, index) => {
                const active = location.pathname === n.to;
                return (
                  <motion.li 
                    key={n.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <motion.div
                      variants={navItemVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Link
                        to={n.to}
                        className={`group flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300 relative overflow-hidden ${
                          active
                            ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                            : "hover:bg-emerald-50/80 hover:shadow-md hover:shadow-emerald-500/10"
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        {active && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl"
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                          />
                        )}
                        <span className={`relative z-10 transition-colors duration-300 ${
                          active ? "text-white" : "text-emerald-700/90 group-hover:text-emerald-700"
                        }`}>
                          {n.icon}
                        </span>
                        <span className={`relative z-10 font-semibold transition-colors duration-300 ${
                          active ? "text-white" : "text-emerald-900 group-hover:text-emerald-800"
                        }`}>
                          {n.label}
                        </span>
                      </Link>
                    </motion.div>
                  </motion.li>
                );
              })}
            </motion.ul>
          </nav>

          {/* User Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-400 text-white shadow-xl shadow-emerald-500/25 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="relative z-10">
              <p className="text-xs opacity-90 font-medium mb-1">Logged in as</p>
              <p className="font-bold text-lg">{name}</p>
              <p className="text-xs opacity-80 truncate">{email}</p>
            </div>
          </motion.div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Header */}
          <motion.header 
            className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 border-b border-emerald-200/50 shadow-sm"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.button 
                  className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 shadow-sm transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSidebarOpen(true)}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path
                      d="M4 6h16M4 12h16M4 18h16"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </motion.button>
                <motion.h1 
                  className="text-xl font-bold text-emerald-900 bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Volunteer Dashboard
                </motion.h1>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Notifications */}
                <NotificationCenter />

                {/* User Profile */}
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.img
                    src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${encodeURIComponent(name)}`}
                    alt="avatar"
                    className="w-11 h-11 rounded-xl ring-2 ring-emerald-200 shadow-sm"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", damping: 15, stiffness: 300 }}
                  />
                  <div className="hidden sm:block">
                    <div className="text-sm font-bold leading-tight text-emerald-900">
                      {name}
                    </div>
                    <div className="text-xs text-emerald-600/80 leading-tight font-medium">
                      Volunteer
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.header>

          {/* Page Content */}
          <motion.div 
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
