/**
 * v5 "The Operator" content layer — the Local & Private AI positioning.
 *
 * Copy is verbatim from the design handoff (design_handoff_v5_operator-v4-redesign).
 * Keep it here rather than inline in pages so the wording is reviewable in one place.
 */
import {
  Cpu,
  Database,
  Globe,
  GitBranch,
  Headset,
  Palette,
  Bot,
  Smartphone,
  FileText,
  type LucideIcon,
} from 'lucide-react';

export const LINKS = {
  github: 'https://github.com/ThomasJButler',
  linkedin: 'https://www.linkedin.com/in/thomasjbutler',
  email: 'dev@thomasjbutler.me',
  commercial: 'https://thomasjbutler.me',
  /**
   * Run It Local. Now a real URL, so `NewsletterStrip` swaps "Coming soon" for a working
   * Subscribe link on both the home page and /services on its own.
   *
   * The publication is empty at the time of writing, which is fine: a subscribe box that
   * collects an address before the first post exists is how you have an audience waiting for
   * it. What would not be fine is the button claiming to subscribe you to nothing, and that is
   * exactly the state this field just left.
   */
  substack: 'https://thomasjbutler.substack.com/' as string | null,
};

/* ─── Hero ───
 *
 * The headline is the argument, not a greeting.
 *
 * It used to read "Hey, I'm Tom", with a rotating typed line underneath. That is a
 * portfolio hero: it spends the most valuable line on the page introducing the author to
 * a reader who has not yet been told why they should care. The og:image has said "AI you
 * own, not AI you rent" for months and it is a far better opening line than the page
 * itself had, which is a sign the page was pointed the wrong way round.
 *
 * The name is not here and does not need to be. The header wordmark two lines above already
 * reads `> tom_butler`, so the eyebrow was saying it twice inside the same screenful. What is
 * left is the part that is not repeated anywhere else on the page: what he does and where.
 */

export const HERO_EYEBROW = '// full stack ai engineer · york, uk';

/** Two lines on purpose: the turn is the whole point of the sentence. */
export const HERO_H1 = ['AI you own,', 'not AI you rent.'];

export const HERO_SUB =
  'Private, local AI for businesses. Same results as the APIs for everyday work, no per-token bills, and your data never leaves the building.';

/** The scripted console session. Types once, then holds a blinking prompt. */
export interface ConsoleStep {
  cmd: string;
  out: { text: string; highlight?: boolean }[];
}

export const CONSOLE_SCRIPT: ConsoleStep[] = [
  {
    cmd: 'whoami',
    out: [{ text: 'tom butler · full stack AI engineer · york, uk' }],
  },
  {
    cmd: 'ollama run qwen3 "summarise ./client-docs"',
    out: [
      { text: '▸ 42 tok/s · running on local hardware' },
      { text: '▸ done · nothing left the machine' },
    ],
  },
  {
    cmd: 'netstat --external',
    out: [{ text: '0 bytes sent to third parties', highlight: true }],
  },
  {
    cmd: 'ls ~/services',
    out: [{ text: 'local-llm-setups/   private-rag/   ai-cost-audits/' }],
  },
];

/* ─── Home: NOW + recent activity ─── */

export const NOW_COPY =
  'Setting up private, local AI systems for businesses, and building Sanctuary, an on-device AI app for neurodiverse users heading to the App Store. Currently deep in Ollama, RAG pipelines, and open source local AI (I contribute to Odysseus). The theme of everything right now: AI you own, not AI you rent.';

/*
 * The tags used to carry a `tone` of 'cyan' | 'amber', assigned with no rule anyone could
 * state: Ollama was cyan, On-Device was amber, Sanctuary was amber. A second and third hue
 * used decoratively is just noise, and it spent the only colours the palette had left to
 * shout with. Amber now means exactly one thing (see --meter in app.css: the meter
 * running, the per-token bill, the data leaving) and it is not squandered on a chip that
 * says "RAG".
 */
export const NOW_TAGS: string[] = ['Ollama', 'RAG', 'Local AI', 'On-Device'];

