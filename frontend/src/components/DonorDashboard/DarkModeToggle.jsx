import React from "react";

export default function DarkModeToggle({ isDarkMode, setIsDarkMode }) {
  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? "🌞" : "🌙"}
    </button>
  );
}
