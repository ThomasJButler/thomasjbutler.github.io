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
 *
 * 3. Every character slot is sized by its *final* character, with the animating glyph
 *    laid over the top. The scramble alphabet is half-width katakana and symbols, whose
 *    advance widths are nothing like the latin they stand in for, so a slot that sizes
 *    itself to the current glyph re-widths on every frame, re-wraps the words, and moves
 *    the line. On the home hero that was measured at 0.075 CLS, all of the page's score,
 *    on the LCP element itself. The hidden sizer holds the box still; it also re-measures
 *    for free when the web font finishes loading.
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
        } else if (state === 'pending' && states[i] !== 'pending') {
          // A character waiting its turn shows its real self. See the note on the render
          // below: nothing here is ever invisible.
          el.textContent = chars[i];
        }

        // Only touch className on a transition, so the 0.45s lock glow fires once.
        if (state !== states[i]) {
          el.className = `ch__glyph ch--${state}`;
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
                /*
                 * ONE shape, whatever the motion preference. Do not branch here.
                 *
                 * This used to render a flat <span class="ch ch--locked"> under reduced
                 * motion and the sizer/glyph pair otherwise. That is a different DOM tree,
                 * and the server cannot know which one to write: framer-motion's
                 * useReducedMotion returns null during a Node prerender, so the build
                 * always emitted the animated shape. A visitor with
                 * `prefers-reduced-motion: reduce` then hydrated the other one, React found
                 * a structural mismatch, and threw the whole prerendered tree away (#418) to
                 * rebuild it from scratch. The page still worked, which is what made it
                 * dangerous: it silently undid the entire prerender for exactly the people
                 * least able to afford a slow, janky page.
                 *
                 * The branch is unnecessary anyway. `.ch--pending` is opacity 1 and the glyph
                 * already carries its real character, so this markup is *already* the
                 * finished text. Under reduced motion the effect above simply returns
                 * without starting the rAF loop, and the finished text is what stays on
                 * screen.
                 */
                return (
                  <span key={i} className="ch">
                    {/* Reserves the slot at the size of the finished character, so the
                        glyph churn above it cannot re-wrap the line. */}
                    <span className="ch__sizer">{char}</span>
                    {/* The glyph is rendered WITH its real character, not empty. This is
                        what the server writes into the prerendered HTML, so the headline
                        is painted and legible on the very first frame, before a single
                        byte of JavaScript has run. The scramble then plays over the top
                        of it. An empty span here would hand a crawler the words and hand
                        a browser a blank screen. */}
                    <span
                      ref={(el) => {
                        spanRefs.current[i] = el;
                      }}
                      className="ch__glyph ch--pending"
                    >
                      {char}
                    </span>
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
