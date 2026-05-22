// src/components/Skills.jsx

import { memo } from "react";
import { motion } from "framer-motion";

import { useTabs } from "../hooks/useTabs";
import { fadeInUp } from "../utils/motionVariants";

import {
  Code2,
  Gamepad2,
  Database,
  Sparkles,
} from "lucide-react";

/* ======================================================
   CATEGORIES
====================================================== */

const CATEGORIES = [
  "Creative Foundation",
  "Frontend Engineering",
  "Expanding Horizons",
];

/* ======================================================
   LEVEL STYLES
====================================================== */

const LEVEL_STYLES = {
  Core: `
    bg-emerald-500/10
    text-emerald-600
    dark:text-emerald-300
    border border-emerald-400/20
  `,

  Used: `
    bg-blue-500/10
    text-blue-600
    dark:text-blue-300
    border border-blue-400/20
  `,

  Learning: `
    bg-amber-500/10
    text-amber-600
    dark:text-amber-300
    border border-amber-400/20
  `,

  Exploring: `
    bg-purple-500/10
    text-purple-600
    dark:text-purple-300
    border border-purple-400/20
  `,
};

/* ======================================================
   CUSTOM ICONS
====================================================== */

const CUSTOM_ICONS = {
  "Game Development": Gamepad2,
  "Data Engineering": Database,
};

/* ======================================================
   DATA
====================================================== */

const SKILLS_DATA = {
  "Creative Foundation": {
    tagline:
      "Design thinking shaped by architectural structure and visual composition.",

    accent: "from-[#6EE7B7] via-[#3B82F6] to-[#60A5FA]",

    groups: [
      {
        title: "Architecture",

        skills: [
          {
            name: "Revit",
            level: "Core",
            note: "BIM modeling & structured workflows",
          },

          {
            name: "AutoCAD",
            level: "Used",
            note: "2D documentation & drafting",
          },

          {
            name: "SketchUp",
            level: "Used",
            note: "Concept & massing exploration",
          },

          {
            name: "Lumion",
            level: "Used",
            note: "Rendering & walkthroughs",
          },

          {
            name: "3ds Max",
            level: "Learning",
            note: "Visualization fundamentals",
          },
        ],
      },

      {
        title: "Graphic & Visual Design",

        skills: [
          {
            name: "Adobe Illustrator",
            level: "Used",
            note: "Icons & visual systems",
          },

          {
            name: "Adobe Photoshop",
            level: "Used",
            note: "Image refinement",
          },

          {
            name: "Adobe InDesign",
            level: "Used",
            note: "Typography & layout",
          },

          {
            name: "Adobe Premiere Pro",
            level: "Used",
            note: "Motion storytelling",
          },

          {
            name: "Canva",
            level: "Used",
            note: "Quick visual assets",
          },
        ],
      },

      {
        title: "UI / UX",

        skills: [
          {
            name: "Figma",
            level: "Core",
            note: "Interface design & prototyping",
          },
        ],
      },
    ],
  },

  "Frontend Engineering": {
    tagline:
      "Building scalable, component-driven interfaces with clean architecture.",

    accent: "from-[#60A5FA] via-[#3B82F6] to-[#38BDF8]",

    groups: [
      {
        title: "Core Web Stack",

        skills: [
          {
            name: "HTML5",
            level: "Core",
            note: "Semantic structure",
          },

          {
            name: "CSS3",
            level: "Core",
            note: "Responsive layouts & styling logic",
          },

          {
            name: "JavaScript",
            level: "Core",
            note: "Async logic & DOM handling",
          },

          {
            name: "React",
            level: "Core",
            note: "Component-based architecture",
          },
        ],
      },

      {
        title: "UI & Styling",

        skills: [
          {
            name: "TailwindCSS",
            level: "Core",
            note: "Utility-first design system",
          },

          {
            name: "Bootstrap",
            level: "Used",
            note: "Component-based UI framework",
          },
        ],
      },

      {
        title: "Development Tools",

        skills: [
          {
            name: "Vite",
            level: "Used",
            note: "Modern dev tooling",
          },

          {
            name: "Git",
            level: "Used",
            note: "Version control workflows",
          },

          {
            name: "GitHub",
            level: "Used",
            note: "Repositories & collaboration",
          },

          {
            name: "VS Code",
            level: "Used",
            note: "Primary development environment",
          },
        ],
      },
    ],
  },

  "Expanding Horizons": {
    tagline:
      "Exploring backend systems, data workflows, and interactive experimentation.",

    accent: "from-[#A78BFA] via-[#C084FC] to-[#F472B6]",

    skills: [
      {
        name: "Node.js",
        level: "Learning",
        note: "Backend fundamentals",
      },

      {
        name: "Python",
        level: "Used",
        note: "Automation & scripting",
      },

      {
        name: "Data Engineering",
        level: "Learning",
        note: "Academic & practical exposure",
      },

      {
        name: "Game Development",
        level: "Exploring",
        note: "Interactive experiments",
      },
    ],
  },
};

/* ======================================================
   SKILL CARD
====================================================== */

const SkillCard = memo(function SkillCard({ skill, index }) {
  const imgName = skill.name.replace(/[\s/]/g, "");
  const imgSrc = `/images/skills/${imgName}.webp`;

  const levelClass = LEVEL_STYLES[skill.level] ?? "";

  const isCore = skill.level === "Core";

  const CustomIcon = CUSTOM_ICONS[skill.name];

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
        className="
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
        hover:-translate-y-2
        hover:border-blue-200
        dark:hover:border-blue-400/25

        hover:shadow-[0_18px_50px_rgba(59,130,246,0.12)]
        dark:hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]
        "
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

function Skills() {
  const { activeTab, changeTab } = useTabs(
    CATEGORIES,
    "Frontend Engineering"
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
            Skills & Expertise
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
            Turning Ideas
            <br />

            <span
              className={`
              bg-gradient-to-r
              ${currentCategory.accent}
              bg-clip-text
              text-transparent
              `}
            >
              Into Interactive Experiences
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