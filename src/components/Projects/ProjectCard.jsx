// src/components/projects/ProjectCard.jsx

import {
  useRef,
  useState,
  useEffect,
  useMemo,
  memo,
} from "react";

import { motion } from "framer-motion";

import {
  ArrowUpRight,
  Play,
  Sparkles,
} from "lucide-react";

import { useTranslation } from "../../i18n";

/* ======================================================
   CATEGORY STYLES
====================================================== */

const BADGE_COLORS = {
  development: `
    bg-blue-500/80
    text-foreground dark:text-white
  `,

  design: `
    bg-purple-500/80
    text-foreground dark:text-white
  `,

  architecture: `
    bg-amber-500/80
    text-foreground dark:text-white
  `,
};

const TAG_COLORS = {
  development: `
    bg-blue-500/10
    text-blue-300
    border border-blue-400/20
  `,

  design: `
    bg-purple-500/10
    text-purple-300
    border border-purple-400/20
  `,

  architecture: `
    bg-amber-500/10
    text-amber-300
    border border-amber-400/20
  `,

  default: `
    bg-slate-100/80 dark:bg-white/[0.04]
    text-slate-600 dark:text-gray-300
    border border-slate-200 dark:border-white/10
  `,
};

/* ======================================================
   HELPERS
====================================================== */

function getVisibleTagLimit(
  width,
  tagCount
) {
  if (tagCount <= 1)
    return tagCount;

  if (width < 220)
    return Math.min(tagCount, 1);

  if (width < 320)
    return Math.min(tagCount, 2);

  return Math.min(tagCount, 3);
}

/* ======================================================
   COMPONENT
====================================================== */