export const RECENT_ACTIVITY: {
  icon: LucideIcon;
  text: string;
  badge: string;
  year: string;
}[] = [
  {
    icon: GitBranch,
    text: 'Contributing to Odysseus: open source local AI',
    badge: 'AI',
    year: '2026',
  },
  {
    icon: Smartphone,
    text: 'Sanctuary: fully offline on-device AI app (prototype)',
    badge: 'iOS',
    year: '2026',
  },
  {
    icon: FileText,
    text: 'Starting Run It Local: a weekly plain-English AI newsletter',
    badge: 'Writing',
    year: '2026',
  },
  {
    icon: Bot,
    text: 'Built RAG pipeline with LangChain + Pinecone',
    badge: 'AI',
    year: '2025',
  },
];

/* ─── Services ─── */

export const SERVICES_INTRO =
  'Fast, resilient digital products, and AI systems you actually own. From private local AI setups to performance-first websites and mobile apps. I handle the architecture, delivery, and support so you can focus on outcomes.';

export interface Service {
  title: string;
  icon: LucideIcon;
  description: string;
  highlights: string[];
  tech: string[];
  /** The Local & Private AI card: spans both columns, gets the local_first flag. */
  lead?: boolean;
}

export const SERVICES: Service[] = [
  {
    title: 'Local & Private AI',
    icon: Cpu,
    lead: true,
    description:
      'Private AI systems that run on your own hardware. Same results as the APIs for everyday work, no per-token costs, and your data never leaves your building.',
    highlights: [
      'Local LLM Setups (Ollama + open models)',
      'Private Knowledge Systems (RAG)',
      'AI Cost & Privacy Audits',
    ],
    tech: ['Ollama', 'Qwen', 'RAG', 'Pinecone', 'Python'],
  },
  {
    title: 'Website & Web Apps',
    icon: Globe,
    description:
      'Responsive, performance-first websites and web apps built with modern stacks.',
    highlights: ['React/Next.js', 'Performance & SEO', 'Accessible & Responsive'],
    tech: ['React', 'TypeScript', 'WordPress', 'HubSpot', 'Next.js'],
  },
  {
    title: 'Backend & APIs',
    icon: Database,
    description:
      'Robust servers and APIs that scale with your product. Production-ready from day one.',
    highlights: ['Node.js/Python', 'PostgreSQL/MongoDB', 'Auth & Security'],
    tech: ['Node.js', 'Django', 'PostgreSQL', 'GraphQL', 'Flask'],
  },
  {
    title: 'AI & Automation',
    icon: Bot,
    description:
      'Practical AI features and automation to save time and make data useful. Cloud, local, or hybrid, whatever fits the job.',
    highlights: ['Custom AI Agents', 'n8n Workflows', 'Custom ML Models'],
    tech: ['Claude', 'ChatGPT', 'PyTorch', 'TensorFlow', 'n8n'],
  },
  {
    title: 'Mobile Applications',
    icon: Smartphone,
    description: 'Cross-platform apps with native feel and store readiness.',
    highlights: ['React Native', 'iOS & Android', 'On-Device AI'],
    tech: ['React Native', 'Expo', 'iOS', 'Apple Intelligence'],
  },
  {
    title: 'Design & Brand',
    icon: Palette,
    description:
      'Clear, usable interfaces and identity design that scales with your product.',
    highlights: ['UI/UX Design', 'Brand Identity', 'Design Systems'],
    tech: ['Figma', 'Adobe XD', 'UI/UX', 'Wireframes'],
  },
  {
    title: 'Consultancy & Custom',
    icon: Headset,
    description:
      'Architecture reviews, training and bespoke engineering for special requirements.',
    highlights: ['Architecture Review', 'Team Training', 'Bespoke Solutions'],
    tech: ['DevOps', 'Git', 'Agile', 'Testing', 'Cloud'],
  },
];

/* ─── Services: why local AI ─── */

export const WHY_LOCAL_AI = [
  "Most businesses rent their AI. Every API call is a meter running, and every prompt sends your data to a server you don't control.",
  "The current generation of open models runs on hardware a small business can afford, and for the everyday 90% (drafting, summarising, answering questions from your own documents) you won't tell the difference. At scale, running locally saves 60 to 80% on token costs. And if you handle client data, contracts, or anything GDPR cares about, local means there's no third party to worry about, because nothing leaves the building.",
  "It's not right for everyone, and I'll tell you if it isn't. Every project starts with an honest audit: your usage, your numbers, and a straight recommendation. Sometimes that's “stay on the API”. You get that in writing too.",
];

