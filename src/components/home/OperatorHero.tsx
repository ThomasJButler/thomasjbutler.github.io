import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DecodeText } from '@/components/fx/DecodeText';
import { OperatorConsole } from './OperatorConsole';
import { HERO_EYEBROW, HERO_H1, HERO_SUB } from '@/lib/content';

function ScrollCue() {
  return (
    <button
      type="button"
      className="fx-scrollcue"
      onClick={() =>
        document.getElementById('below')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      aria-label="Scroll to what I build"
    >
      <span className="tri" aria-hidden="true">
        ▼
      </span>
      scroll
    </button>
  );
}

/**
 * The hero leads with the argument.
 *
 * Gone with the greeting: the rotating typed phrase. It looped forever, re-rendering the
 * hero on every character for as long as the tab was open, and once the H1 *is* the
 * thesis it was saying a quieter version of the same thing directly underneath it.
 *
 * The console stays, because it is the one place the terminal motif genuinely earns its
 * keep: `netstat --external` answering `0 bytes sent to third parties` is the sales
 * argument, dramatised, in the subject's own vernacular.
 */
export function OperatorHero() {
  return (
    <section className="fx-hero">
      <div className="fx-hero__grid">
        {/* fx-scrim paints the page background back in behind the copy, so the rain
            never sits directly behind a glyph of text. */}
        <div className="fx-hero__copy fx-scrim">
          <p className="fx-bootline">
            <DecodeText text={HERO_EYEBROW} step={18} />
          </p>

          <h1 className="fx-big">
            <DecodeText text={HERO_H1[0]} delay={200} step={52} window={320} />
            <span className="fx-big__turn">
              <DecodeText text={HERO_H1[1]} delay={620} step={52} window={320} />
            </span>
          </h1>

          <p className="fx-sub">{HERO_SUB}</p>

          <div className="fx-cta">
            <Button asChild size="xl">
              <Link to="/services">
                See what it costs <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link to="/contact">Talk it through</Link>
            </Button>
          </div>
        </div>

        <OperatorConsole />
      </div>

      <ScrollCue />
    </section>
  );
}
