import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

export default function NewDonationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    foodName: "",
    quantity: "",
    preparedAt: "",
    packaging: "",
    storage: "Room Temperature",
    location: "",
    predictedExpiry: "", // for ML model
    ngoVerified: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // TODO: Call backend + ML model API to get expiry prediction
    // Then update predictedExpiry state with the response
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen p-4 bg-black/50">
        <Dialog.Panel className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 space-y-4">
          <Dialog.Title className="text-2xl font-bold text-center text-blue-700">
            🍲 New Donation Form
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="foodName"
              value={formData.foodName}
              onChange={handleChange}
              placeholder="Food Name (e.g., Rice, Curry)"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantity (e.g., 5 kg or 10 packs)"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />

            <label className="block text-sm font-semibold text-gray-700">
              ⏰ Prepared At:
              <input
                type="datetime-local"
                name="preparedAt"
                value={formData.preparedAt}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg"
                required
              />
            </label>

            <select
              name="packaging"
              value={formData.packaging}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              <option value="">Select Packaging</option>
              <option value="Covered">Covered</option>
              <option value="Uncovered">Uncovered</option>
              <option value="Sealed Container">Sealed Container</option>
            </select>

            <select
              name="storage"
              value={formData.storage}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="Room Temperature">Room Temperature</option>
              <option value="Refrigerated">Refrigerated</option>
            </select>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Your Location / Area"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />

            {/* 🔮 Expiry prediction output placeholder */}
            {formData.predictedExpiry && (
              <div className="bg-blue-100 border border-blue-300 text-blue-800 px-4 py-2 rounded-md">
                ⏳ Predicted Expiry: {formData.predictedExpiry}
              </div>
            )}

            {/* ✅ NGO Verification */}
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                name="ngoVerified"
                checked={formData.ngoVerified}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span>NGO verified the expiry and food condition</span>
            </label>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
            >
              🚀 Submit Donation
            </button>
          </form>

          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:underline text-center block mx-auto mt-2"
          >
            Cancel
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
