# Ziad Amr Portfolio

Personal portfolio for Ziad Amr — an architecture student who builds software, designs interfaces, and works across code, data, and design.

**Live site:** https://ziadamr.netlify.app

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build | Vite 7 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Icons | Lucide React, React Icons |
| Email | EmailJS |
| Toast | react-hot-toast |
| Deployment | Netlify |
| Testing | Vitest, Testing Library |

---

## Scripts

```bash
npm run dev       # Development server (localhost:5173)
npm run build     # Production build to dist/
npm run preview   # Preview production build
npm run test      # Run test suite (Vitest)
npm run lint      # ESLint
npm run test:watch # Watch mode
```

---

## Project Structure

```
src/
├── components/          # UI components by section
│   ├── Hero.jsx         # Hero section with typing effect
│   ├── About.jsx        # Bio, education, experience
│   ├── Skills.jsx       # Skills grid with tag filtering
│   ├── Projects/        # Project showcase (grid, modal, filters)
│   │   ├── Projects.jsx        # Main container with pagination
│   │   ├── ProjectCard.jsx     # Card with image, tags, skeleton
│   │   ├── ProjectGrid.jsx     # Animated grid layout
│   │   ├── ProjectFilters.jsx  # Category filter bar
│   │   ├── ProjectModal.jsx    # Full project detail modal
│   │   ├── ProjectModalShell.jsx # Modal shell with layout
│   │   ├── ProjectModalNav.jsx # Previous/next navigation
│   │   ├── ProjectCaseStudy.jsx # Problem/solution/result
│   │   ├── ProjectMediaPanel.jsx # Image/video display
│   │   ├── ImageSlider.jsx     # Image gallery with thumbnails
│   │   ├── PaginationControls.jsx
│   │   └── ProjectSkeleton.jsx
│   ├── Contact.jsx      # Contact form with validation
│   ├── Navbar.jsx       # Desktop navigation
│   ├── Footer.jsx       # Footer with CTA
│   └── ErrorBoundary.jsx # Global error fallback
├── context/
│   └── ThemeContext.jsx  # Dark/light theme with localStorage
├── data/
│   ├── projectsData.json # 21 project entries
│   └── skillsData.js     # 25 skills across 4 categories
├── hooks/
│   ├── projects/
│   │   └── useProjectModal.js # Modal state, URL hash, scroll lock
│   └── useTypingEffect.js  # Typewriter animation
├── i18n/
│   ├── index.js         # Translation provider + hook
│   ├── locales/
│   │   ├── en.json      # English (complete)
│   │   └── ar.json      # Arabic (stub — not yet translated)
│   └── useTranslation.js
├── layout/
│   └── MainLayout.jsx   # Section wrapper with scroll snap
├── test/
│   ├── setup.js         # Vitest setup with mocks
│   ├── testUtils.jsx    # Custom render with providers
│   ├── Hero.test.jsx
│   ├── Projects.test.jsx
│   ├── Skills.test.jsx
│   ├── Contact.test.jsx
│   └── ErrorBoundary.test.jsx
├── utils/
│   └── projectCounts.js # Tag frequency computation
├── App.jsx              # Root component with lazy loading
└── main.jsx             # Entry point
```

---

## Content Management

### Projects (`src/data/projectsData.json`)

Array of project objects with:

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | number | yes | Unique identifier |
| `title` | string | yes | Project name |
| `category` | string | yes | `"architecture"`, `"design"`, or `"development"` |
| `description` | string | yes | Short blurb (card) |
| `role` | string | yes | Your role (e.g. `"Full Stack Developer"`) |
| `tags` | string[] | yes | Used for cross-filtering with Skills section |
| `image` | string | no | Single thumbnail path |
| `images` | string[] | no | Gallery images (overrides `image`) |
| `video` | string | no | Video URL (displays instead of images) |
| `caseStudy` | object | no | `{ problem, solution, result }` markdown strings |

Images live in `public/images/projects/`. Use WebP format when possible.

### Skills (`src/data/skillsData.js`)

Exports an object with category keys:

```js
{
  architecture: [{ name: "AutoCAD", level: 80, color: "#..." }, ...],
  design: [...],
  softwareDevelopment: [...],
  dataAndEmergingTech: [...]
}
```

Four categories: `architecture`, `design`, `softwareDevelopment`, `dataAndEmergingTech`.

### Translations (`src/i18n/locales/`)

- `en.json` — Full English translations
- `ar.json` — Arabic stub (all keys present but empty). Needs translation before enabling.

---

## Features

- **Responsive** — Mobile-first, adaptive grid (3/4/6 items per page)
- **Dark mode** — System preference with manual toggle, persisted to localStorage
- **Typing effect** — Hero section typewriter animation
- **Tag filtering** — Skills section filters projects by common tags
- **Project modal** — Full-screen detail view with image gallery, keyboard navigation, URL hash sync
- **Modal navigation** — Previous/next project within modal, history pushState
- **Scroll lock** — Body scroll disabled while modal is open, position preserved
- **Image lazy loading** — Native lazy loading + skeleton shimmer placeholders
- **Pagination** — Client-side pagination with responsive item count
- **Category filters** — Filter projects by architecture/design/development
- **Contact form** — EmailJS integration with validation, cooldown, rate limiting
- **Lazy loading** — Sections load via React.lazy + Suspense
- **SEO** — Meta tags, semantic HTML, robots.txt, sitemap.xml
- **Security** — CSP, HSTS, X-Frame-Options, Permissions-Policy (via Netlify headers)
- **Accessibility** — ARIA labels, keyboard navigation, focus management
- **Error boundary** — Catches render errors with reload fallback

---

## Architecture Decisions

### Scroll Lock
Uses `position: fixed` with `top: -{scrollY}px` and `overflow: hidden` on `<body>` to prevent background scrolling while the project modal is open. Scroll position is restored on close via `dataset.scrollY`.

### State Ownership
- `App.jsx` owns `tagFilter` state, shared between Skills and Projects
- `Projects.jsx` owns filter, pagination, and modal state
- Modal URL hash sync uses `pushState`/`popstate` for browser navigation

### Image Format
All images served as WebP. The `profile.webp` image uses `fetchPriority="high"` and `loading="eager"` for LCP optimization. Project thumbnails use `loading="lazy"` except the first card.

---

## Deployment

Deployed via Netlify:

1. Push to `main` branch
2. Netlify detects `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - SPA redirect: `/* -> /index.html` (200)
3. Security headers applied automatically (CSP, HSTS, etc.)

Preview builds: every PR gets a deploy preview URL from Netlify.

---

## Known Limitations

- **Arabic translations**: `ar.json` contains empty stubs. All UI text is English-only until translations are added.
- **No backend/data projects**: Portfolio currently has 21 projects across architecture, design, and development. Backend and data engineering work is not yet represented.
- **Architecture focus**: The bio mentions BIM and AEC technology as a future direction, but no dedicated projects exist yet in that space.
- **EmailJS**: Contact form uses a free EmailJS tier with rate limits.
- **No database**: All content is static (JSON/JS files). No CMS integration.

---

## License

MIT
