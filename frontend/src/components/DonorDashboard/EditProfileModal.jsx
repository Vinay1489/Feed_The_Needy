import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FaUser, FaEnvelope, FaCamera } from "react-icons/fa";

const EditProfileModal = ({ isOpen, onClose, currentProfile, onSave }) => {
  const [profile, setProfile] = useState(
    currentProfile || {
      name: "",
      email: "",
      photo: null,
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfile({ ...profile, photo: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(profile);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <div className="min-h-screen bg-black/50 flex items-center justify-center px-4">
        <Dialog.Panel className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 space-y-4">
          <Dialog.Title className="text-2xl font-bold text-blue-700 text-center">
            ✏️ Edit Profile
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Profile Picture */}
            <div className="flex items-center justify-center relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border border-gray-300">
                {profile.photo ? (
                  <img
                    src={URL.createObjectURL(profile.photo)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <FaUser size={40} />
                  </div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer">
                <FaCamera />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Name Input */}
            <label className="block">
              <span className="text-gray-700 font-medium">👤 Name</span>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </label>

            {/* Email Input */}
            <label className="block">
              <span className="text-gray-700 font-medium">📧 Email</span>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </label>

            {/* Submit */}
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditProfileModal;
