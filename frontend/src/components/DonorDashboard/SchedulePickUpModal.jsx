import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

export default function SchedulePickupModal({
  isOpen,
  onClose,
//   donations = [],
}) {
  const [formData, setFormData] = useState({
    pickupDateTime: "",
    pickupLocation: "",
    assignedVolunteer: "",
    specialInstructions: "",
    donationId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("🚚 Scheduling Pickup:", formData);

    // ✅ TODO: Make API call to schedule pickup
    // Example: await axios.post("/api/pickups", formData);

    onClose(); // Close modal after submission
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
            📦 Schedule Food Pickup
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Date & Time */}
            <label className="block text-sm font-medium text-gray-700">
              📅 Pickup Date & Time
              <input
                type="datetime-local"
                name="pickupDateTime"
                value={formData.pickupDateTime}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg"
                required
              />
            </label>

            {/* Pickup Location */}
            <label className="block text-sm font-medium text-gray-700">
              🗺️ Pickup Location / Landmark
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                placeholder="E.g., Near City Hospital"
                className="w-full mt-1 px-4 py-2 border rounded-lg"
                required
              />
            </label>

            {/* Select Donation */}
            <label className="block text-sm font-medium text-gray-700">
              🍲 Select Donation
              <select
                name="donationId"
                value={formData.donationId}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg"
                required
              >
                <option value="">-- Select --</option>
                {/* {donations.map((donation) => (
                  <option key={donation._id} value={donation._id}>
                    {donation.foodName} - {donation.quantity}
                  </option>
                ))} */}
              </select>
            </label>

            {/* Assign Volunteer */}


            {/* Special Instructions */}
            <label className="block text-sm font-medium text-gray-700">
              📝 Special Instructions
              <textarea
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleChange}
                placeholder="E.g., call before pickup, guard at gate, etc."
                className="w-full mt-1 px-4 py-2 border rounded-lg"
              />
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
            >
              ✅ Confirm Pickup Schedule
            </button>
          </form>

          {/* Cancel */}
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:underline text-center block mx-auto mt-2"
          >
            ❌ Cancel
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
