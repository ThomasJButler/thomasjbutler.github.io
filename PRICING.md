# Pricing: what the site says, and why

The numbers on `/services` come from `PRICING`, `ENGAGEMENT_TERMS` and `RETAINER` in
`src/lib/content.ts`. They are one-line edits. This file is the reasoning behind them, so
that when a buyer pushes back you are arguing from data rather than from nerve.

## The short version

| | Number | Confidence |
|---|---|---|
| Day rate, target | **£750** (band £690 to £850) | High |
| Day rate, hard floor | **£650** | High |
| AI Cost & Privacy Audit | **from £6,375** (8.5 days) | Medium-high |
| Local LLM Setup | **from £12,750** (17 days) | Medium-low, mostly inferred |
| Private RAG System | **from £18,375** (24.5 days, quote regulated scope at £30k+) | Medium |
| Care & Tuning retainer | **from £1,425/month** | Medium |
| Extra revision round | **£1,275** | Convention, not a market rate |

The day rate is a **backstop for negotiation, not the product.** Do not publish it. The
packages are the product, and section 4 is the evidence for why.

### Why the packages are not round numbers

Every package price is £750 multiplied by a real number of days, so all three are multiples of
£375, half a day. That is precision, not charm pricing, and the distinction matters:

- **Precision** signals a computed figure. Buyers adjust less far down from a precise anchor
  than from a round one (Janiszewski & Uy 2008, *Psychological Science*, on anchor precision;
  Mason, Lee, Wiley & Ames 2013, *JESP*, on precise opening offers, where a precise number also
  makes the other side infer you are informed).
- **Charm endings** (£5,950, £925) are the opposite signal. They read as retail discounting,
  and for premium or expertise-led purchases round numbers actually outperform them
  (Wadhwa & Zhang 2015, *JCR*). Using one here would have quietly undone §0: the audit went
  **up** from £4,800 to £6,000 precisely so it would not read as the cheap option next to a
  London rival's published £6,500.

The prices moved **up** by 2-6% on the switch, never down. And because the arithmetic is a
single rate times a day count, anyone who divides by 750 recovers the rate card, which is the
whole point of looking considered rather than merely looking odd.

---

## 0. Yorkshire: there is no discount to apply

This was the question, so here is the answer first. **Yorkshire is not a cheap region for
AI.** IT Jobs Watch contract medians, six months to 13 July 2026:

| Location | Median | 25th | 75th | **n (rates)** | YoY |
|---|---:|---:|---:|---:|---:|
| London | £563 | £475 | £688 | 1,592 | −0.2% |
| **Yorkshire** | **£550** | £500 | £600 | **105** | **+10.0%** |
| UK overall | £550 | £463 | £675 | 2,780 | −7.2% |
| Leeds | £550 | £500 | £600 | 31 | +10.0% |
| Sheffield | £518 | £472 | £594 | 66 | +0.5% |
| Manchester | £513 | £429 | £604 | 80 | −2.4% |
| York | £550 | – | – | **5** | ⚠️ **noise, do not quote** |
| Bradford / Hull | – | – | – | **0** | no rate data at all |

**Yorkshire sits level with the UK median and 2.3% under London.** For *Generative AI*
specifically, Yorkshire is **£575 — above London's £565**. And Yorkshire AI rates rose
**+10% YoY while the UK fell 7%**.

### Why the "northern discount" doesn't apply to you

It is real for generalists and it evaporates for specialists:

| Skill | Yorkshire vs London |
|---|---:|
| Permanent AI salary (employee) | **−23.5%** |
| Contract Python (n=308) | −9.1% |
| Contract Azure (n=248) | −9.1% |
| **Contract AI** | **−2.3%** |
| **Contract Generative AI** | **+1.8%** |

**The geography penalty decays as you move from "a body in a seat" to "a specialist
selling an outcome."** You are selling the outcome. Remote ML and GenAI contracts price at
**£600 — above London** — which is the same fact from another angle: nobody pays a
location, they pay a capability.

### Sector beats geography by roughly five to one

