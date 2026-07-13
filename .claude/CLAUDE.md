# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## Project Overview

Personal portfolio for Thomas J Butler — a React 19 + TypeScript SPA with a Matrix-themed aesthetic (cursor-reactive rain, CRT scanlines, terminal UI). Deployed to GitHub Pages.

The current design is **v5 "The Operator"**, whose positioning is *Local & Private AI* — "AI you own, not AI you rent". The source design is a standalone HTML prototype in `design_handoff_v5_operator-v4-redesign/`; it is a **reference, not code to copy** (it uses `[data-theme=...]` selectors and `window.*` globals, neither of which this codebase uses).

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server on port 3000 |
| `npm run build` | Production build to dist/ |
| `npm run type-check` | `tsc --noEmit` |
| `npx vitest run` | Run the unit/component suite once (`npm test` starts watch mode) |
| `npm run test:e2e` | Playwright |
| `npm run deploy` | Build + publish to GitHub Pages |

## Architecture

**Stack:** React 19, TypeScript (strict), Vite 7, **Tailwind v4** (CSS-first — there is no `tailwind.config`), React Router v7, framer-motion 12, lucide-react. shadcn components are built on **`@base-ui/react`** (not Radix, despite `radix-ui` being an unused dependency).

**Styling is one file: `src/app.css`.** There is no `src/css/` directory and no CSS-module system for app styles. Theme tokens are CSS custom properties; **light/dark is a `.dark` class on `<html>`** (dark = "neon terminal", light = "circuit"), so theme-specific CSS is written as `.dark X` / `:root:not(.dark) X`.

**Entry:** `index.html` → `react.html` → `src/main.tsx` → `Providers` → `App`.

**`src/Providers.tsx`** composes Theme + Accent + Fx + `MotionConfig reducedMotion="user"`. Tests render through the same component (`src/test/utils.tsx`), so they exercise the tree we ship. `MotionConfig` is load-bearing: framer-motion animates via inline styles, so the `@media (prefers-reduced-motion)` block in `app.css` cannot reach it.

**Routing:** `App.tsx` exports `AppRoutes` (no Router) and `App` (Router + AppRoutes). Tests mount `AppRoutes` inside a `MemoryRouter` — do not wrap `App` in another router. `Layout` is the route parent and hosts every global system (rain, atmosphere, cursor, palette, toaster, boot intro, eggs) plus the page transition.

### The FX layer

- `src/lib/fx/rain-engine.ts` — the Matrix rain, as a plain class so its maths is unit-tested without a canvas. **The performance constraints in it are load-bearing, not fussiness** — the first version dropped the page to 20fps and had to be switched off to use the site. Don't undo any of these without measuring: it renders at **DPR 1** (the per-frame fade is a full-canvas alpha fill, so cost == pixel count), draws at **30fps** (movement is time-scaled, so speed is unaffected), **bounds each stream to 16–34 glyphs** (a viewport-height trail is ~9,000 `fillText`/frame), and **batches the head glow into one pass** (`shadowBlur` per glyph is a gaussian per glyph). It has **no pointer listeners** by design.
- `src/lib/fx/decode.ts` + `src/components/fx/DecodeText.tsx` — per-character decode-in. Render is pure; the animation is imperative writes to span refs. Real text lives in an `sr-only` span with the glyphs `aria-hidden` (`aria-label` on a `<span>` is prohibited ARIA and fails axe).
- `src/lib/rain-bus.ts` / `src/lib/toast-bus.ts` — module emitters, deliberately not context. `burstRain()` and `toast()` are callable from anywhere.
- `src/lib/content.ts` — all v5 copy. **Import it; don't retype it.** It contains typographic quotes that must survive verbatim.

### Non-obvious things that will bite you

- **Text sits directly on the live rain.** The `.fx-page` scrim on each page container is not decoration — without it, a rain head glyph behind body text measures ~1.38:1 contrast (WCAG needs 4.5). Any new full-width text block needs to be inside `.fx-page` or carry `.fx-scrim`.
- **Don't put a Tailwind `bg-gradient-*` utility on a `Card`.** `.dark [data-slot="card"]` paints its dark surface with the `background` shorthand, so a utility that sets `background-image` strips it and exposes a near-white background-color. Layer washes in CSS instead (see `.fx-lead-card`).
- **The accent (red/blue pill) is set on `documentElement`**, not a wrapper — base-ui portals dialogs to `document.body`, so a wrapper would leave modals un-accented.
- **`useFx().motionOk`** is the single gate for every effect: it folds the OS reduced-motion preference together with the in-page effects toggle. WCAG 2.2.2 requires that in-page control for the auto-playing rain; `prefers-reduced-motion` alone does not satisfy it.
- **No global fake timers.** They also fake rAF and `performance.now`, which hangs `waitFor` and `user-event`. Opt in per-file.
- `src/pages/BlogPage.tsx` and `src/components/UpdatesFeed/` are unrouted leftovers that import modules which no longer exist; they are excluded in `tsconfig.json`.

## Code Style

Prettier (single quotes, semicolons, 100 cols). Named exports, except where `React.lazy` needs `.then(m => ({ default: m.X }))`. Tom dislikes em dashes in prose — use commas or colons. Note `npm run lint` globs `src/**/*.{js,ts}` and therefore never lints `.tsx`.
