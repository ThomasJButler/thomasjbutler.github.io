/**
 * Every image and clip the design assets brought in, in one map, keyed by project id.
 *
 * These are Cloudinary-hosted delivery URLs, built from a small `img()`/`vid()` helper pair so
 * the (transform, version, public_id) triple for each of the 111 assets sits on one line
 * instead of a hand-typed literal URL, which is exactly the kind of transcription risk this
 * file exists to remove. The masters are the untracked 2x originals that lived in
 * `design-assets/upload-to-cloudinary/`: Cloudinary's width transform does the downscale, so
 * starting from 2x is what keeps delivery sharp on a retina screen.
 *
 * Transform per media type, applied by the `T` table below:
 *
 *   cover                  f_auto,q_auto,w_800
 *   gallery / diagram /
 *   wireframe / games      f_auto,q_auto,w_1200 — diagram, wireframe and the arcade's per-game
 *                          shots all feed the same onZoom lightbox the gallery does, so they
 *                          share its bucket rather than getting one of their own.
 *   hero                   f_auto,q_auto,w_1600 (isq-agent only: the one route that opens on
 *                          an image)
 *   poster                 f_auto,q_auto,w_1200
 *   video (matrix-arcade)  vc_auto,q_auto,w_960 — uploaded natively as a video resource, built
 *                          with `vid()`, which hits `/video/upload/`.
 *   loop (isq-agent,       f_mp4,vc_auto,q_auto,w_480 — NOT a native video resource, see below.
 *   morpheus, sanctuary,   Built with `img()`, not `vid()`, despite being a clip.
 *   the-kicker)
 *
 * The four `loop` clips were uploaded as animated GIFs (an `image` resource in Cloudinary), but
 * `LoopVideo` (`src/components/media/LoopVideo.tsx`) renders a real `<video src>` element, which
 * will not play a `.gif`. The fix is NOT the `/video/upload/` endpoint — that 404s for an
 * `image`-resource asset (verified: `x-cld-error: Resource not found`). Cloudinary converts an
 * animated GIF to video *on the same `/image/upload/` endpoint* via the `f_mp4` transformation
 * flag instead, so these four are built with `img(T.loop, ..., 'mp4')`
 * (`f_mp4,vc_auto,q_auto,w_480/<version>/<id>.mp4`, still under `image/upload/`). Confirmed 200
 * with `content-type: video/mp4` for all four before this shipped. Don't "fix" these to
 * `vid()`/`/video/upload/`: it looks more correct and 404s all four clips.
 */
const CLOUD = 'https://res.cloudinary.com/depqttzlt';

const T = {
  cover: 'f_auto,q_auto,w_800',
  gallery: 'f_auto,q_auto,w_1200',
  hero: 'f_auto,q_auto,w_1600',
  poster: 'f_auto,q_auto,w_1200',
  video: 'vc_auto,q_auto,w_960',
  /** `f_mp4` is load-bearing here: it's an animated-GIF-to-video conversion, still served
   *  from the `image/upload/` endpoint, not a native video resource. See the header note. */
  loop: 'f_mp4,vc_auto,q_auto,w_480',
} as const;

function img(transform: string, version: string, publicId: string, ext: string = 'png'): string {
  return `${CLOUD}/image/upload/${transform}/${version}/${publicId}.${ext}`;
}

function vid(transform: string, version: string, publicId: string, ext: string = 'mp4'): string {
  return `${CLOUD}/video/upload/${transform}/${version}/${publicId}.${ext}`;
}

