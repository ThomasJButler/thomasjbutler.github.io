/* ContactSection.jsx — banner + Get in Touch + two-column (info + form) */

function ContactBanner() {
  /* Gradient banner with simple SVG illustration recreating the "Thomas Butler — Full‑Stack Engineer" hero */
  return React.createElement('div', {
    style: {
      borderRadius: 12, overflow: 'hidden',
      border: '1px solid oklch(0.50 0.28 145 / 0.2)',
      marginBottom: 32
    }
  }, React.createElement('svg', {
    viewBox: '0 0 1024 280', width: '100%', height: 'auto',
    preserveAspectRatio: 'xMidYMid slice',
    'aria-hidden': true,
    style: { display: 'block' }
  }, [
    React.createElement('defs', { key: 'd' }, [
      React.createElement('linearGradient', { key: 'g', id: 'banner-grad', x1: 0, y1: 0, x2: 1, y2: 1 }, [
        React.createElement('stop', { key: 1, offset: 0, stopColor: '#4ec3b8' }),
        React.createElement('stop', { key: 2, offset: 0.55, stopColor: '#b4d962' }),
        React.createElement('stop', { key: 3, offset: 1, stopColor: '#f4e07a' })
      ])
    ]),
    React.createElement('rect', { key: 'bg', width: 1024, height: 280, fill: 'url(#banner-grad)' }),
    /* organic blob */
    React.createElement('path', {
      key: 'blob',
      d: 'M40,40 Q160,10 240,60 T420,80 Q360,160 240,180 T80,200 Q20,140 40,40 Z',
      fill: '#5fb8ad', opacity: 0.55
    }),
    React.createElement('path', {
      key: 'wave',
      d: 'M60 100 Q160 60 260 100 T460 100',
      stroke: 'white', strokeWidth: 2, fill: 'none', opacity: 0.7
    }),
    /* down chevron */
    React.createElement('polyline', {
      key: 'chev',
      points: '470,30 510,80 550,30',
      stroke: '#4a73a8', strokeWidth: 3, fill: 'none', opacity: 0.5
    }),
    /* yellow corner */
    React.createElement('circle', { key: 'sun', cx: 1000, cy: 30, r: 50, fill: '#f4e07a', opacity: 0.7 }),
    /* title */
    React.createElement('text', {
      key: 'n', x: 520, y: 152, textAnchor: 'middle',
      fontFamily: 'Orbitron', fontSize: 48, fontWeight: 600,
      fill: '#3a6fb5', letterSpacing: '0.02em'
    }, 'Thomas Butler'),
    React.createElement('text', {
      key: 's', x: 520, y: 188, textAnchor: 'middle',
      fontFamily: 'Orbitron', fontSize: 18, letterSpacing: '0.18em',
      fill: '#a4c8e8'
    }, 'FULL-STACK ENGINEER'),
    /* Character: simple seated figure with laptop */
    React.createElement('g', { key: 'char', transform: 'translate(720, 60)' }, [
      /* head */
      React.createElement('circle', { key: 'head', cx: 80, cy: 38, r: 22, fill: '#fafbff', stroke: '#1b2a4a', strokeWidth: 2 }),
      /* hair */
      React.createElement('path', { key: 'hair', d: 'M58,30 Q60,16 80,16 Q100,16 102,30 Q92,22 80,22 Q68,22 58,30 Z', fill: '#2a3a52' }),
      /* glasses */
      React.createElement('circle', { key: 'g1', cx: 72, cy: 40, r: 4, fill: 'none', stroke: '#1b2a4a', strokeWidth: 1.5 }),
      React.createElement('circle', { key: 'g2', cx: 88, cy: 40, r: 4, fill: 'none', stroke: '#1b2a4a', strokeWidth: 1.5 }),
      React.createElement('line', { key: 'gb', x1: 76, y1: 40, x2: 84, y2: 40, stroke: '#1b2a4a', strokeWidth: 1.5 }),
      /* body */
      React.createElement('path', { key: 'body', d: 'M44,72 Q44,60 80,60 Q116,60 116,72 L120,140 Q80,150 40,140 Z', fill: '#5a8bce', stroke: '#1b2a4a', strokeWidth: 2 }),
      /* legs */
      React.createElement('path', { key: 'legs', d: 'M40,138 L20,180 Q60,184 80,168 Q100,184 140,180 L120,138 Z', fill: '#bcd0e3', stroke: '#1b2a4a', strokeWidth: 2 }),
      /* laptop */
      React.createElement('path', { key: 'lap', d: 'M22,168 L138,168 L150,180 L10,180 Z', fill: '#7fa6d3', stroke: '#1b2a4a', strokeWidth: 2 }),
      React.createElement('rect', { key: 'screen', x: 36, y: 130, width: 90, height: 40, rx: 3, fill: '#1b2a4a' }),
      React.createElement('circle', { key: 'apple', cx: 81, cy: 150, r: 4, fill: '#7fa6d3', opacity: 0.4 })
    ])
  ]));
}

