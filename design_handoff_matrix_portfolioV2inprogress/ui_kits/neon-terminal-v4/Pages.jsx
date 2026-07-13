/* v4.0 — Projects / About / Services / Contact pages */

const NT_PROJECTS = [
  { id: 'sql-ball', name: 'SQL-Ball', category: 'ai', featured: true,
    desc: 'RAG-powered NL-to-SQL using a custom collated dataset of European football results.',
    topics: ['LangChain', 'RAG'], language: 'TypeScript', lc: '#3178c6' },
  { id: 'modelviz', name: 'ModelViz', category: 'ai', featured: true,
    desc: 'Compare AI models across providers with real-time metrics, cost, and 3D visualisations.',
    topics: ['Multi-LLM', 'React'], language: 'TypeScript', lc: '#3178c6' },
  { id: 'matrix-arcade', name: 'The Matrix Arcade', category: 'creative', featured: true,
    desc: 'A collection of games in the style of The Matrix movies. Canvas + GSAP.',
    topics: ['Canvas', 'GSAP'], language: 'JavaScript', lc: '#f1e05a' },
  { id: 'morpheus', name: 'Morpheus', category: 'ai',
    desc: 'An intelligent document reasoning system with a Matrix-themed interface.',
    topics: ['LLM', 'Python'], language: 'Python', lc: '#3572A5' },
  { id: 'agentic', name: 'Agentic AI Portfolio', category: 'ai',
    desc: 'Portfolio of web apps from the Generative AI & Agents Bootcamp.',
    topics: ['Agents', 'Next.js'], language: 'TypeScript', lc: '#3178c6' },
  { id: 'oracle', name: 'Premier League Oracle', category: 'web',
    desc: 'Prediction tool for the Premier League — Python, Svelte, TypeScript, PostgreSQL.',
    topics: ['Svelte', 'PostgreSQL'], language: 'TypeScript', lc: '#3178c6' },
  { id: 'bigbang', name: 'BigBang Gallery', category: 'creative',
    desc: 'Image gallery / canvas inspired by the big bang.',
    topics: ['Canvas', 'WebGL'], language: 'JavaScript', lc: '#f1e05a' },
  { id: 'newsperspective', name: 'NewsPerspective', category: 'web',
    desc: 'FastAPI + Next.js app rewriting headlines for balanced perspective.',
    topics: ['FastAPI', 'OpenAI'], language: 'Python', lc: '#3572A5' },
  { id: 'reviewbot', name: 'ReviewBot Protocol', category: 'ai',
    desc: 'AI-powered code review system providing intelligent feedback on PRs.',
    topics: ['AI', 'Reviews'], language: 'Python', lc: '#3572A5' }
];

const NT_CATS = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'web', label: 'Web' },
  { id: 'creative', label: 'Creative' }
];

const NT_CAT_VARIANT = { ai: 'cyan', web: 'secondary', creative: 'amber', personal: 'secondary' };
const NT_CAT_LABEL   = { ai: 'AI & ML', web: 'Web', creative: 'Creative', personal: 'Personal' };
const NT_CAT_ACCENT  = { ai: 'cyan', web: 'matrix', creative: 'amber', personal: 'personal' };

