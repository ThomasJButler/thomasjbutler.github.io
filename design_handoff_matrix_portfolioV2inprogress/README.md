# Handoff: Matrix Portfolio Design System

A complete design system for **Thomas J Butler's personal portfolio** — Matrix‑themed, cyberpunk-flavored, with two visual eras (v3.5 "Matrix Unleashed" and v4.0 "Neon Terminal" / "Circuit Board") plus proposed hybrid variants that mix v3.5 personality back into the polished v4.0 chassis.

Source repo: <https://github.com/ThomasJButler/thomasjbutler.github.io>
Live site: <https://thomasjbutler.github.io/> (v3.5)
Direction: `v4.0-ShadCNRedesign` branch + ✦ hybrid blends.

---

## About these files

Everything in this bundle is **design reference** — HTML/CSS/JSX prototypes showing the intended look, motion, and behaviour. Your job is to **recreate these designs inside Tom's existing codebase** (React 19 + TypeScript + Vite + ShadCN base‑ui + Tailwind v4 + Framer Motion on the v4.0 branch). Don't ship the HTML verbatim. Instead:

- Lift the **tokens** from `colors_and_type.css` into Tom's `src/app.css` (they're already OKLCH + ShadCN-shaped, drop straight in)
- Recreate components using **Tom's ShadCN base‑ui primitives** (`button.tsx`, `card.tsx`, `badge.tsx`, `tabs.tsx`)
- Use **Framer Motion only** (v4.0 deliberately consolidated away from anime.js + GSAP + ScrollMagic + AOS)
- Use **Lucide React** for icons (already wired up via `components.json`). GitHub/LinkedIn keep their custom inline SVGs.
- Keep accessibility — `prefers-reduced-motion`, focus rings, ARIA labels, semantic HTML

If you're starting fresh somewhere else: React + TS + Tailwind v4 + ShadCN + Framer Motion is the recommended stack. Anything else, port the tokens and component patterns into the framework you have.

---

## Fidelity

**High‑fidelity.** Final colours, typography, spacing, interactions, motion are all pinned. Pixel-target the look. The HTML files use Tom's real fonts (Orbitron, Exo 2, Share Tech Mono, JetBrains Mono — all Google Fonts) and the canonical OKLCH palette.

---

## What's in this folder

```
design_handoff_matrix_portfolio/
├── README.md                          ← you are here
├── DESIGN_SYSTEM.md                   ← copy of the system's main README — context + content/visual/icon fundamentals
├── SKILL.md                           ← agent-skill entry for AI coding tools
├── colors_and_type.css                ← canonical tokens for all 4 themes — drop straight in
├── assets/
│   └── logo.svg                       ← brand SVG mark
├── preview/                           ← 26 atomic spec cards — open in browser to inspect tokens visually
│   ├── colors-*.html                  (7 color cards)
│   ├── type-*.html                    (4 type cards)
│   ├── spacing-*.html                 (4 token cards)
│   ├── components-*.html              (7 component cards)
│   └── brand-*.html                   (4 brand cards)
├── ui_kits/
│   ├── matrix-v3-5/                   ← React prototype of the v3.5 live site
│   │   ├── index.html                 (5 screens — Home/Projects/About/Services/Contact)
│   │   ├── matrix.css
│   │   ├── Chrome.jsx                 (MatrixRain, Header, Footer, Icons)
│   │   ├── HomePage.jsx
│   │   ├── Pages.jsx
│   │   └── README.md
│   └── neon-terminal-v4/              ← React prototype of the v4.0 ShadCN redesign
│       ├── index.html                 (5 screens, dark/light toggle)
│       ├── neon.css
│       ├── Chrome.jsx                 (NTMatrixRain, NTHeader, NTFooter, Lucide icons)
│       ├── HomePage.jsx               (terminal hero + System Status dashboard)
│       ├── Pages.jsx
│       └── README.md
└── canvas/                            ← The curation canvas the designer used
    ├── index.html                     (19 artboards across 7 sections)
    └── sections/                      (the 19 section snapshots)
```

Open any `.html` file directly in a browser — they run from disk, no build step.

---

## Screenshots

Rendered previews of the key designs live in `screenshots/`:

