# Matrix Portfolio Design System

A design system extracted from **Thomas J Butler's personal portfolio website** — a Matrix‑themed personal portfolio that fuses cyberpunk visual identity (green digital rain, CRT scanlines, phosphor glow) with the polished, accessible structure of a modern React/ShadCN application.

The system covers **two complementary visual eras** of the same site:

- **v3.5 — "The Matrix Unleashed"** (currently live at <https://thomasjbutler.github.io>): full‑intensity Matrix cyberpunk with green digital rain, CRT scanlines, 3D flip cards, neon glows, and a dual Matrix‑green / Dark‑blue theme system.
- **v4.0 — "Neon Terminal" (in‑progress on `v4.0-ShadCNRedesign` branch)**: a refined evolution built on ShadCN base‑ui + Tailwind v4. Same Matrix DNA but expressed through glass morphism, terminal‑window framing, and a new **light "Circuit Board Schematic" theme** alongside the dark "Neon Terminal" theme. v3.5's separate "dark blue" theme is retired in v4.0.

Both eras are represented here so you can design for the established product **or** the redesign direction.

---

## Sources

This system was reverse‑engineered from a single GitHub repository, two branches:

- **Repo:** <https://github.com/ThomasJButler/thomasjbutler.github.io>
- **Branches inspected:** `main` (v3.5) and `v4.0-ShadCNRedesign` (v4.0 WIP)
- **Live site:** <https://thomasjbutler.github.io/>
- **Owner's commercial portfolio:** <https://thomasjbutler.me>

Explore the repository directly for the full implementation — there are 38k+ lines of CSS in v3.5 alone, plus a curated ShadCN component set in v4.0. We've extracted the canonical tokens, components, and writing voice.

---

## Index

| File / Folder | What's in it |
|---|---|
| `README.md` | This file. Brand context + content + visual + iconography fundamentals. |
| `SKILL.md` | Agent SKILL entry — load this to get an expert designer for the brand. |
| `colors_and_type.css` | CSS custom properties for **all four themes** (Matrix v3.5, Dark Blue v3.5, Neon Terminal v4.0, Circuit Board v4.0). Switch with `data-theme=` on `<body>`. Drop into any HTML. |
| `assets/logo.svg` | The canonical brand SVG mark (210KB, neon outline illustration). |
| `preview/` | 26 atomic spec cards (tokens + components) registered for the Design System tab. |
| `ui_kits/matrix-v3-5/` | Interactive 5-screen prototype of the live v3.5 portfolio. |
| `ui_kits/neon-terminal-v4/` | Interactive 5-screen prototype of the v4.0 ShadCN redesign with light/dark toggle. |
| `uploads/v35-*.png` · `uploads/v40-*.png` | Live-site screenshots provided by Tom across Chromium/Firefox/WebKit + mobile (and light variants for v4.0). Use as visual ground-truth references. |

### v3.5 vs v4.0 at a glance

| | v3.5 — *The Matrix Unleashed* | v4.0 — *Neon Terminal* |
|---|---|---|
| Status | **Live** at thomasjbutler.github.io | In‑progress on `v4.0-ShadCNRedesign` branch |
| Themes | Matrix (green) + Dark Blue | Neon Terminal (dark) + Circuit Board (light) |
| Hero | UPPERCASE `> HEY, I'M TOM` with cyan phosphor glow + 3 showcase tiles | Terminal window with traffic lights, `Hey, I'm Tom` sentence case |
| Type case | UPPERCASE, wide letter-spacing | Title case, tighter |
| Backdrop | Full-opacity Matrix rain + CRT scanlines + vignette | Subtle rain (0.35 / 0.05 opacity), glass-morphism cards |
| Buttons | 2px green outline, glow on hover | ShadCN filled / outline, soft glow |
| Component library | Hand-rolled CSS (38k+ lines) | ShadCN base‑ui + Tailwind v4 (single ~400-line app.css) |
| Animation | 5 libs (anime + GSAP + ScrollMagic + AOS + Framer) | Framer Motion only |
| Iconography | Font Awesome 6 (`fab fa-github` etc.) | Lucide React |

Tom's note: *"the theme going forward will be a mix of both — I love the new design, but I didn't bring as much [character] over as I wanted."* So treat v4.0 as the chassis and v3.5 as the personality bank to dip into.

---

## Brand context

**Tom Butler** is a Liverpool/Yorkshire‑based **Full Stack AI Engineer** from the UK. The site is his **personal** portfolio (a separate "commercial portfolio" at `thomasjbutler.me` is the safer/recruiter‑friendly face). This site is positioned as his **playground** — the place to crash things, try animation libraries, rebuild from scratch, and obsess over a Matrix aesthetic he's loved since childhood.

**Audience:** technical peers, recruiters who appreciate creative coding, fellow Matrix/cyberpunk enthusiasts.
**Positioning:** AI engineer who builds human‑oriented apps, with deep front‑end craft and theatrical visual identity.
**Tagline pattern:** `// I build <typed phrase>` — e.g. AI‑powered apps, production web apps, intelligent agents, creative solutions.

---

## Content Fundamentals

### Voice and tone

- **First person, casual, confident.** "Hey, I'm Tom." "I build…" "I've been obsessed with…" Never corporate, never third‑person bio.
- **Honest about motivation, not performative.** "This is my space to geek out and have fun with code." "I can crash things, try that new animation library everyone's talking about."
- **Cinematic origin story is part of the brand.** The Matrix‑as‑a‑kid throughline is mentioned openly on the homepage — it's not a gimmick, it's identity.
- **No marketing fluff.** No "synergy," "leverage," "unlock your potential." Plain, slightly geeky English.

### Casing and punctuation

- **Section headings** are commonly `// section_name` or `> section_name` — terminal/comment prefixes are a recurring motif (see `_typography.css`: `.section-title::before { content: '>' }`).
- **Mono labels** in v4.0 are lowercase snake_case: `system_status`, `core_skills`, `recent_activity`, `now`, `all_projects`, `featured`.
- **Display headings** (h1/h2) are UPPERCASE with wide letter‑spacing (`letter-spacing-wider: 0.15em`) in v3.5; in v4.0 they're Title Case in Orbitron and pulled back tonally.
- **British English spelling**: "specialise", "behaviour", "optimise", "colour" appear throughout the codebase. Keep this.

### Punctuation quirks

- The em‑dash is a frequent connector: "Matrix cyberpunk refined through glass morphism and ShadCN polish."
- Lists are often three items, rhythmic: "cyberpunk aesthetics, AI experiments, pushing boundaries."
- The terminal cursor `|` (blinking) and the `>` prompt show up in copy AND UI.

### Example snippets (live copy)

> "Hey, I'm Tom"
> "// I build AI‑powered apps"
> "Full Stack AI Engineer from the UK"
> "Ever since I watched The Matrix as a kid, I've been obsessed with building things on the web."
> "It's where I separate creative freedom from client work. I can crash things, try that new animation library everyone's talking about, and rebuild from scratch just because I can."
> "Cyberpunk aesthetics, AI experiments, pushing boundaries. This is my space to geek out and have fun with code."
> "There is no spoon" (404 page)

### Emoji

**No emoji** in body copy. Iconography is done with Font Awesome (v3.5) or Lucide (v4.0) — never emoji. The closest thing is decorative ASCII (`>`, `//`, `$`, `|`).

### Section labels worth reusing

`system_status`, `core_skills`, `recent_activity`, `now`, `featured`, `all_projects`, `// Why I Built This Portfolio`, `$ cat about.md`, `tom@matrix ~`.

---

## Visual Foundations

### Two themes, three palettes

The site has lived through three palette directions, all anchored on **Matrix neon green `oklch(0.50 0.28 145)` / `#00FF00`**:

1. **Matrix (v3.5)** — pure neon green on absolute black, cyan accents, yellow/red used symbolically (CTA, danger). CRT scanlines overlay.
2. **Dark Blue (v3.5)** — same structure but green is wholesale swapped to `#4A9EFF` (a clean blue). All green tokens get `!important`‑overridden in `themes.css`. Removed in v4.0.
3. **Neon Terminal + Circuit Board (v4.0)** — green is recast in OKLCH for perceptual consistency. Dark theme keeps black + neon green; **light theme** is an off‑white `oklch(0.985 0.002 145)` with engineered green accents and a circuit‑board grid background. Cyan and amber are kept as project‑category colors.

### Typography

- **Display** — **Orbitron** (400/500/600/700/800/900). Used for h1/h2/h3, the logo wordmark, buttons, nav. Wide letter‑spacing in v3.5 (0.1–0.2em), tighter in v4.0. UPPERCASE in v3.5, Title Case in v4.0.
- **Body** — **Exo 2** (300/400/500/600). Paragraphs, descriptions, long copy. 1.65–1.8 line‑height. Optimised legibility.
- **Code / Terminal accent** — **Share Tech Mono** (used for inline code + `// section_name` labels) and **JetBrains Mono** (used for terminal contexts in v4.0).
- All four fonts are loaded from **Google Fonts** via `@import` URL — no local TTFs in the source repo. We mirror that approach here; see `colors_and_type.css`.

### Spacing

A simple 4px base scale: `--space-xs 4` → `--space-sm 8` → `--space-md 16` → `--space-lg 24` → `--space-xl 32` → `--space-2xl 48` → `--space-3xl 64` → `--space-4xl 96`. v4.0 uses Tailwind's default spacing scale natively.

### Backgrounds

- **Default canvas (Matrix dark):** pure `#000000`. Not "dark gray" — absolute black. The black is the point.
- **Section gradients:** v3.5 uses `linear-gradient(180deg, #000000 0%, #0A1F0A 100%)` for "digital world" sections, and `…0%, #0A1E3F 100%` for "real world" / transition sections.
- **Light theme (v4.0):** crisp near‑white `oklch(0.985 0.002 145)` with a **32×32px circuit‑board grid** overlaid as `linear-gradient` at 5% opacity — engineer's graph paper.
- **Matrix Rain canvas:** the signature green digital rain runs as a fixed full‑viewport `<canvas>` behind everything at `opacity: 0.35` (dark) / `0.05` (light). Uses katakana characters `ﾊﾐﾋｰｳｼﾅﾓﾆ…` plus `01`. Mobile drops to `0.20` / `0.03`.
- **CRT scanlines:** a repeating `linear-gradient` overlay at `z-index: 9999`, `opacity ~0.5` (dark) / `0.15` (light). Adds the analogue‑monitor texture without obscuring content.
- **No stock photography. No hand‑drawn illustrations.** Imagery is screenshots, GIFs of the user's own projects, and abstract Matrix code. Where the homepage shows project previews (`introduction-img`), they are Cloudinary‑hosted GIFs of the actual work.

### Animation

- **Easings:** standard cubic‑bezier set — `--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)`, `--ease-out`, `--ease-in`, plus an `--ease-elastic` (`0.68, -0.55, 0.265, 1.55`) used for entrance moments.
- **Durations:** `--duration-fast 150ms`, `--duration-base 300ms`, `--duration-slow 500ms`, `--duration-slower 1000ms`.
- **Library:** v3.5 uses **anime.js + GSAP + ScrollMagic + AOS + Framer Motion** (5 libs — known maintenance pain). v4.0 consolidates to **Framer Motion only**.
- **Motion vocabulary:** fades + small translateY (10–30px), scale entries (0.9 → 1), staggered children (80–150ms apart), elastic CTA pops on click, typewriter on the hero phrase, blinking cursor `|`. Hover lifts (`translateY: -3px`), no bouncy hover.
- **Always respects `prefers-reduced-motion`** — animations collapse to 0.01ms duration; Matrix rain hides entirely.

### Hover, press, focus

- **Hover (text/links):** color shift toward `--accent-color` + `text-shadow: 0 0 8px currentColor` (subtle phosphor glow).
- **Hover (cards):** border lights up to `--primary` color, `box-shadow` triple‑stack (12–60px glow), `transform: translateY(-3px)` lift.
- **Hover (buttons):** lighten background by ~15% OR slightly enhance the existing glow. No color inversion except for filled CTAs.
- **Press (mobile/active):** `transform: scale(0.98)` and brighter accent color.
- **Focus‑visible:** `outline: 2px solid var(--matrix-yellow)` in v3.5 (yellow is symbolic of "machines / Neo's enlightenment" in the brand's own film‑theory rationale). In v4.0: `outline-ring/50` ring (Tailwind/ShadCN convention).

### Shadows and glow

There is no traditional shadow system. Everything is **glow**:

```
--glow-subtle:   0 0 5px
--glow-standard: 0 0 10px
--glow-medium:   0 0 15px
--glow-intense:  0 0 20px
--glow-extreme:  0 0 30px
```

Composed with theme‑aware colors (`--glow-color-primary`, `--glow-color-accent`, `--glow-color-intense`) into reusable `--glow-box-*` and `--glow-text-*` tokens. Multi‑layer "triple layer" glows are used on h1/h2 for the phosphor effect.

There IS a tinted drop‑shadow set for cards (`--shadow-sm/md/lg/xl`) but it's always green‑tinted (`rgba(0,255,0,0.1–0.25)`) so it reads as "glow" rather than as a Material elevation.

### Borders, radii, transparency

- **Default border:** `1px solid rgba(0, 255, 0, 0.3)` (`--border-primary`). Hover lifts to `0.5`.
- **Radii:** `--radius-sm 4px`, `--radius-base 6px`, `--radius-md 8px`, `--radius-lg 12px`, `--radius-xl 16px`, `--radius-full 9999px`. v4.0 derives all radii from a single `--radius: 0.5rem` token (8px) via `calc()`.
- **Transparency is everywhere.** Cards: `rgba(0, 0, 0, 0.9)` with `--glass-bg: rgba(0, 20, 0, 0.6)` and `backdrop-filter: blur(12px) saturate(180%)`. The glass panels in v4.0 use 32px blur + 1.5 saturation over the matrix rain.
- **Use blur to gate readability over the Matrix rain.** Whenever real content sits over rain, it MUST be on a glass panel.

### Cards (canonical anatomy)

```
border: 1px solid rgba(0, 255, 0, 0.3)
background: linear-gradient(180deg, rgba(0,0,0,0.9), rgba(0,0,0,0.95))
backdrop-filter: blur(12px) saturate(180%)
border-radius: 12px (--radius-lg) / 16px (--radius-xl)
hover: border → matrix-green @0.6, triple-glow box-shadow, translateY(-3px)
featured: extra ring-2 ring-primary/30 + permanent glow-border
```

Project cards in v4.0 add a **3px colored left‑border** keyed to category (cyan = AI, amber = creative/games, matrix‑400 = web, matrix‑600 = personal). This is the **one place** the "rounded corners with a colored left‑border accent" pattern shows up legitimately — it's used to encode category, not as a generic decoration.

### Layout rules

- **Fixed elements:** sticky header at `top: 0, z-index: 50–1000`, background `rgba(0,0,0,0.8)` + `backdrop-filter: blur(md)`. Logo + nav + theme toggle. Footer is non‑sticky.
- **Container widths:** v3.5 `min(90%, 1200px)`. v4.0 `max-w-5xl` (1024px) inside a centred wrapper. Both are comfortable reading widths.
- **Grid:** v3.5 uses `clamp(280px, 50vw, 350px)` auto‑fit grids for project cards. v4.0 uses Tailwind `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` with `gap-5`.

### Imagery treatment

- **Cool palette by default** — everything skews green or blue. No warm imagery.
- **No grain/film texture** on photos (the CRT scanlines provide all the texture the eye needs).
- **GIFs > stills.** Most project previews are looping GIFs of the actual product.
- **Logo treatment:** the SVG logo wears a `filter: drop-shadow(0 0 5px rgba(0, 255, 0, 0.5))` by default; hover deepens it to `0 0 12px / 0.8`. In light/blue contexts the glow swaps to blue.

---

## Iconography

Two stacks, one per era. Both are flat, monoline, no fills, no emoji.

### v3.5 — Font Awesome (CDN)

The v3.5 site uses **Font Awesome Free 6** classnames (`fas`, `fab`) directly in JSX — `<i className="fab fa-github" />`, `<i className="fas fa-star" />`, `<i className="fas fa-envelope" />`, etc.

It's loaded from CDN (`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.x.x/`). Stroke style: Font Awesome's standard "solid" + "brand" variants.

**For our UI kit recreations** we load Font Awesome via CDN to match exactly.

Used liberally in v3.5: `fa-github`, `fa-linkedin`, `fa-codepen`, `fa-envelope`, `fa-at`, `fa-globe`, `fa-history`, `fa-external-link-alt`, `fa-star`, `fa-user`, `fa-cogs`, `fa-images`, `fa-robot`, `fa-briefcase`.

### v4.0 — Lucide React + custom GitHub/LinkedIn SVGs

v4.0 moves to **Lucide React** (per `components.json: "iconLibrary": "lucide"`). Lucide is stroke‑based, 24×24, 2px stroke‑width by default. GitHub and LinkedIn are kept as **custom SVGs** because Lucide's brand‑mark policy doesn't ship them — see `src/components/icons.tsx` (a `GithubIcon` and `LinkedinIcon` defined inline with `viewBox="0 0 24 24"` and `fill="currentColor"`). We've ported both verbatim.

Used in v4.0: `Terminal`, `Cpu`, `GitBranch`, `Zap`, `Globe`, `Code`, `Bot`, `Database`, `Sparkles`, `ArrowRight`, `ExternalLink`, `Star`, `Sun`, `Moon`, `Menu`, `X`, `Mail`. **For our v4.0 UI kit** we load Lucide via CDN (`https://unpkg.com/lucide-static/`) and render names as `<i data-lucide="terminal">`, plus our own GitHub/LinkedIn paths.

### Unicode / ASCII

Used as **type ornaments**, not icons:

- `>` — terminal prompt (`> tom_butler`, `> © 2025 Tom Butler`).
- `//` — comment prefix (`// I build`, `// section_name`).
- `$` — command prompt (`$ cat about.md`).
- `|` — blinking cursor (animated via CSS opacity pulse).

### Brand mark / logo

The site's logo is a complex SVG (`logo.svg`, ~210KB) — a stylised neon line illustration. We have it in `assets/logo.svg`. Use it at 24–48px in headers with the `drop-shadow` green glow described above. Because the source SVG is dense, prefer the simpler **`> tom_butler`** wordmark used in v4.0 for inline contexts.

---

## Substitutions and flags

- **Fonts:** all four (Orbitron, Exo 2, Share Tech Mono, JetBrains Mono) are Google Fonts and load from the official CDN. No font files needed in `fonts/`. If you want offline copies, fetch from <https://fonts.google.com> and drop the TTFs in.
- **Font Awesome icons** load from CDN at runtime — no local copies, no licensing concerns (Free tier).
- **Lucide icons** load from `unpkg.com/lucide-static` at runtime for the v4.0 kit.
- **Logo SVG** is ported verbatim from the source repo.
- **No Figma access provided** — everything in this system is derived from the codebase, which is the canonical source.

---

## Direction note (from owner, 2026‑05)

> "The theme going forward will be a **mix of both**. v4.0 is more polished but I feel I didn't bring as much over as I wanted."

When designing new work for Tom, treat the v4.0 ShadCN/Tailwind framework as the **structural** baseline (terminal hero, glass panels, ShadCN components, Lucide icons, light "Circuit Board" theme) and bring back **more v3.5 character** within it:

- **Wider, louder scanline-rain dividers** between sections (the green code-rain strip is a v3.5 signature)
- **Bold UPPERCASE Orbitron** for section titles (the `> SECTION TITLE` underlined treatment from v3.5)
- **Tech-stack as icon tiles** in a grid (v3.5 used colored icon-per-card), not just text badges
- **Stronger neon glows** on featured CTAs and hero
- Hero **project artwork cards** (Matrix Arcade GIF style) when projects are featured — v4.0 dropped these in favour of plain title cards
- Keep v4.0's terminal-window framing, glass panels, accordion credentials, and the contact illustration banner

The Matrix-rain canvas should stay at v4.0's tuned opacity in dark, plus a much subtler version in light.
