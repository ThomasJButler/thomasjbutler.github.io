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
