import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[260px_1fr] bg-gradient-to-br from-slate-50 to-white text-slate-800">
      <Sidebar />
      <div className="flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          <Outlet/>
        </main>
        <footer className="border-t bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-slate-500 flex items-center justify-between">
            <span>© {new Date().getFullYear()} FoodCare Admin</span>
            <span className="hidden sm:block">
              Built for donors, volunteers, and communities
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