/*
 * The argument, as a contrast rather than three green numbers.
 *
 * Three stats in a row said what you gain and never once showed what you are being saved
 * *from*, which is the more persuasive half: the reader has to already agree that renting
 * is a problem for "£0 per token" to land. Set the two columns side by side and the
 * palette does the arguing (see --meter in app.css: amber is the meter running, green is
 * what you own). It is also the same trio rendered once instead of on two pages.
 */
export const RENT_VS_OWN = {
  rent: {
    label: 'Renting it',
    points: [
      { value: 'per token', note: 'A meter that runs every time anyone uses it' },
      { value: 'their server', note: 'Your prompts and your documents, on someone else’s hardware' },
      { value: 'their terms', note: 'A processor to assess, and a retention policy to trust' },
    ],
  },
  own: {
    label: 'Owning it',
    points: [
      { value: '£0', note: 'Per-token cost, however heavily your team uses it' },
      { value: '0 bytes', note: 'Sent to third parties. Nothing leaves the building' },
      { value: '60-80%', note: 'Lower TOTAL cost at scale, once your own hardware and power are counted' },
    ],
  },
} as const;

/* ─── About: current focus ─── */

export const ABOUT_CURRENT_FOCUS =
  "These days my focus is local and private AI. I help businesses move from renting intelligence through API bills to owning it: open models on their own hardware, private RAG systems over their own documents, and honest audits that sometimes conclude “you don't need me”. I contribute to open source local AI (including Odysseus, PewdiePie's local AI project, which is the strangest line on my CV), and I'm building Sanctuary, a fully offline, on-device AI app for neurodiverse users. If private AI can run on a phone, it can run in your business.";

export const ABOUT_CURRENT_FOCUS_TAGS: string[] = [
  'Ollama',
  'Private RAG',
  'Odysseus',
  'Sanctuary',
];

/* ─── Newsletter ─── */

export const NEWSLETTER = {
  label: 'run_it_local',
  title: 'Run It Local',
  copy: 'Keeping up with AI, and how to make it your own. One email a week, plain English, no hype. Written from the workshop floor, not the commentary box.',
  note: 'one email a week · no hype',
};

/* ─── Pricing ───
   Productised, fixed-fee offers. Fixed fees beat a day rate for a first engagement:
   the buyer knows the downside before they commit, which is the whole barrier.

   `price` is null until Tom sets it, and a null price renders "Fixed fee · get a
   quote" rather than a fake number. Fill these in and the cards become anchors. */

export interface PricedOffer {
  title: string;
  /** e.g. 'from £2,500'. Null renders an honest fallback instead of a made-up figure. */
  price: string | null;
  /** The commitment being made, e.g. '1-2 weeks'. */
  duration: string;
  summary: string;
  includes: string[];
  /** The one people should start with. */
  lead?: boolean;
}

export const PRICING_INTRO =
  'Fixed fees, not day rates. You know what it costs before you commit, and I carry the risk of it taking longer than I thought.';

/*
 * The anchors below are benchmarked, not guessed. Sources, July 2026 (see PRICING.md).
 *
 *   Geography  There is no Yorkshire discount to apply. IT Jobs Watch contract medians:
 *              Yorkshire AI £550 (n=105) against London’s £563, a 2.3% gap, and level with
 *              the UK median. Yorkshire Generative AI is £575, which is *above* London’s
 *              £565. The regional penalty is real for generalists (Yorkshire Python and
 *              Azure both sit ~9% under London, on samples of 250-300) but it decays as
 *              you move from a body in a seat to a specialist selling an outcome. Remote
 *              ML and GenAI contracts pay £600, above London. Pricing to the local market
 *              would be pointless anyway: York had 5 AI contract ads in six months.
 *   Day rate   Independents bill 120-160 days a year, not 220. Matching a £550/day
 *              contractor, who has the work handed to them and carries none of the sales,
 *              overrun or warranty risk, means charging £690-850. Target £750, floor £650.
 *   The rival  A London consultancy sells private AI *into Leeds* at a published £6,500
 *              diagnostic, £850/day and £10,000/month. It does not discount for Yorkshire.
 *   Sector     Regulated buyers (finance, health, legal, public) carry a 20-45% premium.
 *              Who the client is moves the price about five times more than where I live.
 *
 * These are "from" anchors: the entry price of each package, not the expected fee. They
 * are one-line edits: change the string and the card changes.
 *
 * Why the odd-looking figures. Every one is the £750 target day rate multiplied by a real
 * number of days: 8.5, 17 and 24.5, so all three are multiples of £375, which is half a day.
 * That is deliberate and it is not charm pricing. A precise number reads as computed, and a
 * buyer adjusts less far down from it than from a round one (Janiszewski & Uy 2008 on anchor
 * precision; Mason et al. 2013 on precise opening offers). A £5,950 would do the opposite: it
 * is a retail signal, and it would undo the repositioning §0 below paid for when the audit went
 * from £4,800 to £6,000. Anyone who divides by 750 finds the rate card, which is the point.
 */
