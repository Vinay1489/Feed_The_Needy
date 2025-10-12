import React from "react";
import { useAppState } from "../../AppState";
import Steps from "../../mini-components/Steps";
import OTPModal from "../../mini-components/OTPModal";
import PageTransition from "../PageTransition";

export default function Deliveries() {
  const { deliveries, advanceDelivery, confirmOtp } = useAppState();
  const [otpTarget, setOtpTarget] = React.useState(null);

  return (
    <PageTransition>
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-extrabold text-emerald-900">
            Ongoing Deliveries
          </h1>
          <p className="text-emerald-800/70">
            Track items in transit and complete deliveries with NGO
            confirmation.
          </p>
        </header>

        <div className="space-y-4">
          {deliveries.length === 0 && (
            <div className="p-6 text-sm text-emerald-800/70 bg-emerald-50 rounded-xl border border-emerald-100">
              No deliveries in progress.
            </div>
          )}
          {deliveries.map((d) => (
            <div
              key={d.id}
              className="p-4 border border-emerald-100 rounded-xl bg-white"
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

        {otpTarget && (
          <OTPModal
            expected={otpTarget.otp}
            onClose={() => setOtpTarget(null)}
            onConfirm={(code) => confirmOtp(otpTarget.id, code)}
          />
        )}
      </div>
    </PageTransition>
  );
}
