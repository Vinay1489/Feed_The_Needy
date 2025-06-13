"use client";
import React from "react";
import TestimonialCarousel from "./TestimonialCarousel";
import StatisticsGrid from "./StatisticsGrid";

function VoicesOfImpact() {
  return (
    <section className="flex flex-col items-center px-6 w-full bg-white" id="testimonials">
      <div className="flex flex-col gap-12 items-center py-12 w-full max-w-screen-lg">
        <header className="flex flex-col gap-4 items-center text-center">
          <h2 className="text-5xl font-bold text-slate-950 max-md:text-4xl max-sm:text-3xl">
            Voices of Impact
          </h2>
          <p className="text-lg text-slate-500 max-md:text-base max-sm:text-sm">
            Hear from the donors, volunteers, and partners who are making a
            difference.
          </p>
        </header>

        <TestimonialCarousel />

        <StatisticsGrid />
      </div>
    </section>
  );
}

export default VoicesOfImpact;
