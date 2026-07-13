import { resolvePalette, type RainPalette } from './rain-palettes';

/**
 * The Matrix rain.
 *
 * Kept as a plain class rather than living inside the React component so its maths
 * can be unit tested without a canvas or a DOM.
 *
 * Performance is the whole design here. The naive version — which this used to be —
 * gives every column a glyph trail as tall as the viewport, which at 1920x1080 on a
 * retina display is roughly 9,000 fillText calls per frame plus a full-canvas
 * alpha-blended fill over 7.2 million device pixels. That drops frames on real
 * hardware even though it measures fine at DPR 1.
 *
 * Four things keep it cheap, none of which change how it reads:
 *   - trails are bounded (STREAM_MIN..STREAM_MAX), not viewport-height;
 *   - colour strings are looked up from a table, never built per glyph;
 *   - glyphs are left-aligned against precomputed half-widths, so we don't pay for
 *     textAlign: 'center' on every call;
 *   - the canvas renders at a capped DPR, because a decorative background at 40%
 *     opacity gains nothing from retina sharpness.
 *
 * If a machine still can't hold the frame budget, the quality governor sheds the
 * head glow and then column density rather than letting the whole page judder.
 */

/** Note the missing 6 — that's how the design specifies it. */
export const GLYPHS = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789Z:."=*+-<>¦｜╌';

export const FONT_SIZE = 16;
/** Glyphs per column. Bounded: this is the single biggest lever on frame cost. */
export const STREAM_MIN = 16;
export const STREAM_MAX = 34;
const BURST_MS = 800;
const BURST_GAIN = 2.2;
/** Alpha is quantised to this many levels so colour strings can be looked up, not built. */
const ALPHA_STEPS = 32;
/**
 * Render the rain at 1 device pixel per CSS pixel, never retina.
 *
 * The per-frame fade is a full-canvas alpha-blended fillRect, so its cost is exactly
 * the pixel count: at DPR 2 on a 1728x1080 window that is 7.5 million pixels every
 * frame, versus 1.9 million here. At 40% opacity behind content, nobody can see the
 * difference; the frame budget very much can.
 */
const MAX_DPR = 1;
/**
 * Draw at 30fps, not 60.
 *
 * This is decorative background motion — falling glyphs read identically at 30fps —
 * and halving the draw rate halves the rain's share of the main thread, which is
 * what leaves room for the page to feel responsive while you scroll and move around.
 */
const FRAME_MS = 1000 / 30;

/* ─── Pure maths ─── */

/** Extra fall speed after a burst: 2.2x, decaying linearly to nothing over 800ms. */
export function burstFactor(now: number, burstAt: number): number {
  const age = (now - burstAt) / BURST_MS;
  return age >= 0 && age < 1 ? (1 - age) * BURST_GAIN : 0;
}

/** Trail brightness at depth `i` of a stream of `len`: brightest at the head. */
export function trailFade(i: number, len: number, bright: number): number {
  return (1 - (i / len) * 0.9) * bright;
}

interface Drop {
  y: number;
  speed: number;
  bright: number;
  len: number;
  /** Indices into GLYPHS, so colour lookups and glyph widths are array reads. */
  chars: number[];
}

interface EngineOptions {
  theme: 'dark' | 'light';
  tint: string | null;
  /** Column density. The governor lowers this on machines that can't keep up. */
  density?: number;
}

/** Quality tiers, shed in order when frames run long. */
type Quality = 'full' | 'noGlow' | 'sparse';

export class RainEngine {
  private ctx: CanvasRenderingContext2D;
  private drops: Drop[] = [];
  private cols = 0;
  private colWidth = 0;
  private width = 0;
  private height = 0;
  private dpr = 1;

  private burstAt = -1e9;
  private raf = 0;
  private running = false;

  private baseDensity: number;
  private quality: Quality = 'full';
  private frameCost = 16;
  private slowFrames = 0;

  private palette!: RainPalette;
  private trailLut: string[] = [];
  private headLut: string[] = [];
  private halfWidths: number[] = [];

