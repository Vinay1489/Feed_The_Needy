import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../hooks/useSocket';
import { toast } from 'sonner';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'food_claimed':
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-600">
            <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'pickup_completed':
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-600">
            <path d="M3 7h13l5 5v5a2 2 0 0 1-2 2H3z" fill="none" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'delivery_assigned':
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-purple-600">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="none" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'urgent_request':
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-red-600">
            <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z" fill="none" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-600">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill="none" stroke="currentColor" strokeWidth="2"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0" fill="none" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'food_claimed':
        return 'bg-emerald-50 border-emerald-200';
      case 'pickup_completed':
        return 'bg-blue-50 border-blue-200';
      case 'delivery_assigned':
        return 'bg-purple-50 border-purple-200';
      case 'urgent_request':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now - time;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification._id);
    }
    
    // Handle notification-specific actions
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:bg-gray-50/80 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-700">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
        
        {/* Unread Count Badge */}
        {unreadCount > 0 && (
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.div>
        )}
      </motion.button>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 top-12 w-80 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 z-50 max-h-96 overflow-hidden"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200/50">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
                {unreadCount > 0 && (
                  <motion.button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Mark all read
                  </motion.button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <svg viewBox="0 0 24 24" className="w-12 h-12 mx-auto mb-3 text-gray-400">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" fill="none" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <p className="text-gray-500 text-sm">No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200/30">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification._id}
                      className={`p-4 hover:bg-gray-50/50 transition-colors duration-200 cursor-pointer ${
                        !notification.read ? 'bg-blue-50/30' : ''
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)}`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 mb-1">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              {formatTime(notification.createdAt)}
                            </span>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-200/50">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full text-sm text-gray-600 hover:text-gray-800 font-medium"
                >
                  View all notifications
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;
