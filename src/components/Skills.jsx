// src/components/Skills.jsx

import { memo, useCallback } from "react";
import { motion } from "framer-motion";

import { useTabs } from "../hooks/useTabs";
import { useTranslation } from "../i18n";
import { fadeInUp } from "../utils/motionVariants";
import { CATEGORIES, LEVEL_STYLES, SKILLS_DATA } from "../data/skillsData";
import { getSkillProjectCount } from "../utils/projectCounts";

import {
  Code2,
  Gamepad2,
  Database,
  Sparkles,
} from "lucide-react";

/* ======================================================
   CUSTOM ICONS
====================================================== */

const CUSTOM_ICONS = {
  "Game Development": Gamepad2,
  "Data Engineering": Database,
};

/* ======================================================
   SKILL CARD
====================================================== */

function getPrimaryFilterTag(skill, tagCounts) {
  if (!Array.isArray(skill.tags)) return null;
  for (const tag of skill.tags) {
    const key = tag.toLowerCase();
    if (tagCounts[key] > 0) return tag;
  }
  return skill.tags[0] ?? null;
}

function isSkillActive(skill, activeTagFilter) {
  if (!activeTagFilter || !Array.isArray(skill.tags)) return false;
  const filter = activeTagFilter.toLowerCase();
  return skill.tags.some((t) => t.toLowerCase() === filter);
}

const SkillCard = memo(function SkillCard({
  skill,
  index,
  tagCounts,
  activeTagFilter,
  onSkillSelect,
}) {
  const { t } = useTranslation();

  const imgName = skill.name.replace(/[\s/]/g, "");
  const imgSrc = `/images/skills/${imgName}.webp`;

  const levelClass = LEVEL_STYLES[skill.level] ?? "";

  const isCore = skill.level === "Core";
  const CustomIcon = CUSTOM_ICONS[skill.name];

  const projectCount = getSkillProjectCount(skill, tagCounts);
  const primaryTag = getPrimaryFilterTag(skill, tagCounts);
  const active = isSkillActive(skill, activeTagFilter);
  const clickable = primaryTag !== null;

  const handleClick = useCallback(() => {
    if (primaryTag && onSkillSelect) onSkillSelect(primaryTag);
  }, [primaryTag, onSkillSelect]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (primaryTag && onSkillSelect) onSkillSelect(primaryTag);
    }
  }, [primaryTag, onSkillSelect]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.04,
        duration: 0.35,
      }}
      className="h-full"
    >
      <div
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
        aria-pressed={clickable ? active : undefined}
        aria-label={clickable ? t("accessibility.filterByTag", { tag: skill.name }) : undefined}
        onClick={clickable ? handleClick : undefined}
        onKeyDown={clickable ? handleKeyDown : undefined}
        className={`
        group
        relative
        overflow-hidden
        h-full
        rounded-[26px]
        border
        border-slate-200
        dark:border-white/10

        bg-white
        dark:bg-white/[0.03]

        shadow-[0_4px_18px_rgba(15,23,42,0.04)]
        dark:shadow-none
        backdrop-blur-xl
        p-5
        transition-all
        duration-500

        ${clickable ? "cursor-pointer" : ""}

        hover:-translate-y-2
        hover:border-blue-200
        dark:hover:border-blue-400/25

        hover:shadow-[0_18px_50px_rgba(59,130,246,0.12)]
        dark:hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]

        ${active ? "ring-2 ring-blue-400/50 dark:ring-blue-400/60" : ""}
        ${clickable ? "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900" : ""}
        `}
      >
        {/* Glow */}
        <div
          className="
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
          bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_45%)]
          "
        />

        {/* Top Border */}
        <div
          className="
          absolute
          top-0
          left-0
          h-[1px]
          w-full
          bg-gradient-to-r
          from-transparent
          via-blue-400/40
          to-transparent
          "
        />

        {/* Header */}
        <div
          className="
          relative
          z-10

          flex
          items-start
          gap-4
          "
        >
          {/* Left */}
          <div
            className="
            flex
            items-start
            gap-4

            min-w-0
            flex-1
            "
          >
            {/* Icon */}
            <div
              className="
              relative
              w-14
              h-14
              rounded-2xl
              border
              border-slate-200
              dark:border-white/10

              bg-blue-50
              dark:bg-white/[0.04]
              flex
              items-center
              justify-center
              shrink-0
              "
            >
              {CustomIcon ? (
                <CustomIcon size={22} className="text-blue-500 dark:text-blue-300" />
              ) : (
                <>
                  <img
                    src={imgSrc}
                    alt={skill.name}
                    loading="lazy"
                    decoding="async"
                    className="w-7 h-7 object-contain"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.opacity = "1";
                    }}
                  />

                  <Code2
                    size={20}
                    className="absolute opacity-0 text-blue-500 dark:text-blue-300"
                  />
                </>
              )}
            </div>

            {/* Content */}
            <div
              className="
              flex-1
              min-w-0
              "
            >
              {/* Title */}
              <h4
                className="
                flex
                items-center
                gap-2

                text-lg
                font-semibold

                text-foreground
                dark:text-white

                leading-snug
                "
              >
                {isCore && (
                  <Sparkles
                    className="
                    w-4
                    h-4

                    text-emerald-500
                    dark:text-emerald-300

                    shrink-0
                    "
                  />
                )}

                <span className="break-words">
                  {skill.name}
                </span>

                {clickable && (
                  <span
                    className="
                    inline-flex
                    items-center
                    justify-center

                    ml-auto
                    min-w-[28px]
                    h-6

                    px-2

                    rounded-full

                    text-xs
                    font-bold

                    bg-blue-500/10
                    text-blue-600
                    dark:text-blue-300

                    border
                    border-blue-400/20

                    shrink-0
                    "
                    aria-label={t("accessibility.projectCount", { count: projectCount })}
                  >
                    {projectCount}
                  </span>
                )}
              </h4>

              {/* Note */}
              <p
                className="
                mt-2

                text-sm

                text-muted
                dark:text-gray-400

                leading-relaxed
                "
              >
                {skill.note}
              </p>

              {/* Badge */}
              <div className="mt-4">
                <span
                  className={`
                  inline-flex
                  items-center

                  px-3
                  py-1.5

                  rounded-full

                  text-xs
                  font-medium

                  whitespace-nowrap

                  ${levelClass}
                  `}
                >
                  {skill.level}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