Regulated buyers carry a **20-45% premium** (finance +20-40%, healthcare +25-45%, legal
+20-35%, public sector +25-45%). The London premium in hard data is **0-7%**. **Who your
client is moves the price about five times more than where you live** — and NHS England,
DWP, the FCA, the Bank of England and 28 of the UK's top-100 law firms all have major Leeds
operations. They are nationally funded. They do not procure at "Yorkshire rates".

### The competitor already in your back garden

**Agentic AI Associates** — London-HQ'd, with a Leeds landing page covering *"Bradford and
Huddersfield to York, Harrogate, and Sheffield"*. Published prices:

> **£6,500 diagnostic · £850/day · £10,000/month retainer**

They are selling into your patch and **not discounting for Yorkshire.** That single fact is
why the audit moved from £4,800 to £6,000 and the retainer from £950 to £1,400.

### And "pricing to the local market" isn't even a coherent plan

**York had 5 AI contract ads in six months. Bradford had 5, Hull 11, both with zero rate
data.** There is no local market to price to. You are selling to Leeds, Manchester, London
and remote — so you price to the national market, which pays the same as London anyway.

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

### The floor: £650 (raised from £500)

I had this wrong, and the Yorkshire data is what corrected it. **£500 is the 25th
percentile of the Yorkshire AI contract market.** A "floor" that puts you in the bottom
quartile of the very market you suspected was too poor to afford you is not a floor, it is
a discount you applied for a regional penalty that does not exist in your specialism.

The arithmetic: at £500/day and a realistic **120-160 billable days**, you gross
**£60,000-£80,000** before costs. **That is below the Leeds *permanent* AI salary of
£67,500** — with none of the security, the pension, or the paid holiday, and all of the
sales risk. That is not a floor worth defending.

At **£650**, a 140-day year is £91,000, which finally clears the salaried alternative by
enough to pay for the risk you are carrying.

Pricing like a web developer at £300/day would put you **25% below the 10th percentile of
the entire UK AI contract market.**

And the low price does not just cost money, it **disqualifies you**. Your buyer's actual
problem is "our data must not leave the building". That is a risk-averse buyer, and to
them £300/day does not read as good value. It reads as *this person does not understand
what is at stake*.

---

## 2. The three offers

**AI Cost & Privacy Audit, from £6,375** (8.5 days at £750)**.** Raised from £4,800, then from £6,000. A London consultancy sells
the same diagnostic *into Leeds* at a published **£6,500**. Undercutting them by 26% buys
you nothing from a buyer whose actual problem is risk, and the entry product anchors
everything you sell afterwards. Published UK comparators run £3,500 (a readiness
questionnaire) to £8,000; yours is a technical audit with real data-flow mapping and real
spend modelling, so it belongs at the top of that band, not the bottom.

**Local LLM Setup, from £12,750** (17 days at £750)**.** *This is the weakest number here and you should know
that.* There is no published price anywhere for "Ollama on your hardware, handed over, team
trained" — I found none. It is built from effort (10 to 15 days) times day rate, bounded by
adjacent products: an £8,000 transactional agent, a £15,000 "discovery and pilot". Every
comparator I found sits at or above £8,000, so the anchor is not exposed, but expect to
move it after you have sold two or three.

**Private RAG System, from £18,375** (24.5 days at £750)**.** The best direct comparator is a London agency selling
"Enterprise RAG Chatbots **from £15,000**". What you built is more than a chatbot: policy
grounding, confidence scoring, an audit trail. Pricing a compliance-grade private system
below an agency's off-the-shelf chatbot would be self-harm.

**Care & Tuning retainer, from £1,425/month.** Raised from £950, then from £1,400. £950 was *under water*:
half a day of tuning is £375 at your target rate, leaving £575 to cover monitoring, model
updates and re-indexing. Every published comparator is higher (UK run-rate £1,000-£5,000;
the London firm selling into Leeds charges **£10,000/month**). £950 was not competitive, it
was just cheap.

**One costing warning, from two independent sources: data cleaning and preparation is 30 to
50% of a RAG project.** If you quote a fixed fee before seeing the documents, you will eat
that. The audit is the fix, and that is a happy commercial accident: sell the audit, scope
the RAG properly, then quote it with confidence.

---

## 3a. Two things that will get you caught out, so don't say them

