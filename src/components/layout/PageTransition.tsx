import { useLayoutEffect, type ReactNode } from 'react';
import { m as motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT_EXPO, STEPS_2 } from '@/lib/fx/easing';

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

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  if (reduced) return <div>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
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
