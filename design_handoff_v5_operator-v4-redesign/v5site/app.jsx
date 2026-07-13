/* v5site/app.jsx — router, boot intro, page transitions, palette + eggs, theme, tweaks */

const V5S_ACCENTS = { '#16a34a': null, '#06b6d4': '#06b6d4', '#d97706': '#d97706', '#7c3aed': '#7c3aed', '#2563eb': '#2563eb' };
const V5S_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#16a34a",
  "rain": 0.55,
  "scan": 0.5,
  "cursor": true
}/*EDITMODE-END*/;

function BootIntro({ onDone }) {
  const [out, setOut] = React.useState(false);
  const doneRef = React.useRef(false);
  const finish = () => {
    if (doneRef.current) return; doneRef.current = true;
    setOut(true);
    if (window.__v5Burst) window.__v5Burst();
    setTimeout(onDone, 380);
  };
  React.useEffect(() => {
    const key = (e) => { if (e.key === 'Escape') finish(); };
    const wheel = () => finish();
    addEventListener('keydown', key);
    addEventListener('wheel', wheel, { passive: true });
    addEventListener('touchmove', wheel, { passive: true });
    return () => { removeEventListener('keydown', key); removeEventListener('wheel', wheel); removeEventListener('touchmove', wheel); };
  }, []); // eslint-disable-line
  return (
    <div className={'v5-wake' + (out ? ' is-out' : '')} onClick={finish} role="button" aria-label="Skip intro">
      <BootLines lines={['Wake up, Tom...']} onDone={finish} />
      <span className="v5-skip">[ skip · esc ]</span>
    </div>
  );
}

