// src/components/projects/ProjectModalNav.jsx

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useTranslation } from "../../i18n";

const NAV_BUTTON_BASE = `
group

inline-flex
items-center
gap-2

px-5
py-3

rounded-2xl

font-semibold
text-sm

transition-all
duration-300

border
border-slate-200
dark:border-slate-200 dark:border-white/10

bg-white
dark:bg-white/[0.03]

shadow-[0_4px_18px_rgba(15,23,42,0.04)]
dark:shadow-none

text-foreground dark:text-white

hover:bg-slate-50
dark:hover:bg-white/[0.06]

hover:border-blue-200
dark:hover:border-blue-400/20

hover:shadow-[0_10px_30px_rgba(59,130,246,0.12)]
dark:hover:shadow-none

disabled:opacity-35
disabled:cursor-not-allowed
`;

export default function ProjectModalNav({
  onPrev,
  onNext,
  isFirst,
  isLast,
  currentIndex,
  total,
}) {
  const { t } = useTranslation();
  return (
    <div
      className="
      shrink-0

      px-6
      py-5

      border-t
    border-slate-200
    dark:border-slate-200 dark:border-white/10

    bg-white/80
    dark:bg-[#081120]/70

      backdrop-blur-xl

      flex
      items-center
      justify-between
      gap-4
      "
    >
      {/* Prev */}
      <button
        onClick={onPrev}
        disabled={isFirst}
        className={
          NAV_BUTTON_BASE
        }
        aria-label={t("accessibility.previousProject")}
      >
        <ChevronLeft
          size={18}
          className="
          transition-transform
          duration-300

          group-hover:-translate-x-1
          "
        />

        {t("common.previous")}
      </button>

      {/* Counter */}
      <div
        className="
        flex
        flex-col
        items-center
        "
      >
        <span
          className="
          text-xs
          uppercase
          tracking-[0.18em]

          text-slate-500
          dark:text-slate-500 dark:text-gray-500
          "
        >
          {t("common.project")}
        </span>

        <span
          className="
          mt-1

          text-sm
          font-semibold

          text-foreground dark:text-white

          tabular-nums
          "
        >
          {currentIndex + 1} /{" "}
          {total}
        </span>
      </div>

      {/* Next */}
      <button
        onClick={onNext}
        disabled={isLast}
        className={
          NAV_BUTTON_BASE
        }
        aria-label={t("accessibility.nextProject")}
      >
        {t("common.next")}

        <ChevronRight
          size={18}
          className="
          transition-transform
          duration-300

          group-hover:translate-x-1
          "
        />
      </button>
    </div>
  );
}