import { SITE } from './routes.mjs';

/**
 * Structured data, per route.
 *
 * There used to be exactly one Person block, copied byte for byte onto every page. That is
 * a wasted asset: an assistant answering "who can set up private AI for a UK business"
 * wants an entity with services, prices, an area served and answers to the questions its
 * user is actually asking. It cannot infer any of that from a job title.
 *
 * The prices and the FAQ below are duplicated from src/lib/content.ts, which is a real
 * cost and worth naming: this file is a build script (plain .mjs, run by node) and that
 * one is TypeScript compiled by Vite. If you change a price, change it in both. The
 * alternative is a build-time TS import step, which is more machinery than two numbers
 * justify today. There is a test that fails when they drift.
 */

const PERSON = {
  '@type': 'Person',
  '@id': `${SITE}/#person`,
  name: 'Thomas J Butler',
  alternateName: 'Tom Butler',
  jobTitle: 'Full Stack AI Engineer',
  url: SITE,
  email: 'dev@thomasjbutler.me',
  image: `${SITE}/og-image.png`,
  description:
    'Full Stack AI Engineer specialising in private, local AI systems for businesses: local LLM setups, private RAG knowledge systems, and AI cost and privacy audits.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'York',
    addressCountry: 'GB',
  },
  sameAs: [
    'https://github.com/ThomasJButler',
    'https://www.linkedin.com/in/thomasjbutler',
    'https://thomasjbutler.me',
  ],
  knowsAbout: [
    'Local AI',
    'Private AI',
    'Ollama',
    'Retrieval-Augmented Generation',
    'On-Device AI',
    'Open-weight language models',
    'GDPR',
    'React',
    'TypeScript',
    'Python',
  ],
};

/** The offers, with real prices. This is the block an assistant quotes when asked "how much". */
const OFFERS = [
  {
    name: 'AI Cost & Privacy Audit',
    description:
      'A review of what you are actually spending on AI, what data is leaving your building, and whether running it yourself would be better. You get a straight recommendation in writing, including "stay on the API" if that is the answer.',
    price: '6375',
    duration: 'P2W',
  },
  {
    name: 'Local LLM Setup',
    description:
      'Open-weight models running on your own hardware, sized for your real workload, installed and tuned, with your team trained and handover documentation written.',
    price: '12750',
    duration: 'P4W',
  },
  {
    name: 'Private RAG System',
    description:
      'Your own documents, searchable and answerable, with answers grounded in your sources and citations you can check. Runs on your hardware or your private cloud.',
    price: '18375',
    duration: 'P6W',
  },
];

const FAQ = [
  { q: 'Is a local model actually as good as the big APIs?', a: 'For the everyday 90% (drafting, summarising, answering questions from your own documents) you will not tell the difference. The current generation of open models is genuinely good, and it runs on hardware a small business can afford. For frontier reasoning on hard novel problems, the big APIs are still ahead, and I will say so.' },
  { q: 'What hardware do I need?', a: 'Less than you think. A single well-specified workstation covers most small teams, and you likely have something close already. Sizing it for your real workload rather than a benchmark is part of the audit. I would rather tell you a £1,500 machine is enough than sell you a rack.' },
  { q: 'What about GDPR and client data?', a: 'This is the strongest argument for running locally. If nothing leaves your building, there is no third-party processor to assess, no data-transfer agreement to sign, and no vendor whose retention policy you have to trust. For anyone handling client records, contracts, or health data, that is usually the whole conversation.' },
  { q: 'Does anything leave the machine at all?', a: 'Your data never leaves. That is the exact claim, and it is worth being precise about, because the model itself has to arrive from somewhere. Pulling a model is a one-off download from a registry, over the network, at a moment you choose, and it happens before any of your documents are near it. After that, every prompt and every answer stays on the machine: no API call, no per-query egress, no third-party processor to assess. Compare that with a hosted API, where every single query leaves the building, permanently.' },
  { q: 'How do you lock it down?', a: 'By default Ollama listens without authentication and phones home to check for new versions. Neither is acceptable on a network that takes itself seriously, so hardening is part of the setup, not an extra: the API is bound to localhost and put behind auth rather than left on 0.0.0.0 for the whole office, automatic update checks are turned off so the box makes no outbound call you did not ask for, and models are pre-pulled. If you need it genuinely air-gapped, it can be, and after the models are on the machine it never needs to see the internet again.' },
  { q: 'We already have Copilot. Why would we need this?', a: 'Often you would not, and I will say so. If Copilot is answering your questions well over the documents you keep in Microsoft 365, keep it: you are already paying for it. Where it stops is when the answer has to be grounded in a specific corpus with citations you can audit, when the per-seat bill scales faster than the value, or when the data genuinely cannot go to anyone else’s cloud on anyone’s terms. That is the gap I build for, and the audit exists to tell you honestly which side of it you are on.' },
  { q: 'When should I NOT do this?', a: 'When your volume is genuinely low, the API bill is not hurting, and your data is not sensitive. In that case you are paying me to save you money you were not really spending. Every engagement starts with an honest audit, and sometimes it concludes “stay on the API”. You get that in writing too.' },
  { q: 'What if we want changes once we see it?', a: 'Expected, and priced in. Every deliverable includes two rounds of revisions, where a round is one consolidated set of changes rather than a trickle of one-liners. After that, further rounds are £1,275 each, fixed, so you can weigh up whether a change is worth it before you ask for it. Anything that is genuinely new scope rather than a revision gets quoted before I start, never after.' },
  { q: 'What happens if you get hit by a bus?', a: 'You own everything. Open models, your hardware, your data, and handover documentation written for whoever comes after me. Nothing about a local setup depends on me still being around, which is rather the point of owning it rather than renting it.' },
];

