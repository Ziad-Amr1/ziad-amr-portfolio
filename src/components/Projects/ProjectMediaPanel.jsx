// src/components/projects/ProjectMediaPanel.jsx

import {
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Maximize2,
  X,
} from "lucide-react";

import { useTranslation } from "../../i18n";

import ImageSlider from "./ImageSlider";

/* ======================================================
   COMPONENT
====================================================== */

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
  const { t } = useTranslation();
  const videoRef =
    useRef(null);

  const isVideo =
    project?.type ===
    "video";

  const videoSrc =
    project?.video ??
    null;

  const hasMulti =
    images.length > 1;

  const [aspectClass, setAspectClass] =
    useState("landscape");

  const handleAspectRatio = useCallback(
    (ratio) => {
      if (ratio < 0.8) setAspectClass("portrait");
      else if (ratio <= 1.2) setAspectClass("square");
      else if (ratio <= 2.0) setAspectClass("landscape");
      else setAspectClass("very-wide");
    },
    []
  );

  /* ==================================================
     VIDEO AUTOPLAY
  ================================================== */

  useEffect(() => {
    if (
      !videoRef.current ||
      !videoSrc
    )
      return;

    const el =
      videoRef.current;

    const promise =
      el.play();

    if (
      promise?.catch
    ) {
      promise.catch(() => {});
    }

    return () =>
      el.pause();
  }, [videoSrc]);

  /* ==================================================
     RENDER
  ================================================== */

  return (
    <>
      {/* ==============================================
         MEDIA CONTAINER
      ============================================== */}

      <div
        className={`
        relative

        bg-slate-100
        dark:bg-[#030712]

        flex
        items-center
        justify-center

        overflow-hidden

        ${
          isPortrait
            ? `
              w-full

              min-h-[68vh]
              lg:min-h-0
              lg:h-full
              lg:flex-1
            `
            : `
              w-full

              max-h-[40vh]
              md:max-h-[48vh]

              ${
                aspectClass === "square"
                  ? "max-h-[55vh] md:max-h-[60vh]"
                  : aspectClass === "portrait"
                    ? "max-h-[55vh] md:max-h-[60vh]"
                    : aspectClass === "very-wide"
                      ? "max-h-[38vh] md:max-h-[42vh]"
                      : ""
              }
            `
        }
        `}
      >
        {/* Gradient */}
        <div
          className="
          absolute
          inset-0

          bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_50%)]
          "
        />

        {/* ==========================================
           FULLSCREEN BTN
        ========================================== */}

        {!isVideo && (
          <button
            onClick={
              onOpenFullscreen
            }
            aria-label={t("accessibility.viewFullscreen")}
            className="
            absolute
            top-5
            left-5
            z-20

            w-11
            h-11

            rounded-2xl

            border
            border-slate-200 dark:border-white/10

            bg-black/40

            backdrop-blur-xl

            flex
            items-center
            justify-center

            text-foreground dark:text-white

            hover:bg-black/60
            hover:border-blue-400/20

            transition-all
            duration-300
            "
          >
            <Maximize2
              size={17}
            />
          </button>
        )}

        {/* ==========================================
           COUNTER
        ========================================== */}

        {hasMulti && (
          <div
            className="
            absolute
            bottom-5
            right-5
            z-20

            px-3
            py-1.5

            rounded-full

            border
            border-slate-200 dark:border-white/10

            bg-black/50

            backdrop-blur-xl

            text-foreground dark:text-white
            text-xs
            font-medium
            "
          >
            {imageIndex + 1} /{" "}
            {images.length}
          </div>
        )}

        {/* ==========================================
           VIDEO
        ========================================== */}

        {isVideo &&
        videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={images[0]}
            controls
            autoPlay
            muted
            playsInline
            preload="metadata"
            className="
            h-full
            max-h-full
            w-full

            object-contain
            "
          />
        ) : images.length >
          0 ? (
          /* ======================================
             IMAGES
          ====================================== */

          <ImageSlider
            images={images}
            imageIndex={
              imageIndex
            }
            setImageIndex={
              setImageIndex
            }
            onAspectRatioReady={
              handleAspectRatio
            }
          />
        ) : null}
      </div>

      {/* ==============================================
         FULLSCREEN
      ============================================== */}

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            key="fullscreen"
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
              duration: 0.16,
            }}
            className="
            fixed
            inset-0
            z-[999]

            bg-black/95

            flex
            items-center
            justify-center

            p-4

            backdrop-blur-md
            "
            onClick={
              onCloseFullscreen
            }
          >
            {/* Image */}
            <motion.img
              src={
                images?.[
                  imageIndex
                ]
              }
              alt={
                project.title
              }
              initial={{
                scale: 0.95,
              }}
              animate={{
                scale: 1,
              }}
              exit={{
                scale: 0.95,
              }}
              transition={{
                duration: 0.2,
              }}
              className="
              max-w-full
              max-h-full

              object-contain

              rounded-[20px]

              shadow-[0_0_50px_rgba(0,0,0,0.45)]

              cursor-default
              "
              onClick={(e) =>
                e.stopPropagation()
              }
            />

            {/* Close */}
            <button
              onClick={
                onCloseFullscreen
              }
              aria-label={t("accessibility.exitFullscreen")}
              className="
              absolute
              top-5
              right-5

              w-12
              h-12

              rounded-2xl

              border
              border-slate-200 dark:border-white/10

              bg-white/10

              backdrop-blur-xl

              flex
              items-center
              justify-center

              text-foreground dark:text-white

              hover:bg-white/20

              transition-all
              duration-300
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