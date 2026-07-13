/* v5/fx.jsx — decode text, typed phrases, scroll reveal, custom terminal cursor */

const V5_SCRAMBLE = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱ01<>*+=:';
const v5Reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* per-character decode: wavefront sweeps L→R, chars scramble then lock */
function DecodeChars({ text, delay = 0, step = 42, window: WIN = 320, onDone, className }) {
  const chars = React.useMemo(() => [...text], [text]);
  const [tick, setTick] = React.useState(0);
  const t0 = React.useRef(null);
  const doneRef = React.useRef(false);
  const reduce = v5Reduce();

  React.useEffect(() => {
    if (reduce) { if (onDone) onDone(); return; }
    t0.current = performance.now() + delay;
    doneRef.current = false;
    let raf;
    const loop = () => {
      setTick(t => t + 1);
      const end = t0.current + chars.length * step + WIN;
      if (performance.now() < end) raf = requestAnimationFrame(loop);
      else if (!doneRef.current) { doneRef.current = true; setTick(t => t + 1); if (onDone) onDone(); }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [text]); // eslint-disable-line

  if (reduce) return <span className={className}>{text}</span>;
  const now = performance.now();
  const renderChar = (c, i) => {
    const start = (t0.current || now) + i * step;
    const lock = start + WIN;
    let cls = 'ch', out = c;
    if (now < start) { cls += ' ch--pend'; out = '\u00A0'; }
    else if (now < lock) { cls += ' ch--scr'; out = V5_SCRAMBLE[(Math.random() * V5_SCRAMBLE.length) | 0]; }
    else cls += ' ch--done';
    return <span key={i} className={cls}>{out}</span>;
  };
  /* group into word spans so lines only break at spaces, never mid-word */
  const words = []; let cur = [];
  chars.forEach((c, i) => { if (c === ' ') { words.push(cur); cur = []; } else cur.push([c, i]); });
  words.push(cur);
  return (
    <span className={className} aria-label={text}>
      {words.map((w, wi) => (
        <React.Fragment key={wi}>
          {wi > 0 && ' '}
          <span className="ch-word">{w.map(([c, i]) => renderChar(c, i))}</span>
        </React.Fragment>
      ))}
    </span>
  );
}

/* rotating typed phrases with block cursor */
function useV5Typed(phrases, { type = 70, del = 40, hold = 2200 } = {}) {
  const [d, setD] = React.useState(v5Reduce() ? phrases[0] : '');
  const [i, setI] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);
  React.useEffect(() => {
    if (v5Reduce()) return;
    const p = phrases[i];
    if (!deleting && d === p) { const t = setTimeout(() => setDeleting(true), hold); return () => clearTimeout(t); }
    if (deleting && d === '') { setDeleting(false); setI(x => (x + 1) % phrases.length); return; }
    const nx = deleting ? p.slice(0, d.length - 1) : p.slice(0, d.length + 1);
    const t = setTimeout(() => setD(nx), deleting ? del : type + Math.random() * 40);
    return () => clearTimeout(t);
  }, [d, i, deleting]); // eslint-disable-line
  return d;
}

/* scroll reveal — sections materialise on entry */
function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const ref = React.useRef(null);
  const [inView, setIn] = React.useState(v5Reduce());
  React.useEffect(() => {
    if (v5Reduce()) return;
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setIn(true); io.disconnect(); } },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`v5-reveal ${inView ? 'is-in' : ''} ${className}`} style={{ transitionDelay: delay + 'ms' }}>{children}</Tag>;
}

/* custom terminal cursor — caret block + square ring */
function TermCursor() {
  const dot = React.useRef(null), ring = React.useRef(null);
  React.useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    document.body.classList.add('v5-cursor');
    const D = dot.current, G = ring.current;
    let x = -100, y = -100, rx = -100, ry = -100, seen = false, raf;
    const move = (e) => {
      x = e.clientX; y = e.clientY;
      if (!seen) { seen = true; rx = x; ry = y; D.style.opacity = 1; G.style.opacity = 1; }
      D.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
      const it = e.target.closest && e.target.closest('a, button, [data-cursor], input, textarea, [role="button"]');
      G.classList.toggle('is-hover', !!it);
    };
    const down = () => G.classList.add('is-down');
    const up = () => G.classList.remove('is-down');
    const loop = () => {
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
      G.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener('mousemove', move, { passive: true });
    addEventListener('mousedown', down); addEventListener('mouseup', up);
    raf = requestAnimationFrame(loop);
    return () => { document.body.classList.remove('v5-cursor');
      removeEventListener('mousemove', move); removeEventListener('mousedown', down);
      removeEventListener('mouseup', up); cancelAnimationFrame(raf); };
  }, []);
  return (
    <React.Fragment>
      <div ref={ring} className="v5-cur-ring" aria-hidden="true"></div>
      <div ref={dot} className="v5-cur-dot" aria-hidden="true"></div>
    </React.Fragment>
  );
}

/* smooth scroll helper (no scrollIntoView) */
function v5ScrollTo(sel) {
  const el = document.querySelector(sel); if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 64;
  window.scrollTo({ top, behavior: v5Reduce() ? 'instant' : 'smooth' });
}

/* tiny inline icon set (lucide paths, 24×24, stroke) */
const v5i = (d, extra) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}{extra || null}</svg>
);
const V5I = {
  arrowRight: v5i(<path d="M5 12h14M12 5l7 7-7 7" />),
  terminal: v5i(<path d="m4 17 6-6-6-6M12 19h8" />),
  cpu: v5i(<React.Fragment><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" /></React.Fragment>),
  globe: v5i(<React.Fragment><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></React.Fragment>),
  zap: v5i(<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />),
  gitbranch: v5i(<React.Fragment><line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" /></React.Fragment>),
  sparkles: v5i(<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" />),
  mail: v5i(<React.Fragment><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></React.Fragment>),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.04.77 2.1v3.11c0 .3.2.67.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"/></svg>
  ),
};

Object.assign(window, { DecodeChars, useV5Typed, Reveal, TermCursor, v5ScrollTo, V5I, v5Reduce });
