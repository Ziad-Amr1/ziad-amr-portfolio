// src/App.jsx

import { lazy, Suspense, useState, useMemo, useCallback } from "react";

import Navbar from "./components/Navbar";

import Hero from "./components/Hero";

import MainLayout from "./layout/MainLayout";

import projectsJson from "./data/projectsData.json";
import { computeTagCounts } from "./utils/projectCounts";

/* ======================================================
   LAZY LOADING
====================================================== */

const About = lazy(() =>
  import("./components/About")
);

const Skills = lazy(() =>
  import("./components/Skills")
);

const Projects = lazy(() =>
  import("./components/Projects/Projects")
);

const Contact = lazy(() =>
  import("./components/Contact")
);

const Footer = lazy(() =>
  import("./components/Footer")
);

/* ======================================================
   FALLBACK
====================================================== */

function SectionFallback() {
  return (
    <div
      className="
      relative
      py-32
      overflow-hidden
      "
      aria-hidden="true"
    >
      <div
        className="
        max-w-[1350px]
        mx-auto
        px-[6%]
        "
      >
        <div
          className="
          h-[280px]

          rounded-[32px]

          border
          border-white/10

          bg-white/[0.03]

          backdrop-blur-xl

          animate-pulse
          "
        />
      </div>
    </div>
  );
}

/* ======================================================
   APP
====================================================== */

const projectsData = projectsJson.projects ?? [];

export default function App() {
  const [tagFilter, setTagFilter] = useState(null);

  const tagCounts = useMemo(() => computeTagCounts(projectsData), []);

  const handleSkillSelect = useCallback((tagName) => {
    setTagFilter((prev) => (prev === tagName ? null : tagName));

    requestAnimationFrame(() => {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  const handleClearTagFilter = useCallback(() => {
    setTagFilter(null);
  }, []);

  return (
    <>
      {/* ==================================================
         NAVBAR
      ================================================== */}

      <Navbar />

      {/* ==================================================
         MAIN
      ================================================== */}

      <MainLayout>
        {/* Hero */}
        <Hero />

        {/* About */}
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>

        {/* Skills */}
        <Suspense fallback={<SectionFallback />}>
          <Skills
            tagCounts={tagCounts}
            activeTagFilter={tagFilter}
            onSkillSelect={handleSkillSelect}
          />
        </Suspense>

        {/* Projects */}
        <Suspense fallback={<SectionFallback />}>
          <Projects
            tagFilter={tagFilter}
            onClearTagFilter={handleClearTagFilter}
            onTagClick={handleSkillSelect}
          />
        </Suspense>

        {/* Contact */}
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>

        {/* Footer */}
        <Suspense fallback={<SectionFallback />}>
          <Footer />
        </Suspense>
      </MainLayout>
    </>
  );
}