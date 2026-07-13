import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Reveal } from '@/components/fx/Reveal';
import { FAQ } from '@/lib/content';

/** Objection handling. The last question is the one that earns the most trust. */
export function FaqSection() {
  return (
    <Reveal as="section" className="py-16">
      <div className="mb-5 flex items-center gap-2">
        <HelpCircle className="size-4 text-primary" />
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-primary/70">
          questions
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
      </div>

      <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground">
        The things people actually ask
      </h3>

      <Accordion className="mt-6">
        {FAQ.map((item) => (
          <AccordionItem key={item.q} value={item.q}>
            <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
            <AccordionContent>
              <p className="leading-relaxed text-muted-foreground">{item.a}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Reveal>
  );
}
