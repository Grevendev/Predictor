import { useEffect, useState } from "react";

import "./DarkModeSwitch.css";

function DarkModeSwitch() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("predictor-theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark-mode",
      darkMode
    );

    localStorage.setItem(
      "predictor-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  function toggleDarkMode() {
    setDarkMode((current) => !current);
  }

  return (
    <button
      className="dark-mode-switch"
      type="button"
      onClick={toggleDarkMode}
      aria-label={
        darkMode
          ? "Byt till light mode"
          : "Byt till dark mode"
      }
      aria-pressed={darkMode}
    >
      <span className="dark-mode-switch-icon">
        {darkMode ? "☀" : "☾"}
      </span>

      <span>
        {darkMode
          ? "LIGHT MODE"
          : "DARK MODE"}
      </span>
    </button>
  );
}

export default DarkModeSwitch;