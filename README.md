# Ziad Amr Portfolio

Personal portfolio website for Ziad Amr — an architecture student who builds software, designs interfaces, and works across code, data, and design.

**Live site:** https://ziadamr.netlify.app

---

## Portfolio Direction

Ziad Amr is an Architecture student at the Faculty of Fine Arts who develops software and designs interfaces. The portfolio bridges architecture, design, and software development — toward BIM, AEC technology, and digital tools for the built world.

The portfolio positions Ziad as a multidisciplinary builder, not a specialist in any single domain. The Skills section reflects this with four categories: Architecture, Design, Software Development, and Data & Emerging Tech.

---

## Features

- **Responsive** — Mobile-first layout, adaptive grid (3/4/6 items per page based on viewport)
- **Dark mode** — System preference detection with manual toggle, persisted to localStorage
- **Typing effect** — Hero section typewriter animation cycling through role titles
- **Tag filtering** — Clicking a skill in the Skills section filters the Projects grid by matching tags
- **Project modal** — Full-screen detail view with image gallery, case study content, keyboard navigation, and URL hash synchronization
- **Modal navigation** — Previous/next project within modal using pushState
- **Scroll lock** — Body scroll disabled while modal is open, scroll position restored on close
- **Image lazy loading** — Native lazy loading with skeleton shimmer placeholders and error fallbacks
- **Pagination** — Client-side pagination with responsive item count
- **Category filters** — Filter projects by architecture, design, or development
- **Contact form** — EmailJS integration with validation, cooldown, rate limiting, and toast notifications
- **Lazy loading** — Sections loaded via React.lazy + Suspense with pulse fallback
- **SEO** — Meta tags in index.html, semantic HTML, robots.txt, sitemap.xml
- **Security** — CSP, HSTS, X-Frame-Options, Permissions-Policy (via Netlify headers)
- **Accessibility** — ARIA labels, keyboard navigation, focus management, role attributes
- **Error boundary** — Catches render errors and displays a reload fallback

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

## Quick Start

```bash
git clone https://github.com/Ziad-Amr1/ziad-amr-portfolio.git
cd ziad-amr-portfolio
npm install
npm run dev
```

Open http://localhost:5173

---

## Environment Variables

The contact form requires EmailJS credentials set in the deployment environment:

| Variable | Purpose |
|----------|---------|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service identifier |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template identifier |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public API key |

Create a `.env` file in the project root for local development (`.env` is gitignored):

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## Available Scripts

```bash
npm run dev          # Development server (localhost:5173)
npm run build        # Production build to dist/
npm run preview      # Preview production build
npm run test         # Run test suite (Vitest)
npm run lint         # ESLint
npm run test:watch   # Watch mode
```

---

## Project Structure

