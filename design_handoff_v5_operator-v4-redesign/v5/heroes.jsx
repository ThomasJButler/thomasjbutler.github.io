/* v5/heroes.jsx — three hero variations: Construct / Wake Up / Operator */

const V5_PHRASES = ['AI you can own', 'private, local AI systems', 'production web apps', 'intelligent agents'];
const V5_SUB = 'Full Stack AI Engineer from the UK. I set up private, local AI systems for businesses. Same results, no per-token bills, your data stays yours.';

function TypedLine({ center }) {
  const w = useV5Typed(V5_PHRASES);
  return (
    <div className={'v5-typedline' + (center ? ' v5-typedline--c' : '')}>
      <span className="pre">{'// I build '}</span><span className="word">{w}</span><span className="v5-caret"></span>
    </div>
  );
}

function HeroCtas({ center, onNav }) {
  const go = (page, fallback) => () => onNav ? onNav(page) : v5ScrollTo(fallback);
  return (
    <div className={'v5-cta' + (center ? ' v5-cta--c' : '')}>
      <button className="nt-btn nt-btn--default nt-btn--lg" onClick={go('projects', '#below')}>View Projects {V5I.arrowRight}</button>
      <button className="nt-btn nt-btn--outline nt-btn--lg" onClick={go('contact', '#foot')}>Get in Touch</button>
    </div>
  );
}

function ScrollCue({ inFrame }) {
  return (
    <button className={'v5-scrollcue' + (inFrame ? ' v5-scrollcue--frame' : '')} onClick={() => v5ScrollTo('#below')} aria-label="Scroll down">
      <span className="tri">▼</span> scroll
    </button>
  );
}

/* ── 01 · THE CONSTRUCT — the viewport IS the terminal ── */
function HeroConstruct() {
  return (
    <section className="v5-hero v5-construct" data-screen-label="hero — the construct">
      <div className="v5-frame" aria-hidden="true">
        <div className="v5-frame__top">
          <span className="v5-dots"><i className="r"></i><i className="y"></i><i className="g"></i></span>
          <span className="v5-frame__path">tom@matrix: ~/portfolio · v5.0</span>
          <span className="v5-frame__read">local-first · 0 bytes → third parties</span>
        </div>
        <div className="v5-frame__bot">
          <span className="v5-frame__tag">the construct</span>
          <span className="v5-frame__coords">53.40°N · 2.98°W · liverpool</span>
        </div>
      </div>
      <div className="v5-construct__inner">
        <p className="v5-bootline"><DecodeChars text="> ./wake --construct" step={24} /></p>
        <h1 className="v5-mega"><DecodeChars text="HEY, I'M TOM" delay={380} step={95} window={420} /></h1>
        <TypedLine />
        <p className="v5-sub">{V5_SUB}</p>
        <HeroCtas />
      </div>
      <ScrollCue inFrame />
    </section>
  );
}

/* ── 02 · WAKE UP — cinematic boot sequence, then reveal ── */
const WAKE_LINES = ['Wake up, Tom...', 'The Matrix has you...', 'Knock, knock, Tom.'];

function BootLines({ lines, onDone }) {
  const [li, setLi] = React.useState(0);
  const [n, setN] = React.useState(0);
  const [fading, setFading] = React.useState(false);
  React.useEffect(() => {
    const line = lines[li];
    let t;
    if (!fading && n < line.length) {
      t = setTimeout(() => setN(n + 1), 34 + Math.random() * 48 + (',.'.includes(line[n - 1]) ? 200 : 0));
    } else if (!fading) {
      t = setTimeout(() => setFading(true), li === lines.length - 1 ? 700 : 850);
    } else {
      t = setTimeout(() => {
        if (li === lines.length - 1) { onDone && onDone(); }
        else { setLi(li + 1); setN(0); setFading(false); }
      }, 300);
    }
    return () => clearTimeout(t);
  }, [li, n, fading]); // eslint-disable-line
  return (
    <div className={'v5-wake__line' + (fading ? ' is-fade' : '')}>
      {lines[li].slice(0, n)}<span className="v5-caret"></span>
    </div>
  );
}

