"use client";
import React from "react";
import WorkflowHeader from "./WorkflowHeader";
import WorkflowCard from "./WorkflowCard";

const HowItWorks = () => {
  const workflowSteps = [
    {
      emoji: "🍎",
      title: "Donor",
      description:
        "Restaurants, supermarkets, and individuals donate excess food through our platform or mobile app",
    },
    {
      emoji: "🏢",
      title: "NGO",
      description:
        "Local NGOs receive real-time notifications and coordinate pickups based on need and proximity",
    },
    {
      emoji: "🚚",
      title: "Volunteer",
      description:
        "Volunteers use our route-optimized app to collect and deliver food to distribution points",
    },
    {
      emoji: "🙏",
      title: "Needy",
      description:
        "Food reaches those who need it most, with AI ensuring highest quality and freshness",
    },
  ];

  return (
    <section className="box-border px-4 py-0 mx-auto my-0 w-full max-w-[1400px]" id="howItWorks">
      <WorkflowHeader />
      <div
        className="mx-0 my-10 h-1 max-sm:mx-0 max-sm:my-5"
        aria-hidden="true"
      />

      <div className="flex gap-8 justify-between mt-0 max-md:flex-wrap max-md:gap-5 max-md:justify-center max-md:mt-5">
        {workflowSteps.map((step, index) => (
          <WorkflowCard
            key={index}
            emoji={step.emoji}
            title={step.title}
            description={step.description}
            showArrow={index !== workflowSteps.length - 1} // only show arrow except for last
          />
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
