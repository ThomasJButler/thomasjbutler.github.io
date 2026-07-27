import { StrictMode } from 'react';
// `prerenderToNodeStream`, not `prerender`.
//
// react-dom/static has two shapes. Under the browser/edge condition it exports `prerender`
// and hands back a Web ReadableStream; under Node it exports `prerenderToNodeStream` and
// hands back a Node Readable. TypeScript is happy with either, so this is only discovered
// at build time, as "prerender is not a function".
import { prerenderToNodeStream } from 'react-dom/static';
// React Router 7 hoisted StaticRouter into `react-router` itself; `react-router-dom` is
// now a thin re-export and has no /server subpath.
import { StaticRouter } from 'react-router';
import { Providers } from './Providers';
import { AppRoutes } from './App';

/**
 * The build-time render.
 *
 * Why this exists: `<div id="root">` shipped empty, so a route like /services contained
 * literally zero characters of body text. GPTBot, ClaudeBot and PerplexityBot fetch HTML
 * and do not run JavaScript, so every word on this site was invisible to them, and a
 * browser could paint nothing until ~142 kB of JS had arrived, parsed and executed.
 *
 * Two things worth knowing if you touch this:
 *
 * 1. It uses `prerender` from react-dom/static, not `renderToString`. Four of the seven
 *    routes are React.lazy, and renderToString does not await Suspense: it would happily
 *    serialise the loading spinner into the HTML and call it a page. `prerender` waits for
 *    the whole tree to settle. It needs no new dependency; React 19 ships it.
 *
 * 2. It deliberately does not import `main.tsx`. That file carries eleven @fontsource CSS
 *    side-effect imports, which Node cannot parse. `AppRoutes` is exported separately from
 *    `App` precisely so the router can be swapped: `App` hard-codes BrowserRouter, and on
 *    the server there is no browser history to read.
 */
export async function render(url: string): Promise<string> {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <Providers>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </Providers>
    </StrictMode>
  );

  // Drain the Node Readable into the string the build will inject.
  const chunks: Buffer[] = [];
  for await (const chunk of prelude) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString('utf8');
}
