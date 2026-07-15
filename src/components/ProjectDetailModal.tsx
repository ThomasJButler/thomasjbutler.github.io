import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, ImageIcon, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
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
import { ImageLightbox } from '@/components/ImageLightbox';
import { categoryLabel, languageColors } from '@/lib/projects';
import type { Project } from '@/lib/projects';

interface ProjectDetailModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  /** Show prev/next project navigation (true when more than one project in the list). */
  hasNav?: boolean;
}

export function ProjectDetailModal({ project, open, onClose, onPrev, onNext, hasNav }: ProjectDetailModalProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Combined gallery = cover first, then any gallery screenshots (deduped).
  const galleryImages = useMemo(() => {
    const imgs: string[] = [];
    if (project?.images?.cover) imgs.push(project.images.cover);
    if (project?.images?.gallery) imgs.push(...project.images.gallery);
    return Array.from(new Set(imgs));
  }, [project]);

  // Reset the image viewer + scroll to top on close or when switching projects.
  useEffect(() => {
    setLightboxIndex(null);
    const el = document.querySelector('[data-slot="dialog-content"]');
    if (el) el.scrollTop = 0;
  }, [project?.id, open]);

  // Arrow keys flick between projects — but only while the image lightbox is closed.
  useEffect(() => {
    if (!open || !hasNav) return;
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) return;
      if (e.key === 'ArrowLeft') onPrev?.();
      else if (e.key === 'ArrowRight') onNext?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, hasNav, lightboxIndex, onPrev, onNext]);

  if (!project) return null;

  const description = project.longDescription || project.description;
  const videos = project.videos ?? (project.links.video ? [project.links.video] : []);

  return (
    <>
      {hasNav && open && createPortal(
        <>
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous project"
            className="fixed left-[max(0.75rem,calc(50%-24rem))] top-1/2 z-[60] hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-primary/40 bg-card/90 text-foreground/80 backdrop-blur transition-colors hover:border-primary/70 hover:text-foreground lg:flex"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next project"
            className="fixed right-[max(0.75rem,calc(50%-24rem))] top-1/2 z-[60] hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-primary/40 bg-card/90 text-foreground/80 backdrop-blur transition-colors hover:border-primary/70 hover:text-foreground lg:flex"
          >
            <ChevronRight className="size-5" />
          </button>
        </>,
        document.body
      )}
      <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="sm:max-w-[min(42rem,calc(100vw-3rem))] max-h-[85svh] overflow-y-auto">
        <DialogHeader>
          {/* Category + Language */}
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary" className="text-[10px]">
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

        {/* Cover hero (click to open gallery) */}
        {project.images?.cover && !project.images.cover.endsWith('.svg') && (
          <button
            type="button"
            onClick={() => setLightboxIndex(galleryImages.indexOf(project.images!.cover!))}
            aria-label="View larger image"
            className="group block w-full cursor-zoom-in overflow-hidden rounded-lg border border-border"
          >
            <img
              src={project.images.cover}
              alt={`${project.name} cover`}
              loading="lazy"
              decoding="async"
              width={1280}
              height={720}
              className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </button>
        )}

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-mono text-xs uppercase tracking-wider text-primary/90">
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
            <h3 className="font-mono text-xs uppercase tracking-wider text-primary/90">
              Screenshots
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {project.images.gallery.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightboxIndex(galleryImages.indexOf(img))}
                  aria-label={`View screenshot ${i + 1}`}
                  className="group cursor-zoom-in overflow-hidden rounded-lg border border-border"
                >
                  <img
                    src={img}
                    alt={`${project.name} screenshot ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    width={1280}
                    height={720}
                    className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </button>
              ))}
            </div>
          </div>
        ) : !project.images?.cover ? (
          <div className="rounded-lg border border-dashed border-border/50 p-6 text-center">
            <ImageIcon className="size-6 mx-auto mb-2 text-muted-foreground/40" />
            <p className="text-xs text-muted-foreground/60 font-mono">Screenshots coming soon</p>
          </div>
        ) : null}

        {/* Demo videos (embedded) */}
        {videos.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-mono text-xs uppercase tracking-wider text-primary/90">
              Demo
            </h3>
            <div className="space-y-3">
              {videos.map((v, i) => (
                <video
                  key={i}
                  src={v}
                  controls
                  preload="metadata"
                  playsInline
                  className="aspect-video w-full rounded-lg border border-border bg-black"
                />
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        <div className="space-y-2">
          <h3 className="font-mono text-xs uppercase tracking-wider text-primary/90">
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

        <ImageLightbox
          images={galleryImages}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
          alt={`${project.name} image`}
        />
      </DialogContent>
      </Dialog>
    </>
  );
}
