---
name: matrix-portfolio-design
description: Use this skill to generate well-branded interfaces and assets for Thomas J Butler's Matrix-themed personal portfolio, either for production or throwaway prototypes/mocks. Contains brand guidelines for two visual eras (v3.5 "Matrix Unleashed" cyberpunk theatre and v4.0 "Neon Terminal" ShadCN refinement plus its "Circuit Board" light theme), colour and type tokens, fonts, the brand logo, and React UI-kit components for prototyping. Tom is iterating toward a v4.x that re-injects more v3.5 personality back into v4.0 — designs may freely mix motifs from both eras.
user-invocable: true
---

Read the `README.md` file within this skill, then explore the other files. They are the canonical reference for everything below.

## What's in this skill

- `README.md` — full brand context, content fundamentals, visual foundations, iconography. Read this first.
- `colors_and_type.css` — one stylesheet, four themes (`matrix`, `dark`, `neon-terminal`, `circuit`). Drop into any HTML page, set `data-theme=` on `<body>`, and all tokens flow.
- `assets/logo.svg` — the canonical brand SVG mark.
- `ui_kits/matrix-v3-5/` — interactive React prototype of the live v3.5 site (full Matrix theatre).
- `ui_kits/neon-terminal-v4/` — interactive React prototype of the v4.0 redesign (light + dark).
- `preview/` — atomic spec cards for every token (colors, type scale, glow, spacing, components).

## When the user asks you to design something

1. **Ask which era** if it's not obvious. v3.5 is full‑theatre (rain + scanlines + neon, UPPERCASE Orbitron everywhere). v4.0 is polished (terminal windows, glass cards, sentence case, light + dark). Tom's stated preference: mix — the v4.0 chassis with more v3.5 personality dialled in.
2. **Copy assets out** of this skill into your working folder. Don't reference paths inside the skill from the artifact.
3. **Use `colors_and_type.css` as the foundation.** Set `data-theme="neon-terminal"` (default) or `"matrix"` or `"circuit"` on `<body>`. Every token in the design system pivots automatically.
4. **For production code** — copy `colors_and_type.css` and either UI kit's components as a starting point, then adapt to the user's framework. The ShadCN-compatible token names in the v4 theme (`--primary`, `--card`, `--ring`, `--radius`) drop straight into a ShadCN project.

## House style at a glance

- **Display font:** Orbitron (h1/h2/buttons in v3.5; h1/h2 in v4.0 sentence case).
- **Body:** Exo 2 · **Mono:** Share Tech Mono (`// labels`, `> prompts`, `$ commands`).
- **Primary green:** `oklch(0.50 0.28 145)` ≈ `#00FF00`. Tinted glow on EVERYTHING in dark themes.
- **Voice:** first person, casual, British English. "Hey, I'm Tom." Terminal prefixes (`>`, `//`, `$`). No emoji.
- **Icons:** Font Awesome 6 (v3.5) or Lucide (v4.0). Inline SVG when offline. Never emoji.
- **Tom-specific motifs:** Matrix rain canvas backdrop, CRT scanlines overlay, blinking cursor `|`, `tom@matrix ~` terminal prompts, `$ cat about.md` for prose blocks, triple-layer phosphor text shadows on headings.

## Output format

If creating visual artifacts (slides, mocks, throwaway prototypes), build static HTML files for the user to view, link `colors_and_type.css`, set `data-theme`, copy the SVG logo across. Borrow the matrix-rain canvas snippet from either UI kit when you want full theatre.

If working on production code (the user is in their actual repo), copy the relevant tokens / components from the kits and adapt to their framework. Read the source repo branches directly for canonical patterns: `ThomasJButler/thomasjbutler.github.io@main` (v3.5) and `@v4.0-ShadCNRedesign` (v4.0).

If the user invokes this skill without specific guidance, ask what they want to build, which era/mix, and roughly what surfaces are in scope, then act as an expert designer for Tom's brand.
