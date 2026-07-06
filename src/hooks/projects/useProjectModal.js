// src/hooks/projects/useProjectModal.js
import { useState, useEffect, useCallback } from "react";

// ─────────────────────────────────────────
// URL helpers
// ─────────────────────────────────────────

function getHashId() {
  const hash = window.location.hash ?? "";
  if (!hash.startsWith("#project-")) return null;
  const id = Number(hash.replace("#project-", ""));
  return Number.isFinite(id) ? id : null;
}

const tryHistory = (fn) => { try { fn(); } catch { /* noop */ } };

const pushHash    = (id) => tryHistory(() => { if (window.location.hash !== `#project-${id}`) window.history.pushState({ projectId: id }, "", `#project-${id}`); });
const replaceHash = (id) => tryHistory(() => window.history.replaceState({ projectId: id }, "", `#project-${id}`));
const clearHash   = ()   => tryHistory(() => window.history.replaceState({}, "", window.location.pathname + window.location.search));

// ─────────────────────────────────────────
// Scroll lock — preserves scroll position so page doesn't jump
// ─────────────────────────────────────────

function lockScroll() {
  const y = window.scrollY;
  Object.assign(document.body.style, { top: `-${y}px`, position: "fixed", width: "100%", overflow: "hidden" });
  document.body.dataset.scrollY = String(y);
}

function unlockScroll() {
  const y = parseInt(document.body.dataset.scrollY ?? "0", 10);
  Object.assign(document.body.style, { position: "", top: "", width: "", overflow: "" });
  delete document.body.dataset.scrollY;
  window.scrollTo(0, y);
}

// ─────────────────────────────────────────
// Hook
// ─────────────────────────────────────────

export default function useProjectModal(projectsData, filteredProjects, getImages) {
  const [modalProject, setModalProject] = useState(null);
  const [imageIndex,   setImageIndex]   = useState(0);

  const openModal = useCallback((project) => {
    setModalProject(project);
    setImageIndex(0);
    pushHash(project.id);
  }, []);

  const closeModal = useCallback(() => {
    setModalProject(null);
    setImageIndex(0);
    clearHash();
  }, []);

  const handlePrevProject = useCallback(() => {
    if (!modalProject) return;
    const idx = filteredProjects.findIndex((p) => p.id === modalProject.id);
    if (idx <= 0) return;
    const prev = filteredProjects[idx - 1];
    replaceHash(prev.id);
    setModalProject(prev);
    setImageIndex(0);
  }, [modalProject, filteredProjects]);

  const handleNextProject = useCallback(() => {
    if (!modalProject) return;
    const idx = filteredProjects.findIndex((p) => p.id === modalProject.id);
    if (idx >= filteredProjects.length - 1) return;
    const next = filteredProjects[idx + 1];
    replaceHash(next.id);
    setModalProject(next);
    setImageIndex(0);
  }, [modalProject, filteredProjects]);

  // ── browser back / forward ─────────────
  useEffect(() => {
    const onPop = () => {
      const id    = getHashId();
      const found = id != null ? projectsData.find((p) => p.id === id) : null;
      setModalProject(found ?? null);
      setImageIndex(0);
    };
    window.addEventListener("popstate", onPop);

    // hydrate from URL hash on first load
    const initId = getHashId();
    if (initId != null) {
      const found = projectsData.find((p) => p.id === initId);
      if (found) { setModalProject(found); setImageIndex(0); }
    }

    return () => window.removeEventListener("popstate", onPop);
  }, [projectsData]);

  // ── keyboard ───────────────────────────
  useEffect(() => {
    if (!modalProject) return;

    const onKey = (e) => {
      if (e.key === "Escape") { closeModal(); return; }

      if (e.key === "ArrowLeft") {
        if (imageIndex > 0) setImageIndex((i) => i - 1);
        else handlePrevProject();
        return;
      }

      if (e.key === "ArrowRight") {
        const imgs = getImages(modalProject);
        if (imageIndex < imgs.length - 1) setImageIndex((i) => i + 1);
        else handleNextProject();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalProject, imageIndex, closeModal, getImages, handlePrevProject, handleNextProject]);

  // ── scroll lock ────────────────────────
  const isModalOpen = modalProject !== null;

  useEffect(() => {
    if (isModalOpen) lockScroll();
    return () => unlockScroll();
  }, [isModalOpen]);

  // ── close if filtered project disappears
  useEffect(() => {
    if (modalProject && !filteredProjects.some((p) => p.id === modalProject.id)) {
      closeModal();
    }
  }, [filteredProjects, modalProject, closeModal]);

  return { modalProject, imageIndex, setImageIndex, openModal, closeModal, handlePrevProject, handleNextProject };
}