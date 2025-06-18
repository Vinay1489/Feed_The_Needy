import React, { useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const ProfileSection = ({ user,onViewProfile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 text-sm text-gray-800 hover:text-blue-600 focus:outline-none"
      >
        {user.photo ? (
          <img
            src={user.photo}
            alt="User"
            className="w-8 h-8 rounded-full object-cover border border-gray-300"
          />
        ) : (
          <FaUserCircle size={32} className="text-gray-500" />
        )}
        <span>{user.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50 border">
          <ul className="text-sm text-gray-700">
            <li>
              <Link
                onClick={onViewProfile}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                👀view Profile
              </Link>
            </li>
            <li>
              <button
                onClick={() => setTimeout(()=>navigate("/"),3000)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                🚪 Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
