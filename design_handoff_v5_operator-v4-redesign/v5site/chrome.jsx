/* v5site/chrome.jsx — header (with ⌘K), footer, drawer, toast, newsletter strip */

function V5SHeader({ active, onNav, theme, onToggle, onMenu, onPalette }) {
  const items = ['home', 'projects', 'about', 'services', 'contact'];
  return (
    <header className="nt-header">
      <div className="nt-header__inner">
        <a className="nt-logo" onClick={() => onNav('home')}><span className="gt">&gt;</span>tom_butler</a>
        <nav className="nt-nav" aria-label="Main">
          {items.map(id => (
            <a key={id} className={active === id ? 'is-active' : ''} onClick={() => onNav(id)}>{id.charAt(0).toUpperCase() + id.slice(1)}</a>
          ))}
          <span className="nt-nav__side">
            <button className="v5s-kbd" onClick={onPalette} title="Command palette (Ctrl / ⌘ K)">⌘K</button>
            <a className="nt-iconbtn" href={V5S_LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub">{V.github}</a>
            <a className="nt-iconbtn" href={V5S_LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">{V.linkedin}</a>
            <button className="nt-iconbtn" onClick={onToggle} aria-label="Toggle theme">{theme === 'neon-terminal' ? V.sun : V.moon}</button>
          </span>
        </nav>
        <button className="nt-burger" onClick={onMenu} aria-label="Menu">{V.menu}</button>
      </div>
      <div className="nt-header__rule"></div>
    </header>
  );
}

function V5SDrawer({ onNav, onClose, theme, onToggle, onPalette }) {
  const items = ['home', 'projects', 'about', 'services', 'contact', 'updates'];
  return (
    <div className="nt-drawer">
      <button className="nt-drawer__close" onClick={onClose} aria-label="Close">{V.x}</button>
      {items.map(id => <button key={id} onClick={() => { onNav(id); onClose(); }}>{id}</button>)}
      <button style={{ color: 'var(--primary)' }} onClick={() => { onPalette(); onClose(); }}>⌘K palette</button>
      <button style={{ marginTop: 6, color: 'var(--primary)' }} onClick={onToggle}>{theme === 'neon-terminal' ? '☀ light' : '☾ dark'}</button>
    </div>
  );
}

function V5SFooter({ onNav }) {
  return (
    <footer className="nt-footer" id="foot">
      <div className="nt-footer__rule"></div>
      <div className="nt-footer__inner" style={{ paddingTop: 20 }}>
        <span className="nt-footer__copy"><span className="gt">&gt;</span> © 2026 Tom Butler<span className="bar"></span></span>
        <div className="nt-footer__links">
          <a href={V5S_LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub">{V.github}</a>
          <a href={V5S_LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">{V.linkedin}</a>
          <a href={'mailto:' + V5S_LINKS.email} aria-label="Email">{V.mail}</a>
          <span style={{ opacity: 0.4 }}>|</span>
          <a onClick={() => onNav('updates')} style={{ cursor: 'pointer' }}>TimeTravel</a>
        </div>
      </div>
    </footer>
  );
}

/* toast — window.v5sToast('message') */
function V5SToaster() {
  const [msg, setMsg] = React.useState(null);
  const tRef = React.useRef(null);
  React.useEffect(() => {
    const on = (e) => {
      setMsg(e.detail);
      clearTimeout(tRef.current);
      tRef.current = setTimeout(() => setMsg(null), 3800);
    };
    addEventListener('v5s:toast', on);
    return () => { removeEventListener('v5s:toast', on); clearTimeout(tRef.current); };
  }, []);
  if (!msg) return null;
  return <div className="v5s-toast" role="status">{msg}</div>;
}
window.v5sToast = (m) => dispatchEvent(new CustomEvent('v5s:toast', { detail: m }));

/* Run It Local strip */
function V5SNewsletter() {
  const sub = (e) => {
    if (!V5S_LINKS.substack) { e.preventDefault(); v5sToast('> substack link coming soon. watch this space.'); }
  };
  return (
    <Reveal className="v5-news">
      <div className="v5-news__head">
        <span className="nt-eyebrow__label">run_it_local</span>
        <h3>Run It Local</h3>
        <p>{V5S_NEWS_COPY}</p>
      </div>
      <div className="v5-news__act">
        <a className="nt-btn nt-btn--default" href={V5S_LINKS.substack || '#'} onClick={sub} target={V5S_LINKS.substack ? '_blank' : undefined} rel="noreferrer">Subscribe {V.arrowRight}</a>
        <span className="v5-news__note">one email a week · no hype</span>
      </div>
    </Reveal>
  );
}

Object.assign(window, { V5SHeader, V5SDrawer, V5SFooter, V5SToaster, V5SNewsletter });
