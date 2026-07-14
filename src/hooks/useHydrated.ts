import { useEffect, useState } from 'react';

/**
 * False on the server and on the client's very first (hydrating) render. True afterwards.
 *
 * Use it for the handful of controls whose markup depends on state that only a browser
 * has: the theme (localStorage), the effects toggle (localStorage plus a media query).
 * The server has to guess, and it guesses "dark, effects off", while a typical visitor
 * hydrates as "dark, effects on". React then finds an aria-pressed and an icon that do
 * not match what it rendered and throws away the whole tree (error #418), which quietly
 * costs you the entire benefit of prerendering: the browser paints the real page, then
 * discards it and rebuilds it from scratch.
 *
 * So those controls render one fixed, neutral state until hydration is finished, and
 * correct themselves immediately after. The visible cost is one frame of a possibly wrong
 * icon in the header. The alternative cost is the whole page.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
