# Matrix v3.5 — UI Kit

A high-fidelity recreation of the **live v3.5 portfolio** at <https://thomasjbutler.github.io/>.

## What's here

- **`index.html`** — interactive multi-screen prototype: Home / About / Projects / Services / Contact. Page state persists in `localStorage`.
- **`matrix.css`** — all styles, scoped with a `m-` prefix (component‑namespace, not theme‑namespace).
- **`Chrome.jsx`** — `<MatrixRain>` canvas, sticky `<Header>`, `<Footer>`, shared `Icons` map.
- **`HomePage.jsx`** — hero (`HEY, I'M TOM` + typing animation), Featured Projects, hub layout, TimeTravel CTA.
- **`Pages.jsx`** — `<MatrixProjectsPage>` (filtered grid), `<MatrixAboutPage>`, `<MatrixServicesPage>`, `<MatrixContactPage>` (form with terminal status line).

## Effects in play

- Full-viewport `<canvas>` Matrix rain (katakana glyphs, 70% column density, fades, occasional char mutation).
- Fixed CRT scanline overlay (`z-index: 9999`).
- Cinematic vignette darkening at the edges.
- `phosphor-glow` text shadows on hero / section headings.
- Triple-stack box shadows on card hover (`0 0 22px green + 0 0 50px cyan`).

## Source of truth

Reverse-engineered from `ThomasJButler/thomasjbutler.github.io@main`:

- `src/components/MatrixRain.tsx` — canvas implementation
- `src/components/Header.module.css` — header styles
- `src/pages/HomePage.tsx` — hero + featured + hub
- `src/css/themes.css` + `_variables.css` — color tokens
- `src/css/matrix-effects.css` — scanlines, glitch, phosphor

## What this kit is NOT

- A production drop-in. Component impl is **cosmetic only** — no real routing, no real form submission, no real GIF previews.
- Comprehensive. v3.5 has 38k+ lines of CSS; we ship the canonical ~700 lines that matter for design work.

To use in a design: copy the JSX you want, replace `Icons` lookups with real Font Awesome (`<i className="fab fa-github" />`) if the design system is hooked up.
