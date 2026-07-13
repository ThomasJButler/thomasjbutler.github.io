/* v5/rain.jsx — V5Rain: cursor-reactive Matrix rain.
   Parts around the cursor, ripples on click, global burst API (window.__v5Burst). */

function v5Hex(hex) {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function v5Mix(a, b, t) { return a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(','); }

function V5Rain({ tint, theme }) {
  const ref = React.useRef(null);
  const tintRef = React.useRef(tint); tintRef.current = tint;
  const themeRef = React.useRef(theme); themeRef.current = theme;

  React.useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    const GLYPHS = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789Z:."=*+-<>¦｜╌';
    const FS = 16;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cols = 0, drops = [], dpr = Math.min(window.devicePixelRatio || 1, 2);

    const palette = () => {
      if (themeRef.current === 'circuit')
        return { fade: 'rgba(252,253,250,0.09)', trail: '22,120,60', head: '40,150,80', spark: '0,170,90' };
      const t = tintRef.current;
      if (t) {
        const rgb = v5Hex(t), W = [255, 255, 255];
        return { fade: 'rgba(4,8,5,0.075)', trail: rgb.join(','), head: v5Mix(rgb, W, 0.78), spark: v5Mix(rgb, W, 0.35) };
      }
      return { fade: 'rgba(4,8,5,0.075)', trail: '0,210,90', head: '200,255,205', spark: '90,255,170' };
    };

    const init = () => {
      const w = innerWidth, h = innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor((w / FS) * 0.95);
      drops = Array.from({ length: cols }, () => {
        const bg = Math.random() < 0.4;
        return { y: Math.random() * h * 1.6 - h, speed: bg ? Math.random() * 0.45 + 0.25 : Math.random() * 0.85 + 0.55,
          bright: bg ? Math.random() * 0.22 + 0.1 : Math.random() * 0.45 + 0.4, len: Math.floor(h / FS) + 12, chars: [], bg };
      });
      drops.forEach(d => { for (let i = 0; i < d.len; i++) d.chars[i] = GLYPHS[(Math.random() * GLYPHS.length) | 0]; });
    };

    /* pointer + ripples + burst */
    const ptr = { x: -9999, y: -9999, on: false }; const R = 120, PART = 26;
    const ripples = [];
    let burstT = -1e9;
    window.__v5Burst = () => { burstT = performance.now(); };
    const move = (e) => { const t = e.touches ? e.touches[0] : e; ptr.x = t.clientX; ptr.y = t.clientY; ptr.on = true; };
    const leave = () => { ptr.on = false; ptr.x = ptr.y = -9999; };
    const click = (e) => {
      const t = e.touches ? e.touches[0] : e;
      ripples.push({ x: t.clientX, y: t.clientY, t: performance.now() });
      if (ripples.length > 3) ripples.shift();
    };

    let raf, run = true;
    const draw = () => {
      if (!run) return;
      const now = performance.now();
      const w = innerWidth, h = innerHeight, C = palette();
      const bAge = (now - burstT) / 800;
      const burst = bAge < 1 ? (1 - bAge) * 2.2 : 0;
      while (ripples.length && now - ripples[0].t > 1150) ripples.shift();

      ctx.fillStyle = C.fade; ctx.fillRect(0, 0, w, h);
      ctx.font = `${FS}px "JetBrains Mono", monospace`; ctx.textAlign = 'center';
      const colW = w / cols;
      for (let x = 0; x < cols; x++) {
        const d = drops[x], cx = x * colW + colW / 2;
        const dxp = cx - ptr.x, near = ptr.on && Math.abs(dxp) < R;
        const cb = near ? (1 - Math.abs(dxp) / R) : 0;
        d.y += d.speed * (1 + cb * 1.6 + burst);
        if (d.y - d.len * FS > h && Math.random() > 0.965) d.y = -Math.random() * 260;
        for (let i = 0; i < d.len; i++) {
          const py = d.y - i * FS; if (py < -FS || py > h + FS) continue;
          if (Math.random() < 0.0025) d.chars[i] = GLYPHS[(Math.random() * GLYPHS.length) | 0];
          const fade = (1 - (i / d.len) * 0.9) * d.bright;
          let boost = 0, px = cx;
          if (near) {
            const dist = Math.hypot(dxp, py - ptr.y);
            if (dist < R) {
              const k = 1 - dist / R;
              boost = k;
              px = cx + Math.sign(dxp || 1) * k * k * PART;   /* rain parts around the cursor */
            }
          }
          for (let ri = 0; ri < ripples.length; ri++) {
            const rp = ripples[ri], age = (now - rp.t) / 1000;
            const rr = age * 540;
            if (Math.abs(cx - rp.x) > rr + 50) continue;
            const dist = Math.hypot(cx - rp.x, py - rp.y);
            const band = Math.abs(dist - rr);
            if (band < 50) boost = Math.max(boost, (1 - band / 50) * (1 - age / 1.15));
          }
          if (i === 0) {
            const a = Math.min(0.98, 0.8 + boost * 0.6 + burst * 0.06);
            ctx.fillStyle = boost > 0.25 ? `rgba(${C.spark},${a})` : `rgba(${C.head},${a})`;
            ctx.shadowColor = `rgba(${C.spark},${0.5 + boost * 0.5})`; ctx.shadowBlur = boost > 0.1 ? 12 + boost * 14 : 5;
          } else {
            const a = Math.min(0.95, fade * (0.72 + boost * 1.6));
            ctx.fillStyle = boost > 0.3 ? `rgba(${C.spark},${a})` : `rgba(${C.trail},${a})`;
            ctx.shadowBlur = boost > 0.4 ? 10 : 0; ctx.shadowColor = `rgba(${C.spark},0.6)`;
          }
          ctx.fillText(d.chars[i], px, py);
        }
      }
      ctx.shadowBlur = 0; raf = requestAnimationFrame(draw);
    };

    init();
    if (reduce) {
      /* static single frame at low alpha — presence without motion */
      ctx.globalAlpha = 0.5; const C = palette();
      ctx.font = `${FS}px "JetBrains Mono", monospace`; ctx.textAlign = 'center';
      const colW = innerWidth / cols;
      drops.forEach((d, x) => { for (let i = 0; i < d.len; i += 2) {
        const py = d.y - i * FS; if (py < 0 || py > innerHeight) continue;
        ctx.fillStyle = `rgba(${C.trail},${(1 - i / d.len) * d.bright * 0.8})`;
        ctx.fillText(d.chars[i], x * colW + colW / 2, py);
      } });
      ctx.globalAlpha = 1;
      return () => {};
    }
    draw();
    const onR = () => { dpr = Math.min(window.devicePixelRatio || 1, 2); init(); };
    const onV = () => { if (document.hidden) { run = false; cancelAnimationFrame(raf); } else if (!run) { run = true; draw(); } };
    addEventListener('resize', onR);
    addEventListener('mousemove', move, { passive: true });
    addEventListener('touchmove', move, { passive: true });
    addEventListener('mouseout', leave);
    addEventListener('mousedown', click);
    addEventListener('touchstart', click, { passive: true });
    document.addEventListener('visibilitychange', onV);
    return () => { run = false; cancelAnimationFrame(raf);
      removeEventListener('resize', onR); removeEventListener('mousemove', move);
      removeEventListener('touchmove', move); removeEventListener('mouseout', leave);
      removeEventListener('mousedown', click); removeEventListener('touchstart', click);
      document.removeEventListener('visibilitychange', onV); };
  }, []);
  return <canvas ref={ref} className="v5-rain" aria-hidden="true" />;
}
window.V5Rain = V5Rain;
