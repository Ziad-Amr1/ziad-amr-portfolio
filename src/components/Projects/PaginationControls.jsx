// src/components/projects/PaginationControls.jsx

import { memo } from "react";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const BTN = `
group

inline-flex
items-center
gap-2

px-6
py-3

rounded-2xl

font-semibold
text-sm

transition-all
duration-300

border
border-slate-200 dark:border-white/10

bg-slate-100/80 dark:bg-white/[0.03]

text-foreground dark:text-white

hover:bg-white/[0.06]
hover:border-blue-400/20

disabled:opacity-40
disabled:cursor-not-allowed
`;

const PaginationControls = memo(
  function PaginationControls({
    currentPage,
    totalPages,
    setCurrentPage,
  }) {
    const isFirst =
      currentPage === 1;

    const isLast =
      currentPage === totalPages;

    return (
      <nav
        className="
        flex
        items-center
        justify-center

        gap-5

        mt-14
        "
        aria-label="Pagination"
      >
        {/* Prev */}
        <button
          onClick={() =>
            setCurrentPage(
              (p) => p - 1
            )
          }
          disabled={isFirst}
          className={BTN}
          aria-label="Previous page"
        >
          <ChevronLeft
            size={18}
            className="
            transition-transform
            duration-300

            group-hover:-translate-x-1
            "
          />

          Prev
        </button>

        {/* Counter */}
        <div
          className="
          px-5
          py-3

          rounded-2xl

          border
          border-slate-200 dark:border-white/10

          bg-slate-100/80 dark:bg-white/[0.03]

          text-sm
          font-medium

          text-slate-600 dark:text-gray-300

          tabular-nums
          "
          aria-live="polite"
        >
          {currentPage} /{" "}
          {totalPages}
        </div>

        {/* Next */}
        <button
          onClick={() =>
            setCurrentPage(
              (p) => p + 1
            )
          }
          disabled={isLast}
          className={BTN}
          aria-label="Next page"
        >
          Next

          <ChevronRight
            size={18}
            className="
            transition-transform
            duration-300

            group-hover:translate-x-1
            "
          />
        </button>
      </nav>
    );
  }
);

export default PaginationControls;