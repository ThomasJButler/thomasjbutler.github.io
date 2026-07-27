# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## Project Overview

Thomas J Butler's site: React 19 + TypeScript, Matrix-themed (cursor-reactive rain, CRT scanlines, terminal UI). Deployed to GitHub Pages.

**It is not a portfolio any more. It is a shop window**, and it is judged as one: Tom is self-employed selling *Local & Private AI* ("AI you own, not AI you rent"), links it from his commercial site, and drives traffic at it from LinkedIn and YouTube. Prices are real (`PRICING` in `src/lib/content.ts`, sourced in `PRICING.md`). Copy that reads like a junior portfolio actively reprices the work, which is why the skill bars, the "open to work" dot and the "Buy me a coffee" link are gone and must not come back.

**It is prerendered, not a pure SPA.** See the section below before touching the build, `main.tsx`, or anything that renders differently on a server.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server on port 3000 |
| `npm run build` | Client build, **then** an SSR build, **then** `scripts/prerender.mjs` |
| `npm run preview` | Serves `dist/`. The `--outDir dist` is load-bearing: without it Vite picks up the SSR step's `.ssr` outDir and serves **404 for every route** |
| `npm run type-check` | `tsc --noEmit` |
| `npm run lint` | `eslint src`. It used to glob `src/**/*.{js,ts}`, which never linted a single `.tsx` file, i.e. the entire app |
| `npx vitest run` | Unit/component suite once (`npm test` is watch mode) |
| `npm run deploy` | Build + publish to GitHub Pages |

## Prerendering (read this before changing anything about rendering)

Every route is rendered to real HTML at build time. This is not an optimisation, it is the difference between the site existing and not existing for a large class of readers: **GPTBot, ClaudeBot and PerplexityBot fetch HTML and do not execute JavaScript.** Before this, `dist/services.html` contained **zero characters** of body text; it now has 6,202.

- `src/entry-server.tsx` uses **`prerenderToNodeStream`** from `react-dom/static`, not `prerender` (Node exports one, edge the other, and TypeScript is happy with either — you find out at build time). It must **not** import `main.tsx`, which carries font CSS side-effect imports Node cannot parse. It uses `StaticRouter`, which in React Router 7 lives in `react-router`, not `react-router-dom/server`.
- `scripts/routes.mjs` is the single source of truth for routes, titles and descriptions. `scripts/prerender.mjs` injects markup, meta and per-route JSON-LD, and **fails the build if any route emits under 600 characters of text** — the failure mode it guards against (a component silently rendering nothing on the server) is invisible otherwise.
- `src/main.tsx` **hydrates** when `#root` has children. `createRoot` would throw the prerendered DOM away and rebuild it.

**Four things exist only so the prerendered paint is visible and hydration matches. All four look like dead weight:**

