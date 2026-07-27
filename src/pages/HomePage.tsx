import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/fx/Reveal';
import { OperatorHero } from '@/components/home/OperatorHero';
import { ServicesTeaser } from '@/components/home/ServicesTeaser';
import { WhyLocalAiStrip } from '@/components/home/WhyLocalAiStrip';
import { ProofSection } from '@/components/home/ProofSection';
import { NewsletterStrip } from '@/components/NewsletterStrip';
import { NOW_COPY, NOW_TAGS } from '@/lib/content';

/*
 * What used to live here: self-assessed percentage skill bars ("React 95%") and a stat
 * grid reading "Uptime 99.9%" and "AI Models 7".
 *
 * Both are gone, and their absence is the point. A buyer scrolling from an £18,375 RAG
 * quote to a bar chart of my own opinion of myself is being told, loudly, that this is a
 * junior portfolio. Uptime of *what*, measured by *whom*? Numbers nobody can check are
 * worth less than no numbers, because they teach the reader to discount the ones that
 * are checkable — and the checkable ones (60-80% saved, 0 bytes to third parties) are
 * already doing real work two sections above.
 */

export function HomePage() {

  return (
    <>
      {/* Full-bleed: the hero is 1240px wide and breaks out of the page container. */}
      <OperatorHero />

      <div id="below" className="fx-page mx-auto max-w-5xl px-6">
      {/*
        Business-first. Someone landing here to hire Tom meets the offer and the
        argument for it before they meet the skill bars and the commit feed. A fellow
        developer still finds all of that — it just sits below the fold now.
      */}
      <ServicesTeaser />

      <WhyLocalAiStrip />

      {/* ═══ Evidence ═══
          The buyer has had the offer and the argument. What they want next is proof that
          the person making it has actually done it, so this is the case study and the
          real, dated work — not a self-assessment. */}
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
          Kept, because it is genuinely charming and it is the reason this site looks like
          it does. What is gone is the ghost button that sat here pointing at a *different
          portfolio*: the last thing a buyer saw before the newsletter was an invitation to
          leave. The remaining links go deeper into this site, not out of it. */}
      <Reveal as="section" className="py-6 pb-12">
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

        <section className="pb-16">
          <NewsletterStrip />
        </section>
      </div>
    </>
  );
}
