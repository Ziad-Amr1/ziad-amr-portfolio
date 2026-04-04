// src/App.jsx
import { lazy, Suspense } from "react";
import Navbar     from "./components/Navbar";
import Hero       from "./components/Hero";
import MainLayout from "./layout/MainLayout";

// ── Lazy-load everything below the fold ───────────────────────────
// Hero loads eagerly (above fold, user sees it immediately)
// All other sections are code-split and only fetched when needed
const About    = lazy(() => import("./components/About"));
const Skills   = lazy(() => import("./components/Skills"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Contact  = lazy(() => import("./components/Contact"));
const Footer   = lazy(() => import("./components/Footer"));

// Minimal fallback — just holds the layout height
function SectionFallback() {
  return <div className="py-20" aria-hidden="true" />;
}

export default function App() {
  return (
    <>
      <Navbar />
      <MainLayout>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Footer />
        </Suspense>
      </MainLayout>
    </>
  );
}