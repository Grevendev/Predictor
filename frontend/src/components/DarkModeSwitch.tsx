import { useEffect, useState } from "react";

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
      className="
        inline-flex
        h-[38px]
        items-center
        justify-center
        gap-2
        rounded-full
        border
        border-[var(--border)]
        bg-[var(--surface)]
        px-[13px]
        text-[0.68rem]
        font-bold
        tracking-[0.08em]
        text-[var(--text)]
        transition
        duration-200
        ease-in-out
        hover:-translate-y-px
        hover:bg-[var(--surface-soft)]
        active:translate-y-0
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-[var(--text)]
        focus-visible:outline-offset-[3px]
        max-[700px]:h-[44px]
        max-[700px]:w-full
      "
      type="button"
      onClick={toggleDarkMode}
      aria-label={
        darkMode
          ? "Byt till light mode"
          : "Byt till dark mode"
      }
      aria-pressed={darkMode}
    >
      <span
        className="
          inline-flex
          h-4
          w-4
          items-center
          justify-center
          text-[0.9rem]
          leading-none
        "
      >
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