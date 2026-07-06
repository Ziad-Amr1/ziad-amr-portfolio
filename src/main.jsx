// src/main.jsx

import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.jsx";

import ErrorBoundary from "./components/ErrorBoundary";

import { ThemeProvider } from "./context/ThemeContext";

/* ======================================================
   ROOT
====================================================== */

createRoot(
  document.getElementById("root")
).render(
  <StrictMode>
    <ThemeProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>
);