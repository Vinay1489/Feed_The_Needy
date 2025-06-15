import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTruck,
  FaCalendarAlt,
  FaLock,
} from "react-icons/fa";

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    transportMode: "",
    availability: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white shadow-md rounded-xl p-10 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-2 flex justify-center items-center gap-2">
          <span role="img" aria-label="volunteer">
            🚛
          </span>{" "}
          Volunteer Profile Setup
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Fill in your details below to register as a volunteer.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="flex items-center border rounded px-3 py-2">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center border rounded px-3 py-2">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center border rounded px-3 py-2">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center border rounded px-3 py-2">
            <FaPhone className="text-gray-400 mr-2" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center border rounded px-3 py-2">
            <FaMapMarkerAlt className="text-gray-400 mr-2" />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center border rounded px-3 py-2">
            <FaTruck className="text-gray-400 mr-2" />
            <select
              name="transportMode"
              value={formData.transportMode}
              onChange={handleChange}
              className="w-full outline-none bg-transparent"
            >
              <option value="">Select Transport Mode</option>
              <option value="bike">Bike</option>
              <option value="car">Car</option>
              <option value="van">Van</option>
              <option value="walk">Walk</option>
            </select>
          </div>

          <div className="flex items-center border rounded px-3 py-2">
            <FaCalendarAlt className="text-gray-400 mr-2" />
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="w-full outline-none bg-transparent"
            >
              <option value="">Availability</option>
              <option value="weekdays">Weekdays</option>
              <option value="weekends">Weekends</option>
              <option value="anytime">Anytime</option>
            </select>
          </div>

          <div className="flex items-center border rounded px-3 py-2">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center border rounded px-3 py-2 col-span-2">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full outline-none"
            />
          </div>

          <div className="col-span-2 flex items-center text-sm">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              className="mr-2"
            />
            <span>
              I agree to the{" "}
              <a href="#" className="text-blue-600 underline">
                terms and conditions
              </a>
            </span>
          </div>

          <button
            type="submit"
            className="col-span-2 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          >
            Submit Volunteer Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default VolunteerForm;
