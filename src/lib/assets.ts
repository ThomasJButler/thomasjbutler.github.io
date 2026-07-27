/**
 * Every image and clip the design assets brought in, in one map, keyed by project id.
 *
 * These are local files under `public/img/` (gitignored) while the design is iterated on.
 * Cloudinary bills on *delivery*, so pointing dev at it spends credits on every reload, and
 * /projects reloads eighteen covers a visit.
 *
 * The masters live in one untracked folder, split in two by what happens to them next:
 *
 *   design-assets/upload-to-cloudinary/   exactly the 111 files this map references, and
 *                                         nothing else. Upload the whole folder.
 *   design-assets/not-for-upload/         things that must NOT go to Cloudinary. The three
 *                                         og-*.png are per-route Open Graph images set in
 *                                         scripts/routes.mjs and served same-origin from
 *                                         public/, because a social scraper wants an absolute
 *                                         URL on this domain. Also the held NewsPerspective
 *                                         diagram, a LinkedIn template and two design notes.
 *
 * Those two folders are generated from this file, so if you add an entry below, re-run the
 * split rather than copying by hand. `design/ASSET-MANIFEST.md` lists every file with the
 * transform it needs.
 *
 * BEFORE PRODUCTION: upload to Cloudinary and replace each value below. The URLs cannot be
 * derived from the filenames, because Cloudinary appends a generated suffix to the public_id
 * (`Morpheus5_pdcmvr.png`, `lfcreddit2_wzbqty.png`). That is the entire reason this map
 * exists: the swap is this one file, not thirty call sites. Reapply the same transforms the
 * other projects already use, or the delivered bytes will be the full-size originals:
 *
 *   cover     .../image/upload/f_auto,q_auto,w_800/<version>/<public_id>.png
 *   gallery   .../image/upload/f_auto,q_auto,w_1200/<version>/<public_id>.png
 *   hero      .../image/upload/f_auto,q_auto,w_1600/<version>/<public_id>.png
 *   loop      .../video/upload/vc_auto,q_auto,w_480/<version>/<public_id>.mp4
 *   video     .../video/upload/vc_auto,q_auto,w_960/<version>/<public_id>.mp4
 *   poster    .../image/upload/f_auto,q_auto,w_1200/<version>/<public_id>.jpg
 *
 * The local files are downscaled from the 2x masters in `design-assets/` (3200px, 2-5MB each).
 * Upload the MASTERS, not these: Cloudinary's width transform does the resize, and starting
 * from 2x is what keeps them sharp on a retina screen.
 *
 * One knock-on while these are local: `ProjectCover` builds its srcset by regex-matching
 * `/upload/...w_800` in the URL, so a `/img/...` path matches nothing, `cloudinarySrcSet()`
 * returns undefined and the plain `src` is used. Harmless and temporary. The srcset comes
 * back on its own the moment these are Cloudinary URLs again.
 */
const IMG = '/img';

