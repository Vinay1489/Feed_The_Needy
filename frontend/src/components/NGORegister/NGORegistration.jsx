"use client";
import React from "react";
import { NGOPortalHeader } from "./NGOPortalHeader";
import { NGORegistrationForm } from "./NGORegistrationForm";
import { DashboardPreview } from "./DashboardPreview";

export default function NGORegistration() {
  return (
    <main className="px-4 py-0 mx-auto my-0 max-w-[1400px] max-md:max-w-[991px] max-sm:max-w-screen-sm">
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Montserrat:wght@700&display=swap"
        rel="stylesheet"
      />

      <NGOPortalHeader
        title="NGO Portal"
        description="Register your organization to start tracking food donations, coordinate distributions, and measure impact."
      />

      <div className="flex gap-8 justify-center max-md:flex-col max-md:items-center">
        <NGORegistrationForm />
        <DashboardPreview />
      </div>
    </main>
  );
}
