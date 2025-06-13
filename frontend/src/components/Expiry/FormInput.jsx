"use client";

import React from "react";

const FormInput = ({ label, placeholder, type = "text", className = "" }) => {
  return (
    <div className="w-full">
      <label className="self-start text-sm font-medium leading-none text-slate-950">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={`overflow-hidden p-3.5 mt-2.5 w-full bg-white rounded-md border border-solid border-slate-200 text-slate-500 text-sm ${className}`}
      />
    </div>
  );
};

export default FormInput;
