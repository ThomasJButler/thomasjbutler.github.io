/** Rain colours. Values are from the v5 design handoff and are signed off — don't tune them. */
export interface RainPalette {
  /** Per-frame wash that makes trails fade instead of smearing. */
  fade: string;
  /** "r,g,b" triples, ready to interpolate into rgba(). */
  trail: string;
  head: string;
  spark: string;
}

export const RAIN_DARK: RainPalette = {
  fade: 'rgba(4,8,5,0.075)',
  trail: '0,210,90',
  head: '200,255,205',
  spark: '90,255,170',
};

export const RAIN_LIGHT: RainPalette = {
  fade: 'rgba(252,253,250,0.09)',
  trail: '22,120,60',
  head: '40,150,80',
  spark: '0,170,90',
};

export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

/** Blend `a` towards `b` by `t`, returning an "r,g,b" triple. */
export function mixRgb(a: [number, number, number], b: [number, number, number], t: number): string {
  return a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(',');
}

const WHITE: [number, number, number] = [255, 255, 255];

/** The accent (blue pill) palette: trail takes the accent, head and spark lift towards white. */
export function tintedPalette(hex: string): RainPalette {
  const rgb = hexToRgb(hex);
  return {
    fade: RAIN_DARK.fade,
    trail: rgb.join(','),
    head: mixRgb(rgb, WHITE, 0.78),
    spark: mixRgb(rgb, WHITE, 0.35),
  };
}

export function resolvePalette(theme: 'dark' | 'light', tint: string | null): RainPalette {
  if (theme === 'light') return RAIN_LIGHT;
  return tint ? tintedPalette(tint) : RAIN_DARK;
}
