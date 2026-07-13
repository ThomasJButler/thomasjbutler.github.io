/* v5site/data.jsx — v5 content layer: local-AI positioning on top of the v4 data */

const V5S_LINKS = {
  github: 'https://github.com/ThomasJButler',
  linkedin: 'https://www.linkedin.com/in/thomasjbutler',
  email: 'dev@thomasjbutler.me',
  commercial: 'https://thomasjbutler.me',
  substack: null, // link tbc
};

/* projects — real Cloudinary covers from the live site (featured cards only) */
const V5S_COVER_BASE = 'https://res.cloudinary.com/depqttzlt/image/upload/w_640,q_auto,f_auto/';
const V5S_COVERS = {
  modelviz: 'v1767710994/ModelViz_blz9ct.png',
  langchain: 'v1767710993/codegenerator3_z9dtie.png',
  sqlball: 'v1765947198/sqlball_canxlv.png',
  morpheus: 'v1767713745/Morpheus5_pdcmvr.png',
  reviewbot: 'v1767707875/ReviewBot2_xzcin9.png',
  aiportfolio: 'v1766595895/dashboardhomepage_xxsk0z.png',
  news: 'v1765947185/newsperspective2_ugdtqk.png',
  lfc: 'v1765947167/lfcreddit2_wzbqty.png',
  dotnet: 'v1765947576/dotnetcalendar_fiu8p4.jpg',
  css: 'v1765946936/cssshowcase_ugyvso.webp',
  arcade: 'v1737693678/MatrixArcade2_eg34bs.png',
  bigbang: 'v1765946935/bigbanggallery_ckmaw1.webp',
  python: 'v1765947170/LorenzAttractor_bd2dps.png',
  timetravel: 'v1767710995/portfoliotimetravel_rh7jgr.png',
};

/* home — NOW + recent activity (2026) */
const V5S_NOW = 'Setting up private, local AI systems for businesses, and building Sanctuary, an on-device AI app for neurodiverse users heading to the App Store. Currently deep in Ollama, RAG pipelines, and open source local AI (I contribute to Odysseus). The theme of everything right now: AI you own, not AI you rent.';
const V5S_NOW_TAGS = [['Ollama', 'cyan'], ['RAG', 'cyan'], ['Local AI', ''], ['On-Device', 'amber']];

const V5S_ACTIVITY = [
  { icon: 'gitbranch', text: 'Contributing to Odysseus: open source local AI', tag: 'AI', tagcls: 'cb-ai', year: '2026' },
  { icon: 'smartphone', text: 'Sanctuary: fully offline on-device AI app (prototype)', tag: 'iOS', tagcls: 'cb-mobile', year: '2026' },
  { icon: 'doc', text: 'Launched Run It Local: weekly plain-English AI newsletter', tag: 'Writing', tagcls: 'cb-creative', year: '2026' },
  { icon: 'robot', text: 'Built RAG pipeline with LangChain + Pinecone', tag: 'AI', tagcls: 'cb-ai', year: '2025' },
];

/* services — new lead card + revised AI & Automation + On-Device mobile */
const V5S_SERVICES_INTRO = 'Fast, resilient digital products, and AI systems you actually own. From private local AI setups to performance-first websites and mobile apps. I handle the architecture, delivery, and support so you can focus on outcomes.';

