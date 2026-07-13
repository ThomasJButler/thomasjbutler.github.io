/* v5site/palette.jsx — ⌘K command palette + easter eggs (konami, spoon, white rabbit) */

const V5S_COMMANDS = [
  { id: 'home', label: 'go: home', type: 'goto', kw: 'navigate start hero' },
  { id: 'projects', label: 'go: projects', type: 'goto', kw: 'navigate work portfolio cards' },
  { id: 'services', label: 'go: services', type: 'goto', kw: 'navigate what i build local ai' },
  { id: 'about', label: 'go: about', type: 'goto', kw: 'navigate bio tech stack journey' },
  { id: 'contact', label: 'go: contact', type: 'goto', kw: 'navigate email form get in touch' },
  { id: 'updates', label: 'go: dev journey (timetravel)', type: 'goto', kw: 'navigate updates timeline history' },
  { id: 'theme', label: 'toggle light / dark', type: 'sys', kw: 'theme circuit neon terminal mode' },
  { id: 'email', label: 'copy email address', type: 'sys', kw: 'contact clipboard dev@' },
  { id: 'github', label: 'open github ↗', type: 'link', kw: 'code repositories' },
  { id: 'linkedin', label: 'open linkedin ↗', type: 'link', kw: 'connect network' },
  { id: 'boot', label: 'replay intro', type: 'sys', kw: 'boot wake up sequence again' },
  { id: 'redpill', label: 'take the red pill', type: 'pill', dot: '#ff4b4b', kw: 'matrix wonderland truth green' },
  { id: 'bluepill', label: 'take the blue pill', type: 'pill', dot: '#4a9eff', kw: 'matrix story ends believe blue' },
  { id: 'spoon', label: 'there is no spoon', type: 'egg', hidden: true, kw: 'spoon bend truth matrix' },
  { id: 'rabbit', label: 'follow the white rabbit', type: 'egg', hidden: true, kw: 'rabbit white wonderland follow' },
];

function CommandPalette({ open, onClose, exec }) {
  const [q, setQ] = React.useState('');
  const [sel, setSel] = React.useState(0);
  const inputRef = React.useRef(null);

  const list = V5S_COMMANDS.filter(c => {
    const hay = (c.label + ' ' + c.kw).toLowerCase();
    const match = !q || hay.includes(q.toLowerCase());
    if (c.hidden) return q.length > 2 && match;
    return match;
  });

  React.useEffect(() => { if (open) { setQ(''); setSel(0); setTimeout(() => inputRef.current && inputRef.current.focus(), 30); } }, [open]);
  React.useEffect(() => { setSel(0); }, [q]);

  if (!open) return null;

  const key = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => (s + 1) % Math.max(list.length, 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel(s => (s - 1 + list.length) % Math.max(list.length, 1)); }
    else if (e.key === 'Enter') { e.preventDefault(); if (list[sel]) { exec(list[sel]); onClose(); } }
    else if (e.key === 'Escape') { e.preventDefault(); onClose(); }
  };

  return (
    <div className="v5s-pal" onClick={onClose}>
      <div className="v5s-pal__win" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Command palette">
        <div className="v5s-pal__bar">
          <span className="v5-dots"><i className="r"></i><i className="y"></i><i className="g"></i></span>
          <span className="v5s-pal__path">tom@matrix: palette</span>
        </div>
        <div className="v5s-pal__inputrow">
          <span className="p">&gt;</span>
          <input ref={inputRef} className="v5s-pal__input" value={q} onChange={(e) => setQ(e.target.value)}
            onKeyDown={key} placeholder="type a command..." spellCheck="false" aria-label="Command" />
        </div>
        <div className="v5s-pal__list" role="listbox">
          {list.length === 0 && <div className="v5s-pal__empty">no match. there is no spoon.</div>}
          {list.map((c, i) => (
            <button key={c.id} className={'v5s-pal__item' + (i === sel ? ' is-sel' : '')}
              onMouseEnter={() => setSel(i)} onClick={() => { exec(c); onClose(); }} role="option" aria-selected={i === sel}>
              <span className="cara">{i === sel ? '▸' : '\u00A0'}</span>
              {c.dot && <span className="pill" style={{ background: c.dot, boxShadow: `0 0 8px ${c.dot}` }}></span>}
              <span className="lab">{c.label}</span>
              <span className="typ">{c.type}</span>
            </button>
          ))}
        </div>
        <div className="v5s-pal__hint">↑↓ navigate · ↵ run · esc close</div>
      </div>
    </div>
  );
}

/* konami code hook */
function useKonami(cb) {
  React.useEffect(() => {
    const seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let i = 0;
    const on = (e) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (k === seq[i]) { i++; if (i === seq.length) { i = 0; cb(); } }
      else i = (k === seq[0]) ? 1 : 0;
    };
    addEventListener('keydown', on);
    return () => removeEventListener('keydown', on);
  }, []); // eslint-disable-line
}

/* THERE IS NO SPOON overlay */
function SpoonOverlay({ onDone }) {
  React.useEffect(() => {
    if (window.__v5Burst) window.__v5Burst();
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line
  return (
    <div className="v5s-spoon" onClick={onDone}>
      <h2 className="v5s-spoon__t"><DecodeChars text="THERE IS NO SPOON" step={70} window={340} /></h2>
      <p className="v5s-spoon__s">do not try and bend the spoon. that's impossible.</p>
    </div>
  );
}

/* white rabbit — appears once, hops in the corner */
function WhiteRabbit({ onCatch }) {
  return (
    <button className="v5s-rabbit" onClick={onCatch} title="follow the white rabbit" aria-label="Follow the white rabbit">
      <svg viewBox="0 0 64 48" aria-hidden="true">
        <ellipse cx="27" cy="35" rx="16" ry="10" fill="currentColor" />
        <circle cx="44" cy="27" r="7.5" fill="currentColor" />
        <ellipse cx="41" cy="14" rx="2.8" ry="9" fill="currentColor" transform="rotate(-14 41 14)" />
        <ellipse cx="48" cy="15" rx="2.8" ry="9" fill="currentColor" transform="rotate(8 48 15)" />
        <circle cx="12" cy="38" r="4.5" fill="currentColor" />
        <circle cx="46.5" cy="26" r="1.1" fill="#050805" />
      </svg>
    </button>
  );
}

Object.assign(window, { CommandPalette, useKonami, SpoonOverlay, WhiteRabbit });
