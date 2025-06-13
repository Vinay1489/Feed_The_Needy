"use client";
import React from "react";
import LoginForm from "./LoginForm";
import InfoCard from "./InfoCard";

const VolunteerLogin = () => {
  return (
    <main className="flex flex-col justify-center items-center px-20 py-12 max-md:px-5 max-md:py-8 bg-emerald-100">
      <div className="flex flex-col items-center w-full max-w-[1368px] max-md:max-w-full">
        <h1 className="text-4xl font-bold leading-none text-center text-slate-950 max-md:max-w-full">
          Volunteer Connect
        </h1>

        <p className="mt-4 text-base leading-relaxed text-center text-slate-500 max-md:max-w-full">
          Welcome back to our community of food heroes
        </p>

        <div className="self-stretch mt-8 max-md:mt-6 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="w-6/12 max-md:w-full">
              <LoginForm />
            </div>
            <div className="w-6/12 max-md:w-full">
              <div className="self-stretch my-auto max-md:mt-6 max-md:max-w-full">
                <InfoCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VolunteerLogin;
