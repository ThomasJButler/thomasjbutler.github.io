# v4 WEBSITE CONTENT — LOCAL & PRIVATE AI POSITIONING

Copy-paste-ready content for both sites, matching the v4 redesign structure (checked against the current playwright-screenshots). Applies to:

- **thomasjbutler.github.io** (personal/portfolio) — update hero, services cards, NOW section, activity feed
- **thomasjbutler.me** (commercial) — same copy, lead with the services and CTAs

Voice rules applied throughout: UK English, no em dashes, no AI-giveaway phrases. All copy is written to drop into the existing components without layout changes.

---

## 1. HERO (HomePage)

Current: `// I build AI-powered apps` + "Full Stack AI Engineer from the UK"

**Replace typed tagline with (pick one, or rotate them in the typewriter effect):**

- `// I build AI you can own`
- `// private AI. no API bills.`
- `// I build AI-powered apps` (keep) + `// ...that run on YOUR hardware`

**Replace subtitle:**

> Full Stack AI Engineer from the UK. I set up private, local AI systems for businesses. Same results, no per-token bills, your data stays yours.

**Buttons:** keep "View Projects" / "Get in Touch". On thomasjbutler.me, change primary CTA to **"Book a Free AI Audit"**.

---

## 2. SERVICES PAGE ("What I Build")

### Intro paragraph (replace current)

> Fast, resilient digital products, and AI systems you actually own. From private local AI setups to performance-first websites and mobile apps. I handle the architecture, delivery, and support so you can focus on outcomes.

### NEW LEAD CARD — Local & Private AI (put this top-left, before Website & Web Apps)

**Title:** Local & Private AI

**Blurb:** Private AI systems that run on your own hardware. Same results as the APIs for everyday work, no per-token costs, and your data never leaves your building.

**Bullets:**
- Local LLM Setups (Ollama + open models)
- Private Knowledge Systems (RAG)
- AI Cost & Privacy Audits

**Tags:** `Ollama` `Qwen` `RAG` `Pinecone` `Python`

### UPDATED CARD — AI & Automation (revise existing)

**Blurb:** Practical AI features and automation to save time and make data useful. Cloud, local, or hybrid, whatever fits the job.

**Bullets:**
- Custom AI Agents
- n8n Workflows
- Custom ML Models

**Tags:** `Claude` `ChatGPT` `PyTorch` `TensorFlow` `n8n`

(Other four cards stay as they are. Mobile Applications card: consider adding bullet "On-Device AI" given Sanctuary, tags + `Apple Intelligence`.)

### UPDATED CARD — Consultancy & Custom (revise one bullet)

Swap "Architecture Review" bullet to **"AI Cost & Privacy Audits"** on thomasjbutler.me only. Keep as-is on the portfolio.

---

## 3. SERVICES PAGE — NEW SECTION: "WHY LOCAL AI" (optional block between services grid and credentials)

**Heading:** `// WHY_LOCAL_AI`

> Most businesses rent their AI. Every API call is a meter running, and every prompt sends your data to a server you don't control.
>
> The current generation of open models runs on hardware a small business can afford, and for the everyday 90% (drafting, summarising, answering questions from your own documents) you won't tell the difference. At scale, running locally saves 60 to 80% on token costs. And if you handle client data, contracts, or anything GDPR cares about, local means there's no third party to worry about, because nothing leaves the building.
>
> It's not right for everyone, and I'll tell you if it isn't. Every project starts with an honest audit: your usage, your numbers, and a straight recommendation. Sometimes that's "stay on the API". You get that in writing too.

**Three stat tiles (matches the SYSTEM_STATUS tile component):**
- `60-80%` — TOKEN COST SAVINGS AT SCALE
- `0` — DATA SENT TO THIRD PARTIES
- `£0` — PER-TOKEN COSTS

---

## 4. HOME PAGE UPDATES

### NOW section (replace)

> Setting up private, local AI systems for businesses, and building Sanctuary, an on-device AI app for neurodiverse users heading to the App Store. Currently deep in Ollama, RAG pipelines, and open source local AI (I contribute to Odysseus). The theme of everything right now: AI you own, not AI you rent.

**Tag chips:** `Ollama` `RAG` `Local AI` `On-Device`

### RECENT_ACTIVITY feed (add/replace entries)

- `Contributing to Odysseus: open source local AI` — tag `AI` 2026
- `Sanctuary: fully offline on-device AI app (prototype)` — tag `iOS` 2026
- `Launched Run It Local: weekly plain-English AI newsletter` — tag `Writing` 2026
- `Built RAG pipeline with LangChain + Pinecone` — keep, tag `AI` 2025

---

## 5. ABOUT PAGE — ADD PARAGRAPH

After the existing Matrix/origin paragraph:

> These days my focus is local and private AI. I help businesses move from renting intelligence through API bills to owning it: open models on their own hardware, private RAG systems over their own documents, and honest audits that sometimes conclude "you don't need me". I contribute to open source local AI (including Odysseus, PewdiePie's local AI project, which is the strangest line on my CV), and I'm building Sanctuary, a fully offline, on-device AI app for neurodiverse users. If private AI can run on a phone, it can run in your business.

---

## 6. NEWSLETTER SIGNUP BLOCK (both sites, above footer)

**Heading:** Run It Local

**Copy:**

> Keeping up with AI, and how to make it your own. One email a week, plain English, no hype. The week's biggest AI story and what it means for normal businesses, one thing from the local AI world, and one practical thing to try. Written from the workshop floor, not the commentary box.

**Button:** `Subscribe →` (link to Substack; LinkedIn newsletter link alongside)

---

## 7. CTA SECTION (Services page bottom, replace copy on thomasjbutler.me)

**Heading:** Own Your AI

**Copy:** Free consultation, no obligation. If your API bill is creeping up, or you've got data you can't send to a third party, let's do the maths together.

**Buttons:** `Book a Free Audit →` / `Email Directly`

(Portfolio site keeps "Let's Build Something Great".)

---

## 8. SEO / META

**thomasjbutler.me title:** Tom Butler | Local & Private AI Systems, Web Apps & Automation, Liverpool UK

**Meta description:** I set up private, local AI systems that cut business API costs 60-80% and keep your data in-house. Local LLM setups, RAG knowledge systems, AI audits, web apps and automation. Liverpool, UK.

**Portfolio title:** Tom Butler | Full Stack AI Engineer, Local AI & On-Device Systems

**Keywords to work into page copy naturally:** local AI consultant UK, private LLM setup, Ollama consultant, self-hosted AI for business, RAG system developer, GDPR-compliant AI, on-device AI, reduce OpenAI API costs

---

## 9. SANCTUARY TEASER (optional project card, when ready to go public)

**Title:** Sanctuary (in build)

**Blurb:** An accessible communication layer for neurodiverse users, built on top of iOS and Apple Intelligence. Bridges the gap between digital overwhelm and getting things done. Fully offline, fully private: the AI lives on the device and nothing leaves it. Working prototype, App Store bound.

**Tags:** `Swift` `Apple Intelligence` `On-Device AI` `Accessibility`

---

## IMPLEMENTATION ORDER

1. Services page: add Local & Private AI lead card + intro rewrite (biggest positioning win, one component)
2. Hero subtitle + NOW section
3. Newsletter block (needs the Substack link first)
4. Why Local AI section + CTA changes on thomasjbutler.me
5. SEO meta
6. Sanctuary card (hold until you're ready to show it publicly)
