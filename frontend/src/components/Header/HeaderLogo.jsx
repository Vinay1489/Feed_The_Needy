import React from "react";

const HeaderLogo = () => {
  return (
    <div className="flex items-center gap-2 pr-16">
      <img
        src="/logo.png"
        alt="Feed The Needy Logo"
        className="w-12 h-12 object-contain rounded-full bg-white"
      />
      <h1 className="text-xl font-bold leading-7 text-slate-950 max-sm:text-lg">
        FeedTheNeedy
      </h1>
    </div>
  );
};

export default HeaderLogo;
