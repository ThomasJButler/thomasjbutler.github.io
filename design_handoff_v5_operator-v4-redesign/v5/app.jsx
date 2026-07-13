/* v5/app.jsx — variation switcher shell: header, footer, tweaks, glitch transition */

const V5_ACCENTS = { '#16a34a': null, '#06b6d4': '#06b6d4', '#d97706': '#d97706', '#7c3aed': '#7c3aed', '#2563eb': '#2563eb' };
const V5_VARIANTS = [
  ['construct', '01 · construct'],
  ['wakeup', '02 · wake up'],
  ['operator', '03 · operator'],
];
const V5_DEFAULTS = /*EDITMODE-BEGIN*/{
  "variant": "construct",
  "accent": "#16a34a",
  "rain": 0.55,
  "scan": 0.5,
  "cursor": true
}/*EDITMODE-END*/;

function V5Header() {
  return (
    <header className="nt-header v5-header">
      <div className="nt-header__inner">
        <a className="nt-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><span className="gt">&gt;</span>tom_butler</a>
        <nav className="nt-nav" aria-label="Main">
          <a className="is-active">Home</a>
          <a>Projects</a>
          <a>About</a>
          <a>Services</a>
          <a>Contact</a>
          <span className="nt-nav__side">
            <a className="nt-iconbtn" aria-label="GitHub">{V5I.github}</a>
            <a className="nt-iconbtn" aria-label="LinkedIn">{V5I.linkedin}</a>
          </span>
        </nav>
      </div>
      <div className="nt-header__rule"></div>
    </header>
  );
}

function V5Footer() {
  return (
    <footer className="nt-footer" id="foot">
      <div className="nt-footer__rule"></div>
      <div className="nt-footer__inner">
        <span className="nt-footer__copy"><span className="gt">&gt;</span> © 2026 Tom Butler<span className="bar"></span></span>
        <span className="nt-footer__links">
          <a className="nt-iconbtn" aria-label="GitHub">{V5I.github}</a>
          <a className="nt-iconbtn" aria-label="LinkedIn">{V5I.linkedin}</a>
          <a className="nt-iconbtn" aria-label="Email">{V5I.mail}</a>
        </span>
      </div>
    </footer>
  );
}

function V5App() {
  const [t, setTweak] = useTweaks(V5_DEFAULTS);
  const [glitch, setGlitch] = React.useState(false);
  const [introKey, setIntroKey] = React.useState(0);
  const variant = t.variant || 'construct';

  const setVariant = (v) => {
    if (v === variant) return;
    setTweak('variant', v);
    if (!v5Reduce()) { setGlitch(true); setTimeout(() => setGlitch(false), 260); if (window.__v5Burst) window.__v5Burst(); }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  const replay = () => { setIntroKey(k => k + 1); window.scrollTo({ top: 0, behavior: 'instant' }); };

  const override = V5_ACCENTS[t.accent] || null;
  const rootVars = { '--v5-rain-op': t.rain, '--v5-scan-op': t.scan };
  if (override) { rootVars['--primary'] = override; rootVars['--ring'] = override; }

  const hero = variant === 'wakeup' ? <HeroWakeup key={'w' + introKey} />
    : variant === 'operator' ? <HeroOperator key="o" />
    : <HeroConstruct key="c" />;

  return (
    <div className={'v5-root' + (glitch ? ' v5-glitching' : '')} style={rootVars}>
      <V5Rain tint={override} />
      <div className="v5-scan" aria-hidden="true"></div>
      <div className="v5-vignette" aria-hidden="true"></div>

      <V5Header />
      <main>{hero}<BelowFold /></main>
      <V5Footer />

      <div className="v5-switch" role="group" aria-label="Hero variation switcher">
        <span className="v5-switch__lab">variation</span>
        {V5_VARIANTS.map(([id, label]) => (
          <button key={id} className={'v5-switch__btn' + (variant === id ? ' is-on' : '')} onClick={() => setVariant(id)}>{label}</button>
        ))}
        {variant === 'wakeup' && <button className="v5-switch__btn v5-switch__replay" onClick={replay}>↻ intro</button>}
      </div>

      {t.cursor !== false && <TermCursor />}

      <TweaksPanel>
        <TweakSection label="Variation" />
        <TweakRadio label="Hero" value={variant} options={['construct', 'wakeup', 'operator']}
          onChange={(v) => setVariant(v)} />
        <TweakSection label="Neon" />
        <TweakColor label="Accent" value={t.accent}
          options={['#16a34a', '#06b6d4', '#d97706', '#7c3aed', '#2563eb']}
          onChange={(v) => setTweak('accent', v)} />
        <TweakSection label="Atmosphere" />
        <TweakSlider label="Matrix rain" value={t.rain} min={0} max={1} step={0.05}
          onChange={(v) => setTweak('rain', v)} />
        <TweakSlider label="Scanlines" value={t.scan} min={0} max={1} step={0.05}
          onChange={(v) => setTweak('scan', v)} />
        <TweakSection label="Pointer" />
        <TweakToggle label="Terminal cursor" value={t.cursor !== false} onChange={(v) => setTweak('cursor', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<V5App />);
