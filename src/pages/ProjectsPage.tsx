import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Star, Terminal } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { projects, categories } from '@/lib/projects';
import type { Project } from '@/lib/projects';
import { ProjectDetailModal } from '@/components/ProjectDetailModal';
import { MotionSection } from '@/components/MotionSection';
import { cn } from '@/lib/utils';

const featuredProjects = projects.filter((p) => p.featured);

const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  'C#': '#178600',
  CSS: '#563d7c',
  React: '#61dafb',
};

const categoryLabel: Record<string, string> = {
  ai: 'AI & ML',
  web: 'Web',
  games: 'Games',
  creative: 'Creative',
  personal: 'Personal',
};
const categoryBadgeVariant: Record<string, string> = {
  ai: 'cyan',
  web: 'secondary',
  games: 'amber',
  creative: 'amber',
  personal: 'secondary',
};

/** Full green retro border for every project card. */
const cardBorder = 'h-full cursor-pointer border border-primary/40 transition-colors hover:border-primary/70';

/** Card cover: Cloudinary image when present, else a branded placeholder. Kept compact. */
function ProjectCover({ project }: { project: Project }) {
  const cover = project.images?.cover;
  if (cover) {
    const isSvg = cover.endsWith('.svg');
    return (
      <img
        src={cover}
        alt={`${project.name} cover`}
        loading="lazy"
        className={cn('h-36 w-full bg-muted/40', isSvg ? 'object-contain p-6' : 'object-cover')}
      />
    );
  }
  return (
    <div className="flex h-36 w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/8 via-card to-background">
      <Terminal className="size-6 text-primary/30" />
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary/45">
        {project.status === 'in-progress' ? 'coming soon' : 'preview coming soon'}
      </span>
    </div>
  );
}

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
    <div className="mx-auto max-w-5xl px-6 py-16">
      <MotionSection>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Projects</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A collection of AI, web, and creative projects.
        </p>
      </MotionSection>

      {/* Featured Projects */}
      {activeCategory === 'all' && featuredProjects.length > 0 && (
        <section className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Star className="size-3.5 text-amber" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary/70">featured</span>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
          </div>
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
      <div className="mt-10">
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="size-3.5 text-primary" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary/70">all_projects</span>
          <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
        </div>
      </div>
      <div>
        <Tabs
          value={activeCategory}
          onValueChange={(v: string | number | null) => setActiveCategory(String(v ?? 'all'))}
        >
          <TabsList className="flex-wrap">
            {categories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id}>
                {cat.label}
                <span className="ml-1 text-[10px] text-muted-foreground">
                  ({cat.id === 'all' ? projects.length : projects.filter(p => p.category === cat.id).length})
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Project grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
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
                    <Badge variant={categoryBadgeVariant[project.category] as 'cyan' | 'amber' | 'secondary' || 'secondary'} className="text-[10px] px-1.5 py-0 h-4">
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
