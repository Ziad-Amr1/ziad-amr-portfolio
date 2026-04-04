// src/components/projects/ProjectCard.jsx
import { useRef, useState, useEffect, useMemo, memo } from "react";
import { motion } from "framer-motion";

const BADGE_COLORS = {
  development:  "bg-teal-500/80   text-white",
  design:       "bg-purple-500/80 text-white",
  architecture: "bg-amber-500/80  text-white",
};

const TAG_COLORS = {
  development:  "bg-teal-100   text-teal-800   dark:bg-teal-900/50   dark:text-teal-300",
  design:       "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
  architecture: "bg-amber-100  text-amber-800  dark:bg-amber-900/50  dark:text-amber-300",
  default:      "bg-blue-100   text-blue-800   dark:bg-navy-layer     dark:text-blue-soft",
};

function getVisibleTagLimit(width, tagCount) {
  if (tagCount <= 1) return tagCount;
  if (width < 220) return Math.min(tagCount, 1);
  if (width < 280) return Math.min(tagCount, 2);
  if (width < 360) return Math.min(tagCount, 3);
  return Math.min(tagCount, 4);
}

// index prop: first card in grid gets LCP priority treatment
const ProjectCard = memo(function ProjectCard({
  project,
  index = 0,
  getImages,
  loadedMap,
  handleThumbLoad,
  openModal,
  CARD_VARIANTS,
}) {
  const thumb       = getImages(project)[0] ?? "";
  const isVideo     = project.type === "video";
  const isLoaded    = !!loadedMap[project.id];
  const isFirstCard = index === 0;

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let frame;
    const run = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const nextWidth = Math.round(container.offsetWidth);
        setContainerWidth((prev) => (prev === nextWidth ? prev : nextWidth));
      });
    };
    run();
    const ro = new ResizeObserver(run);
    ro.observe(container);
    return () => { cancelAnimationFrame(frame); ro.disconnect(); };
  }, []);

  const tags        = project.tags ?? [];
  const visibleCount = useMemo(
    () => getVisibleTagLimit(containerWidth, tags.length),
    [containerWidth, tags.length],
  );
  const visibleTags = tags.slice(0, visibleCount);
  const hiddenCount = tags.length - visibleTags.length;
  const tagCls      = TAG_COLORS[project.category]   ?? TAG_COLORS.default;
  const badgeCls    = BADGE_COLORS[project.category] ?? "bg-gray-500/80 text-white";

  return (
    <motion.article
      variants={CARD_VARIANTS}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      onClick={() => openModal(project)}
      onKeyDown={(e) => e.key === "Enter" && openModal(project)}
      tabIndex={0}
      role="button"
      aria-label={`View case study for ${project.title}`}
      className="group relative bg-white dark:bg-navy-surface rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <div className="relative w-full overflow-hidden bg-gray-100 dark:bg-gray-800/60">
        {!isLoaded && (
          <div className="h-[240px] overflow-hidden bg-gray-200 dark:bg-gray-700/60">
            <div className="h-full w-full -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
          </div>
        )}

        {/* LCP fix: first card = eager + high priority. Others = lazy + async */}
        <img
          src={thumb}
          alt={project.title}
          loading={isFirstCard ? "eager" : "lazy"}
          decoding={isFirstCard ? "sync" : "async"}
          fetchPriority={isFirstCard ? "high" : "auto"}
          width="640"
          height="240"
          onLoad={() => handleThumbLoad(project.id)}
          className={`w-full h-[240px] object-cover transition-all duration-500 group-hover:scale-105 ${isLoaded ? "opacity-100" : "opacity-0 absolute inset-0"}`}
        />

        {isLoaded && <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300" />}
        {isLoaded && (
          <div className="absolute inset-x-3 top-3 z-10 flex items-start justify-between gap-2 pointer-events-none">
            <div className="min-w-0 flex-1">
              {project.category && (
                <span className={`inline-flex max-w-full items-center rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm ${badgeCls}`}>
                  <span className="truncate">{project.category}</span>
                </span>
              )}
            </div>

            {isVideo && (
              <span className="inline-flex shrink-0 items-center rounded-md bg-black/60 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                ▶ Video
              </span>
            )}
          </div>
        )}
        {isLoaded && (
          <p className="absolute bottom-3 right-3 z-10 text-xs font-medium text-white select-none pointer-events-none opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            View case study →
          </p>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-base text-blue-600 dark:text-blue-mid mb-1 truncate" title={project.title}>
          {project.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed">
          {project.description}
        </p>

        <div ref={containerRef} className="flex gap-1.5 overflow-hidden">
          {visibleTags.map((t) => (
            <span key={t} title={t} className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap font-medium ${tagCls}`}>{t}</span>
          ))}
          {hiddenCount > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full whitespace-nowrap bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300">+{hiddenCount}</span>
          )}
        </div>

      </div>
    </motion.article>
  );
});

export default ProjectCard;
