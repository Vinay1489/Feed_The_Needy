"use client";
import React from "react";

const WorkflowHeader = () => {
  return (
    <header className="px-5 pt-16 mx-auto max-w-screen-lg text-center max-md:max-w-[991px] max-sm:max-w-screen-sm">
      <h1 className="mb-4 text-5xl font-bold leading-10 text-slate-950 max-md:text-4xl max-md:leading-10 max-sm:text-3xl max-sm:leading-8">
        How Food Flow Forward Works
      </h1>
      <p className="mx-auto text-lg leading-7 max-w-[800px] text-slate-500 max-md:text-base max-md:leading-6 max-sm:text-sm max-sm:leading-5">
        Our platform creates a seamless connection between excess food and
        hunger, powered by AI and community collaboration.
      </p>
    </header>
  );
};

export default WorkflowHeader;
