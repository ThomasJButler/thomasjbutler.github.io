import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface Options {
  /** Base ms per character while typing; jittered so it doesn't feel mechanical. */
  type?: number;
  /** Ms per character while deleting. Deleting is always faster than typing. */
  del?: number;
  /** How long a completed phrase sits before it starts deleting. */
  hold?: number;
}

/** Types a phrase, holds it, deletes it, moves to the next. Static under reduced motion. */
export function useTypedPhrases(
  phrases: string[],
  { type = 70, del = 40, hold = 2200 }: Options = {}
): string {
  const reduced = useReducedMotion();
  const [text, setText] = useState(phrases[0] ?? '');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;

    const phrase = phrases[index];
    if (!phrase) return;

    if (!deleting && text === phrase) {
      const timer = setTimeout(() => setDeleting(true), hold);
      return () => clearTimeout(timer);
    }

    if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }

    const next = deleting ? phrase.slice(0, text.length - 1) : phrase.slice(0, text.length + 1);
    const delay = deleting ? del : type + Math.random() * 40;
    const timer = setTimeout(() => setText(next), delay);
    return () => clearTimeout(timer);
  }, [text, index, deleting, phrases, type, del, hold, reduced]);

  // Start empty so the first phrase types itself in; reduced motion just shows it.
  useEffect(() => {
    if (!reduced) setText('');
  }, [reduced]);

  return text;
}
