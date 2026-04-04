// src/components/Projects/ProjectCaseStudy.jsx
import { motion } from "framer-motion";

// ─────────────────────────────────────────
// Constants
// ─────────────────────────────────────────

export const CATEGORY_COLORS = {
  development:  "bg-teal-100   text-teal-800   dark:bg-teal-900/40   dark:text-teal-300",
  design:       "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
  architecture: "bg-amber-100  text-amber-800  dark:bg-amber-900/40  dark:text-amber-300",
};

// ─────────────────────────────────────────
// Internal atoms
// ─────────────────────────────────────────

function TagBadge({ tag, category }) {
  const colorClass =
    CATEGORY_COLORS[category] ??
    "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300";
  return (
    <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${colorClass}`}>
      {tag}
    </span>
  );
}

function CaseStudyBlock({ label, color, text, index }) {
  if (!text) return null;

  const styles = {
    red:   "border-red-400   bg-red-50   dark:bg-red-900/20   text-red-700   dark:text-red-300",
    blue:  "border-blue-400  bg-blue-50  dark:bg-blue-900/20  text-blue-700  dark:text-blue-300",
    green: "border-green-400 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300",
  };

  const labelStyles = {
    red:   "text-red-600   dark:text-red-400",
    blue:  "text-blue-600  dark:text-blue-400",
    green: "text-green-600 dark:text-green-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.07 }}
      className={`rounded-lg border-l-4 p-3 ${styles[color]}`}
    >
      <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${labelStyles[color]}`}>
        {label}
      </p>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-200">
        {text}
      </p>
    </motion.div>
  );
}

function ProjectLinks({ links }) {
  const real = links?.filter((l) => l.url && l.url !== "#") ?? [];
  if (!real.length) return null;

  return (
    <div className="flex flex-wrap gap-2 pt-1">
      {real.map((link, i) => (
        <a
          key={i}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-1.5
            px-4 py-2 rounded-lg text-sm font-medium
            bg-primary text-white
            dark:bg-blue-soft dark:text-dark
            hover:brightness-110 transition
          "
        >
          {link.text}
          <span className="text-xs opacity-70">↗</span>
        </a>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────
// Main export
// ─────────────────────────────────────────

export default function ProjectCaseStudy({ project }) {
  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-y-auto px-6 pt-5 pb-4">

      {/* Header: category · role · year */}
      <div className="mb-4 pr-8">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {project.category && (
            <span
              className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full
                ${CATEGORY_COLORS[project.category] ?? "bg-gray-100 text-gray-600"}`}
            >
              {project.category}
            </span>
          )}
          {project.role && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {project.role}
            </span>
          )}
          {project.year && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              · {project.year}
            </span>
          )}
        </div>

        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-soft leading-tight">
          {project.title}
        </h2>
      </div>

      {/* Description */}
      {project.description && (
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-5">
          {project.description}
        </p>
      )}

      {/* Case study blocks */}
      {(project.problem || project.solution || project.result) && (
        <div className="flex flex-col gap-2.5 mb-5">
          <CaseStudyBlock label="Problem"  color="red"   text={project.problem}  index={0} />
          <CaseStudyBlock label="Solution" color="blue"  text={project.solution} index={1} />
          <CaseStudyBlock label="Result"   color="green" text={project.result}   index={2} />
        </div>
      )}

      {/* Tags */}
      {project.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag, i) => (
            <TagBadge key={i} tag={tag} category={project.category} />
          ))}
        </div>
      )}

      {/* Links */}
      <ProjectLinks links={project.links} />

      <div className="flex-1" />
    </div>
  );
}
