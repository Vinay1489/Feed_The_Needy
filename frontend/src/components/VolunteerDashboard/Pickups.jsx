import React from "react";
import { useAppState } from "../../AppState";
import EmbedMap from "../../mini-components/EmbedMap";
import PageTransition from "../PageTransition";

function timeLeft(iso) {
  const ms = new Date(iso) - new Date();
  if (ms <= 0) return "Expired";
  const h = Math.floor(ms / 3600000);
  const m = Math.round((ms % 3600000) / 60000);
  return `${h}h ${m}m left`;
}

export default function Pickups() {
  const { pendingPickups, acceptPickup, rejectPickup } = useAppState();
  return (
    <PageTransition>
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-extrabold text-emerald-900">
            Food Pickup Management
          </h1>
          <p className="text-emerald-800/70">
            Review active pickup requests and accept the ones you can fulfill.
          </p>
        </header>

        <div className="space-y-4">
          {pendingPickups.length === 0 && (
            <div className="p-6 text-sm text-emerald-800/70 bg-emerald-50 rounded-xl border border-emerald-100">
              No active pickup requests.
            </div>
          )}
          {pendingPickups.map((p) => (
            <div
              key={p.id}
              className="p-4 border border-emerald-100 rounded-xl bg-white"
            >
              <div className="flex flex-wrap items-start gap-4 justify-between">
                <div>
                  <div className="font-semibold text-emerald-900">
                    {p.donor.name}
                  </div>
                  <div className="text-sm text-emerald-800/70">
                    {p.donor.address}
                  </div>
                  <div className="text-sm mt-1">
                    Food:{" "}
                    {p.items.map((i) => `${i.name} (${i.qty})`).join(", ")}
                  </div>
                  <div className="text-xs text-amber-700 font-medium mt-1">
                    Expiry: {timeLeft(p.expiry)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => acceptPickup(p)}
                    className="px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => rejectPickup(p)}
                    className="px-3 py-2 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
                  >
                    Reject
                  </button>
                </div>
              </div>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                <EmbedMap
                  lat={p.donor.lat}
                  lng={p.donor.lng}
                  label={`Donor: ${p.donor.name}`}
                />
                <EmbedMap
                  lat={p.ngo.lat}
                  lng={p.ngo.lng}
                  label={`NGO: ${p.ngo.name}`}
                />
              </div>
              <div className="mt-3 text-sm">
                <a
                  className="text-emerald-700 underline hover:text-emerald-800"
                  href={`https://www.google.com/maps/dir/?api=1&origin=${p.donor.lat},${p.donor.lng}&destination=${p.ngo.lat},${p.ngo.lng}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open route in Google Maps
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
