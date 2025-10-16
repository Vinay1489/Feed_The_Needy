import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import PageTransition from "../PageTransition";

export default function Support() {
  const [type, setType] = React.useState("Pickup issue");
  const [desc, setDesc] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const issueTypes = [
    { value: "Pickup issue", label: "Pickup Issue", icon: "🚛", color: "emerald" },
    { value: "Delivery issue", label: "Delivery Issue", icon: "📦", color: "blue" },
    { value: "App problem", label: "App Problem", icon: "📱", color: "purple" },
    { value: "Emergency", label: "Emergency", icon: "🚨", color: "red" },
  ];

  const guidelines = [
    {
      icon: "🍽️",
      title: "Food Safety",
      description: "Follow food safety protocols and respect expiry windows.",
      color: "emerald"
    },
    {
      icon: "🧊",
      title: "Temperature Control",
      description: "Use insulated containers for perishables.",
      color: "blue"
    },
    {
      icon: "✅",
      title: "Verification",
      description: "Verify NGO receipt via OTP at delivery.",
      color: "purple"
    },
    {
      icon: "🆘",
      title: "Emergency Protocol",
      description: "In emergencies, contact the coordinator immediately.",
      color: "red"
    },
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!desc.trim()) {
      newErrors.desc = "Please describe the issue";
    } else if (desc.trim().length < 10) {
      newErrors.desc = "Please provide more details (at least 10 characters)";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors below");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Issue reported successfully! Our team will reach out within 24 hours.");
    setDesc("");
      setType("Pickup issue");
      setErrors({});
    } catch (error) {
      toast.error("Failed to submit issue. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTypeColor = (typeValue) => {
    const type = issueTypes.find(t => t.value === typeValue);
    return type ? type.color : "emerald";
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
            className="text-4xl font-bold bg-gradient-to-r from-rose-800 via-rose-700 to-rose-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Support & Help Center
          </motion.h1>
          <motion.p 
            className="text-rose-700/80 text-lg font-medium max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Get help when you need it. Report issues, ask questions, or contact us for assistance.
          </motion.p>
        </motion.header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Support Form */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.form
              onSubmit={submit}
              className="bg-white/80 backdrop-blur-sm border border-rose-200/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ y: -2 }}
            >
              <motion.h2 
                className="text-2xl font-bold text-rose-900 mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                Report an Issue
              </motion.h2>
              
              {/* Issue Type Selection */}
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-sm font-semibold text-rose-900 mb-4">
                  Issue Type <span className="text-red-500">*</span>
              </label>
                <div className="grid grid-cols-2 gap-3">
                  {issueTypes.map((issueType, index) => (
                    <motion.button
                      key={issueType.value}
                      type="button"
                      onClick={() => setType(issueType.value)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 flex items-center gap-3 ${
                        type === issueType.value
                          ? `border-${issueType.color}-500 bg-${issueType.color}-50 shadow-lg`
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-2xl">{issueType.icon}</span>
                      <span className={`font-semibold ${
                        type === issueType.value ? `text-${issueType.color}-900` : "text-gray-700"
                      }`}>
                        {issueType.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Description */}
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <label className="block text-sm font-semibold text-rose-900 mb-2">
                  Description <span className="text-red-500">*</span>
              </label>
                <motion.textarea
                value={desc}
                  onChange={(e) => {
                    setDesc(e.target.value);
                    if (errors.desc) {
                      setErrors({ ...errors, desc: "" });
                    }
                  }}
                rows={6}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                    errors.desc
                      ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20"
                      : "border-rose-200 bg-white focus:border-rose-500 focus:ring-rose-500/20"
                  } focus:ring-4 focus:outline-none resize-none`}
                  placeholder="Describe what happened, include any details that can help us assist you better..."
                  whileFocus={{ scale: 1.01 }}
                />
                <AnimatePresence>
                  {errors.desc && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="mt-2 flex items-center gap-2 text-red-600 text-sm"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4">
                        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      {errors.desc}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-rose-200/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 ${
                    isSubmitting
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-rose-600 to-rose-500 text-white hover:shadow-rose-500/25"
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" className="w-5 h-5">
                        <path d="M12 19l7-7 3 3-7 7-3-3z" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <path d="M2 2l7.586 7.586" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="11" cy="11" r="2" fill="none" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      Submit Issue
                    </>
                  )}
                </motion.button>
                
                <motion.a
                href="tel:+18001234567"
                  className="px-8 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-red-500/25 transition-all duration-300 flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
              >
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                Emergency Call
                </motion.a>
              </motion.div>
            </motion.form>
          </motion.div>

          {/* Guidelines Sidebar */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <motion.header
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-rose-900">Volunteer Guidelines</h2>
              <p className="text-rose-700/80">
                Important guidelines to follow during your volunteer work.
              </p>
            </motion.header>

            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {guidelines.map((guideline, index) => (
                <motion.div
                  key={guideline.title}
                  className={`p-6 bg-white/80 backdrop-blur-sm border border-${guideline.color}-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -2, scale: 1.02 }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className={`w-12 h-12 rounded-xl bg-${guideline.color}-100 flex items-center justify-center text-2xl`}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 0.6, type: "spring", damping: 15 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {guideline.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg mb-2 text-${guideline.color}-900`}>
                        {guideline.title}
                      </h3>
                      <p className={`text-sm text-${guideline.color}-700/80`}>
                        {guideline.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              className="p-6 bg-gradient-to-br from-rose-500 to-rose-600 text-white rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <motion.a
                  href="mailto:support@foodrescue.com"
                  className="flex items-center gap-3 p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span className="text-sm font-medium">Email Support</span>
                </motion.a>
                <motion.a
                  href="tel:+18001234567"
                  className="flex items-center gap-3 p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span className="text-sm font-medium">Call Support</span>
                </motion.a>
            </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