```
src/
├── components/            # UI components organized by section
│   ├── Hero.jsx           # Hero section with typing effect
│   ├── About.jsx          # Bio, education, experience timeline
│   ├── Skills.jsx         # Skills grid with category tabs, tag filtering
│   ├── Projects/          # Full project showcase system
│   │   ├── Projects.jsx         # Container: filtering, pagination, modal state
│   │   ├── ProjectCard.jsx      # Card with thumbnail, tags, shimmer, error fallback
│   │   ├── ProjectGrid.jsx      # Animated grid with skeleton loading
│   │   ├── ProjectFilters.jsx   # Category filter bar (all/architecture/design/development)
│   │   ├── ProjectModal.jsx     # Full project detail modal (lazy loaded)
│   │   ├── ProjectModalShell.jsx # Scrollable modal shell with layout
│   │   ├── ProjectModalNav.jsx  # Previous/next project buttons
│   │   ├── ProjectCaseStudy.jsx # Problem/solution/result section
│   │   ├── ProjectMediaPanel.jsx # Image/video display with aspect ratio
│   │   ├── ImageSlider.jsx      # Image gallery with thumbnails, error fallback
│   │   ├── PaginationControls.jsx
│   │   └── ProjectSkeleton.jsx
│   ├── Contact.jsx        # Contact form with EmailJS, validation, cooldown
│   ├── Navbar.jsx         # Navigation orchestrator (desktop + mobile + theme toggle)
│   │   ├── NavbarView.jsx       # Desktop navigation bar view
│   │   ├── MobileNav.jsx        # Mobile sidebar navigation
│   │   └── ThemeToggle.jsx      # Dark/light mode toggle button
│   ├── Footer.jsx         # Footer with CTA and links
│   └── ErrorBoundary.jsx  # Class-based error boundary with reload fallback
├── context/
│   └── ThemeContext.jsx   # Theme state with localStorage persistence and error handling
├── data/
│   ├── projectsData.json  # 21 project entries with full case study data
│   └── skillsData.js      # 25 skills across 4 categories with proficiency levels
├── hooks/
│   ├── projects/
│   │   └── useProjectModal.js   # Modal state, URL hash sync, scroll lock, keyboard nav
│   ├── useTypingEffect.js       # Typewriter animation for hero titles
│   ├── useTabs.js               # Generic tab state management for Skills categories
│   ├── useNavbarState.js        # Navigation state: active section, scroll progress, menu
│   ├── useActiveSection.js      # IntersectionObserver-based section tracking
│   ├── useScrollProgress.js     # Scroll progress tracking for navbar
│   ├── useScrollToSection.js    # Smooth scroll to section handler
│   └── useSidebar.js            # Mobile sidebar open/close with focus management
├── i18n/
│   ├── index.js           # Translation hook (useTranslation) with nested key lookup
│   └── locales/
│       ├── en.json        # English translations (complete, 247 lines)
│       └── ar.json        # Arabic stub (keys present, values empty)
├── layout/
│   └── MainLayout.jsx    # Section wrapper for consistent spacing
├── test/
│   ├── setup.js           # Vitest setup: jsdom mocks, framer-motion mock, i18n mock
│   ├── testUtils.jsx      # Custom render with ThemeProvider wrapper
│   ├── Hero.test.jsx
│   ├── Projects.test.jsx
│   ├── Skills.test.jsx
│   ├── Contact.test.jsx
│   └── ErrorBoundary.test.jsx
├── utils/
│   ├── projectCounts.js   # Computes tag frequency across projects
│   └── motionVariants.js  # Shared Framer Motion animation variants
├── App.jsx                # Root: lazy-loaded sections, tagFilter state, layout
└── main.jsx               # Entry: StrictMode, ThemeProvider, ErrorBoundary, App
```

---

## Architecture

Detailed architecture documentation is available in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

Key architectural decisions:

- **No backend** — All content is static (JSON/JS files). No database, no CMS, no API server.
- **No global state library** — React useState and context are sufficient for this scale.
- **No TypeScript** — JavaScript with JSDoc-style comments keeps the build lean.
- **Data-driven content** — Projects and skills are data-driven; UI text is translation-driven.
- **Focused testing** — Behavioral tests for critical paths, no snapshot tests, no 100% coverage goal.

---

## Content Management

Detailed content editing guide: [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md)

### Projects (`src/data/projectsData.json`)

21 projects with case study data. Each project requires:

- `id` (unique number), `title`, `category` (architecture/design/development), `tags` (matches Skills)
- At least one of `image` (thumbnail path) or `images[]` (gallery paths)
- `problem`, `solution`, `result` fields for the modal case study view

### Skills (`src/data/skillsData.js`)

25 skills organized into 4 categories: Architecture, Design, Software Development, Data & Emerging Tech. Each skill has a `name`, `level` (Core/Used/Learning/Exploring), `note`, and `tags` array linking to projects.

### Translations (`src/i18n/locales/`)

- `en.json` — Complete English translations covering all UI text
- `ar.json` — All keys present but values are empty stubs; not yet translated

---

## Testing

