# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Thomas J Butler — a React 19 + TypeScript SPA with a Matrix-themed aesthetic (green terminal effects, CRT overlays, particle backgrounds). Deployed to GitHub Pages at thomasjbutler.github.io.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server on port 3000 (opens /react.html) |
| `npm run build` | Production build to dist/ |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint on src/**/*.{js,ts} |
| `npm run format` | Prettier on src/**/*.{js,ts,css,html} |
| `npm run type-check` | TypeScript check (no emit) |
| `npm run test` | Vitest |
| `npm run test:ui` | Vitest with UI |
| `npm run test:coverage` | Vitest with coverage |
| `npm run deploy` | Build + deploy to GitHub Pages via gh-pages |

## Architecture

**Stack:** React 19, TypeScript (strict), Vite 7, React Router v7 (BrowserRouter)

**Entry flow:** `index.html` redirects to `react.html`, which loads `src/main.tsx` -> `App.tsx`. A third entry `blog.html` exists for legacy blog URL compatibility.

**Routing:** All pages are lazy-loaded via `React.lazy()` + `Suspense` in `App.tsx`. Blog routes are currently commented out. Legacy `.html` routes redirect to clean paths. The `/skills` route redirects to `/services`.

**CSS architecture:** `src/css/main.css` is the master import file. Styles are organized into `base/`, `components/`, `pages/`, and `utilities/` subdirectories using partial files (prefixed with `_`). Theme variables live in `themes.css` with light/dark mode via CSS custom properties and React Context (`ThemeContext`).

**Animation libraries:** GSAP, Anime.js (v4), Framer Motion, AOS (Animate On Scroll), ScrollMagic. Matrix rain, CRT effects, and particle backgrounds are custom implementations.

**Path aliases:** `@/` -> `src/`, plus `@components/`, `@pages/`, `@hooks/`, `@utils/`, `@css/`, `@js/`, `@images/` (configured in both tsconfig.json and vite.config.mjs).

**Key directories:**
- `src/pages/` — Route-level page components
- `src/components/` — Reusable UI components
- `src/hooks/` — Custom hooks (scroll animation, lazy loading, SEO, performance)
- `src/utils/` — Utilities (keyboard nav, performance optimizer, animations)
- `src/contexts/` — React Context (ThemeContext for light/dark mode)
- `src/css/` — Organized stylesheet modules
- `src/content/blog/` — Markdown blog posts (copied to dist on build)

## Code Style

- Prettier: single quotes, semicolons, 100 char width, trailing commas (es5)
- ESLint: TypeScript strict, React hooks rules, no-var, no-require
- Components use named exports (not default), except where lazy loading requires `.then(m => ({ default: m.ComponentName }))`
- Global animation libs (anime, gsap, ScrollMagic, AOS) are declared as ESLint globals

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) auto-deploys on push to main. Manual deploys via `npm run deploy` use the `gh-pages` package to push `dist/` to the gh-pages branch.
