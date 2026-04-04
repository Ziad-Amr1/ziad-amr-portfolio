// src/components/projects/ProjectGrid.jsx
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard     from "./ProjectCard";
import ProjectSkeleton from "./ProjectSkeleton";

export default function ProjectGrid({
  paginatedProjects,
  getImages,
  loadedMap,
  handleThumbLoad,
  openModal,
  CARD_VARIANTS,
  GRID_VARIANTS,
  isLoading     = false,
  skeletonCount = 6,
}) {
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        <ProjectSkeleton count={skeletonCount} />
      </div>
    );
  }

  if (!paginatedProjects.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-medium text-gray-500 dark:text-gray-400">No projects found</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try a different filter</p>
      </div>
    );
  }

  return (
    <motion.div
      layout
      variants={GRID_VARIANTS}
      initial="hidden"
      animate="visible"
      className="grid gap-6 sm:grid-cols-2 md:grid-cols-3"
    >
      <AnimatePresence mode="sync">
        {paginatedProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}        // passed so first card gets LCP priority
            getImages={getImages}
            loadedMap={loadedMap}
            handleThumbLoad={handleThumbLoad}
            openModal={openModal}
            CARD_VARIANTS={CARD_VARIANTS}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}