import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppState } from "../../AppState";
import Steps from "../../mini-components/Steps";
import OTPModal from "../../mini-components/OTPModal";
import PageTransition from "../PageTransition";

export default function Deliveries() {
  const { deliveries, advanceDelivery, confirmOtp } = useAppState();
  const [otpTarget, setOtpTarget] = React.useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "Picked Up": return "blue";
      case "In Transit": return "amber";
      case "Delivered": return "emerald";
      default: return "gray";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Picked Up":
        return (
          <svg viewBox="0 0 24 24" className="w-6 h-6">
            <path d="M3 7h13l5 5v5a2 2 0 0 1-2 2H3z" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="7.5" cy="19.5" r="1.5"/>
            <circle cx="18.5" cy="19.5" r="1.5"/>
          </svg>
        );
      case "In Transit":
        return (
          <svg viewBox="0 0 24 24" className="w-6 h-6">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" fill="none" stroke="currentColor" strokeWidth="2"/>
            <polyline points="3.27,6.96 12,12.01 20.73,6.96" stroke="currentColor" strokeWidth="2"/>
            <line x1="12" y1="22.08" x2="12" y2="12" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case "Delivered":
        return (
          <svg viewBox="0 0 24 24" className="w-6 h-6">
            <path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h18z" fill="none" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" className="w-6 h-6">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
    }
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
            className="text-4xl font-bold bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Ongoing Deliveries
          </motion.h1>
          <motion.p 
            className="text-blue-700/80 text-lg font-medium max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Track items in transit and complete deliveries with NGO confirmation to ensure successful food distribution.
          </motion.p>
        </motion.header>

        {/* Stats Summary */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.div 
            className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg"
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Deliveries</p>
                <p className="text-3xl font-bold">{deliveries.length}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
                  <path d="M4 4h16v6H4zM10 14h10v6H10zM4 14h4v6H4z" fill="none" stroke="currentColor" strokeWidth="2"/>
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
                <p className="text-emerald-100 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold">{deliveries.filter(d => d.status === "Delivered").length}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
                  <path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h18z" fill="none" stroke="currentColor" strokeWidth="2"/>
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
                <p className="text-amber-100 text-sm font-medium">In Transit</p>
                <p className="text-3xl font-bold">{deliveries.filter(d => d.status === "In Transit").length}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="3.27,6.96 12,12.01 20.73,6.96" stroke="currentColor" strokeWidth="2"/>
                  <line x1="12" y1="22.08" x2="12" y2="12" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl shadow-lg"
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Picked Up</p>
                <p className="text-3xl font-bold">{deliveries.filter(d => d.status === "Picked Up").length}</p>
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
        </motion.div>

        {/* Delivery Cards */}
        <div className="space-y-6">
          <AnimatePresence>
            {deliveries.length === 0 && (
              <motion.div 
                className="p-12 text-center bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-3xl border border-blue-200/50"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.6, type: "spring", damping: 15 }}
                >
                  <svg viewBox="0 0 24 24" className="w-12 h-12 text-blue-600">
                    <path d="M4 4h16v6H4zM10 14h10v6H10zM4 14h4v6H4z" fill="none" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </motion.div>
                <motion.h3 
                  className="text-2xl font-bold text-blue-800 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  No Deliveries in Progress
                </motion.h3>
                <motion.p 
                  className="text-blue-600/80 text-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Complete your pickups to start new deliveries!
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
          
          {deliveries.map((d, index) => {
            const statusColor = getStatusColor(d.status);
            const isCompleted = d.status === "Delivered";
            
            return (
              <motion.div
              key={d.id}
                className={`group relative p-8 bg-white/80 backdrop-blur-sm border rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isCompleted 
                    ? "border-emerald-200/50 hover:shadow-emerald-500/10" 
                    : `border-${statusColor}-200/50 hover:shadow-${statusColor}-500/10`
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
                  isCompleted 
                    ? "bg-gradient-to-br from-emerald-50/30 to-transparent" 
                    : `bg-gradient-to-br from-${statusColor}-50/30 to-transparent`
                }`}></div>
                
                {/* Status indicator */}
                <div className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${
                  isCompleted 
                    ? "bg-emerald-100 text-emerald-800" 
                    : `bg-${statusColor}-100 text-${statusColor}-800`
                }`}>
                  {getStatusIcon(d.status)}
                  {d.status.toUpperCase()}
                </div>
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex flex-wrap items-start gap-6 justify-between mb-6">
                    <div className="flex-1 min-w-0">
                      <motion.div 
                        className="font-bold text-2xl text-blue-900 mb-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                    {d.route.donor.name} → {d.route.ngo.name}
                      </motion.div>
                      
                      {/* OTP Display */}
                      <motion.div 
                        className="mb-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-200/30"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <div className="flex items-center gap-3">
                          <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-600">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="12" cy="16" r="1" fill="none" stroke="currentColor" strokeWidth="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" fill="none" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          <span className="font-semibold text-blue-800">Delivery OTP:</span>
                          <span className="font-mono bg-blue-100 px-4 py-2 rounded-xl text-blue-900 font-bold text-lg tracking-wider">
                      {d.otp}
                    </span>
                  </div>
                      </motion.div>
                      
                      {/* Progress Steps */}
                      <motion.div
                        className="mb-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                      >
                  <Steps status={d.status} />
                      </motion.div>
                      
                      {/* Delivery Info */}
                      <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        <div className="p-3 bg-blue-50/30 rounded-xl border border-blue-200/20">
                          <div className="text-sm text-blue-600 font-medium">From</div>
                          <div className="font-semibold text-blue-900">{d.route.donor.name}</div>
                          <div className="text-sm text-blue-700/80">{d.route.donor.address}</div>
                        </div>
                        <div className="p-3 bg-emerald-50/30 rounded-xl border border-emerald-200/20">
                          <div className="text-sm text-emerald-600 font-medium">To</div>
                          <div className="font-semibold text-emerald-900">{d.route.ngo.name}</div>
                          <div className="text-sm text-emerald-700/80">{d.route.ngo.address}</div>
                        </div>
                      </motion.div>
                </div>
                    
                    {/* Action Buttons */}
                    <motion.div 
                      className="flex flex-col gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.6 }}
                    >
                      {!isCompleted && (
                        <motion.button
                          onClick={() => advanceDelivery(d)}
                          className={`px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 ${
                            statusColor === "blue"
                              ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-blue-500/25"
                              : statusColor === "amber"
                              ? "bg-gradient-to-r from-amber-600 to-amber-500 text-white hover:shadow-amber-500/25"
                              : "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:shadow-emerald-500/25"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg viewBox="0 0 24 24" className="w-5 h-5">
                            <path d="M9 18l6-6-6-6" fill="none" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                      Update Status
                        </motion.button>
                  )}
                      
                      {!isCompleted && (
                        <motion.button
                      onClick={() => setOtpTarget(d)}
                          className="px-8 py-4 rounded-2xl bg-white/80 backdrop-blur-sm text-blue-700 font-bold border border-blue-200/50 hover:bg-blue-50/80 hover:shadow-lg transition-all duration-300 flex items-center gap-3"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg viewBox="0 0 24 24" className="w-5 h-5">
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" fill="none" stroke="currentColor" strokeWidth="2"/>
                            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" fill="none" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          NGO Confirmation
                        </motion.button>
                      )}
                      
                      {isCompleted && (
                        <motion.div 
                          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold flex items-center gap-3"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.7, type: "spring", damping: 15 }}
                        >
                          <svg viewBox="0 0 24 24" className="w-5 h-5">
                            <path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          Delivery Complete
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                  
                  {/* Progress Bar */}
                  {!isCompleted && (
                    <motion.div 
                      className="mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.7 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-700">Delivery Progress</span>
                        <span className="text-sm text-blue-600">
                          {d.status === "Picked Up" ? "25%" : d.status === "In Transit" ? "75%" : "0%"}
                        </span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-3">
                        <motion.div 
                          className={`h-3 rounded-full ${
                            statusColor === "blue" ? "bg-blue-500" : "bg-amber-500"
                          }`}
                          initial={{ width: 0 }}
                          animate={{ 
                            width: d.status === "Picked Up" ? "25%" : d.status === "In Transit" ? "75%" : "0%" 
                          }}
                          transition={{ delay: index * 0.1 + 0.8, duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* OTP Modal */}
        {otpTarget && (
          <OTPModal
            expected={otpTarget.otp}
            onClose={() => setOtpTarget(null)}
            onConfirm={(code) => confirmOtp(otpTarget.id, code)}
          />
        )}
      </div>
    </PageTransition>
  );
}
