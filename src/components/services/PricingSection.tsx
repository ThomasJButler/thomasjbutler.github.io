import { Link } from 'react-router-dom';
import { ArrowRight, Check, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Reveal } from '@/components/fx/Reveal';
import { PRICING, PRICING_INTRO, PRICE_TBC } from '@/lib/content';
import { cn } from '@/lib/utils';

/**
 * Productised, fixed-fee offers.
 *
 * A price of null renders "Fixed fee · get a quote" rather than a placeholder number.
 * That keeps the page honest before Tom has set his figures, and the section still
 * does its main job: showing there are three defined ways to start, and that the
 * audit is the low-risk one.
 */
export function PricingSection() {
  return (
    <Reveal as="section" className="py-16">
      <div className="mb-5 flex items-center gap-2">
        <Receipt className="size-4 text-primary" />
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-primary/70">pricing</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
      </div>

      <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground">
        Three ways to start
      </h3>
      <p className="fx-scrim mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        {PRICING_INTRO}
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {PRICING.map((offer, i) => (
          <Card
            key={offer.title}
            className={cn('h-full', offer.lead && 'fx-lead-card')}
          >
            {offer.lead && <span className="fx-lead-card__flag">start_here</span>}

            <CardHeader>
              {/* pr-24 on the lead card: the flag chip is pinned top-right, and unlike
                  the full-width lead card on the services grid, this one is a third of
                  the width — the title runs straight into it otherwise. */}
              <CardTitle className={cn('font-heading text-base', offer.lead && 'pr-24')}>
                {offer.title}
              </CardTitle>
              <p className="mt-2 font-heading text-2xl font-bold text-foreground">
                {offer.price ?? (
                  <span className="text-base font-medium text-primary">{PRICE_TBC}</span>
                )}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {offer.duration}
              </p>
            </CardHeader>

            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{offer.summary}</p>
              <ul className="mt-4 space-y-2">
                {offer.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button asChild size="lg" className="glow-pulse">
          <Link to="/contact">
            Talk it through <ArrowRight className="size-4" />
          </Link>
        </Button>
        <p className="font-mono text-xs text-muted-foreground">
          No obligation. If local AI is wrong for you, I will say so.
        </p>
      </div>
    </Reveal>
  );
}
