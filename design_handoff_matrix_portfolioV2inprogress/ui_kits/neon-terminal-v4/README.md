# Neon Terminal v4.0 — UI Kit

A high-fidelity recreation of the **v4.0 ShadCN redesign** from the `v4.0-ShadCNRedesign` branch — the direction Tom is moving the portfolio toward.

## What's here

- **`index.html`** — interactive multi-screen prototype: Home / Projects / About / Services / Contact. **Theme toggle** (sun/moon) in the header flips between the dark "Neon Terminal" and light "Circuit Board Schematic" themes. Page + theme persist via `localStorage`.
- **`neon.css`** — all styles, prefixed `nt-`. Uses native CSS variables wired up by `colors_and_type.css` — flipping `data-theme` instantly reskins everything.
- **`Chrome.jsx`** — `<NTMatrixRain>` (subtle behind content, fades in light), `<NTHeader>` (sticky, terminal logo, integrated theme toggle), `<NTFooter>`, Lucide-style `L` icons map.
- **`HomePage.jsx`** — terminal-window hero with traffic lights, typing animation, **System Status dashboard** (animated stats + skill bars + recent activity), `Now` panel, `$ cat about.md` block.
- **`Pages.jsx`** — `<NTProjectsPage>` (Featured + tabs + filtered grid with category left-borders), `<NTAboutPage>`, `<NTServicesPage>`, `<NTContactPage>` (terminal-framed form).

## Effects in play

- Subtle Matrix rain backdrop (`opacity: 0.35` dark · `0.05` light).
- Circuit-grid background in light theme (32×32px graph paper).
- Glass-morphism cards (`backdrop-filter: blur(8px) saturate(1.2)`).
- Category left-border accents on project cards (cyan = AI, amber = creative, matrix = web, personal = matrix-600).
- Phosphor `text-shadow` on hero (`0 0 10px primary / 30px primary / 60px primary`).
- macOS-style terminal title bars (`tom@matrix ~`, `$ cat about.md`).

## Mixing v3.5 character back in

Tom mentioned v4.0 lost some of v3.5's personality. Things you can dial up via tokens:

- Increase Matrix rain opacity → `[data-theme="neon-terminal"] .nt-rain { opacity: 0.5+ }`.
- Add the v3.5 CRT scanline overlay as a global `<div className="scanlines-overlay" />` (copy from `../matrix-v3-5/matrix.css`).
- Swap `<h1>` font to UPPERCASE Orbitron with `letter-spacing: 0.18em` to match v3.5 hero treatment.
- Card hovers can borrow v3.5's triple-glow `box-shadow`.

## Source of truth

Reverse-engineered from `ThomasJButler/thomasjbutler.github.io@v4.0-ShadCNRedesign`:

- `src/app.css` — OKLCH color tokens, ShadCN mappings, glass-panel utility
- `src/pages/HomePage.tsx` — terminal hero + system status dashboard
- `src/pages/ProjectsPage.tsx` — featured + tabs + grid
- `src/components/MatrixRain.tsx` — refined rain
- `src/components/ui/{button,card,badge,tabs}.tsx` — ShadCN base
- `version-timetravel-update.md` — Tom's own changelog explaining the redesign rationale
