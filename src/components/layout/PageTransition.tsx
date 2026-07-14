import { useEffect, useLayoutEffect, type ReactNode } from 'react';
import { m as motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT_EXPO, STEPS_2 } from '@/lib/fx/easing';

/**
 * The very first page of a visit does not fade in. Every one after it does.
 *
 * This wraps <Outlet/>, so its `initial={{ opacity: 0 }}` is the opacity of the entire
 * body of every route. Prerendered, that serialises as `style="opacity:0"` on the whole
 * page: a crawler would read the words, a browser would paint a blank screen, and the
 * point of prerendering would be lost in the one place it matters most.
 *
 * A module-scoped flag rather than state, deliberately. It has to be false during the
 * server render AND during the client's hydrating render, so both produce identical
 * markup, and it must not reset when a component remounts. Route changes after that get
 * the full glitch-out and fade-in, which is where the transition was always for.
 */
let hasEntered = false;

/**
 * Glitch-out, swap, enter.
 *
 * Scroll-to-top happens here on mount rather than in Layout: with
 * AnimatePresence mode="wait" the incoming page mounts only after the outgoing
 * one has finished leaving, which is precisely when we want to jump to the top.
 * Doing it on a location effect in Layout would fire during the exit and yank
 * the page out from under the animation.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const isFirst = !hasEntered;

  useEffect(() => {
    hasEntered = true;
  }, []);

  useLayoutEffect(() => {
    // Not on the first paint: a prerendered page is already at the top, and calling
    // scrollTo here would fight a browser restoring a scroll position on reload.
    if (!isFirst) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [isFirst]);

  if (reduced) return <div>{children}</div>;

  return (
    <motion.div
      initial={isFirst ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        opacity: [1, 0.75, 0.4, 0],
        x: [0, -5, 4, -2],
        skewX: [0, 0, 0.4, 0],
        y: [0, 0, 0, -6],
        filter: [
          'brightness(1)',
          'brightness(1.5) saturate(1.3)',
          'brightness(0.85)',
          'brightness(1)',
        ],
        // The exit's own transition rides inside the target object; a top-level
        // `exit` key on `transition` is not a thing in framer-motion.
        transition: { duration: 0.2, ease: STEPS_2, times: [0, 0.3, 0.65, 1] },
      }}
      transition={{ duration: 0.42, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}