| File | What it shows |
|---|---|
| `01-v4-home-dark.png` | v4.0 Neon Terminal — home (dark): terminal hero + System Status dashboard |
| `02-v4-home-light.png` | v4.0 Circuit Board — home (light theme) |
| `03-v4-projects-dark.png` | v4.0 — projects grid with Featured + tabs |
| `04-v35-home.png` | v3.5 Matrix — live-site home with full digital rain + cyan glow hero |
| `05-hybrid-hero.png` | ✦ Hybrid hero — v4.0 terminal frame + v3.5 UPPERCASE cyan treatment |
| `06-hybrid-featured.png` | ✦ Hybrid featured cards — lifted glass + scanline texture + uppercase buttons |

These are reference renders — match them pixel-for-pixel when recreating in the target stack.

---

## Two eras, four themes

This system carries **both** of Tom's portfolio eras so designs can pull from either. Token sets in `colors_and_type.css`:

| `data-theme` | Era | Mood |
|---|---|---|
| `matrix` (default) | v3.5 | Full theatre — neon green on black, CRT scanlines, vignette, cyan accents |
| `dark` | v3.5 (retired) | Same chrome but green→blue. Don't use for new work. |
| `neon-terminal` | v4.0 dark | Refined OKLCH green on near‑black, glass-morphism, subtle rain |
| `circuit` | v4.0 light | Engineered green on off-white with 32×32 graph-paper grid |

To switch a page's whole look: `<body data-theme="neon-terminal">`. Every component reads from the CSS variables underneath.

Tom's direction note: *"the theme going forward will be a mix of both — I love the new design, but I didn't bring as much character over as I wanted."* So treat v4.0 as the chassis, dial v3.5 motifs back in where they earn their place. The ✦ hybrid artboards in the canvas show which dials to turn.

---

## Design tokens (canonical)

### Colors

```css
/* Matrix v3.5 — pure neon on black */
--matrix-green:        #00FF00;
--matrix-green-bright: #44FF44;
--matrix-cyan:         #00FFFF;
--matrix-yellow:       #FFEA00;  /* CTAs / attention */
--matrix-red:          #FF0000;  /* danger / errors */

/* Neon Terminal v4.0 — OKLCH ShadCN-shaped */
--background:           oklch(0.08 0.01 145);   /* near-black */
--foreground:           oklch(0.95 0.005 145);  /* near-white */
--primary:              oklch(0.50 0.28 145);   /* the canonical matrix green */
--primary-foreground:   oklch(0.08 0.01 145);
--card:                 oklch(0.10 0.015 145 / 0.70);
--border:               oklch(0.22 0.04 145);
--ring:                 oklch(0.50 0.28 145);
--radius:               0.5rem;
/* + cyan: oklch(0.75 0.15 195), amber: oklch(0.80 0.15 85) for project categories */

/* Circuit Board v4.0 light — engineered green on near-white */
--background:           oklch(0.985 0.002 145);
--foreground:           oklch(0.12 0.03 145);
--primary:              oklch(0.35 0.22 145);  /* slightly darker for AA on white */
--card:                 oklch(1 0 0 / 0.92);
--border:               oklch(0.90 0.02 145);
```

### Type

| Family | Use |
|---|---|
| **Orbitron** (400/500/600/700/800/900) | Headings, hero, logo, buttons. UPPERCASE wide-spaced in v3.5; sentence case in v4.0. |
| **Exo 2** (300/400/500/600) | Body, descriptions, h4–h6. 1.65 line-height. |
| **Share Tech Mono** | Inline code, `// section_labels`, `> prompts`, `$ commands`. |
| **JetBrains Mono** | Terminal-window paths (`tom@matrix ~`), matrix-rain canvas glyphs. |

All four are Google Fonts. The CSS file `@imports` them. No `fonts/` directory needed.

```css
/* Fluid type scale (clamp-based) */
--font-size-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
--font-size-lg:   clamp(1.25rem, 1.15rem + 0.5vw,  1.5rem);
--font-size-xl:   clamp(1.5rem, 1.35rem + 0.75vw, 2rem);
--font-size-2xl:  clamp(1.875rem, 1.65rem + 1.125vw, 2.5rem);
--font-size-3xl:  clamp(2.25rem, 1.95rem + 1.5vw,  3rem);
--font-size-4xl:  clamp(3rem, 2.5rem + 2.5vw, 4rem);

/* Letter spacing — wider than usual for terminal aesthetic */
--letter-spacing-wide:   0.08em;
--letter-spacing-wider:  0.15em;
--letter-spacing-widest: 0.2em;
```

