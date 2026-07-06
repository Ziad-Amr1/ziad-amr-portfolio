// src/components/projects/ProjectSkeleton.jsx
import { memo } from "react";

function ShimmerBlock({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden rounded-md bg-gray-200 dark:bg-gray-700/60 ${className}`}
    >
      <div className="absolute inset-0 shimmer-slide bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
    </div>
  );
}

function ProjectCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="
        relative
        overflow-hidden

        rounded-[30px]

        border
        border-slate-200 dark:border-white/10

        bg-slate-100/80 dark:bg-white/[0.03]

        backdrop-blur-xl

        select-none
        pointer-events-none
      "
    >
      {/* ── Image Area ── */}
      <div className="relative h-[260px] overflow-hidden bg-slate-100 dark:bg-[#081120]">
        <div className="absolute inset-0 overflow-hidden bg-slate-100/80 dark:bg-white/[0.03]">
          <div className="h-full w-full shimmer-slide bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/20 to-transparent opacity-90" />

        <div className="absolute top-4 left-4 right-4 z-10 flex items-start justify-between gap-3">
          <ShimmerBlock className="w-24 h-7 rounded-full" />
        </div>
      </div>

      {/* ── Content Area ── */}
      <div className="relative z-10 p-6">
        <div className="flex items-center gap-2 mb-3">
          <ShimmerBlock className="w-20 h-4 rounded-full" />
        </div>

        <ShimmerBlock className="h-7 w-3/4 rounded-md" />

        <div className="mt-4 space-y-2">
          <ShimmerBlock className="h-3 w-full rounded-md" />
          <ShimmerBlock className="h-3 w-5/6 rounded-md" />
          <ShimmerBlock className="h-3 w-4/6 rounded-md" />
        </div>

        <div className="mt-5 mb-5 h-px bg-gradient-to-r from-white/10 to-transparent" />

        <div className="flex flex-wrap gap-2">
          <ShimmerBlock className="h-7 w-16 rounded-full" />
          <ShimmerBlock className="h-7 w-20 rounded-full" />
          <ShimmerBlock className="h-7 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}

const ProjectSkeleton = memo(function ProjectSkeleton({ count = 6 }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </>
  );
});

export default ProjectSkeleton;
