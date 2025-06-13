"use client";
import React, { useState } from "react";
import {
  QrCode,
  Bot,
  MapPin,
  Camera,
  MessageCircle,
  Route,
  Globe,
  AlertTriangle,
} from "lucide-react";

const ActionButton = ({ icon, label, color, onClick, isEmergency = false }) => {
  const Icon = icon;

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 rounded-xl ${
        isEmergency
          ? "bg-red-600 text-white"
          : `${color} text-gray-800 hover:shadow-md transition-shadow`
      }`}
    >
      <Icon className={`w-6 h-6 ${isEmergency ? "text-white" : ""}`} />
      <span
        className={`mt-2 text-sm font-medium ${
          isEmergency ? "text-white" : ""
        }`}
      >
        {label}
      </span>
    </button>
  );
};

const ActionButtons = () => {
  const [showQrScanner, setShowQrScanner] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const languages = ["English", "Hindi", "Telugu", "Spanish", "French"];
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
        <ActionButton
          icon={QrCode}
          label="Scan QR"
          color="bg-indigo-100"
          onClick={() => setShowQrScanner(true)}
        />
        <ActionButton icon={Bot} label="Smart Task" color="bg-blue-100" />
        <ActionButton icon={MapPin} label="View Map" color="bg-green-100" />
        <ActionButton
          icon={Camera}
          label="Upload Photo"
          color="bg-purple-100"
        />
        <ActionButton
          icon={MessageCircle}
          label="Support Chat"
          color="bg-yellow-100"
        />
        <ActionButton icon={Route} label="Optimize Route" color="bg-cyan-100" />
        <ActionButton
          icon={Globe}
          label="Language"
          color="bg-gray-100"
          onClick={() => setShowLanguageSelector(true)}
        />
        <ActionButton
          icon={AlertTriangle}
          label="Emergency SOS"
          color=""
          isEmergency={true}
          onClick={() => setShowEmergencyModal(true)}
        />
      </div>

      {/* QR Scanner Modal */}
      {showQrScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <QrCode className="w-5 h-5 text-indigo-600 mr-2" />
              QR Code Scanner
            </h3>
            <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center mb-4">
              <div className="text-center">
                <QrCode className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Position QR code in this area</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Scan the QR code at pickup and delivery locations to confirm your
              task.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowQrScanner(false)}
                className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
              >
                Cancel
              </button>
              <button className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium">
                Confirm Scan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Emergency SOS Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-red-600 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
              Emergency Assistance
            </h3>
            <p className="text-gray-700 mb-4">
              Are you sure you want to trigger an emergency alert? This will
              notify our support team immediately.
            </p>
            <div className="bg-red-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-red-700">
                Use this only in case of an emergency situation that requires
                immediate assistance.
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
              >
                Cancel
              </button>
              <button className="flex-1 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium">
                Confirm SOS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Language Selector Modal */}
      {showLanguageSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Globe className="w-5 h-5 text-indigo-600 mr-2" />
              Select Language
            </h3>
            <div className="space-y-2 mb-4">
              {languages.map((language) => (
                <button
                  key={language}
                  onClick={() => setSelectedLanguage(language)}
                  className={`w-full text-left px-4 py-3 rounded-lg ${
                    selectedLanguage === language
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {language}
                </button>
              ))}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowLanguageSelector(false)}
                className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowLanguageSelector(false)}
                className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;
