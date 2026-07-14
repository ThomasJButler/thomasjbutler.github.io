# Pricing: what the site says, and why

The numbers on `/services` come from `PRICING`, `ENGAGEMENT_TERMS` and `RETAINER` in
`src/lib/content.ts`. They are one-line edits. This file is the reasoning behind them, so
that when a buyer pushes back you are arguing from data rather than from nerve.

**A caveat to read first.** The regional figures below are for the **North West**, because
that is what I researched. The site says **York**. The headline conclusion does not depend
on which of those it is (the point is *not London*, and the London gap is small either
way), but if you want Yorkshire-specific medians, that is a re-run.

---

## The short version

| | Number | Confidence |
|---|---|---|
| Day rate, target | **£750** (band £650 to £850) | High |
| Day rate, hard floor | **£500** | High |
| AI Cost & Privacy Audit | **from £4,800** | Medium-high |
| Local LLM Setup | **from £12,000** | Medium-low, mostly inferred |
| Private RAG System | **from £18,000** | Medium |
| Care & Tuning retainer | **from £950/month** | Medium |
| Extra revision round | **£1,200** | Convention, not a market rate |

The day rate is a **backstop for negotiation, not the product.** Do not publish it. The
packages are the product, and section 4 is the evidence for why.

---

## 1. The day rate

UK median daily contract rates, IT Jobs Watch, six months to 13 July 2026. These are real
advertised contract rates, not a survey.

| Skill | Median | 75th pct | 90th pct | Sample | YoY |
|---|---:|---:|---:|---:|---:|
| AI Agents | £588 | £730 | £900 | 376 | **+6.82%** |
| AI Engineer | £575 | £675 | £861 | 242 | +4.55% |
| Retrieval-Augmented Generation | £558 | £650 | £728 | 226 | **+4.30%** |
| AI (all) | £550 | £675 | £775 | 2,780 | flat |
| LLM | £550 | £650 | £750 | 598 | −4.35% |
| Generative AI | £550 | £651 | £775 | 772 | **−6.38%** |
| GDPR | £550 | £650 | £738 | 620 | +4.76% |

**Read the YoY column.** Generic "Generative AI" and "LLM" rates *fell*. **Agentic and RAG
rates rose.** You are specialised in the half that is still appreciating, and you can say
so with a citation.

You are also stacking two premium skills, not one: GDPR carries the same median as AI
itself, and your whole pitch is compliance-shaped.

### The regional discount is mostly imaginary

| | Median AI contract rate |
|---|---:|
| London | £563 |
| UK overall | £550 |
| North West | £530 (**+7.94% YoY**) |

**A 6% gap, not 30%.** And the gap is closing: North West rates rose ~8% while London's
fell slightly. "I'm not in London so I charge less" is the single most expensive belief
available to you.

### Why £750 and not £530

A contractor on £530/day has the work handed to them: someone else found the client,
scoped the project, and pays for consecutive days. You do all of that yourself, and you
bill **120 to 160 days a year, not 220**, once you subtract business development, admin,
and the gaps between engagements.

To match a £530/day contractor working 200 days (£106k), at 140 billable days you need
**£757/day**. At a generous 160 days, **£662/day**. That arithmetic is the cleanest thing
to say out loud in a negotiation, because the other party can check it.

