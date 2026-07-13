/* v4.0 chrome — MatrixRain (subtle), Header (sticky), Footer, Lucide icons */

function NTMatrixRain({ theme }) {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };
    const chars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ01';
    const fontSize = 16;
    let drops = [];
    const init = () => {
      const cols = Math.floor((canvas.width / fontSize) * 0.7);
      drops = Array.from({ length: cols }, () => {
        const bg = Math.random() < 0.45;
        return {
          y: Math.random() * canvas.height * 2 - canvas.height,
          speed: bg ? Math.random() * 0.3 + 0.15 : Math.random() * 0.5 + 0.4,
          chars: Array.from({ length: Math.floor(canvas.height / fontSize) + 15 },
            () => chars[Math.floor(Math.random() * chars.length)]),
          brightness: bg ? Math.random() * 0.25 + 0.1 : Math.random() * 0.4 + 0.35,
        };
      });
    };
    let rafId;
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      ctx.textAlign = 'center';
      for (let x = 0; x < drops.length; x++) {
        const d = drops[x];
        d.y += d.speed;
        if (d.y > canvas.height && Math.random() > 0.975) {
          d.y = -d.chars.length * fontSize - Math.random() * 300;
        }
        const len = d.chars.length;
        for (let i = 0; i < len; i++) {
          const py = d.y + i * fontSize;
          if (py < -fontSize || py > canvas.height + fontSize) continue;
          const fade = (1 - (i / len) * 0.85) * d.brightness;
          if (i >= len - 2) ctx.fillStyle = `rgba(200,255,200,${Math.min(fade*1.5,0.9)})`;
          else              ctx.fillStyle = `rgba(0,200,0,${fade*0.7})`;
          if (Math.random() < 0.002) d.chars[i] = chars[Math.floor(Math.random()*chars.length)];
          ctx.fillText(d.chars[i], x * (fontSize / 0.7) + fontSize / 2, py);
        }
      }
      rafId = requestAnimationFrame(draw);
    };
    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="nt-rain" aria-hidden="true" />;
}

const L = {
  // Lucide-style stroke icons
  github: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-1.93c-3.2.7-3.87-1.54-3.87-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.03 0 0 .96-.31 3.15 1.17.91-.25 1.89-.38 2.87-.38s1.96.13 2.87.38c2.18-1.48 3.15-1.17 3.15-1.17.62 1.58.23 2.74.11 3.03.73.8 1.18 1.82 1.18 3.07 0 4.42-2.69 5.38-5.25 5.67.42.36.78 1.05.78 2.12v3.14c0 .31.21.67.8.55C20.21 21.39 23.5 17.07 23.5 12c0-6.35-5.15-11.5-11.5-11.5z" /></svg>,
  linkedin: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>,
  mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>,
  sun: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>,
  moon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>,
  arrowRight: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  externalLink: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  terminal: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 11 2-2-2-2"/><path d="M11 13h4"/><rect x="3" y="3" width="18" height="18" rx="2"/></svg>,
  cpu: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></svg>,
  branch: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3v12"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>,
  zap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/></svg>,
  globe: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2c3 3.5 3 16.5 0 20M12 2c-3 3.5-3 16.5 0 20"/></svg>,
  code: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  bot: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4M8 16h.01M16 16h.01"/></svg>,
  database: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>,
  sparkles: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></svg>,
  star: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
};

function NTHeader({ active, onNavigate, theme, onToggleTheme }) {
  const items = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' }
  ];
  return (
    <header className="nt-header">
      <div className="nt-header__inner">
        <a className="nt-logo" href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
          <span className="gt">&gt;</span>tom_butler
        </a>
        <nav className="nt-nav">
          {items.map(item => (
            <a key={item.id} href="#"
              className={active === item.id ? 'is-active' : ''}
              onClick={(e) => { e.preventDefault(); onNavigate(item.id); }}>
              {item.label}
            </a>
          ))}
          <div className="nt-nav__side">
            <a className="nt-iconbtn" href="#" aria-label="GitHub" onClick={(e) => e.preventDefault()}>{L.github}</a>
            <a className="nt-iconbtn" href="#" aria-label="LinkedIn" onClick={(e) => e.preventDefault()}>{L.linkedin}</a>
            <button className="nt-iconbtn" onClick={onToggleTheme} aria-label="Toggle theme">
              {theme === 'circuit' ? L.moon : L.sun}
            </button>
          </div>
        </nav>
      </div>
      <div className="nt-header__rule" />
    </header>
  );
}

function NTFooter() {
  return (
    <footer className="nt-footer">
      <div className="nt-footer__rule" />
      <div className="nt-footer__inner" style={{ paddingTop: 20 }}>
        <p className="nt-footer__copy"><span className="gt">&gt;</span> © 2026 Tom Butler<span className="bar" /></p>
        <div className="nt-footer__links">
          <a href="#" aria-label="GitHub">{L.github}</a>
          <a href="#" aria-label="LinkedIn">{L.linkedin}</a>
          <a href="#" aria-label="Email">{L.mail}</a>
          <span style={{ opacity: 0.3 }}>|</span>
          <a href="#" style={{ fontSize: 10 }}>TimeTravel</a>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { NTMatrixRain, NTHeader, NTFooter, L });