- **`useHydrated()`** gates `ThemeToggle` and `MotionToggle`. They read `localStorage`, the server has to guess, and a mismatch makes React discard the entire tree (error #418) — which silently undoes the prerender while everything still *looks* fine.
- **`PageTransition`'s module-scoped `hasEntered`.** It wraps `<Outlet/>`, so its `initial={{opacity: 0}}` is the opacity of every route's whole body. It must be `false` during both the server render and the hydrating render, or the page serialises as `opacity: 0`: crawlers read the words, browsers paint a blank screen.
- **`DecodeText` renders the real characters**, not empty spans, and `.ch--pending` is `opacity: 1`. The hero `h1` is the LCP element; when it was invisible until the scramble locked, LCP was measuring the decode.
- **Metric-matched fallback `@font-face` blocks** at the top of `app.css`. Orbitron is **18.9% wider than Arial** (measured with canvas `measureText`), so without them every heading re-wraps on font load: 0.089 CLS on home, all of it.

## Architecture

**Stack:** React 19, TypeScript (strict), Vite 7, **Tailwind v4** (CSS-first — there is no `tailwind.config`), React Router v7, framer-motion 12, lucide-react. shadcn components are built on **`@base-ui/react`** (not Radix, despite `radix-ui` being an unused dependency).

**Styling is one file: `src/app.css`.** There is no `src/css/` directory and no CSS-module system for app styles. Theme tokens are CSS custom properties; **light/dark is a `.dark` class on `<html>`** (dark = "neon terminal", light = "circuit"), so theme-specific CSS is written as `.dark X` / `:root:not(.dark) X`.

**Entry:** `index.html` → `react.html` → `src/main.tsx` → `Providers` → `App`.

**`src/Providers.tsx`** composes Theme + Accent + Fx + `MotionConfig reducedMotion="user"`. Tests render through the same component (`src/test/utils.tsx`), so they exercise the tree we ship. `MotionConfig` is load-bearing: framer-motion animates via inline styles, so the `@media (prefers-reduced-motion)` block in `app.css` cannot reach it.

**Routing:** `App.tsx` exports `AppRoutes` (no Router) and `App` (Router + AppRoutes). Tests mount `AppRoutes` inside a `MemoryRouter` — do not wrap `App` in another router. `Layout` is the route parent and hosts every global system (rain, atmosphere, cursor, palette, toaster, boot intro, eggs) plus the page transition.

### The FX layer

- `src/lib/fx/rain-engine.ts` — the Matrix rain, as a plain class so its maths is unit-tested without a canvas. **The performance constraints in it are load-bearing, not fussiness** — the first version dropped the page to 20fps and had to be switched off to use the site. Don't undo any of these without measuring: it renders at **DPR 1** (the per-frame fade is a full-canvas alpha fill, so cost == pixel count), draws at **30fps** (movement is time-scaled, so speed is unaffected), **bounds each stream to 16–34 glyphs** (a viewport-height trail is ~9,000 `fillText`/frame), and **batches the column heads into one pass** (`shadowBlur` per glyph is a gaussian per glyph).
- **The "morph"** (glyphs parting around the pointer, click ripples) is back, but it is *gated*: dark theme + rain on + a fine pointer + `morphEnabled`. When the gate is closed there are **no pointer listeners on the page at all** and the draw loop skips every distance calculation — the gate *is* the optimisation. Measured at ~1ms per draw (10.1ms → 11.2ms of a 33ms budget) at retina under a 4× CPU throttle: it is affordable because it adds no glyphs, it only moves and recolours ones already being drawn. Only the handful of heads actually lit by the pointer break out of the batch (`headBoost`); do not regress that. Boosted *trail* glyphs deliberately take the spark colour but **no** `shadowBlur` — a ripple ring can put hundreds of glyphs in its band, and each shadowed `fillText` is a separate gaussian.
- `src/lib/fx/decode.ts` + `src/components/fx/DecodeText.tsx` — per-character decode-in. Render is pure; the animation is imperative writes to span refs. Real text lives in an `sr-only` span with the glyphs `aria-hidden` (`aria-label` on a `<span>` is prohibited ARIA and fails axe).
- `src/lib/rain-bus.ts` / `src/lib/toast-bus.ts` — module emitters, deliberately not context. `burstRain()` and `toast()` are callable from anywhere.
- `src/lib/content.ts` — all v5 copy. **Import it; don't retype it.** It contains typographic quotes that must survive verbatim.

### Non-obvious things that will bite you

- **Three separate things exist only to hold layout still.** Each was measured; each is worth a real chunk of CLS, and all three look like dead weight to someone tidying up.
  - `PageLoader` (in `Layout`) reserves `min-h-screen`. `main` is `flex-1` in a `min-h-screen` column, so a *short* fallback leaves the footer visible at the bottom edge, and the arriving route chunk then shoves it down ~1,900px. That one move was 0.115 of a 0.118-0.144 CLS on every lazy route. CLS only counts elements visible when they move, so reserving a full screen puts the footer below the fold and the shift scores zero.
  - `DecodeText` renders a hidden `.ch__sizer` per character and overlays the animating `.ch__glyph`. The scramble alphabet is half-width katakana and symbols, whose widths are nothing like the latin they stand in for, so a slot sized by its *current* glyph re-widths every frame and re-wraps the line: 0.075 CLS on the home hero, on the LCP element itself.
  - The rain's `mouseout` handler checks `e.relatedTarget === null`. `mouseout` bubbles, so a window listener sees the pointer leave *any* element; scrolling under a stationary cursor fires mouseout/mouseover with **no** following mousemove to re-arm the pointer, and the morph would switch itself off mid-scroll and stay off. `relatedTarget` is null only on a genuine window exit.
- **Text sits directly on the live rain.** The `.fx-page` scrim on each page container is not decoration — without it, a rain head glyph behind body text measures ~1.38:1 contrast (WCAG needs 4.5). Any new full-width text block needs to be inside `.fx-page` or carry `.fx-scrim`.
- **`.fx-scrim::before` is `z-index: -1`, and it has to be.** At `0` a positioned pseudo-element paints *above* its parent's own inline content, so the scrim (a 0.92-alpha near-black wash whose whole job is to hide the rain behind text) painted **on top of that text**. A `.fx-scrim > *` rule rescued child *elements*, which is why the hero always looked right; `.fx-scrim` on a bare `<p>` has only a text node inside, and a text node cannot be lifted with `z-index`. Every scrimmed paragraph on the site was being read through a black veil.
- **One section opener: `SectionHead`.** The old device (an icon, a `// snake_case` mono label as the `h2`, and a fading hairline) appeared **11 times**, five on the case study alone, and inverted the heading hierarchy every time: the decorative label was the `h2` and the real heading an `h3` beneath it, so `why_local_ai` sat directly on top of "Why Local AI". The human heading is the `h2`. There is no hairline. Do not reintroduce one.
- **`--meter` (amber) means exactly one thing: the meter running** — per-token bills, API spend, data leaving the building. Green is what you own. It is the only non-green hue and it is *never* decorative. It replaced `cyan`/`amber` badge tones handed out with no rule (Ollama was cyan, On-Device was amber). A second hue that means nothing is noise; a second hue that means "this is costing you money" makes the palette argue the case.
- **Do not use framer-motion's `layout` prop or `AnimatePresence mode="popLayout"`.** They need the layout-projection feature, which `domMax` ships and **`domAnimation` does not** (see `Providers`). They fail silently: they were dead props on the projects grid for a whole release.
- **`role="presentation"` is prohibited on `<video>`** (axe: `aria-allowed-role`). A decorative video wants `aria-hidden`, which also keeps the captions rule from firing on a silent clip.
- **Prices, revision terms and the retainer are constants** (`PRICING`, `ENGAGEMENT_TERMS`, `RETAINER` in `src/lib/content.ts`), benchmarked against real 2026 UK market data — the sourcing is in a comment above `PRICING`. A `price` of `null` still renders `PRICE_TBC` rather than a made-up figure.
- **The site is client-rendered, so nothing paints until the JS lands. That one fact invalidates three "obvious" optimisations**, all of which were measured and all of which made things *worse* or did nothing:
  - *Preloading the fonts* cost **+740 ms LCP**. On a throttled link the woff2 competes with the very JS that first paint is waiting on.
  - *Inlining critical CSS* buys **~0 ms**. Lighthouse's `render-blocking-resources` shows a scary `wastedMs` but its own simulated saving is 0: FCP is gated on JS, not on the stylesheet.
  - *Eager-loading the LCP cover image* on `/projects` cost **280 ms LCP and 3 points**. `loading="eager"` gives no head start when the `<img>` doesn't exist until React mounts; it just adds contention. It stays `lazy` and the `lcp-lazy-loaded` audit stays failing, deliberately.
  Bytes on the critical path are what move the needle here, not ordering. Measure before believing any advice above.
- **`LazyMotion features={domAnimation} strict`** wraps the tree in `Providers`, and every call site imports **`m as motion`**. `strict` throws on a plain `motion.*`, which would silently pull the full bundle back in (12.3 kB gz). `domAnimation` is sufficient because nothing uses drag/layout/layoutId — `whileInView` is a *gesture* feature and works fine under it.
- **Font imports are the `latin-` variants** (`@fontsource/exo-2/latin-400.css`). The bare entry points pull every subset (cyrillic, greek, vietnamese) and Vite base64-inlines the small ones straight into the stylesheet, where they don't compress. Latin-only halved the CSS: 34.7 kB → 19.9 kB gzipped.
- **The case study's `provenance` field is not padding.** The ISQ Agent build ran on hosted models (Claude, Voyage, Pinecone) while the site argues for local AI, and the page renders those badges. Stating that plainly is the only thing that keeps the page honest; don't quietly delete it.
- **Don't put a Tailwind `bg-gradient-*` utility on a `Card`.** `.dark [data-slot="card"]` paints its dark surface with the `background` shorthand, so a utility that sets `background-image` strips it and exposes a near-white background-color. Layer washes in CSS instead (see `.fx-lead-card`).
- **The accent (red/blue pill) is set on `documentElement`**, not a wrapper — base-ui portals dialogs to `document.body`, so a wrapper would leave modals un-accented.
- **`useFx().motionOk`** is the single gate for every effect: it folds the OS reduced-motion preference together with the in-page effects toggle. WCAG 2.2.2 requires that in-page control for the auto-playing rain; `prefers-reduced-motion` alone does not satisfy it.
- **No global fake timers.** They also fake rAF and `performance.now`, which hangs `waitFor` and `user-event`. Opt in per-file.
- `src/pages/BlogPage.tsx` and `src/components/UpdatesFeed/` are unrouted leftovers that import modules which no longer exist; they are excluded in `tsconfig.json`.

## Code Style

Prettier (single quotes, semicolons, 100 cols). Named exports, except where `React.lazy` needs `.then(m => ({ default: m.X }))`. Tom dislikes em dashes in prose — use commas or colons. Note `npm run lint` globs `src/**/*.{js,ts}` and therefore never lints `.tsx`.
