# Redraft brief: ModelViz and ReviewBot Protocol

> **DELIVERED AND WIRED.** The redraft landed and every tile was re-checked against the repos
> before wiring. All of it is accurate. Both projects are now fully wired: cover, gallery,
> diagram and wireframe. Kept as the record of what was asked for and why, and as the reference
> for anyone re-briefing these two projects later.
>
> One structural change from the redraft: **ReviewBot ships four gallery tiles, not five.** The
> OAuth screen and the LangGraph sequence diagram had nothing true left to say once the fiction
> came out, so they were cut rather than redrawn, and the rest renumbered.

Companion to `ASSET-RECUT-LIST.md`, which records *what was wrong*. This one records **what to
draw instead**, with the verified facts, so nothing has to be inferred from the old tiles.

**Original status:** of the 16 tiles first delivered, **5 shipped and 11 were held.**

| Project | Shipped first pass | Held, now redrawn and wired |
| --- | --- | --- |
| ModelViz | `-01`, `-02`, `-03`, `-04`, `wireframe` | cover, `-05`, `diagram` |
| ReviewBot Protocol | none | all 8, delivered as 7 |

## Why this happened, so it does not happen again

The last round inverted. In round 1 the artwork was **ahead** of the site and the site copy was
stale. This time the brief was written from the site's own `projects.ts` entries, and those
entries were wrong, so the artwork rendered the site's mistakes faithfully and at 3200px.

**The artwork is downstream of the copy.** Both `projects.ts` records have now been rewritten
against the repos (commit `6174172`), so a re-brief taken from the corrected copy will not
reproduce any of this. The fact sheets below are that corrected copy, restated for drawing.

## Latitude

Restyling is fine and expected. The real ReviewBot frontend is a light blue and indigo
Tailwind page, and nobody expects a portfolio tile to reproduce that; putting it in the Matrix
visual language is the whole point of these assets. **What must match is structure and claims:**
the screens drawn should be screens that exist, the labels should be labels the app uses, and
no capability should appear that the code does not have.

Brand rules unchanged: no em dashes or en dashes, UK English, plain and direct, one green hue
for owned/local, amber only ever for the metered boundary, no invented numbers.

---

# Part A · ModelViz

Repo: `ThomasJButler/ModelViz`. Live: `https://modelviz.vercel.app/`.

## Verified fact sheet

**True, use freely:**

- Next.js 16, React 19, TypeScript. Deployed on Vercel.
- Four providers, with four real clients: **OpenAI, Anthropic, Google (Gemini), Perplexity**.
- API keys are stored in **`localStorage`** (`lib/storage/apiKeyStorage.ts`). They are **never
  stored on a server** and there is no server-side key anywhere in the repo.
- Usage history is kept **in the browser**, in **IndexedDB**, on a genuine **90-day retention
  policy** (`lib/storage/metricsStorage.ts:473-476`, `ninetyDaysAgo`).
- `MetricsService` is real (`lib/services/MetricsService.ts`), as is the cost, token-efficiency
  and API-health reporting the shipped screenshots show.
- 3D is real: `ForceGraph3D` in `components/visualisations/network-3d.tsx`.
- Routes that exist: `about`, `dashboard`, `analytics`, `playground`, `docs`, `settings`,
  `model-builder`.

**False, do not draw:**

- ~~"keys never touch a server"~~ / ~~"never our servers"~~ / ~~"go straight to the provider"~~
  / ~~"DIRECT CALL"~~ as a blanket claim.
- ~~R3F / react-three-fiber~~ as a stack badge. `@react-three/fiber` is in `package.json` and
  **never imported**; the 3D comes via `react-force-graph-3d`. Say **Three.js** if a 3D badge
  is wanted.
- ~~Streaming~~. Nothing in the repo streams.

## The one thing to get right

`app/api/anthropic/[...path]/route.ts`, `app/api/google/[...path]/route.ts` and
`app/api/perplexity/[...path]/route.ts` are real proxy routes. Each reads the user's key from
an `x-api-key` header and forwards it. **Only OpenAI is called directly from the browser**
(`lib/api/clients/openaiClient.ts` points at `https://api.openai.com/v1`).

So the accurate position, and it is a better story than the absolute:

> Keys are stored **only in your browser and never on a server**. Three of the four providers
> refuse a call from a browser origin, so those requests are **relayed** by ModelViz's own
> route: the key travels with the request, and nothing is stored at the other end.

That is a real engineering constraint (CORS), honestly stated, and it makes Tom look like
someone who knows where the edges are. The blanket version makes him look like someone a
reader can catch out in sixty seconds with the repo open.

## A1. `modelviz.png` (cover) · HIGH

One sentence to replace. Everything else on the tile is correct and should survive: the
`// AI API ANALYTICS HUB` eyebrow, the ModelViz wordmark, the dashboard mockup, and the
`◆ local-first` green badge.

