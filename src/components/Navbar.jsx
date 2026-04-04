// src/components/Navbar.jsx
import { useNavbarState } from "../hooks/useNavbarState";
import NavbarView         from "./Navbar/NavbarView";
import ThemeToggle        from "./Navbar/ThemeToggle";
import MobileNav          from "./Navbar/MobileNav";

/**
 * Thin orchestrator — wires state into view.
 * No JSX logic lives here beyond composition.
 */
export default function Navbar() {
  const {
    navLinks,
    activeSection,
    scrollProgress,
    isDark,
    toggleTheme,
    menuOpen,
    setMenuOpen,
    sidebarRef,
    toggleButtonRef,
  } = useNavbarState();

  return (
    <>
      <NavbarView
        navLinks={navLinks}
        activeSection={activeSection}
        scrollProgress={scrollProgress}
        controls={
          <>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            <MobileNav
              navLinks={navLinks}
              activeSection={activeSection}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              sidebarRef={sidebarRef}
              toggleButtonRef={toggleButtonRef}
            />
          </>
        }
      />

    </>
  );
}