  constructor(
    private canvas: HTMLCanvasElement,
    options: EngineOptions
  ) {
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) throw new Error('2d canvas context unavailable');
    this.ctx = ctx;
    this.baseDensity = options.density ?? 0.9;
    this.setPalette(options.theme, options.tint);
    this.resize();
  }

  setPalette(theme: 'dark' | 'light', tint: string | null) {
    this.palette = resolvePalette(theme, tint);
    this.trailLut = this.buildLut(this.palette.trail);
    this.headLut = this.buildLut(this.palette.head);
  }

  private buildLut(rgb: string): string[] {
    return Array.from(
      { length: ALPHA_STEPS },
      (_, i) => `rgba(${rgb},${(i / (ALPHA_STEPS - 1)).toFixed(3)})`
    );
  }

  private lut(table: string[], alpha: number): string {
    const i = (alpha * (ALPHA_STEPS - 1)) | 0;
    return table[i < 0 ? 0 : i > ALPHA_STEPS - 1 ? ALPHA_STEPS - 1 : i];
  }

  private get density(): number {
    return this.quality === 'sparse' ? this.baseDensity * 0.6 : this.baseDensity;
  }

  resize() {
    this.dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = Math.round(this.width * this.dpr);
    this.canvas.height = Math.round(this.height * this.dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    this.cols = Math.max(1, Math.floor((this.width / FONT_SIZE) * this.density));
    this.colWidth = this.width / this.cols;

    this.ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;
    this.ctx.textAlign = 'left';
    // Katakana and latin have different advance widths even in a mono face, so
    // measure once per glyph rather than paying for textAlign: 'center' on every call.
    this.halfWidths = Array.from(GLYPHS, (g) => this.ctx.measureText(g).width / 2);

    this.drops = Array.from({ length: this.cols }, () => this.makeDrop(true));
  }

  private makeDrop(scatter: boolean): Drop {
    const background = Math.random() < 0.4;
    const len = STREAM_MIN + ((Math.random() * (STREAM_MAX - STREAM_MIN)) | 0);
    return {
      y: scatter ? Math.random() * this.height * 1.4 - this.height * 0.2 : -Math.random() * 260,
      speed: background ? Math.random() * 0.45 + 0.25 : Math.random() * 0.85 + 0.55,
      bright: background ? Math.random() * 0.22 + 0.14 : Math.random() * 0.45 + 0.45,
      len,
      chars: Array.from({ length: len }, () => (Math.random() * GLYPHS.length) | 0),
    };
  }

  /** Speed every column up for 800ms. Fired by the boot intro and the easter eggs. */
  burst() {
    this.burstAt = performance.now();
  }

  start() {
    if (this.running) return;
    this.running = true;
    let lastDraw = 0;

    const tick = (now: number) => {
      if (!this.running) return;
      this.raf = requestAnimationFrame(tick);
      // Pace to 30fps. We still ride requestAnimationFrame (so we stay in sync with
      // the compositor and stop when the tab is hidden), we just skip every other one.
      const elapsed = now - lastDraw;
      if (elapsed < FRAME_MS) return;
      // Movement is scaled by elapsed time rather than assumed per-frame, so the rain
      // falls at the same speed whatever rate we end up drawing at.
      this.draw(lastDraw === 0 ? 1 : Math.min(elapsed / 16.667, 4));
      lastDraw = now;
    };

    this.raf = requestAnimationFrame(tick);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  destroy() {
    this.stop();
  }

  /** A single dim frame for reduced motion: presence without movement. */
  drawStaticFrame() {
    const { ctx } = this;
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.globalAlpha = 0.5;
    ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;
    ctx.textAlign = 'left';
    ctx.shadowBlur = 0;

    this.drops.forEach((d, x) => {
      const cx = x * this.colWidth + this.colWidth / 2;
      for (let i = 0; i < d.len; i += 2) {
        const py = d.y - i * FONT_SIZE;
        if (py < 0 || py > this.height) continue;
        const glyph = d.chars[i];
        ctx.fillStyle = this.lut(this.trailLut, trailFade(i, d.len, d.bright) * 0.8);
        ctx.fillText(GLYPHS[glyph], cx - this.halfWidths[glyph], py);
      }
    });

    ctx.globalAlpha = 1;
  }

  /** Shed quality rather than let the page judder. */
  private governQuality(cost: number) {
    // Rolling average, so one long frame (a GC pause, a tab switch) doesn't demote us.
    this.frameCost += (cost - this.frameCost) * 0.1;

    if (this.frameCost > 10) {
      this.slowFrames += 1;
      if (this.slowFrames > 45) {
        this.slowFrames = 0;
        if (this.quality === 'full') {
          this.quality = 'noGlow';
        } else if (this.quality === 'noGlow') {
          this.quality = 'sparse';
          this.resize();
        }
      }
    } else {
      this.slowFrames = 0;
    }
  }

  private draw(step: number) {
    const { ctx } = this;
    const started = performance.now();
    const w = this.width;
    const h = this.height;
    const burst = burstFactor(started, this.burstAt);
    const glow = this.quality === 'full';

    ctx.fillStyle = this.palette.fade;
    ctx.fillRect(0, 0, w, h);
    ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;
    ctx.textAlign = 'left';

    // Heads are drawn in a second pass so shadowBlur is toggled twice per frame
    // rather than twice per column. Setting it per glyph is what made this expensive:
    // each shadowed fillText is a gaussian on a scratch surface, and there is one
    // head per column.
    const headX: number[] = [];
    const headY: number[] = [];
    const headGlyph: number[] = [];

    ctx.shadowBlur = 0;

    for (let x = 0; x < this.cols; x++) {
      const d = this.drops[x];
      const cx = x * this.colWidth + this.colWidth / 2;

      d.y += d.speed * (1 + burst) * step;
      if (d.y - d.len * FONT_SIZE > h && Math.random() > 0.9) {
        this.drops[x] = this.makeDrop(false);
        continue;
      }

      // Walk only the glyphs that can land on screen.
      const first = Math.max(0, Math.ceil((d.y - h - FONT_SIZE) / FONT_SIZE));
      const last = Math.min(d.len - 1, Math.floor((d.y + FONT_SIZE) / FONT_SIZE));

      for (let i = first; i <= last; i++) {
        const gy = d.y - i * FONT_SIZE;
        if (Math.random() < 0.0025) d.chars[i] = (Math.random() * GLYPHS.length) | 0;

        const glyph = d.chars[i];
        const drawAt = cx - this.halfWidths[glyph];

        if (i === 0) {
          headX.push(drawAt);
          headY.push(gy);
          headGlyph.push(glyph);
        } else {
          ctx.fillStyle = this.lut(this.trailLut, Math.min(0.95, trailFade(i, d.len, d.bright)));
          ctx.fillText(GLYPHS[glyph], drawAt, gy);
        }
      }
    }

    // Second pass: the bright leading glyph of every stream, in one state change.
    ctx.fillStyle = this.lut(this.headLut, Math.min(0.98, 0.85 + burst * 0.06));
    if (glow) {
      ctx.shadowColor = this.lut(this.headLut, 0.5);
      ctx.shadowBlur = 5;
    }
    for (let i = 0; i < headX.length; i++) {
      ctx.fillText(GLYPHS[headGlyph[i]], headX[i], headY[i]);
    }
    ctx.shadowBlur = 0;

    this.governQuality(performance.now() - started);
  }
}
