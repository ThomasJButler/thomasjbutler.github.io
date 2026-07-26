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

---

# Round 2 · ModelViz and ReviewBot Protocol

Items 1 to 8 above were delivered and are wired in. This round covers the 16 tiles that arrived
next. **Of those 16, five shipped and eleven are held.**

> **RESOLVED.** All eleven were redrawn against `REDRAFT-BRIEF-MODELVIZ-REVIEWBOT.md`, checked
> claim by claim against the repos a second time, and wired. Both projects are now complete:
> cover, gallery, diagram and wireframe. ReviewBot ships four gallery tiles rather than five,
> because the OAuth screen and the LangGraph sequence diagram were cut rather than redrawn.
>
> Kept below as the audit trail. The evidence is the useful part: it is the record of what a
> tile can assert that a repo will not support.

The pattern from round 1 has inverted, and it is worth stating plainly because it is a process
problem rather than a drawing problem. Last time the artwork was *ahead* of the site and the
copy was the stale part. This time the brief was written from the site's own `projects.ts`
entries, and those entries were wrong, so the artwork rendered the site's mistakes faithfully
and at 3200px. **The artwork is downstream of the copy.** The `projects.ts` records for both
projects have now been rewritten against the repos, so a re-brief from the corrected copy will
not reproduce these.

## 9. `reviewbot-protocol-04.png` · invented numbers presented as measured · CRITICAL

Five stat cards: SECURITY 15%, PERFORMANCE 25%, QUALITY 35%, TESTING 15%, DOCS 10%. Under them,
in the terminal line: **"issue distribution from a real run · every finding becomes an inline
comment"**.

There was no run. `ReviewBot-Protocol` has no issue categories, no scoring, and no aggregation
of findings by type. The review is a single `chat.completions.create` call whose reply is a
block of prose. Nothing in the repo could produce this chart.

This is the "no invented numbers" rule broken in the most direct way available: not a number
that is merely unsupported, but one explicitly labelled as coming from real execution.

**Fix:** cut the tile. If a "what it checks" tile is wanted, the honest source is the actual
system prompt, which asks for four things: code quality and best practices, potential bugs or
security issues, performance improvements, readability and maintainability. No percentages, no
docs pass, no testing pass.

## 10. `reviewbot-protocol-03.png` · a fabricated architecture · CRITICAL

A UML sequence diagram headed "THE ENGINE", captioned "A **LangGraph** review pass", with lanes
for `LangGraph Workflow`, `AI Reviewer` and `Workflow State`, and calls to `parse_files`,
`prioritize_files`, `security_analysis(file)`, `performance_analysis(file)`,
`quality_analysis(file)`, `documentation_analysis(file)`, `testing_analysis(file)`,
`synthesize_file_results`, `generate_pr_summary`, `risk_assessment`, `generate_github_comments`
and `finalize_review`.

**None of those twelve functions exists.** `grep -ri langgraph` over the whole repo returns
nothing; `requirements.txt` is `fastapi, uvicorn, openai, pydantic, requests, python-multipart`.
The repo is clean and level with `origin/main`, and there is no other branch, so this is not a
case of the design being ahead of an unpushed version.

**Fix:** cut the tile. The real engine is one model call and does not need a sequence diagram.

## 11. ReviewBot cover, `-01`, `-02`, `-05`, diagram and wireframe · HIGH

All six repeat one or more of the same four claims. Held together because a re-cut of any one
of them needs the same corrected brief.

