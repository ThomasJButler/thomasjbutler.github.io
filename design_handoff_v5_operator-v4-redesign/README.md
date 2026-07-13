# Handoff: Portfolio v5 — "The Operator"

**Target:** `thomasjbutler.github.io`, branch `v4.0-ShadCNRedesign` (React 18 + TypeScript + Vite, Tailwind v4 + ShadCN base-ui, Framer Motion, Lucide).
**Goal:** upgrade the existing v4 "Neon Terminal" site into v5 — same chassis, plus a cinematic Operator hero, a global FX engine, a ⌘K palette, page transitions, easter eggs, and the Local & Private AI positioning throughout.

---

## About the Design Files

Everything in this bundle is a **design reference built in HTML** (React via Babel-standalone, no build step). It is a working prototype of intended look and behaviour — **not production code to copy in**. The task is to **recreate these designs inside the existing v4 codebase** using its established patterns: `src/pages/*.tsx`, `src/components/*`, the existing `ThemeContext`, Framer Motion for animation, Lucide for icons, Tailwind v4 + `src/app.css` for styling.

Open `Tom Butler v5 — The Operator.html` in a browser — it runs standalone from this folder. `V5 Hero Variations.html` shows the two rejected hero directions (Construct, Wake Up) for context; **Operator won**.

Design tokens come from the Matrix Portfolio Design System already in the repo at `design_handoff_matrix_portfolioV2inprogress/` (`colors_and_type.css` = `site/tokens.css` here). Nothing new is invented; v5 uses the `neon-terminal` / `circuit` themes as-is.

## Fidelity

**High-fidelity.** Colors, type, spacing, copy, and interaction timings are final. Recreate pixel-perfectly; where the prototype hand-rolls something the codebase already solves (routing, theme context, motion), use the codebase's solution and match the visible result.

## Prototype file map

| File | Contains |
|---|---|
| `Tom Butler v5 — The Operator.html` | Entry; load order and page shell |
| `v5/rain.jsx` | **Reactive Matrix rain engine** (upgrade for `src/components/MatrixRain.tsx`) |
| `v5/fx.jsx` | DecodeChars, typed-phrase hook, scroll Reveal, custom terminal cursor, icons |
| `v5/heroes.jsx` | Operator hero, live console script, boot-line typer (`BootLines`) |
| `v5/v5.css` | Hero/atmosphere/cursor/decode styles |
| `v5site/data.jsx` | **All new content** (services, activity, NOW, WHY, about para, timeline, covers) |
| `v5site/chrome.jsx` | Header (⌘K chip), footer, drawer, toast, newsletter strip |
| `v5site/palette.jsx` | Command palette, konami hook, spoon overlay, white rabbit |
| `v5site/home.jsx`, `v5site/pages-a.jsx`, `v5site/pages-b.jsx` | The six pages |
| `v5site/app.jsx` | Router, boot intro, page transitions, eggs wiring, red/blue pill |
| `v5site/v5site.css` | Palette/toast/eggs/covers/lead-card/light-theme styles |
| `v4/*`, `site/tokens.css` | The v4 base kit + tokens the prototype layers on (already ≈ your branch) |

Note: `site/tweaks-panel.jsx` is a design-tool control panel — **do not implement it**; the accent override it drives becomes the red/blue-pill mechanic only.

---

## Global systems (implement once, use everywhere)

### 1. Reactive Matrix rain — upgrade `MatrixRain.tsx`
Port `v5/rain.jsx` logic into the existing canvas component:
- **Parting:** glyphs within `R = 120px` of the pointer draw with a horizontal offset `sign(dx) · (1−d/R)² · 26px` and a brightness boost; columns near the pointer fall 1.6× faster.
- **Click ripples:** on pointerdown push `{x, y, t}` (max 3). A ring expands at **540 px/s**, band width **50px**, life **1.15s**; glyphs in the band get boost `(1−band/50)·(1−age/1.15)` and the spark colour.
- **Burst API:** expose `burst()` (module event or context) — for 800ms all columns speed up `+2.2×` decaying linearly. Fired on: boot-intro completion, rabbit catch, spoon overlay.
- **Palettes:** dark = fade `rgba(4,8,5,0.075)`, trail `0,210,90`, head `200,255,205`, spark `90,255,170`. Light (`circuit`) = fade `rgba(252,253,250,0.09)`, trail `22,120,60`, head `40,150,80`, spark `0,170,90`. Accent override (blue pill etc.) tints trail = accent rgb, head = mix(accent, white, 0.78), spark = mix(accent, white, 0.35).
- Glyphs `ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789Z:."=*+-<>¦｜╌`, 16px JetBrains Mono, dpr-capped at 2, paused on `visibilitychange`.
- **Reduced motion:** draw ONE static frame at 50% alpha, no loop (presence, not motion).
- Canvas opacity: dark **0.55**, light **0.066** (0.55 × 0.12), CSS-transitioned.

