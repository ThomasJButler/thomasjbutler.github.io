/* Matrix rain canvas + Header + Footer */

function MatrixRain() {
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
          bg
        };
      });
    };
    let rafId;
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
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
          if (i >= len - 2) {
            ctx.fillStyle = `rgba(200, 255, 200, ${Math.min(fade * 1.5, 0.9)})`;
          } else {
            ctx.fillStyle = `rgba(0, 200, 0, ${fade * 0.7})`;
          }
          if (Math.random() < 0.002) {
            d.chars[i] = chars[Math.floor(Math.random() * chars.length)];
          }
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
  return <canvas ref={canvasRef} className="matrix-rain-canvas" aria-hidden="true" />;
}

function Header({ active, onNavigate }) {
  const items = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' }
  ];
  return (
    <header className="m-header">
      <div className="m-header__inner">
        <div className="m-brand-wrap" style={{display:'flex',alignItems:'center',gap:12}}>
          <a className="m-brand" href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
            <img src="../../assets/logo.svg" alt="TB" />
            <span className="m-brand__name">Thomas J Butler</span>
          </a>
          <span className="m-brand__social">
            <a href="#" aria-label="GitHub" onClick={(e) => e.preventDefault()}>{Icons.github}</a>
            <a href="#" aria-label="LinkedIn" onClick={(e) => e.preventDefault()}>{Icons.linkedin}</a>
          </span>
        </div>
        <nav className="m-nav">
          {items.map(item => (
            <a
              key={item.id}
              href="#"
              className={'m-nav__link' + (active === item.id ? ' is-active' : '')}
              onClick={(e) => { e.preventDefault(); onNavigate(item.id); }}
            >{item.label}</a>
          ))}
          <button className="m-theme-toggle">
            {Icons.moon}
            <span>Dark Mode</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="m-footer">
      <div className="m-footer__inner">
        <div className="m-footer__chips">
          <span style={{ marginRight: 8, opacity: 0.6 }}>// QUICK LINKS</span>
          <a className="m-chip" href="#">Commercial Work</a>
          <a className="m-chip" href="#">Contact</a>
          <a className="m-chip" href="#">Sitemap</a>
        </div>
        <div>© 2026 Thomas J Butler. All rights reserved.</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ opacity: 0.6, marginRight: 4 }}>// CONNECT</span>
          <a className="m-iconbtn" href="#">{Icons.github}</a>
          <a className="m-iconbtn" href="#">{Icons.linkedin}</a>
          <a className="m-iconbtn" href="#">{Icons.mail}</a>
        </div>
      </div>
    </footer>
  );
}

const Icons = {
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-1.93c-3.2.7-3.87-1.54-3.87-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.03 0 0 .96-.31 3.15 1.17.91-.25 1.89-.38 2.87-.38s1.96.13 2.87.38c2.18-1.48 3.15-1.17 3.15-1.17.62 1.58.23 2.74.11 3.03.73.8 1.18 1.82 1.18 3.07 0 4.42-2.69 5.38-5.25 5.67.42.36.78 1.05.78 2.12v3.14c0 .31.21.67.8.55C20.21 21.39 23.5 17.07 23.5 12c0-6.35-5.15-11.5-11.5-11.5z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
      <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
    </svg>
  ),
  moon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
    </svg>
  ),
  external: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="m12 1 3.09 6.26L22 8.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 13.14 2 8.27l6.91-1.01z" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
      <circle cx="12" cy="8" r="4" /><path d="M4 22c0-4 4-7 8-7s8 3 8 7" />
    </svg>
  ),
  cogs: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
      <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6 1.65 1.65 0 0 0 10 3.09V3a2 2 0 0 1 4 0v.09A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  images: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
      <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" />
    </svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
      <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  robot: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
      <rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4M8 16h.01M16 16h.01" />
    </svg>
  ),
  history: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
      <circle cx="12" cy="12" r="9" /><path d="M12 7v6h5" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
      <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2c3 3.5 3 16.5 0 20M12 2c-3 3.5-3 16.5 0 20" />
    </svg>
  )
};

Object.assign(window, { MatrixRain, Header, Footer, Icons });
