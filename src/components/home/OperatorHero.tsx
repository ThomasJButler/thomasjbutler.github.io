import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DecodeText } from '@/components/fx/DecodeText';
import { OperatorConsole } from './OperatorConsole';
import { useTypedPhrases } from '@/hooks/useTypedPhrases';
import { HERO_EYEBROW, HERO_PHRASES, HERO_SUB } from '@/lib/content';

function ScrollCue() {
  return (
    <button
      type="button"
      className="fx-scrollcue"
      onClick={() =>
        document.getElementById('below')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      aria-label="Scroll to system status"
    >
      <span className="tri" aria-hidden="true">
        ▼
      </span>
      scroll
    </button>
  );
}

export function OperatorHero() {
  const phrase = useTypedPhrases(HERO_PHRASES);

  return (
    <section className="fx-hero">
      <div className="fx-hero__grid">
        {/* fx-scrim paints the page background back in behind the copy, so the rain
            never sits directly behind a glyph of text. */}
        <div className="fx-hero__copy fx-scrim">
          <p className="fx-bootline">
            <DecodeText text={HERO_EYEBROW} step={22} />
          </p>

          <h1 className="fx-big">
            <DecodeText text="Hey, I'm Tom" delay={280} step={70} window={360} />
          </h1>

          <div className="fx-typedline">
            <span className="pre">{'// I build '}</span>
            <span className="word">{phrase}</span>
            <span className="fx-caret" aria-hidden="true" />
          </div>

          <p className="fx-sub">{HERO_SUB}</p>

          {/* Business-first: the loudest control on the page is the offer, not the
              portfolio. Projects is one click away in the nav. */}
          <div className="fx-cta">
            <Button asChild size="lg">
              <Link to="/services">
                What I Build <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>

        <OperatorConsole />
      </div>

      <ScrollCue />
    </section>
  );
}
