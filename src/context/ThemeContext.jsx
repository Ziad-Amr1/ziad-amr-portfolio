// src/context/ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Read the saved preference from localStorage
    const savedTheme = localStorage.getItem("theme");

    // Read the OS-level preference as a fallback when no saved preference exists
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Determine initial mode: use saved preference, or fall back to OS preference
    const initialDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    // Apply the dark class to <html> and sync React state
    document.documentElement.classList.toggle("dark", initialDark);
    setIsDark(initialDark);
  }, []);

  // Toggle between light and dark mode, persist the choice to localStorage
  const toggleTheme = () => {
    setIsDark((prev) => {
      const newMode = !prev;
      document.documentElement.classList.toggle("dark", newMode);
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook for consuming the theme context in any component
export function useTheme() {
  return useContext(ThemeContext);
}