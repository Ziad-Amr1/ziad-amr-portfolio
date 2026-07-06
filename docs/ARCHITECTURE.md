# Architecture

## Entry Flow

```
index.html → main.jsx → App.jsx
                │
                ├── StrictMode
                ├── ThemeProvider
                │     └─ localStorage persistence
                │
                ├── ErrorBoundary
                │     └─ class-based, catches render errors, shows reload fallback
                │
                └── App
                      ├── Navbar (always rendered, not lazy)
                      ├── Hero (always rendered, not lazy)
                      ├── About (lazy)
                      ├── Skills (lazy)
                      ├── Projects (lazy)
                      ├── Contact (lazy)
                      └── Footer (lazy)
```

- `Hero` and `Navbar` are eagerly loaded (above-the-fold priority).
- All other sections use `React.lazy()` with `Suspense` and a shared `SectionFallback` pulse animation.
- `ErrorBoundary` wraps the entire `App` so any uncaught render error is contained.

---

## Component Responsibilities

### `App.jsx` — Root orchestrator

- **Owns `tagFilter` state** — the single piece of cross-section state. Passed down to `Skills` (to highlight active tag) and `Projects` (to filter grid).
- **Provides `handleSkillSelect`** — toggles `tagFilter`, scrolls to `#projects`.
- **Provides `handleClearTagFilter`** — resets `tagFilter` to `null`.
- **Computes `tagCounts`** once via `useMemo` from `computeTagCounts()`.
- Lazy-loads all sections except `Navbar` and `Hero`.

### `Navbar` — Navigation orchestrator

- `Navbar.jsx` imports and organizes `NavbarView.jsx`, `MobileNav.jsx`, and `ThemeToggle.jsx`.
- Uses `useNavbarState()` hook for active section tracking, scroll progress, and mobile menu.
- Uses `useActiveSection()` (IntersectionObserver) to determine which section is in view.
- Uses `useScrollProgress()` for the scroll progress indicator in the navbar.
- Uses `useSidebar()` for mobile menu open/close with focus management.
- Uses `useScrollToSection()` for smooth scroll handlers on nav links.

### `Hero.jsx` — Hero section

- Uses `useTypingEffect()` to cycle through role titles in a typewriter animation.
- Static content (greeting, name, bio, social links, CTA buttons).
- Social links defined inline in component (hardcoded data, no props needed).

### `About.jsx` — Bio, education, experience

- Pure presentational. Receives no props. Renders static content from i18n translations.

### `Skills.jsx` — Skills display with cross-section filtering

- Uses `useTabs()` to manage active category tab.
- Renders skill cards grouped by category, with level badges.
- **Tag filtering**: clicking a skill card calls `onSkillSelect(tagName)` in `App` which sets `tagFilter`. This links Skills to Projects — clicking a skill tag highlights it and filters the project grid to matching projects.
- Receives `tagCounts` (for tag frequency display), `activeTagFilter` (to highlight active tag), and `onSkillSelect`.

### `Projects/Projects.jsx` — Project showcase container

- Manages local state: `categoryFilter` (all/architecture/design/development), `currentPage`.
- Receives `tagFilter` from `App.jsx` and passes it through to the filtering logic.
- **Data flow**: `projectsData` (from JSON) → filter by `tagFilter` + `categoryFilter` → paginate → render `ProjectGrid`.
- Uses `useProjectModal()` hook for modal state, URL hash sync, scroll lock, keyboard navigation.
- Passes filtered + paginated projects to `ProjectGrid`.
- `ProjectGrid` renders `ProjectCard` components (with lazy-loaded `ProjectModal`).
- `ProjectFilters` bar at top allows category selection.
- `PaginationControls` at bottom handles page navigation.

### `ProjectModal` — Full-screen project detail

- Lazy-loaded via `React.lazy` in `ProjectGrid`.
- Composed of:
  - `ProjectModalShell.jsx` — scrollable modal overlay with close button
  - `ProjectModalNav.jsx` — previous/next project buttons
  - `ProjectCaseStudy.jsx` — problem/solution/result section
  - `ProjectMediaPanel.jsx` — image display with aspect ratio handling
  - `ImageSlider.jsx` — image gallery with thumbnail navigation
- `handlePrevProject` / `handleNextProject` navigate through `filteredProjects` (the full filtered list, not just the current page), using `replaceHash` to update URL.
- Keyboard: `Escape` closes, `ArrowLeft`/`ArrowRight` navigates images or projects.

### `Contact.jsx` — Contact form

- Reads `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` from `import.meta.env`.
- Client-side validation (required fields, email format, message length).
- Rate limiting / cooldown to prevent spam.
- `react-hot-toast` for success/error notifications.
- No backend — EmailJS handles server-side processing.

