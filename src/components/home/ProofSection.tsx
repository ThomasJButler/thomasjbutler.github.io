import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Reveal } from '@/components/fx/Reveal';
import { SectionHead } from '@/components/SectionHead';
import { CASE_STUDY, RECENT_ACTIVITY } from '@/lib/content';

/**
 * Proof, where the skill bars used to be.
 *
 * The reader has had the greeting. The next question is "can he actually build things?",
 * and the honest answer to that is a system I built and can describe in detail, plus
 * dated work they can go and look at. It is not a bar chart of my own opinion of myself.
 */
export function ProofSection() {
  return (
    <Reveal as="section" className="py-12">
      <SectionHead
        title="Proof, not promises"
        deck="The clearest way to judge whether I can build things is to read how I built one."
      />

      <div className="grid gap-4 lg:grid-cols-5">
        {/* The recent-work list takes the wide column. It carries five entries that were
            wrapping onto two lines each in the narrow one, while the case study card sat
            in the wide column half empty. The case study keeps fx-lead-card, so it is
            still the loudest thing here, just no longer the widest. */}
        <Card className="lg:col-span-3">
          <CardContent className="pt-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              recently
            </p>
            <ul className="mt-4 space-y-3.5">
              {RECENT_ACTIVITY.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.text} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
                      <Icon className="size-3" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm leading-tight text-foreground/90">
                        {item.text}
                      </span>
                      <span className="mt-1 flex items-center gap-2">
                        <Badge variant="secondary" className="h-4 px-1.5 py-0 text-[10px]">
                          {item.badge}
                        </Badge>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {item.year}
                        </span>
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>

        <Card className="fx-lead-card lg:col-span-2">
          <CardContent className="flex h-full flex-col pt-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary/90">
              case_study
            </p>
            <h3 className="mt-2 font-heading text-lg font-bold leading-snug text-foreground">
              {CASE_STUDY.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              {CASE_STUDY.subtitle}
            </p>
            <div className="mt-5">
              <Button asChild>
                <Link to="/case-study">
                  Read the case study <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </Reveal>
  );
}
