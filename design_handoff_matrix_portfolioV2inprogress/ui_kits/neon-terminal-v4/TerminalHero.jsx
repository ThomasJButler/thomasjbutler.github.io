/* TerminalHero.jsx — Home page hero: terminal window + typing + featured artwork tiles */

const TYPING_PHRASES = [
  'AI-powered apps',
  'production web apps',
  'intelligent agents',
  'creative solutions'
];

function useTypingPhrase() {
  const [display, setDisplay] = React.useState('');
  const [idx, setIdx] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    const phrase = TYPING_PHRASES[idx];
    const speed = deleting ? 50 : 100;
    const pause = deleting ? 500 : 2000;
    if (!deleting && display === phrase) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && display === '') {
      setDeleting(false);
      setIdx((p) => (p + 1) % TYPING_PHRASES.length);
      return;
    }
    const next = deleting
      ? phrase.substring(0, display.length - 1)
      : phrase.substring(0, display.length + 1);
    const t = setTimeout(() => setDisplay(next), speed);
    return () => clearTimeout(t);
  }, [display, idx, deleting]);

  return display;
}

/* Inline-SVG-only "artwork" tiles — placeholders for the project GIFs.
   Three tiles: Matrix Arcade · Personal · ModelViz. */
function ArtworkTile({ kind }) {
  if (kind === 'matrix-arcade') {
    return React.createElement('svg', {
      viewBox: '0 0 240 200', width: '100%', height: '100%',
      preserveAspectRatio: 'xMidYMid slice', 'aria-hidden': true
    }, [
      React.createElement('rect', { key: 'bg', width: 240, height: 200, fill: '#000' }),
      ...Array.from({ length: 16 }, (_, i) =>
        React.createElement('rect', {
          key: 'r' + i,
          x: i * 16, y: -20 + (i * 17) % 80, width: 14, height: 240,
          fill: 'url(#g)', opacity: 0.4
        })
      ),
      React.createElement('defs', { key: 'd' },
        React.createElement('linearGradient', { id: 'g', x1: 0, y1: 0, x2: 0, y2: 1 }, [
          React.createElement('stop', { key: 's1', offset: 0, stopColor: '#00FF00', stopOpacity: 0 }),
          React.createElement('stop', { key: 's2', offset: 1, stopColor: '#00FF00', stopOpacity: 0.8 })
        ])
      ),
      React.createElement('text', {
        key: 't1', x: 120, y: 92, textAnchor: 'middle',
        fontFamily: 'Orbitron', fontWeight: 700, fontSize: 22, fill: '#00FF00',
        style: { filter: 'drop-shadow(0 0 8px #0f0)' }
      }, 'THE MATRIX'),
      React.createElement('text', {
        key: 't2', x: 120, y: 122, textAnchor: 'middle',
        fontFamily: 'Orbitron', fontWeight: 700, fontSize: 22, fill: '#00FF00',
        style: { filter: 'drop-shadow(0 0 8px #0f0)' }
      }, 'ARCADE')
    ]);
  }
  if (kind === 'personal') {
    return React.createElement('svg', {
      viewBox: '0 0 240 200', width: '100%', height: '100%',
      preserveAspectRatio: 'xMidYMid slice', 'aria-hidden': true
    }, [
      React.createElement('rect', { key: 'bg', width: 240, height: 200, fill: '#000' }),
      ...Array.from({ length: 12 }, (_, i) =>
        React.createElement('line', {
          key: 'l' + i, x1: i * 22, y1: 0, x2: i * 22, y2: 200,
          stroke: '#0f0', strokeOpacity: 0.18
        })
      ),
      React.createElement('circle', { key: 'h', cx: 120, cy: 92, r: 12, fill: '#0f0', opacity: 0.85 }),
      React.createElement('rect', { key: 'b', x: 106, y: 104, width: 28, height: 36, rx: 8, fill: '#0f0', opacity: 0.85 }),
      React.createElement('text', {
        key: 't', x: 144, y: 100, fontFamily: 'Orbitron', fontWeight: 700,
        fontSize: 22, fill: '#0f0', style: { filter: 'drop-shadow(0 0 6px #0f0)' }
      }, 'Personal')
    ]);
  }
  // modelviz
  return React.createElement('svg', {
    viewBox: '0 0 240 200', width: '100%', height: '100%',
    preserveAspectRatio: 'xMidYMid slice', 'aria-hidden': true
  }, [
    React.createElement('rect', { key: 'bg', width: 240, height: 200, fill: '#000' }),
    React.createElement('polygon', {
      key: 'hex',
      points: '120,40 168,70 168,130 120,160 72,130 72,70',
      fill: 'none', stroke: '#0f0', strokeWidth: 1.5,
      style: { filter: 'drop-shadow(0 0 8px #0f0)' }
    }),
    React.createElement('circle', { key: 'c1', cx: 100, cy: 92, r: 3, fill: '#0f0' }),
    React.createElement('circle', { key: 'c2', cx: 140, cy: 92, r: 3, fill: '#0f0' }),
    React.createElement('circle', { key: 'c3', cx: 120, cy: 118, r: 3, fill: '#0f0' }),
    React.createElement('text', {
      key: 't', x: 120, y: 184, textAnchor: 'middle',
      fontFamily: 'Orbitron', fontSize: 14, fill: '#0f0',
      style: { filter: 'drop-shadow(0 0 4px #0f0)' }
    }, 'ModelViz')
  ]);
}

