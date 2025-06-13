import React from "react";
import DashboardCard from "./DashboardCard";

export default function NotificationsPanel() {
  const notifications = [
    {
      type: "success",
      message: "Thank you for your recent donation!",
      time: "2 hours ago",
    },
    {
      type: "info",
      message: "Your pickup is scheduled for tomorrow at 2 PM",
      time: "5 hours ago",
    },
  ];

  return (
    <DashboardCard>
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
        Notifications
      </h2>
      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              notification.type === "success"
                ? "bg-green-50 dark:bg-green-900/20"
                : "bg-blue-50 dark:bg-blue-900/20"
            }`}
          >
            <p
              className={`text-sm ${
                notification.type === "success"
                  ? "text-green-700 dark:text-green-300"
                  : "text-blue-700 dark:text-blue-300"
              }`}
            >
              {notification.message}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              {notification.time}
            </p>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
