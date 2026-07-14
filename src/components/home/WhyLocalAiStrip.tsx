import { Link } from 'react-router-dom';
import { Reveal } from '@/components/fx/Reveal';
import { SectionHead } from '@/components/SectionHead';
import { RentVsOwn } from '@/components/RentVsOwn';

/**
 * The argument, straight after the offer.
 *
 * It used to be three green stat cards. They said what you gain and never showed what you
 * are being saved from, which is the half that actually persuades: "£0 per token" only
 * lands on a reader who has already agreed that renting is a problem. RentVsOwn sets the
 * two side by side and lets the colour carry it.
 */
export function WhyLocalAiStrip() {
  return (
    <Reveal as="section" className="py-10">
      {/* The prose is the deck: SectionHead already paints it with the scrim and the
          reading measure this paragraph needs, so it does not get a second copy. */}
      <SectionHead
        title="Why local AI"
        deck={
          <>
            Most businesses rent their AI. Every API call is a meter running, and every
            prompt sends your data to a server you don&apos;t control.{' '}
            {/* Always underlined, not just on hover: a link inside a body of text has to be
                distinguishable by something other than colour, and green-on-grey only
                manages 1.69:1 against the surrounding copy. */}
            <Link
              to="/services"
              className="text-primary underline decoration-primary/50 underline-offset-4 hover:decoration-primary"
            >
              There is another way
            </Link>
            .
          </>
        }
      />

      <RentVsOwn />
    </Reveal>
  );
}
