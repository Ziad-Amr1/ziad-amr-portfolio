// src/hooks/useSidebar.js
import { useState, useEffect } from "react";

export function useSidebar(sidebarRef, toggleButtonRef) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const onClickOutside = (e) => {
      const outsideSidebar = !sidebarRef.current?.contains(e.target);
      const outsideToggle  = !toggleButtonRef.current?.contains(e.target);
      if (outsideSidebar && outsideToggle) setMenuOpen(false);
    };

    const onScroll = () => setMenuOpen(false);

    document.addEventListener("mousedown", onClickOutside);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("scroll", onScroll);
    };
  }, [menuOpen, sidebarRef, toggleButtonRef]);

  return { menuOpen, setMenuOpen };
}