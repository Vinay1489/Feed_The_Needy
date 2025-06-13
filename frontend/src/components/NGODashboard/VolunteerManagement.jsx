"use client";
import React, { useState } from "react";

function VolunteerManagement() {
  const [activeTab, setActiveTab] = useState("all"); // all, active, pending, inactive
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);

  // Sample data for volunteers
  const volunteers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "(555) 123-4567",
      location: "Downtown",
      transport: "Car",
      availability: "Weekends",
      status: "Active",
      deliveries: 24,
      joined: "3 months ago",
    },
    {
      id: 2,
      name: "Maria Lopez",
      email: "maria.lopez@example.com",
      phone: "(555) 234-5678",
      location: "Westside",
      transport: "Bicycle",
      availability: "Evenings",
      status: "Active",
      deliveries: 36,
      joined: "5 months ago",
    },
    {
      id: 3,
      name: "Alex Chen",
      email: "alex.chen@example.com",
      phone: "(555) 345-6789",
      location: "Northside",
      transport: "Car",
      availability: "Weekdays",
      status: "Active",
      deliveries: 18,
      joined: "2 months ago",
    },
    {
      id: 4,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "(555) 456-7890",
      location: "Eastside",
      transport: "Scooter",
      availability: "Weekends",
      status: "Pending",
      deliveries: 0,
      joined: "1 week ago",
    },
    {
      id: 5,
      name: "Michael Brown",
      email: "michael.b@example.com",
      phone: "(555) 567-8901",
      location: "Southside",
      transport: "Car",
      availability: "Flexible",
      status: "Inactive",
      deliveries: 12,
      joined: "6 months ago",
    },
    {
      id: 6,
      name: "Emily Wilson",
      email: "emily.w@example.com",
      phone: "(555) 678-9012",
      location: "Downtown",
      transport: "Public Transit",
      availability: "Weekdays",
      status: "Pending",
      deliveries: 0,
      joined: "2 weeks ago",
    },
    {
      id: 7,
      name: "David Lee",
      email: "david.lee@example.com",
      phone: "(555) 789-0123",
      location: "Westside",
      transport: "Car",
      availability: "Evenings",
      status: "Active",
      deliveries: 8,
      joined: "1 month ago",
    },
  ];

  // Filter volunteers based on active tab and search term
  const filteredVolunteers = volunteers.filter((volunteer) => {
    const matchesTab =
      activeTab === "all" || volunteer.status.toLowerCase() === activeTab;
    const matchesSearch =
      volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Handle checkbox selection
  const handleSelectVolunteer = (volunteerId) => {
    if (selectedVolunteers.includes(volunteerId)) {
      setSelectedVolunteers(
        selectedVolunteers.filter((id) => id !== volunteerId)
      );
    } else {
      setSelectedVolunteers([...selectedVolunteers, volunteerId]);
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedVolunteers.length === filteredVolunteers.length) {
      setSelectedVolunteers([]);
    } else {
      setSelectedVolunteers(filteredVolunteers.map((v) => v.id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">
          Volunteer Management
        </h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-600 hover:bg-slate-50 transition-colors">
            Export List
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors">
            Add Volunteer
          </button>
        </div>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex space-x-1 bg-white rounded-lg border border-slate-200 p-1">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === "all"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            All Volunteers
          </button>
          <button
            onClick={() => setActiveTab("active")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === "active"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === "pending"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setActiveTab("inactive")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === "inactive"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Inactive
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search volunteers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full md:w-64 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-slate-400 absolute left-3 top-2.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedVolunteers.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-4 flex items-center justify-between">
          <p className="text-sm text-blue-700">
            <span className="font-medium">{selectedVolunteers.length}</span>{" "}
            volunteer{selectedVolunteers.length !== 1 ? "s" : ""} selected
          </p>
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm text-slate-600 hover:bg-slate-50 transition-colors">
              Send Message
            </button>
            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm text-slate-600 hover:bg-slate-50 transition-colors">
              Assign Task
            </button>
            <button className="px-3 py-1.5 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors">
              Deactivate
            </button>
          </div>
        </div>
      )}

      {/* Volunteers Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                <th className="px-4 py-3 border-b border-slate-200">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={
                        selectedVolunteers.length ===
                          filteredVolunteers.length &&
                        filteredVolunteers.length > 0
                      }
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    />
                  </div>
                </th>
                <th className="px-4 py-3 border-b border-slate-200">
                  Volunteer
                </th>
                <th className="px-4 py-3 border-b border-slate-200">Contact</th>
                <th className="px-4 py-3 border-b border-slate-200">
                  Location
                </th>
                <th className="px-4 py-3 border-b border-slate-200">
                  Transport
                </th>
                <th className="px-4 py-3 border-b border-slate-200">
                  Availability
                </th>
                <th className="px-4 py-3 border-b border-slate-200">Status</th>
                <th className="px-4 py-3 border-b border-slate-200">
                  Deliveries
                </th>
                <th className="px-4 py-3 border-b border-slate-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVolunteers.map((volunteer) => (
                <tr key={volunteer.id} className="hover:bg-slate-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedVolunteers.includes(volunteer.id)}
                      onChange={() => handleSelectVolunteer(volunteer.id)}
                      className="h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                        {volunteer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-slate-800">
                          {volunteer.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          Joined {volunteer.joined}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <p className="text-sm text-slate-600">{volunteer.email}</p>
                    <p className="text-xs text-slate-500">{volunteer.phone}</p>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">
                    {volunteer.location}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">
                    {volunteer.transport}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">
                    {volunteer.availability}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        volunteer.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : volunteer.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-slate-100 text-slate-800"
                      }`}
                    >
                      {volunteer.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">
                    {volunteer.deliveries}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        View
                      </button>
                      <button className="text-slate-600 hover:text-slate-800">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredVolunteers.length === 0 && (
          <div className="py-12 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-slate-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <p className="mt-4 text-slate-500">
              No volunteers found matching your criteria
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="px-4 py-3 flex items-center justify-between border-t border-slate-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="px-4 py-2 border border-slate-200 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50">
              Previous
            </button>
            <button className="ml-3 px-4 py-2 border border-slate-200 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{filteredVolunteers.length}</span>{" "}
                of{" "}
                <span className="font-medium">{filteredVolunteers.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-200 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50">
                  <span className="sr-only">Previous</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-slate-200 bg-blue-50 text-sm font-medium text-blue-600">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-200 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50">
                  <span className="sr-only">Next</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VolunteerManagement;