export const PRICING: PricedOffer[] = [
  {
    title: 'AI Cost & Privacy Audit',
    // 8.5 days at £750. Not £4,800: a London consultancy sells the same diagnostic into Leeds
    // at a published £6,500. Undercutting it by 26% buys nothing from a regulated buyer whose
    // problem is risk, and a low price on the entry product anchors everything after it. This
    // still sits under that £6,500, which is the one place being slightly cheaper is useful.
    price: 'from £6,375',
    duration: '1 to 2 weeks',
    lead: true,
    summary:
      'The place to start. I look at what you are actually spending on AI, what leaves your building, and whether running it yourself would be better. You get a straight recommendation, in writing.',
    includes: [
      'Your current AI spend, itemised',
      'What data is leaving, and where it goes',
      'A local-vs-API comparison on your real usage',
      'A straight recommendation, including “stay on the API” if that is the answer',
    ],
  },
  {
    title: 'Local LLM Setup',
    // 17 days at £750. PRICING.md calls this the weakest number of the three: it is built from
    // an effort estimate rather than a comparator, because no one publishes this package.
    price: 'from £12,750',
    duration: '2 to 4 weeks',
    summary:
      'Open models running on your own hardware. Same results as the APIs for everyday work, no per-token bill, and nothing leaves the building.',
    includes: [
      'Hardware sizing for your actual workload',
      'Ollama and open models, installed and tuned',
      // Hardening is scope, not a footnote. Ollama listens with no auth and checks for
      // updates by default, and a locked-down network will ask about both. Volunteering it
      // is what tells a compliance-minded buyer you have done this before.
      'Locked down: bound to localhost, auth on the API, update checks off',
      'Your team set up and shown how to use it',
      'Handover docs, so you are not dependent on me',
    ],
  },
  {
    title: 'Private RAG System',
    // 24.5 days at £750. Quote regulated scope at £30k+; data prep alone is 30-50% of a RAG
    // build, and this "from" assumes documents that are already in reasonable shape.
    price: 'from £18,375',
    duration: '3 to 6 weeks',
    summary:
      'Your own documents, searchable and answerable, without any of them being sent to a third party. Answers cite their sources, so you can check them.',
    includes: [
      'Ingestion for your documents, wherever they live',
      'Retrieval tuned on your content, not a demo set',
      'Answers grounded in sources, with citations',
      'Runs on your hardware, or your private cloud',
    ],
  },
];

/** Shown in place of a price until a real figure exists. Honest, and it still invites the enquiry. */
export const PRICE_TBC = 'Fixed fee · get a quote';

/* ─── Iteration, revisions and the ongoing relationship ───
 *
 * Two things a fixed fee has to answer or it quietly becomes an hourly job at a bad rate:
 * how much back-and-forth is included, and what happens after handover.
 *
 * The shape is the conventional one (N rounds included, then a fixed price per extra
 * round, plus a defect warranty), stated up front rather than discovered later. A round
 * is defined as one *consolidated* set of changes precisely so that requests trickling
 * in one at a time do not become ten free rounds.
 */
export const ENGAGEMENT_TERMS = {
  included: [
    'Two rounds of revisions on each deliverable. A round is one consolidated set of changes, sent together.',
    'A 30-day warranty from handover. If it does not do what the scope says it does, I fix it, free.',
    'Handover documentation, so your team is not dependent on me.',
  ],
  charged: [
    'Further rounds after the first two: £1,275 per round, fixed, so you can decide whether it is worth it before you ask.',
    'New scope, as opposed to a revision: quoted and agreed in writing before any work starts.',
    'Re-tuning against new documents or new criteria after acceptance.',
  ],
} as const;

/**
 * The retainer, which is the honest other half of "AI you own".
 *
 * Owning the system outright means there is no vendor on the hook when the model drifts
 * or the documents move on. That is not a hole in the pitch, it is the pitch: you
 * maintain it, or I do.
 */