/* ======================================================
   TABS
====================================================== */

const BASE_TAB = `
relative
overflow-hidden
px-6
py-3
rounded-2xl
font-semibold
transition-all
duration-300
cursor-pointer
text-sm
sm:text-base
`;

const INACTIVE_TAB = `
border
border-slate-200
dark:border-white/10

bg-white
dark:bg-white/[0.03]

shadow-[0_10px_35px_rgba(15,23,42,0.05)]
dark:shadow-none
text-muted
dark:text-gray-400
hover:text-foreground
dark:hover:text-white
hover:bg-slate-50
dark:hover:bg-white/[0.06]
hover:border-blue-400/20
`;

/* ======================================================
   MAIN COMPONENT
====================================================== */

function Skills({
  tagCounts = {},
  activeTagFilter = null,
  onSkillSelect,
}) {
  const { t } = useTranslation();
  const { activeTab, changeTab } = useTabs(
    CATEGORIES,
    "Software Development"
  );

  const currentCategory =
    SKILLS_DATA[activeTab] ?? SKILLS_DATA[CATEGORIES[0]];

  const activeTabStyle = `
    bg-gradient-to-r
    ${currentCategory.accent}
    text-white
    shadow-[0_0_25px_rgba(59,130,246,0.35)]
    scale-[1.03]
  `;

  return (
    <section
      id="skills"
      className="
      relative
      py-28
      overflow-hidden
      bg-slate-50/70
      dark:bg-background

      transition-colors
      duration-300
      "
    >
      {/* ======================================================
         BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Left Glow */}
        <div
          className="
          absolute
          left-[-180px]
          top-[20%]
          w-[450px]
          h-[450px]
          rounded-full
          bg-blue-500/10
          blur-[140px]
          "
        />

        {/* Right Glow */}
        <div
          className="
          absolute
          right-[-180px]
          bottom-[10%]
          w-[400px]
          h-[400px]
          rounded-full
          bg-cyan-400/10
          blur-[120px]
          "
        />

        {/* Grid */}
        <div
          className="
          absolute inset-0
          opacity-[0.03]
          bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)]
          dark:bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
          bg-[size:80px_80px]
          "
        />
      </div>

      <div className="max-w-[1350px] mx-auto px-[6%] md:px-[8%] lg:px-[10%]">
        {/* ======================================================
           HEADER
        ====================================================== */}

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Label */}
          <div
            className="
            inline-flex
            items-center
            px-5
            py-2
            rounded-2xl
            border
            border-slate-200
            dark:border-white/10

            bg-white
            dark:bg-white/[0.03]

            shadow-[0_4px_20px_rgba(15,23,42,0.04)]
            dark:shadow-none
            text-blue-500 dark:text-blue-300
            text-sm
            tracking-[0.18em]
            uppercase
            mb-6
            "
          >
            {t("skillsSection.label")}
          </div>

          {/* Heading */}
          <h2
            className="
            text-4xl
            md:text-6xl
            font-black
            leading-tight
            tracking-tight
            text-foreground
            dark:text-white
            "
          >
            {t("skillsSection.heading")}
            <br />

            <span
              className={`
              bg-gradient-to-r
              ${currentCategory.accent}
              bg-clip-text
              text-transparent
              `}
            >
              {t("skillsSection.headingHighlight")}
            </span>
          </h2>

          {/* Text */}
          <p
            className="
            mt-8
            max-w-3xl
            mx-auto
            text-muted
            dark:text-gray-400
            text-lg
            leading-relaxed
            "
          >
            {currentCategory.tagline}
          </p>
        </motion.div>

        {/* ======================================================
           TABS
        ====================================================== */}

        <div
          className="
          flex
          flex-wrap
          justify-center
          gap-4
          mb-16
          "
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => changeTab(cat)}
              className={`
              ${BASE_TAB}
              ${
                activeTab === cat
                  ? activeTabStyle
                  : INACTIVE_TAB
              }
              `}
            >
              <span className="relative z-10">
                {cat}
              </span>

              {activeTab === cat && (
                <motion.span
                  layoutId="activeTab"
                  className="
                  absolute
                  inset-0
                  rounded-2xl
                  bg-white/10
                  "
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ======================================================
           CONTENT
        ====================================================== */}

        <motion.div
          key={activeTab}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4 }}
          className="space-y-16"
        >
          {currentCategory.groups ? (
            currentCategory.groups.map((group, index) => (
              <div key={group.title}>
                {/* Divider */}
                {index !== 0 && (
                  <div
                    className="
                    mb-14
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-slate-300
                    dark:via-white/10
                    to-transparent
                    "
                  />
                )}

                {/* Group Title */}
                <div className="mb-8">
                  <h3
                    className="
                    text-2xl
                    md:text-3xl
                    font-bold
                    text-foreground
                    dark:text-white
                    "
                  >
                    {group.title}
                  </h3>

                  <div
                    className="
                    mt-3
                    w-16
                    h-[3px]
                    rounded-full
                    bg-gradient-to-r
                    from-blue-400
                    to-cyan-300
                    "
                  />
                </div>

                {/* Grid */}
                <div
                  className="
                  grid
                  gap-6
                  auto-rows-fr
                  grid-cols-1
                  sm:grid-cols-2
                  lg:grid-cols-3
                  xl:grid-cols-4
                  "
                >
                  {group.skills.map((skill, i) => (
                    <SkillCard
                      key={skill.name}
                      skill={skill}
                      index={i}
                      tagCounts={tagCounts}
                      activeTagFilter={activeTagFilter}
                      onSkillSelect={onSkillSelect}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div
              className="
              grid
              gap-6
              auto-rows-fr
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              "
            >
              {currentCategory.skills.map((skill, i) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  index={i}
                  tagCounts={tagCounts}
                  activeTagFilter={activeTagFilter}
                  onSkillSelect={onSkillSelect}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;