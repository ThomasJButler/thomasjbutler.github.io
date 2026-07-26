# Asset manifest: what to upload to Cloudinary

Generated from `src/lib/assets.ts`, which is the single source of truth for every image and
clip the site serves. If this file and `assets.ts` ever disagree, `assets.ts` is right.

## The state of the folders

- **`design-assets/`** holds the 2x masters. **Upload these, not `public/img/`.** Cloudinary's
  width transform does the resize, and starting from 2x is what keeps them sharp on retina.
- **`public/img/`** holds the downscaled copies the site currently serves. It is gitignored but
  it still deploys, because Vite copies `public/` into `dist/` and gh-pages ships `dist/`. It is
  an exact match for what `assets.ts` references: no orphans, nothing missing.
- Both were audited and every unused file removed. Anything left in `design-assets/` is either
  served, a master for something served, or listed under "not site content" at the bottom.

## The swap

`src/lib/assets.ts` is the only file that changes. Replace each `/img/...` value with the
Cloudinary URL and apply the transform in the table below. The URLs cannot be derived from the
filenames, because Cloudinary appends a generated suffix to the public_id
(`Morpheus5_pdcmvr.png`), which is exactly why this map exists: the swap is one file, not
thirty call sites.

`hasDesignedCover()` and `MEDIA_SIZE` need no changes. They are keyed on project id and on
intrinsic pixel size, neither of which the swap touches.


### premier-league-oracle

| Field | Master in `design-assets/` | Cloudinary transform |
| --- | --- | --- |
| `cover` | the-kicker.png | `image/upload/f_auto,q_auto,w_800` |
| `gallery` | 5 files, `the-kicker-0*` | `image/upload/f_auto,q_auto,w_1200` |
| `loop` | the-kicker-loop.gif | `video/upload/vc_auto,q_auto,w_480` |
| `poster` | the-kicker-loop-poster.png **(no master)** | `image/upload/f_auto,q_auto,w_1200` |
| `diagram` | diagram-kicker.png | `image/upload/f_auto,q_auto,w_1600` |
| `wireframe` | wireframe-kicker.png | `image/upload/f_auto,q_auto,w_1600` |

### sanctuary

| Field | Master in `design-assets/` | Cloudinary transform |
| --- | --- | --- |
| `cover` | sanctuary.png | `image/upload/f_auto,q_auto,w_800` |
| `gallery` | 5 files, `sanctuary-0*` | `image/upload/f_auto,q_auto,w_1200` |
| `loop` | sanctuary-loop.gif | `video/upload/vc_auto,q_auto,w_480` |
| `poster` | sanctuary-loop-poster.png **(no master)** | `image/upload/f_auto,q_auto,w_1200` |
| `diagram` | diagram-sanctuary.png | `image/upload/f_auto,q_auto,w_1600` |
| `wireframe` | wireframe-sanctuary.png | `image/upload/f_auto,q_auto,w_1600` |

### isq-agent

| Field | Master in `design-assets/` | Cloudinary transform |
| --- | --- | --- |
| `cover` | isq-agent.png | `image/upload/f_auto,q_auto,w_800` |
| `gallery` | 5 files, `isq-agent-0*` | `image/upload/f_auto,q_auto,w_1200` |
| `hero` | isq-case-study-hero.png | `image/upload/f_auto,q_auto,w_1600` |
| `loop` | isq-agent-loop.gif | `video/upload/vc_auto,q_auto,w_480` |
| `poster` | isq-agent-loop-poster.png **(no master)** | `image/upload/f_auto,q_auto,w_1200` |
| `diagram` | diagram-isq.png | `image/upload/f_auto,q_auto,w_1600` |
| `wireframe` | wireframe-isq.png | `image/upload/f_auto,q_auto,w_1600` |

### morpheus

| Field | Master in `design-assets/` | Cloudinary transform |
| --- | --- | --- |
| `cover` | morpheus.png | `image/upload/f_auto,q_auto,w_800` |
| `gallery` | 5 files, `morpheus-0*` | `image/upload/f_auto,q_auto,w_1200` |
| `loop` | morpheus-loop.gif | `video/upload/vc_auto,q_auto,w_480` |
| `poster` | morpheus-loop-poster.png **(no master)** | `image/upload/f_auto,q_auto,w_1200` |
| `diagram` | diagram-morpheus.png | `image/upload/f_auto,q_auto,w_1600` |
| `wireframe` | wireframe-morpheus.png | `image/upload/f_auto,q_auto,w_1600` |

### modelviz

| Field | Master in `design-assets/` | Cloudinary transform |
| --- | --- | --- |
| `cover` | modelviz.png | `image/upload/f_auto,q_auto,w_800` |
| `gallery` | 5 files, `modelviz-0*` | `image/upload/f_auto,q_auto,w_1200` |
| `diagram` | diagram-modelviz.png | `image/upload/f_auto,q_auto,w_1600` |
| `wireframe` | wireframe-modelviz.png | `image/upload/f_auto,q_auto,w_1600` |

