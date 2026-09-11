import { useState } from "react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((current) => !current);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <a
          className="logo"
          href="/"
          onClick={closeMenu}
        >
          PREDICTOR
        </a>

        <button
          className="mobile-menu-button"
          type="button"
          aria-label={
            menuOpen
              ? "Stäng meny"
              : "Öppna meny"
          }
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          className={
            menuOpen
              ? "site-navigation is-open"
              : "site-navigation"
          }
        >
          <a
            href="/"
            onClick={closeMenu}
          >
            Hem
          </a>

          <a
            href="/about"
            onClick={closeMenu}
          >
            Om projektet
          </a>

          <a
            href="/how-it-works"
            onClick={closeMenu}
          >
            Så fungerar det
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;