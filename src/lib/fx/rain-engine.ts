import { resolvePalette, type RainPalette } from './rain-palettes';

/**
 * The cursor-reactive Matrix rain.
 *
 * Kept as a plain class rather than living inside the React component so the
 * signed-off visual maths (parting curve, ripple ring, burst decay) can be unit
 * tested without a canvas or a DOM.
 */

/** Note the missing 6 — that's how the design specifies it. */
export const GLYPHS = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789Z:."=*+-<>¦｜╌';

export const FONT_SIZE = 16;
/** Pointer influence radius. */
export const RADIUS = 120;
/** Maximum horizontal displacement of a glyph shoved aside by the pointer. */
export const PART = 26;
const RIPPLE_SPEED = 540; // px/s
const RIPPLE_BAND = 50; // px
const RIPPLE_LIFE = 1.15; // s
const BURST_MS = 800;
const BURST_GAIN = 2.2;
/** Alpha is quantised to this many levels so colour strings can be looked up, not built. */
const ALPHA_STEPS = 32;

export interface Ripple {
  x: number;
  y: number;
  t: number;
}

/* ─── Pure maths: the visual contract ─── */

/**
 * How far a glyph is pushed aside by the pointer.
 * Quadratic falloff, so glyphs hug the edge of the cursor rather than drifting.
 */
export function partOffset(dx: number, distance: number): number {
  if (distance >= RADIUS) return 0;
  const k = 1 - distance / RADIUS;
  return Math.sign(dx || 1) * k * k * PART;
}

/** Brightness lift from an expanding click ring. Zero outside the band or after it dies. */
export function rippleBoost(distance: number, ageSeconds: number): number {
  const radius = ageSeconds * RIPPLE_SPEED;
  const band = Math.abs(distance - radius);
  if (band >= RIPPLE_BAND) return 0;
  const boost = (1 - band / RIPPLE_BAND) * (1 - ageSeconds / RIPPLE_LIFE);
  return Math.max(0, boost);
}

/** Extra fall speed after a burst: 2.2x, decaying linearly to nothing over 800ms. */
export function burstFactor(now: number, burstAt: number): number {
  const age = (now - burstAt) / BURST_MS;
  return age >= 0 && age < 1 ? (1 - age) * BURST_GAIN : 0;
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
  /** Column density. Dropped on low-powered devices; the look is unchanged. */
  density?: number;
}

export class RainEngine {
  private ctx: CanvasRenderingContext2D;
  private drops: Drop[] = [];
  private cols = 0;
  private colWidth = 0;
  private width = 0;
  private height = 0;
  private dpr = 1;

  private pointer = { x: -9999, y: -9999, on: false };
  private ripples: Ripple[] = [];
  private burstAt = -1e9;

  private raf = 0;
  private running = false;
  private density: number;

  private palette!: RainPalette;
  /** Precomputed rgba() strings, indexed by quantised alpha. Avoids building ~6000 strings a frame. */
  private trailLut: string[] = [];
  private headLut: string[] = [];
  private sparkLut: string[] = [];
  /** Half the advance width of each glyph, so we can left-align instead of paying for textAlign: center. */
  private halfWidths: number[] = [];

