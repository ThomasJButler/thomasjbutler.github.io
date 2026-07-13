/* v4.0 HomePage — terminal hero + system status dashboard + cat about.md */

const NT_PHRASES = ['AI-powered apps', 'production web apps', 'intelligent agents', 'creative solutions'];

function useNTTyping() {
  const [text, setText] = React.useState('');
  const [idx, setIdx] = React.useState(0);
  const [del, setDel] = React.useState(false);
  React.useEffect(() => {
    const phrase = NT_PHRASES[idx];
    const speed = del ? 50 : 100;
    const pause = del ? 500 : 2000;
    if (!del && text === phrase) { const t = setTimeout(() => setDel(true), pause); return () => clearTimeout(t); }
    if (del && text === '') { setDel(false); setIdx((i) => (i + 1) % NT_PHRASES.length); return; }
    const t = setTimeout(() => {
      setText(del ? phrase.substring(0, text.length - 1) : phrase.substring(0, text.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [text, idx, del]);
  return text;
}

const NT_SKILLS = [
  { label: 'React / Next.js', value: 95 },
  { label: 'TypeScript', value: 90 },
  { label: 'Python / AI', value: 85 },
  { label: 'Node.js / APIs', value: 88 },
  { label: 'Cloud / DevOps', value: 75 }
];

const NT_STATS = [
  { icon: L.branch, label: 'PROJECTS', value: '15+' },
  { icon: L.cpu, label: 'AI MODELS', value: '7' },
  { icon: L.globe, label: 'DEPLOYMENTS', value: '20+' },
  { icon: L.zap, label: 'UPTIME', value: '99.9%' }
];

const NT_ACTIVITY = [
  { icon: L.bot, text: 'Built RAG pipeline with LangChain + Pinecone', time: '2025', badge: 'AI', variant: 'cyan' },
  { icon: L.code, text: 'Shipped ModelViz — AI model comparison platform', time: '2025', badge: 'Web', variant: 'secondary' },
  { icon: L.database, text: 'SQL Ball: NL-to-SQL football analytics', time: '2025', badge: 'Data', variant: 'cyan' },
  { icon: L.terminal, text: 'Portfolio redesign with ShadCN + Tailwind v4', time: '2025', badge: 'Dev', variant: 'secondary' }
];

function NTHomePage({ onNavigate }) {
  const typing = useNTTyping();
  return (
    <div className="nt-container">
      {/* Hero */}
      <section style={{ paddingTop: 48, paddingBottom: 8 }}>
        <div className="nt-term">
          <div className="nt-term__bar">
            <div className="nt-term__dots">
              <span className="nt-term__dot nt-term__dot--r" />
              <span className="nt-term__dot nt-term__dot--y" />
              <span className="nt-term__dot nt-term__dot--g" />
            </div>
            <span className="nt-term__path">tom@matrix ~ </span>
          </div>
          <div className="nt-term__body">
            <h1 className="nt-hero__title">Hey, I&apos;m Tom</h1>
            <div className="nt-hero__typing">
              <span className="pre">// I build </span>
              <span className="word">{typing}</span>
              <span className="cursor"></span>
            </div>
            <p className="nt-hero__sub">Full Stack AI Engineer from the UK</p>
            <div className="nt-hero__cta">
              <button className="nt-btn nt-btn--default nt-btn--lg" onClick={() => onNavigate('projects')}>
                View Projects {L.arrowRight}
              </button>
              <button className="nt-btn nt-btn--outline nt-btn--lg" onClick={() => onNavigate('contact')}>
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* System Status */}
      <section style={{ padding: '24px 0 8px' }}>
        <div className="nt-eyebrow">
          <span style={{ color: 'var(--primary)' }}>{L.terminal}</span>
          <span className="nt-eyebrow__label">system_status</span>
          <span className="nt-eyebrow__rule" />
          <span className="nt-eyebrow__status"><span className="dot" /> online</span>
        </div>

        <div className="nt-stats">
          {NT_STATS.map(s => (
            <div key={s.label} className="nt-card nt-card--small nt-stat">
              <span className="nt-stat__icon">{s.icon}</span>
              <div className="nt-stat__value">{s.value}</div>
              <div className="nt-stat__label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="nt-dash">
          <div className="nt-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ color: 'color-mix(in oklab, var(--primary) 60%, transparent)' }}>{L.cpu}</span>
              <span style={{
                fontFamily: 'Share Tech Mono', fontSize: 11,
                letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--foreground)'
              }}>core_skills</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {NT_SKILLS.map(s => (
                <div key={s.label} className="nt-skill">
                  <div className="nt-skill__head">
                    <span>{s.label}</span>
                    <span className="nt-skill__pct">{s.value}%</span>
                  </div>
                  <div className="nt-skill__bar">
                    <div className="nt-skill__fill" style={{ width: s.value + '%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="nt-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ color: 'color-mix(in oklab, var(--primary) 60%, transparent)' }}>{L.branch}</span>
              <span style={{
                fontFamily: 'Share Tech Mono', fontSize: 11,
                letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--foreground)'
              }}>recent_activity</span>
            </div>
            <div className="nt-activity">
              {NT_ACTIVITY.map((a, i) => (
                <div key={i} className="nt-activity__item">
                  <span className="nt-activity__icon">{a.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div className="nt-activity__text">{a.text}</div>
                    <div className="nt-activity__meta">
                      <span className={`nt-badge nt-badge--${a.variant}`}>{a.badge}</span>
                      <span style={{ fontFamily: 'Share Tech Mono', fontSize: 10, color: 'var(--muted-foreground)' }}>{a.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="nt-rule" />

      {/* Now */}
      <section>
        <div className="nt-now">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ color: 'var(--primary)' }}>{L.sparkles}</span>
            <span style={{
              fontFamily: 'Share Tech Mono', fontSize: 11, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'color-mix(in oklab, var(--primary) 70%, transparent)'
            }}>now</span>
          </div>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: 'color-mix(in oklab, var(--foreground) 85%, transparent)' }}>
            Building AI-powered applications and exploring agentic workflows. Currently focused on RAG systems, LangChain integrations, and pushing the boundaries of what&apos;s possible with modern web tech.
          </p>
          <div className="nt-now__tags">
            <span className="nt-badge nt-badge--cyan">LangChain</span>
            <span className="nt-badge nt-badge--cyan">RAG</span>
            <span className="nt-badge nt-badge--amber">Agents</span>
            <span className="nt-badge nt-badge--secondary">ShadCN</span>
          </div>
        </div>
      </section>

      <div className="nt-rule" />

      {/* About — terminal cat */}
      <section>
        <div className="nt-term">
          <div className="nt-term__cmd">$ cat about.md</div>
          <div className="nt-term__cmd--inner">
            Ever since I watched The Matrix as a kid, I&apos;ve been obsessed with building things on the web. This site is the sci-fi playground I always dreamed of — a space to experiment with AI, cyberpunk aesthetics, and creative code.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}>
          <button className="nt-btn nt-btn--ghost nt-btn--sm" onClick={() => onNavigate('about')}>
            More about me {L.arrowRight}
          </button>
          <a className="nt-btn nt-btn--ghost nt-btn--sm" href="#">Commercial portfolio {L.externalLink}</a>
          <a className="nt-btn nt-btn--ghost nt-btn--sm" href="#">{L.github} GitHub</a>
          <a className="nt-btn nt-btn--ghost nt-btn--sm" href="#">TimeTravel {L.externalLink}</a>
        </div>
      </section>
    </div>
  );
}

window.NTHomePage = NTHomePage;
