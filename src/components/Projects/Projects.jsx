// src/components/projects/Projects.jsx

import {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
  lazy,
  Suspense,
  startTransition,
} from "react";

import { motion } from "framer-motion";

import {
  Sparkles,
  LayoutGrid,
} from "lucide-react";

import projectsJson from "../../data/projectsData.json";

import ProjectFilters from "./ProjectFilters";

import ProjectGrid from "./ProjectGrid";

import PaginationControls from "./PaginationControls";

import useProjectModal from "../../hooks/projects/useProjectModal";

const ProjectModal = lazy(() =>
  import("./ProjectModal")
);

/* ======================================================
   CONSTANTS
====================================================== */

const CATEGORIES = [
  "all",
  "architecture",
  "design",
  "development",
];

const ACCENT_MAP = {
  all:
    "from-slate-500 via-slate-400 to-slate-500",

  architecture:
    "from-[#6EE7B7] via-[#3B82F6] to-[#60A5FA]",

  design:
    "from-[#A78BFA] via-[#C084FC] to-[#F472B6]",

  development:
    "from-[#4F7FD9] via-[#60A5FA] to-[#9ECFFF]",
};

const GRID_VARIANTS = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const CARD_VARIANTS = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 14,
  },

  visible: {
    opacity: 1,
    scale: 1,
    y: 0,

    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,

    transition: {
      duration: 0.22,
    },
  },
};

const projectsData =
  projectsJson.projects ?? [];

function getItemsPerPage(width) {
  if (width < 640) return 3;

  if (width < 1024) return 4;

  return 6;
}

/* ======================================================
   MAIN COMPONENT
====================================================== */

