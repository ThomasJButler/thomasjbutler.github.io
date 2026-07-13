import type { CSSProperties } from 'react';
import type { Project } from '@/lib/projects';
import { cn } from '@/lib/utils';

/**
 * Full-bleed cover band for a project card.
 *
 * The band clips the image itself, so the hover zoom is cropped by the band rather
 * than by the card — otherwise the bottom border rides up over the header. Cards
 * carrying a cover set `pt-0` (see cardBorder in ProjectsPage), which is why there
 * is no negative margin here to cancel the card's padding.
 *
 * Projects with no Cloudinary cover yet (The Kicker, ISQ Agent, Sanctuary) get a
 * generated scanline panel of the same height, so the grid never goes ragged.
 */
const BAND = 'w-full overflow-hidden border-b border-primary/[0.18]';

/** Scanlines over a vertical fade to the page background. */
const scanlinePanel = {
  backgroundImage: [
    'repeating-linear-gradient(0deg, color-mix(in oklab, var(--primary) 7%, transparent) 0px, color-mix(in oklab, var(--primary) 7%, transparent) 1px, transparent 1px, transparent 4px)',
    'linear-gradient(180deg, color-mix(in oklab, var(--primary) 8%, transparent) 0%, var(--card) 55%, var(--background) 100%)',
  ].join(', '),
} satisfies CSSProperties;

const initialGlow = {
  textShadow: '0 0 22px color-mix(in oklab, var(--primary) 45%, transparent)',
} satisfies CSSProperties;

export function ProjectCover({ project }: { project: Project }) {
  const cover = project.images?.cover;

  if (cover) {
    // The one SVG cover is a logo — contain it, or object-cover eats the mark.
    const isSvg = cover.endsWith('.svg');
    return (
      <div className={BAND}>
        <img
          src={cover}
          alt={`${project.name} cover`}
          loading="lazy"
          className={cn(
            'h-[150px] w-full bg-muted/40 brightness-90 saturate-[1.05] transition-[filter,transform] duration-[350ms] group-hover/card:scale-[1.025] group-hover/card:brightness-100',
            // The handoff says object-position: top, but most of these covers are
            // square title cards rather than wide screenshots, and anchoring to the
            // top slices the wordmark clean in half. Centre reads correctly for all
            // fifteen.
            isSvg ? 'object-contain p-6' : 'object-cover object-center'
          )}
        />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className={cn(BAND, 'h-[150px]')}>
      <div
        className="flex h-full w-full flex-col items-center justify-center gap-1"
        style={scanlinePanel}
      >
        <span
          className="font-heading text-[44px] leading-none font-extrabold text-primary/55"
          style={initialGlow}
        >
          {project.name[0]}
        </span>
        <span className="font-mono text-[9.5px] tracking-[0.16em] text-muted-foreground/70">
          {`> ${project.id} — cover incoming`}
        </span>
      </div>
    </div>
  );
}
