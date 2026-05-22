// src/components/projects/ProjectModalShell.jsx

import {
  useEffect,
  useRef,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  X,
} from "lucide-react";

/* ======================================================
   SHELL
====================================================== */

export default function ProjectModalShell({
  project,
  isFullscreen,
  onClose,
  onExitFullscreen,
  children,
}) {
  const modalRef =
    useRef(null);

  const closeButtonRef =
    useRef(null);

  const isPortrait =
    project?.aspect_ratio ===
    "portrait";

  /* ==================================================
     ESC KEY
  ================================================== */

  useEffect(() => {
    if (!project) return;

    const onKey = (e) => {
      if (e.key !== "Escape")
        return;

      isFullscreen
        ? onExitFullscreen()
        : onClose();
    };

    window.addEventListener(
      "keydown",
      onKey
    );

    return () =>
      window.removeEventListener(
        "keydown",
        onKey
      );
  }, [
    isFullscreen,
    onClose,
    onExitFullscreen,
    project,
  ]);

  /* ==================================================
     FOCUS TRAP
  ================================================== */

  useEffect(() => {
    if (
      !project ||
      !modalRef.current
    )
      return;

    const focusableSelector =
      [
        "button:not([disabled])",
        "a[href]",
        "input:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        "video[controls]",
        "[tabindex]:not([tabindex='-1'])",
      ].join(", ");

    const getFocusable =
      () =>
        Array.from(
          modalRef.current.querySelectorAll(
            focusableSelector
          )
        ).filter(
          (el) =>
            !el.hasAttribute(
              "aria-hidden"
            )
        );

    (
      closeButtonRef.current ??
      getFocusable()[0]
    )?.focus();

    const onKeyDown = (
      e
    ) => {
      if (e.key !== "Tab")
        return;

      const focusables =
        getFocusable();

      if (!focusables.length)
        return;

      const first =
        focusables[0];

      const last =
        focusables[
          focusables.length - 1
        ];

      if (
        e.shiftKey &&
        document.activeElement ===
          first
      ) {
        e.preventDefault();

        last.focus();
      } else if (
        !e.shiftKey &&
        document.activeElement ===
          last
      ) {
        e.preventDefault();

        first.focus();
      }
    };

    window.addEventListener(
      "keydown",
      onKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        onKeyDown
      );
  }, [project]);

  /* ==================================================
     LOCK SCROLL
  ================================================== */

  useEffect(() => {
    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        "";
    };
  }, []);

  /* ==================================================
     EMPTY
  ================================================== */

  if (!project) return null;

  const {
    media,
    content,
    nav,
  } = children;

  /* ==================================================
     RENDER
  ================================================== */

  return (
    <AnimatePresence>
      <motion.div
        key={`modal-backdrop-${project.id}`}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 0.22,
        }}
        className="
        fixed
        inset-0
        z-50

        flex
        items-start
        md:items-center
        justify-center

        p-2
        md:p-5

        bg-black/70

        backdrop-blur-md
        "
        role="dialog"
        aria-modal="true"
        aria-label={`Project: ${project.title}`}
        onClick={(e) => {
          if (
            e.target ===
            e.currentTarget
          ) {
            onClose();
          }
        }}
      >
        <motion.div
          ref={modalRef}
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 20,
            scale: 0.97,
          }}
          transition={{
            duration: 0.26,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="
          relative

          w-full
          max-w-6xl

          max-h-[94vh]

          overflow-hidden

          rounded-[34px]

          border
          border-slate-200
          dark:border-slate-200 dark:border-white/10

          bg-white/95
          dark:bg-[#081120]/95

          shadow-[0_20px_80px_rgba(15,23,42,0.18)]
          dark:shadow-[0_0_80px_rgba(0,0,0,0.45)]

          backdrop-blur-2xl

          flex
          flex-col
          "
        >
          {/* Glow */}
          <div
            className="
            absolute
            inset-0

            bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.10),transparent_40%)]
            dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_40%)]
            "
          />

          {/* Close Button */}
          <button
            ref={
              closeButtonRef
            }
            onClick={onClose}
            aria-label="Close modal"
            className="
            absolute
            top-5
            right-5
            z-40

            w-11
            h-11

            rounded-2xl

            border
            border-slate-200
            dark:border-slate-200 dark:border-white/10

            bg-white/90
            dark:bg-black/40

            text-foreground dark:text-white

            shadow-[0_4px_18px_rgba(15,23,42,0.05)]
            dark:shadow-none

            hover:bg-slate-50
            dark:hover:bg-black/60

            hover:border-blue-200
            dark:hover:border-blue-400/20
            backdrop-blur-xl

            flex
            items-center
            justify-center

            transition-all
            duration-300
            "
          >
            <X size={18} />
          </button>

          {/* ==========================================
             PORTRAIT
          ========================================== */}

          {isPortrait ? (
            <div
              className="
              flex
              flex-col
              lg:flex-row

              flex-1
              min-h-0
              overflow-hidden
              "
            >
              {/* Media wrapper */}
              <div className="contents">
                {media}
              </div>

              <div
                className="
                flex
                flex-col

                flex-1
                min-h-0
                overflow-hidden
                "
              >
                {content}

                {nav}
              </div>
            </div>
          ) : (
            /* ======================================
               LANDSCAPE
            ====================================== */

            <div
              className="
              flex
              flex-col

              flex-1
              min-h-0
              overflow-hidden
              "
            >
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