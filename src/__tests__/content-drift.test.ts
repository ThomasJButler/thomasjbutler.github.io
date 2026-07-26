import { readFileSync } from 'fs';
import { resolve } from 'path';
import { describe, test, expect } from 'vitest';
import { PRICING, RETAINER, FAQ, ENGAGEMENT_TERMS } from '@/lib/content';
// The build-time structured-data module is plain .mjs (node runs it), but it is a valid ES
// module, so the test can import its data directly rather than grepping the file as text.
import {
  STRUCTURED_PRICES,
  STRUCTURED_FAQ_COUNT,
  STRUCTURED_FAQ,
} from '../../scripts/structured-data.mjs';

/**
 * The prices exist in three places, and they have already drifted once.
 *
 * `src/lib/content.ts` is what a human reads on the page. `scripts/structured-data.mjs`
 * is what an assistant quotes when someone asks what this costs, and it is a plain .mjs
 * run by node at build time, so it cannot import the TypeScript. `public/llms.txt` is what
 * an AI crawler reads directly.
 *
 * When the audit went from £4,800 to £6,000 and the retainer from £950 to £1,400, the page
 * was updated and llms.txt was not. For a fortnight the file whose entire purpose is to
 * tell AI crawlers what Tom charges was telling them the old, rejected numbers. Nothing
 * failed, nothing warned, and the only way anyone would have found out is a buyer quoting
 * a price back at him that he no longer offers.
 *
 * The duplication is a deliberate trade (a build-time TS import step is more machinery than
 * two numbers justify). This test is the price of that trade.
 */
const root = resolve(__dirname, '../..');
const read = (p: string) => readFileSync(resolve(root, p), 'utf8');

describe('content drift', () => {
  const structuredData = read('scripts/structured-data.mjs');
  const llms = read('public/llms.txt');

  test('every price on the page is a price in the JSON-LD', () => {
    for (const offer of PRICING) {
      if (!offer.price) continue;
      // 'from £6,000' -> '6000', which is how schema.org wants it.
      const digits = offer.price.replace(/[^\d]/g, '');
      expect(
        STRUCTURED_PRICES,
        `${offer.title} is "${offer.price}" on the page but ${digits} is missing from the JSON-LD`
      ).toContain(digits);
    }
  });

  test('the JSON-LD FAQ has the same number of entries as the page FAQ', () => {
    expect(STRUCTURED_FAQ_COUNT).toBe(FAQ.length);
  });

  test('every price on the page is the price llms.txt gives to AI crawlers', () => {
    for (const offer of PRICING) {
      if (!offer.price) continue;
      const amount = offer.price.replace(/^from\s+/i, '');
      expect(llms, `${offer.title} is "${amount}" on the page but llms.txt does not say so`).toContain(
        amount
      );
    }
    expect(llms).toContain(RETAINER.price.replace(/^from\s+/i, ''));
  });

  test('llms.txt does not still quote a price the page no longer offers', () => {
    // The exact numbers that went stale. Guard them by name.
    //
    // The round ones joined this list when the anchors moved to £750-a-day multiples. They are
    // the likeliest to come back of any number here: they are what everything downstream was
    // copied from, they read as "normal" prices, and llms.txt is hand-written, so nothing else
    // would notice a regression.
    for (const dead of [
      '£4,800',
      '£950/month',
      '£6,000',
      '£12,000',
      '£18,000',
      '£1,400/month',
    ]) {
      expect(llms, `llms.txt still quotes ${dead}, which is not a price on the site`).not.toContain(
        dead
      );
    }
  });

  test('the FAQ given to search engines is byte-for-byte the FAQ shown to humans', () => {
    // Questions AND answers, verbatim. This used to only check that questions matched, and
    // 8 of 9 answers had quietly drifted to trimmed, reworded versions, so an assistant
    // reading the FAQPage schema would quote text that appears nowhere on the page. Full
    // parity now, in the order both are declared.
    expect(STRUCTURED_FAQ.map((f: { q: string }) => f.q)).toEqual(FAQ.map((f) => f.q));
    expect(STRUCTURED_FAQ.map((f: { a: string }) => f.a)).toEqual(FAQ.map((f) => f.a));
  });

  test('the revision fee quoted in the JSON-LD is the one in the terms', () => {
    const fee = ENGAGEMENT_TERMS.charged
      .join(' ')
      .match(/£[\d,]+/)?.[0];
    expect(fee).toBeTruthy();
    expect(structuredData).toContain(fee as string);
  });
});
