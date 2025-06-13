import React from "react";

export default function QuickActions() {
  const actions = [
    { icon: "➕", label: "New Donation", color: "bg-blue-600" },
    { icon: "🗓️", label: "Schedule Pickup", color: "bg-green-600" },
    { icon: "📝", label: "Edit Profile", color: "bg-purple-600" },
    { icon: "🧾", label: "View History", color: "bg-orange-600" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <button
          key={index}
          className={`${action.color} hover:opacity-90 transition-opacity p-4 rounded-lg text-white flex flex-col items-center justify-center h-24`}
        >
          <span className="text-2xl mb-2">{action.icon}</span>
          <span className="text-sm font-medium">{action.label}</span>
        </button>
      ))}
    </div>
  );
}
