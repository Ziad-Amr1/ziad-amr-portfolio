// src/components/projects/ProjectModal.jsx

import {
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  Sparkles,
} from "lucide-react";

import ProjectModalShell from "./ProjectModalShell";

import ProjectMediaPanel from "./ProjectMediaPanel";

import ProjectCaseStudy from "./ProjectCaseStudy";

import ProjectModalNav from "./ProjectModalNav";

/* ======================================================
   COMPONENT
====================================================== */

export default function ProjectModal({
  modalProject,
  imageIndex,
  setImageIndex,
  filteredProjects,
  closeModal,
  getImages,
  handlePrevProject,
  handleNextProject,
}) {
  const [
    isFullscreen,
    setIsFullscreen,
  ] = useState(false);

  /* ==================================================
     RESET FULLSCREEN
  ================================================== */

  useEffect(() => {
    setIsFullscreen(false);
  }, [modalProject?.id]);

  /* ==================================================
     HELPERS
  ================================================== */

  const isPortrait =
    modalProject?.aspect_ratio ===
    "portrait";

  const currentIndex =
    modalProject
      ? filteredProjects.findIndex(
          (p) =>
            p.id ===
            modalProject.id
        )
      : -1;

  const images = useMemo(
    () =>
      modalProject
        ? getImages(
            modalProject
          )
        : [],
    [modalProject, getImages]
  );

  const isFirst =
    currentIndex <= 0;

  const isLast =
    currentIndex >=
    filteredProjects.length - 1;

  /* ==================================================
     NAVIGATION
  ================================================== */

  const handlePrev =
    useCallback(
      () =>
        handlePrevProject(),
      [handlePrevProject]
    );

  const handleNext =
    useCallback(
      () =>
        handleNextProject(),
      [handleNextProject]
    );

  /* ==================================================
     EMPTY
  ================================================== */

  if (!modalProject) {
    return null;
  }

  /* ==================================================
     RENDER
  ================================================== */

  return (
    <ProjectModalShell
      project={modalProject}
      isFullscreen={
        isFullscreen
      }
      onClose={closeModal}
      onExitFullscreen={() =>
        setIsFullscreen(false)
      }
    >
      {{
        /* ==========================================
           MEDIA
        ========================================== */

        media: (
          <div
            className={`
            relative
            flex
            flex-col
            ${
              isPortrait
                ? `
                  h-full
                  lg:w-[42%]
                  xl:w-[46%]
                  lg:min-w-[360px]
                  xl:min-w-[420px]
                  lg:shrink-0
                `
                : `
                  w-full
                `
            }
            `}
          >
            {/* Floating Badge */}
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.35,
              }}
              className="
              absolute
              top-5
              left-20
              z-30

              hidden
              md:flex
              items-center
              gap-2

              px-4
              py-2

              rounded-2xl

              border
            border-slate-200
            dark:border-slate-200 dark:border-white/10

            bg-white/90
            dark:bg-black/40

            shadow-[0_4px_18px_rgba(15,23,42,0.05)]
            dark:shadow-none

            text-foreground dark:text-white

              backdrop-blur-xl
              text-sm
              font-medium
              "
            >
              <Sparkles
                size={15}
                className="
                text-blue-500
                dark:text-blue-300
                "
              />

              Featured Project
            </motion.div>

            <ProjectMediaPanel
              key={
                modalProject.id
              }
              project={
                modalProject
              }
              images={images}
              imageIndex={
                imageIndex
              }
              setImageIndex={
                setImageIndex
              }
              isPortrait={
                isPortrait
              }
              isFullscreen={
                isFullscreen
              }
              onOpenFullscreen={() =>
                setIsFullscreen(
                  true
                )
              }
              onCloseFullscreen={() =>
                setIsFullscreen(
                  false
                )
              }
            />
          </div>
        ),

        /* ==========================================
           CONTENT
        ========================================== */

        content: (
          <ProjectCaseStudy
            project={
              modalProject
            }
          />
        ),

        /* ==========================================
           NAV
        ========================================== */

        nav: (
          <ProjectModalNav
            onPrev={handlePrev}
            onNext={handleNext}
            isFirst={isFirst}
            isLast={isLast}
            currentIndex={
              currentIndex
            }
            total={
              filteredProjects.length
            }
          />
        ),
      }}
    </ProjectModalShell>
  );
}