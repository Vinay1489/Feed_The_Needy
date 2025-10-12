import React from "react";
import { useAppState } from "../../AppState";
import { toast } from "sonner";
import PageTransition from "../PageTransition";

export default function Profile() {
  const { profile, setProfile } = useAppState();
  const [form, setForm] = React.useState(profile);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const save = (e) => {
    e.preventDefault();
    setProfile(form);
    toast.success("Profile updated");
  };

  return (
    <PageTransition>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form
            onSubmit={save}
            className="bg-white border border-emerald-100 rounded-2xl p-6 space-y-4"
          >
            <h1 className="text-2xl font-extrabold text-emerald-900">
              Profile
            </h1>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-emerald-900">
                  Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-300 outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-emerald-900">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-emerald-200 bg-emerald-50/50"
                  readOnly
                />
              </div>
              <div>
                <label className="text-sm font-medium text-emerald-900">
                  Phone
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-300 outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-emerald-900">
                  Service Area
                </label>
                <input
                  name="serviceArea"
                  value={form.serviceArea}
                  onChange={onChange}
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-300 outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-emerald-900">
                  Vehicle
                </label>
                <input
                  name="vehicle"
                  value={form.vehicle}
                  onChange={onChange}
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-300 outline-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700"
              >
                Save
              </button>
              <a
                href="/"
                className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100"
              >
                Back to Dashboard
              </a>
            </div>
          </form>
        </div>
        <aside className="space-y-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-500 text-white">
            <div className="text-sm opacity-90">Volunteer Level</div>
            <div className="text-2xl font-extrabold">{profile.level}</div>
            <div className="text-sm mt-1 opacity-95">
              Rating: {profile.rating}★
            </div>
          </div>
        </aside>
      </div>
    </PageTransition>
  );
}
