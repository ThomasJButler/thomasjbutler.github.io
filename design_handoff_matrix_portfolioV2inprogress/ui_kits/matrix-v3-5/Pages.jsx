/* v3.5 ProjectsPage — filtered grid */

const PROJECTS = [
  { id: 'sql-ball', name: 'SQL-Ball', category: 'ai',
    desc: 'RAG-powered NL-to-SQL using a custom collated dataset of European football results.',
    tags: ['LangChain', 'RAG', 'Postgres'] },
  { id: 'modelviz', name: 'ModelViz', category: 'ai',
    desc: 'Compare AI models across providers with real-time metrics, cost, and 3D visualisations.',
    tags: ['Multi-LLM', 'React', 'Three.js'] },
  { id: 'matrix-arcade', name: 'The Matrix Arcade', category: 'games',
    desc: 'A collection of games in the style of The Matrix movies. Canvas + GSAP.',
    tags: ['Canvas', 'React', 'GSAP'] },
  { id: 'morpheus', name: 'Morpheus', category: 'ai',
    desc: 'An intelligent document reasoning system with a Matrix-themed interface.',
    tags: ['RAG', 'LLM', 'Python'] },
  { id: 'agentic', name: 'Agentic AI Portfolio', category: 'ai',
    desc: 'Portfolio of web apps from the Generative AI & Agents Bootcamp.',
    tags: ['Agents', 'OpenAI', 'Next.js'] },
  { id: 'aetheris', name: 'Project Aetheris', category: 'creative',
    desc: 'Climate visualisations in Python — terminal text adventure of the world.',
    tags: ['Python', 'Climate', 'Data Viz'] },
  { id: 'oracle', name: 'Premier League Oracle', category: 'web',
    desc: 'Prediction tool for the Premier League — Python, Svelte, TypeScript, PostgreSQL.',
    tags: ['Svelte', 'PostgreSQL'] },
  { id: 'review-bot', name: 'ReviewBot Protocol', category: 'ai',
    desc: 'AI-powered code review system providing intelligent feedback on pull requests.',
    tags: ['AI', 'Code Quality'] },
  { id: 'bigbang', name: 'BigBang Gallery', category: 'creative',
    desc: 'A creative image gallery / canvas inspired by the big bang.',
    tags: ['Canvas', 'WebGL'] }
];

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI / ML' },
  { id: 'web', label: 'Web' },
  { id: 'games', label: 'Games' },
  { id: 'creative', label: 'Creative' }
];

function MatrixProjectsPage() {
  const [filter, setFilter] = React.useState('all');
  const list = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);
  return (
    <section className="m-projects">
      <div className="m-projects__intro">
        <h1>// PROJECTS</h1>
        <p>A collection of AI, web, and creative projects — built mostly in my spare time.</p>
      </div>

      <div className="m-projects__filters">
        {FILTERS.map(f => (
          <button
            key={f.id}
            className={'m-filter' + (filter === f.id ? ' is-active' : '')}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="m-projects__grid">
        {list.map(p => (
          <article key={p.id} className="m-project">
            <h3>{p.name}</h3>
            <p>{p.desc}</p>
            <div className="m-project__tags">
              {p.tags.map(t => <span key={t} className="m-tag">{t}</span>)}
            </div>
            <div className="m-project__footer">
              <a className="m-iconbtn" href="#" aria-label="Live demo">{Icons.globe}</a>
              <a className="m-iconbtn" href="#" aria-label="GitHub">{Icons.github}</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function MatrixContactPage() {
  const [sent, setSent] = React.useState(false);
  return (
    <section className="m-contact">
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <h1 style={{
          fontFamily: 'Orbitron', fontSize: 42, fontWeight: 700,
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: 'var(--matrix-cyan)',
          textShadow: '0 0 12px rgba(0,255,255,0.5), 0 0 30px rgba(0,255,0,0.3)',
          margin: '0 0 12px'
        }}>// CONTACT</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0 }}>
          Drop me a message. I read everything.
        </p>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
        <input className="m-input" placeholder="> your_name" />
        <input className="m-input" type="email" placeholder="> your_email@domain.com" />
        <input className="m-input" placeholder="> subject" />
        <textarea className="m-input" placeholder="> message..." />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
          <span style={{
            fontFamily: 'Share Tech Mono', fontSize: 12,
            color: sent ? 'var(--matrix-green)' : 'rgba(0,255,0,0.5)'
          }}>
            {sent ? '$ message_sent — i\'ll reply within 24h' : '$ awaiting_input'}
          </span>
          <button className="m-btn m-btn--cta" type="submit">Send Transmission</button>
        </div>
      </form>
    </section>
  );
}

function MatrixAboutPage() {
  return (
    <section className="m-projects">
      <div className="m-projects__intro">
        <h1>// ABOUT</h1>
        <p>Full Stack AI Engineer. Liverpool / Yorkshire. Obsessed with The Matrix since age 8.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, maxWidth: 1000, margin: '0 auto' }}>
        <article className="m-card">
          <h3 className="m-card__title">Why I love programming</h3>
          <p className="m-card__desc">
            Code is the closest thing we have to magic. I get to type words into a box and conjure entire systems. Apps that help people. Visual experiments that look impossible. AI that does things that felt sci-fi a year ago.
          </p>
        </article>
        <article className="m-card">
          <h3 className="m-card__title">What I&apos;m focused on</h3>
          <p className="m-card__desc">
            Building AI-integrated systems. Ethical AI models. Next.js / React front-ends that hold up in production. Anything that saves humans time and energy.
          </p>
        </article>
        <article className="m-card">
          <h3 className="m-card__title">Qualifications</h3>
          <p className="m-card__desc">
            AWS · Azure · Cisco · HubSpot certified. Level 4 Software Developer Apprenticeship (2023&ndash;24). Mastering Generative AI &amp; Agents (Sep 2025).
          </p>
        </article>
        <article className="m-card">
          <h3 className="m-card__title">Outside the terminal</h3>
          <p className="m-card__desc">
            Football (the European kind). Building dumb personal projects on weekends. Re-watching The Matrix every couple of years and finding new things to obsess over.
          </p>
        </article>
      </div>
    </section>
  );
}

function MatrixServicesPage() {
  const services = [
    { glyph: '⌬', title: 'AI Integration', desc: 'Custom models, LLM training, prompt engineering, performance testing.' },
    { glyph: '⚙', title: 'Automation', desc: 'n8n workflows, API integrations, MCP creation, custom AI models.' },
    { glyph: '▣', title: 'Front-end Craft', desc: 'GSAP animations, 3D transforms, Matrix effects, accessibility.' },
    { glyph: '◈', title: 'Full-Stack', desc: 'End-to-end React + TypeScript apps with .NET or Python back-ends.' }
  ];
  return (
    <section className="m-projects">
      <div className="m-projects__intro">
        <h1>// SERVICES</h1>
        <p>What I do — and what I can do for you or your team.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
        {services.map(s => (
          <article key={s.title} className="m-project">
            <div style={{
              fontFamily: 'Orbitron', fontSize: 40, color: 'var(--matrix-green)',
              textShadow: '0 0 16px rgba(0,255,0,0.7)', marginBottom: 4
            }}>{s.glyph}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { MatrixProjectsPage, MatrixContactPage, MatrixAboutPage, MatrixServicesPage });
