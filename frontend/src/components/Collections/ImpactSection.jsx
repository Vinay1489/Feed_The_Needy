"use client";
import React from "react";
import ImpactCard from "./ImpactCard";
import ProgressBar from "./ProgressBar";

const ImpactSection = () => {
  const impactData = [
    {
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/3d8599fd284c412782eeca09638fc945/ceb1c8a7848468ed354876c42209cd28d7d2d85f?placeholderIfAbsent=true",
      value: "563,125",
      title: "Meals Served",
      description:
        "Nutritious meals delivered to individuals and families in need",
    },
    {
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/3d8599fd284c412782eeca09638fc945/04345724dbf5ab2c6e335e5f5f476cb7ced75362?placeholderIfAbsent=true",
      value: "158K",
      title: "Kilograms Saved",
      description:
        "Food rescued from going to landfill and redirected to those in need",
    },
    {
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/3d8599fd284c412782eeca09638fc945/e6fc5106793d6528fe2ee97fd00d693bcc8f33bb?placeholderIfAbsent=true",
      value: "62K",
      title: "CO₂ Reduced",
      description:
        "Kilograms of carbon dioxide emissions prevented through waste reduction",
    },
  ];

  const progressData = [
    {
      label: "1 Million Meals",
      percentage: 76,
      width: 728,
    },
    {
      label: "250 Partner NGOs",
      percentage: 64,
      width: 613,
    },
    {
      label: "Zero Food Waste in 10 Cities",
      percentage: 32,
      width: 307,
    },
  ];

  return (
    <section className="flex flex-col justify-center items-center px-20 py-32 max-md:px-5 max-md:py-24">
      <div className="flex flex-col items-center w-full max-w-[1368px] max-md:max-w-full" id="impact">
        <h2 className="ml-7 text-5xl font-bold leading-none text-center text-slate-950 max-md:max-w-full max-md:text-4xl">
          Our Collective Impact
        </h2>
        <p className="mt-5 ml-7 text-lg leading-loose text-center text-slate-500 max-md:max-w-full">
          Together, we're making a measurable difference in reducing food waste
          and fighting hunger.
        </p>

        <div className="self-stretch mt-16 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            {impactData.map((item, index) => (
              <div key={index} className="w-[33%] max-md:ml-0 max-md:w-full">
                <ImpactCard
                  iconSrc={item.iconSrc}
                  value={item.value}
                  title={item.title}
                  description={item.description}
                />
              </div>
            ))}
          </div>
        </div>

        <article className="flex overflow-hidden flex-col px-8 py-9 mt-16 max-w-full rounded-xl border border-solid shadow-xl bg-white bg-opacity-30 border-white border-opacity-20 w-[1024px] max-md:px-5 max-md:mt-10">
          <h3 className="self-center ml-3.5 text-2xl font-bold leading-none text-center text-slate-950">
            Progress Toward 2025 Goals
          </h3>

          <div className="mt-8 space-y-7">
            {progressData.map((item, index) => (
              <ProgressBar
                key={index}
                label={item.label}
                percentage={item.percentage}
                width={item.width}
              />
            ))}
          </div>

          <p className="self-center mt-9 ml-3.5 text-sm leading-5 text-center text-slate-500 max-md:max-w-full">
            Help us reach our targets by getting involved as a donor, NGO
            partner,
            <br />
            or volunteer.
          </p>

          <div className="flex gap-4 self-center mt-5 max-w-full text-sm font-medium leading-none text-center w-[242px]">
            <button className="px-3.5 py-3.5 bg-blue-600 rounded-md text-slate-50">
              Donate Food
            </button>
            <button className="px-3.5 py-3.5 bg-white rounded-md border border-solid border-slate-200 text-slate-950">
              Join as Partner
            </button>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ImpactSection;