export const RETAINER = {
  title: 'Care & Tuning',
  // Built the same way as the packages, so it survives the same question. Half a day of
  // tuning is £375 at the target rate; the other £1,050 covers monitoring, model updates and
  // re-indexing. £950 was under water on that arithmetic, and every published comparator is
  // higher anyway (UK run-rate £1,000-5,000/month; the London firm selling into Leeds charges
  // £10,000), so the old number was not even competitive, just cheap.
  price: 'from £1,425/month',
  summary:
    'Optional, and genuinely optional. Monitoring, model updates, re-indexing as your documents change, and half a day of tuning a month. Cancel whenever it stops being worth it.',
} as const;

/* ─── FAQ ───
   Objection handling. These are the doubts that stop someone emailing, and the last
   one is the one that earns the most trust. */

export const FAQ: { q: string; a: string }[] = [
  {
    q: 'Is a local model actually as good as the big APIs?',
    a: 'For the everyday 90% (drafting, summarising, answering questions from your own documents) you will not tell the difference. The current generation of open models is genuinely good, and it runs on hardware a small business can afford. For frontier reasoning on hard novel problems, the big APIs are still ahead, and I will say so.',
  },
  {
    q: 'What hardware do I need?',
    a: 'Less than you think. A single well-specified workstation covers most small teams, and you likely have something close already. Sizing it for your real workload rather than a benchmark is part of the audit. I would rather tell you a £1,500 machine is enough than sell you a rack.',
  },
  {
    q: 'What about GDPR and client data?',
    a: 'This is the strongest argument for running locally. If nothing leaves your building, there is no third-party processor to assess, no data-transfer agreement to sign, and no vendor whose retention policy you have to trust. For anyone handling client records, contracts, or health data, that is usually the whole conversation.',
  },
  /*
   * The precise version of the privacy claim, and it is here on purpose.
   *
   * "Nothing ever leaves the machine" is the absolutist version. It is also false, and it
   * is the kind of false that gets taken apart in front of the room: the model has to
   * arrive from somewhere, Ollama checks for updates by default, and its API binds with no
   * auth at all. A competent CIO knows all three. Claiming zero packets and then being
   * corrected costs the entire meeting.
   *
   * "Your data never leaves" is exact, survives scrutiny, and is still devastating against
   * an API where every single query leaves the building permanently. The differentiator was
   * never "no packet ever moves", it is "no customer data ever moves, and there is no
   * third-party processor to assess".
   *
   * The hardening below is not a caveat, it is scope: it is billable, it is what a
   * locked-down network will actually ask for, and volunteering it is what tells a
   * compliance-minded buyer that you have done this before.
   */
  {
    q: 'Does anything leave the machine at all?',
    a: 'Your data never leaves. That is the exact claim, and it is worth being precise about, because the model itself has to arrive from somewhere. Pulling a model is a one-off download from a registry, over the network, at a moment you choose, and it happens before any of your documents are near it. After that, every prompt and every answer stays on the machine: no API call, no per-query egress, no third-party processor to assess. Compare that with a hosted API, where every single query leaves the building, permanently.',
  },
  {
    q: 'How do you lock it down?',
    a: 'By default Ollama listens without authentication and phones home to check for new versions. Neither is acceptable on a network that takes itself seriously, so hardening is part of the setup, not an extra: the API is bound to localhost and put behind auth rather than left on 0.0.0.0 for the whole office, automatic update checks are turned off so the box makes no outbound call you did not ask for, and models are pre-pulled. If you need it genuinely air-gapped, it can be, and after the models are on the machine it never needs to see the internet again.',
  },
  {
    q: 'We already have Copilot. Why would we need this?',
    a: 'Often you would not, and I will say so. If Copilot is answering your questions well over the documents you keep in Microsoft 365, keep it: you are already paying for it. Where it stops is when the answer has to be grounded in a specific corpus with citations you can audit, when the per-seat bill scales faster than the value, or when the data genuinely cannot go to anyone else’s cloud on anyone’s terms. That is the gap I build for, and the audit exists to tell you honestly which side of it you are on.',
  },
  {
    q: 'When should I NOT do this?',
    a: 'When your volume is genuinely low, the API bill is not hurting, and your data is not sensitive. In that case you are paying me to save you money you were not really spending. Every engagement starts with an honest audit, and sometimes it concludes “stay on the API”. You get that in writing too.',
  },
  {
    q: 'What if we want changes once we see it?',
    a: 'Expected, and priced in. Every deliverable includes two rounds of revisions, where a round is one consolidated set of changes rather than a trickle of one-liners. After that, further rounds are £1,275 each, fixed, so you can weigh up whether a change is worth it before you ask for it. Anything that is genuinely new scope rather than a revision gets quoted before I start, never after.',
  },
  {
    q: 'What happens if you get hit by a bus?',
    a: 'You own everything. Open models, your hardware, your data, and handover documentation written for whoever comes after me. Nothing about a local setup depends on me still being around, which is rather the point of owning it rather than renting it.',
  },
];

