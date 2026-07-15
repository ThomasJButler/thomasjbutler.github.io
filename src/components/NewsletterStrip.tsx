import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/fx/Reveal';
import { LINKS, NEWSLETTER } from '@/lib/content';
import { toast } from '@/lib/toast-bus';

/** Run It Local. Sits above the footer on Home and Services. */
export function NewsletterStrip() {
  const href = LINKS.substack;

  return (
    <Reveal className="fx-news fx-scrim">
      <div className="fx-news__head">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/90">
          {NEWSLETTER.label}
        </span>
        <h3>{NEWSLETTER.title}</h3>
        <p>{NEWSLETTER.copy}</p>
      </div>

      <div className="fx-news__act">
        <Button
          asChild={Boolean(href)}
          onClick={href ? undefined : () => toast('> substack link coming soon. watch this space.')}
        >
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer">
              Subscribe <ArrowRight className="size-4" />
            </a>
          ) : (
            <>
              Subscribe <ArrowRight className="size-4" />
            </>
          )}
        </Button>
        <span className="fx-news__note">{NEWSLETTER.note}</span>
      </div>
    </Reveal>
  );
}
