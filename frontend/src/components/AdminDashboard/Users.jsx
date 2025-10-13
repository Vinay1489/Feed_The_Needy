import React, { useMemo, useState } from "react";
import { usersSeed } from "../../data";
import { exportToCSV } from "../../exporter";
import { Plus, Download, Search, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";

/**
 * Users.jsx
 * Professional version with subtle emojis and enhanced styling.
 * - Responsive (cards on mobile, table on desktop)
 * - Add/Edit/Remove/Export/Filter/Search all included
 */

export default function Users() {
  const [users, setUsers] = useState(usersSeed);
  const [q, setQ] = useState("");
  const [role, setRole] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Donor",
    status: "Active",
  });

  const filtered = useMemo(() => {
    return users.filter(
      (u) =>
        (role === "All" || u.role === role) &&
        (u.name.toLowerCase().includes(q.toLowerCase()) ||
          u.email.toLowerCase().includes(q.toLowerCase()))
    );
  }, [users, q, role]);

  function openAdd() {
    setEditing(null);
    setForm({ name: "", email: "", role: "Donor", status: "Active" });
    setModalOpen(true);
  }

  function openEdit(u) {
    setEditing(u);
    setForm({ name: u.name, email: u.email, role: u.role, status: u.status });
    setModalOpen(true);
  }

  function saveUser(e) {
    e.preventDefault();
    if (!form.name || !form.email)
      return toast.error("Name and email are required");
    if (editing) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editing.id ? { ...u, ...form } : u))
      );
      toast.success("👤 User updated");
    } else {
      const id = Math.max(0, ...users.map((u) => u.id)) + 1;
      setUsers((prev) => [...prev, { id, activity: 0, ...form }]);
      toast.success("🧑‍💼 User added");
    }
    setModalOpen(false);
  }

  function removeUser(id) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast.success("🗑️ User removed");
  }

  function toggleStatus(id) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" }
          : u
      )
    );
    toast.success("🔄 Status updated");
  }

  function exportUsers() {
    exportToCSV("users", filtered);
    toast.success("📤 Users exported as CSV");
  }

  // helper: initials
  function initials(name) {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 flex items-center gap-2">
            👥 User Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage donors and volunteers — add, edit, export, or deactivate
            accounts efficiently.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportUsers}
            className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm bg-white hover:bg-slate-50 shadow-sm transition"
            title="Export CSV"
          >
            <Download className="h-4 w-4 text-slate-600" />
            <span>Export CSV 📤</span>
          </button>

          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 transition"
            title="Add User"
          >
            <Plus className="h-4 w-4" />
            <span>Add User ➕</span>
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 flex items-center gap-3">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="🔍 Search by name or email"
                className="h-10 w-full pl-10 pr-3 rounded-lg border border-slate-300 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </div>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm focus:ring-2 focus:ring-blue-500/40"
            >
              <option>All</option>
              <option>Donor</option>
              <option>Volunteer</option>
            </select>

            <button
              onClick={() => {
                setQ("");
                setRole("All");
                toast.success("Filters cleared ✅");
              }}
              className="text-sm text-slate-600 hover:underline"
            >
              Clear
            </button>
          </div>

          <div className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-medium text-slate-700">
              {filtered.length}
            </span>{" "}
            user{filtered.length !== 1 ? "s" : ""}.
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid gap-4">
        {/* Mobile cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
          {filtered.length === 0 && (
            <div className="rounded-lg border bg-white p-6 text-center text-slate-500">
              No users found 🙁
            </div>
          )}
          {filtered.map((u) => (
            <article
              key={u.id}
              className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition flex items-start gap-4"
            >
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-slate-100 grid place-items-center font-semibold text-slate-700">
                  {initials(u.name)}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium text-slate-900">{u.name}</div>
                    <div className="text-xs text-slate-400">{u.email}</div>
                    <div className="text-xs text-slate-400 mt-1">
                      Role: {u.role}
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      u.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {u.status}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-3 text-sm">
                  <button
                    onClick={() => toggleStatus(u.id)}
                    className="text-blue-600 hover:underline"
                  >
                    {u.status === "Active" ? "Deactivate ❌" : "Activate ✅"}
                  </button>
                  <button
                    onClick={() => openEdit(u)}
                    className="text-slate-700 hover:underline flex items-center gap-1"
                  >
                    <Edit2 className="h-4 w-4" /> Edit
                  </button>
                  <button
                    onClick={() => removeUser(u.id)}
                    className="text-rose-600 hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden lg:block rounded-xl border bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50">
                <tr className="text-left text-slate-500">
                  <th className="px-6 py-3">User 👤</th>
                  <th className="px-6 py-3">Email ✉️</th>
                  <th className="px-6 py-3">Role 🏷️</th>
                  <th className="px-6 py-3">Status ⚙️</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-sm text-slate-500"
                    >
                      No users found 🙁
                    </td>
                  </tr>
                )}
                {filtered.map((u, idx) => (
                  <tr
                    key={u.id}
                    className={`border-t ${
                      idx % 2 === 0 ? "bg-white" : "bg-slate-50"
                    } hover:bg-blue-50/20 transition`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-slate-100 grid place-items-center font-semibold text-slate-700">
                          {initials(u.name)}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">
                            {u.name}
                          </div>
                          <div className="text-xs text-slate-400">
                            Joined: {u.joined || "—"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700">{u.email}</td>
                    <td className="px-6 py-4 text-slate-700">{u.role}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          u.status === "Active"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-4">
                        <button
                          onClick={() => toggleStatus(u.id)}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {u.status === "Active"
                            ? "Deactivate ❌"
                            : "Activate ✅"}
                        </button>
                        <button
                          onClick={() => openEdit(u)}
                          className="text-sm text-slate-700 hover:underline flex items-center gap-1"
                        >
                          <Edit2 className="h-4 w-4" /> Edit
                        </button>
                        <button
                          onClick={() => removeUser(u.id)}
                          className="text-sm text-rose-600 hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="h-4 w-4" /> Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-3 text-xs text-slate-500 bg-slate-50 flex items-center justify-between">
            <div>
              Showing{" "}
              <span className="font-medium text-slate-700">
                {filtered.length}
              </span>{" "}
              user{filtered.length !== 1 ? "s" : ""}.
            </div>
            <div>💡 Tip: Use filters or search to refine results.</div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-xl bg-white shadow-xl ring-1 ring-slate-900/5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  {editing ? "✏️ Edit User" : "🧑‍💼 Add User"}
                </h3>
                <p className="text-sm text-slate-500">
                  {editing
                    ? "Update user details and role"
                    : "Create a new donor or volunteer profile."}
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                ✖️
              </button>
            </div>

            <form onSubmit={saveUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Name
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Role
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                  >
                    <option>Donor</option>
                    <option>Volunteer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-md border px-3 py-2 text-sm bg-white hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Save 💾
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
