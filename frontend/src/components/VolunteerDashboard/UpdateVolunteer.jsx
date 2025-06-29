// 📁 UpdateVolunteer.jsx (Simplified with only name, phone, email, city)

import React, { useState } from "react";

const UpdateVolunteer = ({ profile, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: profile.name,
    phone: profile.phone,
    email: profile.email,
    city: profile.city,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[500px] shadow-xl relative">
        <button
          className="absolute top-2 right-3 text-gray-600 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">Update Volunteer Info</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-2 rounded w-full"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="border p-2 rounded w-full"
          />

          <div className="text-right">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateVolunteer;
