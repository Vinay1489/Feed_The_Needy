import React, { useState } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { Link } from "react-router-dom";

const VolunteerForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [transport, setTransport] = useState("");
  const [availability, setAvailability] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!location.trim()) newErrors.location = "Location is required";
    if (!transport) newErrors.transport = "Please select transport";
    if (!availability) newErrors.availability = "Please select availability";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!termsAccepted) newErrors.termsAccepted = "You must accept the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted");
      // handle actual submission
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-8 mx-auto w-full max-w-5xl text-sm rounded-2xl shadow-xl bg-white border border-blue-200"
    >
      <h2 className="col-span-1 md:col-span-2 text-3xl font-bold text-blue-800 mb-1 text-center">
        🚚 Volunteer Registration
      </h2>

      <div className="w-full">
        <FormInput
          label="👤 First Name"
          placeholder="Your first name"
          className="w-full"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.firstName && (
          <p className="text-red-600 text-xs">{errors.firstName}</p>
        )}
      </div>

      <div className="w-full">
        <FormInput
          label="👤 Last Name"
          placeholder="Your last name"
          className="w-full"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.lastName && (
          <p className="text-red-600 text-xs">{errors.lastName}</p>
        )}
      </div>

      <div className="w-full">
        <FormInput
          label="📧 Email Address"
          placeholder="you@example.com"
          type="email"
          className="w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-red-600 text-xs">{errors.email}</p>}
      </div>

      <div className="w-full">
        <FormInput
          label="📱 Phone Number"
          placeholder="Your phone number"
          type="tel"
          className="w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {errors.phone && <p className="text-red-600 text-xs">{errors.phone}</p>}
      </div>

      <div className="col-span-1 md:col-span-2">
        <label className="block font-medium text-slate-800 mb-1">
          📍 Your Location
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Enter your location"
            className="flex-1 px-4 py-2 rounded-md border border-slate-300 text-slate-800 bg-white"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3d8599fd284c412782eeca09638fc945/a789c5cba3ccb317e0abebd77f985f8820cb57ba?placeholderIfAbsent=true"
            alt="Location icon"
            className="w-9 h-9 object-contain hover:scale-110 transition-transform duration-200 cursor-pointer"
          />
        </div>
        {errors.location && (
          <p className="text-red-600 text-xs mt-1">{errors.location}</p>
        )}
      </div>

      <div className="w-full">
        <FormSelect
          label="🚲 Mode of Transport"
          placeholder="Select transport"
          className="w-full"
          options={["Bicycle", "Motorcycle/Scooter", "Car", "Van"]}
          value={transport}
          onChange={(e) => setTransport(e.target.value)}
        />
        {errors.transport && (
          <p className="text-red-600 text-xs">{errors.transport}</p>
        )}
      </div>

      <div className="w-full">
        <FormSelect
          label="🕒 Availability"
          placeholder="Select when you're available"
          className="w-full"
          options={[
            "Weekdays - Morning",
            "Weekdays - Evening",
            "Weekends - Morning",
            "Weekends - Evening",
          ]}
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        />
        {errors.availability && (
          <p className="text-red-600 text-xs">{errors.availability}</p>
        )}
      </div>

      <div className="w-full">
        <FormInput
          label="🔒 Password"
          placeholder="Enter password"
          type="password"
          className="w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="text-red-600 text-xs">{errors.password}</p>
        )}
      </div>

      <div className="w-full">
        <FormInput
          label="🔒 Confirm Password"
          placeholder="Re-enter password"
          type="password"
          className="w-full"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && (
          <p className="text-red-600 text-xs">{errors.confirmPassword}</p>
        )}
      </div>

      <div className="col-span-1 md:col-span-2 mt-1">
        <label className="flex items-center gap-2 text-slate-800 text-sm cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 border border-blue-600 rounded"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <span>
            I agree to the{" "}
            <span className="underline text-blue-600">Volunteer Terms</span>
          </span>
        </label>
        {errors.termsAccepted && (
          <p className="text-red-600 text-xs mt-1">{errors.termsAccepted}</p>
        )}
      </div>

      <div className="col-span-1 md:col-span-2 text-center text-sm text-slate-700">
        Already have an account?{" "}
        <Link
          to="/volunteerlogin"
          className="text-blue-600 font-semibold hover:underline"
        >
          Sign in here
        </Link>
      </div>

      <div className="col-span-1 md:col-span-2">
        <button
          type="submit"
          className="w-full px-6 py-2.5 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
        >
          📝 Join as Volunteer
        </button>
      </div>
    </form>
  );
};

export default VolunteerForm;
