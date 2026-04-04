// src/components/Projects/ProjectModal.jsx
import { useState, useMemo, useCallback, useEffect } from "react";
import ProjectModalShell   from "./ProjectModalShell";
import ProjectMediaPanel   from "./ProjectMediaPanel";
import ProjectCaseStudy    from "./ProjectCaseStudy";
import ProjectModalNav     from "./ProjectModalNav";

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
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Reset fullscreen when project changes
  useEffect(() => {
    setIsFullscreen(false);
  }, [modalProject?.id]);

  const isPortrait = modalProject?.aspect_ratio === "portrait";

  const currentIndex = modalProject
    ? filteredProjects.findIndex((p) => p.id === modalProject.id)
    : -1;

  const images = useMemo(
    () => (modalProject ? getImages(modalProject) : []),
    [modalProject, getImages],
  );

  const isFirst = currentIndex <= 0;
  const isLast  = currentIndex >= filteredProjects.length - 1;

  // Navigation handlers also need to stop video — delegated to MediaPanel via
  // the key prop: changing modalProject.id remounts MediaPanel, which fires
  // the video cleanup in its own useEffect. No extra ref passing needed.
  const handlePrev = useCallback(() => handlePrevProject(), [handlePrevProject]);
  const handleNext = useCallback(() => handleNextProject(), [handleNextProject]);

  if (!modalProject) return null;

  return (
    <ProjectModalShell
      project={modalProject}
      isFullscreen={isFullscreen}
      onClose={closeModal}
      onExitFullscreen={() => setIsFullscreen(false)}
    >
      {{
        media: (
          <ProjectMediaPanel
            key={modalProject.id}        // remount on project change → cleans up video
            project={modalProject}
            images={images}
            imageIndex={imageIndex}
            setImageIndex={setImageIndex}
            isPortrait={isPortrait}
            isFullscreen={isFullscreen}
            onOpenFullscreen={() => setIsFullscreen(true)}
            onCloseFullscreen={() => setIsFullscreen(false)}
          />
        ),
        content: (
          <ProjectCaseStudy project={modalProject} />
        ),
        nav: (
          <ProjectModalNav
            onPrev={handlePrev}
            onNext={handleNext}
            isFirst={isFirst}
            isLast={isLast}
            currentIndex={currentIndex}
            total={filteredProjects.length}
          />
        ),
      }}
    </ProjectModalShell>
  );
}