const SERVICE = {
  '@type': 'ProfessionalService',
  '@id': `${SITE}/#service`,
  name: 'Tom Butler: Local & Private AI',
  description:
    'Private AI systems that run on your own hardware: local LLM setups, private RAG over your own documents, and honest audits of what AI is costing you.',
  url: `${SITE}/services`,
  image: `${SITE}/og-image.png`,
  provider: { '@id': `${SITE}/#person` },
  // ProfessionalService is a LocalBusiness subtype, and Google wants an address on those.
  // It is the same locality as the Person; a rich-result test warns without it.
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'York',
    addressRegion: 'North Yorkshire',
    addressCountry: 'GB',
  },
  priceRange: '££',
  areaServed: [
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'AdministrativeArea', name: 'Yorkshire' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Local and private AI engagements',
    itemListElement: OFFERS.map((o) => ({
      '@type': 'Offer',
      name: o.name,
      description: o.description,
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: o.price,
        priceCurrency: 'GBP',
        valueAddedTaxIncluded: false,
        // "from": the listed figure is the entry price of the package, not the only price.
        minPrice: o.price,
      },
      eligibleDuration: {
        '@type': 'QuantitativeValue',
        value: o.duration,
      },
    })),
  },
};

const faqPage = () => ({
  '@type': 'FAQPage',
  '@id': `${SITE}/services#faq`,
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

const breadcrumb = (route) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
    {
      '@type': 'ListItem',
      position: 2,
      name: route.title.split('|')[0].trim(),
      item: `${SITE}${route.path}`,
    },
  ],
});

export function structuredDataFor(route) {
  const graph = [PERSON];

  if (route.path === '/') {
    graph.push(SERVICE, {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: SITE,
      name: 'Tom Butler',
      publisher: { '@id': `${SITE}/#person` },
    });
  }

  if (route.path === '/services') {
    graph.push(SERVICE, faqPage(), breadcrumb(route));
  }

  if (route.path === '/case-study') {
    graph.push(
      {
        '@type': 'TechArticle',
        '@id': `${SITE}/case-study#article`,
        headline: 'Answering security questionnaires without leaking the answers',
        description:
          'A RAG agent that drafts supplier security questionnaires, grounds every answer in policy, scores confidence, and routes weak answers to a human.',
        author: { '@id': `${SITE}/#person` },
        publisher: { '@id': `${SITE}/#person` },
        url: `${SITE}/case-study`,
        // Google's Article rich-result guidance asks for an image, and this graph had none:
        // the one route with a real article was the one route whose card was not described.
        image: `${SITE}/og-case-study.png`,
        about: ['Retrieval-Augmented Generation', 'Information security questionnaires', 'Local AI'],
      },
      breadcrumb(route)
    );
  }

  if (['/projects', '/about', '/contact', '/updates'].includes(route.path)) {
    graph.push(breadcrumb(route));
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

/** Exported so a test can assert the prices here have not drifted from content.ts. */
export const STRUCTURED_PRICES = OFFERS.map((o) => o.price);
export const STRUCTURED_FAQ_COUNT = FAQ.length;
/** The full FAQ (q + a), exported so the drift test can assert byte-for-byte parity with content.ts. */
export const STRUCTURED_FAQ = FAQ;
