// src/components/Projects/ProjectModalNav.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";

const NAV_BUTTON_BASE =
  "flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 " +
  "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100 " +
  "bg-primary text-white dark:bg-blue-soft dark:text-dark " +
  "hover:brightness-110";

export default function ProjectModalNav({
  onPrev,
  onNext,
  isFirst,
  isLast,
  currentIndex,
  total,
}) {
  return (
    <div
      className="
        shrink-0 px-6 py-3
        border-t border-gray-200 dark:border-white/10
        flex items-center justify-between gap-3
      "
    >
      <button
        onClick={onPrev}
        disabled={isFirst}
        className={NAV_BUTTON_BASE}
        aria-label="Previous project"
      >
        <ChevronLeft size={16} />
        Previous
      </button>

      <span className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">
        {currentIndex + 1} / {total}
      </span>

      <button
        onClick={onNext}
        disabled={isLast}
        className={NAV_BUTTON_BASE}
        aria-label="Next project"
      >
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
