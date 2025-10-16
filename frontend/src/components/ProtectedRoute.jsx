import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
          <p className="text-emerald-700 font-medium">Loading...</p>
        </motion.div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50/30 flex items-center justify-center">
        <motion.div
          className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-red-200/50 max-w-md mx-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-red-600">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="none" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-red-800 mb-2">Access Denied</h2>
          <p className="text-red-600 mb-4">
            You don't have permission to access this page. This page is restricted to {requiredRole}s only.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors duration-300"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;