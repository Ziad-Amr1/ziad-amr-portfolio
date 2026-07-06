import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// jsdom does not implement matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// jsdom does not implement IntersectionObserver
class MockIntersectionObserver {
  constructor(fn) { this.fn = fn; }
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}
Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
});

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  value: MockResizeObserver,
});

// Use manual mock from __mocks__/framer-motion.js
vi.mock("framer-motion");

vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
    loading: vi.fn(),
    dismiss: vi.fn(),
  },
  Toaster: () => null,
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    loading: vi.fn(),
    dismiss: vi.fn(),
  },
}));

vi.mock("../i18n", () => {
  const en = {
    navigation: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      greeting: "Hello, I'm",
      name: "Ziad Amr",
      titles: ["Software Developer", "UI/UX Designer", "Architecture Student"],
      description: "I build software and design interfaces.",
      cta: { workTogether: "View Projects", downloadCv: "Download CV" },
    },
    about: {
      label: "About Me",
      heading: "From Architecture",
      headingHighlight: "To Code, Data & Design",
      education: { entries: [] },
      experience: { entries: [] },
      bio: { cta: "Explore my skills →" },
    },
    skillsSection: {
      label: "Skills & Expertise",
      heading: "Building Across",
      headingHighlight: "Architecture, Code, Data & Design",
    },
    projectsSection: {
      label: "Featured Work",
      heading: "Selected Projects",
      headingHighlight: "Across Architecture, Design & Development",
      description: "A curated collection.",
      stats: { projects: "Projects", categories: "Categories" },
      filters: {
        all: "All",
        architecture: "Architecture",
        design: "Design",
        development: "Development",
        ariaLabel: "Project filters",
      },
      empty: { title: "No Projects Found", description: "Try selecting another category." },
      loading: "Loading projects",
    },
    contact: {
      label: "Contact",
      heading: "Let's Build",
      headingHighlight: "Something Great Together",
      panel: {
        services: [
          "Frontend Development",
          "UI / UX Design",
          "Architecture Visualization",
          "Branding & Creative Design",
        ],
      },
      form: {
        nameLabel: "Your Name",
        emailLabel: "Email Address",
        subjectLabel: "Subject",
        messageLabel: "Your Message",
        sendButton: "Send Message",
      },
      validation: {
        nameRequired: "Name is required.",
        emailRequired: "Email is required.",
        emailInvalid: "Enter a valid email address.",
        messageRequired: "Message is required.",
        fillRequired: "Please fill all required fields.",
      },
    },
    footer: {
      description: "Software developer grounded in Architecture.",
      copyright: "© 2026 Ziad Amr. All rights reserved.",
    },
    accessibility: {
      socialLink: "Visit {{site}} profile",
      viewProject: "View {{title}}",
    },
    projectModal: {
      close: "Close modal",
      previous: "Previous",
      next: "Next",
    },
  };

  function getNestedValue(obj, path) {
    return path.split(".").reduce((current, key) => {
      if (current && typeof current === "object" && key in current) return current[key];
      return undefined;
    }, obj);
  }

  function interpolate(template, values) {
    if (!values) return template;
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
      return key in values ? String(values[key]) : `{{${key}}}`;
    });
  }

  return {
    useTranslation: () => {
      const t = (key, values) => {
        const value = getNestedValue(en, key);
        if (value === undefined) return key;
        if (typeof value === "string") return interpolate(value, values);
        return value;
      };
      return { t };
    },
  };
});