function V5SiteApp() {
  const [t, setTweak] = useTweaks(V5S_DEFAULTS);
  const [page, setPage] = React.useState(() => localStorage.getItem('v5s:page') || 'home');
  const [theme, setTheme] = React.useState(() => localStorage.getItem('v5s:theme') || 'neon-terminal');
  const [menu, setMenu] = React.useState(false);
  const [pal, setPal] = React.useState(false);
  const [boot, setBoot] = React.useState(() => !v5Reduce() && !sessionStorage.getItem('v5s:booted'));
  const [spoon, setSpoon] = React.useState(false);
  const [rabbit, setRabbit] = React.useState(false);
  const [leaving, setLeaving] = React.useState(false);
  const leavingRef = React.useRef(false);

  React.useEffect(() => { document.body.setAttribute('data-theme', theme); localStorage.setItem('v5s:theme', theme); }, [theme]);
  React.useEffect(() => { localStorage.setItem('v5s:page', page); }, [page]);
  React.useEffect(() => {
    if (boot) document.body.classList.add('v5-lock');
    else { document.body.classList.remove('v5-lock'); sessionStorage.setItem('v5s:booted', '1'); }
  }, [boot]);

  /* console easter egg */
  React.useEffect(() => {
    console.log('%cWake up, Neo...', 'color:#00ff41;font-family:monospace;font-size:18px;text-shadow:0 0 8px #00ff41');
    console.log('%c> follow the white rabbit. (try the konami code, or press \u2318K and take a pill)', 'color:#00aa44;font-family:monospace;font-size:12px');
  }, []);

  /* ⌘K / Ctrl+K */
  React.useEffect(() => {
    const on = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPal(p => !p); }
    };
    addEventListener('keydown', on);
    return () => removeEventListener('keydown', on);
  }, []);

  /* white rabbit — once per session, after 22s */
  React.useEffect(() => {
    if (sessionStorage.getItem('v5s:rabbit')) return;
    const show = setTimeout(() => setRabbit(true), 22000);
    return () => clearTimeout(show);
  }, []);
  React.useEffect(() => {
    if (!rabbit) return;
    const hide = setTimeout(() => { setRabbit(false); sessionStorage.setItem('v5s:rabbit', '1'); }, 15000);
    return () => clearTimeout(hide);
  }, [rabbit]);

  useKonami(() => setSpoon(true));

  const navigate = (p) => {
    if (p === page || leavingRef.current) return;
    if (v5Reduce()) { setPage(p); window.scrollTo({ top: 0, behavior: 'instant' }); return; }
    leavingRef.current = true; setLeaving(true);
    setTimeout(() => {
      setPage(p); setLeaving(false); leavingRef.current = false;
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 200);
  };
  const toggleTheme = () => setTheme(x => x === 'neon-terminal' ? 'circuit' : 'neon-terminal');
  const catchRabbit = () => {
    setRabbit(false); sessionStorage.setItem('v5s:rabbit', '1');
    if (window.__v5Burst) window.__v5Burst();
    navigate('updates'); v5sToast('> the rabbit hole goes deeper...');
  };

  const exec = (c) => {
    switch (c.id) {
      case 'home': case 'projects': case 'services': case 'about': case 'contact': case 'updates':
        navigate(c.id); break;
      case 'theme': toggleTheme(); break;
      case 'email': {
        const done = () => v5sToast('> ' + V5S_LINKS.email + ' copied to clipboard');
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(V5S_LINKS.email).then(done, done);
        else done();
        break;
      }
      case 'github': window.open(V5S_LINKS.github, '_blank'); break;
      case 'linkedin': window.open(V5S_LINKS.linkedin, '_blank'); break;
      case 'boot': sessionStorage.removeItem('v5s:booted'); setBoot(true); break;
      case 'redpill':
        setTweak('accent', '#16a34a');
        v5sToast('You stay in Wonderland, and I show you how deep the rabbit hole goes.');
        break;
      case 'bluepill':
        setTweak('accent', '#2563eb');
        v5sToast('The story ends. You wake up and believe whatever you want to believe.');
        break;
      case 'spoon': setSpoon(true); break;
      case 'rabbit': catchRabbit(); break;
    }
  };

  const override = V5S_ACCENTS[t.accent] || null;
  const rootVars = { '--v5-rain-op': t.rain, '--v5-scan-op': t.scan };
  if (override) { rootVars['--primary'] = override; rootVars['--ring'] = override; }

  let body = null;
  if (page === 'home') body = <V5Home onNav={navigate} />;
  else if (page === 'projects') body = <V5Projects />;
  else if (page === 'services') body = <V5Services onNav={navigate} />;
  else if (page === 'about') body = <V5About onNav={navigate} />;
  else if (page === 'contact') body = <V5Contact />;
  else if (page === 'updates') body = <V5Updates />;

  return (
    <div className="v5-root" style={rootVars}>
      <V5Rain theme={theme} tint={theme === 'circuit' ? null : override} />
      <div className="v5-scan" aria-hidden="true"></div>
      <div className="v5-vignette" aria-hidden="true"></div>

      <V5SHeader active={page} onNav={navigate} theme={theme} onToggle={toggleTheme}
        onMenu={() => setMenu(true)} onPalette={() => setPal(true)} />
      <main key={page} className={'v5s-main' + (leaving ? ' is-leaving' : '')} data-screen-label={page}>{body}</main>
      <V5SFooter onNav={navigate} />

      {menu && <V5SDrawer onNav={navigate} onClose={() => setMenu(false)} theme={theme} onToggle={toggleTheme} onPalette={() => setPal(true)} />}
      <CommandPalette open={pal} onClose={() => setPal(false)} exec={exec} />
      {spoon && <SpoonOverlay onDone={() => setSpoon(false)} />}
      {rabbit && !boot && <WhiteRabbit onCatch={catchRabbit} />}
      <V5SToaster />
      {t.cursor !== false && <TermCursor />}
      {boot && <BootIntro onDone={() => setBoot(false)} />}

      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakRadio label="Mode" value={theme === 'neon-terminal' ? 'Dark' : 'Light'} options={['Dark', 'Light']}
          onChange={(v) => setTheme(v === 'Dark' ? 'neon-terminal' : 'circuit')} />
        <TweakColor label="Accent" value={t.accent}
          options={['#16a34a', '#06b6d4', '#d97706', '#7c3aed', '#2563eb']}
          onChange={(v) => setTweak('accent', v)} />
        <TweakSection label="Atmosphere" />
        <TweakSlider label="Matrix rain" value={t.rain} min={0} max={1} step={0.05} onChange={(v) => setTweak('rain', v)} />
        <TweakSlider label="Scanlines" value={t.scan} min={0} max={1} step={0.05} onChange={(v) => setTweak('scan', v)} />
        <TweakSection label="Extras" />
        <TweakToggle label="Terminal cursor" value={t.cursor !== false} onChange={(v) => setTweak('cursor', v)} />
        <TweakButton label="Replay intro" onClick={() => { sessionStorage.removeItem('v5s:booted'); setBoot(true); }} />
        <TweakButton label="Open ⌘K palette" onClick={() => setPal(true)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<V5SiteApp />);