**Currently reads:**
> Track usage, compare providers and optimise cost across four AI APIs in one dashboard. Your
> keys stay in your browser and go straight to the provider, never through a server.

**Replace with:**
> Track usage, compare providers and optimise cost across four AI APIs in one dashboard. Your
> keys are stored only in your browser, never on a server, and every call is metered so you can
> see what it costs.

**Badges:** change `R3F` to `Three.js`. Keep `Next.js 16`, `React 19` and `◆ local-first`.

## A2. `modelviz-05.png` ("HOW IT WORKS") · HIGH

Three edits, structure unchanged.

| Element | Currently | Replace with |
| --- | --- | --- |
| Box 01 subtitle | `localStorage · never our servers` | `localStorage · never stored on a server` |
| Box 02 subtitle | `calls go straight to each provider` | `OpenAI direct, the other three relayed` |
| Amber panel | "…your keys never touch a server. The amber is the thing it measures." | "…and your keys are stored only in your browser. The amber is the thing it measures." |

**Suggested full amber panel text:**
> The app is green: local-first, open source, and your keys are stored only in your browser.
> The amber is the thing it measures: every provider call that costs tokens and sends your
> prompt out. ModelViz just makes that meter impossible to ignore.

## A3. `diagram-modelviz.png` · HIGH

The current diagram has the browser boundary containing `01 KEYS`, `02 PLAYGROUND`,
`05 LOG`, `06 DASHBOARD`, with `03 · DIRECT CALL` and `04 · RESPONSE` beneath it and an amber
provider block. The flow is right; the labelling of step 03 is not.

**Add the relay as its own step**, so the diagram shows six boxes plus the metered block:

```
YOUR BROWSER · nothing stored on a server
  01 · KEYS         localStorage, your device
  02 · PLAYGROUND   pick models, build the prompt
                          |
  03 · CALL         OpenAI goes direct from the browser
                    Anthropic, Google and Perplexity will not accept a
                    browser origin, so they go via ModelViz's own route
                          |
  [ AMBER · METER ] the provider call. tokens billed, latency measured
                          |
  04 · RESPONSE
YOUR BROWSER
  05 · LOG          MetricsService, IndexedDB, 90-day
  06 · DASHBOARD    cost, tokens, health
```

**On colour.** Keep the relay **green**: it is Tom's own stateless code and it stores nothing,
which is exactly what "you own it" means. The **amber stays on the provider call only**, which
is the actual metered boundary. That keeps the palette rule intact rather than bending it.

**Footer line, currently** `>_ keys never touch a server. only the request goes out, straight
to each provider.` **Replace with:**

> `>_ keys are stored only in your browser. three of the four providers will not take a call
> from one, so those requests are relayed.`

**Keep the legend as drawn.** "your browser · local & owned" / "the metered provider calls" is
correct and is one of the better things in the set.

## A4. Not artwork, but worth a look

`modelviz-02.png` shipped and is fine as a tile, but it surfaces a bug in the app itself. It
reads **"Total Spent $25.40"** while the four provider cards below sum to **$34.82**, and their
percentages (50.6 + 40.7 + 17.9 + 27.9) total **137%**. That is ModelViz's own cost panel or
its demo data, not anything the tile invented. Worth fixing in the app; the tile can stay.

---

# Part B · ReviewBot Protocol

Repo: `ThomasJButler/ReviewBot-Protocol`. Not deployed, no demo link.

**All eight tiles are held.** This is not a retouch: the current set depicts a product that does
not exist, so there is no partial fix and the whole set wants drawing again from the facts
below. The good news is that the honest product is a clean, tight four-step story.

## Verified fact sheet

**True, use freely:**

- **FastAPI** backend, Python. Frontend is **Create React App**, plain **JavaScript** (no
  TypeScript, no Next.js).
- Model is **GPT-4o-mini**, hardcoded in `backend/config.py:9`.
- **Exactly one** model call per review: a single `chat.completions.create` in
  `backend/services/review_service.py:55`. The existing amber `1 metered call` badge is
  **correct and is the best single element in the whole set.** Keep it.
- **GitHub webhook** with **HMAC signature verification** (`verify_webhook_signature`).
- Real GitHub API operations: `get_pr_diff`, `get_pr_files`, `post_pr_comment`,
  `post_pr_review`. The reviews endpoint does support **line-level inline comments**.
- Endpoints: `POST /review`, `POST /review/file`, `POST /review/pr`, `POST /webhook/github`,
  `GET /status`.
- **Mock review fallback**: with no `OPENAI_API_KEY` set it returns a local mock review, so the
  whole loop runs without spending anything. Nothing currently depicts this and it is a genuinely
  good detail.
- Auth is a **personal access token** (`GITHUB_TOKEN`) plus a **webhook secret**
  (`GITHUB_WEBHOOK_SECRET`), both from environment variables.