export const MEDIA = {
  'the-kicker': {
    cover: `${IMG}/the-kicker.png`,
    gallery: [
      `${IMG}/the-kicker-01.png`,
      `${IMG}/the-kicker-02.png`,
      `${IMG}/the-kicker-03.png`,
      `${IMG}/the-kicker-04.png`,
      `${IMG}/the-kicker-05.png`,
    ],
    loop: `${IMG}/the-kicker-loop.mp4`,
    poster: `${IMG}/the-kicker-loop-poster.jpg`,
    diagram: `${IMG}/diagram-kicker.png`,
    wireframe: `${IMG}/wireframe-kicker.png`,
  },

  sanctuary: {
    cover: `${IMG}/sanctuary.png`,
    gallery: [
      `${IMG}/sanctuary-01.png`,
      `${IMG}/sanctuary-02.png`,
      `${IMG}/sanctuary-03.png`,
      `${IMG}/sanctuary-04.png`,
      `${IMG}/sanctuary-05.png`,
    ],
    loop: `${IMG}/sanctuary-loop.mp4`,
    poster: `${IMG}/sanctuary-loop-poster.jpg`,
    diagram: `${IMG}/diagram-sanctuary.png`,
    wireframe: `${IMG}/wireframe-sanctuary.png`,
  },

  'isq-agent': {
    cover: `${IMG}/isq-agent.png`,
    gallery: [
      `${IMG}/isq-agent-01.png`,
      `${IMG}/isq-agent-02.png`,
      `${IMG}/isq-agent-03.png`,
      `${IMG}/isq-agent-04.png`,
      `${IMG}/isq-agent-05.png`,
    ],
    loop: `${IMG}/isq-agent-loop.mp4`,
    poster: `${IMG}/isq-agent-loop-poster.jpg`,
    diagram: `${IMG}/diagram-isq.png`,
    wireframe: `${IMG}/wireframe-isq.png`,
    /** Only the case study has a hero: it is the one route that opens on an image. */
    hero: `${IMG}/isq-case-study-hero.png`,
  },

  morpheus: {
    cover: `${IMG}/morpheus.png`,
    gallery: [
      `${IMG}/morpheus-01.png`,
      `${IMG}/morpheus-02.png`,
      `${IMG}/morpheus-03.png`,
      `${IMG}/morpheus-04.png`,
      `${IMG}/morpheus-05.png`,
    ],
    loop: `${IMG}/morpheus-loop.mp4`,
    poster: `${IMG}/morpheus-loop-poster.jpg`,
    diagram: `${IMG}/diagram-morpheus.png`,
    wireframe: `${IMG}/wireframe-morpheus.png`,
  },

  modelviz: {
    cover: `${IMG}/modelviz.png`,
    gallery: [
      `${IMG}/modelviz-01.png`,
      `${IMG}/modelviz-02.png`,
      `${IMG}/modelviz-03.png`,
      `${IMG}/modelviz-04.png`,
      `${IMG}/modelviz-05.png`,
    ],
    diagram: `${IMG}/diagram-modelviz.png`,
    wireframe: `${IMG}/wireframe-modelviz.png`,
  },

  /**
   * Four gallery tiles, not five, and that is the corrected set rather than a gap.
   *
   * The first delivery drew a product that did not exist: a LangGraph workflow, a GitHub OAuth
   * screen, a risk score, an analytics dashboard, and a tile of invented percentages captioned
   * "from a real run". None of it is in the repo. Two of those tiles had nothing true left to
   * say once the fiction came out, so they were cut instead of redrawn, and the rest renumbered.
   */
  'reviewbot-protocol': {
    cover: `${IMG}/reviewbot-protocol.png`,
    gallery: [
      `${IMG}/reviewbot-protocol-01.png`,
      `${IMG}/reviewbot-protocol-02.png`,
      `${IMG}/reviewbot-protocol-03.png`,
      `${IMG}/reviewbot-protocol-04.png`,
    ],
    diagram: `${IMG}/diagram-reviewbot-protocol.png`,
    wireframe: `${IMG}/wireframe-reviewbot-protocol.png`,
  },

  /**
   * Gallery only, for both of these. No designed cover was made, so each keeps its existing
   * Cloudinary one and neither belongs in DESIGNED_COVERS: those covers are not 2.133:1.
   *
   * Worth having anyway even without a cover, because both are `featured`. A featured project
   * renders twice on /projects, and `altThumb` picks a gallery shot for the second appearance
   * so the same image does not sit on the page twice.
   */
  'mastering-ai-portfolio': {
    gallery: [
      `${IMG}/agentic-ai-portfolio-01.png`,
      `${IMG}/agentic-ai-portfolio-02.png`,
      `${IMG}/agentic-ai-portfolio-03.png`,
      `${IMG}/agentic-ai-portfolio-04.png`,
    ],
  },

  /**
   * Screenshots of the live app rather than designed tiles, taken while Claude Design was
   * unavailable, and picked from thirteen.
   *
   * They arrived at 2880x1800, which is 1.600 and not the gallery's 16:9. Padded to 3200x1800
   * in #0D0D0D rather than cropped: the app's own chrome samples at exactly that value, so the
   * bars are invisible, and a 10% centre-crop would have taken the header off the top of all
   * four. Nothing is lost and nothing is stretched.
   */
  'version-timetravel': {
    gallery: [
      `${IMG}/version-timetravel-01.png`,
      `${IMG}/version-timetravel-02.png`,
      `${IMG}/version-timetravel-03.png`,
      `${IMG}/version-timetravel-04.png`,
    ],
  },

  'commercial-portfolio': {
    gallery: [
      `${IMG}/commercial-portfolio-01.png`,
      `${IMG}/commercial-portfolio-02.png`,
      `${IMG}/commercial-portfolio-03.png`,
      `${IMG}/commercial-portfolio-04.png`,
    ],
  },

  /**
   * No `diagram` yet, and that is the only thing missing. The delivered one still prices a
   * refresh at "about 14 requests" and "seven refreshes a day", which was true before NewsAPI
   * dropped `country=gb`. `process_new_articles` loops over us and gb: us iterates 7 categories,
   * gb is a single batched request. Eight requests, so about twelve refreshes. Tile `-05` was
   * corrected and now says exactly that; the diagram was not re-exported with it.
   */
  'news-perspective': {
    cover: `${IMG}/newsperspective.png`,
    gallery: [
      `${IMG}/newsperspective-01.png`,
      `${IMG}/newsperspective-02.png`,
      `${IMG}/newsperspective-03.png`,
      `${IMG}/newsperspective-04.png`,
      `${IMG}/newsperspective-05.png`,
    ],
    wireframe: `${IMG}/wireframe-newsperspective.png`,
  },

  'sql-ball': {
    cover: `${IMG}/sql-ball.png`,
    gallery: [
      `${IMG}/sql-ball-01.png`,
      `${IMG}/sql-ball-02.png`,
      `${IMG}/sql-ball-03.png`,
      `${IMG}/sql-ball-04.png`,
      `${IMG}/sql-ball-05.png`,
    ],
    diagram: `${IMG}/diagram-sql-ball.png`,
    wireframe: `${IMG}/wireframe-sql-ball.png`,
  },

  'ai-code-generator': {
    cover: `${IMG}/ai-code-generator.png`,
    gallery: [
      `${IMG}/ai-code-generator-01.png`,
      `${IMG}/ai-code-generator-02.png`,
      `${IMG}/ai-code-generator-03.png`,
      `${IMG}/ai-code-generator-04.png`,
      `${IMG}/ai-code-generator-05.png`,
    ],
    diagram: `${IMG}/diagram-ai-code-generator.png`,
    wireframe: `${IMG}/wireframe-ai-code-generator.png`,
  },

  'matrix-arcade': {
    cover: `${IMG}/matrix-arcade.png`,
    gallery: [
      `${IMG}/matrix-arcade-01.png`,
      `${IMG}/matrix-arcade-02.png`,
      `${IMG}/matrix-arcade-03.png`,
      `${IMG}/matrix-arcade-04.png`,
      `${IMG}/matrix-arcade-05.png`,
    ],
    /**
     * The title sting, not a gameplay clip, so it sits in `videos` with a poster rather
     * than being an autoplaying accent. The source is 624x624 square; it is cropped to
     * 16:9 here so it fills the modal's aspect-video box instead of pillarboxing against
     * its own 16:9 poster. Re-crop from the master if this is ever re-encoded.
     */
    video: `${IMG}/matrix-arcade.mp4`,
    poster: `${IMG}/matrix-arcade-poster.jpg`,
    /**
     * One real gameplay screenshot per game, keyed by the arcade's own game ids. Twelve of
     * them, which is the point: the roster is the thing this project is, and the count was
     * the one fact the site got wrong for a whole release.
     */
    games: {
      'ctrl-s': `${IMG}/arcade-ctrl-s.png`,
      snake: `${IMG}/arcade-snake.png`,
      pong: `${IMG}/arcade-pong.png`,
      bird: `${IMG}/arcade-bird.png`,
      invaders: `${IMG}/arcade-invaders.png`,
      metris: `${IMG}/arcade-metris.png`,
      frogger: `${IMG}/arcade-frogger.png`,
      'neo-jump': `${IMG}/arcade-neo-jump.png`,
      'agent-chase': `${IMG}/arcade-agent-chase.png`,
      'rhythm-hacker': `${IMG}/arcade-rhythm-hacker.png`,
      'cloud-jumper': `${IMG}/arcade-cloud-jumper.png`,
      'code-breaker': `${IMG}/arcade-code-breaker.png`,
    },
  },
};

