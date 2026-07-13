/* v5site/pages-a.jsx — V5Projects (featured covers) + V5Services (local AI lead + WHY_LOCAL_AI) */

/* ── projects ── */
function V5SCard({ p, featured, delay }) {
  const c = V4_CATS[p.cat];
  return (
    <Reveal className={'nt-card nt-project ' + c.acc + (featured ? ' nt-card--featured' : '')} delay={delay || 0}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
        <h3 className="nt-card__title">{p.title}</h3>
        {featured && <span style={{ color: 'var(--muted-foreground)', width: 13, height: 13 }}>{V.star}</span>}
      </div>
      <p className="nt-card__desc">{p.blurb}</p>
      <div className="nt-project-tags">{p.tags.map(t => <span key={t} className="nt-ttag">{t}</span>)}</div>
      <div className="nt-card__footer" style={{ justifyContent: 'space-between' }}>
        <span className="nt-meta-line"><span className={'dot ' + p.ld}></span>{p.lang}<span className={'nt-cat-badge ' + c.badge}>{c.label}</span></span>
        <div className="nt-project__links">
          {p.live && <a className="nt-btn nt-btn--outline nt-btn--xs">{V.external} Live</a>}
          {p.repo && <a className="nt-btn nt-btn--ghost nt-btn--xs">{V.github} Code</a>}
        </div>
      </div>
    </Reveal>
  );
}

function V5SFeatCard({ p, delay }) {
  const c = V4_CATS[p.cat];
  const cover = V5S_COVERS[p.id];
  return (
    <Reveal className={'nt-card nt-project nt-featcard ' + c.acc + ' nt-card--featured'} delay={delay || 0}>
      {cover
        ? <div className="nt-featcard__img"><img src={V5S_COVER_BASE + cover} alt={p.title + ' preview'} loading="lazy" /></div>
        : <div className="nt-featcard__img nt-featcard__img--gen" aria-hidden="true">
            <span className="gi">{p.title[0]}</span>
            <span className="gt2">&gt; {p.id} — cover incoming</span>
          </div>}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
        <h3 className="nt-card__title">{p.title}</h3>
        <span style={{ color: 'oklch(0.75 0.15 75)', width: 13, height: 13, flexShrink: 0 }}>{V.star}</span>
      </div>
      <p className="nt-card__desc">{p.blurb}</p>
      <div className="nt-project-tags">{p.tags.map(t => <span key={t} className="nt-ttag">{t}</span>)}</div>
      <div className="nt-card__footer" style={{ justifyContent: 'space-between' }}>
        <span className="nt-meta-line"><span className={'dot ' + p.ld}></span>{p.lang}<span className={'nt-cat-badge ' + c.badge}>{c.label}</span></span>
        <div className="nt-project__links">
          {p.live && <a className="nt-btn nt-btn--outline nt-btn--xs">{V.external} Live</a>}
          {p.repo && <a className="nt-btn nt-btn--ghost nt-btn--xs">{V.github} Code</a>}
        </div>
      </div>
    </Reveal>
  );
}

function V5Projects() {
  const [filter, setFilter] = React.useState('all');
  const counts = React.useMemo(() => {
    const m = { all: V4_PROJECTS.length };
    V4_PROJECTS.forEach(p => { m[p.cat] = (m[p.cat] || 0) + 1; });
    return m;
  }, []);
  const featured = V4_PROJECTS.filter(p => p.featured);
  const list = filter === 'all' ? V4_PROJECTS : V4_PROJECTS.filter(p => p.cat === filter);

  return (
    <div className="nt-page">
      <div className="nt-container">
        <div className="nt-page-head">
          <span className="lbl" style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 11, letterSpacing: '0.2em', color: 'color-mix(in oklab, var(--primary) 70%, transparent)', display: 'block', marginBottom: 10 }}>
            <DecodeChars text="// projects" step={20} />
          </span>
          <h1>Projects</h1>
          <p>A collection of AI, web, and creative projects.</p>
        </div>

        <section className="nt-sec" style={{ paddingTop: 8 }}>
          <div className="nt-eyebrow">
            <span style={{ color: 'oklch(0.75 0.15 75)', width: 14, height: 14 }}>{V.star}</span>
            <span className="nt-eyebrow__label">featured</span>
            <span className="nt-eyebrow__rule"></span>
          </div>
          <div className="nt-featured-grid nt-featured-grid--v5">
            {featured.map((p, i) => <V5SFeatCard key={p.id} p={p} delay={(i % 3) * 90} />)}
          </div>
        </section>

        <section className="nt-sec" style={{ paddingTop: 8 }}>
          <div className="nt-eyebrow">
            <span style={{ color: 'color-mix(in oklab, var(--primary) 70%, transparent)', width: 14, height: 14 }}>{V.terminal}</span>
            <span className="nt-eyebrow__label">all_projects</span>
            <span className="nt-eyebrow__rule"></span>
          </div>
          <div className="nt-tabs">
            {V4_FILTERS.map(f => (
              <button key={f.id} className={'nt-tab' + (filter === f.id ? ' is-active' : '')} onClick={() => setFilter(f.id)}>
                {f.label}<span className="count">{counts[f.id] || 0}</span>
              </button>
            ))}
          </div>
          <div className="nt-projects-grid" key={filter}>
            {list.map((p, i) => <V5SCard key={p.id} p={p} delay={(i % 3) * 70} />)}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ── services ── */
