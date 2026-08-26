import { SITE } from './routes.mjs';

/**
 * Structured data, per route.
 *
 * One Person, a WebSite on the home page, a TechArticle on the case study, and a
 * breadcrumb everywhere else. The ProfessionalService block with the offer catalogue, the
 * prices and the FAQPage that used to live here went with the Local & Private AI
 * positioning (shelved August 2026, preserved in the tag v-local-ai-2026-08).
 */

const PERSON = {
  '@type': 'Person',
  '@id': `${SITE}/#person`,
  name: 'Thomas J Butler',
  alternateName: 'Tom Butler',
  jobTitle: 'Full Stack Developer',
  url: SITE,
  email: 'dev@thomasjbutler.me',
  image: `${SITE}/og-image.png`,
  description:
    'Full Stack Developer working in Python and TypeScript: RAG pipelines, multi-agent tooling, entity resolution across public registers, and an on-device iOS app. Runs local models for personal use.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Leeds',
    addressRegion: 'West Yorkshire',
    addressCountry: 'GB',
  },
  sameAs: [
    'https://github.com/ThomasJButler',
    'https://www.linkedin.com/in/thomasbutleruk',
    'https://thomasjbutler.me',
  ],
  knowsAbout: [
    'Python',
    'TypeScript',
    'React',
    'Retrieval-Augmented Generation',
    'LangChain',
    'Entity resolution',
    'Swift',
    'On-Device AI',
    'Ollama',
    'Local AI',
  ],
};

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
    graph.push({
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: SITE,
      name: 'Tom Butler',
      publisher: { '@id': `${SITE}/#person` },
    });
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
