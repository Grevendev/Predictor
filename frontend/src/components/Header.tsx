import { useState } from "react";

import DarkModeSwitch from "./DarkModeSwitch";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((current) => !current);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header
      className="
        sticky
        top-0
        z-[100]
        w-full
        border-b
        border-[var(--border-subtle)]
        bg-[color-mix(in_srgb,var(--surface)_82%,transparent)]
        backdrop-blur-[18px]
        transition-colors
        duration-250
      "
    >
      <div
        className="
          mx-auto
          flex
          min-h-[76px]
          w-[min(1180px,calc(100%-48px))]
          items-center
          justify-between
          max-[700px]:w-[calc(100%-32px)]
          max-[480px]:min-h-[68px]
        "
      >
        <a
          className="
            text-[1rem]
            font-[850]
            tracking-[0.08em]
            text-[var(--text-strong)]
            transition-colors
            duration-250
          "
          href="/"
          onClick={closeMenu}
        >
          PREDICTOR
        </a>

        <button
          className="
            hidden
            h-11
            w-11
            rounded-[10px]
            border
            border-[var(--border)]
            bg-[var(--surface)]
            p-[10px]
            max-[700px]:block
          "
          type="button"
          aria-label={
            menuOpen
              ? "Stäng meny"
              : "Öppna meny"
          }
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <span className="my-[5px] block h-[2px] w-full rounded-[2px] bg-[var(--text)]" />
          <span className="my-[5px] block h-[2px] w-full rounded-[2px] bg-[var(--text)]" />
          <span className="my-[5px] block h-[2px] w-full rounded-[2px] bg-[var(--text)]" />
        </button>

        <nav
          className={`
            site-navigation
            flex
            items-center
            gap-8

            max-[700px]:absolute
            max-[700px]:left-0
            max-[700px]:right-0
            max-[700px]:top-[calc(100%+1px)]
            max-[700px]:flex-col
            max-[700px]:items-stretch
            max-[700px]:gap-0
            max-[700px]:border-b
            max-[700px]:border-[var(--border-subtle)]
            max-[700px]:bg-[color-mix(in_srgb,var(--surface)_97%,transparent)]
            max-[700px]:px-4
            max-[700px]:pb-[18px]
            max-[700px]:pt-[10px]
            max-[700px]:shadow-[0_14px_30px_rgba(15,23,42,0.08)]

            ${menuOpen
              ? "max-[700px]:flex"
              : "max-[700px]:hidden"}
          `}
        >
          <a
            className="
              rounded-[10px]
              px-0
              py-0
              text-[0.9rem]
              font-[550]
              text-[var(--text-muted)]
              transition-colors
              duration-200
              hover:text-[var(--text-strong)]
              max-[700px]:px-3
              max-[700px]:py-[15px]
              max-[700px]:hover:bg-[var(--surface-soft)]
            "
            href="/"
            onClick={closeMenu}
          >
            Hem
          </a>

          <a
            className="
              rounded-[10px]
              px-0
              py-0
              text-[0.9rem]
              font-[550]
              text-[var(--text-muted)]
              transition-colors
              duration-200
              hover:text-[var(--text-strong)]
              max-[700px]:px-3
              max-[700px]:py-[15px]
              max-[700px]:hover:bg-[var(--surface-soft)]
            "
            href="/about"
            onClick={closeMenu}
          >
            Om
          </a>

          <a
            className="
              rounded-[10px]
              px-0
              py-0
              text-[0.9rem]
              font-[550]
              text-[var(--text-muted)]
              transition-colors
              duration-200
              hover:text-[var(--text-strong)]
              max-[700px]:px-3
              max-[700px]:py-[15px]
              max-[700px]:hover:bg-[var(--surface-soft)]
            "
            href="/how-it-works"
            onClick={closeMenu}
          >
            Så fungerar det
          </a>

          <DarkModeSwitch />
        </nav>
      </div>
    </header>
  );
}

export default Header;