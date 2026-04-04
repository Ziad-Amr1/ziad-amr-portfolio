// src/hooks/useNavbarState.js
import { useRef } from "react";

import { useSidebar }        from "./useSidebar";
import { useTheme }         from "../context/ThemeContext";
import useScrollToSection   from "./useScrollToSection";
import useActiveSection     from "./useActiveSection";
import useScrollProgress    from "./useScrollProgress";

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

/**
 * Aggregates every piece of state the Navbar needs.
 * Components import this hook instead of wiring hooks individually.
 */
export function useNavbarState() {
  const sidebarRef      = useRef(null);
  const toggleButtonRef = useRef(null);

  const { menuOpen, setMenuOpen } = useSidebar(sidebarRef, toggleButtonRef);
  const { isDark, toggleTheme }   = useTheme();

  useScrollToSection();

  const activeSection  = useActiveSection(NAV_LINKS.map((l) => l.toLowerCase()));
  const scrollProgress = useScrollProgress();

  return {
    // data
    navLinks: NAV_LINKS,
    activeSection,
    scrollProgress,
    // theme
    isDark,
    toggleTheme,
    // mobile menu
    menuOpen,
    setMenuOpen,
    // refs (passed down to MobileNav / toggle button)
    sidebarRef,
    toggleButtonRef,
  };
}
