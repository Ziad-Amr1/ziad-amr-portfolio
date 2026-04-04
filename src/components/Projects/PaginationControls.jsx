// src/components/projects/PaginationControls.jsx
import { memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BTN =
  "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 " +
  "bg-white/70 text-gray-700 dark:bg-navy-surface dark:text-blue-soft " +
  "hover:bg-white hover:shadow-sm dark:hover:bg-navy-layer " +
  "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/70 dark:disabled:hover:bg-navy-surface";

const PaginationControls = memo(function PaginationControls({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  const isFirst = currentPage === 1;
  const isLast  = currentPage === totalPages;

  return (
    <nav className="flex justify-center items-center gap-4 mt-10" aria-label="Pagination">
      <button
        onClick={() => setCurrentPage((p) => p - 1)}
        disabled={isFirst}
        className={BTN}
        aria-label="Previous page"
      >
        <ChevronLeft size={15} />
        Prev
      </button>

      <span className="text-sm text-gray-500 dark:text-gray-400 tabular-nums" aria-live="polite">
        {currentPage} / {totalPages}
      </span>

      <button
        onClick={() => setCurrentPage((p) => p + 1)}
        disabled={isLast}
        className={BTN}
        aria-label="Next page"
      >
        Next
        <ChevronRight size={15} />
      </button>
    </nav>
  );
});

export default PaginationControls;