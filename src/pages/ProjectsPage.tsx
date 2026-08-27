import { useState } from 'react';
import { Link } from 'react-router-dom';
import { m as motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink, Building2 } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  projects,
  categories,
  categoryLabel,
  languageColors,
} from '@/lib/projects';
import type { Project } from '@/lib/projects';
import { ProjectDetailModal } from '@/components/ProjectDetailModal';
import { ProjectCover } from '@/components/projects/ProjectCover';
import { MotionSection } from '@/components/MotionSection';
import { SectionHead } from '@/components/SectionHead';
import { Separator } from '@/components/ui/separator';
import { useHydrated } from '@/hooks/useHydrated';

const featuredProjects = projects.filter((p) => p.featured);

/**
 * A different image for a featured project's second appearance on this page.
 *
 * Featured projects are printed twice: once in the showcase at the top, once in the full
 * grid below. Using the cover in both puts the same picture on screen twice, so the grid
 * card borrows one of the project's own gallery stills instead.
 *
 * The pick is derived from the project id and is therefore stable, which is not a detail.
 * This page is prerendered: `Math.random()` here would have the server bake one image into
 * the HTML and the hydrating client choose another, and React resolves that disagreement by
 * throwing the entire tree away (error #418) and silently undoing the prerender. Hashing the
 * id gives each project a different still while server and client always agree. It also
 * means a given project's card looks the same on every visit, which is what you want from a
 * grid you might be scanning twice.
 *
 * GIFs are excluded. The only gallery gif left is the legacy ModelViz one (5.5MB), and a 5MB
 * thumbnail is not worth paying to avoid a repeated image, so it falls back to its cover, as
 * does any featured project with no gallery. Matrix Arcade used to be in that group; its
 * 4.8MB gif has since been replaced by real stills, so this now engages for it.
 */
function altThumb(project: Project): string | undefined {
  const stills = project.images?.gallery?.filter((g) => !g.endsWith('.gif')) ?? [];
  if (stills.length === 0) return undefined;
  let hash = 0;
  for (const ch of project.id) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return stills[hash % stills.length];
}


/**
 * Full green retro border for every project card. pt-0 because every card opens with
 * a full-bleed ProjectCover band, which has to reach the card's top edge.
 */
const cardBorder = 'h-full cursor-pointer border border-primary/40 pt-0 transition-colors hover:border-primary/70';

