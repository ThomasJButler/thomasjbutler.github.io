import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { projects, categories } from '@/lib/projects';
import { MotionSection } from '@/components/MotionSection';
import { cn } from '@/lib/utils';

const categoryBorder: Record<string, string> = {
  ai: 'border-l-cyan',
  web: 'border-l-matrix-400',
  games: 'border-l-amber',
  creative: 'border-l-amber',
  personal: 'border-l-matrix-600',
};

export function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <MotionSection>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Projects</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A collection of AI, web, and creative projects.
        </p>
      </MotionSection>

      {/* Filter tabs */}
      <div className="mt-8">
        <Tabs
          value={activeCategory}
          onValueChange={(v: string | number | null) => setActiveCategory(String(v ?? 'all'))}
        >
          <TabsList className="flex-wrap">
            {categories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id}>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Project grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
              <Card featured={project.featured} className={cn("h-full border-l-2", categoryBorder[project.category] || "border-l-matrix-600", "transition-shadow hover:ring-primary/30 hover:ring-2")}>
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
                  <div className="mt-3 flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{project.language}</span>
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
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
    </div>
  );
}
