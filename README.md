# thomasjbutler.github.io

My personal site. Matrix-themed, prerendered, and built from scratch because I wanted to.

**[thomasjbutler.github.io](https://thomasjbutler.github.io)** · the paid work lives at **[thomasjbutler.me](https://thomasjbutler.me)**

React 19, TypeScript, Vite 7, Tailwind 4. Cursor-reactive Matrix rain on a canvas, CRT scanlines, a terminal-style command palette, and a light theme for people who would rather not.

<img width="637" height="360" alt="The site's home page: the hero, the terminal console and the Matrix rain behind them" src="https://github.com/user-attachments/assets/e2bb8433-c148-4bcb-afea-b9b1f2804a06" />

---

## What's in here

**Projects.** Twenty of them, filterable, from an on-device iOS app and a local RAG pipeline down to the CSS demos I built while learning CSS. The tags say which is which, on purpose: the arc from one to the other is the point.

**A case study.** One build taken apart properly: the problem, the architecture, and what I'd do differently.

**A dev journey.** Every month since I started, from the first line of code to now, by way of the DWP and an agency apprenticeship.

**Version TimeTravel.** [Every previous version of this site](https://thomasjbutler.github.io/version-timetravel/), still running as it originally shipped. It's the one thing a CV can't do.

---

## Architecture

### It's prerendered, not an SPA

Every route is rendered to real HTML at build time. This isn't an optimisation, it's the difference between existing and not existing for a whole class of reader: **GPTBot, ClaudeBot and PerplexityBot fetch HTML and don't execute JavaScript.** Before this, `/about` shipped zero characters of body text.

- `src/entry-server.tsx` renders each route with `prerenderToNodeStream`.
- `scripts/routes.mjs` is the single source of truth for routes, titles and descriptions.
- `scripts/prerender.mjs` injects markup, per-route meta and JSON-LD, and **fails the build if any route emits under 600 characters of text.** A component that silently renders nothing on the server is invisible otherwise.
- `src/main.tsx` **hydrates** rather than mounting fresh, so the prerendered DOM survives.

### The effects layer

`src/lib/fx/rain-engine.ts` is the Matrix rain as a plain class, so its maths is unit-tested without a canvas. The performance constraints in it are load-bearing rather than fussy: the first version dropped the page to 20fps. It renders at DPR 1, draws at 30fps with time-scaled movement, bounds each stream to 16-34 glyphs, and batches the column heads into a single pass.

The pointer "morph" (glyphs parting around the cursor, click ripples) is gated on dark theme + rain on + a fine pointer. When that gate is shut there are no pointer listeners on the page at all.

Everything cinematic answers to one switch, `useFx().motionOk`, which folds the OS reduced-motion preference together with an in-page toggle. WCAG 2.2.2 needs that in-page control for auto-playing motion; `prefers-reduced-motion` alone doesn't satisfy it.

### Styling

One file, `src/app.css`. Tailwind 4, CSS-first, so there's no `tailwind.config`. Theme tokens are custom properties and light/dark is a `.dark` class on `<html>`.

---

## Project structure

```
├── index.html              the app shell, plus the pre-paint theme script
├── scripts/
│   ├── routes.mjs          every route, title and description. Also a runtime import
│   ├── prerender.mjs       renders each route to HTML, enforces the 600-char floor
│   └── structured-data.mjs per-route JSON-LD
├── src/
│   ├── app.css             all of it
│   ├── entry-server.tsx    the server render entry
│   ├── main.tsx            hydrates #root
│   ├── components/
│   │   ├── fx/             decode-in text, reveal-on-scroll
│   │   ├── home/           hero, terminal console, proof section
│   │   ├── layout/         header, footer, page transition
│   │   ├── system/         command palette, atmosphere, toaster, easter eggs
│   │   └── ui/             shadcn components, on Base UI
│   ├── contexts/           theme, accent, effects
│   ├── lib/
│   │   ├── content.ts      the copy. Import it, don't retype it
│   │   ├── projects.ts     the project data
│   │   ├── timeline.ts     the dev journey
│   │   ├── assets.ts       Cloudinary URL map
│   │   └── fx/             rain engine, decode, easing
│   └── pages/              one per route
└── e2e/                    Playwright screenshots and page checks
```

---

## Running it

Node 22.

```bash
npm install
npm run dev          # localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on port 3000 |
| `npm run build` | Client build, then an SSR build, then the prerender |
| `npm run preview` | Serves `dist/`. The `--outDir dist` is load-bearing |
| `npm run type-check` | `tsc --noEmit` |
| `npm run lint` | ESLint over `src` |
| `npx vitest run` | Unit and component tests, once |
| `npm run test:e2e` | Playwright |
| `npm run deploy` | Build and publish to GitHub Pages |

---

## Quality

Lighthouse, desktop, against a production build, on `/` and `/projects`. Measured
27 August 2026, not aspirational:

| | `/` | `/projects` |
|---|---|---|
| Accessibility | **100** | **100** |
| Best Practices | **100** | **100** |
| SEO | **100** | **100** |
| Agentic Browsing | 97 | **100** |

Cumulative Layout Shift is **0.00**, from a separate trace.

That CLS number was 0.144 once. Getting it to zero took three things that all look like dead weight to anyone tidying up: a full-screen loader reservation, a hidden per-character sizer inside the decode-in text, and metric-matched fallback `@font-face` blocks (Orbitron is 18.9% wider than Arial, so every heading re-wrapped on font load). They're all commented where they live.

The test suite is 117 unit and component tests across 17 files, plus Playwright for screenshots and page checks.

---

## Licence

`package.json` declares ISC. There's no LICENSE file in the repo yet, so treat that as
the intent rather than the paperwork.

---

## Contact

**Tom Butler** · Leeds, Yorkshire
Looking for full-time work: junior for general software, any non-senior level for AI.

[dev@thomasjbutler.me](mailto:dev@thomasjbutler.me) · [LinkedIn](https://www.linkedin.com/in/thomasbutleruk/) · [GitHub](https://github.com/ThomasJButler) · [Commercial work](https://thomasjbutler.me)