function ContactSection() {
  return React.createElement('section', { style: { paddingTop: 16 } }, [
    React.createElement(ContactBanner, { key: 'banner' }),
    React.createElement('div', {
      key: 'hd',
      style: { textAlign: 'center', marginBottom: 32 }
    }, [
      React.createElement('h1', {
        key: 'h',
        className: 'section-title',
        style: { fontSize: 'clamp(28px, 4vw, 44px)' }
      }, 'Get in Touch'),
      React.createElement('p', {
        key: 'p',
        style: {
          marginTop: 8, fontFamily: 'Share Tech Mono', fontSize: 13,
          color: 'oklch(0.50 0.28 145 / 0.7)'
        }
      }, "// Whether it's a project, opportunity, or just a chat about code")
    ]),
    React.createElement('div', {
      key: 'cols',
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 24
      }
    }, [
      /* Left: info */
      React.createElement('div', { key: 'left' }, [
        React.createElement('div', { key: 'loc', style: { marginBottom: 24 } }, [
          React.createElement('div', {
            key: 'h', style: { display: 'flex', alignItems: 'center', gap: 8, color: 'oklch(0.50 0.28 145)' }
          }, [
            React.createElement(Icon, { key: 'i', name: 'mapPin', size: 16 }),
            React.createElement('strong', {
              key: 't',
              style: { fontFamily: 'Orbitron', fontSize: 15, color: 'inherit' }
            }, 'Location')
          ]),
          React.createElement('div', {
            key: 'b',
            style: {
              marginLeft: 24, marginTop: 4, fontFamily: 'Exo 2', fontSize: 13,
              color: 'oklch(0.65 0.03 145)', lineHeight: 1.6
            }
          }, ['York, UK', React.createElement('br', { key: 'br' }), 'Available remotely'])
        ]),
        React.createElement('div', { key: 'em', style: { marginBottom: 24 } }, [
          React.createElement('div', {
            key: 'h', style: { display: 'flex', alignItems: 'center', gap: 8, color: 'oklch(0.50 0.28 145)' }
          }, [
            React.createElement(Icon, { key: 'i', name: 'mail', size: 16 }),
            React.createElement('strong', {
              key: 't',
              style: { fontFamily: 'Orbitron', fontSize: 15, color: 'inherit' }
            }, 'Email')
          ]),
          React.createElement('div', {
            key: 'b',
            style: {
              marginLeft: 24, marginTop: 4, fontFamily: 'Share Tech Mono', fontSize: 13,
              color: 'oklch(0.65 0.03 145)'
            }
          }, 'dev@thomasjbutler.me')
        ]),
        React.createElement('div', { key: 'ph', style: { marginBottom: 24 } }, [
          React.createElement('div', {
            key: 'h', style: { display: 'flex', alignItems: 'center', gap: 8, color: 'oklch(0.50 0.28 145)' }
          }, [
            React.createElement(Icon, { key: 'i', name: 'phone', size: 16 }),
            React.createElement('strong', {
              key: 't',
              style: { fontFamily: 'Orbitron', fontSize: 15, color: 'inherit' }
            }, 'Phone')
          ]),
          React.createElement('div', {
            key: 'b',
            style: {
              marginLeft: 24, marginTop: 4, fontFamily: 'Share Tech Mono', fontSize: 13,
              color: 'oklch(0.65 0.03 145)'
            }
          }, '+44 7903352059')
        ]),
        React.createElement('div', { key: 'av', style: { marginBottom: 24 } }, [
          React.createElement('div', {
            key: 'h', style: { display: 'flex', alignItems: 'center', gap: 8, color: 'oklch(0.50 0.28 145)' }
          }, [
            React.createElement(Icon, { key: 'i', name: 'sparkles', size: 16 }),
            React.createElement('strong', {
              key: 't',
              style: { fontFamily: 'Orbitron', fontSize: 15, color: 'inherit' }
            }, 'Availability')
          ]),
          React.createElement('div', {
            key: 'b',
            style: {
              marginLeft: 24, marginTop: 4, fontFamily: 'Exo 2', fontSize: 13,
              color: 'oklch(0.65 0.03 145)', lineHeight: 1.6
            }
          }, ['Full-time & freelance', React.createElement('br', { key: 'br' }), 'Resume upon request'])
        ]),
        React.createElement('div', { key: 'connect', className: 'card' }, [
          React.createElement('div', {
            key: 'h',
            style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }
          }, [
            React.createElement(Icon, { key: 'i', name: 'terminal', size: 14, style: { color: 'oklch(0.50 0.28 145)' } }),
            React.createElement('span', { key: 't', className: 'eyebrow' }, 'connect')
          ]),
          React.createElement('div', {
            key: 'r1',
            style: { display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0', fontFamily: 'Exo 2', fontSize: 13 }
          }, [
            React.createElement(GithubIcon, { key: 'i' }),
            'github.com/ThomasJButler'
          ]),
          React.createElement('div', {
            key: 'r2',
            style: { display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0', fontFamily: 'Exo 2', fontSize: 13 }
          }, [
            React.createElement(LinkedinIcon, { key: 'i' }),
            'linkedin.com/in/thomasjbutler'
          ]),
          React.createElement('div', {
            key: 'r3',
            style: { display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0', fontFamily: 'Exo 2', fontSize: 13 }
          }, [
            React.createElement('span', { key: 'i', style: { fontSize: 14 } }, '☕'),
            'Buy me a coffee'
          ])
        ])
      ]),
      /* Right: form */
      React.createElement('form', {
        key: 'right',
        className: 'card',
        onSubmit: (e) => { e.preventDefault(); alert('(prototype — message not sent)'); }
      }, [
        React.createElement('h3', {
          key: 'h',
          style: { margin: '0 0 12px', fontFamily: 'Orbitron', fontSize: 18 }
        }, 'Send a Message'),
        React.createElement('div', { key: 'n', className: 'field' }, [
          React.createElement('label', { key: 'l' }, 'Name *'),
          React.createElement('input', { key: 'i', placeholder: 'Your name', required: true })
        ]),
        React.createElement('div', { key: 'e', className: 'field' }, [
          React.createElement('label', { key: 'l' }, 'Email *'),
          React.createElement('input', { key: 'i', placeholder: 'you@example.com', type: 'email', required: true })
        ]),
        React.createElement('div', { key: 'p', className: 'field' }, [
          React.createElement('label', { key: 'l' }, 'Phone'),
          React.createElement('input', { key: 'i', placeholder: '+44 …' })
        ]),
        React.createElement('div', { key: 's', className: 'field' }, [
          React.createElement('label', { key: 'l' }, 'Subject *'),
          React.createElement('input', { key: 'i', placeholder: 'What is this about?', required: true })
        ]),
        React.createElement('div', { key: 'm', className: 'field' }, [
          React.createElement('label', { key: 'l' }, 'Message *'),
          React.createElement('textarea', { key: 'i', placeholder: 'Tell me about your project or idea…', required: true })
        ]),
        React.createElement('div', {
          key: 'btn',
          style: { display: 'flex', justifyContent: 'flex-end', marginTop: 4 }
        },
          React.createElement('button', { type: 'submit', className: 'btn btn-default' }, [
            'Send Message',
            React.createElement(Icon, { key: 'i', name: 'arrowRight' })
          ])
        )
      ])
    ]),
    /* 4-step strip */
    React.createElement('div', {
      key: 'steps',
      style: {
        marginTop: 32,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 12
      }
    }, [
      { icon: 'mail',    title: '1. Discovery Call',  desc: 'Free consultation to understand your goals, timeline, and requirements.' },
      { icon: 'package', title: '2. Detailed Quote',  desc: 'Clear, itemised proposal with no hidden costs or surprises.' },
      { icon: 'zap',     title: '3. Build & Deliver', desc: 'Agile development with regular updates and milestone reviews.' },
      { icon: 'shield',  title: '4. Ongoing Support', desc: 'Post-launch support, maintenance, and future enhancements.' }
    ].map((s) =>
      React.createElement('div', { key: s.title, className: 'card', style: { padding: 14 } }, [
        React.createElement('div', {
          key: 'h',
          style: { display: 'flex', alignItems: 'center', gap: 8 }
        }, [
          React.createElement(Icon, { key: 'i', name: s.icon, size: 14, style: { color: 'oklch(0.50 0.28 145)' } }),
          React.createElement('strong', {
            key: 't',
            style: { fontFamily: 'Orbitron', fontSize: 13 }
          }, s.title)
        ]),
        React.createElement('p', {
          key: 'd',
          style: { margin: '8px 0 0', fontFamily: 'Exo 2', fontSize: 12, lineHeight: 1.5, color: 'oklch(0.60 0.03 145)' }
        }, s.desc)
      ])
    ))
  ]);
}

window.ContactSection = ContactSection;