const V5S_SERVICES = [
  { icon: 'cpu', lead: true, title: 'Local & Private AI',
    body: 'Private AI systems that run on your own hardware. Same results as the APIs for everyday work, no per-token costs, and your data never leaves your building.',
    feats: ['Local LLM Setups (Ollama + open models)', 'Private Knowledge Systems (RAG)', 'AI Cost & Privacy Audits'],
    tags: ['Ollama', 'Qwen', 'RAG', 'Pinecone', 'Python'] },
  { icon: 'globe', title: 'Website & Web Apps',
    body: 'Responsive, performance-first websites and web apps built with modern stacks.',
    feats: ['React/Next.js', 'Performance & SEO', 'Accessible & Responsive'],
    tags: ['React', 'TypeScript', 'WordPress', 'HubSpot', 'Next.js'] },
  { icon: 'database', title: 'Backend & APIs',
    body: 'Robust servers and APIs that scale with your product. Production-ready from day one.',
    feats: ['Node.js/Python', 'PostgreSQL/MongoDB', 'Auth & Security'],
    tags: ['Node.js', 'Django', 'PostgreSQL', 'GraphQL', 'Flask'] },
  { icon: 'robot', title: 'AI & Automation',
    body: 'Practical AI features and automation to save time and make data useful. Cloud, local, or hybrid, whatever fits the job.',
    feats: ['Custom AI Agents', 'n8n Workflows', 'Custom ML Models'],
    tags: ['Claude', 'ChatGPT', 'PyTorch', 'TensorFlow', 'n8n'] },
  { icon: 'smartphone', title: 'Mobile Applications',
    body: 'Cross-platform apps with native feel and store readiness.',
    feats: ['React Native', 'iOS & Android', 'On-Device AI'],
    tags: ['React Native', 'Expo', 'iOS', 'Apple Intelligence'] },
  { icon: 'palette', title: 'Design & Brand',
    body: 'Clear, usable interfaces and identity design that scales with your product.',
    feats: ['UI/UX Design', 'Brand Identity', 'Design Systems'],
    tags: ['Figma', 'Adobe XD', 'UI/UX', 'Wireframes'] },
  { icon: 'headset', title: 'Consultancy & Custom',
    body: 'Architecture reviews, training and bespoke engineering for special requirements.',
    feats: ['Architecture Review', 'Team Training', 'Bespoke Solutions'],
    tags: ['DevOps', 'Git', 'Agile', 'Testing', 'Cloud'] },
];

/* services — WHY_LOCAL_AI section */
const V5S_WHY = [
  "Most businesses rent their AI. Every API call is a meter running, and every prompt sends your data to a server you don't control.",
  "The current generation of open models runs on hardware a small business can afford, and for the everyday 90% (drafting, summarising, answering questions from your own documents) you won't tell the difference. At scale, running locally saves 60 to 80% on token costs. And if you handle client data, contracts, or anything GDPR cares about, local means there's no third party to worry about, because nothing leaves the building.",
  "It's not right for everyone, and I'll tell you if it isn't. Every project starts with an honest audit: your usage, your numbers, and a straight recommendation. Sometimes that's \u201Cstay on the API\u201D. You get that in writing too.",
];
const V5S_WHY_STATS = [
  { value: '60-80%', label: 'Token cost savings at scale' },
  { value: '0', label: 'Data sent to third parties' },
  { value: '£0', label: 'Per-token costs' },
];

/* about — the local AI paragraph */
const V5S_ABOUT_LOCAL = "These days my focus is local and private AI. I help businesses move from renting intelligence through API bills to owning it: open models on their own hardware, private RAG systems over their own documents, and honest audits that sometimes conclude \u201Cyou don't need me\u201D. I contribute to open source local AI (including Odysseus, PewdiePie's local AI project, which is the strangest line on my CV), and I'm building Sanctuary, a fully offline, on-device AI app for neurodiverse users. If private AI can run on a phone, it can run in your business.";

/* newsletter */
const V5S_NEWS_COPY = 'Keeping up with AI, and how to make it your own. One email a week, plain English, no hype. Written from the workshop floor, not the commentary box.';

/* updates — extend the timeline */
const V5S_TIMELINE = [...V4_TIMELINE, {
  year: '2026', title: 'AI you can own',
  body: 'Local and private AI becomes the focus. Ollama setups and private RAG for businesses, contributing to Odysseus, building Sanctuary on-device, and writing Run It Local every week.',
}];

Object.assign(window, {
  V5S_LINKS, V5S_COVER_BASE, V5S_COVERS, V5S_NOW, V5S_NOW_TAGS, V5S_ACTIVITY,
  V5S_SERVICES_INTRO, V5S_SERVICES, V5S_WHY, V5S_WHY_STATS, V5S_ABOUT_LOCAL,
  V5S_NEWS_COPY, V5S_TIMELINE,
});
