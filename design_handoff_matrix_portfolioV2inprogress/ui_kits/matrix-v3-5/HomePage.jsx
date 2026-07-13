/* v3.5 HomePage — recreates the Matrix landing experience */

const TYPING_PHRASES = [
  'AI-powered apps',
  'production web apps',
  'intelligent agents',
  'creative solutions'
];

function useTyping() {
  const [text, setText] = React.useState('');
  const [idx, setIdx] = React.useState(0);
  const [del, setDel] = React.useState(false);
  React.useEffect(() => {
    const phrase = TYPING_PHRASES[idx];
    const speed = del ? 50 : 100;
    const pause = del ? 500 : 2000;
    if (!del && text === phrase) {
      const t = setTimeout(() => setDel(true), pause);
      return () => clearTimeout(t);
    }
    if (del && text === '') {
      setDel(false);
      setIdx((i) => (i + 1) % TYPING_PHRASES.length);
      return;
    }
    const t = setTimeout(() => {
      setText(del ? phrase.substring(0, text.length - 1) : phrase.substring(0, text.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [text, idx, del]);
  return text;
}

function MatrixHomePage({ onNavigate }) {
  const typing = useTyping();
  return (
    <>
      <section className="m-hero">
        <h1 className="m-hero__name">HEY, I&apos;M TOM</h1>
        <div className="m-hero__build">// I build</div>
        <div className="m-hero__typing">
          {typing}
          <span className="cursor"></span>
        </div>
        <p className="m-hero__sub">Full Stack AI Engineer from the UK</p>
      </section>

      <section className="m-showcase">
        <div className="m-showcase__tile">
          <div className="stack">
            <span className="glyph">▣</span>
            <h3>The Matrix Arcade</h3>
            <p>Retro arcade games</p>
          </div>
        </div>
        <div className="m-showcase__tile">
          <div className="stack">
            <span className="glyph">{Icons.user}</span>
            <h3>Personal</h3>
            <p>Portfolio + experiments</p>
          </div>
        </div>
        <div className="m-showcase__tile">
          <div className="stack">
            <span className="glyph">⬡</span>
            <h3>ModelViz</h3>
            <p>Compare leading AI models side by side</p>
            <button className="m-btn" style={{ padding: '6px 14px', marginTop: 6, fontSize: 10 }}>Enter Showcase</button>
          </div>
        </div>
      </section>

      <section className="m-featured">
        <h2 className="m-featured__title">{Icons.star} Featured Projects</h2>
        <div className="m-featured__grid">
          <article className="m-card">
            <div className="m-card__head">
              <div>
                <h3 className="m-card__title">The Matrix Arcade</h3>
                <p className="m-card__desc">Retro-style arcade games with a Matrix theme. Built with React, Vite, and Canvas API.</p>
              </div>
              <div className="m-card__links">
                <a className="m-iconbtn" href="#" aria-label="Live demo">{Icons.globe}</a>
                <a className="m-iconbtn" href="#" aria-label="GitHub">{Icons.github}</a>
              </div>
            </div>
          </article>
          <article className="m-card">
            <div className="m-card__head">
              <div>
                <h3 className="m-card__title">ModelViz</h3>
                <p className="m-card__desc">Compare AI models across providers with real-time metrics, cost analysis, and 3D visualisations.</p>
              </div>
              <div className="m-card__links">
                <a className="m-iconbtn" href="#" aria-label="Live demo">{Icons.globe}</a>
                <a className="m-iconbtn" href="#" aria-label="GitHub">{Icons.github}</a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <div className="m-divider" />

      <h2 className="m-section-h">Why I Built This Portfolio</h2>
      <section className="m-hub">
        <div className="m-hub__intro">
          <p>Ever since I watched The Matrix as a kid, I&apos;ve been obsessed with building things on the web. This site is the sci-fi inspired playground I always dreamed of creating.</p>
          <p>It&apos;s where I separate creative freedom from client work. I can crash things, try that new animation library everyone&apos;s talking about, and rebuild from scratch just because I can.</p>
          <p>Cyberpunk aesthetics, AI experiments, pushing boundaries. This is my space to geek out and have fun with code.</p>
        </div>
        <div>
          <div className="m-hub__section">
            <span className="m-hub__label">Explore</span>
            <div className="m-hub__grid">
              <a className="m-hub__btn" href="#" onClick={(e) => { e.preventDefault(); onNavigate('about'); }}>{Icons.user} About</a>
              <a className="m-hub__btn" href="#">{Icons.github} GitHub</a>
              <a className="m-hub__btn" href="#" onClick={(e) => { e.preventDefault(); onNavigate('projects'); }}>{Icons.images} Projects</a>
              <a className="m-hub__btn" href="#">{Icons.cogs} Services</a>
            </div>
          </div>
          <div className="m-hub__section">
            <span className="m-hub__label">Professional Work</span>
            <div className="m-hub__grid">
              <a className="m-hub__btn" href="#">{Icons.briefcase} Commercial</a>
              <a className="m-hub__btn" href="#">{Icons.robot} Agentic AI</a>
            </div>
          </div>
          <div className="m-hub__section">
            <span className="m-hub__label">Get in Touch</span>
            <div className="m-hub__contact-row">
              <a className="m-hub__btn" href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}>{Icons.mail} Contact Me</a>
              <a className="m-iconbtn" href="#">{Icons.linkedin}</a>
              <a className="m-iconbtn" href="#">{Icons.github}</a>
              <a className="m-iconbtn" href="#">{Icons.mail}</a>
            </div>
          </div>
        </div>
      </section>

      <section style={{ textAlign: 'center', padding: '20px 28px 60px', position: 'relative', zIndex: 2 }}>
        <p style={{ fontFamily: "'Share Tech Mono', monospace", color: 'var(--matrix-cyan)', fontSize: 14, marginBottom: 18 }}>
          Curious about the journey? Watch this portfolio evolve through time.
        </p>
        <a className="m-btn m-btn--cta" href="#">{Icons.history} TimeTravel {Icons.external}</a>
      </section>
    </>
  );
}

window.MatrixHomePage = MatrixHomePage;
