"use client";
import React from "react";

const ImpactCard = ({ iconSrc, value, title, description }) => {
  return (
    <article className="flex overflow-hidden flex-col grow items-center px-12 py-9 w-full font-bold text-center rounded-xl border border-solid shadow-xl bg-white bg-opacity-30 border-white border-opacity-20 text-slate-950 max-md:px-5 max-md:mt-8 max-md:max-w-full">
      <img
        src={iconSrc}
        alt={`${title} icon`}
        className="object-contain w-14 rounded-full aspect-square"
      />
      <h3 className="mt-7 text-4xl leading-none">{value}</h3>
      <h4 className="mt-6 text-xl leading-snug">{title}</h4>
      <p className="self-stretch mt-6 text-sm leading-5 text-slate-500">
        {description}
      </p>
    </article>
  );
};

export default ImpactCard;
