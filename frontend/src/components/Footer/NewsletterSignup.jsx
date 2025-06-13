"use client";
import React, { useState } from "react";

function NewsletterSignup() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup logic here
    console.log("Newsletter signup with email:", email);
    setEmail("");
  };

  return (
    <div className="w-full">
      <h4 className="mt-8 font-medium leading-none text-slate-950">
        Stay updated with our newsletter
      </h4>
      <form onSubmit={handleSubmit} className="flex gap-2 self-stretch mt-2.5">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="overflow-hidden px-3.5 py-4 bg-white rounded-md border border-solid border-slate-200 text-slate-500 flex-grow"
          required
        />
        <button
          type="submit"
          className="self-start px-3.5 py-3.5 font-medium leading-none text-center bg-blue-600 rounded-md text-slate-50 hover:bg-blue-700 transition-colors"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default NewsletterSignup;
