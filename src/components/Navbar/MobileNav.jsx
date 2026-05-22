// src/components/MobileNav.jsx

import { Menu, X } from "lucide-react";

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
      {/* ======================================================
         MENU BUTTON
      ====================================================== */}

      <button
        ref={toggleButtonRef}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        className="
        md:hidden

        relative

        w-12
        h-12

        rounded-2xl

        border
        border-black/5
        dark:border-white/10

        bg-white/80
        dark:bg-white/[0.04]

        backdrop-blur-xl

        flex
        items-center
        justify-center

        text-foreground
        dark:text-white

        transition-all
        duration-300

        hover:bg-slate-900/[0.03]
        dark:hover:bg-white/[0.06]

        hover:border-blue-400/30
        "
      >
        {menuOpen ? (
          <X size={22} />
        ) : (
          <Menu size={22} />
        )}
      </button>

      {/* ======================================================
         OVERLAY
      ====================================================== */}

      <div
        className={`
        fixed
        inset-0
        z-40

        bg-black/50
        backdrop-blur-sm

        transition-all
        duration-300

        ${
          menuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }
        `}
        onClick={() => setMenuOpen(false)}
      />

      {/* ======================================================
         SIDEBAR
      ====================================================== */}

      <aside
        ref={sidebarRef}
        className={`
        fixed
        top-0
        right-0
        z-50

        w-[85%]
        max-w-[380px]
        h-screen

        overflow-hidden

        border-l
        border-black/5
        dark:border-white/10

        bg-white/85
        dark:bg-[#081120]/90

        backdrop-blur-2xl

        shadow-[-10px_0_40px_rgba(0,0,0,0.35)]

        transition-transform
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]

        ${
          menuOpen
            ? "translate-x-0"
            : "translate-x-200"
        }
        `}
      >
        {/* Glow */}
        <div
          className="
          absolute
          inset-0

          bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_40%)]
          "
        />

        {/* ======================================================
           TOP
        ====================================================== */}

        <div
          className="
          relative
          z-10

          flex
          items-center
          justify-between

          px-6
          py-6

          border-b
          border-black/5
          dark:border-white/10
          "
        >
          {/* Logo */}
          <h2
            className="
            text-2xl
            font-black
            tracking-tight

            text-foreground
            dark:text-white
            "
          >
            Ziad{" "}

            <span
              className="
              bg-gradient-to-r
              from-blue-400
              to-cyan-300

              bg-clip-text
              text-transparent
              "
            >
              Amr
            </span>
          </h2>

          {/* Close */}
          <button
            onClick={() => setMenuOpen(false)}
            className="
            w-10
            h-10

            rounded-xl

            border
            border-black/5
            dark:border-white/10

            bg-slate-900/[0.03]
            dark:bg-white/[0.04]

            flex
            items-center
            justify-center

            text-foreground
            dark:text-white

            transition-all
            duration-300

            hover:bg-slate-900/[0.05]
            dark:hover:bg-white/[0.08]
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* ======================================================
           NAV LINKS
        ====================================================== */}

        <nav className="relative z-10 px-6 py-8">
          <ul className="flex flex-col gap-4">
            {navLinks.map((item, index) => {
              const id = item.toLowerCase();

              const isActive =
                activeSection === id;

              return (
                <li
                  key={item}
                  className="
                  opacity-0
                  animate-[fadeIn_.4s_forwards]
                  "
                  style={{
                    animationDelay: `${index * 80}ms`,
                  }}
                >
                  <a
                    href={`#${id}`}
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className={`
                    group

                    relative

                    flex
                    items-center
                    justify-between

                    px-5
                    py-4

                    rounded-2xl

                    transition-all
                    duration-300

                    ${
                      isActive
                        ? `
                          bg-slate-900/[0.05]
                          dark:bg-white/[0.08]

                          border
                          border-black/5
                          dark:border-white/10

                          text-foreground
                          dark:text-white
                        `
                        : `
                          text-muted
                          dark:text-gray-400

                          hover:text-foreground
                          dark:hover:text-white

                          hover:bg-slate-900/[0.03]
                          dark:hover:bg-white/[0.04]
                        `
                    }
                    `}
                  >
                    {/* Glow */}
                    {isActive && (
                      <div
                        className="
                        absolute
                        inset-0

                        rounded-2xl

                        bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_60%)]
                        "
                      />
                    )}

                    {/* Text */}
                    <span
                      className="
                      relative
                      z-10

                      text-lg
                      font-semibold
                      "
                    >
                      {item}
                    </span>

                    {/* Dot */}
                    <span
                      className={`
                      relative
                      z-10

                      w-2.5
                      h-2.5

                      rounded-full

                      transition-all

                      ${
                        isActive
                          ? `
                            bg-blue-400
                            shadow-[0_0_12px_rgba(59,130,246,0.8)]
                          `
                          : `
                            bg-slate-400/30
                            dark:bg-white/10

                            group-hover:bg-slate-500/40
                            dark:group-hover:bg-white/30
                          `
                      }
                      `}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}