### 2. Decode text (`DecodeChars`)
Per-character resolve sweeping L→R: char `i` is invisible until `delay + i·step`, scrambles from `ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱ01<>*+=:` for a `window` (default 320ms), then locks with a 0.45s glow flash (`color: primary → inherit`, text-shadow `0 0 26px primary` decaying). **Wrap each word in `display:inline-block; white-space:nowrap`** so lines never break mid-word. Reduced motion: render final text instantly. Used on: hero name/eyebrow, every `// section` label, palette-triggered overlays.

### 3. Scroll reveal
IntersectionObserver (`threshold 0.15`, `rootMargin 0 0 −40px`), once per mount: from `opacity 0; translateY(16px)` to rest over **0.65s `cubic-bezier(0.16,1,0.3,1)`**, staggered by index (70–140ms). Framer Motion `whileInView` is the natural port.

### 4. Custom terminal cursor
Only when `(hover: hover) and (pointer: fine)` and not reduced-motion. Two fixed elements: **caret block** 9×15px `--primary` (instant, `translate(-50%,-50%)`, glow `0 0 12px`) + **square ring** 34×34px 1px border primary/45 that lerps at **0.16/frame**. Over `a, button, input, [role=button]`: ring grows to 46×46, radius 9px, border → full primary + glow. Mousedown: ring 24×24. `body * { cursor: none }` while active.

### 5. Atmosphere layers
Fixed, pointer-events none: **scanlines** `repeating-linear-gradient(0deg, rgba(0,0,0,.28) 0 1px, transparent 1px 3px)` at opacity 0.275 (dark) / 0.033 (light), plus a 140px refresh band drifting down every 9s (dark only); **vignette** `radial-gradient(ellipse at 50% 38%, transparent 52%, rgba(0,0,0,.55))` (dark only).

### 6. Boot intro (once per session)
Black full-screen overlay (z above header). Types `Wake up, Tom...` in Share Tech Mono, clamp(19px, 2.8vw, 28px), letter-spacing 0.1em, primary green with `0 0 14px` glow, blinking block caret. Per-char delay `34 + rand·48`ms (+200ms after `,` or `.`); hold 700ms; fade 380ms; fire rain `burst()`. **Skip:** click, Esc, wheel, or touchmove — chip `[ skip · esc ]` bottom-right. Gate with `sessionStorage['v5s:booted']`; body scroll locked during. Reduced motion: never show. Total ≈ 2.5s.

### 7. Page transitions
On nav: current page plays glitch-out **200ms** (`steps(2)`: translateX −5→+4px, skew 0.4deg, brightness 1.5, fade to 0), then swap + instant scroll-to-top, new page enters **420ms** (`opacity 0, translateY 14px` → rest, `cubic-bezier(0.16,1,0.3,1)`). AnimatePresence `mode="wait"` maps cleanly. Reduced motion: instant swap.

### 8. ⌘K command palette
Open: `⌘K` / `Ctrl+K` (toggle), header chip, or drawer item. Terminal-styled dialog: 580px max, top offset 16vh, traffic dots + `tom@matrix: palette` bar, input row `> type a command...`, list max-height 320, hint row `↑↓ navigate · ↵ run · esc close`. Substring filter over label+keywords; ↑↓ wrap; Enter runs; backdrop click / Esc closes. Item anatomy: `▸` caret (selected), label, right-aligned type chip (`goto/sys/link/pill/egg`). Selected: bg primary/12.
**Commands:** go: home/projects/services/about/contact/dev journey · toggle light/dark · copy email (`dev@thomasjbutler.me` → toast) · open github/linkedin · replay intro · **take the red pill** / **take the blue pill** · hidden (only when query length > 2 matches): `there is no spoon`, `follow the white rabbit`. Empty state: `no match. there is no spoon.` Consider `cmdk` if already using Radix; hand-rolled per prototype is ~120 lines.

