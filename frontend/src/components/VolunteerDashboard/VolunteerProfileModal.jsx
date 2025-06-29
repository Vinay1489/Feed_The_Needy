// 📁 volunteer-profile-examples.jsx (Horizontal layout version)

import React, { useState } from "react";

export default function VolunteerProfileModal() {
  const [isOpen, setIsOpen] = useState(false);

  const profile = {
    name: "Harsha Vardhan",
    phone: "9876543210",
    email: "harsha@example.com",
    city: "Warangal",
    photo: "https://www.w3schools.com/howto/img_avatar.png",
    volunteerId: "FTN-V1029",
    status: "Active",
    tasksCompleted: 12,
    mealsDelivered: 480,
    hoursVolunteered: 26,
    availability: "Weekends Only",
    totalLocationsCovered: 5,
    lastTask: "Food delivery to orphanage",
    feedbackScore: 4.8,
    badges: ["🥇 First Delivery", "🧡 Community Helper"],
    lastActive: "June 28, 2025",
    joinedOn: "Jan 10, 2025",
    idProof: "adhar_card.pdf",
  };

  return (
    <div className="relative">
      {/* Profile Icon */}
      <img
        src={profile.photo}
        alt="Profile"
        className="w-10 h-10 rounded-full cursor-pointer border"
        onClick={() => setIsOpen(true)}
      />

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[800px] shadow-xl relative">
            <button
              className="absolute top-2 right-3 text-gray-600 text-xl"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>

            <div className="flex gap-6">
              {/* Left side avatar */}
              <div className="flex flex-col items-center w-1/3">
                <img
                  src={profile.photo}
                  alt="Avatar"
                  className="w-28 h-28 rounded-full border mb-4"
                />
                <h2 className="text-xl font-bold text-center">
                  {profile.name}
                </h2>
                <p className="text-sm text-gray-600 mt-5">📍 {profile.city}</p>
                <p className="text-sm mt-5">📞 {profile.phone}</p>
              </div>

              {/* Right side details */}
              <div className="text-sm space-y-2 w-2/3">
                <div className="grid grid-cols-2 gap-4">
                  <p>
                    <strong>Email:</strong> {profile.email}
                  </p>
                  <p>
                    <strong>Volunteer ID:</strong> {profile.volunteerId}
                  </p>
                  <p>
                    <strong>Status:</strong> ✅ {profile.status}
                  </p>
                  <p>
                    <strong>ID Proof:</strong> 📄 {profile.idProof}
                  </p>
                  <p>
                    <strong>Availability:</strong> {profile.availability}
                  </p>
                  <p>
                    <strong>Locations Covered:</strong>{" "}
                    {profile.totalLocationsCovered}
                  </p>
                  <p>
                    <strong>Last Task:</strong> {profile.lastTask}
                  </p>
                  <p>
                    <strong>Feedback Score:</strong> ⭐ {profile.feedbackScore}
                    /5
                  </p>
                  <p>
                    <strong>Tasks Completed:</strong> {profile.tasksCompleted}
                  </p>
                  <p>
                    <strong>Meals Delivered:</strong> {profile.mealsDelivered}
                  </p>
                  <p>
                    <strong>Hours Volunteered:</strong>{" "}
                    {profile.hoursVolunteered} hrs
                  </p>
                  <p>
                    <strong>Last Active:</strong> {profile.lastActive}
                  </p>
                  <p>
                    <strong>Joined On:</strong> {profile.joinedOn}
                  </p>
                </div>

                <div className="mt-3">
                  <p>
                    <strong>Badges:</strong>
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {profile.badges.map((badge, index) => (
                      <span
                        key={index}
                        className="bg-yellow-100 px-2 py-1 rounded-full text-xs"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
