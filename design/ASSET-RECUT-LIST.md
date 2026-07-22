# Re-cut list for Claude Design

Only the assets that need changing. Everything not listed under "needs a re-cut" is wired in
and staying.

**How this list was built.** Every tile was read and every factual claim in it checked against
the source repos. Most of what looked wrong turned out to be **right**, and the site copy was
the stale part: The Matrix Arcade had shipped v2.0 (twelve games, Phaser 3, Matrix Frogger)
while the site still advertised the six-game canvas version; SQL-Ball is Svelte, not React; AI
Code Generator is Next.js 15 over FastAPI, not Flask over React. All three records have been
corrected to match the repos.

What remains below is the other direction: places where the **artwork** states something the
product does not support. The site's whole argument is that Tom is precise about what leaves
your building, so a picture asserting something the words contradict costs more here than it
would on an ordinary portfolio.

Brand rules unchanged: no em dashes or en dashes, UK English, plain and direct, one green hue
for owned/local, amber only ever for the metered boundary, no invented numbers.

---

# Needs a re-cut

## 1. `sql-ball-03.png` · two problems · HIGH

**(a) "LIVE ANALYTICS" over a static season dump.** The phone shows a pulsing dot and the badge
"LIVE ANALYTICS", and the copy beside it reads "Live stats, honest numbers, no fluff."

The real app renders **"2024-2025 SEASON"** in exactly that position (`Dashboard.svelte`), and
its real subheading names the season explicitly: "RAG-powered European football analytics *from
the 2024-2025 season* across 22 leagues, 11 countries, 7,681+ matches". The data is a static
historical dump from football-data.co.uk. The mock has replaced an honest label with a claim
the dataset cannot support, and put "Live stats" immediately before the words "honest numbers".

**Fix:** restore the app's real badge, "2024-2025 SEASON", and put the season back in the
subheading. Change the headline to something true, e.g. "Real data, honest numbers, no fluff."

**(b) The stat card contradicts the hero, in the same image.** The hero says "7,681+ matches".
About 300px below, a stat card reads:

```
European Matches
1000
397 teams, 22 leagues
```

1000 is not a match count, it is the dashboard's fetch limit (`limit=1000`). The tile quotes a
pagination cap as the size of the dataset, directly beneath the real figure.

**Fix:** show the true total (7,681+) in the stat card, or crop the card out of the phone
frame. If the app itself displays the 1000 cap as "European Matches", that is worth fixing in
SQL-Ball first, then recapturing.

---

## 2. `ai-code-generator-03.png` · two problems · HIGH

**(a) `// POWERED BY GPT-4o` under the wordmark.** No "powered by" line exists anywhere in the
product, and the model is wrong: the backend defaults to `gpt-4-turbo-preview`
(`backend/config.py`) and the README says "using OpenAI's GPT-4". The site copy has been
corrected to GPT-4, so as things stand the words and the picture disagree inside one modal.

**(b) An amber lightning bolt on the "Generate Code" button.** Two issues at once: the real
button has no icon at all (`frontend/app/page.tsx` renders plain text), and amber is the one
hue on this site that carries a fixed meaning, the metered boundary. This is the only non-green
hue in the whole five-slide set and it is decorative.

**Fix:** drop the "powered by" sub-line (or name the model actually configured), and remove the
bolt to match the shipped button. If a bolt is wanted to mark the metered step, it has to be
the site's amber token used with the same meaning the diagram gives it, not a stray accent.

---

## 3. `matrix-arcade-01.png` · a still that calls itself a video · HIGH

The tile is a mock video player: a play button over the wordmark, and a footer caption reading
">_ 01 · the intro sting · animated marquee (mp4)". It ships as a static PNG in the grid under
a heading reading **Screenshots**, while the real mp4 plays further down the same modal in its
own Demo section. So the page shows a fake play button next to a real one.

**Fix:** drop the play-button overlay and the "animated marquee (mp4)" wording, so the tile is
simply a still. Alternatively drop the tile: the sting it depicts is already on the page as
video.

---

## 4. `ai-code-generator-02.png` · the identity slide gets the name wrong · MEDIUM

The splash slide, captioned ">_ THE IDENTITY", renders the product as **"AI GENERATOR"**. The
word "CODE" is missing. The product's own h1 is "AI CODE GENERATOR", the repo is
`AICodeGenerator`, and slides 01 and 03 in this very set use the full name. This is the one
asset whose entire job is the branding.

