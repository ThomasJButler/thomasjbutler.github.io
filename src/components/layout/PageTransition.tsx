import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import { m as motion } from 'framer-motion';
import { EASE_OUT_EXPO, STEPS_2 } from '@/lib/fx/easing';

/**
 * The very first page of a visit does not fade in. Every one after it does.
 *
 * This wraps <Outlet/>, so its `initial={{ opacity: 0 }}` is the opacity of the entire body
 * of every route. Prerendered, that would serialise as `style="opacity:0"` on the whole
 * page: a crawler would read the words and a browser would paint a blank screen, losing the
 * point of prerendering in the one place it matters most.
 *
 * A module-scoped flag rather than state, deliberately. It has to be false during the server
 * render AND during the client's hydrating render, so both produce identical markup, and it
 * must not reset when a component remounts.
 */
let hasEntered = false;

/**
 * Glitch-out, swap, enter.
 *
 * Scroll-to-top happens here on mount rather than in Layout: with AnimatePresence
 * mode="wait" the incoming page mounts only after the outgoing one has finished leaving,
 * which is precisely when we want to jump to the top. Doing it on a location effect in
 * Layout would fire during the exit and yank the page out from under the animation.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  /*
   * Frozen for the life of this instance, and that is the entire fix.
   *
   * `hasEntered` was read on every render (`const isFirst = !hasEntered`). The mount effect
   * flips it to true without re-rendering, so the NEXT render of the same instance saw
   * isFirst go true -> false, which changed the dependency array of the layout effect below
   * and fired scrollTo({ top: 0 }) on a route that had not changed.
   *
   * What that meant for a real visitor: land on the home page, scroll down to read, and then
   * get thrown back to the top the first time Layout re-renders. Toggling the theme did it.
   * Opening the command palette did it. And so did doing nothing at all for 22 seconds,
   * because the white-rabbit timer calls setRabbit(true) in Layout, which re-renders it.
   */
  const isFirstRef = useRef(!hasEntered);

  useEffect(() => {
    hasEntered = true;
  }, []);

  useLayoutEffect(() => {
    // Mount only. Not on the first page of a visit: a prerendered page is already at the
    // top, and scrolling here would fight a browser restoring a position on reload.
    if (!isFirstRef.current) window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  /*
   * No `if (reduced) return <div>{children}</div>` here, and it is not an oversight.
   *
   * That branch rendered a structurally different tree for a value the server cannot know:
   * framer-motion's useReducedMotion returns null during a Node prerender, so the build
   * always emitted one shape and a reduced-motion visitor hydrated the other. That is the
   * same defect that made DecodeText discard the whole prerendered tree (React #418), and a
   * component wrapping <Outlet/> is the worst possible place to hide a second copy of it.
   *
   * It is also redundant. `MotionConfig reducedMotion="user"` in Providers already
   * suppresses the transform for anyone who asked for less motion, leaving a plain fade.
   * That is what MotionConfig is there for.
   */
  return (
    <motion.div
      initial={isFirstRef.current ? false : { opacity: 0, y: 14 }}
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
