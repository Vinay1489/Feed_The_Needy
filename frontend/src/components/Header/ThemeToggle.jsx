"use client";
import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex justify-center items-center w-10 h-10 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        // Sun icon for light mode
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#facc15"
            d="M12 18a6 6 0 100-12 6 6 0 000 12zm0 4a1 1 0 011-1h0a1 1 0 110 2h0a1 1 0 01-1-1zm0-20a1 1 0 011-1h0a1 1 0 110 2h0a1 1 0 01-1-1zM4.22 4.22a1 1 0 011.42 0h0a1 1 0 11-1.42 1.42h0a1 1 0 010-1.42zm13.14 13.14a1 1 0 011.42 0h0a1 1 0 11-1.42 1.42h0a1 1 0 010-1.42zM2 12a1 1 0 011-1h0a1 1 0 110 2h0a1 1 0 01-1-1zm18 0a1 1 0 011-1h0a1 1 0 110 2h0a1 1 0 01-1-1zM4.22 19.78a1 1 0 010-1.42h0a1 1 0 011.42 1.42h0a1 1 0 01-1.42 0zm13.14-13.14a1 1 0 010-1.42h0a1 1 0 011.42 1.42h0a1 1 0 01-1.42 0z"
          />
        </svg>
      ) : (
        // Moon icon for dark mode
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#0f172a"
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
