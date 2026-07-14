import React from 'react';
import ReactDOM from 'react-dom/client';

// Self-hosted fonts. Only the weights actually used: every extra weight is another file
// over the wire.
//
// `latin-` matters as much as the weight. The bare `400.css` entry points pull in every
// subset fontsource ships (cyrillic, cyrillic-ext, greek, vietnamese), which was 20 of
// the 37 @font-face blocks on a site that renders none of those scripts. Worse, six of
// the small subsets fell under Vite's 4 kB inline limit and were base64'd straight into
// the stylesheet, where they do not compress: 18.6 kB of the CSS was base64 Cyrillic.
// Latin-only took the stylesheet from 34.7 kB to 19.9 kB gzipped, and the CSS is on the
// critical path. There is no visual difference.
//
// Do not "fix" this by preloading the fonts: measured, it cost 740 ms of LCP, because on
// a throttled link the woff2 competes with the JS that first paint is actually waiting on.
import '@fontsource/orbitron/latin-500.css';
import '@fontsource/orbitron/latin-600.css';
import '@fontsource/orbitron/latin-700.css';
import '@fontsource/orbitron/latin-800.css';
import '@fontsource/exo-2/latin-400.css';
import '@fontsource/exo-2/latin-500.css';
import '@fontsource/exo-2/latin-600.css';
import '@fontsource/exo-2/latin-700.css';
import '@fontsource/share-tech-mono/latin-400.css';
import '@fontsource/jetbrains-mono/latin-400.css';
import '@fontsource/jetbrains-mono/latin-500.css';

import { Providers } from './Providers';
import { App } from './App';
import './app.css';

const container = document.getElementById('root') as HTMLElement;

const tree = (
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);

/*
 * Hydrate the prerendered markup rather than throwing it away.
 *
 * Every route is rendered to real HTML at build time (see src/entry-server.tsx), so #root
 * arrives with content in it. createRoot would discard all of that and rebuild the DOM
 * from scratch, which would undo the entire point: the browser would paint the real page,
 * then blank it, then paint it again.
 *
 * The `firstChild` check is not paranoia. It keeps `npm run dev` working, where Vite
 * serves the raw index.html with an empty #root and there is nothing to hydrate.
 */
if (container.firstChild) {
  ReactDOM.hydrateRoot(container, tree);
} else {
  ReactDOM.createRoot(container).render(tree);
}