### Spacing & radii

```css
/* 4px base scale */
--space-xs: 4px;  --space-sm: 8px;  --space-md: 16px;
--space-lg: 24px; --space-xl: 32px; --space-2xl: 48px;
--space-3xl: 64px; --space-4xl: 96px;

/* Radii */
--radius-sm: 4px; --radius-base: 6px; --radius-md: 8px;
--radius-lg: 12px; --radius-xl: 16px; --radius-full: 9999px;
```

### Glow & shadow (the brand's depth language)

There's no traditional shadow ladder. Everything is **glow**, composed from intensity + theme-aware color:

```css
--glow-subtle:   0 0 5px;    --glow-standard: 0 0 10px;
--glow-medium:   0 0 15px;   --glow-intense:  0 0 20px;
--glow-extreme:  0 0 30px;

/* Composed */
--glow-box-standard:  var(--glow-standard) var(--glow-color-primary);
--glow-triple-layer:  /* used on h1/h2 in v3.5 */
    var(--glow-standard) var(--glow-color-intense),
    var(--glow-intense)  var(--glow-color-primary),
    var(--glow-extreme)  var(--glow-color-subtle);
```

Cards get a **green-tinted drop shadow + colored bottom-glow puck** for the levitating-off-page look:
```css
box-shadow:
  0 1px 0 oklch(0.60 0.22 145 / 0.18) inset,
  0 8px 20px oklch(0 0 0 / 0.5),
  0 18px 36px oklch(0 0 0 / 0.4),
  0 0 24px oklch(0.50 0.28 145 / 0.18),
  0 18px 32px oklch(0.50 0.28 145 / 0.10);
```

---

## Screens / sections to build

Each lives as an artboard in `canvas/sections/`. Open the HTML directly to inspect.

### 1. Header / Navigation

Two variants — Tom will pick one or you'll mix them.

**v3.5 (`header-v35.html`)** — Sticky 70px, UPPERCASE Orbitron nav, green border-bottom, social icons inline with logo, "DARK MODE" pill toggle on the right.

**v4.0 Mission Control (`header-v40.html`)** — Sticky 56px floating tile, animated cyan→green scanline sweep along bottom edge (4s linear loop), `> tom_butler` mono wordmark with pulsing `>`, **magnetic indicator nav** (a green tile that slides between hovered links and snaps to the current page on mouse leave), `online` status pill with pulsing dot, ⌘K search affordance, UTC clock + uptime ticker, sun/moon theme toggle.

The magnetic indicator pattern is critical to v4.0 and worth implementing properly in React with `useRef` measurements + `requestAnimationFrame`. Source in `preview/components-header.html`.

### 2. Hero / Landing

Four artboards — three concrete variants + one hybrid proposal.

| Artboard | What's distinctive |
|---|---|
| `hero-v35.html` | UPPERCASE cyan `> HEY, I'M TOM` (84px Orbitron, triple-layer glow), typewriter cycling through 4 phrases, 3 showcase tiles below |
| `hero-v40-dark.html` | macOS terminal window with traffic-light dots and `tom@matrix ~` path, sentence-case `Hey, I'm Tom`, View Projects / Get in Touch CTAs |
| `hero-v40-light.html` | Same terminal-window structure on the Circuit Board light theme |
| `hero-hybrid.html` | ✦ Terminal-window chrome + UPPERCASE cyan v3.5 hero treatment + scanline sweep at bottom + uppercase mono buttons |

**Typing animation** (`useTyping()` in `HomePage.jsx` for both kits):
- 4 phrases: `AI-powered apps · production web apps · intelligent agents · creative solutions`
- 100ms per char typing, 50ms per char deleting, 2000ms pause at full word, 500ms pause empty
- Cursor: `|` block, 0.55em × 1.05em, blink 1s steps(2), green box-shadow halo

### 3. System Status / Dashboard (v4.0 surface)

`stats-v40.html` (v4.0 version) and `stats-v35-flavor.html` (the hybrid rendering).

- **4 stat tiles** in a row: Projects 15+, AI Models 7, Deployments 20+, Uptime 99.9%
- **2 panels below**:
  - `core_skills` — labeled progress bars (React 95%, TypeScript 90%, Python 85%, Node 88%, Cloud 75%)
  - `recent_activity` — 4 entries, each: icon + text + small badge (AI cyan, Web secondary, Data cyan, Dev secondary) + 2025 timestamp
