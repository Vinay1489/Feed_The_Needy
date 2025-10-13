import React, { useMemo, useState } from "react";
import {
  donationsSeed,
  usersSeed,
  volunteersSeed,
  inventorySeed,
} from "../../data";
import { exportToCSV, printHtml } from "../../exporter";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
  Pie,
  PieChart,
  Cell,
  Legend,
} from "recharts";
import {
  Download,
  FileText,
  TrendingUp,
  Users as UsersIcon,
  Truck,
  Package,
  HandHeart,
} from "lucide-react";
import { toast } from "sonner";

const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444"];

export default function AdminDashboard() {
  const [donations] = useState(donationsSeed);
  const [users] = useState(usersSeed);
  const [volunteers] = useState(volunteersSeed);
  const [inventory] = useState(inventorySeed);

  const totals = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const donationsToday = donations.filter((d) => d.date === today).length;
    const activeVolunteers = volunteers.filter((v) => v.active).length;
    const pending = donations.filter((d) => d.status === "Pending").length;
    const totalDonations = donations.length;
    return { donationsToday, activeVolunteers, pending, totalDonations };
  }, [donations, volunteers]);

  const areaData = useMemo(() => {
    const map = new Map();
    donations.forEach((d) => {
      map.set(d.date, (map.get(d.date) || 0) + 1);
    });
    return Array.from(map.entries())
      .sort((a, b) => (a[0] > b[0] ? 1 : -1))
      .map(([date, count]) => ({ date, count }));
  }, [donations]);

  const statusPie = useMemo(() => {
    const statuses = ["Pending", "Collected", "Distributed"];
    return statuses.map((s) => ({
      name: s,
      value: donations.filter((d) => d.status === s).length,
    }));
  }, [donations]);

  const roleBars = useMemo(() => {
    const donors = users.filter((u) => u.role === "Donor").length;
    const vols = users.filter((u) => u.role === "Volunteer").length;
    return [
      { name: "Donors", value: donors },
      { name: "Volunteers", value: vols },
    ];
  }, [users]);

  function exportReport() {
    exportToCSV("donations", donations);
    toast.success("📊 Donations exported as CSV");
  }

  function printSummary() {
    const html = `<p><strong>Total Donations:</strong> ${totals.totalDonations}</p>
    <p><strong>Pending:</strong> ${totals.pending}</p>
    <p><strong>Active Volunteers:</strong> ${totals.activeVolunteers}</p>`;
    printHtml("FoodCare Summary Report", html);
    toast.success("🖨️ Summary sent to print");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            📈 Admin Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Monitor donations, volunteers, inventory & community impact 🌍
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={printSummary}
            className="inline-flex items-center gap-2 h-9 px-3 rounded-md border text-sm hover:bg-slate-50"
          >
            <FileText className="h-4 w-4" /> Print PDF
          </button>
          <button
            onClick={exportReport}
            className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={<HandHeart className="h-4 w-4" />}
          emoji="🎁"
          label="Donations Today"
          value={totals.donationsToday}
          trend="+4%"
        />
        <StatCard
          icon={<UsersIcon className="h-4 w-4" />}
          emoji="🤝"
          label="Active Volunteers"
          value={totals.activeVolunteers}
          trend="+2%"
        />
        <StatCard
          icon={<Truck className="h-4 w-4" />}
          emoji="🚚"
          label="Pending Deliveries"
          value={totals.pending}
          trend="-1%"
        />
        <StatCard
          icon={<TrendingUp className="h-4 w-4" />}
          emoji="📦"
          label="Total Donations"
          value={totals.totalDonations}
          trend="+12%"
        />
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Donations over time */}
        <ChartCard title="📊 Donations Over Time">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ stroke: "#e2e8f0" }} />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#2563eb"
                fill="url(#grad)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Status distribution */}
        <ChartCard title="📍 Donation Status">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={statusPie}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                innerRadius={56}
                paddingAngle={4}
              >
                {statusPie.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Roles */}
        <ChartCard title="🧑‍🤝‍🧑 Donors vs Volunteers">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={roleBars}>
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      {/* Recent donations + inventory */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-lg border bg-white p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center gap-1">
              🕒 Recent Donations
            </h3>
            <button
              onClick={() => toast.info("Filter panel coming soon")}
              className="text-sm text-primary hover:underline"
            >
              Filters
            </button>
          </div>
            {/* Donations in card format */}
            <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
      {donations.map((d) => (
        <div
          key={d.id}
          className="border rounded-lg p-4 bg-gradient-to-b from-white to-slate-50 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold text-slate-800 flex items-center gap-1">
              🎁 {d.donor}
            </div>
            <StatusBadge status={d.status} />
          </div>

          <div className="text-sm text-slate-600 mb-2 flex items-center gap-2">
            <Package className="h-4 w-4 text-slate-400" />
            {d.type}
          </div>

          <div className="flex justify-between items-end mt-2">
            <div className="text-xs text-slate-400 flex items-center gap-1">
              📅 {d.date}
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-slate-800">
                {d.quantity}
              </div>
              <div className="text-xs text-slate-500">items</div>
            </div>
          </div>
          
        </div>
      ))}
    </div>
  </div>
          
        </div>

        <div className="rounded-lg border bg-white p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-1">
            📦 Inventory Overview
          </h3>
          <ul className="space-y-2">
            {inventory.map((i) => (
              <li
                key={i.id}
                className="flex items-center justify-between py-1 border-b last:border-0"
              >
                <div className="flex items-center gap-2 text-slate-700">
                  <Package className="h-4 w-4 text-slate-500" /> {i.item}
                </div>
                <span className="text-sm font-medium text-slate-800">
                  {i.qty}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

/* ----- Reusable Components ----- */

function StatCard({ icon, label, value, trend, emoji }) {
  return (
    <div className="rounded-lg border bg-white p-4 hover:shadow-md transition-all">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-slate-500 text-sm flex items-center gap-1">
            {emoji} {label}
          </div>
          <div className="text-2xl font-bold mt-1">{value}</div>
        </div>
        <div className="h-9 w-9 rounded-md bg-primary/10 text-primary flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div
        className={`mt-3 text-xs ${
          trend.startsWith("-") ? "text-rose-600" : "text-emerald-600"
        }`}
      >
        {trend} vs last period
      </div>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="rounded-lg border bg-white p-4 hover:shadow-sm transition">
      <h3 className="font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    Pending: "bg-amber-100 text-amber-700",
    Collected: "bg-sky-100 text-sky-700",
    Distributed: "bg-emerald-100 text-emerald-700",
  };
  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${
        map[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}
