/**
 * The content layer: the copy the pages render, kept in one file so the wording is
 * reviewable in one place. Import it; don't retype it.
 *
 * What used to be here, and where it went. Until August 2026 this file carried the
 * "Local & Private AI" positioning: a Services page, three priced offers, engagement terms,
 * a retainer, an FAQ and a newsletter. That is shelved for the job search, not abandoned. It
 * is preserved verbatim in the git tag v-local-ai-2026-08, and the commit that removed it is
 * the one to `git revert` when it comes back (see .claude/CLAUDE.md, "Shelved positioning").
 */
import { Bot, GitBranch, Smartphone, type LucideIcon } from 'lucide-react';

export const LINKS = {
  github: 'https://github.com/ThomasJButler',
  linkedin: 'https://www.linkedin.com/in/thomasbutleruk',
  email: 'dev@thomasjbutler.me',
  commercial: 'https://thomasjbutler.me',
  coffee: 'https://buymeacoffee.com/ojrwoqkgmv',
};

/* ─── Hero ───
 *
 * A greeting again, on purpose.
 *
 * The v5 hero led with the argument ("AI you own, not AI you rent") because the page was a
 * shop window and the reader was a buyer. The reader now is someone deciding whether to
 * interview Tom, and the first thing they want is who this is and where. The name is fine
 * here even though the wordmark says it too: a hiring manager reads the H1, not the header.
 */

export const HERO_EYEBROW = '// software developer · leeds, yorkshire';

/** Two lines on purpose: the second line is the turn. */
export const HERO_H1 = ["Hey, I'm Tom.", 'I build things.'];

export const HERO_SUB =
  "Software developer in Leeds, Yorkshire, nearly four years in from a standing start. This site is where I experiment and crash things, and every version I've ever shipped still runs.";

/**
 * Under the hero buttons. The contrast is the message, and it is invisible unless it is
 * named: this site is what Tom builds when nobody is paying, and the paid work lives on the
 * commercial site. Very few candidates can show that split, so the line says it out loud.
 */
export const HERO_ASIDE =
  'Everything here I built because I wanted to. The paid work is over there.';

/** The scripted console session. Types once, then holds a blinking prompt. */
export interface ConsoleStep {
  cmd: string;
  out: { text: string; highlight?: boolean }[];
}

export const CONSOLE_SCRIPT: ConsoleStep[] = [
  {
    cmd: 'whoami',
    out: [{ text: 'tom butler · software developer · leeds, yorkshire' }],
  },
  {
    cmd: 'ls ~/projects',
    out: [{ text: 'sanctuary/  offshore-property-map/  the-kicker/  isq-agent/' }],
  },
  // Local models stay in the script because they are true: over a year of running them, for
  // himself. What left with the offer is the claim of doing it for anyone else.
  {
    cmd: 'ollama ps',
    out: [
      { text: '▸ qwen3 · running on my own machine' },
      { text: '▸ personal use, over a year now' },
    ],
  },
  {
    cmd: 'cat status.txt',
    out: [{ text: 'open to full-time roles · junior software · non-senior AI', highlight: true }],
  },
];

/* ─── Home: NOW + recent activity ─── */

export const NOW_COPY =
  'Looking for full-time work: junior for general software, any non-senior level for AI. In the meantime, Sanctuary on native iOS, the Offshore Property Map, and The Kicker. Running local models for over a year, for myself, and reading everything I can.';

/*
 * One hue. The tags used to carry a `tone` of 'cyan' | 'amber', assigned with no rule anyone
 * could state. Amber now means exactly one thing (see --meter in app.css) and it is not
 * squandered on a chip that says "RAG".
 */
export const NOW_TAGS: string[] = ['Python', 'TypeScript', 'Swift', 'RAG', 'Local models'];

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
    icon: Bot,
    text: 'Built RAG pipeline with LangChain + Pinecone',
    badge: 'AI',
    year: '2025',
  },
];

/* ─── About: why this site exists ───
 *
 * Tom's own words, tidied. It answers the question a visitor is actually holding, and it
 * is written to read as humble rather than as low confidence: the not-knowing is a fact
 * about the field (a senior developer said it, it has a name, the field outruns anyone),
 * so continuous learning is the only rational response, not catching up. "Degree or no
 * degree. Genius or not." is the best line in it. Leave it exactly as it is.
 */

export const ABOUT_CURRENT_FOCUS: string[] = [
  'Fair. I ask myself most days.',
  "It's where I experiment and crash things. I built it from scratch, and every version I've ever shipped still runs, which you can go and poke at.",
  "It keeps my web work sharp and it keeps the personal stuff separate from the commercial stuff. Some of what's here could be commercial one day. Sanctuary, Offshore, The Kicker, Octopus.",
  "A senior developer once told me that the longer you do this, the more you notice what you don't know, and that the job is learning to be comfortable with that. He was right. I know a fraction of this field. In twenty years I expect to know a slightly larger fraction of a much bigger field, because this stuff changes constantly, so the gap will look about the same size it does now. Unknown unknowns. Software is humbling about them.",
  "Which means if you stop learning, you don't hold your position. You get worse, because everything around you moved and you didn't. Degree or no degree. Genius or not.",
  "So what I'm building is the habit, not the finished article. Keep learning, keep trying things, stay curious, let it stack up. The evidence is on this page.",
];

/** The four named in the passage as the ones that could be commercial one day. */
export const ABOUT_CURRENT_FOCUS_TAGS: string[] = [
  'Sanctuary',
  'Offshore Property Map',
  'The Kicker',
  'Octopus',
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
   * The build used hosted models, and the case study argues for running the model where
   * you control it. Saying so plainly is not a weakness: a reader who spots the Claude and
   * Pinecone badges and no disclosure concludes the write-up is dishonest, whereas a reader
   * who is told up front concludes the opposite.
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
    'Built as a working system, not a demo: a Python and FastAPI RAG engine with an n8n orchestration tier, 480+ tests, test-driven throughout. It was built for a technical assessment with RiverAI and presented in person. This build ran on hosted models (Claude, Voyage, Pinecone), which is worth saying plainly given the point above about running it where you control it: the model is a component behind an interface, so the same pipeline runs against open models on your own hardware. The repository and the deployments are offline, so there is no live link to give you.',
  results: null,
};
