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

/**
 * Cloudinary covers are all requested at a single `w_800`; the width lives in the URL's
 * transform segment, so a srcset is just the same URL a few times over, and a narrow
 * card can fetch a narrow image.
 *
 * 800 is the CEILING on purpose. The band is 150px tall and decorative, and adding a
 * w_1200 candidate is not free: at a phone's ~2.6 DPR the browser computes it needs
 * ~1080px and dutifully picks the biggest one, so offering 1200 made it fetch *more*
 * than the flat w_800 did and cost 400ms of LCP (measured). Capping at today's width
 * means this can only ever fetch fewer bytes, never more.
 *
 * Returns undefined for anything that isn't a Cloudinary URL carrying a width (the SVG
 * logo, any hand-added cover), in which case the plain `src` still stands.
 */
const SRCSET_WIDTHS = [400, 640, 800];

function cloudinarySrcSet(url: string): string | undefined {
  if (!/\/upload\/[^/]*w_\d+/.test(url)) return undefined;
  return SRCSET_WIDTHS.map((w) => `${url.replace(/w_\d+/, `w_${w}`)} ${w}w`).join(', ');
}

/** One column on a phone, two from sm, three in the featured grid from lg. */
const COVER_SIZES = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw';

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

/**
 * The first cover is the LCP element on /projects, and Lighthouse's lcp-lazy-loaded audit
 * says not to lazy-load it. Measured, that advice is wrong here and it stays lazy.
 *
 * The audit assumes the image can start downloading from the HTML. This is a
 * client-rendered SPA: the <img> does not exist until React has mounted, so `eager` buys
 * no head start at all. All it does is put a high-priority image fetch in contention with
 * the JS that first paint is still waiting on. Marking the first two covers eager cost
 * 280ms of LCP and 3 Lighthouse points; keeping them lazy is worth more than the audit is.
 */
export function ProjectCover({ project }: { project: Project }) {
  const cover = project.images?.cover;

  if (cover) {
    // The one SVG cover is a logo — contain it, or object-cover eats the mark.
    const isSvg = cover.endsWith('.svg');
    const srcSet = isSvg ? undefined : cloudinarySrcSet(cover);
    return (
      <div className={BAND}>
        <img
          src={cover}
          srcSet={srcSet}
          sizes={srcSet ? COVER_SIZES : undefined}
          alt={`${project.name} cover`}
          loading="lazy"
          decoding="async"
          // Explicit intrinsic size so the browser reserves the band before the image
          // lands. Without it the whole projects grid reflows as covers arrive.
          width={640}
          height={300}
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
