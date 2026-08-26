import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/fx/Reveal';
import { OperatorHero } from '@/components/home/OperatorHero';
import { ProofSection } from '@/components/home/ProofSection';
import { NOW_COPY, NOW_TAGS } from '@/lib/content';

/*
 * What used to sit between the hero and the proof: a three-card teaser of the priced
 * offers and a "why local AI" argument with a rent-vs-own comparison. Both went with the
 * Local & Private AI positioning (shelved August 2026, tag v-local-ai-2026-08). The
 * self-assessed skill bars and the "Uptime 99.9%" stat grid went a version earlier and
 * are not coming back either: numbers nobody can check teach the reader to discount the
 * ones that are checkable.
 */

export function HomePage() {

  return (
    <>
      {/* Full-bleed: the hero is 1240px wide and breaks out of the page container. */}
      <OperatorHero />

      <div id="below" className="fx-page mx-auto max-w-5xl px-6">
      {/* ═══ Evidence ═══
          The hero has said who this is. What the reader wants next is proof: a system
          Tom built and can describe in detail, plus real, dated work. */}
      <ProofSection />

      {/* ═══ Currently Working On ═══ */}
      <Reveal as="section" className="py-4">
        <div className="rounded-lg border border-primary/20 bg-primary/[0.03] p-5">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="size-3.5 text-primary" />
            <span className="font-mono text-xs uppercase tracking-wider text-primary/90">now</span>
          </div>
          <p className="text-sm leading-relaxed text-foreground/80">{NOW_COPY}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {NOW_TAGS.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[10px]">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ═══ The Matrix origin story ═══
          Kept, because it is charming and it is the reason this site looks like it does. */}
      <Reveal as="section" className="py-6 pb-16">
        <div className="overflow-hidden rounded-lg border border-border/30">
          <div className="border-b border-border/20 bg-muted/20 px-4 py-1.5">
            <span className="font-mono text-[10px] text-muted-foreground/80">$ cat about.md</span>
          </div>
          <div className="p-5">
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Ever since I watched The Matrix as a kid, I&apos;ve been obsessed with building
              things on the web. This site is the sci-fi playground I always dreamed of, a
              space to experiment with AI, cyberpunk aesthetics, and creative code.
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link to="/about">
              More about me <ArrowRight className="size-3" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <a href="https://github.com/ThomasJButler" target="_blank" rel="noopener noreferrer">
              <GithubIcon className="size-3" /> GitHub
            </a>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <a
              href="https://thomasjbutler.github.io/version-timetravel/"
              target="_blank"
              rel="noopener noreferrer"
            >
              TimeTravel <ExternalLink className="size-3" />
            </a>
          </Button>
        </div>
      </Reveal>
      </div>
    </>
  );
}
