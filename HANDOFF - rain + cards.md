# Cherry-pick handoff — Matrix rain + 3D flip cards

> From the **Ultimate** build (`Thomas J Butler Ultimate.html`). These are the two
> pieces you said you want to lift into your real React + Tailwind v4 codebase.
> Everything here is framework-light on purpose so it ports cleanly.

---

## 1. Cursor-reactive Matrix rain

**Where:** `hybrid/rain.jsx` → `HybridRain({ theme })`. Standalone, one `<canvas>`, no deps.

**What makes it good (and not laggy):**
- Single `requestAnimationFrame` loop, **DPR capped at 2** (`Math.min(devicePixelRatio, 2)`) so retina doesn't quadruple the fill cost.
- **Pauses on tab blur** via `visibilitychange` (no wasted frames in background tabs).
- **Hard-bails on `prefers-reduced-motion: reduce`** — never even starts.
- Two glyph layers: ~40% slow/dim "background" columns + bright "foreground" columns, so it reads as depth, not a flat wall.
- **Cursor reaction**: pointer within `R = 130px` of a column speeds it up (`d.speed * (1 + cb*1.6)`) and ignites glyphs to the bright `spark` colour with a glow — the disturbance field is the signature moment.

**Theme awareness** (the part to keep): the palette swaps on `themeRef.current`:
```js
theme === 'neon-terminal'  // DARK
  ? { fade:'rgba(6,10,6,0.072)',   trail:'0,210,90',  head:'200,255,205', spark:'90,255,170' }
  : { fade:'rgba(252,253,250,0.085)', trail:'22,120,60', head:'40,150,80',  spark:'0,170,90' }; // LIGHT circuit
```
The `fade` rgba is the per-frame trail-decay wash — **its alpha controls trail length**, and its *colour* must match your background or you get grey smear. The light-theme trail is a dark, desaturated green at low opacity so it never washes out the off-white.

**Opacity is set in CSS, not JS** (`hybrid.css`), so you can tune per theme without touching the loop:
```css
[data-theme="neon-terminal"] .hy-rain { opacity: calc(0.5  * var(--nt-rain-opacity, 1)); }
[data-theme="circuit"]       .hy-rain { opacity: calc(0.13 * var(--nt-rain-opacity, 1)); }
```
`--nt-rain-opacity` is the Tweaks slider hook — wire it to a user setting or drop it.

**Porting to your repo:** it's already a React component using only `useRef`/`useEffect`. Drop it in as `MatrixRain.tsx`, type the refs, render once near the root behind your content (`position: fixed; inset: 0; z-index: -1; pointer-events: none;` — see `.nt-rain` in `v4/v4.css`). Pass your theme string in. No Framer Motion needed.

---

## 2. 3D tilt + flip project cards

**Where:** `hybrid/projects.jsx` → `HyCard({ p, featured })`, styles in `hybrid/hybrid.css` (`.hy-pcard*`).

**Two independent interactions on one card:**
1. **Tilt** — `onMouseMove` maps cursor x/y to `rotateX/rotateY` (±~12°), throttled through `requestAnimationFrame`, reset on `onMouseLeave`. Lives on `.hy-pcard__inner` with `transform-style: preserve-3d` and parent `perspective: 1200px`.
2. **Flip** — clicking the corner node toggles `.flipped`, which forces `rotateY(180deg)` (note the `!important` so it beats the inline tilt transform). Front = cover art + category + title; back = blurb, language dot, tags, Live/Code.

**The bit worth keeping:** flip and tilt share one transformed element, so the inline `style.transform` (tilt) and the `.flipped` class (flip) would fight — resolved by making the flip rule `!important` and gating tilt off while flipped (`if (flipped) return` in the move handler). That's the non-obvious detail.

**Category accent** is a CSS-var contract, not hardcoded colours:
```css
.hy-cat-ai { --hy-acc: oklch(0.70 0.14 215); }  /* etc. */
```
`--hy-acc` then drives the left-border, glow, category label, and flip-node colour. Add a category = add one line.

**Cover fallback:** cards with no hosted image (`COVERS[p.id]` undefined) render `.hy-pcard__gen` — a generated neon gradient panel with the title — so the grid never shows a broken image. Your three new projects (The Kicker, ISQ Agent, Sanctuary) use this; give them real covers and they auto-upgrade.

**Covers** are Cloudinary with `f_auto,q_auto,w_680` delivery transforms baked into the URL helper (`hybrid/covers.jsx`) — keep that transform, it's most of your payload win.

**Porting:** the component is plain React + one local state each for `flipped`/`tilt`. In your repo, swap the inline `V.*` SVG icons for your Lucide imports and the `nt-btn`/`nt-ttag` classes for your ShadCN `Button`/`Badge`. The CSS is vanilla — copy `.hy-pcard*` verbatim.

---

## Files to copy
| Purpose | File |
|---|---|
| Rain component | `hybrid/rain.jsx` |
| Rain + card styles | `hybrid/hybrid.css` |
| Flip card + grid | `hybrid/projects.jsx` |
| Cover URL map | `hybrid/covers.jsx` |
| Tokens referenced (`--hy-acc` consumers, `.nt-rain` positioning) | `site/tokens.css`, `v4/v4.css` |

## Two caveats
- **`backface-visibility: hidden`** is load-bearing on `.hy-pcard__face` — without it both faces show through during the flip. Keep it.
- The rain `fade` alpha is tuned for *these* backgrounds. If you change your page bg, re-tune the `fade` rgba to match or trails will smear.