### `Footer.jsx` — Footer with CTA and links

- Pure presentational. Links to social profiles, email, resume.

### `ErrorBoundary.jsx` — Class-based error boundary

- Catches unhandled render errors in any child component.
- Displays a centered fallback UI with title, description, and "Reload Page" button.
- The reload button calls `window.location.reload()`.
- Tested for:
  - Rendering fallback when children throw
  - Reload button presence in error state
  - Normal rendering when no error occurs

---

## State Ownership

| State | Owner | Passed To | Persisted |
|-------|-------|-----------|-----------|
| `tagFilter` | `App.jsx` | `Skills`, `Projects` | No |
| `categoryFilter` | `Projects.jsx` | `ProjectFilters`, filter logic | No |
| `currentPage` | `Projects.jsx` | `PaginationControls` | No |
| `modalProject` | `useProjectModal` | `ProjectGrid` → `ProjectModal` | Via URL hash |
| `imageIndex` | `useProjectModal` | `ProjectModal` → `ImageSlider` | No |
| `theme` | `ThemeContext` | All (via context) | localStorage |
| `activeSection` | `useNavbarState` + `useActiveSection` | `NavbarView` | No |
| `mobileMenuOpen` | `useSidebar` | `MobileNav` | No |
| `activeTab` | `useTabs` | `Skills` | No |

### Theme persistence details

The `ThemeContext` reads from `localStorage` on initial render, falling back to `window.matchMedia('(prefers-color-scheme: dark)')`. Writes to localStorage on every toggle. Both read and write operations are wrapped in try/catch to handle private browsing modes that block localStorage access.

---

## Modal Architecture

### Scroll lock

When the modal opens, `useProjectModal` applies `position: fixed; width: 100%; overflow: hidden` to `document.body` and stores the current `window.scrollY` in a data attribute. On close, it restores the original scroll position. This prevents the background from scrolling while the modal is open.

### URL hash synchronization

- Opening a modal pushes `#project-{id}` to the URL via `pushState`.
- Navigating projects within the modal uses `replaceState` (no extra history entry per navigation).
- Closing the modal clears the hash via `replaceState`.
- Listening to `popstate` allows browser back/forward to open/close the modal.
- On initial page load with a `#project-{id}` hash, the modal auto-opens.

### Focus management

- Modal shell uses `role="dialog"`, `aria-modal="true"`, `aria-label`.
- Close button, nav buttons, and image thumbnails are keyboard-focusable.
- `Escape` key closes the modal.

### Internal scrolling

The modal shell (`ProjectModalShell.jsx`) handles its own vertical scrolling independently of the page body. Image galleries and case study text scroll within the modal container.

---

## Filtering & Pagination

### Tag filter (cross-section)

```
Skills: user clicks skill tag
  → App.handleSkillSelect(tagName)
  → tagFilter set in App
  → tagFilter passed to Projects
  → Projects filters projectData.projects where project.tags.includes(tagFilter)
  → Also scrolls to #projects section
```

- Clicking the same tag again toggles it off.
- Filtering by category is independent of tag filter (AND logic).

### Category filter (within Projects)

```
Projects.jsx: user clicks category button (All / Architecture / Design / Development)
  → categoryFilter updated locally
  → Filter logic: (tagFilter === null || project.tags.includes(tagFilter))
                    AND (categoryFilter === 'all' || project.category === categoryFilter)
```

### Pagination

- Responsive items per page: 3 (mobile), 4 (tablet), 6 (desktop), determined by viewport width.
- Resetting `categoryFilter` or `tagFilter` resets `currentPage` to 1.

---

## i18n Architecture

### Custom hook (`useTranslation`)

- Reads current locale from React state (no external library).
- Exposes `t(key)` function that performs nested key lookup (e.g., `t("hero.greeting")` traverses `{ hero: { greeting: "..." } }`).
- Supports `{{variable}}` interpolation via regex replacement.
- Locale files live in `src/i18n/locales/en.json` and `src/i18n/locales/ar.json`.
- Locale switching currently has no UI — only English is functional.

### Locale files

| File | Status |
|------|--------|
| `en.json` | Complete |
| `ar.json` | All keys present, all values empty `""` |

### Limitations

- `<html lang="en">` is hardcoded in `index.html`.
- SEO meta tags (Open Graph, Twitter Card) are hardcoded in `index.html`, not translation-driven.
- No language switcher UI exists.

---

## Error Handling

| Layer | Mechanism | User Experience |
|-------|-----------|-----------------|
| Component render errors | `ErrorBoundary` (class component) | Full-page fallback with reload button |
| Image load failures | `onError` → set fallback image | Shows fallback image or initials |
| localStorage failures | try/catch in `ThemeContext` | Falls back to system preference |
| EmailJS failures | `.catch()` in Contact form | Toast notification with error message |
| Invalid project data | `useProjectModal` guarded null checks | Modal closes gracefully |
| History API failures | try/catch around pushState/replaceState | URL hash not updated, modal still works |

