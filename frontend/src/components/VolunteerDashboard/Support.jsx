import React from "react";
import { toast } from "sonner";
import PageTransition from "../PageTransition";

export default function Support() {
  const [type, setType] = React.useState("Pickup issue");
  const [desc, setDesc] = React.useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!desc.trim()) return toast.error("Please describe the issue");
    toast.success("Issue reported. Our team will reach out.");
    setDesc("");
  };

  return (
    <PageTransition>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-2xl font-extrabold text-emerald-900">
            Admin & Support
          </h1>
          <form
            onSubmit={submit}
            className="bg-white border border-emerald-100 rounded-2xl p-6 space-y-4"
          >
            <div>
              <label className="text-sm font-medium text-emerald-900">
                Issue Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded-xl border border-emerald-200"
              >
                <option>Pickup issue</option>
                <option>Delivery issue</option>
                <option>App problem</option>
                <option>Emergency</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-emerald-900">
                Description
              </label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={6}
                className="mt-1 w-full px-3 py-2 rounded-xl border border-emerald-200"
                placeholder="Describe what happened, include any details that can help."
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700"
              >
                Submit
              </button>
              <a
                href="tel:+18001234567"
                className="px-4 py-2 rounded-xl bg-rose-600 text-white font-medium hover:bg-rose-700"
              >
                Emergency Call
              </a>
            </div>
          </form>
        </div>
        <aside className="space-y-3">
          <h2 className="font-semibold text-emerald-900">Guidelines</h2>
          <div className="space-y-2 text-sm text-emerald-800/80">
            <div className="p-3 bg-white border border-emerald-100 rounded-xl">
              Follow food safety protocols and respect expiry windows.
            </div>
            <div className="p-3 bg-white border border-emerald-100 rounded-xl">
              Use insulated containers for perishables.
            </div>
            <div className="p-3 bg-white border border-emerald-100 rounded-xl">
              Verify NGO receipt via OTP at delivery.
            </div>
            <div className="p-3 bg-white border border-emerald-100 rounded-xl">
              In emergencies, contact the coordinator immediately.
            </div>
          </div>
        </aside>
      </div>
    </PageTransition>
  );
}
