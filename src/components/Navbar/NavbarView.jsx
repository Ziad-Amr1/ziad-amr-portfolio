// src/components/NavbarView.jsx

/**
 * Pure presentational component.
 * Renders the <header> frame: progress bar, logo, desktop nav, controls slot.
 * Zero hooks — all data arrives as props.
 */
export default function NavbarView({
  navLinks,
  activeSection,
  scrollProgress,
  controls,        // slot: <ThemeToggle /> + <MobileNav hamburger />
}) {
  return (
    <header
      className="
        fixed top-0 left-0 right-0 z-50
        h-[60px]
        px-[5%]
        grid grid-cols-[auto_1fr_auto] items-center gap-4

        bg-white/80 dark:bg-dark/70
        backdrop-blur-xl

        border-b border-primary/10 dark:border-accent1/10
        shadow-md dark:shadow-[0_0_25px_rgba(99,102,241,0.15)]

        transition-colors duration-300
      "
    >
      {/* ── Scroll progress bar ── */}
      <div className="absolute top-0 left-0 w-full h-[2px]">
        <div
          className="
            h-full
            bg-primary dark:bg-accent1
            shadow-[0_0_10px_rgba(99,102,241,0.55)]
            transition-[width] duration-150 ease-out
          "
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ── Logo ── */}
      <a href="#home" className="no-underline">
        <h1
          className="
            text-xl lg:text-2xl font-extrabold leading-tight
            bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400
            dark:text-light tracking-wide
            bg-clip-text text-transparent
          "
        >
          Ziad Amr
        </h1>
      </a>

      {/* ── Desktop navigation ── */}
      <nav className="hidden md:flex justify-center">
        <ul className="flex gap-10 list-none m-0 p-0">
          {navLinks.map((item) => {
            const id       = item.toLowerCase();
            const isActive = activeSection === id;

            return (
              <li key={item}>
                <a
                  href={`#${id}`}
                  className={`
                    relative font-semibold transition-colors duration-300
                    ${
                      isActive
                        ? "text-primary dark:text-accent1 drop-shadow-[0_0_6px_rgba(99,102,241,0.45)]"
                        : "text-dark/80 dark:text-light/80 hover:text-primary dark:hover:text-accent1"
                    }
                  `}
                >
                  {item}

                  {/* Animated underline */}
                  <span
                    className={`
                      absolute left-0 -bottom-1 h-[2px] w-full
                      origin-left scale-x-0
                      bg-primary dark:bg-accent1
                      transition-transform duration-300 ease-out
                      ${isActive && "scale-x-100"}
                    `}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Controls slot (theme toggle + mobile menu) ── */}
      <div className="flex items-center w-full md:w-auto gap-2">
        {/* Push controls to the right on mobile */}
        <div className="flex-1 md:hidden" />
        {controls}
      </div>
    </header>
  );
}