### reviewbot-protocol

| Field | Master in `design-assets/` | Cloudinary transform |
| --- | --- | --- |
| `cover` | reviewbot-protocol.png | `image/upload/f_auto,q_auto,w_800` |
| `gallery` | 4 files, `reviewbot-protocol-0*` | `image/upload/f_auto,q_auto,w_1200` |
| `diagram` | diagram-reviewbot-protocol.png | `image/upload/f_auto,q_auto,w_1600` |
| `wireframe` | wireframe-reviewbot-protocol.png | `image/upload/f_auto,q_auto,w_1600` |

### news-perspective

| Field | Master in `design-assets/` | Cloudinary transform |
| --- | --- | --- |
| `cover` | newsperspective.png | `image/upload/f_auto,q_auto,w_800` |
| `gallery` | 5 files, `newsperspective-0*` | `image/upload/f_auto,q_auto,w_1200` |
| `wireframe` | wireframe-newsperspective.png | `image/upload/f_auto,q_auto,w_1600` |

### sql-ball

| Field | Master in `design-assets/` | Cloudinary transform |
| --- | --- | --- |
| `cover` | sql-ball.png | `image/upload/f_auto,q_auto,w_800` |
| `gallery` | 5 files, `sql-ball-0*` | `image/upload/f_auto,q_auto,w_1200` |
| `diagram` | diagram-sql-ball.png | `image/upload/f_auto,q_auto,w_1600` |
| `wireframe` | wireframe-sql-ball.png | `image/upload/f_auto,q_auto,w_1600` |

### ai-code-generator

| Field | Master in `design-assets/` | Cloudinary transform |
| --- | --- | --- |
| `cover` | ai-code-generator.png | `image/upload/f_auto,q_auto,w_800` |
| `gallery` | 5 files, `ai-code-generator-0*` | `image/upload/f_auto,q_auto,w_1200` |
| `diagram` | diagram-ai-code-generator.png | `image/upload/f_auto,q_auto,w_1600` |
| `wireframe` | wireframe-ai-code-generator.png | `image/upload/f_auto,q_auto,w_1600` |

### matrix-arcade

| Field | Master in `design-assets/` | Cloudinary transform |
| --- | --- | --- |
| `cover` | matrix-arcade.png | `image/upload/f_auto,q_auto,w_800` |
| `gallery` | 5 files, `matrix-arcade-0*` | `image/upload/f_auto,q_auto,w_1200` |
| `games` | 12 files, `arcade-*` | `image/upload/f_auto,q_auto,w_1200` |
| `poster` | matrix-arcade-poster.png | `image/upload/f_auto,q_auto,w_1200` |
| `video` | matrix-arcade.mp4 **(no master)** | `video/upload/vc_auto,q_auto,w_960` |

<!-- total 99 served entries, 5 without a PNG/GIF master -->

## The five with no PNG or GIF master

Not a problem, just things you cannot upload straight from `design-assets/`:

- **Four `*-loop-poster.jpg`** (The Kicker, Sanctuary, ISQ Agent, Morpheus). These are single
  frames pulled out of the loop clips, so there was never a separate master. Either upload the
  existing `public/img/` jpg as is, or let Cloudinary generate the poster from the uploaded
  video, which is the tidier option.
- **`matrix-arcade.mp4`.** The master lives in `~/Downloads`, not in any asset folder. The
  392kB encode in `public/img/` is the only copy in the repo. Find the master before uploading,
  or upload the encode and accept it.

## Held, not wired

- **`diagram-newsperspective.png`** is in `design-assets/` but deliberately absent from
  `assets.ts`. It still prices a refresh at "about 14 requests" and "seven refreshes a day",
  which was correct before NewsAPI dropped `country=gb`. It is 8 requests and about 12
  refreshes, and gallery tile `-05` was corrected and already says so. **Do not upload it until
  it is re-cut**, or the site will have two tiles disagreeing.

## In `design-assets/` but not site content

Keep or bin as you like, but do not upload:

- **`og-case-study.png`, `og-contact.png`, `og-services.png`** — these ARE used, just not
  through `/img/`. `scripts/routes.mjs` sets them as per-route Open Graph images and they are
  served from `public/` at the site root. They must keep their current filenames and stay
  where they are. **Do not move these to Cloudinary**: social scrapers want a same-origin
  absolute URL, and `scripts/prerender.mjs` builds one from `SITE`.
- **`linkedin-template.png`** — a marketing template, not site content. Left in place because
  LinkedIn is a traffic source, not because anything renders it.
- **`ASSET-INTEGRATION.md`, `CLAUDE-CODE-PROMPT.md`** — Claude Design's own handover notes.
