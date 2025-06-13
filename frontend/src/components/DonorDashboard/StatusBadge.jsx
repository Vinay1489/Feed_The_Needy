import React from "react";

export default function StatusBadge({ status }) {
  const getStatusStyles = () => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case "picked-up":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300";
    }
  };

  const getStatusEmoji = () => {
    switch (status) {
      case "delivered":
        return "✅";
      case "picked-up":
        return "🚚";
      case "pending":
        return "⏳";
      default:
        return "❔";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)} {getStatusEmoji()}
    </span>
  );
}
