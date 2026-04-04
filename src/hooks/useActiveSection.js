// src/hooks/useActiveSection.js
import { useEffect, useState } from "react";

export default function useActiveSection(sectionIds, offset = 80) {
  const [active, setActive] = useState("");

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        let current = "";

        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (!el) continue;
          const { top, bottom } = el.getBoundingClientRect();
          if (top <= offset && bottom > offset) {
            current = id;
            break;
          }
        }

        setActive((prev) => (prev === current ? prev : current));
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds, offset]);

  return active;
}