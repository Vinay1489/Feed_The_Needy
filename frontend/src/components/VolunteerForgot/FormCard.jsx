import React from "react";

export const FormCard = ({ title, children, className = "" }) => {
  return (
    <section
      className={`p-8 rounded-xl border border-solid shadow-xl backdrop-blur bg-white bg-opacity-30 border-white border-opacity-20 max-md:w-full max-md:max-w-[600px] max-sm:p-5 ${className}`}
    >
      <h2 className="mb-6 text-2xl font-bold text-slate-950">{title}</h2>
      {children}
    </section>
  );
};