const ProjectCard = memo(
  function ProjectCard({
    project,
    index = 0,
    getImages,
    loadedMap,
    handleThumbLoad,
    openModal,
    CARD_VARIANTS,
    onTagClick,
  }) {
    const { t } = useTranslation();
    const thumb =
      getImages(project)[0] ?? "";

    const isVideo =
      project.type === "video";

    const isLoaded =
      !!loadedMap[project.id];

    const isFirstCard =
      index === 0;

    const containerRef =
      useRef(null);

    const [
      containerWidth,
      setContainerWidth,
    ] = useState(0);

    const [thumbError, setThumbError] = useState(false);

    /* ==================================================
       RESIZE
    ================================================== */

    useEffect(() => {
      const container =
        containerRef.current;

      if (!container) return;

      let frame;

      const run = () => {
        cancelAnimationFrame(frame);

        frame =
          requestAnimationFrame(() => {
            const nextWidth =
              Math.round(
                container.offsetWidth
              );

            setContainerWidth(
              (prev) =>
                prev === nextWidth
                  ? prev
                  : nextWidth
            );
          });
      };

      run();

      const ro =
        new ResizeObserver(run);

      ro.observe(container);

      return () => {
        cancelAnimationFrame(frame);

        ro.disconnect();
      };
    }, []);

    /* ==================================================
       RESET THUMB ERROR ON PROJECT CHANGE
    ================================================== */

    useEffect(() => {
      setThumbError(false);
    }, [project.id]);

    /* ==================================================
       TAGS
    ================================================== */

    const tags =
      project.tags ?? [];

    const visibleCount =
      useMemo(
        () =>
          getVisibleTagLimit(
            containerWidth,
            tags.length
          ),
        [
          containerWidth,
          tags.length,
        ]
      );

    const visibleTags =
      tags.slice(0, visibleCount);

    const hiddenCount =
      tags.length -
      visibleTags.length;

    const tagCls =
      TAG_COLORS[
        project.category
      ] ?? TAG_COLORS.default;

    const badgeCls =
      BADGE_COLORS[
        project.category
      ] ??
      "bg-gray-500/80 text-foreground dark:text-white";

    /* ==================================================
       RENDER
    ================================================== */

    return (
      <motion.article
        variants={CARD_VARIANTS}
        initial="hidden"
        animate="visible"
        exit="exit"
        whileHover={{
          y: -8,
        }}
        transition={{
          duration: 0.25,
        }}
        onClick={() =>
          openModal(project)
        }
        onKeyDown={(e) =>
          e.key === "Enter" &&
          openModal(project)
        }
        tabIndex={0}
        role="button"
        aria-label={t("accessibility.viewProject", { title: project.title })}
        className="
        group
        relative
        overflow-hidden

        rounded-[30px]

        border
        border-slate-200 dark:border-white/10

        bg-slate-100/80 dark:bg-white/[0.03]

        backdrop-blur-xl

        cursor-pointer

        transition-all
        duration-500

        hover:border-blue-400/20
        hover:shadow-[0_0_45px_rgba(59,130,246,0.12)]

        outline-none
        "
      >
        {/* ==================================================
           GLOW
        ================================================== */}

        <div
          className="
          absolute
          inset-0

          opacity-0
          group-hover:opacity-100

          transition-opacity
          duration-500

          bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_50%)]
          "
        />

        {/* ==================================================
           IMAGE
        ================================================== */}

        <div
          className="
          relative

          h-[260px]

          overflow-hidden

          bg-slate-100 dark:bg-[#081120]
          "
        >
          {/* Skeleton */}
          {!isLoaded && (
            <div
              className="
              absolute
              inset-0

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
          )}

          {/* Image */}
          {thumbError ? (
            <div
              className="
              w-full
              h-full

              flex
              items-center
              justify-center

              bg-slate-200/50
              dark:bg-white/[0.02]

              text-slate-400
              dark:text-slate-600

              text-sm
              font-medium
              "
            >
              No Preview
            </div>
          ) : (
            <img
              src={thumb}
              alt={project.title}
              loading={
                isFirstCard
                  ? "eager"
                  : "lazy"
              }
              decoding={
                isFirstCard
                  ? "sync"
                  : "async"
              }
              fetchPriority={
                isFirstCard
                  ? "high"
                  : "auto"
              }
              width="640"
              height="260"
              onLoad={() =>
                handleThumbLoad(
                  project.id
                )
              }
              onError={() =>
                setThumbError(true)
              }
              className={`
              w-full
              h-full

              object-cover

              transition-all
              duration-700

              group-hover:scale-105

              ${
                isLoaded
                  ? "opacity-100"
                  : "opacity-0"
              }
              `}
            />
          )}

          {/* Overlay */}
          <div
            className="
            absolute
            inset-0

            bg-gradient-to-t
            from-[#020817]
            via-[#020817]/20
            to-transparent

            opacity-90
            "
          />

          {/* Top Content */}
          <div
            className="
            absolute
            top-4
            left-4
            right-4

            z-10

            flex
            items-start
            justify-between
            gap-3
            "
          >
            {/* Category */}
            <span
              className={`
              inline-flex
              items-center

              px-3
              py-1.5

              rounded-full

              text-[11px]
              font-bold

              uppercase
              tracking-[0.14em]

              backdrop-blur-xl

              ${badgeCls}
              `}
            >
              {project.category}
            </span>

            {/* Video */}
            {isVideo && (
              <div
                className="
                flex
                items-center
                gap-1.5

                px-3
                py-1.5

                rounded-full

                bg-black/50

                text-foreground dark:text-white
                text-[11px]
                font-semibold

                backdrop-blur-xl
                "
              >
                <Play
                  size={12}
                  fill="white"
                />

                {t("projectsSection.card.videoLabel")}
              </div>
            )}
          </div>

          {/* Hover CTA */}
          <div
            className="
            absolute
            inset-0

            flex
            items-center
            justify-center

            opacity-0
            group-hover:opacity-100

            transition-all
            duration-500
            "
          >
            <div
              className="
              flex
              items-center
              gap-3

              px-6
              py-3

              rounded-2xl

              border
              border-slate-200 dark:border-white/10

              bg-black/40

              backdrop-blur-xl

              text-foreground dark:text-white
              font-semibold
              "
            >
              {t("projectsSection.card.viewCaseStudy")}

              <ArrowUpRight
                size={18}
              />
            </div>
          </div>
        </div>

        {/* ==================================================
           CONTENT
        ================================================== */}

        <div className="relative z-10 p-6">
          {/* Meta */}
          <div
            className="
            flex
            items-center
            gap-2

            mb-3
            "
          >
            <Sparkles
              size={14}
              className="
              text-blue-300
              "
            />

            <span
              className="
              text-xs
              uppercase
              tracking-[0.16em]

              text-slate-500 dark:text-gray-500
              "
            >
              {project.role}
            </span>
          </div>

          {/* Title */}
          <h3
            className="
            text-2xl
            font-bold

            text-foreground dark:text-white

            leading-tight

            transition-colors
            duration-300

            group-hover:text-blue-300
            "
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            className="
            mt-4

            text-muted dark:text-slate-500 dark:text-gray-400
            text-sm

            leading-relaxed

            line-clamp-3
            "
          >
            {project.description}
          </p>

          {/* Divider */}
          <div
            className="
            mt-5
            mb-5

            h-px

            bg-gradient-to-r
            from-white/10
            to-transparent
            "
          />

          {/* Tags */}
          <div
            ref={containerRef}
            className="
            flex
            flex-wrap
            gap-2
            "
          >
            {visibleTags.map(
              (tag) => (
                <button
                  key={tag}
                  type="button"
                  title={t("projectsSection.card.filterByTag", { tag })}
                  aria-label={t("projectsSection.card.filterByTag", { tag })}
                  onClick={(e) => {
                    e.stopPropagation();
                    onTagClick?.(tag);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.stopPropagation();
                    }
                  }}
                  className={`
                  px-3
                  py-1.5

                  rounded-full

                  text-xs
                  font-medium

                  whitespace-nowrap

                  transition-all
                  duration-200

                  hover:brightness-125

                  ${tagCls}
                  `}
                >
                  {tag}
                </button>
              )
            )}

            {hiddenCount > 0 && (
              <span
                className="
                px-3
                py-1.5

                rounded-full

                text-xs
                font-medium

                bg-slate-100/80 dark:bg-white/[0.04]
                text-slate-600 dark:text-gray-300

                border
                border-slate-200 dark:border-white/10
                "
              >
                {t("projectsSection.card.hiddenCount", { count: hiddenCount })}
              </span>
            )}
          </div>
        </div>
      </motion.article>
    );
  }
);

export default ProjectCard;