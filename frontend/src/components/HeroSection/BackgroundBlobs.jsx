"use client";
import React from "react";

function BackgroundBlobs() {
  return (
    <>
      {/* Glowing Left Blob */}
      <div
        className="absolute left-[-80px] top-24 w-[350px] h-[350px] rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-indigo-500 opacity-30 blur-3xl animate-pulse"
        aria-hidden="true"
      />

      {/* Glowing Right Blob */}
      <div
        className="absolute right-[-60px] top-[380px] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-green-300 via-emerald-400 to-teal-300 opacity-30 blur-3xl animate-pulse"
        aria-hidden="true"
      />

      {/* Soft Ring Glow */}
      <div
        className="absolute right-[140px] top-[500px] w-[150px] h-[150px] rounded-full border-4 border-white border-opacity-10 animate-ping"
        aria-hidden="true"
      />

      {/* Floating Pink Blob */}
      <div
        className="absolute left-[160px] top-[520px] w-[180px] h-[180px] rounded-full bg-pink-400 opacity-20 blur-2xl animate-bounce"
        aria-hidden="true"
      />
    </>
  );
}

export default BackgroundBlobs;