- Eyebrow above: `<svg-terminal-icon> system_status [rule] ● online`
- Animate values counting up with Framer Motion `useMotionValue`+`useTransform` on viewport entry; progress bars animate from 0 to target with staggered 100ms delay

### 4. Featured Projects

`featured-v35.html` (2-up rows) · `featured-v40.html` (3-up lifted glass cards) · `featured-hybrid.html` (matrix-styled lifted cards with scanline texture inside each card).

- Each card has: title (Orbitron), description (Exo 2 12px), tag chips, language dot + name in mono, Live / Code action buttons
- **Featured cards** get a permanent green glow ring and pulsing top-edge highlight
- **Category left-border** encodes category: cyan = AI, amber = creative, matrix-400 = web, matrix-600 = personal
- Hover: `translateY(-6px)` lift, intensified bottom glow puck, brighter border

### 5. Project Grid (filterable)

`grid-v35.html` (filter chips + neon cards) · `grid-v40.html` (tabs + glass cards).

- Filter UI: v3.5 = rectangular Orbitron chips, glow on active; v4.0 = ShadCN-style segmented tab control with `(count)` after each label
- Filter values: All / AI & ML / Web / Creative (counts populated from data)
- 9 projects total — see `Pages.jsx` in `neon-terminal-v4/` for the full data array
- Cards lazy-load with `AnimatePresence mode="popLayout"` + `layout` prop for re-flow animation when filter changes

### 6. Story / About / Now

- `hub-v35.html` — "Why I Built This Portfolio" hub with 3 paragraphs left, navigation buttons + contact icons right
- `now-v40.html` — Compact panel: `sparkles-icon now ●` eyebrow, single para current focus, 4 badges (LangChain, RAG, Agents, ShadCN)
- `about-v40.html` — Terminal window with `$ cat about.md` prompt, Matrix-origin-story paragraph, ghost-button row beneath

### 7. Footer

`footer-v35.html` (chips + `// CONNECT` icons) · `footer-v40.html` (minimal mono `> © 2026 Tom Butler █` with social icons + TimeTravel link).

---

## Interactions & motion

All animations honour `prefers-reduced-motion: reduce` — collapse durations to 0.01ms and **disable the Matrix rain canvas entirely** (return `null` from the component).

### Matrix Rain (signature backdrop)

Full-viewport `<canvas>` fixed behind everything (`z-index: -1` or `0`).

```js
// Inputs
chars     = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ01'
fontSize  = 16
columns   = Math.floor((canvas.width / fontSize) * 0.7)  // 70% density
drops[i]  = {
  isBackground: random < 0.45,  // dim background drops vs bright foreground
  speed: bg ? 0.15..0.45 : 0.4..0.9,
  brightness: bg ? 0.10..0.35 : 0.35..0.75,
  y: random initial offset,
  chars: per-row character array
}

// Per frame
ctx.fillStyle = 'rgba(0,0,0,0.05)' → ctx.fillRect(full canvas)   // trail fade
for each drop:
  drop.y += drop.speed
  if (drop.y > canvas.height && random() > 0.975) reset to -drop.length
  for each char in column:
    leadingChar  → rgba(200,255,200, fade*1.5)   // white-green tip
    tailChars    → rgba(0,200,0, fade*0.7)        // green tail
    random < 0.002 → mutate the character
```

Opacity per theme: `0.55` (v3.5 full) · `0.35` (v4.0 dark) · `0.05` (v4.0 light).
Mobile: halve those opacities.
Source: `ui_kits/matrix-v3-5/Chrome.jsx` `MatrixRain` component.

### CRT scanlines

A fixed full-viewport `<div>` with `z-index: 9999, pointer-events: none`:
```css
background: repeating-linear-gradient(
  0deg, transparent 0, transparent 2px,
  rgba(0,255,0,0.025) 2px, rgba(0,255,0,0.025) 4px
);
opacity: 0.6;   /* lighter in v4 contexts */
```

### Easings & durations

```css
--ease-in-out:  cubic-bezier(0.4, 0, 0.2, 1);
--ease-out:     cubic-bezier(0.0, 0, 0.2, 1);
--ease-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55);  /* entrance pops */
--duration-fast:   150ms;
--duration-base:   300ms;
--duration-slow:   500ms;
```