  constructor(
    private canvas: HTMLCanvasElement,
    private options: EngineOptions
  ) {
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) throw new Error('2d canvas context unavailable');
    this.ctx = ctx;
    this.density = options.density ?? 0.95;
    this.setPalette(options.theme, options.tint);
    this.resize();
  }

  setPalette(theme: 'dark' | 'light', tint: string | null) {
    this.palette = resolvePalette(theme, tint);
    this.trailLut = this.buildLut(this.palette.trail);
    this.headLut = this.buildLut(this.palette.head);
    this.sparkLut = this.buildLut(this.palette.spark);
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

  resize() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    this.cols = Math.max(1, Math.floor((this.width / FONT_SIZE) * this.density));
    this.colWidth = this.width / this.cols;

    this.ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;
    this.ctx.textAlign = 'left';
    // Katakana and latin have different advance widths even in a mono face, so
    // measure once per glyph rather than paying for textAlign: 'center' on every
    // one of the ~6000 fillText calls per frame.
    this.halfWidths = Array.from(GLYPHS, (g) => this.ctx.measureText(g).width / 2);

    const rows = Math.floor(this.height / FONT_SIZE) + 12;
    this.drops = Array.from({ length: this.cols }, () => {
      const background = Math.random() < 0.4;
      return {
        y: Math.random() * this.height * 1.6 - this.height,
        speed: background ? Math.random() * 0.45 + 0.25 : Math.random() * 0.85 + 0.55,
        bright: background ? Math.random() * 0.22 + 0.1 : Math.random() * 0.45 + 0.4,
        len: rows,
        chars: Array.from({ length: rows }, () => (Math.random() * GLYPHS.length) | 0),
      };
    });
  }

  /* ─── Input ─── */

  setPointer(x: number, y: number) {
    this.pointer.x = x;
    this.pointer.y = y;
    this.pointer.on = true;
  }

  clearPointer() {
    this.pointer.on = false;
    this.pointer.x = -9999;
    this.pointer.y = -9999;
  }

  addRipple(x: number, y: number) {
    this.ripples.push({ x, y, t: performance.now() });
    if (this.ripples.length > 3) this.ripples.shift();
  }

  burst() {
    this.burstAt = performance.now();
  }

  /* ─── Loop ─── */

  start() {
    if (this.running) return;
    this.running = true;
    const tick = () => {
      if (!this.running) return;
      this.draw();
      this.raf = requestAnimationFrame(tick);
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

  /**
   * A single dim frame for reduced motion: presence without movement.
   */
  drawStaticFrame() {
    const { ctx } = this;
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.globalAlpha = 0.5;
    ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;
    ctx.textAlign = 'left';

    this.drops.forEach((d, x) => {
      const cx = x * this.colWidth + this.colWidth / 2;
      for (let i = 0; i < d.len; i += 2) {
        const py = d.y - i * FONT_SIZE;
        if (py < 0 || py > this.height) continue;
        ctx.fillStyle = this.lut(this.trailLut, (1 - i / d.len) * d.bright * 0.8);
        ctx.fillText(GLYPHS[d.chars[i]], cx - this.halfWidths[d.chars[i]], py);
      }
    });

    ctx.globalAlpha = 1;
  }

  private draw() {
    const { ctx } = this;
    const now = performance.now();
    const w = this.width;
    const h = this.height;
    const burst = burstFactor(now, this.burstAt);

    while (this.ripples.length && now - this.ripples[0].t > RIPPLE_LIFE * 1000) {
      this.ripples.shift();
    }

    ctx.fillStyle = this.palette.fade;
    ctx.fillRect(0, 0, w, h);
    ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;
    ctx.textAlign = 'left';

    const { x: px, y: py, on } = this.pointer;
    const r2 = RADIUS * RADIUS;

    for (let x = 0; x < this.cols; x++) {
      const d = this.drops[x];
      const cx = x * this.colWidth + this.colWidth / 2;
      const dx = cx - px;
      const near = on && Math.abs(dx) < RADIUS;
      const columnLift = near ? 1 - Math.abs(dx) / RADIUS : 0;

      d.y += d.speed * (1 + columnLift * 1.6 + burst);
      if (d.y - d.len * FONT_SIZE > h && Math.random() > 0.965) {
        d.y = -Math.random() * 260;
      }

      // Only walk the glyphs that can actually land on screen.
      const first = Math.max(0, Math.ceil((d.y - h - FONT_SIZE) / FONT_SIZE));
      const last = Math.min(d.len - 1, Math.floor((d.y + FONT_SIZE) / FONT_SIZE));

      for (let i = first; i <= last; i++) {
        const gy = d.y - i * FONT_SIZE;
        if (Math.random() < 0.0025) d.chars[i] = (Math.random() * GLYPHS.length) | 0;

        const fade = (1 - (i / d.len) * 0.9) * d.bright;
        let boost = 0;
        let drawX = cx;

        if (near) {
          const dy = gy - py;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < r2) {
            // sqrt only for the few glyphs actually inside the radius
            const dist = Math.sqrt(dist2);
            boost = 1 - dist / RADIUS;
            drawX = cx + partOffset(dx, dist);
          }
        }

        for (let ri = 0; ri < this.ripples.length; ri++) {
          const rp = this.ripples[ri];
          const age = (now - rp.t) / 1000;
          const ringRadius = age * RIPPLE_SPEED;
          const rdx = cx - rp.x;
          if (Math.abs(rdx) > ringRadius + RIPPLE_BAND) continue;
          const rdy = gy - rp.y;
          const boostFromRipple = rippleBoost(Math.sqrt(rdx * rdx + rdy * rdy), age);
          if (boostFromRipple > boost) boost = boostFromRipple;
        }

        const glyph = d.chars[i];
        const drawAt = drawX - this.halfWidths[glyph];

        if (i === 0) {
          const a = Math.min(0.98, 0.8 + boost * 0.6 + burst * 0.06);
          ctx.fillStyle = boost > 0.25 ? this.lut(this.sparkLut, a) : this.lut(this.headLut, a);
          ctx.shadowColor = this.lut(this.sparkLut, 0.5 + boost * 0.5);
          ctx.shadowBlur = boost > 0.1 ? 12 + boost * 14 : 5;
        } else {
          const a = Math.min(0.95, fade * (0.72 + boost * 1.6));
          ctx.fillStyle = boost > 0.3 ? this.lut(this.sparkLut, a) : this.lut(this.trailLut, a);
          if (boost > 0.4) {
            ctx.shadowColor = this.lut(this.sparkLut, 0.6);
            ctx.shadowBlur = 10;
          } else {
            ctx.shadowBlur = 0;
          }
        }

        ctx.fillText(GLYPHS[glyph], drawAt, gy);
      }
    }

    ctx.shadowBlur = 0;
  }
}
