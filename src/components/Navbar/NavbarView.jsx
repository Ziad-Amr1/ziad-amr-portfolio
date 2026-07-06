// src/components/NavbarView.jsx

import { useTranslation } from "../../i18n";

export default function NavbarView({
  navLinks,
  activeSection,
  scrollProgress,
  controls,
}) {
  const { t } = useTranslation();
  return (
    <header
      className="
      fixed
      top-0
      left-0
      right-0
      z-50

      px-[4%]
      md:px-[6%]

      pt-4
      "
    >
      <div
        className="
        relative

        h-[74px]

        grid
        grid-cols-[auto_1fr_auto]
        items-center
        gap-6

        rounded-[24px]

        border
        border-black/5
        dark:border-white/10

        bg-white/80
        dark:bg-[#081120]/70

        backdrop-blur-2xl

        shadow-[0_0_30px_rgba(59,130,246,0.08)]

        px-6
        lg:px-8

        transition-all
        duration-300
        "
      >
        {/* Glow */}
        <div
          className="
          absolute
          inset-0

          opacity-60

          bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_40%)]
          rounded-[24px]
          "
        />

        {/* Progress */}
        <div
          className="
          absolute
          top-0
          left-0

          w-full
          h-[2px]
          "
        >
          <div
            className="
            h-full

            rounded-full

            bg-gradient-to-r
            from-blue-400
            via-cyan-300
            to-blue-500

            shadow-[0_0_15px_rgba(59,130,246,0.6)]

            transition-[width]
            duration-150
            ease-out
            "
            style={{
              width: `${scrollProgress}%`,
            }}
          />
        </div>

        {/* Logo */}
        <a
          href="#home"
          className="
          relative
          z-10

          no-underline
          "
        >
          <h1
            className="
            text-2xl
            lg:text-3xl

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
              via-cyan-300
              to-blue-500

              bg-clip-text
              text-transparent
              "
            >
              Amr
            </span>
          </h1>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex justify-center">
          <ul
            className="
            flex
            items-center
            gap-3

            list-none
            m-0
            p-0
            "
          >
            {navLinks.map((item) => {
              const id =
                item.toLowerCase();

              const isActive =
                activeSection === id;

              return (
                <li key={item}>
                  <a
                    href={`#${id}`}
                    className={`
                    relative

                    px-5
                    py-3

                    rounded-2xl

                    font-semibold
                    text-sm
                    tracking-wide

                    transition-all
                    duration-300

                    ${
                      isActive
                        ? `
                          text-foreground
                          dark:text-white

                          bg-slate-900/[0.04]
                          dark:bg-white/[0.08]

                          border
                          border-black/5
                          dark:border-white/10

                          shadow-[0_0_18px_rgba(59,130,246,0.12)]
                        `
                        : `
                          text-slate-600
                          dark:text-gray-400

                          hover:text-foreground
                          dark:hover:text-white

                          hover:bg-slate-900/[0.03]
                          dark:hover:bg-white/[0.04]
                        `
                    }
                    `}
                  >
                    {isActive && (
                      <div
                        className="
                        absolute
                        inset-0

                        rounded-2xl

                        bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_60%)]
                        "
                      />
                    )}

                    <span className="relative z-10">
                      {t(`navigation.${id}`)}
                    </span>

                    {isActive && (
                      <span
                        className="
                        absolute
                        left-1/2
                        -translate-x-1/2
                        bottom-1

                        w-6
                        h-[3px]

                        rounded-full

                        bg-gradient-to-r
                        from-blue-400
                        to-cyan-300
                        "
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Controls */}
        <div
          className="
          relative
          z-10

          flex
          items-center
          gap-3

          w-full
          md:w-auto
          "
        >
          <div className="flex-1 md:hidden" />

          {controls}
        </div>
      </div>
    </header>
  );
}