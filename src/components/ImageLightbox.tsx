import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageLightboxProps {
  images: string[];
  /** Active image index, or null when closed. */
  index: number | null;
  onIndexChange: (i: number) => void;
  onClose: () => void;
  alt?: string;
}

/**
 * Full-screen image gallery viewer. Portaled to <body> so it sits above the
 * project Dialog. Keyboard: Esc closes, ←/→ navigate (capture phase so it wins
 * over the underlying Radix Dialog's Esc handler). Click backdrop to close.
 */
export function ImageLightbox({ images, index, onIndexChange, onClose, alt = 'Screenshot' }: ImageLightboxProps) {
  const open = index !== null && images.length > 0;

  const prev = useCallback(() => {
    if (index !== null) onIndexChange((index - 1 + images.length) % images.length);
  }, [index, images.length, onIndexChange]);

  const next = useCallback(() => {
    if (index !== null) onIndexChange((index + 1) % images.length);
  }, [index, images.length, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.stopPropagation(); onClose(); }
      else if (e.key === 'ArrowLeft') { e.stopPropagation(); prev(); }
      else if (e.key === 'ArrowRight') { e.stopPropagation(); next(); }
    };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [open, prev, next, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close viewer"
        className="absolute right-4 top-4 rounded-md p-2 text-foreground/70 transition-colors hover:bg-white/10 hover:text-foreground"
      >
        <X className="size-6" />
      </button>

      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); prev(); }}
          aria-label="Previous image"
          className="absolute left-3 rounded-full p-2 text-foreground/70 transition-colors hover:bg-white/10 hover:text-foreground sm:left-6"
        >
          <ChevronLeft className="size-8" />
        </button>
      )}

      <img
        src={images[index!]}
        alt={`${alt} ${index! + 1}`}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
      />

      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); next(); }}
          aria-label="Next image"
          className="absolute right-3 rounded-full p-2 text-foreground/70 transition-colors hover:bg-white/10 hover:text-foreground sm:right-6"
        >
          <ChevronRight className="size-8" />
        </button>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 font-mono text-xs text-foreground/70">
          {index! + 1} / {images.length}
        </div>
      )}
    </div>,
    document.body
  );
}
