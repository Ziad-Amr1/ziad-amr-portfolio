// src/components/projects/ProjectSkeleton.jsx
import { memo } from "react";

// ── single shimmer bar ─────────────────────────────────────────────
function Shimmer({ className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded-md bg-gray-200 dark:bg-gray-700/60 ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
    </div>
  );
}

// ── one skeleton card ──────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div
      aria-hidden="true"
      className="rounded-xl overflow-hidden bg-white dark:bg-navy-surface shadow-md"
    >
      {/* thumbnail */}
      <Shimmer className="h-[240px] rounded-none" />

      {/* content */}
      <div className="p-4 space-y-3">
        <Shimmer className="h-4 w-3/4" />
        <Shimmer className="h-3 w-full" />
        <Shimmer className="h-3 w-5/6" />
        <div className="flex gap-2 pt-1">
          <Shimmer className="h-5 w-16 rounded-full" />
          <Shimmer className="h-5 w-20 rounded-full" />
          <Shimmer className="h-5 w-12 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// ── exported grid of N cards ───────────────────────────────────────
const ProjectSkeleton = memo(function ProjectSkeleton({ count = 6 }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </>
  );
});

export default ProjectSkeleton;