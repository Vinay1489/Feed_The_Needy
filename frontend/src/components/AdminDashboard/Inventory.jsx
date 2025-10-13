import React, { useState } from "react";
import { inventorySeed } from "../../data";
import { exportToCSV } from "../../exporter";
import { toast } from "sonner";

export default function Inventory() {
  const [items, setItems] = useState(inventorySeed);
  const [form, setForm] = useState({ item: "", qty: 0 });

  function updateQty(id, delta) {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, qty: Math.max(0, it.qty + delta) } : it
      )
    );
    const it = items.find((x) => x.id === id);
    if (it && it.qty + delta < 20) toast.warning(`${it.item} is low on stock`);
  }

  function saveNew(e) {
    e.preventDefault();
    if (!form.item || form.qty <= 0)
      return toast.error("Provide item and quantity");
    const id = Math.max(300, ...items.map((i) => i.id)) + 1;
    setItems((prev) => [
      ...prev,
      { id, item: form.item, qty: Number(form.qty) },
    ]);
    setForm({ item: "", qty: 0 });
    toast.success("Item added to inventory");
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast.success("Item removed");
  }

  function exportInventory() {
    exportToCSV("inventory", items);
    toast.success("Inventory exported");
  }

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            🍎 Food Inventory
          </h1>
          <p className="text-slate-500">
            Track stock and update levels as donations arrive or are
            distributed.
          </p>
        </div>
        <button
          onClick={exportInventory}
          className="h-10 px-5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 
                     text-slate-700 font-medium shadow-sm hover:shadow-md transition-all duration-300"
        >
          📦 Export CSV
        </button>
      </div>

      {/* Main content grid */}
      <div
        className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm 
                   shadow-lg p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all"
      >
        {/* Stock List */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-slate-700 flex items-center gap-2">
            📋 Current Stock
          </h3>
          <ul className="space-y-3">
            {items.map((i) => (
              <li
                key={i.id}
                className="flex items-center justify-between border border-slate-200 
                           bg-gradient-to-r from-white to-slate-50 rounded-xl p-3 shadow-sm hover:shadow-md 
                           transition-all duration-300"
              >
                <div>
                  <div className="font-medium text-slate-800">{i.item}</div>
                  <div className="text-sm text-slate-500">Qty: {i.qty}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(i.id, -1)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 
                               hover:bg-slate-100 active:scale-95 transition-all"
                  >
                    -
                  </button>
                  <button
                    onClick={() => updateQty(i.id, 1)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 
                               hover:bg-slate-100 active:scale-95 transition-all"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(i.id)}
                    className="px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 
                               active:scale-95 transition-all font-medium"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Add Item Form */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-slate-700 flex items-center gap-2">
            ➕ Add New Item
          </h3>
          <form
            onSubmit={saveNew}
            className="space-y-4 bg-gradient-to-b from-slate-50 to-white p-5 rounded-2xl 
                       border border-slate-200 shadow-sm"
          >
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-600">
                Item Name
              </label>
              <input
                value={form.item}
                onChange={(e) => setForm({ ...form, item: e.target.value })}
                placeholder="e.g. Rice, Canned Beans..."
                className="w-full h-10 px-3 rounded-md border border-slate-300 focus:outline-none 
                           focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-600">
                Quantity
              </label>
              <input
                type="number"
                value={form.qty}
                onChange={(e) =>
                  setForm({ ...form, qty: Number(e.target.value) })
                }
                placeholder="Enter quantity"
                className="w-full h-10 px-3 rounded-md border border-slate-300 focus:outline-none 
                           focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="h-10 px-6 rounded-lg bg-blue-600 text-white font-semibold 
                           hover:bg-blue-700 active:scale-95 shadow-md transition-all"
              >
                Add Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
