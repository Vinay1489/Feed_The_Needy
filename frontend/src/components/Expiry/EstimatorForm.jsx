"use client";

import React from "react";
import FormInput from "./FormInput";
import FormButton from "./FormButton";

const EstimatorForm = () => {
  return (
    <form className="flex flex-col gap-6 px-6 py-10 mx-auto w-full max-w-lg text-sm font-medium rounded-xl border border-white border-opacity-20 shadow-xl bg-white bg-opacity-30 text-slate-950">
      <h3 className="text-2xl font-bold text-center">
        Estimate Food Freshness
      </h3>

      <FormInput
        label="Food Name"
        placeholder="e.g. Apples, Bread, Cooked Rice"
      />

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-950">
          Food Category
        </label>
        <button
          type="button"
          className="flex items-center justify-between w-full px-4 py-3 bg-white border border-slate-200 rounded-md"
        >
          <span>Select category</span>
  
          {/* <img
            src="https://cdn.builder.io/api/v1/image/assets/3d8599fd284c412782eeca09638fc945/4d6a77a8a6a300101a5e0193e944c0d9c12bf3db?placeholderIfAbsent=true"
            className="w-4 h-4"
            alt=""
          /> */}
        </button>
      </div>

      <FormInput
        label="Ingredients Used"
        placeholder="Enter ingredients used in preparation"
      />

      <FormInput
        label="Preparation Time"
        type="time"
        placeholder="Select preparation time"
      />

      <div className="flex flex-col md:flex-row gap-4">
        <FormButton
          className="flex-1 px-6 py-3"
          icon="https://cdn.builder.io/api/v1/image/assets/3d8599fd284c412782eeca09638fc945/80d12aab11e3e515acdd7bd40ea0b5f11de9d213?placeholderIfAbsent=true"
        >
          Scan Label
        </FormButton>
        <FormButton
          className="flex-1 px-6 py-3"
          icon="https://cdn.builder.io/api/v1/image/assets/3d8599fd284c412782eeca09638fc945/f611c9c73606c150bd76851a8e8bbac7d82091a5?placeholderIfAbsent=true"
        >
          Upload Photo
        </FormButton>
      </div>

      <FormButton
        variant="primary"
        className="w-full py-3 mt-2 mb-10 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
      >
        Estimate Expiry
      </FormButton>
    </form>
  );
};

export default EstimatorForm;