function TerminalHero() {
  const text = useTypingPhrase();
  return React.createElement('section', { style: { paddingTop: 16 } }, [
    React.createElement('div', { key: 'win', className: 'term-window' }, [
      React.createElement('div', { key: 'bar', className: 'term-bar' }, [
        React.createElement('div', { key: 'd', className: 'term-bar-dots' }, [
          React.createElement('span', { key: 1 }),
          React.createElement('span', { key: 2 }),
          React.createElement('span', { key: 3 })
        ]),
        React.createElement('span', { key: 'p', className: 'term-bar-path' }, 'tom@matrix ~ ')
      ]),
      React.createElement('div', { key: 'body', className: 'term-body' }, [
        React.createElement('h1', { key: 'h', className: 'h1-hero' }, "Hey, I'm Tom"),
        React.createElement('div', { key: 'typ', className: 'typing-block' }, [
          React.createElement('span', { key: 'pre', className: 'pre' }, '// I build '),
          React.createElement('span', { key: 'w', className: 'word' }, text),
          React.createElement('span', { key: 'cur', className: 'cur' })
        ]),
        React.createElement('p', {
          key: 'sub',
          style: {
            marginTop: 12, fontFamily: 'Exo 2', fontSize: 14,
            color: 'oklch(0.65 0.03 145)', margin: '12px 0 0'
          }
        }, 'Full Stack AI Engineer from the UK'),
        React.createElement('div', {
          key: 'ctas',
          style: { marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }
        }, [
          React.createElement('button', { key: 'cta1', className: 'btn btn-default' }, [
            'View Projects',
            React.createElement(Icon, { key: 'i', name: 'arrowRight' })
          ]),
          React.createElement('button', { key: 'cta2', className: 'btn btn-outline' }, 'Get in Touch')
        ])
      ])
    ]),
    /* Featured artwork tiles — v3.5 character restored */
    React.createElement('div', {
      key: 'tiles',
      style: {
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 16, marginTop: 32
      }
    }, ['matrix-arcade', 'personal', 'modelviz'].map((k) =>
      React.createElement('div', {
        key: k, className: 'card',
        style: { padding: 0, aspectRatio: '6/5', overflow: 'hidden' }
      },
        React.createElement(ArtworkTile, { kind: k })
      )
    )),
    React.createElement('div', {
      key: 'featlabel',
      style: { textAlign: 'center', marginTop: 16 }
    },
      React.createElement('span', { className: 'eyebrow' }, [
        React.createElement(Icon, { key: 'i', name: 'star', size: 12, style: { color: 'oklch(0.80 0.15 85)' } }),
        ' featured_projects'
      ])
    )
  ]);
}

window.TerminalHero = TerminalHero;
