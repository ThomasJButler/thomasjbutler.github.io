import { useCallback, useEffect, useRef, useState } from 'react';
import { burstRain } from '@/lib/rain-bus';
import { cn } from '@/lib/utils';

export const BOOT_SESSION_KEY = 'v5:booted';

const LINE = 'Wake up, Tom...';

/**
 * "Wake up, Tom..." — once per session.
 *
 * It is a real modal (role=dialog, aria-modal, focus trapped on the skip button)
 * rather than the prototype's bare div with a <span> skip chip. The overlay covers
 * the page and locks scrolling, so an assistive-tech user who could not dismiss it
 * would simply be stranded.
 *
 * The page renders behind it rather than being gated on it, so the overlay never
 * delays LCP.
 */
export function BootIntro({ onDone }: { onDone: () => void }) {
  const [typed, setTyped] = useState('');
  const [leaving, setLeaving] = useState(false);
  const skipRef = useRef<HTMLButtonElement>(null);
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setLeaving(true);
    burstRain();
    setTimeout(onDone, 380); // matches the CSS fade
  }, [onDone]);

  // Type the line out, character by character, pausing after punctuation.
  useEffect(() => {
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;

    const step = () => {
      i += 1;
      setTyped(LINE.slice(0, i));

      if (i >= LINE.length) {
        timer = setTimeout(finish, 700); // hold on the finished line
        return;
      }
      const punctuation = ',.'.includes(LINE[i - 1]) ? 200 : 0;
      timer = setTimeout(step, 34 + Math.random() * 48 + punctuation);
    };

    timer = setTimeout(step, 34);
    return () => clearTimeout(timer);
  }, [finish]);

  // Skip on any clear intent to get on with it.
  useEffect(() => {
    skipRef.current?.focus();
    document.body.classList.add('fx-lock');

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') finish();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', finish, { passive: true });
    window.addEventListener('touchmove', finish, { passive: true });

    return () => {
      document.body.classList.remove('fx-lock');
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', finish);
      window.removeEventListener('touchmove', finish);
    };
  }, [finish]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Intro"
      className={cn('fx-boot', leaving && 'is-out')}
      onClick={finish}
    >
      <p className="fx-boot__line">
        {typed}
        <span className="fx-caret" aria-hidden="true" />
      </p>

      <button ref={skipRef} type="button" className="fx-skip" onClick={finish}>
        [ skip · esc ]
      </button>
    </div>
  );
}
