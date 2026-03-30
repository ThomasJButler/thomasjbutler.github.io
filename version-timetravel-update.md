# Portfolio Version TimeTravel — Update Notes

## v3.5 → v4.0 Changelog

For adding to the Version TimeTravel project as new entries.

---

### v3.5 — "The Matrix Unleashed" (2025)

**Architecture:** React 19, TypeScript, Vite 7, React Router v7
**Animation Libraries:** anime.js, GSAP, ScrollMagic, AOS, Framer Motion (5 libraries)
**CSS:** 30+ custom CSS files (~38,000 lines), themes.css, matrix-effects.css
**Visual Identity:** Full Matrix cyberpunk — green digital rain, CRT scanlines, 3D flip cards

**Key Features:**
- Canvas-based Matrix rain with interactive mouse effects and layered streams
- CRT monitor effect component (scanlines, phosphor glow, flicker)
- Particle background system for dark theme
- 3D flippable project cards with front/back faces
- Orbitron + Exo 2 + Share Tech Mono font stack
- Magnetic cursor effects and particle burst animations
- Performance optimizer with Firefox-specific workarounds
- Custom keyboard navigation system
- Video banner on contact page (Cloudinary-hosted)
- Hub-style navigation on homepage with TimeTravel link
- Blog system (hidden but functional)

**Strengths:** Maximum visual impact, distinctive identity, deeply personal
**Challenges:** Complex maintenance, 5 animation libraries competing, Firefox performance issues, 38K+ lines of CSS

---

### v4.0 — "Neon Terminal" (2025)

**Architecture:** React 19, TypeScript, Vite 7, React Router v7
**Component Library:** ShadCN base-ui (Nova preset) with Tailwind CSS v4
**Animation:** Framer Motion 12 only (consolidated from 5 libraries)
**CSS:** Single app.css (~400 lines) + Tailwind utilities

**Visual Identity:** "Terminal Luxury" — Matrix cyberpunk refined through glass morphism and ShadCN polish

**Key Features:**
- Terminal window hero with macOS traffic lights and `tom@matrix ~` prompt
- System Status Dashboard — animated skill bars, stat counters, activity feed
- Glass morphism content panels with backdrop-blur over Matrix rain
- Dark ("Neon Terminal") + Light ("Circuit Board Schematic") themes with toggle
- Project detail modal with image gallery, video link, and highlights
- Category-coloured project cards (cyan for AI, amber for creative, green for web)
- Green glow card borders and hover effects
- Orbitron headings, Exo 2 body, Share Tech Mono terminal text
- CRT scanlines as pure CSS utility
- Matrix rain canvas (refined — reduced density, theme-aware opacity)
- LinkedIn video banner on contact page
- Client-side contact form with success/error states
- Vertical timeline with sticky year headers on Updates page
- prefers-reduced-motion accessibility support
- Matrix-themed 404 page ("There is no spoon")
- Full Playwright e2e test suite with dark + light theme screenshots

**Technical Decisions:**
- Consolidated 5 animation libraries → Framer Motion only
- Replaced 30+ CSS files with Tailwind v4 + single app.css
- ShadCN base-ui components provide accessible, consistent UI foundation
- Glass panels solve readability over Matrix rain without removing the effect
- Theme system uses CSS custom properties + .dark class on <html>
- 404.html SPA fallback for GitHub Pages clean-URL routing

**Strengths:** Maintainable, performant, accessible, dual-theme, ShadCN component consistency
**Evolution:** Preserved Matrix identity while making it sustainable and user-friendly

---

### Preview Deployment Notes

- **v3.5:** Deploy the v3.5 build to Netlify, use that URL in the TimeTravel preview window
- **v4.0:** Use the live GitHub Pages URL (thomasjbutler.github.io) in the preview window
- Both can be viewed inside the TimeTravel responsive preview viewer without needing framework dependencies
