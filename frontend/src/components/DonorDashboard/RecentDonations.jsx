import React, { useState } from "react";

// ⬇️ Static donation data with extra info
const donations = [
  {
    id: 1,
    date: "2025-06-10",
    donorName: "Rahul Sharma",
    location: "Hyderabad",
    deliveryTime: "10:30 AM",
    modeOfTransport: "Bike",
    volunteerAssigned: "Anjali",
    notes: "Delivered to shelter near Banjara Hills.",
    items: [
      { name: "Cooked Food", quantity: 10 },
      { name: "Water Bottles", quantity: 5 },
    ],
    status: "Delivered",
  },
  {
    id: 2,
    date: "2025-06-15",
    donorName: "Sneha Rao",
    location: "Secunderabad",
    deliveryTime: "Pending",
    modeOfTransport: "Auto",
    volunteerAssigned: "Not Assigned",
    notes: "Delivery planned by tomorrow morning.",
    items: [{ name: "Dry Ration Pack", quantity: 3 }],
    status: "Pending",
  },
];

const RecentDonations = () => {
  const [selectedDonation, setSelectedDonation] = useState(null);

  const openModal = (donation) => {
    setSelectedDonation(donation);
  };

  const closeModal = () => {
    setSelectedDonation(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center md:text-left">
        📦 Recent Donations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {donations.map((donation) => (
          <div
            key={donation.id}
            className="bg-white shadow-md rounded-xl p-4 border-l-4 border-blue-500 cursor-pointer hover:shadow-lg transition"
            onClick={() => openModal(donation)}
          >
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              🗓️ {donation.date}
            </h3>
            <div className="mb-2">
              <p className="text-sm text-gray-600 font-medium">
                Items Donated:
              </p>
              <ul className="list-disc pl-5 text-gray-700 text-sm">
                {donation.items.map((item, index) => (
                  <li key={index}>
                    {item.name} — {item.quantity}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm mt-1">
              🚚 Status:{" "}
              <span
                className={`font-semibold ${
                  donation.status === "Delivered"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {donation.status}
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 relative shadow-xl">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-lg"
              onClick={closeModal}
            >
              ✖
            </button>
            <h3 className="text-xl font-bold mb-3 text-blue-700">
              Donation Details
            </h3>
            <p className="text-sm mb-1">📅 Date: {selectedDonation.date}</p>
            <p className="text-sm mb-1">
              🙋 Donor: {selectedDonation.donorName}
            </p>
            <p className="text-sm mb-1">
              📍 Location: {selectedDonation.location}
            </p>
            <p className="text-sm mb-1">
              🕒 Delivery Time: {selectedDonation.deliveryTime}
            </p>
            <p className="text-sm mb-1">
              🚗 Transport: {selectedDonation.modeOfTransport}
            </p>
            <p className="text-sm mb-1">
              👤 Volunteer: {selectedDonation.volunteerAssigned}
            </p>

            <p className="text-sm font-semibold mt-3">Items:</p>
            <ul className="list-disc ml-6 text-sm text-gray-700">
              {selectedDonation.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} — {item.quantity}
                </li>
              ))}
            </ul>

            <p className="mt-3 text-sm font-medium">
              🚚 Status:{" "}
              <span
                className={`font-semibold ${
                  selectedDonation.status === "Delivered"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {selectedDonation.status}
              </span>
            </p>

            {selectedDonation.notes && (
              <p className="mt-2 text-sm text-gray-600 italic">
                📝 Notes: {selectedDonation.notes}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentDonations;
