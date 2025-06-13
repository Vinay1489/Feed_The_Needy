import React from "react";

export function TabNavigation() {
  return (
    <nav className="flex p-1 mb-6 rounded-md bg-slate-100">
      <button className="flex flex-1 gap-2 justify-center items-center px-4 py-1.5 text-sm font-medium rounded cursor-pointer text-slate-500">
        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.97998 13.3332V6.6665"
            stroke="#020817"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.98 13.3332V2.6665"
            stroke="#020817"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.97998 13.3332V10.6665"
            stroke="#020817"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Analytics</span>
      </button>
      <button className="flex flex-1 gap-2 justify-center items-center px-4 py-1.5 text-sm font-medium rounded cursor-pointer text-slate-500">
        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.1999 7.99995C14.5679 7.99995 14.8699 7.70061 14.8332 7.33461C14.6795 5.80406 14.0013 4.37375 12.9134 3.28616C11.8256 2.19857 10.3951 1.52064 8.86455 1.36728C8.49789 1.33061 8.19922 1.63261 8.19922 2.00061V7.33395C8.19922 7.51076 8.26946 7.68033 8.39448 7.80535C8.51951 7.93038 8.68907 8.00061 8.86589 8.00061L14.1999 7.99995Z"
            stroke="#64748B"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.3399 10.5934C13.9158 11.5964 13.2524 12.4802 12.4078 13.1676C11.5632 13.855 10.5631 14.325 9.49485 14.5366C8.42663 14.7481 7.32284 14.6948 6.27999 14.3813C5.23714 14.0677 4.28698 13.5034 3.51257 12.7378C2.73817 11.9722 2.1631 11.0286 1.83765 9.98935C1.5122 8.95015 1.44627 7.84704 1.64563 6.77647C1.84498 5.70591 2.30356 4.70047 2.98126 3.84807C3.65896 2.99567 4.53515 2.32226 5.53323 1.88672"
            stroke="#64748B"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Inventory</span>
      </button>
      <button className="flex flex-1 gap-2 justify-center items-center px-4 py-1.5 text-sm font-medium rounded cursor-pointer text-slate-500">
        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.97998 2V12.6667C2.97998 13.0203 3.12046 13.3594 3.3705 13.6095C3.62055 13.8595 3.95969 14 4.31331 14H14.98"
            stroke="#64748B"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.6467 6L10.3134 9.33333L7.64673 6.66667L5.64673 8.66667"
            stroke="#64748B"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Impact</span>
      </button>
    </nav>
  );
}
