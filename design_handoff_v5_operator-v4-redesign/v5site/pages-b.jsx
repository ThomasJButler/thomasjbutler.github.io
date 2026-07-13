/* v5site/pages-b.jsx — V5About + V5Contact + V5Updates */

const V5S_PASSION = [
  "Programming is not just a profession for me, it's a passion. There's something magical about transforming ideas into reality through code. The ability to create something from nothing, to build tools that solve real problems, and to see the immediate impact of your work is incredibly satisfying. Every project is a blank canvas, and the only limit is imagination and determination.",
  "What truly captivates me is the puzzle-solving aspect of development. Each challenge is an opportunity to think critically, to break down complex problems into elegant solutions. The moment when everything clicks into place, when the code finally works after hours of debugging, is pure joy. It's like solving a thousand puzzles at once, each one teaching you something new.",
  "The technology landscape never stops evolving, and that's what keeps me energised. There's always a new framework to explore, a better pattern to learn, or an innovative approach to discover. This constant growth and the vibrant community of developers sharing knowledge makes programming an endless journey of learning and improvement.",
];

function V5About({ onNav }) {
  const [tab, setTab] = React.useState('Frontend');
  const tabs = Object.keys(V4_TECH);
  return (
    <div className="nt-page">
      <div className="nt-container">
        <section className="nt-sec">
          <div className="nt-head-block">
            <span className="lbl"><DecodeChars text="// about" step={20} /></span>
            <h1 className="nt-section-title">Why I Love Programming</h1>
          </div>
          <Reveal className="nt-prose">{V5S_PASSION.map((t, i) => <p key={i}>{t}</p>)}</Reveal>

          <Reveal className="nt-now" delay={80}>
            <div className="v5-now__head">{V.cpu}<span className="nt-eyebrow__label">current_focus</span></div>
            <p className="v5-now__copy">{V5S_ABOUT_LOCAL}</p>
            <div className="nt-now__tags">
              {[['Ollama', 'cyan'], ['Private RAG', 'cyan'], ['Odysseus', ''], ['Sanctuary', 'amber']].map(([t, k]) =>
                <span key={t} className={'nt-badge ' + (k ? 'nt-badge--' + k : 'nt-badge--outline')}>{t}</span>)}
            </div>
          </Reveal>
        </section>

        <div className="nt-rule"></div>

        <section className="nt-sec">
          <div className="nt-head-block"><span className="lbl"><DecodeChars text="// tech_stack" step={20} /></span><h2 className="nt-section-title" style={{ fontSize: 26 }}>Tech Stack</h2></div>
          <div className="nt-tabs">
            {tabs.map(t => <button key={t} className={'nt-tab' + (tab === t ? ' is-active' : '')} onClick={() => setTab(t)}>{t}</button>)}
          </div>
          <div className="nt-tech-tags" key={tab}>
            {V4_TECH[tab].map(([name, img]) => (
              <span key={name} className="nt-tech-chip">
                {img && <img src={img} alt="" onError={(e) => { e.target.style.display = 'none'; }} />}
                {name}
              </span>
            ))}
          </div>
        </section>

        <div className="nt-rule"></div>

        <section className="nt-sec">
          <div className="nt-head-block"><span className="lbl"><DecodeChars text="// programming_journey" step={20} /></span><h2 className="nt-section-title" style={{ fontSize: 26 }}>Programming Journey</h2></div>
          <div className="nt-jtl">
            {V4_JOURNEY.map((j, i) => (
              <Reveal key={i} className="nt-jrow" delay={(i % 4) * 70}>
                <div className="nt-card nt-jrow__card">
                  <span className="nt-jrow__ic">{V[j.icon]}</span>
                  <div>
                    <h4>{j.title}</h4>
                    <span className="yr">{j.yr}</span>
                    <p>{j.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <button className="nt-btn nt-btn--ghost nt-btn--sm" style={{ marginTop: 14 }} onClick={() => onNav('updates')}>View full timeline {V.arrowRight}</button>
        </section>
      </div>
    </div>
  );
}

function V5Contact() {
  const [f, setF] = React.useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [err, setErr] = React.useState({});
  const [status, setStatus] = React.useState(null);
  const set = (k) => (e) => { setF(s => ({ ...s, [k]: e.target.value })); setErr(x => ({ ...x, [k]: '' })); };
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!f.name.trim()) er.name = 'Required';
    if (!f.email.trim()) er.email = 'Required'; else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) er.email = 'Invalid email';
    if (!f.subject.trim()) er.subject = 'Required';
    if (!f.message.trim()) er.message = 'Required';
    setErr(er);
    if (Object.keys(er).length) return;
    setStatus('sending');
    setTimeout(() => { setStatus('sent'); setF({ name: '', email: '', phone: '', subject: '', message: '' }); }, 1000);
  };
  const field = (k, label, req, ph, ta) => (
    <div className="nt-field">
      <label className="nt-label">{label}{req && <span className="nt-req">*</span>}</label>
      {ta
        ? <textarea className={'nt-textarea' + (err[k] ? ' invalid' : '')} value={f[k]} onChange={set(k)} placeholder={ph}></textarea>
        : <input className={'nt-input' + (err[k] ? ' invalid' : '')} value={f[k]} onChange={set(k)} placeholder={ph} />}
      <div className="nt-field__err">{err[k]}</div>
    </div>
  );
  return (
    <div className="nt-page">
      <div className="nt-container">
        <Reveal className="nt-banner">
          <video autoPlay muted loop playsInline preload="metadata"><source src={V4_VIDEO} type="video/mp4" /></video>
          <div className="fb" aria-hidden="true"></div>
          <div className="ov"><h2>Thomas Butler</h2><span>Full-Stack Engineer</span></div>
        </Reveal>

        <div className="nt-head-block" style={{ textAlign: 'center' }}>
          <span className="lbl" style={{ display: 'block' }}><DecodeChars text="// whether it's a project, opportunity, or just a chat about code" step={10} /></span>
          <h1 className="nt-section-title" style={{ textAlign: 'center' }}>Get in Touch</h1>
        </div>

        <section className="nt-sec" style={{ paddingTop: 14 }}>
          <div className="nt-contact-grid">
            <Reveal>
              <div className="nt-cinfo"><span className="ic">{V.mapPin}</span><div><h5>Location</h5><p>York, UK<br />Available remotely</p></div></div>
              <div className="nt-cinfo"><span className="ic">{V.mail}</span><div><h5>Email</h5><p>{V5S_LINKS.email}</p></div></div>
              <div className="nt-cinfo"><span className="ic">{V.phone}</span><div><h5>Phone</h5><p>+44 7903 352059</p></div></div>
              <div className="nt-cinfo"><span className="ic">{V.clock}</span><div><h5>Availability</h5><p>Full-time &amp; freelance<br />Résumé upon request</p></div></div>
              <div className="nt-connect">
                <div className="ch">{V.terminal} CONNECT</div>
                <a href={V5S_LINKS.github} target="_blank" rel="noreferrer">{V.github} github.com/ThomasJButler</a>
                <a href={V5S_LINKS.linkedin} target="_blank" rel="noreferrer">{V.linkedin} linkedin.com/in/thomasjbutler</a>
                <a>{V.coffee} Buy me a coffee</a>
              </div>
            </Reveal>

            <Reveal className="nt-card nt-form-card" delay={90}>
              <h3>Send a Message</h3>
              {status === 'sent' && <div className="nt-form-status">&gt; Message transmitted. I'll be in touch soon.</div>}
              <form onSubmit={submit} noValidate>
                {field('name', 'Name', true, 'Your name')}
                {field('email', 'Email', true, 'you@example.com')}
                {field('phone', 'Phone', false, '+44 ...')}
                {field('subject', 'Subject', true, 'What is this about?')}
                {field('message', 'Message', true, 'Tell me about your project or idea...', true)}
                <button className="nt-btn nt-btn--default nt-btn--lg" type="submit" disabled={status === 'sending'} style={{ marginTop: 6 }}>
                  {status === 'sending' ? 'Sending…' : <React.Fragment>Send Message {V.arrowRight}</React.Fragment>}
                </button>
              </form>
            </Reveal>
          </div>

          <div className="nt-steps">
            {V4_STEPS.map((s, i) => (
              <Reveal key={s.n} className="nt-card nt-step" delay={i * 80}>
                <span className="nt-step__n">{s.n}</span>
                <div className="nt-step__ic">{V[s.icon]}</div>
                <h4>{s.n}. {s.title}</h4>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function V5Updates() {
  return (
    <div className="nt-page">
      <div className="nt-container">
        <div className="nt-head-block" style={{ textAlign: 'center', paddingTop: 20 }}>
          <span className="lbl" style={{ display: 'block' }}><DecodeChars text="// dev_journey" step={20} /></span>
          <h1 className="nt-section-title" style={{ textAlign: 'center' }}>Dev Journey</h1>
          <p className="nt-section-sub" style={{ margin: '8px auto 0' }}>Two and a half decades from a kid watching green code rain to building AI systems for a living.</p>
        </div>
        <section className="nt-sec">
          <div className="nt-tl">
            {V5S_TIMELINE.map((m, i) => (
              <Reveal key={i} className="nt-tl-item" delay={(i % 2) * 70}>
                <div className="nt-tl-yr">{m.year}</div>
                <div className="nt-card">
                  <h3 className="nt-card__title" style={{ fontSize: 16 }}>{m.title}</h3>
                  <p className="nt-card__desc" style={{ fontSize: 13.5 }}>{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontFamily: 'Share Tech Mono, monospace', fontSize: 13, color: 'var(--primary)', marginTop: 18 }}>
            <span className="nt-footer__copy"><span className="bar" style={{ verticalAlign: 'middle' }}></span></span> the story continues...
          </p>
        </section>
      </div>
    </div>
  );
}

Object.assign(window, { V5About, V5Contact, V5Updates });
