import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppState } from "../../AppState";
import { toast } from "sonner";
import PageTransition from "../PageTransition";

export default function Profile() {
  const { profile, setProfile } = useAppState();
  const [form, setForm] = React.useState(profile);
  const [isSaving, setIsSaving] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name?.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!form.phone?.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(form.phone.replace(/[\s\-\(\)]/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (!form.serviceArea?.trim()) {
      newErrors.serviceArea = "Service area is required";
    }
    
    if (!form.vehicle?.trim()) {
      newErrors.vehicle = "Vehicle information is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const save = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors below");
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfile(form);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const getLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case "bronze": return "from-amber-600 to-amber-500";
      case "silver": return "from-gray-600 to-gray-500";
      case "gold": return "from-yellow-600 to-yellow-500";
      case "platinum": return "from-purple-600 to-purple-500";
      default: return "from-emerald-600 to-emerald-500";
    }
  };

  const getLevelIcon = (level) => {
    switch (level?.toLowerCase()) {
      case "bronze": return "🥉";
      case "silver": return "🥈";
      case "gold": return "🥇";
      case "platinum": return "💎";
      default: return "⭐";
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
            className="text-4xl font-bold bg-gradient-to-r from-indigo-800 via-indigo-700 to-indigo-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Profile Management
          </motion.h1>
          <motion.p 
            className="text-indigo-700/80 text-lg font-medium max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Manage your volunteer profile and keep your information up to date.
          </motion.p>
        </motion.header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Form */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.form
              onSubmit={save}
              className="bg-white/80 backdrop-blur-sm border border-indigo-200/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ y: -2 }}
            >
              <motion.h2 
                className="text-2xl font-bold text-indigo-900 mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                Personal Information
              </motion.h2>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { name: "name", label: "Full Name", type: "text", required: true },
                  { name: "email", label: "Email Address", type: "email", required: true, readOnly: true },
                  { name: "phone", label: "Phone Number", type: "tel", required: true },
                  { name: "serviceArea", label: "Service Area", type: "text", required: true },
                  { name: "vehicle", label: "Vehicle Type", type: "text", required: true },
                ].map((field, index) => (
                  <motion.div
                    key={field.name}
                    className={field.name === "email" ? "sm:col-span-2" : ""}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <label className="block text-sm font-semibold text-indigo-900 mb-2">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", damping: 15 }}
                    >
                      <input
                        name={field.name}
                        type={field.type}
                        value={form[field.name] || ""}
                        onChange={onChange}
                        readOnly={field.readOnly}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                          errors[field.name]
                            ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20"
                            : field.readOnly
                            ? "border-gray-300 bg-gray-100/50 text-gray-600"
                            : "border-indigo-200 bg-white focus:border-indigo-500 focus:ring-indigo-500/20"
                        } focus:ring-4 focus:outline-none`}
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                      />
                    </motion.div>
                    <AnimatePresence>
                      {errors[field.name] && (
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
                          {errors[field.name]}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="flex flex-col sm:flex-row items-center gap-4 pt-6 mt-6 border-t border-indigo-200/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <motion.button
                  type="submit"
                  disabled={isSaving}
                  className={`px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 ${
                    isSaving
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:shadow-indigo-500/25"
                  }`}
                  whileHover={!isSaving ? { scale: 1.05 } : {}}
                  whileTap={!isSaving ? { scale: 0.95 } : {}}
                >
                  {isSaving ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" className="w-5 h-5">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <polyline points="17,21 17,13 7,13 7,21" stroke="currentColor" strokeWidth="2"/>
                        <polyline points="7,3 7,8 15,8" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      Save Changes
                    </>
                  )}
                </motion.button>
                
                <motion.a
                  href="/"
                  className="px-8 py-3 rounded-2xl bg-white/80 backdrop-blur-sm text-indigo-700 font-semibold border border-indigo-200/50 hover:bg-indigo-50/80 hover:shadow-lg transition-all duration-300 flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M3 12l9-9 9 9" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9 21V9h6v12" fill="none" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Back to Dashboard
                </motion.a>
              </motion.div>
            </motion.form>
          </motion.div>

          {/* Profile Stats Sidebar */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {/* Volunteer Level Card */}
            <motion.div 
              className={`p-6 rounded-3xl bg-gradient-to-br ${getLevelColor(profile.level)} text-white shadow-xl`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm opacity-90 font-medium">Volunteer Level</div>
                  <div className="text-3xl font-bold">{getLevelIcon(profile.level)} {profile.level}</div>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16 10a4 4 0 0 1-8 0" fill="none" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              <div className="text-sm opacity-95">
                Rating: <span className="font-bold text-lg">{profile.rating}★</span>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.div 
                className="p-6 bg-white/80 backdrop-blur-sm border border-indigo-200/50 rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-indigo-600 font-medium">Total Deliveries</div>
                    <div className="text-2xl font-bold text-indigo-900">42</div>
                  </div>
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-600">
                      <path d="M4 4h16v6H4zM10 14h10v6H10zM4 14h4v6H4z" fill="none" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="p-6 bg-white/80 backdrop-blur-sm border border-emerald-200/50 rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-emerald-600 font-medium">Distance Covered</div>
                    <div className="text-2xl font-bold text-emerald-900">126 km</div>
                  </div>
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-600">
                      <path d="M3 12l9-9 9 9" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <path d="M9 21V9h6v12" fill="none" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="p-6 bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-amber-600 font-medium">Hours Volunteered</div>
                    <div className="text-2xl font-bold text-amber-900">156 hrs</div>
                  </div>
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-600">
                      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
