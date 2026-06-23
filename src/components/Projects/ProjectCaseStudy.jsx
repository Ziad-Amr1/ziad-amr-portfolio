// src/components/projects/ProjectCaseStudy.jsx

import { motion } from "framer-motion";

import {
  Sparkles,
  Calendar,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";

/* ======================================================
   CATEGORY COLORS
====================================================== */

export const CATEGORY_COLORS = {
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
};

/* ======================================================
   TAG BADGE
====================================================== */

function TagBadge({
  tag,
  category,
  onClick,
}) {
  const colorClass =
    CATEGORY_COLORS[
      category
    ] ??
    `
    bg-slate-100/80 dark:bg-white/[0.04]
    text-slate-600 dark:text-gray-300
    border border-slate-200 dark:border-white/10
    `;

  const isClickable = typeof onClick === "function";
  const Component = isClickable ? "button" : "span";

  return (
    <Component
      type={isClickable ? "button" : undefined}
      aria-label={
        isClickable
          ? `Filter projects by ${tag}`
          : undefined
      }
      onClick={isClickable ? onClick : undefined}
      className={`
      px-3
      py-1.5

      rounded-full

      text-xs
      font-medium

      whitespace-nowrap

      ${isClickable ? "transition-all duration-200 hover:brightness-125" : ""}

      ${colorClass}
      `}
    >
      {tag}
    </Component>
  );
}

/* ======================================================
   CASE BLOCK
====================================================== */

function CaseStudyBlock({
  label,
  color,
  text,
  index,
}) {
  if (!text) return null;

  const styles = {
    red: `
      border-red-400/30
      bg-red-500/10
    `,

    blue: `
      border-blue-400/30
      bg-blue-500/10
    `,

    green: `
      border-emerald-400/30
      bg-emerald-500/10
    `,
  };

  const labelStyles = {
    red: "text-red-300",

    blue: "text-blue-300",

    green:
      "text-emerald-300",
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
        delay: index * 0.08,
      }}
      className={`
      relative
      overflow-hidden

      rounded-[24px]

      border
      border-slate-200 dark:border-white/10

      p-5

      backdrop-blur-xl

      ${styles[color]}
      `}
    >
      {/* Glow */}
      <div
        className="
        absolute
        inset-0

        opacity-50

        bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_50%)]
        "
      />

      {/* Label */}
      <div
        className="
        relative
        z-10

        flex
        items-center
        gap-2

        mb-3
        "
      >
        <Sparkles
          size={14}
          className={
            labelStyles[
              color
            ]
          }
        />

        <p
          className={`
          text-[11px]
          font-bold

          uppercase
          tracking-[0.18em]

          ${labelStyles[color]}
          `}
        >
          {label}
        </p>
      </div>

      {/* Text */}
      <p
        className="
        relative
        z-10

        text-sm
        leading-relaxed

        text-slate-600 dark:text-gray-300
        "
      >
        {text}
      </p>
    </motion.div>
  );
}

/* ======================================================
   LINKS
====================================================== */

function ProjectLinks({
  links,
}) {
  const real =
    links?.filter(
      (l) =>
        l.url &&
        l.url !== "#"
    ) ?? [];

  if (!real.length)
    return null;

  return (
    <div
      className="
      flex
      flex-wrap
      gap-3

      pt-2
      "
    >
      {real.map(
        (link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
            group

            inline-flex
            items-center
            gap-2

            px-5
            py-3

            rounded-2xl

            border
            border-slate-200 dark:border-white/10

            bg-slate-100/80 dark:bg-white/[0.03]

            text-foreground dark:text-white
            text-sm
            font-medium

            hover:bg-white/[0.06]
            hover:border-blue-400/20

            transition-all
            duration-300
            "
          >
            {link.text}

            <ArrowUpRight
              size={15}
              className="
              transition-transform
              duration-300

              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
              "
            />
          </a>
        )
      )}
    </div>
  );
}

/* ======================================================
   MAIN COMPONENT
====================================================== */

export default function ProjectCaseStudy({
  project,
  onTagClick,
}) {
  return (
    <div
      className="
      flex
      flex-col

      flex-1
      min-h-0

      overflow-y-auto

      px-6
      md:px-8

      pt-7
      pb-6
      "
    >
      {/* ==================================================
         HEADER
      ================================================== */}

      <div className="mb-6 pr-10">
        {/* Meta */}
        <div
          className="
          flex
          flex-wrap
          items-center
          gap-3

          mb-4
          "
        >
          {/* Category */}
          {project.category && (
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
              tracking-[0.16em]

              ${
                CATEGORY_COLORS[
                  project.category
                ] ??
                `
                bg-slate-100/80 dark:bg-white/[0.04]
                text-slate-600 dark:text-gray-300
                border border-slate-200 dark:border-white/10
                `
              }
              `}
            >
              {
                project.category
              }
            </span>
          )}

          {/* Role */}
          {project.role && (
            <span
              className="
              inline-flex
              items-center
              gap-2

              text-sm
              text-muted dark:text-slate-500 dark:text-gray-400
              "
            >
              <Briefcase
                size={14}
              />

              {project.role}
            </span>
          )}

          {/* Year */}
          {project.year && (
            <span
              className="
              inline-flex
              items-center
              gap-2

              text-sm
              text-slate-500 dark:text-gray-500
              "
            >
              <Calendar
                size={14}
              />

              {
                project.year
              }
            </span>
          )}
        </div>

        {/* Title */}
        <h2
          className="
          text-3xl
          md:text-4xl

          font-black

          leading-tight
          tracking-tight

          text-foreground dark:text-white
          "
        >
          {project.title}
        </h2>
      </div>

      {/* ==================================================
         DESCRIPTION
      ================================================== */}

      {project.description && (
        <p
          className="
          text-muted dark:text-slate-500 dark:text-gray-400
          leading-relaxed

          text-[15px]

          mb-7
          "
        >
          {
            project.description
          }
        </p>
      )}

      {/* ==================================================
         CASE STUDY
      ================================================== */}

      {(project.problem ||
        project.solution ||
        project.result) && (
        <div
          className="
          flex
          flex-col
          gap-4

          mb-7
          "
        >
          <CaseStudyBlock
            label="Problem"
            color="red"
            text={
              project.problem
            }
            index={0}
          />

          <CaseStudyBlock
            label="Solution"
            color="blue"
            text={
              project.solution
            }
            index={1}
          />

          <CaseStudyBlock
            label="Result"
            color="green"
            text={
              project.result
            }
            index={2}
          />
        </div>
      )}

      {/* ==================================================
         TAGS
      ================================================== */}

      {project.tags
        ?.length > 0 && (
        <div
          className="
          flex
          flex-wrap
          gap-2

          mb-7
          "
        >
          {project.tags.map(
            (tag, i) => (
              <TagBadge
                key={i}
                tag={tag}
                category={
                  project.category
                }
                onClick={
                  onTagClick
                    ? (e) => {
                      e?.stopPropagation();
                      onTagClick(tag);
                    }
                    : undefined
                }
              />
            )
          )}
        </div>
      )}

      {/* ==================================================
         LINKS
      ================================================== */}

      <ProjectLinks
        links={project.links}
      />

      <div className="flex-1" />
    </div>
  );
}