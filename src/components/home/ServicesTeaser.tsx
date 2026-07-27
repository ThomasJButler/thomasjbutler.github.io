import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Database, FileSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Reveal } from '@/components/fx/Reveal';
import { SectionHead } from '@/components/SectionHead';

/**
 * The offer, immediately below the hero.
 *
 * This is the first thing a business visitor should meet. It mirrors the three
 * fixed-fee offers on /services rather than the seven-card capability grid: someone
 * deciding whether to hire you does not want a menu, they want the one thing to start
 * with.
 */
const TEASERS = [
  {
    icon: FileSearch,
    title: 'AI Cost & Privacy Audit',
    copy: 'What you are actually spending, what is actually leaving the building, and a straight recommendation. The place to start.',
  },
  {
    icon: Cpu,
    title: 'Local LLM Setups',
    copy: 'Open models on your own hardware. Same results as the APIs for everyday work, with no per-token bill.',
  },
  {
    icon: Database,
    title: 'Private RAG Systems',
    copy: 'Your own documents, searchable and answerable, with citations, and none of them sent to a third party.',
  },
];

export function ServicesTeaser() {
  return (
    <Reveal as="section" className="py-10">
      <SectionHead
        title="What I build"
        deck="Three fixed-fee ways in. The audit is the cheapest way to find out whether the other two are worth doing."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {TEASERS.map((t, i) => {
          const Icon = t.icon;
          return (
            <Reveal key={t.title} index={i}>
              <Card className="h-full transition-shadow hover:ring-2 hover:ring-primary/30">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </div>
                    <CardTitle className="font-heading text-sm">{t.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t.copy}</p>
                </CardContent>
              </Card>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button asChild>
          <Link to="/services">
            See what it costs <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button asChild variant="ghost">
          <Link to="/case-study">Read a case study</Link>
        </Button>
      </div>
    </Reveal>
  );
}
