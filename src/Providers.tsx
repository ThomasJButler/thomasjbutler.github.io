import type { ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AccentProvider } from '@/contexts/AccentContext';
import { FxProvider } from '@/contexts/FxContext';

/**
 * The whole provider stack, in one place, so tests render the same tree we ship.
 *
 * MotionConfig reducedMotion="user" is the safety net: it suppresses transform and
 * layout animations for every motion.* component beneath it, including ones added
 * later by someone who forgot to call useReducedMotion. The CSS
 * @media (prefers-reduced-motion) block in app.css cannot do this, because
 * framer-motion animates via inline styles rather than CSS transitions.
 *
 * It does NOT reach imperative systems (the rain canvas, decode text, the boot
 * typer, the custom cursor) — those call useReducedMotion() themselves.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AccentProvider>
        <FxProvider>
          <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </FxProvider>
      </AccentProvider>
    </ThemeProvider>
  );
}