Testing philosophy and detailed guide: [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md#testing) (testing section inside content guide).

### Stack

- **Vitest** — Test runner
- **React Testing Library** — Component testing
- **jsdom** — Browser environment simulation

### Running Tests

```bash
npm run test        # Run once
npm run test:watch  # Watch mode
```

### Test Areas

- **ErrorBoundary** — Fallback rendering, reload behavior, console error handling
- **Contact** — Form rendering, validation error display
- **Hero** — Greeting, name display, social links, CTA links, download attribute
- **Projects** — Card rendering from data, modal open/close, scroll lock, skeleton loading, image error fallback
- **Skills** — Category tab switching, skill card rendering, tag-based active state

### Manual QA

Automated tests do not cover visual layout, responsive behavior, real browser scrolling, production asset loading, or EmailJS integration. These require manual verification on the live site.

---

## Deployment

Deployed to Netlify. Pushing to `master` triggers an automatic build and deploy.

| Configuration | Value |
|---------------|-------|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Production branch | `master` |
| SPA redirect | `/* → /index.html` (200) |
| CSP | `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://api.emailjs.com; frame-ancestors 'none'; form-action 'self'; base-uri 'self'` |

### Production Verification

After deployment, verify:

- Homepage loads with no white screen or console errors
- Profile image loads (or fallback initials display)
- Project cards render, modal opens/closes, scroll lock works
- Theme toggle persists across page reload
- Contact form validates correctly (do not send real test messages unnecessarily)
- `robots.txt` and `sitemap.xml` are accessible
- Security headers are present in response (CSP, HSTS, X-Frame-Options)

### Troubleshooting

- **Build fails** — Check for syntax errors in JSON/JS files. Run `npm run build` locally first.
- **Contact form not sending** — Verify `VITE_EMAILJS_*` environment variables are set in Netlify.
- **Images not loading** — Check filename casing matches exactly (WebP files, case-sensitive on Linux/Netlify).
- **404 on page reload** — Verify the SPA redirect rule (`/* → /index.html`) is present in `netlify.toml`.

### Dependency Maintenance

When reviewing `npm audit`:

1. Inspect each advisory — most affect build tooling, not production runtime
2. Update intentionally per package, not via `npm audit fix --force`
3. Run `npm run test`, `npm run build`, `npm run lint` after any update
4. Verify production deployment after updating

---

## SEO

Meta tags are hardcoded in `index.html`:

- Open Graph tags (`og:title`, `og:description`, `og:image`) for social sharing
- Twitter Card tags (`summary_large_image`)
- `robots.txt` at `/robots.txt`
- `sitemap.xml` at `/sitemap.xml`
- Preload hint for the hero profile image (LCP optimization)

The SEO meta tags in `index.html` are static and not driven by the i18n system. The `<html>` `lang` attribute is hardcoded to `"en"`.

---

## Accessibility

- ARIA labels on interactive elements (project cards, modal, navigation, social links)
- Keyboard navigation (Escape to close modal, Enter to open, Arrow keys for image/project navigation)
- Focus management when opening/closing modal
- `role="alert"` on error boundary fallback
- Semantic HTML with section elements and headings

---

## Security

Security headers applied at the Netlify edge via `netlify.toml`:

| Header | Value |
|--------|-------|
| Content-Security-Policy | Restricted to self, inline styles, EmailJS API |
| Strict-Transport-Security | max-age=31536000, preload |
| X-Frame-Options | DENY |
| X-Content-Type-Options | nosniff |
| Referrer-Policy | strict-origin-when-cross-origin |
| Permissions-Policy | Camera, microphone, geolocation disabled |

---

## Localization

The i18n system uses a custom hook (`useTranslation`) with nested JSON key lookup and `{{variable}}` interpolation. Only English is fully translated.

- `en.json` — Complete English translations (247 lines)
- `ar.json` — All primary keys exist but values are empty objects `{}`. Arabic UI is not currently functional.

Adding a new language requires:
1. Creating a new locale file (e.g., `fr.json`)
2. Importing it in `src/i18n/index.js`
3. Adding language selection UI
4. Updating `<html lang="...">` when the language changes

---

## Known Limitations

- **Arabic translations** — `ar.json` contains empty stubs. The entire UI displays in English.
- **No backend/data projects** — 21 projects across architecture, design, and development. No backend or data engineering projects are currently represented.
- **BIM/AEC content** — The bio mentions BIM and AEC technology as a future direction, but no dedicated projects exist yet.
- **EmailJS** — Contact form uses a free EmailJS tier with rate limits. No self-hosted email option.
- **SEO meta tags** — Tags in `index.html` are hardcoded, not driven by i18n. The `<html>` `lang` attribute is always `"en"`.
- **Static content** — No CMS integration. All content edits require code changes and a deployment.
- **Image format** — All images are WebP. No automatic fallback to JPEG/PNG for older browsers.

---

## Future Direction

- Complete Arabic translations and implement language switching
- Add BIM/AEC-specific project content
- Add backend and data engineering project examples
- Consider dynamic content via a headless CMS if project count grows significantly

---

## Documentation

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — Application architecture, data flow, state ownership, design decisions
- [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md) — Content editing guide: projects, skills, translations, testing

---

## License

MIT
