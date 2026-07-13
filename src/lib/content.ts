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
  /** Run It Local. No URL yet — the Subscribe button toasts until Tom supplies one. */
  substack: null as string | null,
};

/* ─── Hero ─── */

export const HERO_EYEBROW = '// tom_butler · york, uk';

export const HERO_PHRASES = [
  'AI you can own',
  'private, local AI systems',
  'production web apps',
  'intelligent agents',
];

export const HERO_SUB =
  'Full Stack AI Engineer from the UK. I set up private, local AI systems for businesses. Same results, no per-token bills, your data stays yours.';

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

export type ChipTone = 'default' | 'cyan' | 'amber';

export const NOW_TAGS: { label: string; tone: ChipTone }[] = [
  { label: 'Ollama', tone: 'cyan' },
  { label: 'RAG', tone: 'cyan' },
  { label: 'Local AI', tone: 'default' },
  { label: 'On-Device', tone: 'amber' },
];

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
    text: 'Launched Run It Local: weekly plain-English AI newsletter',
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

export const WHY_LOCAL_AI_STATS = [
  { value: '60-80%', label: 'Token cost savings at scale' },
  { value: '0', label: 'Data sent to third parties' },
  { value: '£0', label: 'Per-token costs' },
];

/* ─── About: current focus ─── */

export const ABOUT_CURRENT_FOCUS =
  "These days my focus is local and private AI. I help businesses move from renting intelligence through API bills to owning it: open models on their own hardware, private RAG systems over their own documents, and honest audits that sometimes conclude “you don't need me”. I contribute to open source local AI (including Odysseus, PewdiePie's local AI project, which is the strangest line on my CV), and I'm building Sanctuary, a fully offline, on-device AI app for neurodiverse users. If private AI can run on a phone, it can run in your business.";

export const ABOUT_CURRENT_FOCUS_TAGS: { label: string; tone: ChipTone }[] = [
  { label: 'Ollama', tone: 'cyan' },
  { label: 'Private RAG', tone: 'cyan' },
  { label: 'Odysseus', tone: 'default' },
  { label: 'Sanctuary', tone: 'amber' },
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
 * The anchors below are benchmarked, not guessed. Sources, July 2026:
 *
 *   Day rate  IT Jobs Watch UK contract medians: AI Engineer £575, AI Agents £588
 *             (75th pct £730), RAG £558. North West median £530 against London's £563,
 *             so the regional discount people assume is ~6%, not 30%. An independent
 *             bills 120-160 days a year, not 220, so matching a £530/day contractor
 *             means charging ~£700-760. Three unrelated 2026 sources put UK freelance
 *             AI consulting at £400-900/day.
 *   Audit     Nearest published UK comparators: £3,500 (readiness sprint) to £8,000.
 *   RAG       Nearest published UK comparator is a London agency's £15,000 RAG chatbot.
 *             Pricing a compliance-grade private system below that would be self-harm.
 *
 * These are "from" anchors: the entry price of each package, not the expected fee. They
 * are one-line edits — change the string and the card changes.
 */
export const PRICING: PricedOffer[] = [
  {
    title: 'AI Cost & Privacy Audit',
    price: 'from £4,800',
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
    price: 'from £12,000',
    duration: '2 to 4 weeks',
    summary:
      'Open models running on your own hardware. Same results as the APIs for everyday work, no per-token bill, and nothing leaves the building.',
    includes: [
      'Hardware sizing for your actual workload',
      'Ollama and open models, installed and tuned',
      'Your team set up and shown how to use it',
      'Handover docs, so you are not dependent on me',
    ],
  },
  {
    title: 'Private RAG System',
    price: 'from £18,000',
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
    'Further rounds after the first two: £1,200 per round, fixed, so you can decide whether it is worth it before you ask.',
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
  price: 'from £950/month',
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
  {
    q: 'When should I NOT do this?',
    a: 'When your volume is genuinely low, the API bill is not hurting, and your data is not sensitive. In that case you are paying me to save you money you were not really spending. Every engagement starts with an honest audit, and sometimes it concludes “stay on the API”. You get that in writing too.',
  },
  {
    q: 'What if we want changes once we see it?',
    a: 'Expected, and priced in. Every deliverable includes two rounds of revisions, where a round is one consolidated set of changes rather than a trickle of one-liners. After that, further rounds are £1,200 each, fixed, so you can weigh up whether a change is worth it before you ask for it. Anything that is genuinely new scope rather than a revision gets quoted before I start, never after.',
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