export const MEDIA = {
  'the-kicker': {
    cover: img(T.cover, 'v1785173001', 'hgdl3hqn1fdsd3sczwow'),
    gallery: [
      img(T.gallery, 'v1785173000', 'scc3z3zt9j7ym1bnvyjg'),
      img(T.gallery, 'v1785173000', 's5jz6tcap61nhid4h8ee'),
      img(T.gallery, 'v1785173000', 'sxukp70l0cunv4hodlkb'),
      img(T.gallery, 'v1785173000', 'b0i9viarhkpsutrkokit'),
      img(T.gallery, 'v1785173000', 'p9r9wdc1j7fqlnmbyqjz'),
    ],
    loop: img(T.loop, 'v1785173001', 'gzwo0cj96zo6ib2yn7gu', 'mp4'),
    poster: img(T.poster, 'v1785173001', 'qisoshrkuozbgzfc37ja', 'jpg'),
    diagram: img(T.gallery, 'v1785172979', 'bvsw03azvh0xzpziedgh'),
    wireframe: img(T.gallery, 'v1785173004', 'ygj0lyvskd6s7lhgkqe4'),
  },

  sanctuary: {
    cover: img(T.cover, 'v1785172997', 'xswvoovg3mtzlnfhfmkl'),
    gallery: [
      img(T.gallery, 'v1785172994', 'rieberdykul82zhjouyr'),
      img(T.gallery, 'v1785172994', 'rvrqj4fpedy7mkrknyeq'),
      img(T.gallery, 'v1785172995', 'pg1selbzeu1n6ljkyztj'),
      img(T.gallery, 'v1785172995', 'qbiimqkt5oh6zwcjfpay'),
      img(T.gallery, 'v1785172996', 'ytyywhry6ofux0yfuse8'),
    ],
    loop: img(T.loop, 'v1785172997', 'fec4gwdpkrhxrfjjogys', 'mp4'),
    poster: img(T.poster, 'v1785172996', 'nvwv2xhbxvzado90gskx', 'jpg'),
    diagram: img(T.gallery, 'v1785172980', 'cfiqtovahggvtluneeco'),
    wireframe: img(T.gallery, 'v1785173005', 'ye4d6kiu0nyhqjod515m'),
  },

  'isq-agent': {
    cover: img(T.cover, 'v1785172983', 'pk1wplnw1feynkmnuwvw'),
    gallery: [
      img(T.gallery, 'v1785172981', 'y4rppqrlnr4oxhdp4pl3'),
      img(T.gallery, 'v1785172980', 'pvkrya3hwuua4bne56cb'),
      img(T.gallery, 'v1785172981', 'elvbhgc6szeledvappq7'),
      img(T.gallery, 'v1785172981', 'cus2a7miqmrbep76vmow'),
      img(T.gallery, 'v1785172982', 'hznepyhomnzikmyvwcnp'),
    ],
    loop: img(T.loop, 'v1785172983', 'm79zqvx2pul1xx107wmu', 'mp4'),
    poster: img(T.poster, 'v1785172982', 'dltzay2ovm6znbaym6zc', 'jpg'),
    diagram: img(T.gallery, 'v1785172979', 'diantllldgn7wuzbpd58'),
    wireframe: img(T.gallery, 'v1785173003', 'gwgbytnlisb3y5a11vsb'),
    /** Only the case study has a hero: it is the one route that opens on an image. */
    hero: img(T.hero, 'v1785172983', 'yo2ngxidzrutqxjgqcmc'),
  },

  /**
   * Recut August 2026 for the local rebuild. The old set showed the hosted build this project
   * started as, down to a "[LLM] CLAUDE / [NET] ONLINE" status bar; the new one runs on Ollama
   * and LanceDB and says so.
   *
   * `diagram` and `wireframe` are the same artwork as gallery 04 and 05, at native 1640 rather
   * than letterboxed into the gallery's 16:9. So each appears twice in the modal, once in the
   * strip and once captioned under "Under the hood". That is deliberate, not an oversight.
   *
   * `poster` is unchanged: the loop was recut but no new poster frame was made, and the old one
   * still matches the first frame closely enough to stand in behind it.
   */
  morpheus: {
    cover: img(T.cover, 'v1787888988', 'dtmtetjvdaoc4uih3ekk'),
    gallery: [
      img(T.gallery, 'v1787888985', 'zrmofu85isz1qkkstdwz'),
      img(T.gallery, 'v1787888986', 'yti3oa6f8sci74a2xdqj'),
      img(T.gallery, 'v1787891756', 'kvnbz2bcigtmipgbp9ah'),
      img(T.gallery, 'v1787888986', 'trl2vnksukogqx3jrfa1'),
      img(T.gallery, 'v1787888986', 'opyqf74ubbxzhnmhvbfs'),
    ],
    loop: img(T.loop, 'v1787888987', 'axsby0k2p3sn4av8r1cx', 'mp4'),
    poster: img(T.poster, 'v1785172989', 'k3yxjuxcszqbxjwxtso1', 'jpg'),
    diagram: img(T.gallery, 'v1787891796', 'tmyanitzhebg7bvueesn'),
    wireframe: img(T.gallery, 'v1787888996', 'dutngyhiquned8qu0lzj'),
  },

  modelviz: {
    cover: img(T.cover, 'v1785172988', 'vcdkfij9hiapwpqzjvis'),
    gallery: [
      img(T.gallery, 'v1785172986', 'w02fv2zyrhdpcod54kte'),
      img(T.gallery, 'v1785172990', 'ff8fzt1q90kri8dfwyo2'),
      img(T.gallery, 'v1785172988', 'pqe3kg9l8lmazqyauflv'),
      img(T.gallery, 'v1785172988', 'eb2bwahnbaddjs12amsw'),
      img(T.gallery, 'v1785172988', 'avev5i3c9gzg3zjnojdu'),
    ],
    diagram: img(T.gallery, 'v1785172979', 'qxddwncqnowgvirkq1lh'),
    wireframe: img(T.gallery, 'v1785173004', 'tjyppudo09syiwyvli0d'),
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
    cover: img(T.cover, 'v1785172995', 'owdqzjg2wixqvt4hjbsr'),
    gallery: [
      img(T.gallery, 'v1785172993', 'nl22slsycr31tvibrpah'),
      img(T.gallery, 'v1785172993', 'jnreah2w7ucdgeaoehm7'),
      img(T.gallery, 'v1785172994', 'dvs9iwzcqsa365n56guk'),
      img(T.gallery, 'v1785172994', 'narebozaaw7f6pffbpgp'),
    ],
    diagram: img(T.gallery, 'v1785172980', 'ptf2phnfy36n2bl8hthp'),
    wireframe: img(T.gallery, 'v1785173005', 'uvbm8kg9g0ibhxapvmyd'),
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
      img(T.gallery, 'v1785172970', 'xfqdhhfxoa7oduzqc0lb'),
      img(T.gallery, 'v1785172973', 'flnydioipommlrn6do01'),
      img(T.gallery, 'v1785172973', 'iqukxisnz1hhvwiechzs'),
      img(T.gallery, 'v1785172971', 'hwfibz0exgmz3gthgzrp'),
    ],
  },

  /**
   * Designed tiles, August 2026. These replace padded screenshots of the live app that stood in
   * while Claude Design was unavailable; the cover is a 1600x750 tile, so this is now in
   * DESIGNED_COVERS.
   *
   * The gallery is stamped 01, 02, 03, 05. There is no 04 in the delivered set and the gap is
   * accepted rather than a missing upload.
   *
   * Tile 01 embeds a capture of the live archive reading "9 versions - 25 months". The archive
   * derives that from its own data and now says 26, because the August entry moved the last
   * date. It is left as taken: it is a screenshot of a real moment, and this project of all of
   * them is about showing what a thing actually looked like. The cover's stat is *designed*
   * rather than captured, so that one was re-cut to 26.
   */
  'version-timetravel': {
    cover: img(T.cover, 'v1787888996', 'hgy24rsfvo31dszokljo'),
    gallery: [
      img(T.gallery, 'v1787888994', 'aj0ffj7mgt49yonwqf0q'),
      img(T.gallery, 'v1787888995', 'y5hsatkiv4vrj38jlemm'),
      img(T.gallery, 'v1787888997', 'nksysetwsccguc1xzxo0'),
      img(T.gallery, 'v1787888995', 'oduxlsrmpiolxk5nzjpv'),
    ],
  },

  /**
   * Added August 2026 alongside the cards themselves. All three covers are designed 1600x750
   * tiles, so all three belong in DESIGNED_COVERS.
   *
   * Octopus is the one set that is not Matrix green. It carries the product's own light
   * palette, which is what the palette rule allows for a product's own artwork.
   *
   * Offshore's tiles are styled as a technical report and carry its section numbers. The
   * gallery opens on the linkage pipeline (2.1) and then runs 3.2, 4.1, so it reads in the
   * report's own order; the delivered order put 2.1 last, where the method arrived after its
   * own results. The publication gate, 2.4, is the diagram.
   */
  'octopus-job-hunter': {
    cover: img(T.cover, 'v1787888988', 'mg1swlik9lt8a5kscmp6'),
    gallery: [
      img(T.gallery, 'v1787888989', 'i5rexfswuqovoywyguu1'),
      img(T.gallery, 'v1787888990', 'pbu07eju1nsniuomtrvs'),
      img(T.gallery, 'v1787888984', 'o6qbmwnpzudc94odujop'),
      img(T.gallery, 'v1787888990', 'yazfvg3pavxmwppidchw'),
    ],
    diagram: img(T.gallery, 'v1787888988', 'vkwpetfcv89bmkulf7pj'),
    wireframe: img(T.gallery, 'v1787888990', 'dxqd4jrh4kvxm9h4jabi'),
  },

  'offshore-property-map': {
    cover: img(T.cover, 'v1787888991', 'ycfv7dfek2olzanoa2fv'),
    gallery: [
      img(T.gallery, 'v1787888985', 'r4rmi8yirnwcmg630vde'),
      img(T.gallery, 'v1787888990', 'rom8trvj65cwzrzxkwlj'),
      img(T.gallery, 'v1787888991', 'o9552vkqunmrum1qnxk8'),
    ],
    diagram: img(T.gallery, 'v1787888985', 'rpcwn1essosncseuwrre'),
  },

  'premier-league-oracle': {
    cover: img(T.cover, 'v1787888994', 'luuiw3yotyctpe1qhs4x'),
    gallery: [
      img(T.gallery, 'v1787888992', 'ymejzjt3feu67gbbkooc'),
      img(T.gallery, 'v1787888992', 'z230siasp2ezsdjrssuw'),
      img(T.gallery, 'v1787888993', 'u3mutjaflpe8pei6riqb'),
      img(T.gallery, 'v1787888993', 'jcxetopzxbwl9f2h4kuz'),
      img(T.gallery, 'v1787888993', 'oyko4qjsm7vv2wqfo285'),
    ],
  },

  'commercial-portfolio': {
    gallery: [
      img(T.gallery, 'v1785172977', 'thbhro31exeosewdwlsc'),
      img(T.gallery, 'v1785172978', 'vyitmvbgasc5m4pfswns'),
      img(T.gallery, 'v1785172978', 'fvxae9gkkcmoigfrp1tm'),
      img(T.gallery, 'v1785172979', 'filbnlmnzyzuvb3wmhbs'),
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
    cover: img(T.cover, 'v1785172994', 'cuz5e2pu5fxssomyqs1x'),
    gallery: [
      img(T.gallery, 'v1785172992', 'bjx0ujegol4wlyllxgbw'),
      img(T.gallery, 'v1785172991', 'p6lp4afeufn6avv4llxm'),
      img(T.gallery, 'v1785172992', 'vuc9dnwnkwznwixvnyn2'),
      img(T.gallery, 'v1785172992', 'udovwmnbketfwefo4ozj'),
      img(T.gallery, 'v1785172993', 'xoctgakwgp7q9uwtesoj'),
    ],
    wireframe: img(T.gallery, 'v1785173005', 'ucnigcezzgwwiyakqqhq'),
  },

  'sql-ball': {
    cover: img(T.cover, 'v1785172999', 'sw1kfqw7fugsudcnvuzi'),
    gallery: [
      img(T.gallery, 'v1785172998', 'esagl6iucjkl9oye5ct9'),
      img(T.gallery, 'v1785172998', 'rxwer90sfondqepaxlv0'),
      img(T.gallery, 'v1785172998', 'ly3dpsa2zfbe7r0jnfv8'),
      img(T.gallery, 'v1785172999', 'stzqpyqfynhwoivsopdm'),
      img(T.gallery, 'v1785172999', 'ovxva5mwwfsyj6o2pyof'),
    ],
    diagram: img(T.gallery, 'v1785172981', 'meui6recttslca3kwsz0'),
    wireframe: img(T.gallery, 'v1785173006', 'carb38fiilror5vlmqfz'),
  },

  'ai-code-generator': {
    cover: img(T.cover, 'v1785172974', 'ovq3kqjan7n67fvrifr4'),
    gallery: [
      img(T.gallery, 'v1785172974', 'mnhkojsz0h8c0k32bs8l'),
      img(T.gallery, 'v1785172971', 'jiv85kyvaxlksts54fi6'),
      img(T.gallery, 'v1785172971', 'zl8vui11xzbvntwiyr0z'),
      img(T.gallery, 'v1785172973', 'jzvmo4g8utk6iv2bkjjj'),
      img(T.gallery, 'v1785172973', 'hl3ryyyucyugbxuyqrv1'),
    ],
    diagram: img(T.gallery, 'v1785172978', 'g3idqlchxmaj1ugkzivb'),
    wireframe: img(T.gallery, 'v1785173003', 'p8jtm1mc6dc3sgl2cyev'),
  },

  'matrix-arcade': {
    cover: img(T.cover, 'v1785172986', 'dbxqi6pejtxxwb5xu6it'),
    gallery: [
      img(T.gallery, 'v1785172984', 'erylp4kddu03je1zagco'),
      img(T.gallery, 'v1785172984', 'tewvu1qan7rejs3rl0za'),
      img(T.gallery, 'v1785172984', 'cfxm18dbv8ubxmp8qbcu'),
      img(T.gallery, 'v1785172984', 'ndiaajmp6unotkspjpbu'),
      img(T.gallery, 'v1785172985', 'zuv6nclk5sjjbhrxzrqq'),
    ],
    /**
     * The title sting, not a gameplay clip, so it sits in `videos` with a poster rather
     * than being an autoplaying accent. The source is 624x624 square; it is cropped to
     * 16:9 here so it fills the modal's aspect-video box instead of pillarboxing against
     * its own 16:9 poster. Re-crop from the master if this is ever re-encoded.
     */
    video: vid(T.video, 'v1785172985', 'lpqrggfm6gei6t0afhqp'),
    poster: img(T.poster, 'v1785172985', 'dyvp61fndjxq3tskry4d'),
    /**
     * One real gameplay screenshot per game, keyed by the arcade's own game ids. Twelve of
     * them, which is the point: the roster is the thing this project is, and the count was
     * the one fact the site got wrong for a whole release.
     */
    games: {
      'ctrl-s': img(T.gallery, 'v1785172975', 'dlpusfxctgq4hnnpyy4y'),
      snake: img(T.gallery, 'v1785172978', 'hlgzo7c68xhtfs9becgb'),
      pong: img(T.gallery, 'v1785172976', 'siufwvuitkz3td90duix'),
      bird: img(T.gallery, 'v1785172974', 'oqk5incswwyok9dpfsge'),
      invaders: img(T.gallery, 'v1785172975', 'bqmcehwk3fgspg82pwrs'),
      metris: img(T.gallery, 'v1785172976', 'np5qjg0qnuiupnmnh3zi'),
      frogger: img(T.gallery, 'v1785172975', 'c0njovq9ft0nufqrkj54'),
      'neo-jump': img(T.gallery, 'v1785172976', 'sjazc9tmv2jbaak2wll8'),
      'agent-chase': img(T.gallery, 'v1785172975', 'dqc4dzdsjdr9eaautkfz'),
      'rhythm-hacker': img(T.gallery, 'v1785172977', 'nmvvfp7wdlc45djzgq44'),
      'cloud-jumper': img(T.gallery, 'v1785172975', 's1s8kpcccp8jeiyrscnk'),
      'code-breaker': img(T.gallery, 'v1785172975', 'rjeptkkmtewmo9mnvtdr'),
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
 * Keyed on the id rather than the URL shape on purpose: these values are Cloudinary URLs for
 * every project now, so a check like `startsWith('/img/')` was never going to be durable.
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
  'version-timetravel',
  'octopus-job-hunter',
  'offshore-property-map',
  'premier-league-oracle',
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