function V5Services({ onNav }) {
  const [open, setOpen] = React.useState(0);
  return (
    <div className="nt-page">
      <div className="nt-container">
        <section className="nt-sec">
          <div className="nt-head-block">
            <span className="lbl"><DecodeChars text="// services" step={20} /></span>
            <h1 className="nt-section-title">What I Build</h1>
          </div>
          <p className="nt-section-sub">{V5S_SERVICES_INTRO}</p>
        </section>

        <section className="nt-sec" style={{ paddingTop: 0 }}>
          <div className="nt-eyebrow"><span className="nt-eyebrow__label">services</span><span className="nt-eyebrow__rule"></span></div>
          <div className="nt-svc-grid">
            {V5S_SERVICES.map((s, i) => (
              <Reveal key={s.title} className={'nt-card' + (s.lead ? ' nt-svc-lead' : '')} delay={(i % 2) * 80}>
                {s.lead && <span className="nt-svc-lead__flag">local_first</span>}
                <h3 className="nt-svc__title"><span className="si">{V[s.icon]}</span>{s.title}</h3>
                <p className="nt-card__desc" style={{ fontSize: 13.5 }}>{s.body}</p>
                <ul className="nt-svc__feats">{s.feats.map(f => <li key={f}>{f}</li>)}</ul>
                <div className="nt-svc__tags">{s.tags.map(t => <span key={t} className="nt-ttag">{t}</span>)}</div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="nt-rule"></div>

        <section className="nt-sec" style={{ paddingTop: 10 }}>
          <div className="nt-head-block">
            <span className="lbl"><DecodeChars text="// why_local_ai" step={20} /></span>
            <h2 className="nt-section-title" style={{ fontSize: 26 }}>Why Local AI</h2>
          </div>
          <Reveal className="nt-prose">
            {V5S_WHY.map((t, i) => <p key={i}>{t}</p>)}
          </Reveal>
          <div className="nt-stats nt-stats--3" style={{ marginTop: 22 }}>
            {V5S_WHY_STATS.map((s, i) => (
              <Reveal key={s.label} className="nt-card nt-stat" delay={i * 90}>
                <div className="nt-stat__value">{s.value}</div>
                <div className="nt-stat__label">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="nt-rule"></div>

        <section className="nt-sec">
          <div className="nt-eyebrow">
            <span style={{ color: 'color-mix(in oklab, var(--primary) 70%, transparent)', width: 14, height: 14 }}>{V.graduation}</span>
            <span className="nt-eyebrow__label">credentials</span><span className="nt-eyebrow__rule"></span>
          </div>
          <div className="nt-acc">
            {V4_CREDS.map((grp, gi) => (
              <div key={grp.group} className={'nt-acc__row' + (open === gi ? ' open' : '')}>
                <button className="nt-acc__head" onClick={() => setOpen(open === gi ? -1 : gi)}>
                  {grp.group}<span className="chev">{V.chevron}</span>
                </button>
                <div className="nt-acc__body">
                  <div className="nt-acc__grid">
                    {grp.items.map(it => (
                      <div key={it.t} className="nt-cred">
                        <span className="ci">{V[it.icon]}</span>
                        <div><h5>{it.t}</h5><p>{it.s}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Reveal className="nt-cta">
          <h2>Let's Build Something Great</h2>
          <p>Free consultation. No obligation. Let's discuss your project.</p>
          <div className="nt-cta__btns">
            <button className="nt-btn nt-btn--default nt-btn--lg" onClick={() => onNav('contact')}>Get in Touch {V.arrowRight}</button>
            <a className="nt-btn nt-btn--outline nt-btn--lg" href={'mailto:' + V5S_LINKS.email}>{V.mail} Email Directly</a>
          </div>
        </Reveal>

        <div style={{ marginTop: 26 }}><V5SNewsletter /></div>
      </div>
    </div>
  );
}

Object.assign(window, { V5Projects, V5Services });
