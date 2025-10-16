import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../../contexts/AuthContext";
import { ToastContainer } from "react-toastify";

export default function DonorSignup() {
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    Name: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    termsAgreed: false,
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  

  const evaluatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
    if (name === "password")
      setPasswordStrength(evaluatePasswordStrength(value));
  };

  const validate = () => {
    const newErrors = {};
    let valid = true;

    if (!formData.Name) {
      newErrors.Name = true;
      toast.error(" 🤝 Donor name is required.");
      valid = false;
    }
    if (!formData.contactPerson) {
      newErrors.contactPerson = true;
      toast.error("🧑 Contact person is required.");
      valid = false;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = true;
      toast.error("📧 Enter a valid email.");
      valid = false;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = true;
      toast.error("📱 Enter a 10-digit phone number.");
      valid = false;
    }
    if (!formData.address) {
      newErrors.address = true;
      toast.error("📍 Address is required.");
      valid = false;
    }
    if (formData.password.length < 6) {
      newErrors.password = true;
      toast.error("🔐 Password must be 6+ characters.");
      valid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = true;
      toast.error("❌ Passwords do not match.");
      valid = false;
    }
    if (!formData.termsAgreed) {
      newErrors.termsAgreed = true;
      toast.error("✅ Agree to terms & conditions.");
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const userData = {
          name: formData.Name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          password: formData.password,
          passwordConfirm: formData.confirmPassword,
          organizationName: formData.contactPerson,
        };
        
        await signup(userData, 'donor');
        navigate("/donorlogin/dashboard");
      } catch (error) {
        console.error('Signup error:', error);
      } finally {
        setLoading(false);
      }
    }
  };


  const strengthColors = [
    "bg-red-400",
    "bg-yellow-400",
    "bg-blue-400",
    "bg-green-500",
  ];
  const strengthLabels = ["Too Weak", "Weak", "Good", "Strong"];

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-100 p-6">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700">
          🍽️ Become a Food Donor
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="Name"
            placeholder="🤝 Donor Name"
            className={`p-2 border rounded ${
              errors.Name ? "animate-shake border-red-500" : ""
            }`}
            value={formData.Name}
            onChange={handleChange}
          />
          <input
            name="contactPerson"
            placeholder="👤 Contact Person"
            className={`p-2 border rounded ${
              errors.contactPerson ? "animate-shake border-red-500" : ""
            }`}
            value={formData.contactPerson}
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="📧 Email"
            className={`p-2 border rounded ${
              errors.email ? "animate-shake border-red-500" : ""
            }`}
            value={formData.email}
            onChange={handleChange}
          />
          <input
            name="phone"
            placeholder="📱 Phone"
            className={`p-2 border rounded ${
              errors.phone ? "animate-shake border-red-500" : ""
            }`}
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            name="address"
            placeholder="📍 Address"
            className={`p-2 border rounded col-span-2 ${
              errors.address ? "animate-shake border-red-500" : ""
            }`}
            value={formData.address}
            onChange={handleChange}
          />
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="🔒 Password"
              className={`p-2 border rounded w-full ${
                errors.password ? "animate-shake border-red-500" : ""
              }`}
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-sm text-blue-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
            {formData.password && (
              <>
                <div className="h-2 bg-gray-200 rounded mt-2">
                  <div
                    className={`h-2 ${
                      strengthColors[passwordStrength - 1]
                    } rounded`}
                    style={{ width: `${passwordStrength * 25}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Password strength:{" "}
                  {strengthLabels[passwordStrength - 1] || "Very Weak"}
                </p>
              </>
            )}
          </div>
          <div className="relative">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="🔁 Confirm Password"
              className={`p-2 border rounded w-full ${
                errors.confirmPassword ? "animate-shake border-red-500" : ""
              }`}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-sm text-blue-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <label className="col-span-2 flex items-center gap-2 text-sm text-gray-700">
            <input
              name="termsAgreed"
              type="checkbox"
              checked={formData.termsAgreed}
              onChange={handleChange}
              className={`${
                errors.termsAgreed ? "animate-shake border-red-500" : ""
              }`}
            />
            ✅ I agree to the{" "}
            <span className="text-blue-600 font-medium">
              Terms & Conditions
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating Account...
            </>
          ) : (
            "🚀 Create Donor Account"
          )}
        </button>

        <p className="text-center text-sm mt-3">
          Already have an account?{" "}
          <Link
            to="/donorlogin"
            className="text-blue-600 font-semibold underline"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
