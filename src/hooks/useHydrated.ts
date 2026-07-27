import { useEffect, useState } from 'react';

/**
 * False on the server and on the client's very first (hydrating) render. True afterwards.
 *
 * Use it for the handful of controls whose markup depends on state that only a browser has:
 * the theme (localStorage) and the effects toggle (localStorage plus a media query). Without
 * it, the server renders one value and the hydrating client renders another, React finds an
 * aria-pressed and an icon that do not match what it rendered, and it throws the whole tree
 * away (error #418) and rebuilds from scratch, which quietly undoes the entire prerender.
 *
 * With it, each such control picks ONE fixed placeholder that it renders whenever `hydrated`
 * is false. Because the hook returns false on both the server render and the first client
 * render, that placeholder is byte-identical on both sides, so there is nothing to mismatch.
 * The chosen placeholder is the consumer's call, not this hook's: ThemeToggle shows the dark
 * icon, MotionToggle shows effects-on. Once mounted, `hydrated` flips true and the control
 * shows the real value. The visible cost is at most one frame of a possibly-wrong header
 * icon; the alternative cost is the whole page.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