| Claim, and where it appears | The repo |
| --- | --- |
| **LangGraph** (cover paragraph, cover badge, diagram box 03, `-05` box 03) | Not a dependency, not imported, zero occurrences |
| **GitHub OAuth** (`-02` whole tile, diagram box 01, `-05` box 01) | Webhook HMAC secret plus a personal access token. No OAuth flow, no consent screen |
| **risk score** (diagram box 05, `-05` box 04) | No occurrence anywhere in the repo |
| **A dashboard** with History, Pull Requests, Security Overview, Team Activity, quality radar (cover mockup, `-01`, and the wireframe's callouts) | The frontend is Create React App, five components: a code textarea, a file upload, a PR input, an output box. No dashboard, no history, no analytics |

**What is true and should survive any re-cut:** FastAPI; **GPT-4o-mini** (`backend/config.py:9`);
**exactly one metered call per review**, so the existing amber `1 metered call` badge is
correct and is the best thing in the set; webhook signature verification; and posting back via
the GitHub reviews endpoint, which does support line-level inline comments. It also falls back
to a local mock review when no key is set, which is a genuinely nice detail nothing depicts.

**Fix:** re-brief from the repo, not from these tiles. The honest shape is four steps:
`webhook → fetch diff → one model call → comment on the PR`. That is a smaller product than
the one drawn, and drawing the smaller one accurately is worth more than drawing a larger one
that is not there.

## 12. `modelviz.png` (cover), `modelviz-05.png`, `diagram-modelviz.png` · HIGH

One sentence, in three places, and it is the one claim on this site that must never be wrong:

- Cover: "Your keys stay in your browser and go straight to the provider, **never through a
  server**."
- `-05`: "localStorage · **never our servers**" and "calls go **straight to each provider**",
  plus the amber panel's "your keys never touch a server".
- Diagram: "**03 · DIRECT CALL**" and ">_ keys never touch a server. only the request goes out,
  straight to each provider."

**True for OpenAI only.** `ModelViz` ships `app/api/anthropic/[...path]/route.ts`,
`app/api/google/[...path]/route.ts` and `app/api/perplexity/[...path]/route.ts`. Each reads the
user's key from an `x-api-key` header and forwards it. So for three of the four providers the
key does travel through a server. Only `openaiClient.ts` points at `https://api.openai.com/v1`
directly.

Ranked above the ReviewBot stack errors despite being one sentence, because it is a **privacy**
claim on a site whose entire pitch is privacy, and a reader who opens the repo disproves it in
about a minute.

**Fix, and it is a better tile than the one being replaced.** The proxies are stateless, hold
no server-side key of their own, and the route comment says why they exist: Anthropic, Google
and Perplexity all refuse a browser origin, so a CORS relay is the only option. The honest
version is more interesting than the absolute: *keys are stored only in your browser; three of
the four providers will not accept a call from a browser, so those requests are relayed and the
key travels with them, but it is never stored.* Keep the green/amber split exactly as drawn:
the relay is still your own app, and the metered hop is still the provider call.

**Shipped from this project, unchanged:** `-01`, `-02`, `-03`, `-04` and the wireframe. The
four gallery shots are real screenshots and the wireframe is structural, so all five are fine.

**Not a site issue, but worth knowing:** `modelviz-02` is internally inconsistent. It reads
"Total Spent **$25.40**" while the four provider cards below it sum to **$34.82**, and their
percentages (50.6 + 40.7 + 17.9 + 27.9) total **137%**. That is a bug in ModelViz's own cost
panel or its demo data rather than anything the tile invented, so the tile ships as is. The app
is worth a look.

---

---

# Round 3 · NewsPerspective

Eight tiles, **all eight held** pending a re-cut. That is not a comment on their quality: this
is the best set delivered so far, and it is the first that was clearly briefed **from the repo
rather than from the site**. It knows about the `X-News-Api-Key` header, SQLite, AGPLv3 and the
UK source batching, none of which `projects.ts` ever said. The loop is finally running the
right way round, and the four items below are ordinary errors rather than invented product.

The site record has been corrected ahead of the redraw (`news-perspective` in `projects.ts`),
so a brief taken from it now will be right.

## Verified correct · do not regress these on the re-cut

Listing these explicitly, because there are a lot of them and a redraw could easily lose one:

Next.js 16 (16.1.7) · React 19 (19.2.3) · FastAPI · SQLite · gpt-4o-mini · one model call per
article · the returned fields (sentiment, sentiment score, rewrite decision, rewritten title,
TLDR, good-news flag) · NewsAPI top-headlines · the exact seven-category list · **UK headlines
via named source IDs in one batched request because NewsAPI restricts `country=` to `us`**
(verbatim true, the code comment says the same) · the `X-News-Api-Key` header name · "never
stored on the server", which is right because it is not in `config.py` at all · the free tier
being 100 a day (`DAILY_REQUEST_LIMIT = 100`) · AGPLv3 · v3.0.0 · "up to 50 blocked keywords"
(`MAX_CUSTOM_KEYWORDS = 50`, with a test named `test_put_guardrails_limits_to_50_keywords`) ·
the guardrails themselves (war, suicide, depression, death and grief keyword sets) · the story
comparison and its AI framing analysis · the preserved original headline.

The sentiment pie on `-04` even adds up: 613 + 793 + 386 = 1792, matching its own caption. That
is the exact check ModelViz's cost panel failed.

**Both amber meters are correct.** A NewsAPI rate meter and an OpenAI token meter are two
genuinely different meters and both are real, so this is a legitimate extension of the amber
rule rather than a dilution of it.

## 13. `diagram-newsperspective` and `newsperspective-05` · the refresh arithmetic · HIGH

Both tiles say **"~14 requests a refresh"** and **"100 a day, so about seven refreshes"**.

`article_processor.process_new_articles` loops `for country in ("us", "gb")`:

- `us` calls `fetch_all_categories`, which iterates the 7 `CATEGORIES` -> **7 requests**
- `gb` calls `_fetch_uk_by_sources`, which joins 8 source IDs into a single `sources=` param
  -> **1 request**

So it is **8 requests a refresh**, and 100 / 8 is **about 12 refreshes**, not 7.

The tiles contradict themselves here. Their own footnote explains that UK headlines come
through named source IDs in one batched request because `country=` is us-only, and that is
precisely why the number is no longer 14. **14 is the pre-deprecation figure**: 7 US categories
plus 7 UK categories, from before NewsAPI dropped `country=gb`.

**Fix:** "about 8 requests a refresh" and "roughly 12 refreshes a day". The argument gets
stronger, not weaker. Twelve refreshes a day on a free tier reads better than seven, and the
`-05` line about the AI getting time to read a story rather than racing the news still lands.

## 14. `newsperspective-04` · the settings panel is clipped · HIGH

The panel is cut off on **both** edges. What is visible: "gs" (Settings), "your NewsAPI key and
content preferences" (Manage missing), "nly in this browser" (Stored o missing), "topics"
(Blocked missing), "natching these keywords" (Articles m missing), "ve Key" (Sa missing), and a
second button sliced off at the right.

The content is correct and the right-hand half of the tile is fine. It is purely a composition
problem.

**Fix:** re-compose so the panel sits fully inside the frame.

**While it is open, a palette question:** the Save Key button is **red**. If that is the app's
real styling then the tile is being honest and it can stay. But on this site red is not a
palette colour, and on a primary action it reads as danger rather than as a save. Worth a look.

## 15. `newsperspective-03` · the caption contradicts its own screenshot · LOW

The caption reads "One outlet is neutral, the other urgent. Same facts." The tile directly above
it shows **positive** (BBC News) and **neutral** (Deadline). Neither is urgent.

**Fix:** describe what is actually drawn, e.g. "One outlet reads it positive, the other neutral.
Same facts." Same rule the SQL-Ball wireframe caption broke: the caption describes the image, not
an idea of the image.

## 16. `diagram-newsperspective` · "116 backend tests" · DECIDED, LEAVE AS IS

**Tom's call: keep 116.** It comes from the repo's own README, "Backend tests (116 tests across
6 modules)", so it is a documented figure rather than an invented one.

Recorded here only so a later pass does not "helpfully correct" it: an independent count of
`def test_` across the six modules gives **123**, with zero skip or xfail markers and no
`conftest.py`, `pytest.ini` or `pyproject.toml` to change collection. The suite runs under
`python -m unittest`, which collects only methods on `TestCase` subclasses, so anything defined
at module level or on a plain class would be counted by a grep and not by the runner. Both
numbers can be right at once.

If it is ever re-derived, derive it by running the suite. Do not grep for it.

## Minor, no action

`newsperspective-01` reports 1,713 articles processed while `-04` reports 1,792 analysed.
Different snapshots of a live archive, which is fine. Only noticeable if the two are read side
by side.

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
