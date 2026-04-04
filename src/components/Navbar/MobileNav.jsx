// src/components/MobileNav.jsx
import { Menu, X } from "lucide-react";

/**
 * Renders the hamburger button + the sliding sidebar drawer.
 * Both are co-located here because they share menuOpen state
 * and the sidebarRef click-outside detection.
 */
export default function MobileNav({
  navLinks,
  activeSection,
  menuOpen,
  setMenuOpen,
  sidebarRef,
  toggleButtonRef,
}) {
  return (
    <>
      {/* Hamburger button — visible on mobile only */}
      <button
        ref={toggleButtonRef}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        className="
          md:hidden p-2 text-2xl
          text-primary dark:text-accent1
          hover:scale-110 transition
        "
      >
        {menuOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar drawer */}
      <div
        ref={sidebarRef}
        className={`
          fixed top-[60px] right-0
          w-4/5 max-w-sm h-[calc(100vh-60px)]
          bg-white/90 dark:bg-dark/85
          backdrop-blur-xl
          shadow-xl
          transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <nav>
          <ul className="flex flex-col gap-6 p-8">
            {navLinks.map((item) => {
              const id       = item.toLowerCase();
              const isActive = activeSection === id;

              return (
                <li key={item}>
                  <a
                    href={`#${id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`
                      font-semibold text-lg transition-colors
                      ${
                        isActive
                          ? "text-primary dark:text-accent1"
                          : "text-dark/80 dark:text-light/80 hover:text-primary dark:hover:text-accent1"
                      }
                    `}
                  >
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
