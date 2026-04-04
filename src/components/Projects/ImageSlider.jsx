// src/components/projects/ImageSlider.jsx
import { useState, memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ─────────────────────────────────────────
// Skeleton
// ─────────────────────────────────────────

function SliderSkeleton() {
  return (
    <div className="w-full h-full min-h-[200px] animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 bg-[length:200%_100%] rounded-md" />
  );
}

// ─────────────────────────────────────────
// Component
// ─────────────────────────────────────────

const ImageSlider = memo(function ImageSlider({
  images = [],
  video  = null,
  imageIndex,
  setImageIndex,
}) {
  const [imgLoaded, setImgLoaded] = useState(false);

  // ── Video-only mode ──
  if (video && !images.length) {
    return (
      <div className="w-full p-4">
        {/* Fix: added muted — browsers block autoplay without it */}
        <video
          src={video}
          controls
          autoPlay
          muted
          playsInline
          className="w-full max-h-[480px] rounded-md object-cover"
        />
      </div>
    );
  }

  // ── Image mode ──
  if (!images.length) {
    return (
      <div className="p-6 text-center text-sm text-gray-500 dark:text-gray-400">
        No preview available
      </div>
    );
  }

  const hasMultiple = images.length > 1;

  return (
    <div className="w-full relative flex flex-col items-center justify-center">
      <div className="w-full flex items-center justify-center relative">

        {/* Skeleton while loading */}
        {!imgLoaded && <SliderSkeleton />}

        <img
          key={images[imageIndex]}
          src={images[imageIndex]}
          alt={`slide-${imageIndex + 1}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          className={`
            max-w-full max-h-full object-contain rounded-md
            transition-opacity duration-300
            ${imgLoaded ? "opacity-100" : "opacity-0 absolute inset-0"}
          `}
        />

        {/* Prev / Next — only with multiple images */}
        {hasMultiple && (
          <>
            <button
              onClick={() => {
                setImgLoaded(false);
                setImageIndex((i) => (i - 1 + images.length) % images.length);
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => {
                setImgLoaded(false);
                setImageIndex((i) => (i + 1) % images.length);
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {hasMultiple && (
        <div className="mt-3 w-full px-4 flex gap-2 overflow-x-auto">
          {images.map((src, idx) => (
            <button
              key={idx}
              onClick={() => {
                setImgLoaded(false);
                setImageIndex(idx);
              }}
              aria-label={`Go to image ${idx + 1}`}
              className={`rounded-md overflow-hidden border-2 shrink-0 transition ${
                idx === imageIndex ? "border-blue-500 dark:border-blue-soft" : "border-transparent opacity-60 hover:opacity-100"
              }`}
              style={{ width: 84, height: 56 }}
            >
              <img src={src} loading="lazy" alt={`thumb-${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

export default ImageSlider;