export function ProjectsPage() {

  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  /*
   * Entrance animations must not hide the content from anyone who has not run the JS.
   *
   * Every card is a `motion.div` with `initial={{ opacity: 0 }}`, which framer-motion
   * serialises straight into the prerendered HTML as `style="opacity:0"`. That is 18
   * invisible project cards to a crawler, to a screen reader that reads the DOM, and to
   * anyone on a connection slow enough to see the page before the bundle executes.
   *
   * Gate the initial state on hydration: on the server and on the first (hydrating) client
   * render this is false, so the cards render at their resting, visible state and match the
   * prerendered HTML exactly. Every render after that (clicking a filter tab) gets the real
   * initial back, so the stagger still plays where a real person can see it.
   */
  const hydrated = useHydrated();
  const enter = (extra: Record<string, number>) =>
    hydrated ? { opacity: 0, ...extra } : false;

  /*
   * A card is a clickable div, so it needs to be operable by keyboard (WCAG 2.1.1, Level A).
   * Enter and Space open the detail modal, exactly like a click. The Live/Code links inside
   * the footer stop propagation on BOTH click and keydown, so they stay independently
   * operable: without the keydown guard, Enter on a focused footer link would bubble up to
   * this handler, get preventDefault()ed, and open the modal instead of following the link.
   */
  const openProps = (project: Project) => ({
    role: 'button',
    tabIndex: 0,
    'aria-label': `Open details for ${project.name}`,
    onClick: () => setSelectedProject(project),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setSelectedProject(project);
      }
    },
  });

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  // The showcase only renders on the unfiltered view, so that is the only view where a
  // featured project is on screen twice. Filter to "Web" and The Kicker appears once, and
  // should show the cover it was designed with rather than a screenshot.
  const showcaseVisible = activeCategory === 'all' && featuredProjects.length > 0;

  // Flick between projects (wrapping) while the modal stays open.
  const navigateProject = (delta: number) => {
    if (!selectedProject || filtered.length < 2) return;
    const idx = filtered.findIndex((p) => p.id === selectedProject.id);
    if (idx === -1) return;
    setSelectedProject(filtered[(idx + delta + filtered.length) % filtered.length]);
  };

  return (
    <div className="fx-page mx-auto max-w-5xl px-6 py-16">
      {/* The label IS the h1. There was a big "Projects" heading under it saying the same
          word a second time; this keeps the page's one h1 for crawlers and screen readers
          without printing the title twice. */}
      <MotionSection>
        <h1 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          _Projects
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          AI, web and mobile work, plus the learning projects that came first.
        </p>
      </MotionSection>

      <Separator className="mt-10" />

      {/* Featured Projects */}
      {activeCategory === 'all' && featuredProjects.length > 0 && (
        <section className="mt-12">
          {/* No count in the deck: the featured set is whatever projects.ts flags, and a
              hard-coded number goes stale the moment Tom flags a seventh. */}
          <SectionHead
            title="The ones worth your time"
            deck="The builds I would show you first. Click any card for the full write-up."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={enter({ y: 16 })}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card featured className={cardBorder} {...openProps(project)}>
                  <ProjectCover project={project} />
                  <CardHeader>
                    <CardTitle className="font-heading text-base">{project.name}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1.5">
                      {project.topics.map((t) => (
                        <Badge key={t} variant="secondary">{t}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto gap-2" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
                    {project.links.demo && (
                      <Button asChild variant="ghost" size="xs">
                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="size-3" /> Live
                        </a>
                      </Button>
                    )}
                    {project.links.github && (
                      <Button asChild variant="ghost" size="xs">
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                          <GithubIcon className="size-3" /> Code
                        </a>
                      </Button>
                    )}
                    {project.links.waitlist && (
                      <Button asChild variant="ghost" size="xs">
                        <a href={project.links.waitlist} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="size-3" /> Join Waitlist
                        </a>
                      </Button>
                    )}
                    {project.links.company && (
                      <Button asChild variant="ghost" size="xs">
                        <a href={project.links.company} target="_blank" rel="noopener noreferrer">
                          <Building2 className="size-3" /> AiTomatic
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
          <Separator className="mt-14" />
        </section>
      )}

      {/* Filter tabs */}
      <section className="mt-14">
        <SectionHead
          title="Everything"
          deck="Some of these were built to learn something specific. Some were built because I wanted them to exist. The tags tell you which."
        />
        <Tabs
          value={activeCategory}
          onValueChange={(v: string | number | null) => setActiveCategory(String(v ?? 'all'))}
        >
          {/* h-auto: TabsList is a fixed h-8 box, and with six tabs it wraps below
              ~540px. The wrapped rows then have to share that 32px, while each
              trigger sizes itself against the container — so the tabs overlapped and
              spilled out of the pill on a phone. */}
          <TabsList className="h-auto min-h-8 flex-wrap gap-1">
            {categories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id} className="h-auto py-1">
                {cat.label}
                <span className="ml-1 text-[10px] text-muted-foreground">
                  ({cat.id === 'all' ? projects.length : projects.filter(p => p.category === cat.id).length})
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Project grid.
         *
         * No `layout` prop and no `mode="popLayout"`, and their absence is deliberate.
         * Both need framer-motion's layout-projection feature, which ships in `domMax` but
         * not in the `domAnimation` bundle this app loads (see Providers). So they have not
         * actually done anything since LazyMotion was introduced: they were dead props
         * quietly asking for 12 kB gzipped of feature code that would have to be shipped to
         * every visitor to animate a grid reflow that only fires when you click a filter.
         * The stagger below is the part people actually see, and it works without them.
         */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filtered.map((project, i) => (
              // Keyed by category as well as id, so switching filter remounts every card
              // and the stagger plays again instead of the survivors sitting still.
              <motion.div
                key={`${activeCategory}-${project.id}`}
                initial={enter({ scale: 0.95, y: 12 })}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  // Stagger per column, not down the whole grid: cards ripple across
                  // each row of three rather than the last card waiting on all the rest.
                  transition: { duration: 0.35, delay: (i % 3) * 0.07 },
                }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.18 } }}
              >
                <Card
                  featured={project.featured}
                  className={cardBorder}
                  {...openProps(project)}
                >
                  <ProjectCover
                    project={project}
                    src={showcaseVisible && project.featured ? altThumb(project) : undefined}
                  />
                  <CardHeader>
                    <CardTitle className="font-heading text-sm">{project.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1.5">
                      {project.topics.map((t) => (
                        <Badge key={t} variant="secondary">{t}</Badge>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                        <span className="inline-block size-2.5 rounded-full" style={{ backgroundColor: languageColors[project.language] || '#666' }} />
                        {project.language}
                      </span>
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                        {categoryLabel[project.category] || project.category}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto gap-2" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
                    {project.links.demo && (
                      <Button asChild variant="ghost" size="xs">
                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="size-3" /> Live
                        </a>
                      </Button>
                    )}
                    {project.links.github && (
                      <Button asChild variant="ghost" size="xs">
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                          <GithubIcon className="size-3" /> Code
                        </a>
                      </Button>
                    )}
                    {project.links.waitlist && (
                      <Button asChild variant="ghost" size="xs">
                        <a href={project.links.waitlist} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="size-3" /> Join Waitlist
                        </a>
                      </Button>
                    )}
                    {project.links.company && (
                      <Button asChild variant="ghost" size="xs">
                        <a href={project.links.company} target="_blank" rel="noopener noreferrer">
                          <Building2 className="size-3" /> AiTomatic
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <Separator />

      {/* The grid used to dead-end here. Someone who has read this far is interested and
          had nowhere to go: the case study is the one that turns a browse into a brief. */}
      <MotionSection className="py-16 text-center">
        <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">
          Want the long version?
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
          One of these is written up properly: the problem, the architecture, and what I
          would do differently. If the shape of it looks like something you have, say so.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="xl" className="glow-pulse">
            <Link to="/case-study">
              Read the case study <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/contact">Talk it through</Link>
          </Button>
        </div>
      </MotionSection>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        open={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        onPrev={() => navigateProject(-1)}
        onNext={() => navigateProject(1)}
        hasNav={filtered.length > 1}
      />
    </div>
  );
}
