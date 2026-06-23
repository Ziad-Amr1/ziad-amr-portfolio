export const CATEGORIES = [
  "Creative Foundation",
  "Frontend Engineering",
  "Expanding Horizons",
];

export const LEVEL_STYLES = {
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

export const SKILLS_DATA = {
  "Creative Foundation": {
    tagline:
      "Design thinking shaped by architectural structure and visual composition.",
    accent: "from-[#6EE7B7] via-[#3B82F6] to-[#60A5FA]",
    groups: [
      {
        title: "Architecture",
        skills: [
          { name: "Revit",   level: "Core",     note: "BIM modeling & structured workflows",     tags: ["3D Modeling"] },
          { name: "AutoCAD", level: "Used",     note: "2D documentation & drafting",             tags: ["AutoCAD"] },
          { name: "SketchUp",level: "Used",     note: "Concept & massing exploration",            tags: ["3D Modeling"] },
          { name: "Lumion",  level: "Used",     note: "Rendering & walkthroughs",                 tags: [] },
          { name: "3ds Max", level: "Learning", note: "Visualization fundamentals",               tags: ["3D Modeling"] },
        ],
      },
      {
        title: "Graphic & Visual Design",
        skills: [
          { name: "Adobe Illustrator",  level: "Used", note: "Icons & visual systems",       tags: ["Illustrator", "Vector Art"] },
          { name: "Adobe Photoshop",    level: "Used", note: "Image refinement",              tags: ["Photoshop", "Photo Manipulation", "Color Grading", "Advertising Design"] },
          { name: "Adobe InDesign",     level: "Used", note: "Typography & layout",           tags: [] },
          { name: "Adobe Premiere Pro", level: "Used", note: "Motion storytelling",           tags: [] },
          { name: "Canva",              level: "Used", note: "Quick visual assets",           tags: [] },
        ],
      },
      {
        title: "UI / UX",
        skills: [
          { name: "Figma", level: "Core", note: "Interface design & prototyping", tags: [] },
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
          { name: "HTML5",       level: "Core", note: "Semantic structure",                     tags: ["HTML"] },
          { name: "CSS3",        level: "Core", note: "Responsive layouts & styling logic",      tags: ["CSS"] },
          { name: "JavaScript",  level: "Core", note: "Async logic & DOM handling",              tags: ["JavaScript"] },
          { name: "React",       level: "Core", note: "Component-based architecture",            tags: ["React"] },
        ],
      },
      {
        title: "UI & Styling",
        skills: [
          { name: "TailwindCSS", level: "Core", note: "Utility-first design system",             tags: ["Tailwind CSS"] },
          { name: "Bootstrap",   level: "Used", note: "Component-based UI framework",            tags: ["Bootstrap"] },
        ],
      },
      {
        title: "Development Tools",
        skills: [
          { name: "Vite",    level: "Used", note: "Modern dev tooling",                          tags: ["Vite"] },
          { name: "Git",     level: "Used", note: "Version control workflows",                   tags: [] },
          { name: "GitHub",  level: "Used", note: "Repositories & collaboration",                tags: [] },
          { name: "VS Code", level: "Used", note: "Primary development environment",             tags: [] },
        ],
      },
    ],
  },

  "Expanding Horizons": {
    tagline:
      "Exploring backend systems, data workflows, and interactive experimentation.",
    accent: "from-[#A78BFA] via-[#C084FC] to-[#F472B6]",
    skills: [
      { name: "Node.js",          level: "Learning",  note: "Backend fundamentals",                tags: [] },
      { name: "Python",           level: "Used",      note: "Automation & scripting",              tags: [] },
      { name: "Data Engineering", level: "Learning",  note: "Academic & practical exposure",       tags: [] },
      { name: "Game Development", level: "Exploring", note: "Interactive experiments",             tags: [] },
    ],
  },
};