**Fix:** render "AI CODE GENERATOR".

---

## 5. `ai-code-generator-05.png` · names the wrong model · MEDIUM

Step 2 of "THE FLOW" reads "GPT-4o writes code + tests + docs." Same underlying issue as item
2(a): the backend calls `gpt-4-turbo-preview`.

**Fix:** "GPT-4 writes code + tests + docs", or drop the model name: "The model writes code +
tests + docs".

> **Worth knowing, and the real root cause of items 2(a) and 5:** the app's own *How It Works*
> panel says "Built with GPT-4o" (`frontend/components/HowItWorksModal.tsx`), which its own
> backend contradicts. The artwork faithfully captured a claim the product was already making
> about itself. The cleanest fix is upstream: correct the panel, then recapture tile 04 (which
> shows it) along with 03 and 05.

---

## 6. `sql-ball-02.png` and `-05.png` · "every European league" · MEDIUM

Footers read "goal trends across **every European league**" and "one dataset, **every European
league**". The dataset is 22 leagues across 11 countries, which is what these same two images
say in their own headers ("SQL-BALL · 22 LEAGUES", and a stat row reading "22 leagues / 11
countries"). Each tile contradicts itself, and 22 of UEFA's 55 member associations is not
every European league.

**Fix:** use the countable claim, which is stronger because it is checkable:
">_ 02 · goal trends across 22 European leagues" and ">_ 05 · one dataset, 22 leagues, 11
countries".

---

## 7. `sql-ball-01.png` and `-02.png` · a domain that does not exist · MEDIUM

Browser chrome reads `sql-ball.app`. The project has no custom domain; the demo is
`sql-ball.vercel.app`. It is the only chrome label in the set shaped like a real address, so a
reader may type it. The siblings avoid this: AI Code Generator's reads `ai-code-generator ·
result`, Morpheus's reads `morpheus.local`.

**Fix:** `sql-ball.vercel.app`, or drop the TLD to match the others.

---

## 8. `sql-ball-01.png` and `-02.png` · amber as a chart colour · LOW

The Goal Trends legend plots "Away Goals" in amber, and the Results donut colours "Away Wins"
orange. Two slides earlier, `diagram-sql-ball.png` teaches the reader that amber means tokens
billed and data leaving. Within one modal, amber means "the metered boundary" and then "the
away team".

These are genuine screenshots of the app's Chart.js palette, so the cleanest fix is upstream:
recolour the away series to teal or violet in SQL-Ball, then recapture. Low priority, and only
worth doing if these slides are being reshot anyway.

---

# Verified accurate · no change needed

Stating these explicitly, because several looked wrong at first and are not:

- **`matrix-arcade-02.png`** claiming "12+ games" and listing FROGGER. Verified against the
  v2.0 release notes: "Twelve games are now live", and Matrix Frogger is real. The site copy
  was the stale side, and has been corrected.
- **`matrix-arcade-03.png`** claiming React + Phaser 3, achievements and PWA. All verified.
  (Its "No audio files to ship" line is the one exception, see below.)
- **`matrix-arcade-04.png`, `-05.png`, `sql-ball-04.png`, `wireframe-ai-code-generator.png`**.
  Checked claim by claim, nothing false found.
- **`ai-code-generator-01.png`**'s Flask code. Checked and it is fine: the panel is explicitly
  headed "Generated Code (PYTHON)", so the Flask sample is the tool's *output*, not a statement
  about the tool's own stack.
- **`diagram-sql-ball.png`** and **`diagram-ai-code-generator.png`**. Both apply the green and
  amber rule correctly, carry their own legend, and mark exactly one metered node each. These
  are the strongest assets in the set.

**One correction already made in the copy, listed here so it is not reintroduced:**
`matrix-arcade-03.png` says "Procedural audio · No audio files to ship." The repo is the other
way round: `useSoundSystem.ts` states "Pre-loaded Matrix Trilogy audio takes priority;
procedural synthesis is the fallback", with around 40 mapped files. The site copy briefly
repeated the tile's claim and no longer does. If tile 03 is ever re-cut, "Procedural audio" is
fine as a feature; "no audio files to ship" is not.
