/* v5/below.jsx — shared below-fold: system_status · NOW · Run It Local (updated local-AI content) */

const V5_STATS = [
  { icon: 'gitbranch', value: '15+', label: 'Projects' },
  { icon: 'cpu', value: '7', label: 'AI Models' },
  { icon: 'globe', value: '20+', label: 'Deployments' },
  { icon: 'zap', value: '99.9%', label: 'Uptime' },
];

const V5_NOW = 'Setting up private, local AI systems for businesses, and building Sanctuary, an on-device AI app for neurodiverse users heading to the App Store. Currently deep in Ollama, RAG pipelines, and open source local AI (I contribute to Odysseus). The theme of everything right now: AI you own, not AI you rent.';
const V5_NOW_TAGS = [['Ollama', 'cyan'], ['RAG', 'cyan'], ['Local AI', ''], ['On-Device', 'amber']];

function BelowFold() {
  return (
    <div className="nt-page v5-below" id="below" data-screen-label="below the fold">
      <div className="nt-container">
        <Reveal className="nt-eyebrow">
          <span className="v5-eyeicon">{V5I.terminal}</span>
          <span className="nt-eyebrow__label">system_status</span>
          <span className="nt-eyebrow__rule"></span>
          <span className="nt-eyebrow__status"><span className="dot"></span> online</span>
        </Reveal>

        <div className="nt-stats">
          {V5_STATS.map((s, i) => (
            <Reveal key={s.label} className="nt-card nt-stat" delay={i * 90}>
              <span className="nt-stat__icon">{V5I[s.icon]}</span>
              <div className="nt-stat__value">{s.value}</div>
              <div className="nt-stat__label">{s.label}</div>
            </Reveal>
          ))}
        </div>

        <Reveal className="nt-now" delay={80}>
          <div className="v5-now__head">{V5I.sparkles}<span className="nt-eyebrow__label">now</span></div>
          <p className="v5-now__copy">{V5_NOW}</p>
          <div className="nt-now__tags">
            {V5_NOW_TAGS.map(([t, k]) => <span key={t} className={'nt-badge ' + (k ? 'nt-badge--' + k : 'nt-badge--outline')}>{t}</span>)}
          </div>
        </Reveal>

        <Reveal className="v5-news" delay={120}>
          <div className="v5-news__head">
            <span className="nt-eyebrow__label">run_it_local</span>
            <h3>Run It Local</h3>
            <p>Keeping up with AI, and how to make it your own. One email a week, plain English, no hype.</p>
          </div>
          <div className="v5-news__act">
            <a className="nt-btn nt-btn--default" href="#below" onClick={(e) => e.preventDefault()} title="Substack link to come">Subscribe {V5I.arrowRight}</a>
            <span className="v5-news__note">substack · link tbc</span>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

Object.assign(window, { BelowFold });