/* ─── Case study ───
   A technical deep-dive on my own work, not a client reference. `results` stays null
   until there are real numbers to put in it, and the Results block does not render
   without them. Nothing invented. */

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  /** Which project in projects.ts this deep-dives. */
  projectId: string;
  problem: string[];
  approach: string[];
  architecture: { step: string; detail: string }[];
  proves: string[];
  /**
   * What this actually is, stated before anyone has to ask.
   *
   * The build used hosted models, and the site's whole argument is local AI. Saying so
   * plainly is not a weakness: a reader who spots the Claude and Pinecone badges and no
   * disclosure concludes the pitch is dishonest, whereas a reader who is told up front
   * concludes the opposite.
   */
  provenance: string;
  /** Null until there are real, measured figures. Do not invent these. */
  results: { value: string; label: string }[] | null;
}

export const CASE_STUDY: CaseStudy = {
  slug: 'isq-agent',
  projectId: 'isq-agent',
  title: 'Answering security questionnaires without leaking the answers',
  subtitle: 'A private RAG agent that drafts supplier security questionnaires, grounds every answer in your own policy, and flags the ones a human needs to look at.',
  problem: [
    'Supplier security questionnaires are a tax on selling. A single one can run to two hundred questions, most of which you have answered before, in slightly different words, in a document nobody can find.',
    'The obvious fix is to point an LLM at it. The obvious problem with the obvious fix is that a security questionnaire is a document about your security, and pasting it, along with your policies, into someone else’s API is a strange way to demonstrate that you take data protection seriously.',
    'So the requirement writes itself: it has to be good enough to save real time, and it has to run somewhere you control.',
  ],
  approach: [
    'Retrieval over your own policy documents, not a general model’s memory. Every answer is drafted from something you have actually written and approved, and it cites which document it came from, so a reviewer can check it in seconds rather than trusting it.',
    'A confidence score on every answer, and a hard rule that low-confidence answers are never submitted silently. The agent is a drafting assistant with a paper trail, not an oracle.',
    'The model is a swappable part. Retrieval, grounding, scoring and the audit log are the system; the thing that writes the sentence is a component behind an interface. Point it at a hosted API or at an open model on your own hardware and the pipeline does not change.',
  ],
  architecture: [
    { step: 'Ingest', detail: 'Your policies, previous questionnaires and controls documentation, chunked and embedded into a private vector store.' },
    { step: 'Retrieve', detail: 'For each question, pull the passages that actually bear on it, tuned on your content rather than on a demo corpus.' },
    { step: 'Draft', detail: 'The model answers strictly from the retrieved passages, and cites them. If the passages do not support an answer, it says so instead of inventing one.' },
    { step: 'Score', detail: 'Each answer gets a confidence score based on how well the retrieved evidence actually covers the question.' },
    { step: 'Review', detail: 'Anything below the bar is routed to a human, with the evidence attached. The reviewer is checking, not writing from scratch.' },
  ],
  proves: [
    'That the hard part of a RAG agent is not the model. It is the retrieval, the grounding, the confidence scoring and the audit trail, and none of those care which model you plug in.',
    'That grounding and citation are not a nice-to-have. They are what make an AI answer checkable, and therefore usable, in a context where being wrong has consequences.',
    'That the honest move is to build the escape hatch in from the start: the system is designed to know when it does not know.',
  ],
  provenance:
    'Built as a working system, not a demo: a Python and FastAPI RAG engine with an n8n orchestration tier, 480+ tests, test-driven throughout. This build ran on hosted models (Claude, Voyage, Pinecone), which is worth saying plainly on a site that argues for local AI. The reason it can make that argument is the point above: the model is a component behind an interface, so the same pipeline runs against open models on your own hardware, which is the configuration I would deploy for anyone whose documents cannot leave the building. The repository and the deployments are offline, so there is no live link to give you.',
  results: null,
};
