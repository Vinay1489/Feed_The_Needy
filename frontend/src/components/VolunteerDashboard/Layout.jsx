import React, { useMemo } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense } from "react";
import FullPageAnimation from "../../fallbacks/FullPageAnimation";
import PageTransition from "../PageTransition";
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white text-gray-900">
      <div className="flex">
        <aside className="hidden md:flex md:w-64 flex-col gap-4 p-4 border-r border-emerald-100/60 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
          <Link to="/" className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white grid place-content-center font-bold">
              FR
            </div>
            <div>
              <div className="text-emerald-700 font-semibold leading-tight">
                FoodRescue
              </div>
              <div className="text-xs text-emerald-900/60">
                Volunteer Console
              </div>
            </div>
          </Link>
          <nav className="flex-1">
            <ul className="space-y-1">
              {nav.map((n) => {
                const active = location.pathname === n.to;
                return (
                  <li key={n.to}>
                    <Link
                      to={n.to}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition ${
                        active
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "hover:bg-emerald-50"
                      }`}
                    >
                      <span className="text-emerald-700/90 [&>svg]:fill-current [&>svg]:text-current">
                        {n.icon}
                      </span>
                      <span className="font-medium">{n.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-auto p-3 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-500 text-white">
            <p className="text-xs opacity-90">Logged in as</p>
            <p className="font-semibold">{name}</p>
            <p className="text-xs opacity-80 truncate">{email}</p>
          </div>
        </aside>
        <main className="flex-1 min-w-0">
          <header className="sticky top-0 z-30 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-emerald-100/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700">
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path
                      d="M4 6h16M4 12h16M4 18h16"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
                <h1 className="text-lg font-semibold text-emerald-900">
                  Volunteer Dashboard
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 m-auto mt-2">
                    <path
                      d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14V11a6 6 0 1 0-12 0v3a2 2 0 0 1-.6 1.4L4 17h5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
                <div className="flex items-center gap-3">
                  <img
                    src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${encodeURIComponent(
                      name
                    )}`}
                    alt="avatar"
                    className="w-10 h-10 rounded-xl ring-2 ring-emerald-100"
                  />
                  <div className="hidden sm:block">
                    <div className="text-sm font-semibold leading-tight">
                      {name}
                    </div>
                    <div className="text-xs text-emerald-800/70 leading-tight">
                      Volunteer
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
