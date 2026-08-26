import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { ROUTE_META, NOT_FOUND, SITE } from './routes.mjs';
import { structuredDataFor } from './structured-data.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const dist = resolve(root, 'dist');

const { render } = await import(resolve(root, '.ssr/entry-server.mjs'));

/** HTML-escape a value going into an attribute. An unescaped & or " ends the attribute. */
const attr = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const template = readFileSync(resolve(dist, 'index.html'), 'utf8');

// Vite writes this when build.manifest is on. It maps each module's source path
// (src/pages/AboutPage.tsx) to its content-hashed output chunk, which is the only way this
// script can learn a lazy route's chunk filename in order to preload it.
const manifest = JSON.parse(readFileSync(resolve(dist, '.vite/manifest.json'), 'utf8'));

// This script reads dist/index.html as its template and also writes dist/index.html (the /
// route), so running it a second time without a fresh `vite build` in between would feed the
// already-injected output back in as the template and produce nonsense. `npm run build` always
// rebuilds the client first, so the guard only bites when prerender is run alone by hand.
if (!template.includes('<div id="root"></div>')) {
  throw new Error(
    'prerender: dist/index.html already has rendered markup in #root. Run `npm run build` ' +
      '(which rebuilds the client template first), not scripts/prerender.mjs on its own.'
  );
}

/**
 * Swap one tag's content. Every replacement is anchored to the exact attribute that
 * identifies the tag, so a description can never overwrite an og:description.
 *
 * Every replacement uses a FUNCTION, never a template string. `String.replace(re, str)`
 * treats `$1`, `$&`, `` $` `` and `$'` in the *replacement* as backreferences, so the
 * moment a title or description contains a literal `$` (say "cut the $15-per-million-token
 * bill", entirely plausible on a site about API cost) the string form mangles the tag or,
 * with `$'`, injects the rest of the document. A function replacement takes the inserted
 * text verbatim.
 */
function replaceAttr(html, re, value) {
  return html.replace(re, (_m, open, close) => open + attr(value) + close);
}

/**
 * The sitewide card, used by any route that does not name its own.
 *
 * All cards are 1200x630, which is what the template's og:image:width/height already
 * declare, so a per-route card needs no change to those.
 */
const DEFAULT_IMAGE = 'og-image.png';
const DEFAULT_IMAGE_ALT = 'Tom Butler: software developer, Leeds.';

function withMeta(html, { title, description, url, image, imageAlt }) {
  let out = html.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${attr(title)}</title>`);
  out = replaceAttr(out, /(<meta\s+name="description"\s+content=")[^"]*(")/, description);
  out = replaceAttr(out, /(<meta\s+property="og:title"\s+content=")[^"]*(")/, title);
  out = replaceAttr(out, /(<meta\s+property="og:description"\s+content=")[^"]*(")/, description);
  out = replaceAttr(out, /(<meta\s+property="og:url"\s+content=")[^"]*(")/, url);
  out = replaceAttr(out, /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/, title);
  out = replaceAttr(out, /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, description);
  out = replaceAttr(out, /(<link\s+rel="canonical"\s+href=")[^"]*(")/, url);

  // The card. Absolute, always: LinkedIn, Facebook and X all reject a relative og:image
  // outright and fall back to no preview at all, so a leading slash here would silently
  // cost every shared link its image. Until this existed, all eight pages shipped the
  // template's single card, so /services and /case-study were shared with the home card.
  const card = `${SITE}/${image ?? DEFAULT_IMAGE}`;
  out = replaceAttr(out, /(<meta\s+property="og:image"\s+content=")[^"]*(")/, card);
  out = replaceAttr(out, /(<meta\s+property="og:image:alt"\s+content=")[^"]*(")/, imageAlt ?? DEFAULT_IMAGE_ALT);
  out = replaceAttr(out, /(<meta\s+name="twitter:image"\s+content=")[^"]*(")/, card);
  return out;
}

/** Replace the single Person block in the template with this route's graph. */
function withStructuredData(html, route) {
  // JSON.stringify escapes " and \, but not the sequence </script>, which would close the
  // element early if any hand-maintained string in the graph ever contained it. Escaping
  // the slash keeps the JSON valid and the script element intact.
  const json = JSON.stringify(structuredDataFor(route), null, 2).replace(/<\/script/gi, '<\\/script');
  return html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    () => `<script type="application/ld+json">\n${json}\n    </script>`
  );
}

function withMarkup(html, markup) {
  const target = '<div id="root"></div>';
  if (!html.includes(target)) {
    throw new Error('prerender: could not find <div id="root"></div> in the built template');
  }
  // Function replacement: the SSR markup contains `$`-heavy content (prices, template
  // artefacts), and a `$'` in it would otherwise expand to the rest of the document.
  return html.replace(target, () => `<div id="root">${markup}</div>`);
}

