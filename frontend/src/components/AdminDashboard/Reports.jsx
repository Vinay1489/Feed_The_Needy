import React from "react";
import {
  donationsSeed,
  usersSeed,
  volunteersSeed,
  inventorySeed,
} from "../../data";
import { exportToCSV, printHtml } from "../../exporter";
import { toast } from "sonner";

export default function Reports() {
  function exportAllCSV() {
    exportToCSV("donations", donationsSeed);
    exportToCSV("users", usersSeed);
    exportToCSV("volunteers", volunteersSeed);
    exportToCSV("inventory", inventorySeed);
    toast.success("All data exported as CSV files");
  }

  function auditReport() {
    const totalDonations = donationsSeed.length;
    const totalUsers = usersSeed.length;
    const totalVols = volunteersSeed.length;
    const html = `
      <h2 style="font-family: sans-serif;">Audit Report</h2>
      <p>Total donations: ${totalDonations}</p>
      <p>Users: ${totalUsers}</p>
      <p>Volunteers: ${totalVols}</p>
    `;
    printHtml("Audit Report", html);
  }

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            📊 Reports & Exports
          </h1>
          <p className="text-slate-500">
            Generate CSV or PDF summaries for audits and admin reviews
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={auditReport}
            className="h-10 px-5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 
                       text-slate-700 font-medium shadow-sm hover:shadow-md transition-all duration-300"
          >
            🧾 Generate Audit PDF
          </button>
          <button
            onClick={exportAllCSV}
            className="h-10 px-5 rounded-xl bg-blue-600 text-white font-semibold 
                       hover:bg-blue-700 active:scale-95 shadow-md transition-all"
          >
            💾 Export All CSVs
          </button>
        </div>
      </div>

      {/* Summary Section */}
      <div
        className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm 
                   shadow-lg p-6 transition-all"
      >
        <h3 className="font-semibold text-lg mb-4 text-slate-700 flex items-center gap-2">
          ⚡ Quick Summaries
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <li
            className="p-4 rounded-xl border border-slate-200 bg-gradient-to-r from-white to-slate-50 
                       shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-500">Total Donations</div>
              <span className="text-xl group-hover:rotate-6 transition-transform">
                🎁
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-800 mt-1">
              {donationsSeed.length}
            </div>
          </li>

          <li
            className="p-4 rounded-xl border border-slate-200 bg-gradient-to-r from-white to-slate-50 
                       shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-500">Active Volunteers</div>
              <span className="text-xl group-hover:-rotate-6 transition-transform">
                🙋‍♂️
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-800 mt-1">
              {volunteersSeed.filter((v) => v.active).length}
            </div>
          </li>

          <li
            className="p-4 rounded-xl border border-slate-200 bg-gradient-to-r from-white to-slate-50 
                       shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-500">Total Users</div>
              <span className="text-xl group-hover:rotate-6 transition-transform">
                👥
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-800 mt-1">
              {usersSeed.length}
            </div>
          </li>

          <li
            className="p-4 rounded-xl border border-slate-200 bg-gradient-to-r from-white to-slate-50 
                       shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-500">Inventory Items</div>
              <span className="text-xl group-hover:-rotate-6 transition-transform">
                📦
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-800 mt-1">
              {inventorySeed.length}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
