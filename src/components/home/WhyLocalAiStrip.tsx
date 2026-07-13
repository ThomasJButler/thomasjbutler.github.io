import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Reveal } from '@/components/fx/Reveal';
import { WHY_LOCAL_AI_STATS } from '@/lib/content';

/**
 * The argument, in three numbers, straight after the offer.
 *
 * The full three-paragraph version lives on /services. This is the compressed form:
 * a buyer scanning the home page should get the case for local AI without reading
 * prose.
 */
export function WhyLocalAiStrip() {
  return (
    <Reveal as="section" className="py-10">
      <div className="mb-5 flex items-center gap-2">
        <ShieldCheck className="size-4 text-primary" />
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-primary/70">
          why_local_ai
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
      </div>

      <p className="fx-scrim max-w-2xl leading-relaxed text-muted-foreground">
        Most businesses rent their AI. Every API call is a meter running, and every
        prompt sends your data to a server you don&apos;t control.{' '}
        <Link to="/services" className="text-primary underline-offset-4 hover:underline">
          There is another way
        </Link>
        .
      </p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {WHY_LOCAL_AI_STATS.map((stat, i) => (
          <Reveal key={stat.label} index={i}>
            <Card size="sm" className="h-full text-center hover:border-primary/30">
              <CardContent className="pt-5 pb-4">
                <div className="glow-text font-heading text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </Reveal>
  );
}
