import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DecodeText } from '@/components/fx/DecodeText';
import { OperatorConsole } from './OperatorConsole';
import { HERO_EYEBROW, HERO_H1, HERO_SUB, HERO_ASIDE, LINKS } from '@/lib/content';

function ScrollCue() {
  return (
    <button
      type="button"
      className="fx-scrollcue"
      onClick={() =>
        document.getElementById('below')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      aria-label="Scroll to the work"
    >
      <span className="tri" aria-hidden="true">
        ▼
      </span>
      scroll
    </button>
  );
}

/**
 * The hero is a greeting again (see the note above HERO_H1 in content.ts for why).
 *
 * Still gone: the rotating typed phrase from v4. It looped forever, re-rendering the hero
 * on every character for as long as the tab was open.
 *
 * The console stays, because it is the one place the terminal motif earns its keep:
 * `cat status.txt` answering `open to full-time roles` is the one fact an employer wants,
 * in the subject's own vernacular. The two buttons split the two sites: everything here
 * is unpaid and chosen, the paid work is a click away, and HERO_ASIDE says so.
 */
export function OperatorHero() {
  return (
    <section className="fx-hero">
      <div className="fx-hero__grid">
        {/* The copy sits on a raised panel (.fx-hero__copy in app.css), the same idea as
            the console window beside it: the rain runs underneath, not through the words.
            It replaced a radial scrim that only dimmed the rain, which read fine over the
            dark ground and badly the moment a bright head glyph passed behind a letter. */}
        <div className="fx-hero__copy">
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
              <Link to="/projects">
                See the projects <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <a href={LINKS.commercial} target="_blank" rel="noopener noreferrer">
                Commercial and client work <ExternalLink className="size-4" />
              </a>
            </Button>
          </div>
          <p className="fx-sub mt-4 text-sm">{HERO_ASIDE}</p>
        </div>

        <OperatorConsole />
      </div>

      <ScrollCue />
    </section>
  );
}
