import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const defaultRoles = [
  {
    id: 1,
    name: "Admin",
    permissions: {
      users: true,
      donations: true,
      volunteers: true,
      inventory: true,
      reports: true,
      settings: true,
    },
  },
  {
    id: 2,
    name: "Coordinator",
    permissions: {
      users: false,
      donations: true,
      volunteers: true,
      inventory: true,
      reports: true,
      settings: false,
    },
  },
  {
    id: 3,
    name: "Volunteer",
    permissions: {
      users: false,
      donations: false,
      volunteers: true,
      inventory: false,
      reports: false,
      settings: false,
    },
  },
];

export default function Settings() {
  const [roles, setRoles] = useState(defaultRoles);
  const [selectedRole, setSelectedRole] = useState(null);
  const [workingHours, setWorkingHours] = useState({
    start: "09:00",
    end: "17:00",
  });
  const [maxDonations, setMaxDonations] = useState(50);

  useEffect(() => {
    try {
      const s = localStorage.getItem("fc_settings_v1");
      if (s) {
        const parsed = JSON.parse(s);
        setRoles(parsed.roles || defaultRoles);
        setWorkingHours(parsed.workingHours || workingHours);
        setMaxDonations(parsed.maxDonations || maxDonations);
      }
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function persist() {
    const payload = { roles, workingHours, maxDonations };
    localStorage.setItem("fc_settings_v1", JSON.stringify(payload));
    toast.success("Settings saved");
  }

  function addRole() {
    const name = prompt("Role name");
    if (!name) return;
    const id = Math.max(0, ...roles.map((r) => r.id)) + 1;
    const newRole = {
      id,
      name,
      permissions: {
        users: false,
        donations: true,
        volunteers: true,
        inventory: false,
        reports: false,
        settings: false,
      },
    };
    setRoles((r) => [...r, newRole]);
    toast.success("Role added");
  }

  function removeRole(id) {
    if (!confirm("Remove this role?")) return;
    setRoles((r) => r.filter((x) => x.id !== id));
    if (selectedRole === id) setSelectedRole(null);
    toast.success("Role removed");
  }

  function togglePerm(roleId, key) {
    setRoles((prev) =>
      prev.map((r) =>
        r.id === roleId
          ? {
              ...r,
              permissions: { ...r.permissions, [key]: !r.permissions[key] },
            }
          : r
      )
    );
  }

  function updateRoleName(roleId) {
    const name = prompt("New role name");
    if (!name) return;
    setRoles((prev) => prev.map((r) => (r.id === roleId ? { ...r, name } : r)));
    toast.success("Role renamed");
  }

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            ⚙️ System Settings
          </h1>
          <p className="text-slate-500">
            Configure roles, permissions, and organization-wide settings
          </p>
        </div>
        <button
          onClick={persist}
          className="h-10 px-6 rounded-lg bg-blue-600 text-white font-semibold 
                     hover:bg-blue-700 active:scale-95 shadow-md transition-all"
        >
          💾 Save Settings
        </button>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Roles List */}
        <div
          className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm 
                     shadow-lg p-6 transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-slate-700 flex items-center gap-2">
              👥 Roles
            </h3>
            <button
              onClick={addRole}
              className="text-sm px-3 py-1.5 border border-slate-300 rounded-md 
                         hover:bg-slate-100 transition-all"
            >
              ➕ Add Role
            </button>
          </div>

          <ul className="space-y-2">
            {roles.map((r) => (
              <li
                key={r.id}
                className={`flex items-center justify-between p-3 rounded-xl border 
                            cursor-pointer transition-all duration-300 ${
                              selectedRole === r.id
                                ? "bg-blue-50 border-blue-200"
                                : "hover:bg-slate-50"
                            }`}
              >
                <button
                  onClick={() => setSelectedRole(r.id)}
                  className="text-left flex-1"
                >
                  <div className="font-medium text-slate-800">{r.name}</div>
                  <div className="text-xs text-slate-500">
                    {
                      Object.keys(r.permissions).filter((k) => r.permissions[k])
                        .length
                    }{" "}
                    permissions enabled
                  </div>
                </button>
                <div className="flex items-center gap-2 text-sm">
                  <button
                    onClick={() => updateRoleName(r.id)}
                    className="text-slate-600 hover:underline"
                  >
                    Rename
                  </button>
                  <button
                    onClick={() => removeRole(r.id)}
                    className="text-rose-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Permissions + App Settings */}
        <div
          className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm 
                     shadow-lg p-6 transition-all lg:col-span-2"
        >
          <h3 className="font-semibold text-lg mb-4 text-slate-700 flex items-center gap-2">
            🔐 Role Permissions
          </h3>

          {selectedRole ? (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {Object.keys(roles[0].permissions).map((k) => (
                  <label
                    key={k}
                    className="flex items-center gap-2 p-3 border border-slate-200 
                               rounded-xl bg-white hover:bg-slate-50 transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={
                        !!roles.find((r) => r.id === selectedRole).permissions[
                          k
                        ]
                      }
                      onChange={() => togglePerm(selectedRole, k)}
                      className="accent-blue-600 w-4 h-4"
                    />
                    <div className="capitalize text-slate-700 text-sm">{k}</div>
                  </label>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-500 border border-dashed border-slate-300 rounded-lg p-4">
              Select a role from the left to edit its permissions.
            </div>
          )}

          {/* App Settings */}
          <div className="mt-8 border-t pt-6">
            <h4 className="font-semibold text-lg mb-4 text-slate-700 flex items-center gap-2">
              ⚙️ App Settings
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Working Hours (Start)
                </label>
                <input
                  type="time"
                  value={workingHours.start}
                  onChange={(e) =>
                    setWorkingHours({ ...workingHours, start: e.target.value })
                  }
                  className="h-10 w-full px-3 rounded-md border border-slate-300 
                             focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Working Hours (End)
                </label>
                <input
                  type="time"
                  value={workingHours.end}
                  onChange={(e) =>
                    setWorkingHours({ ...workingHours, end: e.target.value })
                  }
                  className="h-10 w-full px-3 rounded-md border border-slate-300 
                             focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Max Donations / Day
                </label>
                <input
                  type="number"
                  value={maxDonations}
                  onChange={(e) => setMaxDonations(Number(e.target.value))}
                  className="h-10 w-full px-3 rounded-md border border-slate-300 
                             focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              These settings affect operational rules, scheduling, and daily
              donation limits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
