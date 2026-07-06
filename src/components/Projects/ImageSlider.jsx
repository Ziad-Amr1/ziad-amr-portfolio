// src/components/projects/ImageSlider.jsx

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
} from "react";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useTranslation } from "../../i18n";

/* ======================================================
   SKELETON
====================================================== */

function SliderSkeleton() {
  return (
    <div
      className="
      w-full
      h-full
      min-h-[260px]

      rounded-[24px]

      overflow-hidden

      bg-slate-100/80 dark:bg-white/[0.03]
      "
    >
      <div
        className="
        h-full
        w-full

        -translate-x-full

        animate-[shimmer_1.5s_infinite]

        bg-gradient-to-r
        from-transparent
        via-white/10
        to-transparent
        "
      />
    </div>
  );
}

/* ======================================================
   COMPONENT
====================================================== */

const ImageSlider = memo(
  function ImageSlider({
    images = [],
    video = null,
    imageIndex,
    setImageIndex,
    onAspectRatioReady,
  }) {
    const { t } = useTranslation();
    const [imgLoaded, setImgLoaded] =
      useState(false);
    const imgRef = useRef(null);

    // Reset skeleton whenever image changes.
    // Also check img.complete to handle cached images
    // where onLoad may fire before React attaches the handler.
    useEffect(() => {
      setImgLoaded(false);

      if (imgRef.current?.complete) {
        setImgLoaded(true);
      }
    }, [imageIndex, images]);

    const handleLoad = useCallback(() => {
      setImgLoaded(true);

      if (onAspectRatioReady && imgRef.current) {
        const { naturalWidth, naturalHeight } = imgRef.current;
        if (naturalWidth && naturalHeight) {
          onAspectRatioReady(naturalWidth / naturalHeight);
        }
      }
    }, [onAspectRatioReady]);

    const handleError = useCallback(() => {
      setImgLoaded(true);
    }, []);

    /* ==================================================
       VIDEO ONLY
    ================================================== */

    if (video && !images.length) {
      return (
        <div className="w-full p-4">
          <video
            src={video}
            controls
            autoPlay
            muted
            playsInline
            className="
            w-full
            max-h-[520px]

            rounded-[24px]

            object-cover
            "
          />
        </div>
      );
    }

    /* ==================================================
       EMPTY
    ================================================== */

    if (!images.length) {
      return (
        <div
          className="
          p-10

          text-center
          text-muted dark:text-slate-500 dark:text-gray-400
          "
        >
          {t("projectModal.noPreview")}
        </div>
      );
    }

    const hasMultiple =
      images.length > 1;

    /* ==================================================
       RENDER
    ================================================== */

    return (
      <div
        className="
          w-full
          h-full

          relative

          flex
          flex-col
          items-center
          justify-center

          min-h-0
        "
      >
        {/* Main Image */}
        <div
          className="
            relative

            w-full
            flex-1
            min-h-0

            flex
            items-center
            justify-center

            overflow-hidden

            rounded-[28px]

            bg-slate-100
            dark:bg-[#081120]
          "
        >
          {!imgLoaded && (
            <SliderSkeleton />
          )}

          <img
            ref={imgRef}
            key={images[imageIndex]}
            src={images[imageIndex]}
            alt={t("projectModal.slideAlt", { number: imageIndex + 1 })}
            loading="lazy"
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
            className={`
            w-full
            h-full

            object-contain
            object-center

            transition-opacity
            duration-300

            ${
              imgLoaded
                ? "opacity-100"
                : "opacity-0 absolute inset-0"
            }
            `}
          />

          {/* Controls */}
          {hasMultiple && (
            <>
              {/* Prev */}
              <button
                onClick={() => {
                  setImgLoaded(
                    false
                  );

                  setImageIndex(
                    (i) =>
                      (i -
                        1 +
                        images.length) %
                      images.length
                  );
                }}
                aria-label={t("accessibility.previousImage")}
                className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2

                w-12
                h-12

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

                transition-all
                duration-300
                "
              >
                <ChevronLeft
                  size={20}
                />
              </button>

              {/* Next */}
              <button
                onClick={() => {
                  setImgLoaded(
                    false
                  );

                  setImageIndex(
                    (i) =>
                      (i + 1) %
                      images.length
                  );
                }}
                aria-label={t("accessibility.nextImage")}
                className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2

                w-12
                h-12

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

                transition-all
                duration-300
                "
              >
                <ChevronRight
                  size={20}
                />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {hasMultiple && (
          <div
            className="
            mt-5

            w-full

            flex
            gap-3

            overflow-x-auto

            pb-2
            "
          >
            {images.map(
              (src, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setImgLoaded(
                      false
                    );

                    setImageIndex(
                      idx
                    );
                  }}
                  aria-label={t("accessibility.goToImage", { number: idx + 1 })}
                  className={`
                  relative

                  shrink-0

                  w-[92px]
                  h-[62px]

                  overflow-hidden

                  rounded-2xl

                  border-2

                  transition-all
                  duration-300

                  ${
                    idx ===
                    imageIndex
                      ? `
                        border-blue-400
                        shadow-[0_0_20px_rgba(59,130,246,0.35)]
                        opacity-100
                      `
                      : `
                        border-transparent
                        opacity-50
                        hover:opacity-100
                      `
                  }
                  `}
                >
                  <img
                    src={src}
                    loading="lazy"
                    alt={t("projectModal.thumbAlt", { number: idx + 1 })}
                    className="
                    w-full
                    h-full

                    object-cover
                    "
                  />
                </button>
              )
            )}
          </div>
        )}
      </div>
    );
  }
);

export default ImageSlider;