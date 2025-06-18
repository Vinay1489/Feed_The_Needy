import React from "react";
import { Dialog } from "@headlessui/react";
import { FaUserCircle } from "react-icons/fa";

const ViewProfileModal = ({ isOpen, onClose, user }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Centered Panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 space-y-6">
          {/* Title */}
          <Dialog.Title className="text-2xl block font-bold text-gray-800 text-center">
            👤 View Profile
          </Dialog.Title>

          {/* Avatar + Name */}
          <div className="flex flex-col items-center space-y-2">
            {user?.photo ? (
              <img
                src={user.photo}
                alt="User Avatar"
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
              />
            ) : (
              <FaUserCircle size={80} className="text-gray-400" />
            )}
            <h2 className="text-xl font-semibold text-gray-800">
              {user?.name || "No Name"}
            </h2>
          </div>

          {/* Profile Info */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                📧 Email
              </label>
              <p className="text-base text-gray-800">
                {user?.email || "Not provided"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                📞 Phone
              </label>
              <p className="text-base text-gray-800">
                {user?.phone || "Not provided"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                📍 Location
              </label>
              <p className="text-base text-gray-800">
                {user?.location || "Not provided"}
              </p>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ViewProfileModal;
