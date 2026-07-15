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
        {/* The button tells the truth. Until Tom sets the Substack URL there is nothing to
            subscribe to, so a button that says "Subscribe" and then only toasts is a
            misleading affordance. With no href it reads "Coming soon" and says so; the
            moment LINKS.substack is a string it becomes a real Subscribe link. */}
        <Button
          asChild={Boolean(href)}
          onClick={href ? undefined : () => toast('> Run It Local is nearly ready. the signup link is coming.')}
        >
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer">
              Subscribe <ArrowRight className="size-4" />
            </a>
          ) : (
            <>Coming soon</>
          )}
        </Button>
        <span className="fx-news__note">{NEWSLETTER.note}</span>
      </div>
    </Reveal>
  );
}
