# Design brief: thomasjbutler.github.io

Upload this whole file. It is the design system, the rules, and the asset list. Every value
in it was read out of the live site, not remembered.

---

## 1. Who this is for

**Thomas J Butler.** Full stack AI engineer, York, UK. Self-employed.

He sells one thing: **local and private AI for businesses.** Open-weight models running on
the client's own hardware, private RAG over the client's own documents, and honest audits of
what AI is actually costing them. The engagements are five figures.

**The line the whole brand hangs on:**

> ## AI you own, not AI you rent.

Everything you make should be able to sit under that sentence without embarrassing it.

**The audience is a buyer, not a developer.** Often risk-averse and compliance-shaped: NHS,
legal, insurance, financial services. Someone who cannot send their data to a third party.
Their unspoken question is *"is this person serious enough to trust with my data?"* Anything
that looks like a hobby project answers "no".

---

## 2. The one rule that is not negotiable

The palette is a single hue, and it **means something**. There is exactly one other colour,
and it also means something.

| | Colour | Means |
|---|---|---|
| **Green** | the brand | **What you own.** Local. Private. £0 per token. Your hardware. |
| **Amber** | `--meter` | **The meter running.** API bills, per-token spend, data leaving the building. |

**Amber is never decorative.** It is never a highlight, never an accent, never "a bit of
warmth". If a thing is not costing the client money or leaking their data, it is not amber.
This rule replaced an earlier system where badges were tinted cyan and amber at random, and
that randomness is precisely what made the design feel generated rather than authored.

If you introduce a third hue, you have broken the brand.

---

## 3. Colour

Sampled from the running site. Hex is the true sRGB rendering of the oklch source.

### Dark theme ("neon terminal") — this is the default and the one that matters

| Token | Hex | oklch |
|---|---|---|
| Background | `#010201` | `oklch(0.08 0.01 145)` |
| Foreground (text) | `#F3F6F3` | `oklch(0.97 0.005 145)` |
| **Primary (green)** | **`#00A300`** | `oklch(0.60 0.26 145)` |
| Card surface | `#020502` @ 94% | `oklch(0.11 0.015 145 / 0.94)` |
| Border | `#234024` | `oklch(0.34 0.06 145)` |
| Muted text | `#AEBCAE` | `oklch(0.78 0.025 145)` |
| **Meter (amber)** | **`#F9B73F`** | `oklch(0.82 0.15 78)` |

### Light theme ("circuit")

| Token | Hex | oklch |
|---|---|---|
| Background | `#F9FAF9` | `oklch(0.985 0.002 145)` |
| Foreground | `#010801` | `oklch(0.12 0.03 145)` |
| **Primary (green)** | **`#005200`** | `oklch(0.35 0.22 145)` |
| Card | `#FFFFFF` @ 92% | `oklch(1 0 0 / 0.92)` |
| Border | `#D6E2D6` | `oklch(0.90 0.02 145)` |
| Muted text | `#325033` | `oklch(0.40 0.06 145)` |
| Meter (amber) | `#9A5600` | `oklch(0.52 0.14 70)` |

Amber is much darker in light mode because the dark-theme amber measures 2.4:1 on a white
card, which fails WCAG. **Any asset that has a light-theme variant must respect this.**

The Matrix rain glyph highlight, if you ever need it: near-white green `#F1FCF0`.

---

## 4. Type

Four faces, and each has exactly one job. Do not swap them around.

| Face | Where it is used | Notes |
|---|---|---|
| **Orbitron** (700/800) | Every display heading, the hero, stat numbers | Wide, geometric, technical. This is the brand voice. It is **18.9% wider than Arial**, so give it room. |
| **Exo 2** (400-700) | All body copy | Humanist, quietly technical, highly legible |
| **Share Tech Mono** (400) | Labels, eyebrows, badges, the logo (`> tom_butler`), UI chrome | The "machine" voice |
| **JetBrains Mono** (400/500) | **The terminal console only.** Nowhere else. | Real code needs a real code font |

Headings are sentence case, not Title Case. Labels in mono are `lower_snake_case`,
letter-spaced ~0.18em.

---

## 5. The motifs, and when they are allowed

The site is Matrix-themed, and the theme is earned rather than sprayed on. Copy the
restraint, not just the look.

- **Matrix rain.** A live canvas of falling katakana glyphs, green, behind everything, at
  40% opacity in dark mode. It is *background*, never foreground. Text never sits directly on
  it without a scrim.
- **CRT scanlines** at 15% opacity, plus a soft vignette. Barely perceptible. If you can
  clearly see the scanlines, they are too strong.
- **Glow.** Green text-shadow / box-shadow on headings and primary actions. Soft, wide, low
  alpha (10-35%). Never a hard neon outline.
- **The terminal.** The one place the motif genuinely argues the case, and the model for
  everything you make. The hero runs a real-looking session:

  ```
  $ ollama run qwen3 "summarise ./client-docs"
    ▸ 42 tok/s · running on local hardware
    ▸ done · nothing left the machine
  $ netstat --external
    0 bytes sent to third parties          ← highlighted green
  ```

  That is the sales argument, dramatised, in the subject's own vernacular. **A motif that
  says something beats a motif that decorates.** Aim for that standard.

**Geometry:** corner radius 8-12px. Cards are near-opaque dark surfaces with a 1px green-grey
border, and they lift 3px with a soft green glow on hover.

---

## 6. What to avoid (this matters as much as the rest)

The site was recently rebuilt specifically to remove these. Do not reintroduce them.

