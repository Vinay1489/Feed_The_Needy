"use client";
import React from "react";
import BackgroundBlobs from "./BackgroundBlobs";
import HeroContent from "./HeroContent";
import StatsSection from "./StatsSection";

function HeroSection() {
  return (
    <section className="overflow-hidden relative w-full bg-white min-h-[screen]">
      <BackgroundBlobs />
      <div className="px-5 pt-40 mx-auto max-w-[1400px] max-md:pt-24 max-sm:pt-16">
        <HeroContent />
        <StatsSection />
      </div>
    </section>
  );
}

export default HeroSection;
