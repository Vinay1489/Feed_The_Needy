import React from "react";

const ProgressBar = ({ label, percentage, width }) => {
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-5 justify-between text-sm font-medium leading-none text-slate-950 max-md:max-w-full">
        <div>{label}</div>
        <div>{percentage}%</div>
      </div>
      <div className="flex overflow-hidden flex-col items-start mt-3.5 bg-blue-800 rounded-full max-md:pr-5 max-md:max-w-full">
        <div
          className="flex shrink-0 max-w-full h-3 bg-blue-600"
          style={{ width: `${width}px` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
