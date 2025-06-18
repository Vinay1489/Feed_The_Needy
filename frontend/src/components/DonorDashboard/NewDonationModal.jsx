import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { ImSpinner2 } from "react-icons/im";

export default function NewDonationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    foodName: "",
    quantity: "",
    preparedAt: "",
    packaging: "",
    storage: "Room Temperature",
    location: "",
    predictedExpiry: "",
    ngoVerified: false,
    ingredients: "",
  });

  const [isPredicting, setIsPredicting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting donation:", formData);
    onClose();
  };

  const handlePredictExpiry = () => {
    setIsPredicting(true);
    setTimeout(() => {
      const mockExpiry = "4 hours from preparation time";
      setFormData((prev) => ({ ...prev, predictedExpiry: mockExpiry }));
      setIsPredicting(false);
    }, 3000);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen bg-black/40 px-4">
        <Dialog.Panel className="bg-white w-full max-w-3xl rounded-lg shadow-xl p-8 space-y-6">
          <Dialog.Title className="text-3xl font-bold text-center text-blue-800">
            🍲 New Food Donation
          </Dialog.Title>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <input
              type="text"
              name="foodName"
              value={formData.foodName}
              onChange={handleChange}
              placeholder="Food Name (e.g., Rice, Curry)"
              className="border px-4 py-2 rounded-md w-full"
              required
            />

            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantity (e.g., 5 kg or 10 packs)"
              className="border px-4 py-2 rounded-md w-full"
              required
            />

            <input
              type="datetime-local"
              name="preparedAt"
              value={formData.preparedAt}
              onChange={handleChange}
              className="border px-4 py-2 rounded-md w-full"
              required
            />

            <select
              name="packaging"
              value={formData.packaging}
              onChange={handleChange}
              className="border px-4 py-2 rounded-md w-full"
              required
            >
              <option value="">Select Packaging</option>
              <option value="Covered">Covered</option>
              <option value="Uncovered">Uncovered</option>
              <option value="Sealed Container">Sealed Container</option>
            </select>

            <select
              name="storage"
              value={formData.storage}
              onChange={handleChange}
              className="border px-4 py-2 rounded-md w-full"
            >
              <option value="Room Temperature">Room Temperature</option>
              <option value="Refrigerated">Refrigerated</option>
            </select>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Your Location / Area"
              className="border px-4 py-2 rounded-md w-full"
              required
            />

            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="List of Ingredients (e.g., rice, lentils, spices)"
              className="col-span-1 md:col-span-2 border px-4 py-2 rounded-md w-full"
              rows={3}
              required
            ></textarea>

            <div className="col-span-1 md:col-span-2 space-y-2">
              <button
                type="button"
                onClick={handlePredictExpiry}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-semibold transition"
                disabled={isPredicting}
              >
                {isPredicting ? (
                  <span className="flex items-center justify-center gap-2">
                    <ImSpinner2 className="animate-spin" />
                    Predicting...
                  </span>
                ) : (
                  "🔮 Predict Expiry"
                )}
              </button>

              {formData.predictedExpiry && (
                <div className="text-blue-700 bg-blue-100 border px-4 py-2 rounded-md text-center">
                  ⏳ Predicted Expiry: {formData.predictedExpiry}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="col-span-1 md:col-span-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
            >
              🚀 Submit Donation
            </button>
          </form>

          <button
            onClick={onClose}
            className="text-center text-sm text-gray-500 hover:underline block mx-auto"
          >
            Cancel
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
