import { Fragment, useEffect, useMemo, useRef, type ElementType } from 'react';
import { useReducedMotion } from 'framer-motion';
import {
  charStateAt,
  decodeDuration,
  randomScrambleChar,
  splitText,
  type CharState,
  type DecodeTiming,
} from '@/lib/fx/decode';
import { cn } from '@/lib/utils';

interface DecodeTextProps {
  text: string;
  delay?: number;
  step?: number;
  /** How long each character scrambles before it locks. */
  window?: number;
  className?: string;
  as?: ElementType;
  onDone?: () => void;
}

/**
 * Text that resolves character by character, left to right.
 *
 * Two things here are deliberate and worth not "simplifying":
 *
 * 1. The animation is driven by imperative writes to span refs, not by state. The
 *    prototype re-rendered on every frame and picked its scramble glyphs *during
 *    render* — which is impure, so React 19's StrictMode double-render produces
 *    different output each pass, and any unrelated re-render re-randomises the text.
 *    Rendering a static DOM once and writing textContent per frame keeps render pure
 *    and costs zero reconciliation, which matters when ~10 of these run at once
 *    alongside the rain.
 *
 * 2. The real text is in an sr-only span and the glyph spans are aria-hidden. The
 *    prototype put aria-label on a bare <span>, which is prohibited ARIA (a span has
 *    an implicit generic role) — axe flags it and screen readers increasingly ignore
 *    it, so its "screen readers never see scramble" promise did not actually hold.
 */
export function DecodeText({
  text,
  delay = 0,
  step = 42,
  window: windowMs = 320,
  className,
  as: Tag = 'span',
  onDone,
}: DecodeTextProps) {
  const reduced = useReducedMotion();
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  const { chars, words } = useMemo(() => splitText(text), [text]);
  const timing: DecodeTiming = useMemo(
    () => ({ delay, step, window: windowMs }),
    [delay, step, windowMs]
  );

  useEffect(() => {
    if (reduced) {
      onDoneRef.current?.();
      return;
    }

    const total = decodeDuration(chars.length, timing);
    const start = performance.now();
    const states: CharState[] = chars.map(() => 'pending');
    let raf = 0;

    const frame = (now: number) => {
      const elapsed = now - start;

      for (let i = 0; i < chars.length; i++) {
        const el = spanRefs.current[i];
        if (!el) continue;
        const state = charStateAt(i, elapsed, timing);

        if (state === 'scramble') {
          el.textContent = randomScrambleChar();
        } else if (state === 'locked' && states[i] !== 'locked') {
          el.textContent = chars[i];
        }

        // Only touch className on a transition, so the 0.45s lock glow fires once.
        if (state !== states[i]) {
          el.className = `ch ch--${state}`;
          states[i] = state;
        }
      }

      if (elapsed < total) {
        raf = requestAnimationFrame(frame);
      } else {
        onDoneRef.current?.();
      }
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [chars, timing, reduced]);

  return (
    <Tag className={cn('decode', className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map(([from, to], w) => (
          <Fragment key={from}>
            {w > 0 && ' '}
            <span className="ch-word">
              {chars.slice(from, to).map((char, k) => {
                const i = from + k;
                return (
                  <span
                    key={i}
                    ref={(el) => {
                      spanRefs.current[i] = el;
                    }}
                    className={reduced ? 'ch ch--locked' : 'ch ch--pending'}
                  >
                    {reduced ? char : ' '}
                  </span>
                );
              })}
            </span>
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
