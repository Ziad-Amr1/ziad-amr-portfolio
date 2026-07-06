# Content Guide

How to edit the portfolio's content: projects, skills, translations, and tests.

---

## Projects

**File**: `src/data/projectsData.json`

21 projects, each represented as an object in the `"projects"` array. Fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | number | yes | Unique integer. Must not conflict with existing IDs. |
| `title` | string | yes | Short project name (appears on card and in modal title). |
| `category` | string | yes | One of: `"architecture"`, `"design"`, `"development"`. |
| `year` | string | yes | Year as string (e.g., `"2024"`). |
| `role` | string | yes | Your role (e.g., `"Architectural Designer"`). |
| `image` | string | yes | Path to thumbnail image (e.g., `"images/projects/arc-1.webp"`). Required even if `images[]` exists. |
| `aspect_ratio` | string | no | `"landscape"` or `"portrait"`. Controls card aspect ratio. Defaults to landscape if omitted. |
| `tags` | string[] | no | Array of tag strings. Used for filtering by skill tag. Must match skills' `tags` arrays exactly. |
| `description` | string | yes | Short summary (appears on project card). |
| `problem` | string | no | The problem statement (case study section in modal). |
| `solution` | string | no | The solution description (case study section in modal). |
| `result` | string | no | The result/outcome (case study section in modal). |
| `key_features` | string[] | no | Bullet points for key features. |
| `challenges` | string | no | Longer-form challenges faced. |
| `what_i_learned` | string | no | Key lessons learned. |
| `images` | string[] | no | Gallery image paths (e.g., `["images/projects/arc-1a.webp"]`). If provided, the ImageSlider shows these; otherwise only the `image` thumbnail is displayed. |
| `links` | array | no | Array of `{ text: string, url: string \| null }` objects. External links related to the project. |

### Adding a new project

1. Copy an existing project object.
2. Assign a new unique `id`.
3. Set `category` to one of the three allowed values (the filter UI only shows these three).
4. Place images in `public/images/projects/` as WebP files.
5. Match `tags` to existing skill tags for cross-section filtering to work.

### Validation checklist

- `id` is unique across all projects
- `category` is one of the three allowed strings
- `image` path is correct (case-sensitive, WebP format)
- All referenced `images[]` files exist
- `tags` entries match skills' `tags` arrays exactly (same spelling, same case)
- No missing commas or trailing commas in JSON (JSON is strict — a trailing comma will break the build)
- Avoid apostrophes in `title` that would require HTML entity escaping

---

## Skills

**File**: `src/data/skillsData.js`

25 skills across 4 categories. The file exports three things:

### `CATEGORIES` (array)

The four category names: `"Architecture"`, `"Design"`, `"Software Development"`, `"Data & Emerging Tech"`.

**To add a category**: append to this array AND add a matching key in `SKILLS_DATA`.

### `SKILLS_DATA` (object)

Keyed by category name. Each category has:

| Field | Type | Description |
|-------|------|-------------|
| `tagline` | string | Subtitle shown on the tab panel. |
| `accent` | string | Tailwind gradient class for the tab accent (e.g., `"from-[#6EE7B7] via-[#3B82F6] to-[#60A5FA]"`). |
| `groups` | array | Array of groups (sub-sections within a category). Some categories with only a few skills (like Data & Emerging Tech) use a flat `skills` array instead of `groups`. |
| `groups[].title` | string | Group heading text. |
| `groups[].skills` | array | Array of skill objects within that group. |

If a category uses a flat `skills` array instead of `groups`, it renders with no sub-headings.

### Skill object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | yes | Skill name (e.g., `"React"`). |
| `level` | string | yes | One of: `"Core"`, `"Used"`, `"Learning"`, `"Exploring"`. Controls the color badge. |
| `note` | string | yes | Short description (e.g., `"Component-based architecture"`). |
| `tags` | string[] | no | Links this skill to projects. Projects whose `tags` include any of these values will be highlighted when the skill is clicked. |

### Level meanings

| Level | Visual | Meaning |
|-------|--------|---------|
| `Core` | Emerald | Proficient, can build independently, primary tool. |
| `Used` | Blue | Comfortable, have used in projects, productive. |
| `Learning` | Amber | Currently studying, basic competence, growing. |
| `Exploring` | Purple | Experimenting, early stages, curious. |

### Adding a new skill

1. Find the appropriate category in `SKILLS_DATA`.
2. Find or create the appropriate `group` within that category.
3. Add a skill object with `name`, `level`, `note`, and optional `tags`.
4. If the skill should filter projects when clicked, add matching tags.
5. If adding a new category, also add it to `CATEGORIES` and create the `SKILLS_DATA` entry.

---

## Tag System (Skills ↔ Projects Cross-link)

The tag system connects Skills to Projects. When a user clicks a skill in the Skills section, the Projects grid filters to show only projects whose `tags` array contains any of that skill's `tags`.

### How it works

```
Skills.jsx: skill has tags: ["React", "Tailwind CSS"]
  → User clicks skill
  → App sets tagFilter = "React"
  → Projects filters: show projects where tags array includes "React"
```

### Rules for tags

- **Tags must match exactly** between skills and projects (same case, same spelling).
- A skill can have multiple tags (e.g., `["React", "Tailwind CSS"]`).
- A project can match multiple skills through its tags array.
- Clicking the same skill again toggles the filter off.