### 9. Easter eggs
- **Console:** on load — `%cWake up, Neo...` (mono 18px, #00ff41, glow) + `> follow the white rabbit. (try the konami code, or press ⌘K and take a pill)`.
- **Konami** (`↑↑↓↓←→←→ b a`): full-screen 92%-black overlay, Orbitron `THERE IS NO SPOON` clamp(26px, 6vw, 62px) decoding in, sub-line `do not try and bend the spoon. that's impossible.`; rain burst; auto-dismiss 3s or click.
- **White rabbit:** once per session (`v5s:rabbit`), 22s after load a 52×44px white rabbit SVG (in `v5site/palette.jsx`) hops into bottom-right (0.9s spring + occasional twitch), white `drop-shadow(0 0 8px rgba(255,255,255,.7))`. Click → burst + navigate to Dev Journey + toast `> the rabbit hole goes deeper...`. Auto-leaves after 15s.
- **Red / blue pill:** sets the accent (`--primary`/`--ring` + rain tint) to green `#16a34a` (default) / blue `#2563eb`, with toasts *"You stay in Wonderland, and I show you how deep the rabbit hole goes."* / *"The story ends. You wake up and believe whatever you want to believe."* Persist in localStorage.

### 10. Toast
Single toast, bottom-center, mono 12.5px, black/88 + primary/40 border + glow, slide-up 0.3s, auto-dismiss 3.8s.

---

## Screens

### Home (`src/pages/HomePage.tsx`)
1. **Operator hero** — full viewport minus header, grid `1.05fr 0.95fr`, gap 56, max-width 1240, padding `90px 48px 110px`, vertically centred; stacks < 860px.
   - Left: mono eyebrow `// tom_butler · liverpool, uk` (decodes, 12px, ls 0.18em, primary/65) → **`Hey, I'm Tom`** Orbitron 700 `clamp(44px, 5.4vw, 76px)` decode-in, phosphor shadow `0 0 10px primary/30 + 0 0 34px primary/14` → typed line `// I build ` + rotating **`AI you can own` → `private, local AI systems` → `production web apps` → `intelligent agents`** (Share Tech Mono ~21px, prefix primary/60, word full primary + glow, block caret blinking 1s; type 70ms+jitter, hold 2.2s, delete 40ms) → subtitle (Exo 2 15.5px/1.7, muted, max 600px): *"Full Stack AI Engineer from the UK. I set up private, local AI systems for businesses. Same results, no per-token bills, your data stays yours."* → CTAs `View Projects →` (filled) / `Get in Touch` (outline).
   - Right: **live console** — terminal window (border primary/32, radius 12, dark glass gradient, glow + 24px drop shadow; light theme: white/94). Bar: traffic dots + `tom@local: ~` + `↻ rerun`. Body: JetBrains Mono 12.5px/1.8, height 320. Types this script once (cmd chars ~24–50ms, outputs +300ms/line, +560ms between steps, start 500ms), ends holding a blinking `$ ▮`:
     ```
     $ whoami
     tom butler · full stack AI engineer · liverpool, uk
     $ ollama run qwen3 "summarise ./client-docs"
     ▸ 42 tok/s · running on local hardware
     ▸ done · nothing left the machine
     $ netstat --external
     0 bytes sent to third parties        ← primary green + glow
     $ ls ~/services
     local-llm-setups/   private-rag/   ai-cost-audits/
     ```
   - Bottom-center: `▼ SCROLL` cue (mono 10px, ls 0.28em, bobbing) → scrolls to dashboard.
2. **system_status** — unchanged 4 stat tiles (15+ / 7 / 20+ / 99.9%), revealed with 90ms stagger.
3. **core_skills** (bars fill 0→pct over 1.1s when scrolled into view) + **recent_activity** — NEW entries:
   - Contributing to Odysseus: open source local AI — `AI` 2026
   - Sanctuary: fully offline on-device AI app (prototype) — `iOS` 2026
   - Launched Run It Local: weekly plain-English AI newsletter — `Writing` 2026
   - Built RAG pipeline with LangChain + Pinecone — `AI` 2025
4. **NOW** (replace copy): *"Setting up private, local AI systems for businesses, and building Sanctuary, an on-device AI app for neurodiverse users heading to the App Store. Currently deep in Ollama, RAG pipelines, and open source local AI (I contribute to Odysseus). The theme of everything right now: AI you own, not AI you rent."* Chips: `Ollama` `RAG` `Local AI` `On-Device`.
5. `$ cat about.md` terminal + links row (About / Commercial portfolio ↗ / GitHub / TimeTravel) — unchanged.
6. **Run It Local strip** (see Newsletter below).

### Projects (`src/pages/ProjectsPage.tsx`)
- Featured grid: cards gain a **full-bleed cover** (height 150, object-fit cover top, `saturate(1.05) brightness(0.9)` → `brightness(1) scale(1.025)` on hover, bottom border primary/18). Cover URLs below. Projects without covers (The Kicker, ISQ Agent, Sanctuary) get the **generated fallback**: scanline gradient panel, giant Orbitron initial (primary/55 + glow), mono `> {id} — cover incoming`.
- All-projects grid/tabs unchanged, cards reveal with `(i % 3) · 70ms` stagger; re-run reveal when filter changes.
- Page label `// projects` decodes in.

### Services (`src/pages/ServicesPage.tsx`)
- Intro (replace): *"Fast, resilient digital products, and AI systems you actually own. From private local AI setups to performance-first websites and mobile apps. I handle the architecture, delivery, and support so you can focus on outcomes."*
- **NEW lead card — Local & Private AI** — spans both grid columns, border primary/45, top-glow gradient wash, `local_first` flag chip top-right (mono 9.5px pill). Icon `Cpu`. Blurb: *"Private AI systems that run on your own hardware. Same results as the APIs for everyday work, no per-token costs, and your data never leaves your building."* Bullets: Local LLM Setups (Ollama + open models) · Private Knowledge Systems (RAG) · AI Cost & Privacy Audits. Tags: `Ollama` `Qwen` `RAG` `Pinecone` `Python`.
- **AI & Automation** (revise): blurb *"Practical AI features and automation to save time and make data useful. Cloud, local, or hybrid, whatever fits the job."* Bullets: Custom AI Agents · n8n Workflows · Custom ML Models. Tags: `Claude` `ChatGPT` `PyTorch` `TensorFlow` `n8n`.
- **Mobile Applications** (revise): bullet 3 → `On-Device AI`; tags + `Apple Intelligence`.
- Other four cards unchanged.
- **NEW section `// WHY_LOCAL_AI`** ("Why Local AI") between grid and credentials — three prose paragraphs (exact copy in `v5site/data.jsx → V5S_WHY`) + three stat tiles: **60-80%** token cost savings at scale · **0** data sent to third parties · **£0** per-token costs.
- Credentials accordion + CTA **"Let's Build Something Great"** unchanged (portfolio keeps this CTA; "Own Your AI" is for thomasjbutler.me only). Newsletter strip after CTA.

### About (`src/pages/AboutPage.tsx`)
- After the passion prose, **NEW highlighted panel `// current_focus`** (NOW-panel styling: primary/20 border, primary/3 bg) with the paragraph in `V5S_ABOUT_LOCAL` (Odysseus/PewdiePie line included, per Tom). Chips: `Ollama` `Private RAG` `Odysseus` `Sanctuary`.
- Tech stack tabs + journey timeline unchanged, with reveals.

### Contact (`src/pages/ContactPage.tsx`)
Unchanged structurally (video banner, info column, form, 4 steps) + reveals. ⚠️ Location reads **York, UK** (from branch data) — confirm vs Liverpool before shipping.

### Dev Journey / Updates (`src/pages/UpdatesPage.tsx`)
Timeline unchanged + reveals + **NEW final entry**: `2026 — AI you can own` — *"Local and private AI becomes the focus. Ollama setups and private RAG for businesses, contributing to Odysseus, building Sanctuary on-device, and writing Run It Local every week."*

### Newsletter strip (Home + Services, above footer)
Panel: primary/24 border, primary/4 bg, radius 12, blur. Left: mono label `run_it_local`, Orbitron h3 **Run It Local**, copy *"Keeping up with AI, and how to make it your own. One email a week, plain English, no hype. Written from the workshop floor, not the commentary box."* Right: `Subscribe →` (filled) + mono note `one email a week · no hype`. **Substack URL is a placeholder** — prototype toasts "coming soon"; wire the real link when it exists.

---

## State & storage

| Key | Type | Purpose |
|---|---|---|
| route | react-router (existing) | pages; scroll-to-top on change |
| theme | existing `ThemeContext` (`neon-terminal` / `circuit`) | persisted |
| accent | localStorage | pill override → sets `--primary`, `--ring`, rain tint |
| `v5s:booted` | sessionStorage | boot intro shown this session |
| `v5s:rabbit` | sessionStorage | rabbit shown/caught this session |
| palette open, spoon, rabbit, leaving | component state | UI |

## Design tokens
All from the design system already in-repo (`design_handoff_matrix_portfolioV2inprogress/colors_and_type.css`): `neon-terminal` + `circuit` themes, Orbitron / Exo 2 / Share Tech Mono / JetBrains Mono (Google Fonts), 4px spacing scale, radius 4–16, glow stack `0 0 5|10|15|20|30px`. Key recurring values: primary green `#16a34a` ≈ `oklch(0.55 0.25 145)`; blue pill `#2563eb`; focus outline `2px solid var(--matrix-yellow)`; ease `cubic-bezier(0.16, 1, 0.3, 1)`.

## Assets
- **Covers (Cloudinary, live):** base `https://res.cloudinary.com/depqttzlt/image/upload/w_640,q_auto,f_auto/` + path per project — full map in `v5site/data.jsx → V5S_COVERS` (ModelViz, LangChain, SQL Ball, Morpheus, ReviewBot, AI Portfolio, News Perspective, LFC, .NET Calendar, CSS Showcase, Matrix Arcade, Big Bang, Python, TimeTravel). **Needed:** covers for The Kicker, ISQ Agent, Sanctuary (fallback treatment specified above).
- Contact banner video: `https://res.cloudinary.com/depqttzlt/video/upload/v1752558251/large_green_banner_dv0bkk.mp4`.
- Tech-chip logos: devicon CDN (as current). Icons: Lucide (+ existing custom GitHub/LinkedIn SVGs in `src/components/icons.tsx`). White rabbit SVG: in `v5site/palette.jsx`.

## Accessibility (you have tests — keep them green)
`prefers-reduced-motion`: no boot intro, static single-frame rain, decode renders final text, reveals/transitions instant, native cursor, no drifting scanline band. Palette is a dialog (focus input on open, Esc closes, listbox semantics). Rabbit/skip are real buttons with labels ≥ 44px hit. Focus-visible yellow outline everywhere. All eggs are additive — nothing required is gated behind them.

## SEO
Title: `Tom Butler | Full Stack AI Engineer, Local AI & On-Device Systems`. Meta description in the HTML head of the prototype. Work in naturally: local AI consultant UK, private LLM setup, Ollama consultant, self-hosted AI for business, RAG system developer, GDPR-compliant AI, on-device AI.

## Suggested implementation order
1. Rain upgrade + atmosphere layers + decode/reveal utilities
2. Operator hero + console (Home)
3. Services lead card + WHY_LOCAL_AI + content updates (About, NOW, activity, timeline)
4. Page transitions + boot intro
5. ⌘K palette + toasts + pills
6. Featured covers + newsletter strip
7. Easter eggs (konami, rabbit, console)

## Open items
- Substack link (placeholder)
- Contact location: York vs Liverpool
- Covers for Kicker / ISQ / Sanctuary
- Contact form has no backend in the prototype (simulated success)
