import React from "react";

const donations = [
  {
    id: 1,
    date: "2025-06-10",
    items: [
      { name: "Cooked Food", quantity: 10 },
      { name: "Water Bottles", quantity: 5 },
    ],
    status: "Delivered",
  },
  {
    id: 2,
    date: "2025-06-15",
    items: [{ name: "Dry Ration Pack", quantity: 3 }],
    status: "Pending",
  },
];

const RecentDonations = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center md:text-left">
        📦 Recent Donations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {donations.map((donation) => (
          <div
            key={donation.id}
            className="bg-white shadow-md rounded-xl p-4 border-l-4 border-blue-500"
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
    </div>
  );
};

export default RecentDonations;