export default function Projects() {
  const [activeFilter, setActiveFilter] =
    useState("all");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [itemsPerPage, setItemsPerPage] =
    useState(() =>
      getItemsPerPage(window.innerWidth)
    );

  const [loadedMap, setLoadedMap] =
    useState({});

  const [isFiltering, setIsFiltering] =
    useState(false);

  const filterTimeoutRef = useRef(null);

  /* ======================================================
     RESPONSIVE ITEMS
  ====================================================== */

  useEffect(() => {
    const onResize = () => {
      const next =
        getItemsPerPage(window.innerWidth);

      setItemsPerPage((prev) =>
        prev === next ? prev : next
      );
    };

    window.addEventListener(
      "resize",
      onResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        onResize
      );
  }, []);

  useEffect(() => {
    return () => {
      if (filterTimeoutRef.current) {
        window.clearTimeout(
          filterTimeoutRef.current
        );
      }
    };
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, itemsPerPage]);

  /* ======================================================
     FILTERING
  ====================================================== */

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projectsData;
    }

    return projectsData.filter(
      (p) =>
        p.category === activeFilter
    );
  }, [activeFilter]);

  const totalPages = useMemo(() => {
    return Math.max(
      1,
      Math.ceil(
        filteredProjects.length /
          itemsPerPage
      )
    );
  }, [
    filteredProjects.length,
    itemsPerPage,
  ]);

  const paginatedProjects = useMemo(() => {
    return filteredProjects.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [
    filteredProjects,
    currentPage,
    itemsPerPage,
  ]);

  /* ======================================================
     HELPERS
  ====================================================== */

  const getImages = useCallback(
    (project) => {
      if (!project) return [];

      if (
        Array.isArray(project.images) &&
        project.images.length
      ) {
        return project.images;
      }

      if (project.image) {
        return [project.image];
      }

      return [];
    },
    []
  );

  const handleThumbLoad = useCallback(
    (id) => {
      setLoadedMap((prev) =>
        prev[id]
          ? prev
          : {
              ...prev,
              [id]: true,
            }
      );
    },
    []
  );

  /* ======================================================
     FILTER CHANGE
  ====================================================== */

  const handleFilterChange =
    useCallback(
      (cat) => {
        if (cat === activeFilter) {
          return;
        }

        if (filterTimeoutRef.current) {
          window.clearTimeout(
            filterTimeoutRef.current
          );
        }

        setIsFiltering(true);

        startTransition(() => {
          setActiveFilter(cat);
        });

        filterTimeoutRef.current =
          window.setTimeout(() => {
            setIsFiltering(false);

            filterTimeoutRef.current =
              null;
          }, 250);
      },
      [activeFilter]
    );

  /* ======================================================
     PAGINATION
  ====================================================== */

  const handlePageChange =
    useCallback((updater) => {
      startTransition(() => {
        setCurrentPage((prev) => {
          const next =
            typeof updater ===
            "function"
              ? updater(prev)
              : updater;

          return prev === next
            ? prev
            : next;
        });
      });
    }, []);

  /* ======================================================
     MODAL
  ====================================================== */

  const {
    modalProject,
    imageIndex,
    setImageIndex,

    openModal,
    closeModal,

    handlePrevProject,
    handleNextProject,
  } = useProjectModal(
    projectsData,
    filteredProjects,
    getImages
  );

  /* ======================================================
     RENDER
  ====================================================== */

  return (
    <section
      id="projects"
      className="
      relative
      py-28
      overflow-hidden
      bg-background
      "
    >
      {/* ==================================================
         BACKGROUND
      ================================================== */}

      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Left Glow */}
        <div
          className="
          absolute
          left-[-220px]
          top-[15%]

          w-[500px]
          h-[500px]

          rounded-full

          bg-blue-500/10

          blur-[150px]
          "
        />

        {/* Right Glow */}
        <div
          className="
          absolute
          right-[-220px]
          bottom-[0%]

          w-[420px]
          h-[420px]

          rounded-full

          bg-cyan-400/10

          blur-[140px]
          "
        />

        {/* Grid */}
        <div
          className="
          absolute
          inset-0

          opacity-[0.03]

          bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]

          bg-[size:80px_80px]
          "
        />
      </div>

      <div className="max-w-[1350px] mx-auto px-[6%] md:px-[8%] lg:px-[10%]">
        {/* ==================================================
           HEADER
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
          }}
          className="text-center mb-16"
        >
          {/* Label */}
          <div
            className="
            inline-flex
            items-center
            gap-2

            px-5
            py-2

            rounded-2xl

            border
            border-slate-200 dark:border-white/10

            bg-slate-100/80 dark:bg-white/[0.03]

            text-blue-300
            text-sm

            tracking-[0.18em]
            uppercase

            mb-6
            "
          >
            <LayoutGrid className="w-4 h-4" />

            Featured Work
          </div>

          {/* Heading */}
          <h2
            className="
            text-4xl
            md:text-6xl

            font-black

            leading-tight
            tracking-tight

            text-foreground dark:text-white
            "
          >
            Selected Projects
            <br />

            <span
              className="
              bg-gradient-to-r
              from-blue-400
              via-cyan-300
              to-blue-500

              bg-clip-text
              text-transparent
              "
            >
              Across Design & Development
            </span>
          </h2>

          {/* Description */}
          <p
            className="
            mt-8

            max-w-3xl
            mx-auto

            text-muted dark:text-slate-500 dark:text-gray-400
            text-lg

            leading-relaxed
            "
          >
            A curated collection of
            architecture, UI/UX, graphic
            design, and frontend development
            projects focused on visual clarity,
            interaction, and modern digital
            experiences.
          </p>

          {/* Stats */}
          <div
            className="
            mt-10

            flex
            flex-wrap
            justify-center
            gap-4
            "
          >
            {[
              {
                label:
                  "Projects",
                value:
                  projectsData.length,
              },

              {
                label:
                  "Categories",
                value: 3,
              },

              {
                label:
                  "Creative Focus",
                value:
                  "UI / Architecture",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="
                flex
                items-center
                gap-3

                px-5
                py-3

                rounded-2xl

                border
                border-slate-200 dark:border-white/10

                bg-slate-100/80 dark:bg-white/[0.03]

                backdrop-blur-xl
                "
              >
                <Sparkles className="w-4 h-4 text-blue-300" />

                <div className="text-left">
                  <p className="text-sm text-slate-500 dark:text-gray-500">
                    {item.label}
                  </p>

                  <p className="text-foreground dark:text-white font-semibold">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ==================================================
           FILTERS
        ================================================== */}

        <ProjectFilters
          categories={CATEGORIES}
          activeFilter={activeFilter}
          setActiveFilter={
            handleFilterChange
          }
          setCurrentPage={
            setCurrentPage
          }
          accentMap={ACCENT_MAP}
        />

        {/* ==================================================
           GRID
        ================================================== */}

        <ProjectGrid
          paginatedProjects={
            paginatedProjects
          }
          getImages={getImages}
          loadedMap={loadedMap}
          handleThumbLoad={
            handleThumbLoad
          }
          openModal={openModal}
          CARD_VARIANTS={
            CARD_VARIANTS
          }
          GRID_VARIANTS={
            GRID_VARIANTS
          }
          isLoading={
            isFiltering
          }
          skeletonCount={
            itemsPerPage
          }
        />

        {/* ==================================================
           PAGINATION
        ================================================== */}

        {totalPages > 1 &&
          !isFiltering && (
            <PaginationControls
              currentPage={
                currentPage
              }
              totalPages={
                totalPages
              }
              setCurrentPage={
                handlePageChange
              }
            />
          )}

        {/* ==================================================
           MODAL
        ================================================== */}

        {modalProject && (
          <Suspense fallback={null}>
            <ProjectModal
              modalProject={
                modalProject
              }
              imageIndex={
                imageIndex
              }
              setImageIndex={
                setImageIndex
              }
              filteredProjects={
                filteredProjects
              }
              closeModal={
                closeModal
              }
              getImages={getImages}
              handlePrevProject={
                handlePrevProject
              }
              handleNextProject={
                handleNextProject
              }
            />
          </Suspense>
        )}
      </div>
    </section>
  );
}