- ❌ **A third colour.** No cyan, no purple, no gradient rainbows.
- ❌ **Hard neon outlines / "cyberpunk" clip-art.** The look is a phosphor CRT, not a Vegas sign.
- ❌ **Generic AI-art tropes**: glowing brains, humanoid robots, circuit-board faces, blue
  holographic HUDs, "digital transformation" abstract swooshes. Any of these will make a
  compliance officer close the tab.
- ❌ **Stock-photo people at laptops.**
- ❌ **Anything that looks like a junior portfolio.** Skill bars, percentage ratings, "open to
  work" badges, tip jars. All were removed for actively repricing the work downwards.
- ❌ **Fake numbers.** Nothing invented, ever. If a figure is not real, it does not ship.

---

## 7. THE ASSETS I NEED

### 7a. Three project covers (the priority)

Every project card opens with a full-bleed cover band. **Three projects have no cover and are
currently rendering a generated fallback panel — and two of those three are FEATURED**, which
means they appear in the 3-across "The ones worth your time" grid at the top of `/projects`.
That is the first thing a buyer sees on that page, and it currently looks unfinished.

**Technical spec (all covers):**

- **Deliver at 1600 × 750 px** (the site declares 640 × 300 intrinsic and serves responsive
  widths of 400 / 640 / 800, so 1600 gives clean retina headroom).
- The band is rendered **~150px tall, cropped `object-cover`, centred**. So: the visual must
  survive a **hard centre crop to roughly 2.5:1**. Keep everything meaningful in the middle
  band. Do not put anything near the top or bottom edge.
- **Any text in the cover will render at about 1/4 size. Assume it is illegible. Do not rely
  on it.** Composition and silhouette carry the whole thing.
- The site applies `brightness(0.9) saturate(1.05)` and brightens on hover, so deliver
  slightly *hotter* than final.
- PNG. Dark-theme first: these sit on a near-black card. They must not glow white.

**The three:**

**1. The Kicker** *(featured)*
Premier League predictions plus a clean, ad-free football newsreader. Five statistical models
(ELO, Poisson, form, head-to-head, standings) blended with a trained XGBoost ensemble, shown
as **honest probability bars rather than over-confident scorelines**. Also a Kelly Criterion
calculator and a chat with client-side RAG over 33 seasons.
→ *Direction:* the honesty of the probability bars is the idea. Think a data readout, not a
football photo. Green bars of unequal confidence. No club badges, no players, no stock turf.

**2. ISQ Agent**
A RAG agent that drafts supplier security questionnaires: it grounds every answer in the
client's own policy documents, cites the source, scores confidence across four dimensions,
and routes the weak answers to a human. Python/FastAPI engine, n8n orchestration, 480+ tests.
→ *Direction:* a questionnaire being answered with receipts. Rows of questions, each with a
grounded answer and a confidence score; one row flagged amber for human review. **This is the
single best use of the amber rule you will get.** The repo and deployments are offline, so
this cover is the only thing representing it.

**3. Sanctuary** *(featured)*
A native iOS app for daily neurodiverse functioning, built in Swift after ~2 years of
research. **Fully offline, on-device AI.** Voice-first, because speaking is easier than typing
when you are overwhelmed. Three pillars: privacy, trust, encouragement.
→ *Direction:* warmer and calmer than the others; it is a human product. But still ours.
On-device and offline is the point: nothing leaves the phone. Avoid anything clinical or sad.

### 7b. A cover for the case study (nice to have)

`/case-study` is the strongest sales asset on the site and has no hero image. Subject: the ISQ
Agent, framed as *"Answering security questionnaires without leaking the answers"*. Could reuse
or extend the ISQ cover at a wider crop.

### 7c. Per-route social cards (high value, low effort)

There is one `og-image.png` (1200 × 630) and it is good: black, rain, the big Orbitron line
*"AI you own, not AI you rent."*, a subhead, and three chips. **Every route currently shares
it.** Now that Tom is posting to LinkedIn and YouTube, the pages he links most deserve their
own, in the same template:

- **`/services`** — the money page. Lead with the offer: *"Local & Private AI"* and the three
  fixed-fee ways in (audit from £6,000, local LLM setup from £12,000, private RAG from
  £18,000).
- **`/case-study`** — *"Answering security questionnaires without leaking the answers."*
- **`/contact`** — *"Talk it through."*

All 1200 × 630, same type hierarchy, dark, rain in the right third, chips bottom-right.

### 7d. Gallery clips (a real blocker)

Three project galleries are animated GIFs that **Cloudinary refuses to transform** (`Maximum
total number of pixels in all frames is 50 Megapixels. Requested 80.0`). They need re-exporting
as **MP4** (h.264, ≤1200px wide, muted, loopable, a few seconds). Not a design job as such, but
it is currently blocking those projects from showing motion.

---

## 8. Deliverable

For each asset: PNG (or MP4 where stated), plus the source so it can be re-cut. Name them
after the project id, e.g. `the-kicker.png`, `isq-agent.png`, `sanctuary.png`.

They will be uploaded to Cloudinary (cloud `depqttzlt`) and referenced from
`src/lib/projects.ts` as `images.cover`, which auto-generates the responsive `srcset`.

---

## 9. The test to apply to everything

A buyer, whose actual problem is *"our data is not allowed to leave the building"*, lands on
the page. Does the asset make them think:

> **"This person is serious, and they are the one I need."**

If it makes them think "nice portfolio", it has failed.
