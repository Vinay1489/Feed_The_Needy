"use client";
import React, { useState } from "react";

function PickupForm({ onSubmit, onCancel, initialData }) {
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      location: "",
      destination: "",
      date: "",
      time: "",
      status: "pending",
      foodType: "",
      quantity: "",
      volunteer: "Unassigned",
      recurring: "",
      notes: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Pickup Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="E.g., Restaurant Surplus Collection"
            className="w-full px-3.5 py-3 bg-white rounded-md border border-solid border-slate-200 text-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Pickup Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-3.5 py-3 bg-white rounded-md border border-solid border-slate-200 text-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="time"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Pickup Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full px-3.5 py-3 bg-white rounded-md border border-solid border-slate-200 text-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Pickup Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Full address of pickup location"
            className="w-full px-3.5 py-3 bg-white rounded-md border border-solid border-slate-200 text-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="destination"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Destination
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
            placeholder="Where food will be delivered"
            className="w-full px-3.5 py-3 bg-white rounded-md border border-solid border-slate-200 text-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="foodType"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Food Type
          </label>
          <input
            type="text"
            id="foodType"
            name="foodType"
            value={formData.foodType}
            onChange={handleChange}
            required
            placeholder="E.g., Produce, Bakery, Prepared meals"
            className="w-full px-3.5 py-3 bg-white rounded-md border border-solid border-slate-200 text-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Estimated Quantity
          </label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            placeholder="E.g., 15kg, 3 crates"
            className="w-full px-3.5 py-3 bg-white rounded-md border border-solid border-slate-200 text-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="volunteer"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Assign Volunteer (Optional)
          </label>
          <select
            id="volunteer"
            name="volunteer"
            value={formData.volunteer}
            onChange={handleChange}
            className="w-full px-3.5 py-3 bg-white rounded-md border border-solid border-slate-200 text-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="Unassigned">Unassigned</option>
            <option value="John Doe">John Doe</option>
            <option value="Sarah Johnson">Sarah Johnson</option>
            <option value="Michael Brown">Michael Brown</option>
            <option value="Emily Davis">Emily Davis</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="recurring"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Recurring Schedule (Optional)
          </label>
          <select
            id="recurring"
            name="recurring"
            value={formData.recurring}
            onChange={handleChange}
            className="w-full px-3.5 py-3 bg-white rounded-md border border-solid border-slate-200 text-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">One-time pickup</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Bi-weekly">Bi-weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            placeholder="Any special instructions or details about the pickup"
            className="w-full px-3.5 py-3 bg-white rounded-md border border-solid border-slate-200 text-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          ></textarea>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-white border border-slate-200 rounded-md text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Schedule Pickup
        </button>
      </div>
    </form>
  );
}

export default PickupForm;
