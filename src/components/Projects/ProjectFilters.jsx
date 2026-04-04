// src/components/projects/ProjectFilters.jsx
import { memo } from "react";
import { motion } from "framer-motion";

const BASE =
  "relative px-5 py-2.5 rounded-full text-sm font-semibold " +
  "transition-[background-color,color,box-shadow,transform] duration-300 ease-out " +
  "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500";

const INACTIVE =
  "bg-white/70 text-gray-700 " +
  "dark:bg-navy-surface dark:text-blue-soft " +
  "hover:bg-white/90 hover:text-gray-900 " +
  "dark:hover:bg-navy-layer dark:hover:text-dark-text " +
  "hover:shadow-md hover:-translate-y-[1px]";

const ProjectFilters = memo(function ProjectFilters({
  categories,
  activeFilter,
  setActiveFilter,
  setCurrentPage,
  accentMap,
}) {
  const handleSelect = (cat) => {
    if (cat === activeFilter) return;
    setActiveFilter(cat);
    setCurrentPage(1);
  };

  return (
    <div className="flex justify-center gap-3 mb-8 flex-wrap" role="group" aria-label="Filter projects by category">
      {categories.map((cat) => {
        const isActive = activeFilter === cat;
        const accent   = accentMap?.[cat] ?? "from-blue-link to-blue-muted";

        return (
          <button
            key={cat}
            onClick={() => handleSelect(cat)}
            className={`${BASE} ${isActive ? `bg-gradient-to-r ${accent} text-white shadow-lg scale-[1.05]` : INACTIVE}`}
            aria-pressed={isActive}
            aria-label={`Filter by ${cat}`}
          >
            <span className="relative z-10 capitalize">{cat}</span>

            {isActive && (
              <motion.span
                layoutId="filter-indicator"
                className="absolute inset-0 rounded-full bg-white/10"
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
});

export default ProjectFilters;