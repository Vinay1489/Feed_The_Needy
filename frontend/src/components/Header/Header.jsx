"use client";
import React from "react";
import HeaderLogo from "./HeaderLogo";
import HeaderNavigation from "./HeaderNavigation";
import HeaderControls from "./HeaderControls";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-20 h-20 bg-white max-md:px-10 max-sm:px-4">
      <HeaderLogo />
      <div className="flex-1 flex justify-center">
        <HeaderNavigation />
      </div>
      <HeaderControls />
    </header>
  );
};

export default Header;
