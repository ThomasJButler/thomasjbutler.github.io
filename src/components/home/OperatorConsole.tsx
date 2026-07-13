import { useEffect, useRef, useState } from 'react';
import { RotateCw } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { CONSOLE_SCRIPT } from '@/lib/content';
import { cn } from '@/lib/utils';

interface Line {
  type: 'cmd' | 'out';
  text: string;
  highlight?: boolean;
}

/**
 * A terminal that types itself out once: whoami, a local model run, a check that
 * nothing left the machine, and the service list. The whole point of the hero.
 *
 * The script is scheduled up front as a chain of timeouts off an accumulator rather
 * than a chain of nested callbacks, so a rerun just clears them all and starts over.
 */
export function OperatorConsole() {
  const reduced = useReducedMotion();
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState<string | null>(null);
  const [ended, setEnded] = useState(false);
  const [runId, setRunId] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLines([]);
    setTyping(null);
    setEnded(false);

    if (reduced) {
      // No typing: print the finished session.
      setLines(
        CONSOLE_SCRIPT.flatMap<Line>((step) => [
          { type: 'cmd', text: step.cmd },
          ...step.out.map<Line>((o) => ({ type: 'out', text: o.text, highlight: o.highlight })),
        ])
      );
      setEnded(true);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));

    let acc = 500; // lead-in, so the hero text lands first

    for (const step of CONSOLE_SCRIPT) {
      for (let k = 1; k <= step.cmd.length; k++) {
        const slice = step.cmd.slice(0, k);
        at(() => setTyping(slice), acc);
        acc += 24 + Math.random() * 26;
      }
      acc += 200; // beat before "enter"
      at(() => {
        setTyping(null);
        setLines((l) => [...l, { type: 'cmd', text: step.cmd }]);
      }, acc);

      for (const out of step.out) {
        acc += 300;
        at(() => setLines((l) => [...l, { type: 'out', text: out.text, highlight: out.highlight }]), acc);
      }
      acc += 560; // between commands
    }

    at(() => setEnded(true), acc);
    return () => timers.forEach(clearTimeout);
  }, [runId, reduced]);

  // Keep the newest line in view.
  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  });

  return (
    <div className="fx-console">
      <div className="fx-console__bar">
        <span className="fx-dots">
          <i className="r" />
          <i className="y" />
          <i className="g" />
        </span>
        <span className="fx-console__path">tom@local: ~</span>
        <button
          type="button"
          className="fx-console__rerun"
          onClick={() => setRunId((r) => r + 1)}
        >
          <RotateCw className="size-3" aria-hidden="true" />
          rerun
        </button>
      </div>

      <div className="fx-console__body" ref={bodyRef} aria-live="off">
        {lines.map((line, i) =>
          line.type === 'cmd' ? (
            <div key={i} className="cline">
              <span className="p">$ </span>
              {line.text}
            </div>
          ) : (
            <div key={i} className={cn('oline', line.highlight && 'hl')}>
              {line.text}
            </div>
          )
        )}

        {typing !== null && (
          <div className="cline">
            <span className="p">$ </span>
            {typing}
            <span className="fx-caret" />
          </div>
        )}

        {ended && (
          <div className="cline">
            <span className="p">$ </span>
            <span className="fx-caret" />
          </div>
        )}
      </div>
    </div>
  );
}
