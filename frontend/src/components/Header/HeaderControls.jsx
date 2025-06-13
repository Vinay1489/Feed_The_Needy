"use client";
import React from "react";
//import ThemeToggle from "./ThemeToggle";
import { Link } from "react-router-dom";

const HeaderControls = () => {
  return (
    <div className="flex gap-4 items-center max-sm:gap-2">
      {/* <ThemeToggle /> */}
      <LoginButton />
      <DonateButton />
    </div>
  );
};

const LoginButton = () => {
  return (
    <button className="px-4 py-3 text-sm font-medium leading-5 bg-blue-600 rounded-md cursor-pointer text-slate-50 hover:bg-blue-700 transition-colors duration-200 max-sm:px-3 max-sm:py-2 max-sm:text-xs">
      <Link to="/ngologin"> NGO Login</Link>
    </button>
  );
};

const DonateButton = () => {
  return (
    <button className="px-4 py-3 text-sm font-medium leading-5 bg-white rounded-md border border-solid cursor-pointer border-slate-200 text-slate-950 hover:bg-slate-50 hover:border-slate-300 transition-colors duration-200 max-sm:px-3 max-sm:py-2 max-sm:text-xs">
      <Link to="/donorsignup"> Donate Food</Link>
    </button>
  );
};

export default HeaderControls;
