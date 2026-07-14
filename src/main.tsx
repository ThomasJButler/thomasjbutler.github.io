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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
