import React from "react";
import { useAppState } from "../../AppState";
import MiniCalendar from "../../mini-components/MiniCalendar";
import PageTransition from "../PageTransition";

export default function Calendar() {
  const { pendingPickups, deliveries } = useAppState();
  const upcoming = [
    ...pendingPickups.map((p) => ({
      id: p.id,
      when: p.expiry,
      label: `Pickup: ${p.donor.name}`,
    })),
    ...deliveries
      .filter((d) => d.status !== "Delivered")
      .map((d) => ({
        id: d.id,
        when: new Date().toISOString(),
        label: `Deliver: ${d.route.ngo.name}`,
      })),
  ].sort((a, b) => new Date(a.when) - new Date(b.when));

  return (
    <PageTransition>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <header>
            <h1 className="text-2xl font-extrabold text-emerald-900">
              Schedule
            </h1>
            <p className="text-emerald-800/70">
              Upcoming pickups and deliveries.
            </p>
          </header>
          <div className="bg-white border border-emerald-100 rounded-2xl p-4">
            <MiniCalendar tasks={pendingPickups} />
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="font-semibold text-emerald-900">Upcoming</h2>
          <div className="space-y-2">
            {upcoming.length === 0 && (
              <div className="p-4 text-sm text-emerald-800/70 bg-emerald-50 rounded-xl border border-emerald-100">
                Nothing scheduled.
              </div>
            )}
            {upcoming.map((e) => (
              <div
                key={e.id}
                className="p-3 rounded-xl bg-white border border-emerald-100"
              >
                <div className="text-sm font-medium text-emerald-900">
                  {e.label}
                </div>
                <div className="text-xs text-emerald-800/70">
                  {new Date(e.when).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
