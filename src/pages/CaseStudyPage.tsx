import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Lock, Workflow } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Reveal } from '@/components/fx/Reveal';
import { DecodeText } from '@/components/fx/DecodeText';
import { CASE_STUDY } from '@/lib/content';
import { projects } from '@/lib/projects';

/**
 * A deep-dive on one piece of work.
 *
 * This is deliberately a technical case study of my own project, not a client
 * reference — so there is nobody's permission to get and nothing to embellish. The
 * Results block renders only when CASE_STUDY.results has real, measured figures; it
 * is absent rather than fabricated.
 */
export function CaseStudyPage() {
  useEffect(() => {
    document.title = `${CASE_STUDY.title} | Tom Butler`;
  }, []);

  const project = projects.find((p) => p.id === CASE_STUDY.projectId);

  return (
    <div className="fx-page mx-auto max-w-5xl px-6 py-16">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.2em] text-primary/70">
          <DecodeText text="// case_study" step={20} />
        </p>
        <h1 className="mt-3 max-w-3xl font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {CASE_STUDY.title}
        </h1>
        <p className="fx-scrim mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {CASE_STUDY.subtitle}
        </p>

        {project && (
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {project.topics.map((t) => (
              <Badge key={t} variant="secondary" className="font-mono text-xs">
                {t}
              </Badge>
            ))}
            {project.links.github && (
              <Button asChild variant="ghost" size="sm" className="ml-1">
                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="size-3.5" /> Code
                </a>
              </Button>
            )}
            {project.links.demo && (
              <Button asChild variant="ghost" size="sm">
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-3.5" /> Live
                </a>
              </Button>
            )}
          </div>
        )}
      </Reveal>

      {/* The problem */}
      <Reveal as="section" className="py-14">
        <div className="mb-5 flex items-center gap-2">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-primary/70">
            the_problem
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
        </div>
        <div className="fx-scrim max-w-3xl space-y-4">
          {CASE_STUDY.problem.map((p) => (
            <p key={p} className="leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </div>
      </Reveal>

      {/* The approach */}
      <Reveal as="section" className="py-14">
        <div className="mb-5 flex items-center gap-2">
          <Lock className="size-4 text-primary" />
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-primary/70">
            the_approach
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
        </div>
        <div className="fx-scrim max-w-3xl space-y-4">
          {CASE_STUDY.approach.map((p) => (
            <p key={p} className="leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </div>
      </Reveal>

      {/* How it works */}
      <Reveal as="section" className="py-14">
        <div className="mb-5 flex items-center gap-2">
          <Workflow className="size-4 text-primary" />
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-primary/70">
            how_it_works
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
        </div>

        <ol className="relative ml-4 border-l-2 border-primary/20 pl-8">
          {CASE_STUDY.architecture.map((s, i) => (
            <li key={s.step} className="relative pb-8 last:pb-0">
              <span className="absolute -left-[calc(2rem+7px)] top-1 flex size-4 items-center justify-center rounded-full bg-primary font-mono text-[9px] font-bold text-primary-foreground ring-4 ring-background">
                {i + 1}
              </span>
              <h3 className="font-heading text-base font-semibold text-foreground">{s.step}</h3>
              <p className="mt-1 max-w-2xl leading-relaxed text-muted-foreground">{s.detail}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      {/*
        Results only render when there are real numbers. There is no placeholder here
        on purpose — an empty "Results" section with invented figures would be worse
        than no section at all.
      */}
      {CASE_STUDY.results && CASE_STUDY.results.length > 0 && (
        <Reveal as="section" className="py-14">
          <div className="mb-5 flex items-center gap-2">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-primary/70">
              results
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {CASE_STUDY.results.map((r) => (
              <Card key={r.label} size="sm" className="text-center">
                <CardContent className="pt-5 pb-4">
                  <div className="glow-text font-heading text-3xl font-bold text-foreground">
                    {r.value}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {r.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Reveal>
      )}

      {/* What it proves */}
      <Reveal as="section" className="py-14">
        <div className="mb-5 flex items-center gap-2">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-primary/70">
            what_it_proves
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
        </div>
        <ul className="fx-scrim max-w-3xl space-y-3">
          {CASE_STUDY.proves.map((p) => (
            <li key={p} className="flex items-start gap-3 leading-relaxed text-muted-foreground">
              <span className="mt-1 text-primary">›</span>
              {p}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal as="section" className="pb-20 text-center">
        <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">
          Got a process that looks like this?
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
          If you are pasting your own documents into someone else&apos;s API to get work
          done, there is usually a better way. It starts with an honest look at what you
          are actually spending and sending.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="glow-pulse">
            <Link to="/contact">
              Get in Touch <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/services">What I Build</Link>
          </Button>
        </div>
      </Reveal>
    </div>
  );
}