### Hover / press / focus

- **Text/link hover** → shift to `--accent-color`, `text-shadow: 0 0 8px currentColor`
- **Card hover** → border brightens to `primary @ 0.6`, triple‑stack `box-shadow` (12px green + 50px cyan), `translateY(-3px)` lift
- **Button hover** → background lightens ~15% or existing glow intensifies; no color inversion except for filled CTAs
- **Active/pressed** → `transform: scale(0.98)`, accent brightens
- **Focus‑visible** → 2px solid outline + 4px offset (v3.5 uses `--matrix-yellow`, v4.0 uses ShadCN `ring/50`)

### Specific micro-interactions to implement

| Component | Behavior |
|---|---|
| Hero name | Triple-layer phosphor glow always on; fade-up entrance (opacity 0→1, translateY 20→0, 500ms easeOut, 200ms delay) |
| Typing word | Cursor `|` blinks at 1Hz steps(2); animated via `useTyping()` hook in `HomePage.jsx` |
| Section eyebrow | `<icon> label_in_mono [gradient rule] ● online` — dot pulses 1.6s ease-in-out |
| Magnetic nav | Indicator slides on hover (left/width transitions 320ms cubic-bezier(0.65,0,0.35,1)), snaps to current on mouseleave |
| Logo mark hover | Rotate -3°, scale 1.08, glitch animation 400ms steps(2) with cyan + red chromatic shift on the `TB` glyph |
| ⌘K search | Hover sweeps a light shimmer band across (550ms), kbd chip background fades to green @0.15 |
| Icon buttons | Expanding circular halo from center 350ms; SVG rotates 180° on elastic ease |
| Stat counter | Count from 0 to target with `useMotionValue` over 1.5s, easeOut |
| Skill bar | Width animates from 0 to target over 1.2s easeOut, staggered 300ms per row |
| Card hover | translateY(-6px), bottom glow puck scaleX(1.15) and opacity→1 |
| Form input focus | 3px ring `oklch(0.50 0.28 145 / 0.18)` + 24px outer glow `oklch(... / 0.12)` |
| Theme toggle | Sun↔Moon swap. Update `<body data-theme>` and persist to `localStorage` |

---

## State management

For React: per-page local state with `useState` is enough for everything in this design. The only persistent state worth wiring is:

```ts
// Theme — write to localStorage + <html> attribute on change
const [theme, setTheme] = useState<'matrix'|'neon-terminal'|'circuit'>('neon-terminal')
useEffect(() => {
  document.documentElement.dataset.theme = theme
  localStorage.setItem('tjb:theme', theme)
}, [theme])

// Filter state (Projects page)
const [activeCategory, setActiveCategory] = useState('all')

// Typing animation (HomePage hero)
const [displayText, setDisplayText] = useState('')
const [phraseIndex, setPhraseIndex] = useState(0)
const [isDeleting, setIsDeleting] = useState(false)
```

Tom's site reads project data from a static `lib/projects.ts` array. Keep that pattern — no CMS, no API. See `ui_kits/neon-terminal-v4/Pages.jsx` `NT_PROJECTS` for the canonical shape.

For form submission (Contact page), the v4.0 branch uses a client-side stub that resolves a success state. Wire to a real service (Formspree, Resend) if needed.

---

## Iconography

| System | Where | How loaded |
|---|---|---|
| **Lucide React** | v4.0 codebase | `npm i lucide-react`. Tom's `components.json` already has `"iconLibrary": "lucide"`. |
| **Font Awesome 6** | v3.5 codebase (legacy) | CDN `<i className="fab fa-github" />` style. Don't carry forward to v4.x. |
| **Custom GitHub + LinkedIn SVGs** | Both | `src/components/icons.tsx` in the v4.0 branch — keep these custom because Lucide doesn't ship brand marks. |

For everything new, use Lucide. Icons in this handoff package use Lucide path data inlined as SVG for self-contained HTML — when porting, replace with `<Terminal size={14} />`-style component usage.

### Iconographic conventions to preserve

- **No emoji.** Ever.
- ASCII ornaments as type accents: `>` (prompt), `//` (comment), `$` (command), `|` (cursor)
- Stroke icons (Lucide default 2px) only — no mixed fill/stroke styles
- Brand icons (GitHub, LinkedIn) are `fill="currentColor"` 24×24 paths
- Inline with text → `size="14"` or `size="16"`; standalone affordances → `size="20"` or `size="24"`

