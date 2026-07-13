# Image assets

Every image the site uses or needs. Written after auditing every reference in the
codebase and HTTP-checking all 20 Cloudinary URLs (all 200 — nothing is broken; the
gaps below are assets that were never made).

**Cloudinary:** cloud name `depqttzlt`.
Covers are delivered as `.../image/upload/f_auto,q_auto,w_800/<version>/<id>.<ext>` —
`f_auto` means the `.png` URLs actually serve JPEG/WebP. Videos use
`.../video/upload/vc_auto,q_auto,w_960/...`.

---

## 1. Shoot these — missing project covers

**Spec: 16:9, 1600×900 (or 1920×1080). Not square.**

The card band renders at roughly **312×150 (2:1)** and the modal hero at **640×360
(16:9)**, both `object-fit: cover`. Square art gets centre-cropped hard in both.

| Project | id | Why it matters |
|---|---|---|
| **The Kicker** | `premier-league-oracle` | **Featured** — sits in the top row of /projects showing a `> premier-league-oracle — cover incoming` placeholder |
| **Sanctuary** | `sanctuary` | **Featured** — same placeholder |
| **ISQ Agent** | `isq-agent` | Placeholder in the main grid |
| **Commercial Portfolio** | `commercial-portfolio` | Its "cover" is the logo SVG. The modal explicitly skips SVG covers, so **opening it shows no image at all** |

Once shot, upload to Cloudinary and set `images.cover` in `src/lib/projects.ts` using
the same `f_auto,q_auto,w_800` transform as the others.

---

## 2. Re-shoot when you get a chance — existing covers are the wrong shape

**11 of the 15 existing covers are square (1024×1024) title cards**, and
`dotnet-react-calendar` is **portrait (784×1168)**. They're being centre-cropped into
a 2:1 card band and a 16:9 modal hero, so you lose the top and bottom of each.

Square ones: ModelViz, LangChain Code Generator, SQL Ball, Morpheus, ReviewBot, News
Perspective, LFC News, Version TimeTravel, AI & Agents Portfolio, CSS Showcase, Big
Bang Canvas, Python Projects, Matrix Arcade.

Worst offender: **`.NET/React Calendar`** — portrait art in a landscape slot.

---

## 3. Galleries — a real performance problem

Only 3 of 18 projects have a gallery, and all three are **single animated GIFs served
with no Cloudinary transform at all**:

| Project | Size over the wire |
|---|---|
| Morpheus | **8.8 MB** |
| ModelViz | **5.5 MB** |
| Matrix Arcade | **4.7 MB** |

**These cannot be optimised server-side.** Cloudinary refuses the transform:

```
x-cld-error: Maximum total number of pixels in all frames/pages is 50 Megapixels.
             Requested 80.0 Megapixels
```

They're over the plan's transform limit, so `f_auto,q_auto` returns a 400 and the raw
GIF is what ships. They only download when someone opens that project's modal, so
they aren't on the critical path — but 8.8 MB for one modal is not acceptable.

**Fix: re-export them as MP4** (or as much smaller GIFs, ≤ 1200px wide, fewer frames).
An MP4 of the same clip will be ~200–400 KB. If you re-upload as video, they can go in
`videos[]` instead of `images.gallery` and the modal will render them as a `<video>`,
which it already supports.

**Also worth doing:** 2–4 screenshots each (1280×720+) for the 15 projects that have no
gallery at all.

---

## 4. Brand assets — DONE, generated this session

These did not exist and are now in `public/`:

| File | Size | Notes |
|---|---|---|
| `og-image.png` | 1200×630 | **This was actively broken.** The og:image was an SVG, and X, LinkedIn, Facebook and Slack all refuse SVG — so every share of the site previewed **blank**. Built with the real fonts, rain and palette. |
| `favicon.ico` | 32×32 | Was referenced in the HTML and **404'd on every page load** |
| `apple-touch-icon.png` | 180×180 | Did not exist at all |
| `icon-192.png`, `icon-512.png` | PWA | The manifest previously pointed only at the 210 KB `logo.svg` |

Redo them yourself any time — they're rendered from HTML, so they're easy to restyle.

`public/logo.svg` (210 KB) is a **traced raster full of path soup**, not a real vector
mark. It's no longer used as the favicon or the og:image. A genuine vector logo would
be a nice-to-have.

---

## 5. Video

| Asset | Was | Now |
|---|---|---|
| Contact banner (`LinkedInBanner.tsx`) — autoplays on page load | **2,252 KB** | **39 KB** (`vc_auto,q_auto,w_1200`) |
| Morpheus demo (`projects.ts`) | **8,071 KB** | **1,345 KB** (`vc_auto,q_auto,w_960`) |

Both were shipping untransformed. Nothing to do here — noting it so the transforms
don't get dropped.

**Optional:** poster frames so the videos don't show black before the first frame —
contact banner 1952×488, Morpheus demo 1280×720.

---

## 6. Not needed

- **Timeline** (`src/lib/timeline.ts`) — no image field. Entries use a coloured icon chip.
- **Icons** — `GithubIcon` and `LinkedinIcon` are inline SVG in `src/components/icons.tsx`; everything else is lucide. No files to make.
- **Header logo** — it's the text wordmark `> tom_butler`, not an image.
- **Blog** — 10 markdown posts, no images, and currently unrouted. Hero images would be an opportunity, not a gap.

---

## Priority

1. **The 4 missing covers** (§1) — two are featured and show placeholders on the busiest page.
2. **Re-export the 3 gallery GIFs as MP4** (§3) — 19 MB of unoptimisable animation.
3. Galleries for the other 15 projects (§3).
4. Re-shoot the square covers as 16:9 (§2).
5. Video poster frames (§5), and a real vector logo (§4).
