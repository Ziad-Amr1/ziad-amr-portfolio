// src/components/projects/Projects.jsx
import { useState, useMemo, useEffect, useCallback, useRef, lazy, Suspense, startTransition } from "react";
import { motion } from "framer-motion";
import projectsJson from "../../data/projectsData.json";
import ProjectFilters     from "./ProjectFilters";
import ProjectGrid        from "./ProjectGrid";
import PaginationControls from "./PaginationControls";
import useProjectModal    from "../../hooks/projects/useProjectModal";

const ProjectModal = lazy(() => import("./ProjectModal"));

// ─────────────────────────────────────────
// Constants
// ─────────────────────────────────────────

const CATEGORIES = ["all", "architecture", "design", "development"];

const ACCENT_MAP = {
  all:          "from-gray-400   to-gray-500",
  architecture: "from-[#6EE7B7] to-[#3B82F6]",
  design:       "from-[#A78BFA] to-[#F472B6]",
  development:  "from-[#4F7FD9] to-[#9ECFFF]",
};

const GRID_VARIANTS = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const CARD_VARIANTS = {
  hidden:  { opacity: 0, scale: 0.97, y: 8 },
  visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.32, ease: "easeOut" } },
  exit:    { opacity: 0, scale: 0.96, y: -8, transition: { duration: 0.22 } },
};

const projectsData = projectsJson.projects ?? [];

function getItemsPerPage(width) {
  if (width < 640)  return 3;
  if (width < 1024) return 4;
  return 6;
}

// ─────────────────────────────────────────
// Component
// ─────────────────────────────────────────

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage,  setCurrentPage]  = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(() => getItemsPerPage(window.innerWidth));
  const [loadedMap,    setLoadedMap]    = useState({});
  const [isFiltering,  setIsFiltering]  = useState(false);
  const filterTimeoutRef = useRef(null);

  useEffect(() => {
    const onResize = () => {
      const next = getItemsPerPage(window.innerWidth);
      setItemsPerPage((prev) => (prev === next ? prev : next));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => () => {
    if (filterTimeoutRef.current) {
      window.clearTimeout(filterTimeoutRef.current);
    }
  }, []);

  useEffect(() => { setCurrentPage(1); }, [activeFilter, itemsPerPage]);

  const filteredProjects = useMemo(
    () => (activeFilter === "all" ? projectsData : projectsData.filter((p) => p.category === activeFilter)),
    [activeFilter],
  );

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredProjects.length / itemsPerPage)),
    [filteredProjects.length, itemsPerPage],
  );

  const paginatedProjects = useMemo(
    () => filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [filteredProjects, currentPage, itemsPerPage],
  );

  const getImages = useCallback((project) => {
    if (!project) return [];
    if (Array.isArray(project.images) && project.images.length) return project.images;
    if (project.image) return [project.image];
    return [];
  }, []);

  const handleThumbLoad = useCallback((id) => {
    setLoadedMap((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  }, []);

  const handleFilterChange = useCallback((cat) => {
    if (cat === activeFilter) return;

    if (filterTimeoutRef.current) {
      window.clearTimeout(filterTimeoutRef.current);
    }

    // urgent: show skeleton immediately
    setIsFiltering(true);
    // deferred: actual data update (non-urgent)
    startTransition(() => {
      setActiveFilter(cat);
    });
    filterTimeoutRef.current = window.setTimeout(() => {
      setIsFiltering(false);
      filterTimeoutRef.current = null;
    }, 250);
  }, [activeFilter]);

  // INP fix: wrap page change in startTransition so button responds instantly
  // then React defers the expensive grid re-render
  const handlePageChange = useCallback((updater) => {
    startTransition(() => {
      setCurrentPage((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        return prev === next ? prev : next;
      });
    });
  }, []);

  const {
    modalProject, imageIndex, setImageIndex,
    openModal, closeModal, handlePrevProject, handleNextProject,
  } = useProjectModal(projectsData, filteredProjects, getImages);

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight md:leading-[1.15] pb-1 bg-gradient-to-r from-blue-link to-blue-muted bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            Selected works across architecture, design, and development.
          </p>
        </motion.div>

        <ProjectFilters
          categories={CATEGORIES}
          activeFilter={activeFilter}
          setActiveFilter={handleFilterChange}
          setCurrentPage={setCurrentPage}
          accentMap={ACCENT_MAP}
        />

        <ProjectGrid
          paginatedProjects={paginatedProjects}
          getImages={getImages}
          loadedMap={loadedMap}
          handleThumbLoad={handleThumbLoad}
          openModal={openModal}
          CARD_VARIANTS={CARD_VARIANTS}
          GRID_VARIANTS={GRID_VARIANTS}
          isLoading={isFiltering}
          skeletonCount={itemsPerPage}
        />

        {totalPages > 1 && !isFiltering && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={handlePageChange}
          />
        )}

        {modalProject && (
          <Suspense fallback={null}>
            <ProjectModal
              modalProject={modalProject}
              imageIndex={imageIndex}
              setImageIndex={setImageIndex}
              filteredProjects={filteredProjects}
              closeModal={closeModal}
              getImages={getImages}
              handlePrevProject={handlePrevProject}
              handleNextProject={handleNextProject}
            />
          </Suspense>
        )}
      </div>
    </section>
  );
}