---

## Voice & content fundamentals

This matters because the brand voice IS the brand. From the system's `DESIGN_SYSTEM.md`:

- **First person, casual, British English.** `Hey, I'm Tom.` `// I build...` Never corporate, never third-person.
- **Terminal prefixes are real copy**, not just decoration: `// I build`, `> section_name`, `$ cat about.md`, `$ ./compose_message`
- **Sentence rhythm:** rule of three is common — `cyberpunk aesthetics, AI experiments, pushing boundaries.`
- **Spellings:** specialise, behaviour, optimise, colour. Don't Americanise.
- **No marketing fluff.** No "synergy," "leverage," "unlock your potential."
- **Mono labels in v4.0 are lowercase snake_case:** `system_status`, `core_skills`, `recent_activity`, `now`, `all_projects`, `featured`
- **The Matrix origin story is part of the brand** — keep `"Ever since I watched The Matrix as a kid..."` verbatim

---

## Implementation order (recommended)

1. **Tokens first** — port `colors_and_type.css` into `src/app.css` (or Tailwind config). Verify dark/light theme switching works before any components.
2. **Chrome** — Header (with magnetic indicator), Footer, MatrixRain canvas component, theme toggle.
3. **Hero** — Terminal-window frame + typing animation. Pick one variant (probably hybrid) once Tom confirms.
4. **System Status dashboard** — stats grid + skill bars + recent activity panels. Framer Motion entries.
5. **Project Card primitive** — featured + standard variants with category left-borders.
6. **Projects page** — Grid + Tabs filter + AnimatePresence layout transitions.
7. **About / Now / Story** — Terminal windows and the hub.
8. **Contact** — Form inside a terminal window, validation states, status line.
9. **Polish** — `prefers-reduced-motion` audit, focus rings, Lighthouse pass, screenshot diff against `uploads/` reference images.

---

## Quirks Tom cares about

These come from the source repo's own design system doc + Tom's notes in chat:

- **Black is the point.** Don't substitute dark gray. Cards sit on absolute `#000` (v3.5) or `oklch(0.08 0.01 145)` near-black (v4.0).
- **No bluish-purple gradients.** Anywhere. They're explicitly listed as off-brand.
- **No rounded cards with a single colored left-border** _as decoration_ — but the project category left-borders ARE valid because they encode data.
- **GIF previews of real work**, not stock photography. Currently Cloudinary-hosted.
- **CRT scanlines + matrix rain are the texture.** Don't add grain, paper, or noise overlays.
- **Liverpool / Yorkshire, UK.** Tom is British. Engineer not "developer" when describing role.

---

## Where to find the canonical source

This handoff is derived from <https://github.com/ThomasJButler/thomasjbutler.github.io>. Don't guess at patterns — read the source:

- `main` branch → v3.5 (themes.css, _variables.css, matrix-effects.css, HomePage.tsx, Header.module.css)
- `v4.0-ShadCNRedesign` branch → v4.0 (`src/app.css`, `src/components/ui/*`, `src/pages/*`, `src/components/MatrixRain.tsx`)
- `version-timetravel-update.md` (in the v4.0 branch) → Tom's own changelog explaining the redesign rationale and trade-offs

When in doubt, read these files first.

---

## Open questions for Tom

Stuff that wasn't fully decided in the design system review:

1. **Hero treatment for v4.x** — keep v4.0's terminal-window sentence-case (`Hey, I'm Tom`), or graft v3.5's UPPERCASE cyan `> HEY, I'M TOM` into the terminal frame (the `hero-hybrid.html` artboard)?
2. **Matrix rain opacity in v4.x** — currently 0.35 dark / 0.05 light. Push to 0.5 / 0.10 for more presence?
3. **Add a global CRT scanline overlay to v4.x?** Currently off in v4.0; v3.5 has it always-on.
4. **Buttons** — sentence-case ShadCN style (v4.0 default) or UPPERCASE mono style (v3.5)? The hybrid favors UPPERCASE mono.
5. **Light theme** — keep it as a co-equal theme or just for accessibility/print contexts? Tom said the v4.0 light theme is a nice-to-have, not the primary direction.

If unsure, ask Tom in the PR description before merging — these are subjective and his answer dictates the whole feel.