function HeroWakeup() {
  const [phase, setPhase] = React.useState(v5Reduce() ? 'steady' : 'boot');
  const done = React.useRef(phase === 'steady');
  const reveal = () => {
    if (done.current) return; done.current = true;
    setPhase('steady');
    if (window.__v5Burst) window.__v5Burst();
  };
  React.useEffect(() => {
    if (phase !== 'boot') return;
    const key = (e) => { if (e.key === 'Escape') reveal(); };
    const skip = () => reveal();
    addEventListener('keydown', key);
    addEventListener('wheel', skip, { passive: true });
    addEventListener('touchmove', skip, { passive: true });
    document.body.classList.add('v5-lock');
    return () => {
      removeEventListener('keydown', key); removeEventListener('wheel', skip);
      removeEventListener('touchmove', skip);
      document.body.classList.remove('v5-lock');
    };
  }, [phase]); // eslint-disable-line

  return (
    <section className="v5-hero v5-wakeup" data-screen-label="hero — wake up">
      {phase === 'boot' && (
        <div className="v5-wake" onClick={reveal} role="button" aria-label="Skip intro">
          <BootLines lines={WAKE_LINES} onDone={reveal} />
          <span className="v5-skip">[ skip · esc ]</span>
        </div>
      )}
      {phase === 'steady' && (
        <div className="v5-wakeup__inner">
          <p className="v5-bootline v5-bootline--c"><DecodeChars text="> connection established" step={22} /></p>
          <h1 className="v5-mega v5-mega--c"><DecodeChars text="HEY, I'M TOM" delay={300} step={90} window={400} /></h1>
          <TypedLine center />
          <p className="v5-sub v5-sub--c">{V5_SUB}</p>
          <HeroCtas center />
        </div>
      )}
      {phase === 'steady' && <ScrollCue />}
    </section>
  );
}

/* ── 03 · THE OPERATOR — split hero with a live local-AI console ── */
const OP_SCRIPT = [
  { cmd: 'whoami', out: [{ t: 'tom butler · full stack AI engineer · liverpool, uk' }] },
  { cmd: 'ollama run qwen3 "summarise ./client-docs"', out: [{ t: '▸ 42 tok/s · running on local hardware' }, { t: '▸ done · nothing left the machine' }] },
  { cmd: 'netstat --external', out: [{ t: '0 bytes sent to third parties', hl: true }] },
  { cmd: 'ls ~/services', out: [{ t: 'local-llm-setups/   private-rag/   ai-cost-audits/' }] },
];

function OperatorConsole() {
  const [lines, setLines] = React.useState([]);
  const [cur, setCur] = React.useState(null);
  const [ended, setEnded] = React.useState(false);
  const [runId, setRunId] = React.useState(0);
  const bodyRef = React.useRef(null);

  React.useEffect(() => {
    setLines([]); setCur(null); setEnded(false);
    if (v5Reduce()) {
      const all = [];
      OP_SCRIPT.forEach(s => { all.push({ type: 'cmd', text: s.cmd }); s.out.forEach(o => all.push({ type: 'out', ...o })); });
      setLines(all); setEnded(true); return;
    }
    let alive = true; const timers = [];
    const T = (fn, ms) => { const id = setTimeout(() => { if (alive) fn(); }, ms); timers.push(id); };
    let acc = 500;
    OP_SCRIPT.forEach(step => {
      for (let k = 1; k <= step.cmd.length; k++) {
        const kk = k; T(() => setCur({ text: step.cmd.slice(0, kk) }), acc);
        acc += 24 + Math.random() * 26;
      }
      acc += 200;
      T(() => { setCur(null); setLines(l => [...l, { type: 'cmd', text: step.cmd }]); }, acc);
      step.out.forEach(o => { acc += 300; T(() => setLines(l => [...l, { type: 'out', ...o }]), acc); });
      acc += 560;
    });
    T(() => setEnded(true), acc);
    return () => { alive = false; timers.forEach(clearTimeout); };
  }, [runId]);

  React.useEffect(() => { const b = bodyRef.current; if (b) b.scrollTop = b.scrollHeight; });

  return (
    <div className="v5-console">
      <div className="v5-console__bar">
        <span className="v5-dots"><i className="r"></i><i className="y"></i><i className="g"></i></span>
        <span className="v5-console__path">tom@local: ~</span>
        <button className="v5-console__rerun" onClick={() => setRunId(r => r + 1)}>↻ rerun</button>
      </div>
      <div className="v5-console__body" ref={bodyRef}>
        {lines.map((l, i) => l.type === 'cmd'
          ? <div key={i} className="cline"><span className="p">$ </span>{l.text}</div>
          : <div key={i} className={'oline' + (l.hl ? ' hl' : '')}>{l.t}</div>)}
        {cur && <div className="cline"><span className="p">$ </span>{cur.text}<span className="v5-caret"></span></div>}
        {ended && <div className="cline"><span className="p">$ </span><span className="v5-caret"></span></div>}
      </div>
    </div>
  );
}

function HeroOperator({ onNav }) {
  return (
    <section className="v5-hero v5-operator" data-screen-label="hero — the operator">
      <div className="v5-operator__grid">
        <div className="v5-operator__copy">
          <p className="v5-bootline"><DecodeChars text="// tom_butler · liverpool, uk" step={22} /></p>
          <h1 className="v5-big"><DecodeChars text="Hey, I'm Tom" delay={280} step={70} window={360} /></h1>
          <TypedLine />
          <p className="v5-sub">{V5_SUB}</p>
          <HeroCtas onNav={onNav} />
        </div>
        <OperatorConsole />
      </div>
      <ScrollCue />
    </section>
  );
}

Object.assign(window, { HeroConstruct, HeroWakeup, HeroOperator, BootLines, TypedLine, HeroCtas });
