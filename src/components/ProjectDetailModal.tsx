import { ExternalLink, Play, ImageIcon, CheckCircle } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import type { Project } from '@/lib/projects';

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

interface ProjectDetailModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({ project, open, onClose }: ProjectDetailModalProps) {
  if (!project) return null;

  const description = project.longDescription || project.description;

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          {/* Category + Language */}
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="cyan" className="text-[10px]">
              {categoryLabel[project.category] || project.category}
            </Badge>
            <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
              <span
                className="inline-block size-2 rounded-full"
                style={{ backgroundColor: languageColors[project.language] || '#666' }}
              />
              {project.language}
            </span>
            {project.status && (
              <Badge variant="secondary" className="text-[10px]">
                {project.status === 'completed' ? 'Completed' : project.status === 'in-progress' ? 'In Progress' : 'Coming Soon'}
              </Badge>
            )}
          </div>

          <DialogTitle className="text-xl sm:text-2xl">{project.name}</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-mono text-xs uppercase tracking-wider text-primary/70">
              Key Features
            </h3>
            <ul className="grid gap-1.5 sm:grid-cols-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-foreground/80">
                  <CheckCircle className="size-3.5 text-primary shrink-0 mt-0.5" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Image Gallery Placeholder */}
        {project.images?.gallery && project.images.gallery.length > 0 ? (
          <div className="space-y-2">
            <h3 className="font-mono text-xs uppercase tracking-wider text-primary/70">
              Screenshots
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {project.images.gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${project.name} screenshot ${i + 1}`}
                  className="rounded-lg border border-border object-cover aspect-video"
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border/50 p-6 text-center">
            <ImageIcon className="size-6 mx-auto mb-2 text-muted-foreground/40" />
            <p className="text-xs text-muted-foreground/60 font-mono">Screenshots coming soon</p>
          </div>
        )}

        {/* Video Link */}
        {project.links.video && (
          <a
            href={project.links.video}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-3 transition-colors hover:bg-primary/10 hover:border-primary/30"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary">
              <Play className="size-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Watch Demo Video</p>
              <p className="text-xs text-muted-foreground">See this project in action</p>
            </div>
          </a>
        )}

        {/* Tech Stack */}
        <div className="space-y-2">
          <h3 className="font-mono text-xs uppercase tracking-wider text-primary/70">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {project.topics.map((t) => (
              <Badge key={t} variant="secondary" className="font-mono text-xs">{t}</Badge>
            ))}
          </div>
        </div>

        {/* Footer with Links */}
        <DialogFooter className="sm:justify-start">
          {project.links.demo && (
            <Button asChild size="sm">
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="size-3.5" /> Live Demo
              </a>
            </Button>
          )}
          {project.links.github && (
            <Button asChild variant="outline" size="sm">
              <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                <GithubIcon className="size-3.5" /> View Code
              </a>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
