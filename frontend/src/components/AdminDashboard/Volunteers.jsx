import React, { useMemo, useState } from "react";
import { volunteersSeed } from "../../data";
import { exportToCSV } from "../../exporter";
import { toast } from "sonner";
import { Download, Search, Check, UserPlus } from "lucide-react";

export default function Volunteers() {
  const [vols, setVols] = useState(volunteersSeed);
  const [q, setQ] = useState("");

  const filtered = useMemo(
    () =>
      vols.filter((v) => `${v.name}`.toLowerCase().includes(q.toLowerCase())),
    [vols, q]
  );

  function assign(id) {
    setVols((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, assigned: v.assigned + 1, active: true } : v
      )
    );
    toast.success("Volunteer assigned");
  }

  function complete(id) {
    setVols((prev) =>
      prev.map((v) =>
        v.id === id
          ? {
              ...v,
              completed: v.completed + 1,
              assigned: Math.max(0, v.assigned - 1),
            }
          : v
      )
    );
    toast.success("Marked delivery complete");
  }

  function toggleActive(id) {
    setVols((prev) =>
      prev.map((v) => (v.id === id ? { ...v, active: !v.active } : v))
    );
  }

  function exportVols() {
    exportToCSV("volunteers", vols);
    toast.success("Volunteers exported");
  }

  function initials(name) {
    if (!name) return "V";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  const totals = useMemo(() => {
    const total = vols.length;
    const active = vols.filter((v) => v.active).length;
    const assigned = vols.reduce((s, v) => s + (v.assigned || 0), 0);
    const completed = vols.reduce((s, v) => s + (v.completed || 0), 0);
    return { total, active, assigned, completed };
  }, [vols]);

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            🙋‍♀️ Volunteer Management
          </h1>
          <p className="text-slate-500">
            View volunteers, assign deliveries, and track completion stats.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Totals */}
          <div className="hidden sm:flex items-center gap-5 text-sm text-slate-600">
            {[
              ["Total", totals.total],
              ["Active", totals.active],
              ["Assigned", totals.assigned],
              ["Completed", totals.completed],
            ].map(([label, val]) => (
              <div key={label} className="text-center">
                <div className="text-xs text-slate-500">{label}</div>
                <div className="font-semibold text-slate-800">{val}</div>
              </div>
            ))}
          </div>

          {/* Export Button */}
          <button
            onClick={exportVols}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm 
                       rounded-lg shadow-md hover:bg-blue-700 active:scale-95 transition-all"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div
        className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm 
                   p-5 shadow-md flex flex-col sm:flex-row sm:items-center gap-3"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search volunteers..."
            className="h-10 w-full pl-10 pr-3 rounded-md border border-slate-300 
                       text-sm placeholder:text-slate-400 focus:outline-none 
                       focus:ring-2 focus:ring-blue-400 transition-all"
          />
        </div>
        <button
          onClick={() => {
            setQ("");
            toast.success("Cleared search");
          }}
          className="text-sm text-slate-600 hover:underline"
        >
          Clear
        </button>
      </div>

      {/* Content */}
      <div className="grid gap-5">
        {/* Mobile Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
          {filtered.length === 0 && (
            <div className="rounded-xl border bg-white/70 p-6 text-center text-slate-500 shadow-sm">
              No volunteers found.
            </div>
          )}

          {filtered.map((v) => (
            <article
              key={v.id}
              className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm 
                         p-5 shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-50 grid place-items-center font-semibold text-blue-700">
                  {initials(v.name)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-slate-800">
                        {v.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        Phone: {v.phone || "—"}
                      </div>
                      <div className="text-xs text-slate-500">
                        Area: {v.area || "—"}
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        v.active
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {v.active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3 text-sm">
                    <button
                      onClick={() => assign(v.id)}
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
                    >
                      <UserPlus className="h-4 w-4" /> Assign
                    </button>
                    <button
                      onClick={() => complete(v.id)}
                      className="text-slate-700 hover:underline inline-flex items-center gap-1"
                    >
                      <Check className="h-4 w-4" /> Complete
                    </button>
                    <button
                      onClick={() => toggleActive(v.id)}
                      className="text-rose-600 hover:underline"
                    >
                      Toggle
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Desktop Table */}
        <div
          className="hidden lg:block rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm 
                     shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr className="text-left text-slate-500">
                  <th className="px-6 py-3 font-medium">Volunteer</th>
                  <th className="px-6 py-3 font-medium">Assigned</th>
                  <th className="px-6 py-3 font-medium">Completed</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      No volunteers found.
                    </td>
                  </tr>
                )}
                {filtered.map((v, idx) => (
                  <tr
                    key={v.id}
                    className={`border-t transition-colors ${
                      idx % 2 === 0 ? "bg-white/50" : "bg-slate-50/70"
                    } hover:bg-blue-50/50`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-50 grid place-items-center font-semibold text-blue-700">
                          {initials(v.name)}
                        </div>
                        <div>
                          <div className="font-medium text-slate-800">
                            {v.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            Area: {v.area || "—"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700">{v.assigned}</td>
                    <td className="px-6 py-4 text-slate-700">{v.completed}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          v.active
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {v.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-4">
                        <button
                          onClick={() => assign(v.id)}
                          className="text-blue-600 hover:underline inline-flex items-center gap-1"
                        >
                          <UserPlus className="h-4 w-4" /> Assign
                        </button>
                        <button
                          onClick={() => complete(v.id)}
                          className="text-slate-700 hover:underline inline-flex items-center gap-1"
                        >
                          <Check className="h-4 w-4" /> Complete
                        </button>
                        <button
                          onClick={() => toggleActive(v.id)}
                          className="text-rose-600 hover:underline"
                        >
                          Toggle
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-3 text-xs text-slate-500 bg-slate-100 flex items-center justify-between">
            <div>
              Showing{" "}
              <span className="font-medium text-slate-700">
                {filtered.length}
              </span>{" "}
              volunteer{filtered.length !== 1 ? "s" : ""}.
            </div>
            <div>Tip: Use the search bar to find volunteers quickly.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
