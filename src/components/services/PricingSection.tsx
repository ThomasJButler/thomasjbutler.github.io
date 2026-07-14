import { Link } from 'react-router-dom';
import { ArrowRight, Check, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Reveal } from '@/components/fx/Reveal';
import { SectionHead } from '@/components/SectionHead';
import { ENGAGEMENT_TERMS, PRICING, PRICING_INTRO, PRICE_TBC, RETAINER } from '@/lib/content';
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
      <SectionHead title="Three ways to start" deck={PRICING_INTRO} />

      <div className="grid gap-4 lg:grid-cols-3">
        {PRICING.map((offer, i) => (
          <Card
            key={offer.title}
            className={cn('h-full', offer.lead && 'fx-lead-card')}
          >
            {offer.lead && <span className="fx-lead-card__flag">start_here</span>}

            <CardHeader>
              {/* pr-24 on the lead card: the flag chip is pinned top-right, and unlike
                  the full-width lead card on the services grid, this one is a third of
                  the width, so the title runs straight into it otherwise. The min-height
                  reserves two lines on every card: "AI Cost & Privacy Audit" wraps and
                  the others do not, which otherwise drops its price a line below theirs
                  and the three anchors stop reading as a row. */}
              <CardTitle
                className={cn('flex min-h-12 items-start font-heading text-base', offer.lead && 'pr-24')}
              >
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

      {/* The retainer is not an upsell tacked on the end. "AI you own" means there is no
          vendor to call when the model drifts, so somebody has to maintain it. Saying that
          plainly is more convincing than pretending the question does not arise. */}
      <Card className="mt-4">
        <CardContent className="flex flex-wrap items-baseline gap-x-4 gap-y-2 pt-5">
          <span className="font-heading text-base font-bold text-foreground">{RETAINER.title}</span>
          <span className="font-heading text-lg font-bold text-primary">{RETAINER.price}</span>
          <p className="min-w-[16rem] flex-1 text-sm leading-relaxed text-muted-foreground">
            {RETAINER.summary}
          </p>
        </CardContent>
      </Card>

      {/* Iteration, stated up front. A fixed fee with no revision limit is an hourly job
          at a bad rate that nobody has admitted to yet. */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Card size="sm" className="h-full">
          <CardHeader>
            <CardTitle className="font-mono text-xs uppercase tracking-[0.2em] text-primary/70">
              included
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {ENGAGEMENT_TERMS.included.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card size="sm" className="h-full">
          <CardHeader>
            <CardTitle className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              charged separately
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {ENGAGEMENT_TERMS.charged.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Plus className="mt-0.5 size-3.5 shrink-0 text-muted-foreground/70" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* The one primary action on /services. The bottom-of-page CTA is deliberately an
          outline: two glowing buttons on one page means neither of them is the next step. */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button asChild size="xl" className="glow-pulse">
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
