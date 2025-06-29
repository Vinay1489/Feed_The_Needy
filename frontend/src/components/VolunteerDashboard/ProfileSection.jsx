"use client";
import React from "react";
import { BadgeCheck, MapPin, Clock, Calendar, ToggleRight } from "lucide-react";

const ProfileSection = () => {
  const [isAvailable, setIsAvailable] = React.useState(true);

  return (
    <section className="bg-white rounded-2xl shadow-xl p-6 h-full">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <BadgeCheck className="w-5 h-5 text-indigo-600 mr-2" />
          Volunteer Profile
        </h2>

        <button
          onClick={() => setIsAvailable(!isAvailable)}
          className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
            isAvailable
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          <ToggleRight
            className={`w-4 h-4 mr-1.5 ${
              isAvailable ? "text-green-600" : "text-gray-500"
            }`}
          />
          {isAvailable ? "Available" : "Not Available"}
        </button>
      </div>

      <div className="flex items-center mb-6">
        <div className="relative">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Volunteer profile"
            className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100"
          />
          <span
            className={`absolute bottom-0 right-0 w-4 h-4 ${
              isAvailable ? "bg-green-500" : "bg-red-500"
            } rounded-full border-2 border-white`}
          ></span>
        </div>
        <div className="ml-4">
          <h3 className="font-semibold text-gray-800">Sarah Johnson</h3>
          <p className="text-sm text-gray-600">Volunteer since Jan 2023</p>
          <div className="flex items-center mt-1">
            <div className="flex -space-x-1">
              {[1, 2, 3].map((badge) => (
                <div
                  key={badge}
                  className="w-5 h-5 rounded-full bg-indigo-100 border border-white flex items-center justify-center"
                >
                  <span className="text-[8px] text-indigo-600 font-bold">
                    ★
                  </span>
                </div>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-2">3 badges earned</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start">
          <MapPin className="w-5 h-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-gray-700">Service Area</h4>
            <p className="text-sm text-gray-600">
              Downtown & East Side (5 mile radius)
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Clock className="w-5 h-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-gray-700">Availability</h4>
            <p className="text-sm text-gray-600">
              Weekdays: 5PM-8PM, Weekends: 10AM-4PM
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Calendar className="w-5 h-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-gray-700">
              Next Scheduled
            </h4>
            <p className="text-sm text-gray-600">Tomorrow, 6:00 PM</p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-gray-100">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Stats</h4>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-indigo-50 rounded-lg p-2 text-center">
            <p className="text-xl font-semibold text-indigo-700">24</p>
            <p className="text-xs text-gray-600">Deliveries</p>
          </div>
          <div className="bg-indigo-50 rounded-lg p-2 text-center">
            <p className="text-xl font-semibold text-indigo-700">120</p>
            <p className="text-xs text-gray-600">Meals</p>
          </div>
          <div className="bg-indigo-50 rounded-lg p-2 text-center">
            <p className="text-xl font-semibold text-indigo-700">85</p>
            <p className="text-xs text-gray-600">kg Saved</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
