"use client";

import React from "react";
import EstimatorForm from "./EstimatorForm";
import AIFeatureCard from "./AIFeatureCard";

const SmartExpiryEstimator = () => {
  return (
    <section className="flex flex-col justify-center items-center px-20 py-6 max-md:px-5 max-md:py-24 bg-green-200">
      <div className="flex flex-col ml-4 w-full max-w-[1401px] max-md:max-w-full">
        <h2 className="self-center ml-2.5 text-5xl font-bold leading-none text-center text-slate-950 max-md:max-w-full max-md:text-4xl">
          Smart Expiry Estimator
        </h2>

        <p
          className="self-center mt-5 ml-3.5 text-lg leading-7 text-center text-slate-500 max-md:max-w-full"
          id="expiryEstimator"
        >
          Our AI-powered tool predicts how long food will stay fresh, helping
          prioritize distribution and
          <br />
          reduce waste.
        </p>

        <div className="mt-14 w-full max-w-[1368px] max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="w-6/12 max-md:ml-0 max-md:w-full">
              <EstimatorForm />
            </div>
            <div className="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <AIFeatureCard />
            </div>
          </div>
        </div>

        <p className="self-end mt-5 text-sm leading-none text-right text-slate-500 max-md:max-w-full">
          Our ML model analyzes 50+ variables to predict freshness with 93%
          accuracy
        </p>
      </div>
    </section>
  );
};

export default SmartExpiryEstimator;