### Error boundary

- Only catches render-time errors (not async, event handler, or timer errors).
- Resets when error state is cleared — no recovery mechanism beyond page reload.
- Tested for fallback rendering, reload button existence, and normal pass-through.

---

## Data Flow Diagrams

### Project data flow

```
projectsData.json ──► App.jsx (import)
                          │
                          ▼
                    Projects.jsx
                          │
                    tagFilter from App
                    categoryFilter (local)
                          │
                          ▼
                    filter + paginate
                          │
                          ▼
                    ProjectGrid
                          │
                          ├── ProjectCard (thumbnail, tags, skeleton, error fallback)
                          │
                          └── ProjectModal (lazy, fullscreen)
                                ├── ProjectModalShell
                                ├── ProjectModalNav
                                ├── ProjectCaseStudy
                                ├── ProjectMediaPanel
                                └── ImageSlider
```

### Skills → Projects tag flow

```
Skills.jsx
  │ user clicks skill card
  ▼
App.handleSkillSelect(tagName)
  │
  ├── sets tagFilter = tagName
  └── scrolls to #projects
        │
        ▼
Projects.jsx
  │ reads tagFilter from props
  │ filters projects where project.tags.includes(tagFilter)
  │
  ├── resets currentPage to 1
  └── renders filtered grid
```

### Theme flow

```
App mount → ThemeContext reads:
              1. localStorage.getItem('theme')  (try/catch)
              2. Fallback: matchMedia('prefers-color-scheme: dark')
                  │
                  ▼
            Applies 'dark' class to <html>
                  │
            User toggles → theme state flips → localStorage.setItem (try/catch) → class toggled
```

### i18n flow

```
Component calls t("hero.greeting")
  → useTranslation hook
  → Reads current locale file (en.json loaded at import time)
  → Splits key by '.' and traverses nested object
  → Returns string (or key path if not found)
```

---

## Architectural Decisions

### Why no global state library (Redux, Zustand, etc.)

The app has exactly one piece of cross-component state (`tagFilter`). All other state is local or a single context (`ThemeContext`). A state library would add dependencies and boilerplate for no benefit at this scale.

### Why no TypeScript

JavaScript with JSDoc-style comments keeps the build lean and avoids a compilation step. The codebase is small enough that type errors are caught during manual testing.

### Why no backend / CMS

All content is static (JSON/JS files). At the current scale, a CMS adds complexity without proportional value. The content guide covers how to edit the data files directly.

### Why custom i18n instead of react-i18next

The app needs simple key-based translation lookups. A custom hook avoids the `react-i18next` dependency and its initialization boilerplate. If Arabic translation is completed and a language switcher is added, the custom solution can be swapped for `react-i18next` if needed.

### Why lazy loading

`Hero` and `Navbar` are the only above-the-fold components. All other sections are lazy-loaded to reduce initial bundle size. Each lazy section is wrapped in `Suspense` with a shared pulse animation fallback.

### Why client-side pagination

All projects are loaded at once. Pagination is purely visual — it limits how many cards are displayed per page. This avoids unnecessary server requests and keeps the data flow simple.

---

## Extension Points

| Feature | What to build | Where to start |
|---------|---------------|----------------|
| Arabic language switcher | UI toggle + `<html lang>` update + `ar.json` translation | `src/context/LocaleContext.js` (new), `src/i18n/index.js` |
| CMS integration | Replace JSON imports with API calls | `src/data/` → GraphQL/REST client |
| Analytics | Track page views, project clicks | `src/App.jsx` add analytics provider |
| Backend project examples | Add projects with backend tech stack | `src/data/projectsData.json` |
| Search | Full-text search across projects | `src/components/Projects/ProjectSearch.jsx` (new) |
| Blog / writing | CMS-backed blog section | `src/components/Blog.jsx` (new lazy section) |
| Dynamic SEO | i18n-driven meta tags | Update `index.html` + `useEffect` in `App.jsx` |
| Image CDN | Replace local WebP with CDN URLs | Update image paths in `projectsData.json` |

---

## Scalability Boundaries

This architecture is appropriate for:

- **Projects**: Up to ~100 static entries (beyond that, consider a CMS or backend pagination)
- **Skills**: Up to ~50 skills (current: 25)
- **Translations**: Up to ~5 languages (current: 2)
- **Images**: Up to ~200 total (all local WebP)

Beyond these boundaries, consider:
- Moving projects from JSON to a headless CMS
- Server-side rendering for SEO (Astro, Next.js)
- Image CDN with automatic format conversion
- TypeScript for larger team collaboration