**Do not claim the NHS or law firms *cannot legally* use OpenAI or Anthropic.** They can.
NHS England's own offshoring guidance permits public cloud, and the **UK-US Data Bridge**
(in force since October 2023) makes certified US transfers lawful with no transfer impact
assessment. A competent CIO will take that claim apart in front of you, and you will lose
the room.

What *is* true, and is a strong argument, is **friction and liability**: a DPIA, DTAC, DSPT
and SIRO/Caldicott sign-off, with the NHS body retaining full controller liability for
whatever leaves. "You can, but here is everything you have to carry in order to" is a
better pitch than "you can't", and it has the advantage of being correct. Your site's FAQ
already puts it this way ("no third-party processor to assess, no data-transfer agreement
to sign"), which is right. Keep it that way in your LinkedIn and YouTube content.

**Your real competitor is Microsoft, not OpenAI.** NHS England is rolling **Copilot out to
500,000+ staff**. A live Yorkshire NHS trust's AI policy bans ChatGPT for patient data and
names **Copilot Chat as the approved alternative**. Azure appears in 90% of York's permanent
AI job ads. The sentence that kills your deals is not "we like OpenAI", it is **"we already
have an E5 licence."** The site now answers that objection head-on in the FAQ, and the
honest answer wins more than a dismissive one: if Copilot does the job, say so, and sell
the audit that proves whether it does.

---

## 3. Iterations

Now on the site, because a fixed fee with no revision limit is an hourly job at a bad rate
that nobody has admitted to yet. There is a documented case of a $3,000 project turning
into **14 rounds over 3 months** for want of this paragraph.

**Included:** two rounds per deliverable, where a round is *one consolidated set of
changes* (that definition is the load-bearing part: it stops a trickle of one-liners
becoming ten free rounds). Plus a 30-day defect warranty, which is the software convention
and matches what UK competitors ship.

**Charged:** £1,275 per further round, fixed, so the client can decide whether a change is
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
**£472/day**, *below* general software engineering, and finds AI carries only a ~1.16% rate
uplift. I think that bucket bundles low-end automation and prompt work with real ML
engineering. But it is real booked-rate data and I am not going to hide it from you. It is
the strongest argument that **£690 to £850 has to be earned in the sales conversation, not
assumed.**

**The scarcity premium is eroding.** UK AI rates are **−7.2% YoY**, GenAI −6.4%, LLM −4.3%,
London GenAI −9.6% — all while demand climbs. Demand up and rates down means supply is
catching up. The window where "hardly anyone does this" is worth money is open now, not
indefinitely.

**Your niche barely exists as a procurement category.** UK-wide, *Ollama* appears in **9
contract ads**. You are not entering a market, you are creating a category — which means
longer sales cycles, more educating, and **no inbound demand to catch**. This is the real
argument for the content plan, and also the reason not to expect it to pay quickly:
consensus is **6-12 months** to consistent inbound, and for a new solo consultant,
referrals and direct outreach produce clients materially faster than content does. Content
compounds; it does not start.

**And a Yorkshire SME genuinely cannot pay £18,375.** London's output per hour is 28.5%
above the UK average and Yorkshire buyers are, on average, poorer. Your *named* targets
(NHS England, DWP, FCA, Bank of England, top-100 law firms) are nationally funded and this
doesn't touch them. But do not pretend the local corner shop is your market.

Two of the freelance-band sources (Helium42, The AI Consultancy) are marketing content from
firms with an interest in making AI consulting look expensive. Their agreement with each
other is meaningful; discount their absolute numbers slightly.

**The one caveat that undercuts every day-rate number here:** IT Jobs Watch measures
*advertised contract rates for staff-augmentation roles* — what the market pays for a body
in a seat. It does not measure what it pays for a delivered outcome. Every day rate in this
file inherits that limitation. It is a floor-setting proxy, not a ceiling.

---

## 6. If you're underpriced, it isn't because of Yorkshire

The evidence says you do **not** need to price lower because of where you are. You may need
to price lower because you are **unproven** — and those are different problems with
different fixes.

The cure for "no track record" is a cheap, low-risk **entry product** (that is what the
audit is for) plus a case study you can point at. It is **not** a discounted ladder.
Discounts to the ladder are very hard to undo, because anchors are sticky: the first number
a market hears from you is the number it remembers.

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
