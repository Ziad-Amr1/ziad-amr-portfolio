// src/components/projects/ProjectFilters.jsx

import { memo } from "react";

import { motion } from "framer-motion";

import { useTranslation } from "../../i18n";

const BASE = `
relative
overflow-hidden

px-6
py-3

rounded-2xl

font-semibold
text-sm
sm:text-base

transition-all
duration-300

cursor-pointer
`;

const INACTIVE = `
border
border-slate-200 dark:border-white/10

bg-slate-100/80 dark:bg-white/[0.03]

text-muted dark:text-slate-500 dark:text-gray-400

hover:text-foreground dark:text-white
hover:bg-white/[0.06]

hover:border-blue-400/20
`;

const ProjectFilters = memo(
  function ProjectFilters({
    categories,
    activeFilter,
    setActiveFilter,
    setCurrentPage,
    accentMap,
  }) {
    const { t } = useTranslation();
    const handleSelect = (cat) => {
      if (cat === activeFilter)
        return;

      setActiveFilter(cat);

      setCurrentPage(1);
    };

    return (
      <div
        className="
        flex
        flex-wrap
        justify-center

        gap-4

        mb-14
        "
        role="group"
        aria-label={t("projectsSection.filters.ariaLabel")}
      >
        {categories.map((cat) => {
          const isActive =
            activeFilter === cat;

          const accent =
            accentMap?.[cat] ??
            "from-blue-400 to-cyan-300";

          return (
            <button
              key={cat}
              onClick={() =>
                handleSelect(cat)
              }
              aria-pressed={
                isActive
              }
              aria-label={t("projectsSection.filters.filterBy", { name: t(`projectsSection.filters.${cat}`) })}
              className={`
              ${BASE}

              ${
                isActive
                  ? `
                    bg-gradient-to-r
                    ${accent}

                    text-foreground dark:text-white

                    shadow-[0_0_25px_rgba(59,130,246,0.35)]

                    scale-[1.03]
                  `
                  : INACTIVE
              }
              `}
            >
              {/* Glow */}
              {isActive && (
                <motion.span
                  layoutId="project-filter-indicator"
                  className="
                  absolute
                  inset-0

                  rounded-2xl

                  bg-white/10
                  "
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 26,
                  }}
                />
              )}

              {/* Text */}
              <span
                className="
                relative
                z-10

                capitalize
                "
              >
                {t(`projectsSection.filters.${cat}`)}
              </span>
            </button>
          );
        })}
      </div>
    );
  }
);

export default ProjectFilters;