function NTProjectsPage() {
  const [cat, setCat] = React.useState('all');
  const filtered = cat === 'all' ? NT_PROJECTS : NT_PROJECTS.filter(p => p.category === cat);
  const featured = NT_PROJECTS.filter(p => p.featured);

  return (
    <div className="nt-container">
      <div className="nt-page-head">
        <h1>Projects</h1>
        <p>A collection of AI, web, and creative projects.</p>
      </div>

      {cat === 'all' && (
        <section style={{ marginTop: 20 }}>
          <div className="nt-eyebrow">
            <span style={{ color: 'oklch(0.80 0.15 85)' }}>{L.star}</span>
            <span className="nt-eyebrow__label">featured</span>
            <span className="nt-eyebrow__rule" />
          </div>
          <div className="nt-projects-grid">
            {featured.map(p => (
              <article key={p.id} className={`nt-card nt-card--featured nt-card--accent-${NT_CAT_ACCENT[p.category]}`}>
                <h3 className="nt-card__title">{p.name}</h3>
                <p className="nt-card__desc">{p.desc}</p>
                <div className="nt-project-tags">
                  {p.topics.map(t => <span key={t} className="nt-badge nt-badge--secondary">{t}</span>)}
                </div>
                <div className="nt-card__footer">
                  <a className="nt-btn nt-btn--ghost nt-btn--xs" href="#">{L.externalLink} Live</a>
                  <a className="nt-btn nt-btn--ghost nt-btn--xs" href="#">{L.github} Code</a>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <div style={{ marginTop: 30 }}>
        <div className="nt-eyebrow">
          <span style={{ color: 'var(--primary)' }}>{L.terminal}</span>
          <span className="nt-eyebrow__label">all_projects</span>
          <span className="nt-eyebrow__rule" />
        </div>
        <div className="nt-tabs">
          {NT_CATS.map(c => {
            const count = c.id === 'all' ? NT_PROJECTS.length : NT_PROJECTS.filter(p => p.category === c.id).length;
            return (
              <button key={c.id} className={'nt-tab' + (cat === c.id ? ' is-active' : '')}
                onClick={() => setCat(c.id)}>
                {c.label}<span className="count">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="nt-projects-grid">
        {filtered.map(p => (
          <article key={p.id} className={`nt-card nt-card--accent-${NT_CAT_ACCENT[p.category]}`}>
            <h3 className="nt-card__title" style={{ fontSize: 13 }}>{p.name}</h3>
            <p className="nt-card__desc" style={{
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
            }}>{p.desc}</p>
            <div className="nt-project-tags">
              {p.topics.map(t => <span key={t} className="nt-badge nt-badge--secondary">{t}</span>)}
            </div>
            <div className="nt-project-meta">
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="dot" style={{ background: p.lc }} />
                {p.language}
              </span>
              <span className={`nt-badge nt-badge--${NT_CAT_VARIANT[p.category]}`}>{NT_CAT_LABEL[p.category]}</span>
            </div>
            <div className="nt-card__footer">
              <a className="nt-btn nt-btn--ghost nt-btn--xs" href="#">{L.externalLink} Live</a>
              <a className="nt-btn nt-btn--ghost nt-btn--xs" href="#">{L.github} Code</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function NTAboutPage() {
  return (
    <div className="nt-container">
      <div className="nt-page-head">
        <h1>About</h1>
        <p>Full Stack AI Engineer. Liverpool / Yorkshire. Obsessed with The Matrix since age 8.</p>
      </div>
      <div className="nt-term" style={{ marginTop: 12 }}>
        <div className="nt-term__cmd">$ whoami</div>
        <div className="nt-term__cmd--inner">
          I&apos;m Tom — a UK-based Full Stack AI Engineer. I build human-oriented applications that feel natural and joyful to use, with a focus on AI integration, RAG systems, and modern React front-ends.
        </div>
      </div>

      <div className="nt-about-grid">
        <article className="nt-card">
          <h3 className="nt-card__title">Why I love programming</h3>
          <p className="nt-card__desc">Code is the closest thing we have to magic. I get to type words into a box and conjure entire systems — apps that help people, visual experiments, AI that does things that felt sci-fi a year ago.</p>
        </article>
        <article className="nt-card">
          <h3 className="nt-card__title">What I&apos;m focused on</h3>
          <p className="nt-card__desc">Building AI-integrated systems. Ethical AI. Next.js / React front-ends that hold up in production. Anything that saves humans time and energy.</p>
        </article>
        <article className="nt-card">
          <h3 className="nt-card__title">Qualifications</h3>
          <p className="nt-card__desc">AWS · Azure · Cisco · HubSpot certified. Level 4 Software Developer Apprenticeship (2023–24). Mastering Generative AI &amp; Agents (Sep 2025).</p>
        </article>
        <article className="nt-card">
          <h3 className="nt-card__title">Outside the terminal</h3>
          <p className="nt-card__desc">Football (the European kind). Building dumb personal projects on weekends. Re-watching The Matrix every couple of years and finding new things to obsess over.</p>
        </article>
      </div>
    </div>
  );
}

function NTServicesPage() {
  const services = [
    { icon: L.cpu, title: 'AI Integration', desc: 'Custom models, LLM training, prompt engineering, evals.' },
    { icon: L.zap, title: 'Automation', desc: 'n8n workflows, API integrations, MCP creation.' },
    { icon: L.sparkles, title: 'Front-end Craft', desc: 'Production-ready React + TypeScript with motion.' },
    { icon: L.code, title: 'Full-Stack', desc: 'End-to-end apps with .NET / Python back-ends.' }
  ];
  return (
    <div className="nt-container">
      <div className="nt-page-head">
        <h1>Services</h1>
        <p>What I do — and what I can do for you or your team.</p>
      </div>
      <div className="nt-eyebrow">
        <span style={{ color: 'var(--primary)' }}>{L.terminal}</span>
        <span className="nt-eyebrow__label">offerings</span>
        <span className="nt-eyebrow__rule" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
        {services.map(s => (
          <article key={s.title} className="nt-card">
            <div style={{ color: 'var(--primary)', marginBottom: 4 }}>{s.icon}</div>
            <h3 className="nt-card__title">{s.title}</h3>
            <p className="nt-card__desc">{s.desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function NTContactPage() {
  const [sent, setSent] = React.useState(false);
  return (
    <div className="nt-container">
      <div className="nt-page-head">
        <h1>Contact</h1>
        <p>Drop me a message. I read everything.</p>
      </div>
      <div className="nt-contact">
        <div className="nt-term" style={{ marginBottom: 18 }}>
          <div className="nt-term__cmd">$ ./compose_message</div>
          <div style={{ padding: 18 }}>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="nt-field">
                  <label className="nt-label">Name</label>
                  <input className="nt-input" placeholder="Your name" />
                </div>
                <div className="nt-field">
                  <label className="nt-label">Email</label>
                  <input className="nt-input" type="email" placeholder="you@domain.com" />
                </div>
              </div>
              <div className="nt-field">
                <label className="nt-label">Subject</label>
                <input className="nt-input" placeholder="Project enquiry" />
              </div>
              <div className="nt-field">
                <label className="nt-label">Message</label>
                <textarea className="nt-textarea" placeholder="Tell me about your project..." />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  fontFamily: 'Share Tech Mono', fontSize: 11,
                  color: sent ? 'var(--primary)' : 'var(--muted-foreground)'
                }}>
                  {sent ? '$ sent — i\'ll reply within 24h' : '$ awaiting_input'}
                </span>
                <button type="submit" className="nt-btn nt-btn--default nt-btn--lg">
                  Send Message {L.arrowRight}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { NTProjectsPage, NTAboutPage, NTServicesPage, NTContactPage });
