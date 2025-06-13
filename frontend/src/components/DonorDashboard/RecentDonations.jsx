import React from "react";
import DashboardCard from "./DashboardCard";
import StatusBadge from "./StatusBadge";

export default function RecentDonations() {
  const donations = [
    {
      date: "2025-04-10",
      item: "Cooked Meals",
      quantity: "20 packs",
      ngo: "Helping Hands",
      status: "delivered",
    },
    {
      date: "2025-03-28",
      item: "Vegetables",
      quantity: "15 kg",
      ngo: "Care NGO",
      status: "picked-up",
    },
  ];

  return (
    <DashboardCard>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Recent Donations
        </h2>
        <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm font-medium text-slate-500 dark:text-slate-400">
              <th className="pb-3">Date</th>
              <th className="pb-3">Food Item</th>
              <th className="pb-3">Quantity</th>
              <th className="pb-3">NGO Name</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {donations.map((donation, index) => (
              <tr
                key={index}
                className="border-t border-slate-200 dark:border-slate-700"
              >
                <td className="py-3">{donation.date}</td>
                <td className="py-3">{donation.item}</td>
                <td className="py-3">{donation.quantity}</td>
                <td className="py-3">{donation.ngo}</td>
                <td className="py-3">
                  <StatusBadge status={donation.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
}
