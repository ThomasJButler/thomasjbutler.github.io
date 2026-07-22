/**
 * Every image and clip the design assets brought in, in one map, keyed by project id.
 *
 * These are local files under `public/img/` (gitignored) while the design is iterated on.
 * Cloudinary bills on *delivery*, so pointing dev at it spends credits on every reload, and
 * /projects reloads eighteen covers a visit. The master copies live in `desigassetnexports/`.
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
 * The local files are downscaled from the 2x masters in `newdesignassetexports/` (3200px,
 * 2-5MB each). Upload the MASTERS, not these: Cloudinary's width transform does the resize,
 * and starting from 2x is what keeps them sharp on a retina screen.
 *
 * One knock-on while these are local: `ProjectCover` builds its srcset by regex-matching
 * `/upload/...w_800` in the URL, so a `/img/...` path matches nothing, `cloudinarySrcSet()`
 * returns undefined and the plain `src` is used. Harmless and temporary. The srcset comes
 * back on its own the moment these are Cloudinary URLs again.
 */
const IMG = '/img';

export const MEDIA = {
  'premier-league-oracle': {
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
export const MEDIA_SIZE = {
  cover: { width: 1600, height: 750 },
  gallery: { width: 1600, height: 900 },
  diagram: { width: 1640, height: 1024 },
  wireframe: { width: 1640, height: 924 },
  hero: { width: 1600, height: 640 },
  loop: { width: 480, height: 270 },
};
