import React, { useState } from "react";
import { Search, Bell } from "lucide-react";
import { toast } from "sonner";

export default function Topbar() {
  const [q, setQ] = useState("");
  return (
    <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-3">
        <div className="flex items-center gap-2 lg:hidden">
          <div className="h-7 w-7 rounded bg-primary/90" />
          <span className="font-semibold">FoodCare Admin</span>
        </div>
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search users, donations, volunteers..."
              className="w-full h-9 pl-9 pr-3 rounded-md border bg-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          </div>
        </div>
        <button
          onClick={() => toast.success("Notifications sent to volunteers")}
          className="hidden sm:inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
        >
          <Bell className="h-4 w-4" /> Notify Volunteers
        </button>
        <button
          className="ml-2 h-9 w-9 inline-flex items-center justify-center rounded-full border hover:bg-slate-100"
          onClick={() => toast("No new alerts")}
        >
          <Bell className="h-4 w-4" />
        </button>
        <div className="ml-1 h-8 w-8 rounded-full bg-gradient-to-br from-primary to-emerald-500" />
      </div>
    </header>
  );
}
