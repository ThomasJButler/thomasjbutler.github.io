import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Reveal } from '@/components/fx/Reveal';
import { SectionHead } from '@/components/SectionHead';
import { FAQ } from '@/lib/content';

/** Objection handling. The last question is the one that earns the most trust. */
export function FaqSection() {
  return (
    <Reveal as="section" className="py-16">
      <SectionHead
        title="The things people actually ask"
        deck="The awkward ones included, because you were going to ask them anyway."
      />

      <Accordion>
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
