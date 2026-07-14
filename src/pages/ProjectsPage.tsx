import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { m as motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  projects,
  categories,
  categoryLabel,
  categoryBadgeVariant,
  languageColors,
} from '@/lib/projects';
import type { Project } from '@/lib/projects';
import { ProjectDetailModal } from '@/components/ProjectDetailModal';
import { ProjectCover } from '@/components/projects/ProjectCover';
import { MotionSection } from '@/components/MotionSection';
import { SectionHead } from '@/components/SectionHead';
import { DecodeText } from '@/components/fx/DecodeText';

const featuredProjects = projects.filter((p) => p.featured);


/**
 * Full green retro border for every project card. pt-0 because every card opens with
 * a full-bleed ProjectCover band, which has to reach the card's top edge.
 */
const cardBorder = 'h-full cursor-pointer border border-primary/40 pt-0 transition-colors hover:border-primary/70';

export function ProjectsPage() {
  useEffect(() => { document.title = 'Projects | Tom Butler'; }, []);

  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  // Flick between projects (wrapping) while the modal stays open.
  const navigateProject = (delta: number) => {
    if (!selectedProject || filtered.length < 2) return;
    const idx = filtered.findIndex((p) => p.id === selectedProject.id);
    if (idx === -1) return;
    setSelectedProject(filtered[(idx + delta + filtered.length) % filtered.length]);
  };

  return (
    <div className="fx-page mx-auto max-w-5xl px-6 py-16">
      <MotionSection>
        <p className="font-mono text-xs tracking-[0.2em] text-primary/70">
          <DecodeText text="// projects" step={20} />
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight">Projects</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A collection of AI, web, and creative projects.
        </p>
      </MotionSection>

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
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card featured className={cardBorder} onClick={() => setSelectedProject(project)}>
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
                  <CardFooter className="mt-auto gap-2" onClick={(e) => e.stopPropagation()}>
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
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Filter tabs */}
      <section className="mt-14">
        <SectionHead title="Everything" deck="Filter by the kind of work you came looking for." />
        <Tabs
          value={activeCategory}
          onValueChange={(v: string | number | null) => setActiveCategory(String(v ?? 'all'))}
        >
          {/* h-auto: TabsList is a fixed h-8 box, and with seven tabs it wraps below
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
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
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
                  onClick={() => setSelectedProject(project)}
                >
                  <ProjectCover project={project} />
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
                  <CardFooter className="mt-auto gap-2" onClick={(e) => e.stopPropagation()}>
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
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

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
