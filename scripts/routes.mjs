export const SITE = 'https://thomasjbutler.github.io';

/**
 * Every route, with the title and description a crawler sees.
 *
 * This is the single source of truth for the build: it drives the prerender, the per-route
 * meta tags, the social cards, and the canonical links. `/` is in the list. It used to be
 * absent, because home was "just dist/index.html", which meant the one page everybody
 * actually lands on was the only one that never got checked.
 *
 * Descriptions are kept between roughly 110 and 160 characters, which is what Google will
 * usually show without truncating, and each is written to be worth clicking rather than to
 * repeat the title.
 *
 * `module` names the page's source file when the route is code-split (React.lazy in App.tsx).
 * The prerender looks it up in Vite's build manifest and emits a <link rel="modulepreload">
 * so the browser can fetch the route chunk in parallel with the entry chunk instead of
 * waiting for main-*.js to execute the dynamic import first. Home ('/') and services are
 * statically imported (already in the entry chunk), so they have no module and no preload.
 *
 * `image` is the social card, a filename in public/ that the prerender makes absolute. A
 * route without one falls back to the sitewide card. These live in public/ rather than on
 * Cloudinary on purpose: a card is fetched by a crawler once, not by every visitor, so it
 * costs no delivery credits and has no reason to leave the origin.
 */
export const ROUTE_META = [
  {
    path: '/',
    file: 'index',
    title: 'Tom Butler | Local & Private AI for business',
    description:
      'I set up private AI that runs on your own hardware. Same results as the APIs for everyday work, no per-token bills, and your data never leaves the building.',
  },
  {
    path: '/services',
    file: 'services',
    image: 'og-services.png',
    imageAlt:
      'Local & Private AI: the results you need for everyday work, on your own hardware, with no per-token bills.',
    title: 'Local & Private AI for business | Tom Butler',
    description:
      'Local LLM setups, private RAG, and honest AI cost and privacy audits. Fixed fees from £6,000, and I will tell you when local AI is the wrong answer.',
  },
  {
    path: '/case-study',
    file: 'case-study',
    module: 'src/pages/CaseStudyPage.tsx',
    image: 'og-case-study.png',
    imageAlt:
      'Case study, ISQ Agent: answering security questionnaires without leaking the answers.',
    title: 'Case study: a RAG agent for security questionnaires | Tom Butler',
    description:
      'A RAG agent that drafts supplier security questionnaires, grounds every answer in your own policy, cites its sources, and flags the ones a human should check.',
  },
  {
    path: '/projects',
    file: 'projects',
    module: 'src/pages/ProjectsPage.tsx',
    title: 'Projects | Tom Butler, Full Stack AI Engineer',
    description:
      'AI, web and mobile work: model comparison tooling, natural-language SQL, document Q&A with RAG, automated PR review, and an offline on-device iOS app.',
  },
  {
    path: '/about',
    file: 'about',
    module: 'src/pages/AboutPage.tsx',
    title: 'About | Tom Butler, Full Stack AI Engineer',
    description:
      'Full Stack AI Engineer in York. Private and local AI for business, a contributor to open source local AI, and building Sanctuary, an offline on-device app.',
  },
  {
    path: '/contact',
    file: 'contact',
    module: 'src/pages/ContactPage.tsx',
    image: 'og-contact.png',
    imageAlt: 'Let’s build something you own.',
    title: 'Talk it through | Tom Butler',
    description:
      'Start with a fixed-fee audit of what AI is actually costing you. No obligation, and if local AI is wrong for you I will say so in writing.',
  },
  {
    path: '/updates',
    file: 'updates',
    module: 'src/pages/UpdatesPage.tsx',
    title: 'Dev Journey | Tom Butler',
    description:
      'The road from a kid watching green code rain in The Matrix to building private AI systems for businesses for a living.',
  },
];

/**
 * The 404. It is prerendered from a path that matches no route, so React Router resolves
 * it to NotFoundPage and the file gets the real 404 markup. It used to be a byte-for-byte
 * copy of the home page, so every unknown URL served the home page's title and card.
 */
export const NOT_FOUND = {
  path: '/__not-found__',
  file: '404',
  module: 'src/pages/NotFoundPage.tsx',
  title: 'Page not found | Tom Butler',
  description: 'There is no spoon. That page does not exist, but the rest of the site does.',
};

/**
 * The title for a path, from the same table the prerender uses.
 *
 * The app imports this so a client-side navigation sets exactly the title the build wrote
 * into the prerendered HTML. Every page used to carry its own `document.title = '...'`
 * effect, and all seven had drifted from routes.mjs: a crawler indexed "Local & Private AI
 * for business", the browser tab said "Full Stack AI Engineer, Local AI & On-Device
 * Systems", and a shared bookmark got the second one. One table, no drift.
 */
export function titleForPath(pathname) {
  const clean = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
  const match = ROUTE_META.find((r) => r.path === clean);
  return (match ?? NOT_FOUND).title;
}
