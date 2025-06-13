import React from "react";

export const PageHeader = ({ title, description }) => {
  return (
    <header className="mb-10 text-center max-sm:mb-6">
      <h1 className="mb-4 text-5xl font-bold text-slate-950 max-sm:text-3xl">
        {title}
      </h1>
      <p className="mx-auto my-0 text-lg leading-7 max-w-[800px] text-slate-500 max-sm:text-base">
        {description}
      </p>
    </header>
  );
};
