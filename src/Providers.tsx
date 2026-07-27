import type { ReactNode } from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
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
 *
 * LazyMotion + `domAnimation` ships the animation and gesture features and drops the
 * rest: 12.3 kB gzipped off the entry chunk, measured. `domAnimation` is enough because
 * nothing here uses drag, layout or layoutId (those are the only things `domMax` adds).
 * whileInView is a *gesture* feature, so Reveal keeps working. `strict` is the guardrail:
 * it throws if anyone reintroduces a plain `motion.*` component, which would silently
 * pull the full bundle back in. Every call site imports `m as motion`, so `motion.div`
 * still reads normally.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AccentProvider>
        <FxProvider>
          <LazyMotion features={domAnimation} strict>
            <MotionConfig reducedMotion="user">{children}</MotionConfig>
          </LazyMotion>
        </FxProvider>
      </AccentProvider>
    </ThemeProvider>
  );
}
