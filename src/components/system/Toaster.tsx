import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m as motion } from 'framer-motion';
import { onToast } from '@/lib/toast-bus';
import { EASE_OUT_EXPO } from '@/lib/fx/easing';

/**
 * One toast at a time, bottom centre, 3.8s.
 *
 * The live region stays mounted even when empty. The prototype returned null when
 * there was nothing to show, which means the region is created at the same moment
 * its content appears — and a live region that did not exist beforehand is not
 * reliably announced.
 */
export function Toaster() {
  const [message, setMessage] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return onToast((next) => {
      setMessage(next);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setMessage(null), 3800);
    });
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <div role="status" aria-live="polite" className="fx-toast-region">
      <AnimatePresence>
        {message && (
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className="fx-toast"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
