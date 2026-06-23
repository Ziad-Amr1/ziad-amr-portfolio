// src/components/projects/ProjectGrid.jsx

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FolderOpen,
} from "lucide-react";

import ProjectCard from "./ProjectCard";

import ProjectSkeleton from "./ProjectSkeleton";

export default function ProjectGrid({
  paginatedProjects,
  getImages,
  loadedMap,
  handleThumbLoad,
  openModal,
  CARD_VARIANTS,
  GRID_VARIANTS,
  isLoading = false,
  skeletonCount = 6,
  onTagClick,
}) {
  /* ======================================================
     LOADING
  ====================================================== */

  if (isLoading) {
    return (
      <div
        className="
        grid
        gap-7

        sm:grid-cols-2
        xl:grid-cols-3
        "
      >
        <ProjectSkeleton
          count={skeletonCount}
        />
      </div>
    );
  }

  /* ======================================================
     EMPTY STATE
  ====================================================== */

  if (!paginatedProjects.length) {
    return (
      <div
        className="
        relative
        overflow-hidden

        flex
        flex-col
        items-center
        justify-center

        py-28
        px-8

        rounded-[32px]

        border
        border-slate-200 dark:border-white/10

        bg-slate-100/80 dark:bg-white/[0.03]

        backdrop-blur-xl

        text-center
        "
      >
        {/* Glow */}
        <div
          className="
          absolute
          inset-0

          bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_45%)]
          "
        />

        {/* Icon */}
        <div
          className="
          relative
          z-10

          w-20
          h-20

          rounded-3xl

          border
          border-slate-200 dark:border-white/10

          bg-blue-500/10

          flex
          items-center
          justify-center

          mb-6
          "
        >
          <FolderOpen
            className="
            w-9
            h-9
            text-blue-300
            "
          />
        </div>

        {/* Title */}
        <h3
          className="
          relative
          z-10

          text-2xl
          font-bold

          text-foreground dark:text-white
          "
        >
          No Projects Found
        </h3>

        {/* Description */}
        <p
          className="
          relative
          z-10

          mt-4

          max-w-md

          text-muted dark:text-slate-500 dark:text-gray-400
          leading-relaxed
          "
        >
          Try selecting another category
          or filter to explore more work.
        </p>
      </div>
    );
  }

  /* ======================================================
     GRID
  ====================================================== */

  return (
    <motion.div
      layout
      variants={GRID_VARIANTS}
      initial="hidden"
      animate="visible"
      className="
      grid
      gap-7

      sm:grid-cols-2
      xl:grid-cols-3
      "
    >
      <AnimatePresence mode="sync">
        {paginatedProjects.map(
          (project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              getImages={getImages}
              loadedMap={loadedMap}
              handleThumbLoad={
                handleThumbLoad
              }
              openModal={openModal}
              CARD_VARIANTS={
                CARD_VARIANTS
              }
              onTagClick={onTagClick}
            />
          )
        )}
      </AnimatePresence>
    </motion.div>
  );
}