### Checking tag consistency

Scan `skillsData.js` for all unique tags across all skills. Then verify that each project's `tags` values exist in that set (or vice versa). Mismatched tags silently fail — no filter, no error, no visible sign.

---

## Images

### Format

All images are **WebP**. No automatic fallback to JPEG/PNG.

### Path conventions

- Thumbnails: `public/images/projects/arc-1.webp`
- Gallery images: `public/images/projects/arc-1a.webp`, `arc-1b.webp`, etc.
- Image paths in `projectsData.json` omit `public/` prefix (e.g., `"images/projects/arc-1.webp"`).
- Profile image: `public/images/profile.webp`

### Image handling

- Each project card requires at least the `image` field.
- If `images[]` is provided, the modal gallery shows those; otherwise only the single thumbnail.
- Images use native lazy loading (`loading="lazy"`) with skeleton shimmer placeholders.
- On load error, a fallback image is shown (a placeholder SVG or initial-letter fallback).
- Aspect ratio is controlled by the `aspect_ratio` field in project data.

### Adding images

1. Export as WebP (use Squoosh, ImageMagick, or similar).
2. Name consistently (project-id + optional letter for gallery).
3. Place in `public/images/projects/`.
4. Reference the path in `projectsData.json` without `public/` prefix.
5. Consider image size — large images impact load time. Aim for <200KB per image.

---

## Translations (i18n)

**Directory**: `src/i18n/locales/`

### File structure

```
src/i18n/locales/
├── en.json      # English (complete, ~247 lines, 70+ keys)
└── ar.json      # Arabic (all keys present, values are empty strings)
```

Each locale file is a nested JSON object. Keys are dot-notation paths used in `t()` calls.

### Key naming convention

```
hero: {
  greeting: "Hi, I'm",
  name: "Ziad Amr",
  titles: ["Architecture Student", "Software Developer"]
}
```

Access: `t("hero.greeting")` → `"Hi, I'm"`

### Variable interpolation

Keys can contain `{{variable}}` placeholders:

```json
{
  "projects": {
    "showing": "Showing {{count}} of {{total}} projects"
  }
}
```

Usage: `t("projects.showing", { count: 5, total: 21 })`

### Adding a new language

1. Copy `en.json` to `src/i18n/locales/fr.json`.
2. Translate all values (keep keys intact).
3. In `src/i18n/index.js`, import the new locale file and add it to the locales object.
4. (Future) Add a language switcher UI and update `<html lang="...">`.
5. Arabic (`ar.json`) already exists with all keys stubbed — only values need translation.

### Translation checklist

- Every key present must have a non-empty value (empty values display as blank).
- Keep the same nesting structure as `en.json`.
- Interpolation variable names (`{{count}}`) must match exactly.
- Test every section of the UI after switching locales.

---

## Testing

### Stack

- **Vitest** — test runner
- **React Testing Library** — component testing
- **jsdom** — browser environment simulation
- **Custom test utils** — `testUtils.jsx` renders with `ThemeProvider` wrapper

### Test files

| File | What it tests |
|------|---------------|
| `Hero.test.jsx` | Greeting, name, social links, CTA links (including download attribute), basic render structure |
| `Projects.test.jsx` | Card rendering from JSON data, modal open/close from card click, scroll lock activation, skeleton loading state, image error fallback |
| `Skills.test.jsx` | Category tab switching, skill card rendering, tag-based active state highlighting |
| `Contact.test.jsx` | Form rendering, validation error display for required fields |
| `ErrorBoundary.test.jsx` | Fallback rendering when children throw, reload button existence, normal render pass-through, console error suppression |

### Running tests

```bash
npm run test          # Run once (CI mode)
npm run test:watch    # Watch mode for development
```

### What tests cover

Tests focus on **functional behavior** — component rendering, state transitions, event handling, conditional rendering. They do NOT cover:

- Visual layout / CSS (no visual regression testing)
- Responsive behavior at different breakpoints
- Real browser scrolling or scroll restoration
- Production asset loading (images, fonts)
- EmailJS integration (requires real credentials)
- Animation timing (Framer Motion animations are mocked)

### Writing a new test

1. Create the file in `src/test/` with a `.test.jsx` extension.
2. Import `render` and `screen` from from test utils.
3. Import the component and any required data.
4. Test a single behavior per test case.
5. Use `describe` blocks to group related tests.
6. Run `npm run test` to verify.

### Test setup

The setup (`src/test/setup.js`) handles:
- jsdom environment configuration
- Framer Motion animation mocking (skips animation timing)
- i18n hook mocking (returns translation keys as-is for testing)
- TextEncoder/TextDecoder polyfill

---

## Content Integrity Checklist

After any content change, verify:

- [ ] `npm run build` succeeds (catches JSON syntax errors and broken imports)
- [ ] `npm run test` passes (catches rendering regressions)
- [ ] New project cards render correctly at all breakpoints
- [ ] New skill tags filter projects correctly
- [ ] Modal opens/closes for new projects
- [ ] Image paths are correct (404 check in browser DevTools)
- [ ] No duplicate project IDs
- [ ] No trailing commas in JSON files
- [ ] Tags match between skills and projects
- [ ] New locale keys match the source locale's structure
- [ ] Category filter still shows the right projects
