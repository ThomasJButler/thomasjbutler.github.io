import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Info } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Reveal } from '@/components/fx/Reveal';
import { SectionHead } from '@/components/SectionHead';
import { DecodeText } from '@/components/fx/DecodeText';
import { Figure } from '@/components/media/Figure';
import { CASE_STUDY } from '@/lib/content';
import { MEDIA, MEDIA_SIZE } from '@/lib/assets';
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

  const project = projects.find((p) => p.id === CASE_STUDY.projectId);

  return (
    <div className="fx-page mx-auto max-w-5xl px-6 py-16">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.2em] text-primary/90">
          <DecodeText text="// case_study" step={20} />
        </p>
        <h1 className="mt-3 max-w-3xl font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {CASE_STUDY.title}
        </h1>
        <p className="fx-scrim mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {CASE_STUDY.subtitle}
        </p>

        {/* No caption: the headline above it has already said what this is, and a caption
            repeating it would be the label doing the same job twice. */}
        <Figure
          src={MEDIA['isq-agent'].hero}
          alt="ISQ Agent: a drafted questionnaire answer with its sources and confidence score"
          width={MEDIA_SIZE.hero.width}
          height={MEDIA_SIZE.hero.height}
          className="mt-8 max-w-4xl"
        />

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

        {/* Stated before the reader has to work it out from the badges above. Those badges
            name hosted services, on a site whose argument is that your data should not go
            to hosted services — and an undisclosed contradiction reads as a lie, while a
            disclosed one reads as someone who knows the difference. */}
        <Card size="sm" className="mt-6 max-w-3xl border-primary/20">
          <CardContent className="flex gap-3 pt-5">
            <Info className="mt-0.5 size-4 shrink-0 text-primary/90" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              {CASE_STUDY.provenance}
            </p>
          </CardContent>
        </Card>
      </Reveal>

      {/* The problem */}
      <Reveal as="section" className="py-14">
        <SectionHead
          title="Two hundred questions you have already answered"
          deck="And the obvious fix, pasting them into someone else's API, is the thing a security questionnaire exists to stop."
        />
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
        <SectionHead
          title="Ground every answer, and make the model the replaceable part"
          deck="Retrieval over policy you already approved, a confidence score on every draft, and a model you can swap for one on your own hardware."
        />
        <div className="fx-scrim max-w-3xl space-y-4">
          {CASE_STUDY.approach.map((p) => (
            <p key={p} className="leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </div>

        {/* fx-scrim: the caption is 12px muted text sitting directly on the live rain, which
            measures nowhere near 4.5:1 without a wash behind it. */}
        <Figure
          src={MEDIA['isq-agent'].wireframe}
          alt="ISQ Agent wireframe: the review screen, annotated"
          width={MEDIA_SIZE.wireframe.width}
          height={MEDIA_SIZE.wireframe.height}
          caption="The review screen: the drafted answer, the policy it came from, and the confidence that decides whether a person needs to look at it."
          className="fx-scrim mt-8 max-w-3xl"
        />
      </Reveal>

      {/* How it works. The one place the machine voice earns its eyebrow: this section is
          literally a pipeline, and naming it as one is not decoration. */}
      <Reveal as="section" className="py-14">
        <SectionHead
          eyebrow="pipeline --trace"
          title="What happens to a single question"
          deck="Five stages, from your documents to an answer a reviewer can check in seconds."
        />

        {/* The diagram and the list below are the same five stages, twice: once to take in at
            a glance, once to read. It goes first because the shape of the pipeline is easier
            to hold once you have seen it. */}
        <Figure
          src={MEDIA['isq-agent'].diagram}
          alt="ISQ Agent data flow: ingest, retrieve, draft, score, review"
          width={MEDIA_SIZE.diagram.width}
          height={MEDIA_SIZE.diagram.height}
          caption="Green is what runs on your side. Amber marks the metered boundary, where tokens are billed and data leaves the building: on this build, the draft step."
          className="fx-scrim mb-10 max-w-3xl"
        />

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
          <SectionHead title="What it changed" deck="Measured, not estimated." />
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
        <SectionHead
          title="What it proves"
          deck="The model is the easy part. Everything that makes an AI answer checkable sits around it."
        />
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
          Work on problems like this?
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
          I&apos;m after a full-time role where this is the day job: retrieval, grounding,
          evaluation, and the unglamorous parts that make an AI answer checkable. If that
          sounds like your team, I&apos;d like to hear about it.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="xl" className="glow-pulse">
            <Link to="/contact">
              Talk it through <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/projects">See the projects</Link>
          </Button>
        </div>
      </Reveal>
    </div>
  );
}
