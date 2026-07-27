# Asset manifest: the Cloudinary upload

Generated from `src/lib/assets.ts`, which is the single source of truth for every image and
clip the site serves. If this file and `assets.ts` disagree, `assets.ts` is right.

## Just upload one folder

**`design-assets/upload-to-cloudinary/` — 111 files, and nothing in it that should not be
uploaded.** It is exactly what `assets.ts` references, checked file by file rather than by
eye. Drag the whole folder in.

`design-assets/not-for-upload/` holds the seven that must stay put, and the important ones are
the three **`og-*.png`**. Those are live: `scripts/routes.mjs` sets them as per-route Open Graph
images and they are served from the site root, because a social scraper wants an absolute URL
on this domain. Moving them to Cloudinary breaks link previews on `/services`, `/case-study`
and `/contact`. Also in there: the held NewsPerspective diagram, a LinkedIn template, and two
design handover notes.

## After uploading

`src/lib/assets.ts` is the only file that changes. Replace each `/img/...` value with the
Cloudinary URL and apply the transform from the tables below. The URLs cannot be derived from
the filenames, because Cloudinary appends a generated suffix to the public_id
(`Morpheus5_pdcmvr.png`), which is exactly why this map exists: the swap is one file, not a
hundred call sites.

`hasDesignedCover()` and `MEDIA_SIZE` need no changes: they key on project id and on intrinsic
pixel size, neither of which the swap touches.

Full transform prefixes: images are `image/upload/f_auto,q_auto,<width>/`, clips are
`video/upload/vc_auto,q_auto,<width>/`.

## Five files that are not 2x masters

Everything else in the folder is a 3200px master. These five are the shipped files, because no
master exists:

- **Four `*-loop-poster.jpg`** — single frames out of the loop clips, so there was never a
  separate master. Uploading them as they are works. The tidier option is to delete them from
  the upload and let Cloudinary generate a poster from the video you just uploaded.
- **`matrix-arcade.mp4`** — the 392kB encode. Its master is in `~/Downloads`, not in the repo.
  Worth finding before uploading, or accept the encode.


### the-kicker

| Field | File in `upload-to-cloudinary/` | Transform |
| --- | --- | --- |
| `cover` | the-kicker.png | `w_800` |
| `gallery` | 5 files, `the-kicker-0*` | `w_1200` |
| `loop` | the-kicker-loop.gif | `w_480 (video)` |
| `poster` | the-kicker-loop-poster.jpg *(not a 2x master)* | `w_1200` |
| `diagram` | diagram-kicker.png | `w_1600` |
| `wireframe` | wireframe-kicker.png | `w_1600` |

### sanctuary

| Field | File in `upload-to-cloudinary/` | Transform |
| --- | --- | --- |
| `cover` | sanctuary.png | `w_800` |
| `gallery` | 5 files, `sanctuary-0*` | `w_1200` |
| `loop` | sanctuary-loop.gif | `w_480 (video)` |
| `poster` | sanctuary-loop-poster.jpg *(not a 2x master)* | `w_1200` |
| `diagram` | diagram-sanctuary.png | `w_1600` |
| `wireframe` | wireframe-sanctuary.png | `w_1600` |

### isq-agent

| Field | File in `upload-to-cloudinary/` | Transform |
| --- | --- | --- |
| `cover` | isq-agent.png | `w_800` |
| `gallery` | 5 files, `isq-agent-0*` | `w_1200` |
| `hero` | isq-case-study-hero.png | `w_1600` |
| `loop` | isq-agent-loop.gif | `w_480 (video)` |
| `poster` | isq-agent-loop-poster.jpg *(not a 2x master)* | `w_1200` |
| `diagram` | diagram-isq.png | `w_1600` |
| `wireframe` | wireframe-isq.png | `w_1600` |

### morpheus

| Field | File in `upload-to-cloudinary/` | Transform |
| --- | --- | --- |
| `cover` | morpheus.png | `w_800` |
| `gallery` | 5 files, `morpheus-0*` | `w_1200` |
| `loop` | morpheus-loop.gif | `w_480 (video)` |
| `poster` | morpheus-loop-poster.jpg *(not a 2x master)* | `w_1200` |
| `diagram` | diagram-morpheus.png | `w_1600` |
| `wireframe` | wireframe-morpheus.png | `w_1600` |

### modelviz

| Field | File in `upload-to-cloudinary/` | Transform |
| --- | --- | --- |
| `cover` | modelviz.png | `w_800` |
| `gallery` | 5 files, `modelviz-0*` | `w_1200` |
| `diagram` | diagram-modelviz.png | `w_1600` |
| `wireframe` | wireframe-modelviz.png | `w_1600` |

### reviewbot-protocol

| Field | File in `upload-to-cloudinary/` | Transform |
| --- | --- | --- |
| `cover` | reviewbot-protocol.png | `w_800` |
| `gallery` | 4 files, `reviewbot-protocol-0*` | `w_1200` |
| `diagram` | diagram-reviewbot-protocol.png | `w_1600` |
| `wireframe` | wireframe-reviewbot-protocol.png | `w_1600` |

### mastering-ai-portfolio

| Field | File in `upload-to-cloudinary/` | Transform |
| --- | --- | --- |
| `gallery` | 4 files, `agentic-ai-portfolio-0*` | `w_1200` |

### version-timetravel

| Field | File in `upload-to-cloudinary/` | Transform |
| --- | --- | --- |
| `gallery` | 4 files, `version-timetravel-0*` | `w_1200` |

### commercial-portfolio

| Field | File in `upload-to-cloudinary/` | Transform |
| --- | --- | --- |
| `gallery` | 4 files, `commercial-portfolio-0*` | `w_1200` |

### news-perspective

| Field | File in `upload-to-cloudinary/` | Transform |
| --- | --- | --- |
| `cover` | newsperspective.png | `w_800` |
| `gallery` | 5 files, `newsperspective-0*` | `w_1200` |
| `wireframe` | wireframe-newsperspective.png | `w_1600` |

### sql-ball

| Field | File in `upload-to-cloudinary/` | Transform |
| --- | --- | --- |
| `cover` | sql-ball.png | `w_800` |
| `gallery` | 5 files, `sql-ball-0*` | `w_1200` |
| `diagram` | diagram-sql-ball.png | `w_1600` |
| `wireframe` | wireframe-sql-ball.png | `w_1600` |

### ai-code-generator

| Field | File in `upload-to-cloudinary/` | Transform |
| --- | --- | --- |
| `cover` | ai-code-generator.png | `w_800` |
| `gallery` | 5 files, `ai-code-generator-0*` | `w_1200` |
| `diagram` | diagram-ai-code-generator.png | `w_1600` |
| `wireframe` | wireframe-ai-code-generator.png | `w_1600` |

### matrix-arcade

| Field | File in `upload-to-cloudinary/` | Transform |
| --- | --- | --- |
| `cover` | matrix-arcade.png | `w_800` |
| `gallery` | 5 files, `matrix-arcade-0*` | `w_1200` |
| `games` | 12 files, `arcade-*` | `w_1200` |
| `poster` | matrix-arcade-poster.png | `w_1200` |
| `video` | matrix-arcade.mp4 | `w_960 (video)` |
