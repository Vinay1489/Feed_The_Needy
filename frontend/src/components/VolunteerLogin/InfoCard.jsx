"use client";
import React from "react";

const InfoCard = () => {
  return (
    <div className="flex items-start justify-center h-full">
      <section className="mt-16 flex flex-col p-6 w-full max-w-md rounded-xl border border-solid shadow-xl bg-white bg-opacity-30 border-white border-opacity-20 max-md:px-5">
        <div className="flex flex-wrap gap-5 justify-between items-start">
          <div className="flex flex-col mt-1.5">
            <h2 className="text-xl font-bold leading-snug text-slate-950">
              Welcome Back!
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              Continue making a difference in your community
            </p>
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3d8599fd284c412782eeca09638fc945/2cab94ea3ca3b07042bef85a46af335f88493ea8?placeholderIfAbsent=true"
            alt="welcome icon"
            className="object-contain shrink-0 w-10 aspect-square"
          />
        </div>

        <div className="mt-8 space-y-6">
          <div className="flex items-center gap-3">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3d8599fd284c412782eeca09638fc945/25f1494c04e95f7c64ac6f8fac5837bf063d4c94?placeholderIfAbsent=true"
              alt="impact icon"
              className="object-contain w-10 rounded-full aspect-square"
            />
            <div>
              <h3 className="text-base font-medium text-slate-950">
                Track Your Impact
              </h3>
              <p className="text-xs text-slate-500">
                See your contribution statistics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3d8599fd284c412782eeca09638fc945/e11e4584b389ea20dffe356f86f9e0d4fad94ffa?placeholderIfAbsent=true"
              alt="schedule icon"
              className="object-contain w-10 rounded-full aspect-square"
            />
            <div>
              <h3 className="text-base font-medium text-slate-950">
                View Schedule
              </h3>
              <p className="text-xs text-slate-500">
                Check your upcoming deliveries
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3d8599fd284c412782eeca09638fc945/2bab73d18397aa2a0017d10fc505ea3d6a1a5bbe?placeholderIfAbsent=true"
              alt="rewards icon"
              className="object-contain w-10 rounded-full aspect-square"
            />
            <div>
              <h3 className="text-base font-medium text-slate-950">
                Earn Rewards
              </h3>
              <p className="text-xs text-slate-500">
                Unlock new badges and achievements
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfoCard;
