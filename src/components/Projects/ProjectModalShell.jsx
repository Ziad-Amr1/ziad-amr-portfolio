// src/components/Projects/ProjectModalShell.jsx
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/**
 * Handles:
 *  - Backdrop (click-outside to close)
 *  - Motion entrance / exit animation
 *  - Close button
 *  - ESC key (with fullscreen awareness)
 *  - Focus trap
 *  - Portrait vs. landscape layout
 */
export default function ProjectModalShell({
  project,
  isFullscreen,
  onClose,
  onExitFullscreen,
  children, // expects: { media, content, nav }
}) {
  const modalRef        = useRef(null);
  const closeButtonRef  = useRef(null);

  const isPortrait = project?.aspect_ratio === "portrait";

  // ── ESC key ─────────────────────────────
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      isFullscreen ? onExitFullscreen() : onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isFullscreen, onClose, onExitFullscreen, project]);

  // ── Focus trap ──────────────────────────
  useEffect(() => {
    if (!project || !modalRef.current) return;

    const focusableSelector = [
      "button:not([disabled])",
      "a[href]",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "video[controls]",
      "[tabindex]:not([tabindex='-1'])",
    ].join(", ");

    const getFocusable = () =>
      Array.from(modalRef.current.querySelectorAll(focusableSelector)).filter(
        (el) => !el.hasAttribute("aria-hidden"),
      );

    (closeButtonRef.current ?? getFocusable()[0])?.focus();

    const onKeyDown = (e) => {
      if (e.key !== "Tab") return;
      const focusables = getFocusable();
      if (!focusables.length) return;
      const first = focusables[0];
      const last  = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [project]);

  if (!project) return null;

  const { media, content, nav } = children;

  return (
    <AnimatePresence>
      <motion.div
        key={`modal-backdrop-${project.id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="
          fixed inset-0 z-50
          flex items-start md:items-center justify-center
          p-2 md:p-4
          bg-black/65 backdrop-blur-sm
        "
        role="dialog"
        aria-modal="true"
        aria-label={`Project: ${project.title}`}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.97, y: -12 }}
          animate={{ scale: 1,    y: 0   }}
          exit={{    scale: 0.97, y: 12  }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="
            relative
            bg-white dark:bg-navy-deep
            rounded-xl shadow-2xl
            w-full max-w-5xl
            max-h-[92vh]
            overflow-hidden
            flex flex-col
          "
        >
          {/* Close button */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close modal"
            className="
              absolute top-3 right-3 z-30
              p-1.5 rounded-full
              bg-white/90 dark:bg-navy-overlay
              hover:bg-gray-100 dark:hover:bg-navy-hover
              transition shadow-sm
            "
          >
            <X size={18} />
          </button>

          {/* Layout A: Portrait → side-by-side on md+ */}
          {isPortrait ? (
            <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-hidden">
              {media}
              <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
                {content}
                {nav}
              </div>
            </div>
          ) : (
            /* Layout B: Landscape → stacked */
            <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
              {media}
              {content}
              {nav}
            </div>
          )}
        </motion.div>

      </motion.div>
    </AnimatePresence>
  );
}