Three unrelated 2026 sources put UK freelance AI consulting at **£400 to £900/day**
(Helium42 £400-800; The AI Consultancy £500-900; Winder.ai's boutique tier far higher).
You are structurally a freelancer but positionally a boutique specialist, so you belong at
the top of that band.

### The floor: £500

£400/day is the **10th percentile of the entire UK AI contract market**. Below £500 you are
earning less than nearly every AI contractor in Britain while carrying every risk they do
not carry. Pricing like a web developer at £300/day would put you 25% below that 10th
percentile.

And the low price does not just cost money, it **disqualifies you**. Your buyer's actual
problem is "our data must not leave the building". That is a risk-averse buyer, and to
them £300/day does not read as good value. It reads as *this person does not understand
what is at stake*.

---

## 2. The three offers

**AI Cost & Privacy Audit, from £4,800.** Nearest published UK comparators run £3,500
(a readiness questionnaire) to £8,000. Yours is a technical audit: real data-flow mapping
and real spend modelling. Do not go below £3,500; undercutting the nearest competitor buys
nothing.

**Local LLM Setup, from £12,000.** *This is the weakest number here and you should know
that.* There is no published price anywhere for "Ollama on your hardware, handed over, team
trained" — I found none. It is built from effort (10 to 15 days) times day rate, bounded by
adjacent products: an £8,000 transactional agent, a £15,000 "discovery and pilot". Every
comparator I found sits at or above £8,000, so the anchor is not exposed, but expect to
move it after you have sold two or three.

**Private RAG System, from £18,000.** The best direct comparator is a London agency selling
"Enterprise RAG Chatbots **from £15,000**". What you built is more than a chatbot: policy
grounding, confidence scoring, an audit trail. Pricing a compliance-grade private system
below an agency's off-the-shelf chatbot would be self-harm.

**One costing warning, from two independent sources: data cleaning and preparation is 30 to
50% of a RAG project.** If you quote a fixed fee before seeing the documents, you will eat
that. The audit is the fix, and that is a happy commercial accident: sell the audit, scope
the RAG properly, then quote it with confidence.

---

## 3. Iterations

Now on the site, because a fixed fee with no revision limit is an hourly job at a bad rate
that nobody has admitted to yet. There is a documented case of a $3,000 project turning
into **14 rounds over 3 months** for want of this paragraph.

**Included:** two rounds per deliverable, where a round is *one consolidated set of
changes* (that definition is the load-bearing part: it stops a trickle of one-liners
becoming ten free rounds). Plus a 30-day defect warranty, which is the software convention
and matches what UK competitors ship.

**Charged:** £1,200 per further round, fixed, so the client can decide whether a change is
worth it *before* asking. New scope is quoted before work starts, never after.

**Avoid publishing an hourly rate.** Hourly billing rewards inefficiency and penalises
expertise, which is precisely backwards for a specialist whose value is doing in two days
what a generalist does in ten.

---

## 4. Why the packages are the product

From a survey of ~1,000 consultants (Consulting Success):

- **52% of specialists charge £10k+ per project. Only 18% of non-specialists do.**
- **81% of consultants charging £20k-50k per project are specialists.**
- **Only 10% of consultants price by the day at all.**

The retainer matters more than it looks. "AI you own, not AI you rent" has an honest
corollary: **there is no vendor to call when it drifts.** That is not a hole in the pitch,
it is the pitch. *"You own it outright. That means you maintain it, or I do."* No SaaS
competitor can make that offer, because with SaaS the maintenance is invisible and already
priced in.

---

## 5. The counter-evidence

You should know this before you quote £750, because a well-prepared buyer might.

**YunoJuno's 2026 rates report** (182,000+ real bookings) puts UK "AI & Automation" at
**£472/day**, *below* general software engineering. I think that bucket bundles low-end
automation and prompt work with real ML engineering, and its data is older than the July
2026 IT Jobs Watch cut. But it is real booked-rate data and I am not going to hide it from
you. It is the strongest argument that **£650 to £850 has to be earned in the sales
conversation, not assumed.**

Two of the freelance-band sources (Helium42, The AI Consultancy) are marketing content from
firms with an interest in making AI consulting look expensive. Their agreement with each
other is meaningful; discount their absolute numbers slightly.

---

## Sources

IT Jobs Watch (contract medians, July 2026) ·
[AI Engineer](https://www.itjobswatch.co.uk/contracts/uk/artificial%20intelligence%20engineer.do) ·
[AI Agents](https://www.itjobswatch.co.uk/contracts/uk/ai%20agents.do) ·
[RAG](https://www.itjobswatch.co.uk/contracts/uk/retrieval-augmented%20generation.do) ·
[Generative AI](https://www.itjobswatch.co.uk/contracts/uk/generative%20ai.do) ·
[GDPR](https://www.itjobswatch.co.uk/contracts/uk/gdpr.do) ·
[London](https://www.itjobswatch.co.uk/contracts/london/artificial%20intelligence.do) ·
[North West](https://www.itjobswatch.co.uk/contracts/north%20west/artificial%20intelligence.do)

[Winder.ai, AI Consulting Costs 2026](https://winder.ai/ai-consulting-costs-2026-hourly-rates-poc-production/) ·
[The AI Consultancy, AI Implementation Cost UK](https://theaiconsultancy.ai/blog/how-much-does-ai-implementation-cost-uk) ·
[Helium42, AI Consultancy Pricing UK](https://helium42.com/blog/ai-consultancy-pricing-uk) ·
[Softomate, AI Chatbot Development Cost UK](https://www.softomatesolutions.com/ai-chatbot-development-cost-uk/) ·
[YunoJuno 2026 Rates Report](https://www.yunojuno.com/freelancer-rates-report) ·
[Consulting Success, Consulting Fees Study](https://www.consultingsuccess.com/consulting-fees) ·
[Delivvo, Freelance Revision Policy](https://delivvo.io/blog/freelance-revision-policy-protect-your-time) ·
[Simon-Kucher, Price Anchoring](https://www.simon-kucher.com/en/insights/price-anchoring-unlock-growth-behavioral-pricing)
