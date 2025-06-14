"use client";
import React from "react";
import VolunteerForm from "./VolunteerForm";
import BenefitsCard from "./BenefitsCard";
import BadgesCard from "./BadgesCard";

const Section = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-10 py-6 max-md:px-4 max-md:py-8 bg-emerald-100">
      <div className="flex flex-col items-center w-full max-w-[1368px] h-full max-md:max-w-full">
        {/* Title and Subtitle */}
        <h1 className="text-5xl font-bold text-center text-slate-950 max-md:text-4xl">
          Volunteer Connect
        </h1>
        <p className="mt-4 text-lg text-center text-slate-500 max-md:text-base">
          Join our community of food heroes and help deliver surplus food to
          those who need it most.
        </p>

        {/* Main Content - Form and Benefits */}
        <div className="flex flex-1 w-full gap-12 mt-10 max-md:flex-col max-md:gap-10">
          {/* Volunteer Form */}
          <div className="w-1/2 max-md:w-full">
            <VolunteerForm />
          </div>

          {/* Benefits and optional Badges */}
          <div className="w-1/2 flex flex-col items-center justify-center gap-6 max-md:w-full">
            <BenefitsCard />
            {/* <BadgesCard /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