/**
 * Intrinsic pixel sizes, so every `<img>` can carry width/height and reserve its box before
 * it loads. Without them the page reflows as each one arrives, which is the layout shift the
 * fallback @font-face blocks and the DecodeText sizer already exist to prevent elsewhere.
 * These are the export dimensions and they are not arbitrary: covers are composed at the
 * card band's exact 2.133:1, and diagrams are 1.602:1, which is why they must never be
 * forced into a 16:9 box (see Figure).
 */
/**
 * Project ids whose `cover` is one of the designed 1600x750 (2.133:1) files.
 *
 * This is an explicit list rather than `id in MEDIA`, which is what it used to be. Those two
 * looked like the same question until ModelViz arrived with designed *gallery* art while its
 * cover was still the old 16:9 Cloudinary render: the shorthand would have told the modal to
 * draw a 16:9 image at 2.133:1 and squash it, silently. ModelViz has its designed cover now,
 * so the list happens to match MEDIA's keys again, and the shorthand would happen to work.
 * It stays explicit anyway. "Has local assets" and "has a 2.133:1 cover" are two different
 * facts that were only ever coincidentally equal, and the next project to arrive part-wired
 * puts them back out of step with nothing to catch it.
 *
 * Keyed on the id rather than the URL shape on purpose: these values become Cloudinary URLs
 * eventually, and a check like `startsWith('/img/')` would quietly start returning false the
 * day that happens, taking the correct aspect ratio with it.
 */
const DESIGNED_COVERS = new Set([
  'the-kicker',
  'sanctuary',
  'isq-agent',
  'morpheus',
  'sql-ball',
  'ai-code-generator',
  'matrix-arcade',
  'modelviz',
  'reviewbot-protocol',
  'news-perspective',
]);

export function hasDesignedCover(id: string): boolean {
  return DESIGNED_COVERS.has(id);
}

export const MEDIA_SIZE = {
  cover: { width: 1600, height: 750 },
  gallery: { width: 1600, height: 900 },
  diagram: { width: 1640, height: 1024 },
  wireframe: { width: 1640, height: 924 },
  hero: { width: 1600, height: 640 },
  loop: { width: 480, height: 270 },
  /**
   * 1.6:1, not 16:9. These are real gameplay captures whose HUD (SCORE, LEVEL, FOOD) sits
   * hard against the top and bottom edges, so forcing them into the gallery's aspect-video
   * box would shave about 10% and clip the readouts. They render through Figure, which sizes
   * from these numbers instead.
   */
  game: { width: 1600, height: 1000 },
};