**False, do not draw. None of this exists:**

- ~~LangGraph~~ and ~~LangChain~~. `grep -ri langgraph` returns **zero hits repo-wide**.
  `requirements.txt` is `fastapi, uvicorn, openai, pydantic, requests, python-multipart`.
- ~~`parse_files`, `prioritize_files`, `security_analysis`, `performance_analysis`,
  `quality_analysis`, `documentation_analysis`, `testing_analysis`,
  `synthesize_file_results`, `generate_pr_summary`, `risk_assessment`,
  `generate_github_comments`, `finalize_review`~~. Twelve invented function names.
- ~~"Five passes per file"~~ / ~~"analyse ×5"~~. It is one call, once.
- ~~Risk score~~. No occurrence anywhere.
- ~~GitHub OAuth~~, ~~"Connect your GitHub account"~~, ~~consent screen~~. Token and webhook
  secret in env vars, no OAuth flow.
- ~~Next.js~~, ~~TypeScript~~.
- ~~A dashboard~~ with History, Pull Requests, Security Overview, Team Activity, review-activity
  charts, issue-distribution pie or quality radar. **None of these screens exist.**

## What the app actually looks like

Useful if a UI is drawn, because it should be this UI restyled, not a different product:

- Page heading: **"AI Code Review System"**, sub: "Get intelligent code reviews powered by AI"
- Two status pills: **`AI: Ready`** or **`AI: Mock Mode`**, and **`GitHub: Connected`** or
  **`GitHub: Not Configured`**
- **Three mode tabs: `Paste Code`, `Upload File`, `Review PR`**
- Below the tabs: the input for the chosen mode, a **`Review Code`** button, and an output panel
  holding the returned review as prose

Those three tabs are the honest hero of this project. They are three real entry points into one
reviewer, and no current tile shows them.

## What the review actually checks

The system prompt asks a senior engineer to focus on **four** things. If a "what it checks" tile
is wanted, this is the only honest source, and it should carry **no percentages**:

1. Code quality and best practices
2. Potential bugs or security issues
3. Performance improvements
4. Readability and maintainability

Note it is four, not five; security is folded in with bugs; and there is no documentation pass
and no testing pass.

## The honest flow, for any "how it works" tile

Four steps, one metered:

```
01 · TRIGGER     a pull request, or paste code, or upload a file
                 webhook signature verified with your secret
02 · FETCH       PR diff and changed files, GitHub API, your token
[ AMBER · 03 ]   ONE GPT-4o-mini call. code leaves, tokens billed
04 · COMMENT     posted back to the PR, inline on the lines
```

With a fifth beat available and worth using, because nothing depicts it:

> No API key set? It falls back to a local mock review, so the whole loop runs for free.

## Per-file disposition

| File | What it currently claims | Action |
| --- | --- | --- |
| `reviewbot-protocol.png` (cover) | "A LangGraph agent… security, performance, quality, docs and tests" | **Redraw.** Keep the wordmark, the `// AI-POWERED CODE ANALYSIS` eyebrow and the amber `GPT-4o-mini · 1 metered call` badge. Replace `LangGraph` badge with `Python`. New strapline below. |
| `-01.png` | A dashboard with History, Pull Requests, Security Overview, Team Activity | **Redraw** as the real three-tab screen, or cut |
| `-02.png` | "Connect Your GitHub Account", OAuth, public repos only | **Cut.** There is no OAuth screen to draw. If an auth beat is wanted, it is a webhook secret and a token in a `.env` |
| `-03.png` | LangGraph sequence diagram, twelve invented functions | **Cut.** One model call does not need a sequence diagram |
| `-04.png` | "issue distribution from a real run", 15/25/35/15/10% | **Cut, or redraw** as the four prompt themes with **no numbers** |
| `-05.png` | GitHub OAuth, LangGraph, risk score | **Redraw** to the four-step flow above |
| `diagram-…png` | OAuth, LangGraph, five passes, risk score | **Redraw** to the four-step flow above. Keep the green/amber legend, which is correct |
| `wireframe-…png` | Nav of Dashboard / Review Code / History / Pull Requests, analytics grid, security and team panels | **Redraw** as the real screen: heading, two status pills, three tabs, input, output panel |

## Suggested cover strapline

**Currently reads:**
> A LangGraph agent that reads a pull request the way a senior would: security, performance,
> quality, docs and tests, then leaves inline comments. My teardown of how CodeRabbit works.

**Replace with:**
> A webhook takes your pull request, one GPT-4o-mini call reviews the diff for bugs, security,
> performance and readability, and the notes go back inline on the lines they refer to. My
> teardown of how CodeRabbit works, built small enough to read in an afternoon.

The teardown framing is true and is the point of the project, so it stays. The last clause turns
the honest scope into the selling point rather than something to be quiet about: a reviewer you
can read end to end **is** the interesting thing next to a black-box SaaS.