/**
 * Add a modulepreload for a code-split route's chunk.
 *
 * The prerendered HTML references only the entry chunk (main-*.js). A lazy route's chunk is
 * discovered only after that entry runs its dynamic import, so hydration on those routes
 * waterfalls: fetch main, execute main, THEN fetch the route. A <link rel="modulepreload"> in
 * the head lets the preload scanner fetch the route chunk in parallel with the entry chunk.
 *
 * Statically-imported routes (home, services) carry no `module` and are already inside the
 * entry chunk, so they get nothing. A route naming a module the manifest cannot resolve is a
 * hard error, not a silent skip: a stale path would quietly turn the optimisation off.
 */
function withPreload(html, route) {
  if (!route.module) return html;
  const entry = manifest[route.module];
  if (!entry || !entry.file) {
    throw new Error(
      `prerender: build manifest has no chunk for ${route.module} (route ${route.path}). ` +
        'Check build.manifest is on in vite.config.mjs and the module path in routes.mjs is current.'
    );
  }
  const link = `    <link rel="modulepreload" href="/${entry.file}">\n`;
  return html.replace('</head>', () => `${link}  </head>`);
}

function writeRoute(name, html) {
  // Both spellings, because GitHub Pages serves /services from services.html and
  // /services/ from services/index.html, and a link in the wild can be either.
  writeFileSync(resolve(dist, `${name}.html`), html);
  if (name !== 'index' && name !== '404') {
    mkdirSync(resolve(dist, name), { recursive: true });
    writeFileSync(resolve(dist, name, 'index.html'), html);
  }
}

const results = [];

for (const route of [...ROUTE_META, NOT_FOUND]) {
  const markup = await render(route.path);
  const url = route.path === '/' ? `${SITE}/` : `${SITE}${route.path}`;

  let html = withMeta(template, { ...route, url: route.file === '404' ? `${SITE}/404` : url });
  html = withStructuredData(html, route);
  html = withMarkup(html, markup);
  html = withPreload(html, route);

  // The 404 must not invite indexing. GitHub Pages serves this file with an HTTP 404 for
  // every unknown path, so a template default of "index, follow" plus a canonical pointing
  // at /404 told crawlers to index an error page that returns 404. noindex, and no canonical.
  if (route.file === '404') {
    html = html
      .replace(/(<meta\s+name="robots"\s+content=")[^"]*(")/, (_m, o, c) => o + 'noindex, follow' + c)
      .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>\s*/, '');
  }

  writeRoute(route.file, html);

  // The number that matters: how much readable prose a crawler that does not run
  // JavaScript now gets. It was zero.
  const text = markup.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  results.push({ route: route.path, chars: text.length });
}

/*
 * Fail the build if a route comes out empty.
 *
 * The failure mode this guards against is silent and expensive: a component starts
 * rendering nothing on the server (an unguarded `window`, a Suspense boundary that never
 * settles, a motion component serialising `opacity: 0`), the build still "succeeds", and
 * the site quietly goes back to being invisible to every crawler that does not run JS.
 * Nobody would notice for months.
 *
 * The 404 gets a lower bar because it is genuinely a short page, by design.
 */
const FLOOR = 600;
const FLOOR_404 = 250;

for (const r of results) {
  const floor = r.route === NOT_FOUND.path ? FLOOR_404 : FLOOR;
  if (r.chars < floor) {
    throw new Error(
      `prerender: ${r.route} produced only ${r.chars} characters of text (floor ${floor}). ` +
        `Something is rendering empty, which is exactly what this check exists to catch.`
    );
  }
}

console.log('\nprerendered:');
for (const r of results) {
  console.log(`  ${r.route.padEnd(16)} ${String(r.chars).padStart(6)} chars of crawlable text`);
}
