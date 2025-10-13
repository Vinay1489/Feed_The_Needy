import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  HandHeart,
  Truck,
  Package,
  FileBarChart,
  Settings,
  Bell,
} from "lucide-react";

const nav = [
  {
    to: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    emoji: "📊",
  },
  { to: "/admin/dashboard/users", label: "Users", icon: Users, emoji: "👥" },
  {
    to: "/admin/dashboard/donations",
    label: "Donations",
    icon: HandHeart,
    emoji: "🎁",
  },
  {
    to: "/admin/dashboard/volunteers",
    label: "Volunteers",
    icon: Truck,
    emoji: "🤝",
  },
  {
    to: "/admin/dashboard/inventory",
    label: "Inventory",
    icon: Package,
    emoji: "📦",
  },
  {
    to: "/admin/dashboard/reports",
    label: "Reports",
    icon: FileBarChart,
    emoji: "📝",
  },
  {
    to: "/admin/dashboard/notifications",
    label: "Notifications",
    icon: Bell,
    emoji: "🔔",
  },
  {
    to: "/admin/dashboard/settings",
    label: "Settings",
    icon: Settings,
    emoji: "⚙️",
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white/90 backdrop-blur border-r min-h-screen shadow-lg">
      {/* Logo */}
      <div className="px-6 py-5 border-b">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/90 grid place-items-center text-white font-bold text-lg">
            🍽️
          </div>
          <div>
            <div className="text-lg font-bold leading-tight text-slate-900">
              FoodCare
            </div>
            <div className="text-xs text-slate-500 -mt-1">Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/admin/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-all
               ${
                 isActive
                   ? "bg-primary text-black font-bold shadow-md"
                   : "text-slate-700 hover:bg-slate-100 hover:text-primary"
               }`
            }
          >
            <span className="text-lg">{item.emoji}</span>
            <item.icon className="w-4 h-4" />
            <span className="truncate">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Quick Tip */}
      <div className="p-4 border-t text-xs text-slate-500 italic">
        💡 Quick tip: Use filters on each page to manage data faster!
      </div>
    </aside>
  );
}
