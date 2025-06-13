import React from "react";
import { TabNavigation } from "./TabNavigation";
import { MetricsDisplay } from "./MetricsDisplay";

export function DashboardPreview() {
  return (
    <section className="p-6 rounded-xl border border-solid shadow-xl backdrop-blur bg-white bg-opacity-30 border-white border-opacity-20 w-[808px] max-md:w-full max-md:max-w-[600px] max-sm:p-5">
      <h2 className="mb-6 text-xl font-bold text-slate-950">
        NGO Dashboard Preview
      </h2>
      <TabNavigation />
      <div>
        <MetricsDisplay />
        <div className="relative h-32 bg-white rounded-lg">
          <div className="flex absolute inset-0 flex-col justify-center items-center rounded-lg backdrop-blur-[2px] bg-slate-100 bg-opacity-50">
            <h3 className="mb-2 text-base font-bold text-slate-950">
              Analytics Dashboard
            </h3>
            <p className="mb-4 text-sm text-center text-slate-500">
              Track food flow metrics, donor activity, and distribution
              efficiency
            </p>
            <button className="px-3.5 py-2.5 text-sm font-medium bg-white rounded-md border border-solid cursor-pointer border-slate-200 text-slate-950">
              Register to View
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
