import React, { useMemo, useState } from "react";
import { donationsSeed } from "../../data";
import { exportToCSV, printHtml } from "../../exporter";
import { toast } from "sonner";
import { Search, FileDown, FileText, RefreshCw } from "lucide-react";

export default function Donations() {
  const [donations, setDonations] = useState(donationsSeed);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [donor, setDonor] = useState("All");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const donors = useMemo(
    () => Array.from(new Set(donations.map((d) => d.donor))),
    [donations]
  );

  const filtered = useMemo(() => {
    return donations.filter((d) => {
      if (status !== "All" && d.status !== status) return false;
      if (donor !== "All" && d.donor !== donor) return false;
      if (q && !`${d.donor} ${d.type}`.toLowerCase().includes(q.toLowerCase()))
        return false;
      if (from && d.date < from) return false;
      if (to && d.date > to) return false;
      return true;
    });
  }, [donations, status, donor, q, from, to]);

  function cycleStatus(id) {
    setDonations((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const order = ["Pending", "Collected", "Distributed"];
        const idx = order.indexOf(p.status);
        const next = order[(idx + 1) % order.length];
        toast.success(`Donation #${p.id} status updated → ${next}`);
        return { ...p, status: next };
      })
    );
  }

  function exportFiltered() {
    exportToCSV("donations", filtered);
    toast.success("Donations exported to CSV");
  }

  function summaryReport() {
    const total = filtered.length;
    const byStatus = filtered.reduce((acc, cur) => {
      acc[cur.status] = (acc[cur.status] || 0) + 1;
      return acc;
    }, {});
    const html = `
      <h1>Donations Summary Report</h1>
      <p>Total donations: ${total}</p>
      <pre>${JSON.stringify(byStatus, null, 2)}</pre>
    `;
    printHtml("Donations Report", html);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Donation Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track donations, update statuses, and export filtered reports.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={summaryReport}
            className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm bg-white hover:bg-slate-50 shadow-sm"
          >
            <FileText className="h-4 w-4" />
            Generate Report
          </button>
          <button
            onClick={exportFiltered}
            className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm shadow-sm hover:opacity-90"
          >
            <FileDown className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search donor or type..."
              className="w-full h-10 pl-10 pr-3 rounded-md border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-10 px-3 rounded-md border border-slate-200 text-sm focus:ring-2 focus:ring-primary/30"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Collected</option>
            <option>Distributed</option>
          </select>

          <select
            value={donor}
            onChange={(e) => setDonor(e.target.value)}
            className="h-10 px-3 rounded-md border border-slate-200 text-sm focus:ring-2 focus:ring-primary/30"
          >
            <option>All</option>
            {donors.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>

          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="h-10 px-3 rounded-md border border-slate-200 text-sm focus:ring-2 focus:ring-primary/30"
          />
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="h-10 px-3 rounded-md border border-slate-200 text-sm focus:ring-2 focus:ring-primary/30"
          />

          <button
            onClick={() => {
              setQ("");
              setStatus("All");
              setDonor("All");
              setFrom("");
              setTo("");
              toast.success("Filters cleared");
            }}
            className="flex items-center gap-1 text-sm text-slate-600 hover:underline"
          >
            <RefreshCw className="h-4 w-4" /> Clear
          </button>
        </div>
      </div>

      {/* Donations Grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.length === 0 && (
          <div className="rounded-lg border bg-white p-10 text-center text-slate-500 shadow-sm col-span-full">
            No donations found.
          </div>
        )}

        {filtered.map((d) => (
          <article
            key={d.id}
            className="rounded-lg border bg-white p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition"
          >
            <div>
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-slate-900">
                  Donation #{d.id}
                </h2>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    d.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : d.status === "Collected"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {d.status}
                </span>
              </div>

              <ul className="text-sm text-slate-700 space-y-1">
                <li>
                  <span className="font-medium text-slate-600">Donor:</span>{" "}
                  {d.donor}
                </li>
                <li>
                  <span className="font-medium text-slate-600">Type:</span>{" "}
                  {d.type}
                </li>
                <li>
                  <span className="font-medium text-slate-600">Date:</span>{" "}
                  {d.date}
                </li>
                <li>
                  <span className="font-medium text-slate-600">Quantity:</span>{" "}
                  {d.quantity}
                </li>
              </ul>
            </div>

            <button
              onClick={() => cycleStatus(d.id)}
              className="mt-3 inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline self-end"
            >
              Cycle Status →
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
