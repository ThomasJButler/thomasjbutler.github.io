/* v5site/home.jsx — operator hero + system status dashboard + NOW + newsletter */

function V5Home({ onNav }) {
  const skillsRef = React.useRef(null);
  const [lit, setLit] = React.useState(v5Reduce());
  React.useEffect(() => {
    if (v5Reduce()) return;
    const el = skillsRef.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setLit(true), 250); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <React.Fragment>
      <HeroOperator onNav={onNav} />

      <div className="nt-page v5-below" id="below">
        <div className="nt-container">
          <Reveal className="nt-eyebrow">
            <span className="v5-eyeicon">{V.terminal}</span>
            <span className="nt-eyebrow__label">system_status</span>
            <span className="nt-eyebrow__rule"></span>
            <span className="nt-eyebrow__status"><span className="dot"></span> online</span>
          </Reveal>

          <div className="nt-stats">
            {V4_STATS.map((s, i) => (
              <Reveal key={s.label} className="nt-card nt-stat" delay={i * 90}>
                <span className="nt-stat__icon">{V[s.icon]}</span>
                <div className="nt-stat__value">{s.value}</div>
                <div className="nt-stat__label">{s.label}</div>
              </Reveal>
            ))}
          </div>

          <div className="nt-dash">
            <Reveal className="nt-card" delay={60}>
              <div ref={skillsRef} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--primary)' }}>{V.cpu}<span className="nt-eyebrow__label">core_skills</span></div>
              {V4_SKILLS.map(sk => (
                <div key={sk.name} className="nt-skill">
                  <div className="nt-skill__head"><span>{sk.name}</span><span className="nt-skill__pct">{sk.pct}%</span></div>
                  <div className="nt-skill__bar"><div className="nt-skill__fill" style={{ width: lit ? sk.pct + '%' : '0%', transition: 'width 1.1s cubic-bezier(0.16,1,0.3,1)' }}></div></div>
                </div>
              ))}
            </Reveal>
            <Reveal className="nt-card" delay={140}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--primary)' }}>{V.gitbranch}<span className="nt-eyebrow__label">recent_activity</span></div>
              <div className="nt-activity">
                {V5S_ACTIVITY.map((a, i) => (
                  <div key={i} className="nt-activity__item">
                    <span className="nt-activity__icon">{V[a.icon]}</span>
                    <div>
                      <div className="nt-activity__text">{a.text}</div>
                      <div className="nt-activity__meta">
                        <span className={'nt-cat-badge ' + a.tagcls}>{a.tag}</span>
                        <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 11, color: 'var(--muted-foreground)' }}>{a.year}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal className="nt-now" delay={80}>
            <div className="v5-now__head">{V.sparkles}<span className="nt-eyebrow__label">now</span></div>
            <p className="v5-now__copy">{V5S_NOW}</p>
            <div className="nt-now__tags">
              {V5S_NOW_TAGS.map(([t, k]) => <span key={t} className={'nt-badge ' + (k ? 'nt-badge--' + k : 'nt-badge--outline')}>{t}</span>)}
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="nt-term" style={{ marginTop: 18 }}>
              <div className="nt-term__cmd">$ cat about.md</div>
              <div className="nt-term__cmd nt-term__cmd--inner" style={{ textAlign: 'left' }}>
                Ever since I watched <em style={{ color: 'var(--primary)', fontStyle: 'normal' }}>The Matrix</em> as a kid, I've been obsessed with building things on the web. This site is the sci-fi playground I always dreamed of, a space to experiment with AI, cyberpunk aesthetics, and creative code.
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, alignItems: 'center', margin: '22px 0 26px' }}>
              <button className="nt-btn nt-btn--ghost nt-btn--sm" onClick={() => onNav('about')}>More about me {V.arrowRight}</button>
              <a className="nt-btn nt-btn--ghost nt-btn--sm" href={V5S_LINKS.commercial} target="_blank" rel="noreferrer">Commercial portfolio {V.external}</a>
              <a className="nt-btn nt-btn--ghost nt-btn--sm" href={V5S_LINKS.github} target="_blank" rel="noreferrer">{V.github} GitHub</a>
              <button className="nt-btn nt-btn--ghost nt-btn--sm" onClick={() => onNav('updates')}>TimeTravel {V.history}</button>
            </div>
          </Reveal>

          <V5SNewsletter />
        </div>
      </div>
    </React.Fragment>
  );
}

window.V5Home = V5Home;
