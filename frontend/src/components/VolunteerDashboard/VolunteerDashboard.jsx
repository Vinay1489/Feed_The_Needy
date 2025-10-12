import React, { useEffect, useMemo } from "react";
import { toast } from "sonner";
import EmbedMap from "../../mini-components/EmbedMap";
import OTPModal from "../../mini-components/OTPModal";
import Steps from "../../mini-components/Steps";
import Chat from "../../mini-components/Chat";
import MiniCalendar from "../../mini-components/MiniCalendar";
import { useAppState } from "../../AppState";
import PageTransition from "../PageTransition";
import { AnimatePresence,motion } from "framer-motion";



function StatCard({ title, value, sub }) {
  return (
    <div className="p-4 rounded-xl bg-white border border-emerald-100 shadow-sm hover:shadow transition">
      <div className="text-sm text-emerald-900/70">{title}</div>
      <div className="mt-1 text-2xl font-bold text-emerald-900">{value}</div>
      {sub ? (
        <div className="text-xs text-emerald-800/70 mt-1">{sub}</div>
      ) : null}
    </div>
  );
}

function Section({ title, action, children }) {
  return (
    <section className="bg-white rounded-2xl border border-emerald-100 overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-emerald-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-transparent">
        <h2 className="font-semibold text-emerald-900">{title}</h2>
        {action}
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </section>
  );
}

export default function VolunteerDashboard() {
  const {
    email,
    profile,
    pendingPickups,
    deliveries,
    acceptPickup,
    rejectPickup,
    advanceDelivery,
    confirmOtp,
  } = useAppState();
  const name = useMemo(
    () => profile?.name || email?.split("@")[0] || "Volunteer",
    [email, profile]
  );
  const [otpTarget, setOtpTarget] = React.useState(null);

  const totalPickups = 42;
  const totalDeliveries = 38;
  const distanceKm = 126;
  const pendingToday = pendingPickups.length;

  useEffect(() => {
    const id = setInterval(() => {
      toast.info("New pickup request near you", {
        description: "Tap to review in Pickup Management.",
        action: {
          label: "View",
          onClick: () =>
            document
              .getElementById("pickups-section")
              ?.scrollIntoView({ behavior: "smooth" }),
        },
      });
    }, 30000);
    return () => clearInterval(id);
  }, []);

  const timeLeft = (iso) => {
    const ms = new Date(iso) - new Date();
    if (ms <= 0) return "Expired";
    const h = Math.floor(ms / 3600000);
    const m = Math.round((ms % 3600000) / 60000);
    return `${h}h ${m}m left`;
  };

  return (
    
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-emerald-900">
                Welcome back, {name.split(" ")[0]} 👋
              </h1>
              <p className="text-emerald-800/70">
                You have {pendingToday} pending pickups today.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/calendar"
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-medium shadow hover:bg-emerald-700"
              >
                View Calendar
              </a>
              <a
                href="/support"
                className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 font-medium border border-emerald-100 hover:bg-emerald-100"
              >
                Report Issue
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              title="Total Pickups"
              value={totalPickups}
              sub="All time"
            />
            <StatCard
              title="Total Deliveries"
              value={totalDeliveries}
              sub="All time"
            />
            <StatCard
              title="Pending"
              value={pendingToday}
              sub="Pickups/Deliveries"
            />
            <StatCard
              title="Distance"
              value={`${distanceKm} km`}
              sub="This month"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6" id="pickups-section">
              <Section title="Food Pickup Management">
                <div className="space-y-4">
                  {pendingPickups.length === 0 && (
                    <div className="p-6 text-sm text-emerald-800/70 bg-emerald-50 rounded-xl border border-emerald-100">
                      No active pickup requests.
                    </div>
                  )}
                  {pendingPickups.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 border border-emerald-100 rounded-xl hover:shadow-sm transition"
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
                            {p.items
                              .map((i) => `${i.name} (${i.qty})`)
                              .join(", ")}
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
              </Section>

              <Section
                title="Communication"
                action={
                  <a
                    href="tel:+18001234567"
                    className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-sm hover:bg-rose-700"
                  >
                    Emergency Contact
                  </a>
                }
              >
                <Chat />
              </Section>
            </div>

            <div className="space-y-6">
              <Section title="Ongoing Deliveries">
                <div className="space-y-4">
                  {deliveries.length === 0 && (
                    <div className="p-4 text-sm text-emerald-800/70 bg-emerald-50 rounded-xl border border-emerald-100">
                      No deliveries in progress.
                    </div>
                  )}
                  {deliveries.map((d) => (
                    <div
                      key={d.id}
                      className="p-4 border border-emerald-100 rounded-xl"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="font-semibold text-emerald-900">
                            {d.route.donor.name} → {d.route.ngo.name}
                          </div>
                          <div className="text-xs text-emerald-800/70">
                            OTP:{" "}
                            <span className="font-mono bg-emerald-50 px-1 rounded border border-emerald-100">
                              {d.otp}
                            </span>
                          </div>
                          <Steps status={d.status} />
                        </div>
                        <div className="flex flex-col gap-2">
                          {d.status !== "Delivered" && (
                            <button
                              onClick={() => advanceDelivery(d)}
                              className="px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                            >
                              Update Status
                            </button>
                          )}
                          {d.status !== "Delivered" && (
                            <button
                              onClick={() => setOtpTarget(d)}
                              className="px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100"
                            >
                              NGO Confirmation
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              <Section title="Schedule">
                <MiniCalendar tasks={pendingPickups} />
              </Section>

              <Section
                title="Profile & Performance"
                action={
                  <a
                    href="/profile"
                    className="text-sm text-emerald-700 underline"
                  >
                    Edit Profile
                  </a>
                }
              >
                <div className="grid grid-cols-2 gap-4">
                  <StatCard
                    title="Donations delivered"
                    value={totalDeliveries}
                  />
                  <StatCard title="Rating" value="4.8★" />
                  <StatCard title="Level" value="Silver" />
                  <StatCard
                    title="Service area"
                    value={profile?.serviceArea || "San Francisco"}
                  />
                </div>
              </Section>
            </div>
          </div>

          {otpTarget && (
            <OTPModal
              expected={otpTarget.otp}
              onClose={() => setOtpTarget(null)}
              onConfirm={(code) => confirmOtp(otpTarget.id, code)}
            />
          )}
        </div>
      
  );
}
