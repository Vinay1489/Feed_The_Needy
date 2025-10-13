import React, { useState } from "react";
import { usersSeed, volunteersSeed } from "../../data";
import { toast } from "sonner";

export default function Notifications() {
  const [target, setTarget] = useState("volunteers");
  const [message, setMessage] = useState("");
  const [feed, setFeed] = useState([
    { id: 1, text: "Alice donated 40 items", when: "Today" },
    { id: 2, text: "Ben completed a delivery", when: "Yesterday" },
  ]);

  function send() {
    if (!message) return toast.error("Enter a message");
    const recipients =
      target === "volunteers" ? volunteersSeed.length : usersSeed.length;
    toast.success(`Sent to ${recipients} ${target}`);
    setFeed((f) =>
      [
        { id: Date.now(), text: `📢 Sent: ${message}`, when: "Now" },
        ...f,
      ].slice(0, 20)
    );
    setMessage("");
  }

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            🔔 Notifications & Alerts
          </h1>
          <p className="text-slate-500">
            Send updates to volunteers and donors about pickups, statuses, and
            stock alerts
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Notification Form */}
        <div
          className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white/70 
                     backdrop-blur-sm shadow-lg p-6 transition-all"
        >
          <h3 className="font-semibold text-lg mb-4 text-slate-700 flex items-center gap-2">
            ✉️ Send a Message
          </h3>

          <div className="mb-4">
            <label className="text-sm font-medium text-slate-600 block mb-1">
              Target Group
            </label>
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="h-10 px-3 rounded-md border border-slate-300 w-full 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            >
              <option value="volunteers">Volunteers</option>
              <option value="donors">Donors</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-600 block mb-1">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="Type your message..."
              className="w-full rounded-md border border-slate-300 px-3 py-2 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          <div className="flex justify-end mt-5">
            <button
              onClick={send}
              className="h-10 px-6 rounded-lg bg-blue-600 text-white font-semibold 
                         hover:bg-blue-700 active:scale-95 shadow-md transition-all"
            >
              🚀 Send Notification
            </button>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div
          className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm 
                     shadow-lg p-6 transition-all"
        >
          <h3 className="font-semibold text-lg mb-4 text-slate-700 flex items-center gap-2">
            🕓 Recent Activity
          </h3>
          <ul className="divide-y divide-slate-200 text-sm text-slate-700">
            {feed.map((f) => (
              <li key={f.id} className="py-2 flex items-start justify-between">
                <div>{f.text}</div>
                <div className="text-xs text-slate-400">{f.when}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
