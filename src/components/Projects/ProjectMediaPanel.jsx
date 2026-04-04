// src/components/Projects/ProjectMediaPanel.jsx
import { useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import ImageSlider from "./ImageSlider";

export default function ProjectMediaPanel({
  project,
  images,
  imageIndex,
  setImageIndex,
  isPortrait,
  isFullscreen,
  onOpenFullscreen,
  onCloseFullscreen,
}) {
  const videoRef   = useRef(null);
  const isVideo    = project?.type === "video";
  const videoSrc   = project?.video ?? null;
  const hasMulti   = images.length > 1;

  // Auto-play / pause video when videoSrc changes
  useEffect(() => {
    if (!videoRef.current || !videoSrc) return;
    const el = videoRef.current;
    const p  = el.play();
    if (p?.catch) p.catch(() => {});
    return () => el.pause();
  }, [videoSrc]);

  // Expose a pause handle so the shell can pause on nav/close
  // (we do this via a forwarded ref pattern — see note in ProjectModalShell)

  return (
    <>
      {/* ── Media container ── */}
      <div
        className={`
          relative bg-black/5 dark:bg-black
          flex items-center justify-center shrink-0 overflow-hidden
          ${isPortrait
            ? "w-full md:w-[42%] max-h-[55vh] md:max-h-none md:self-stretch"
            : "w-full h-[38vh] md:h-[44vh]"
          }
        `}
      >
        {/* Fullscreen trigger (images only) */}
        {!isVideo && (
          <button
            onClick={onOpenFullscreen}
            aria-label="View fullscreen"
            className="
              absolute top-3 left-3 z-20
              p-1.5 rounded-md
              bg-black/50 text-white
              hover:bg-black/75 transition
            "
          >
            <Maximize2 size={15} />
          </button>
        )}

        {/* Image counter badge */}
        {hasMulti && (
          <div className="absolute bottom-3 right-3 z-20 px-2 py-0.5 text-xs rounded bg-black/60 text-white">
            {imageIndex + 1} / {images.length}
          </div>
        )}

        {/* Media */}
        {isVideo && videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={images[0]}
            controls
            autoPlay
            muted
            playsInline
            preload="metadata"
            className="h-full max-h-full w-full rounded-md object-contain"
          />
        ) : images.length > 0 ? (
          <ImageSlider
            images={images}
            imageIndex={imageIndex}
            setImageIndex={setImageIndex}
          />
        ) : null}
      </div>

      {/* ── Fullscreen overlay ── */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            key="fullscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="
              fixed inset-0 z-[999]
              bg-black/92
              flex items-center justify-center
              p-4 cursor-zoom-out
            "
            onClick={onCloseFullscreen}
          >
            <motion.img
              src={images?.[imageIndex]}
              alt={project.title}
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
              transition={{ duration: 0.18 }}
              className="max-w-full max-h-full object-contain cursor-default rounded-md"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={onCloseFullscreen}
              aria-label="Exit fullscreen"
              className="
                absolute top-4 right-4
                p-2 rounded-full
                bg-white/10 text-white
                hover:bg-white/20 transition
              "
            >
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
