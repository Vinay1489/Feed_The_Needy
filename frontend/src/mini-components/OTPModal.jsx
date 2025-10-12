import React, { useState } from "react";

export default function OTPModal({ expected, onConfirm, onClose }) {
  const [code, setCode] = useState("");
  const confirm = () => {
    if (!code.trim()) return;
    onConfirm(code.trim());
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-md bg-white rounded-2xl border border-emerald-100 shadow-xl">
        <div className="p-5 border-b border-emerald-100">
          <h3 className="text-lg font-semibold text-emerald-900">
            NGO Confirmation
          </h3>
          <p className="text-sm text-emerald-800/70">
            Enter the OTP provided by the NGO to mark delivery as Delivered.
          </p>
        </div>
        <div className="p-5 space-y-3">
          <label className="text-sm font-medium text-emerald-900">
            OTP Code
          </label>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="4-digit code"
            inputMode="numeric"
            className="w-full px-3 py-2 rounded-xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          />
          <p className="text-xs text-emerald-800/70">
            Hint for demo: {expected}
          </p>
        </div>
        <div className="p-5 pt-0 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100"
          >
            Cancel
          </button>
          <button
            onClick={confirm}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
