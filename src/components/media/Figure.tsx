import { cn } from '@/lib/utils';

interface FigureProps {
  src: string;
  alt: string;
  /** Intrinsic pixel size. Required: see the note below on why this is not optional. */
  width: number;
  height: number;
  /** Omit for an image that speaks for itself, e.g. a page hero. */
  caption?: string;
  /** Omit to render a plain frame. Pass a handler to make it open the lightbox. */
  onZoom?: () => void;
  /** `fx-scrim` when the figure sits on a page with the rain behind it, not in a modal. */
  className?: string;
}

/**
 * An explanatory image in a frame, with its caption.
 *
 * Two decisions here are load-bearing, and both look like details:
 *
 * 1. It sizes INTRINSICALLY (`h-auto w-full` + real width/height), rather than taking an
 *    `aspect-*` box like the gallery grid does. The gallery can force 16:9 because its
 *    screenshots are exported at 16:9 and `object-cover` therefore crops nothing. The
 *    diagrams are 1640x1024, i.e. 1.602:1, so the same treatment would quietly shave ~10%
 *    off them, and what lives at the top and bottom of a data-flow diagram is its labels.
 *    An image whose caption explains it must not be cropped by its container.
 *
 * 2. width/height are required, not optional. They give the browser the aspect ratio before
 *    the bytes land, so the box is reserved and the page does not jump as each one arrives.
 *    Layout stability is fought for elsewhere in this codebase (the metric-matched fallback
 *    fonts, the DecodeText sizer, PageLoader's min-h-screen); an unsized image would hand
 *    that back.
 */
export function Figure({ src, alt, width, height, caption, onZoom, className }: FigureProps) {
  const image = (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      width={width}
      height={height}
      className={cn(
        'h-auto w-full',
        onZoom && 'transition-transform duration-300 group-hover:scale-[1.02]'
      )}
    />
  );

  return (
    <figure className={cn('space-y-2', className)}>
      {onZoom ? (
        <button
          type="button"
          onClick={onZoom}
          aria-label={`View ${alt} larger`}
          className="group block w-full cursor-zoom-in overflow-hidden rounded-lg border border-border"
        >
          {image}
        </button>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border">{image}</div>
      )}
      {caption && (
        <figcaption className="text-xs leading-relaxed text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  );
}
