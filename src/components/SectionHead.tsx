import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadProps {
  /** The real heading, in human words. This is the h2. */
  title: string;
  /** One line of context under it. Optional, and usually worth it. */
  deck?: ReactNode;
  /**
   * The machine voice, e.g. `netstat --external`. Optional and rationed on purpose:
   * only pass it where the terminal is actually saying something.
   */
  eyebrow?: string;
  className?: string;
}

/**
 * One section opener for the whole site.
 *
 * What this replaces: the same device repeated eleven times, five of them on the case
 * study alone. An icon, a `// snake_case` mono label as the h2, and a hairline fading
 * off to the right. Repeated that often it stops being a signal and becomes wallpaper,
 * and it inverted the heading hierarchy every time it was used: the decorative label was
 * the h2 and the actual heading was an h3 underneath it, so `why_local_ai` sat directly
 * on top of "Why Local AI" - the same words twice, in two typefaces.
 *
 * So: the human heading is the h2, and it is the loudest thing in the section. The mono
 * eyebrow survives only where the machine voice earns its place. The hairline is gone
 * entirely; spacing does that job now, and it does it without drawing a line under every
 * thought.
 */
export function SectionHead({ title, deck, eyebrow, className }: SectionHeadProps) {
  return (
    <div className={cn('mb-7', className)}>
      {eyebrow && (
        <p className="mb-2 font-mono text-xs tracking-[0.18em] text-primary/90">{eyebrow}</p>
      )}
      <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-[28px]">
        {title}
      </h2>
      {deck && (
        <p className="fx-scrim mt-2.5 max-w-2xl leading-relaxed text-muted-foreground">{deck}</p>
      )}
    </div>
  );
}
