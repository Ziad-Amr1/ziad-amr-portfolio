// src/hooks/useScrollToSection.js
import { useEffect } from "react";

export default function useScrollToSection() {
  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const selector = anchor.getAttribute("href");
      const target   = selector ? document.querySelector(selector) : null;
      if (!target) return;

      e.preventDefault();

      const headerHeight = document.querySelector("header")?.offsetHeight ?? 0;
      window.scrollTo({ top: target.offsetTop - headerHeight, behavior: "smooth" });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
}