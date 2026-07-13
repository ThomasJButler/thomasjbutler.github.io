/* ServicesSection.jsx + AboutSection.jsx — combined */

const SERVICES = [
  { icon: 'globe',   title: 'Website & Web Apps',  desc: 'Responsive, performance-first websites and web apps built with modern stacks.',
    bullets: ['React/Next.js', 'Performance & SEO', 'Accessible & Responsive'],
    tags: ['React','TypeScript','WordPress','HubSpot','Next.js'] },
  { icon: 'database', title: 'Backend & APIs',     desc: 'Robust servers and APIs that scale with your product. Production-ready from day one.',
    bullets: ['Node.js/Python', 'PostgreSQL/MongoDB', 'Auth & Security'],
    tags: ['Node.js','Django','PostgreSQL','GraphQL','Flask'] },
  { icon: 'bot',     title: 'AI & Automation',     desc: 'Practical AI features and automation to save time and make data useful.',
    bullets: ['GPT Integration', 'n8n Workflows', 'Custom ML Models'],
    tags: ['ChatGPT','Claude','PyTorch','TensorFlow','n8n'] },
  { icon: 'cpu',     title: 'Mobile Applications', desc: 'Cross-platform apps with native feel and store readiness.',
    bullets: ['React Native', 'iOS & Android', 'Push & Offline'],
    tags: ['React Native','Expo','iOS','Android'] },
  { icon: 'palette', title: 'Design & Brand',      desc: 'Clear, usable interfaces and identity design that scales with your product.',
    bullets: ['UI/UX Design', 'Brand Identity', 'Design Systems'],
    tags: ['Figma','Adobe XD','UI/UX','Wireframes'] },
  { icon: 'shield',  title: 'Consultancy & Custom',desc: 'Architecture reviews, training and bespoke engineering for special requirements.',
    bullets: ['Architecture Review', 'Team Training', 'Bespoke Solutions'],
    tags: ['DevOps','Git','Agile','Testing','Cloud'] }
];

const CREDENTIALS = [
  { label: 'Cloud & Infrastructure',
    items: ['AWS Qualified', 'Azure Qualified', 'Cisco Qualified', 'Vercel · Netlify · Docker'] },
  { label: 'Engineering & AI',
    items: ['Level 4 Software Developer Apprenticeship (2023–24)', 'Generative AI & Agents Bootcamp (Sep 2025)', 'City & Guilds Level 2 ICT (May 2025)'] },
  { label: 'Platforms',
    items: ['HubSpot Qualified', 'WordPress / Themes', 'Umbraco / .NET'] }
];

function ServiceCard({ s }) {
  return React.createElement('div', { className: 'card', style: { height: '100%' } }, [
    React.createElement('div', {
      key: 'h',
      style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }
    }, [
      React.createElement('div', {
        key: 'i',
        style: {
          width: 28, height: 28, borderRadius: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'oklch(0.50 0.28 145 / 0.10)',
          color: 'oklch(0.50 0.28 145)'
        }
      }, React.createElement(Icon, { name: s.icon, size: 15 })),
      React.createElement('h3', {
        key: 't',
        style: {
          margin: 0, fontFamily: 'Orbitron', fontSize: 15,
          letterSpacing: '0.05em'
        }
      }, s.title)
    ]),
    React.createElement('p', { key: 'd', className: 'card-desc' }, s.desc),
    React.createElement('ul', {
      key: 'b',
      style: { margin: '4px 0', padding: 0, listStyle: 'none' }
    }, s.bullets.map((b) =>
      React.createElement('li', {
        key: b,
        style: {
          fontFamily: 'Share Tech Mono', fontSize: 12,
          color: 'oklch(0.65 0.03 145)', padding: '3px 0'
        }
      }, [
        React.createElement('span', { key: 'g', style: { color: 'oklch(0.50 0.28 145 / 0.6)', marginRight: 6 } }, '›'),
        b
      ])
    )),
    React.createElement('div', {
      key: 't',
      style: { display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }
    }, s.tags.map((t) =>
      React.createElement('span', { key: t, className: 'badge badge-outline' }, t)
    ))
  ]);
}

function CredentialRow({ c, open, onToggle }) {
  return React.createElement('div', {
    style: {
      borderTop: '1px solid oklch(0.22 0.04 145 / 0.5)',
      padding: '14px 0'
    }
  }, [
    React.createElement('button', {
      key: 'btn',
      onClick: onToggle,
      style: {
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'transparent', border: 0, cursor: 'pointer', padding: 0,
        fontFamily: 'Orbitron', fontSize: 15, color: 'inherit', textAlign: 'left'
      }
    }, [
      c.label,
      React.createElement('span', {
        key: 'i',
        style: {
          transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s',
          color: 'oklch(0.50 0.28 145)'
        }
      }, '⌄')
    ]),
    open && React.createElement('ul', {
      key: 'l',
      style: {
        marginTop: 8, padding: 0, listStyle: 'none',
        fontFamily: 'Exo 2', fontSize: 13,
        color: 'oklch(0.60 0.03 145)'
      }
    }, c.items.map((it) =>
      React.createElement('li', { key: it, style: { padding: '4px 0' } }, [
        React.createElement('span', {
          key: 'g',
          style: { color: 'oklch(0.50 0.28 145 / 0.6)', marginRight: 6 }
        }, '›'),
        it
      ])
    ))
  ]);
}

function ServicesSection() {
  const [open, setOpen] = React.useState(null);
  return React.createElement('section', { style: { paddingTop: 16 } }, [
    React.createElement('div', { key: 'eyebrow', style: { marginBottom: 8 } },
      React.createElement('span', { className: 'eyebrow' }, 'services')
    ),
    React.createElement('h1', { key: 'h', className: 'section-title' }, 'What I Build'),
    React.createElement('p', {
      key: 'p',
      style: {
        marginTop: 12, fontFamily: 'Exo 2', fontSize: 14, maxWidth: '60ch',
        color: 'oklch(0.65 0.03 145)'
      }
    }, 'Fast, resilient digital products. From performance-first websites to AI integrations and mobile apps — I handle the architecture, delivery, and support so you can focus on outcomes.'),
    React.createElement('div', {
      key: 'grid',
      style: {
        marginTop: 32,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 16
      }
    }, SERVICES.map((s) => React.createElement(ServiceCard, { key: s.title, s }))),
    React.createElement('div', { key: 'div', className: 'section-divider' }),
    React.createElement('div', {
      key: 'cred-eyebrow',
      style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }
    }, [
      React.createElement(Icon, { key: 'i', name: 'package', size: 14, style: { color: 'oklch(0.50 0.28 145)' } }),
      React.createElement('span', { key: 'l', className: 'eyebrow' }, 'credentials')
    ]),
    React.createElement('div', { key: 'cred' }, CREDENTIALS.map((c, i) =>
      React.createElement(CredentialRow, {
        key: c.label,
        c,
        open: open === i,
        onToggle: () => setOpen(open === i ? null : i)
      })
    )),
    React.createElement('div', {
      key: 'cta',
      style: {
        marginTop: 56, padding: 24, borderRadius: 10,
        border: '1px solid oklch(0.50 0.28 145 / 0.25)',
        textAlign: 'center'
      }
    }, [
      React.createElement('h2', {
        key: 'h',
        style: { margin: 0, fontFamily: 'Orbitron', fontSize: 22 }
      }, "Let's Build Something Great"),
      React.createElement('p', {
        key: 'p',
        style: { marginTop: 8, fontFamily: 'Exo 2', fontSize: 13, color: 'oklch(0.65 0.03 145)' }
      }, "Free consultation. No obligation. Let's discuss your project."),
      React.createElement('div', {
        key: 'btns',
        style: { marginTop: 16, display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }
      }, [
        React.createElement('button', { key: 'b1', className: 'btn btn-default' }, [
          'Get in Touch',
          React.createElement(Icon, { key: 'i', name: 'arrowRight' })
        ]),
        React.createElement('button', { key: 'b2', className: 'btn btn-outline' }, [
          React.createElement(Icon, { key: 'i', name: 'mail' }),
          'Email Directly'
        ])
      ])
    ])
  ]);
}

/* ──────── About ──────── */

const TIMELINE = [
  { period: '2000s',     title: 'The Beginning',        icon: 'terminal', desc: 'Started with HTML/CSS as a kid, fascinated by the web and inspired by The Matrix.' },
  { period: '2010s',     title: 'Learning & Growth',     icon: 'code',     desc: 'Studied computing, learned JavaScript frameworks, and built first real projects.' },
  { period: '2023–24',   title: 'AI Exploration',        icon: 'bot',      desc: 'Dove into AI/ML, completed bootcamps, built RAG applications and intelligent agents.' },
  { period: '2025',      title: 'Current Focus',         icon: 'package',  desc: 'Full stack AI engineering, building production tools and creative experiments.' }
];
const STACK_TABS = {
  Frontend:        ['React', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Vite'],
  Backend:         ['Node.js', 'Python', 'Django', 'REST APIs', 'PostgreSQL'],
  'Cloud & DevOps':['AWS', 'Azure', 'Vercel', 'Docker', 'CI/CD'],
  'AI & ML':       ['LangChain', 'PyTorch', 'TensorFlow', 'OpenAI', 'Pinecone']
};

function AboutSection() {
  const [tab, setTab] = React.useState('Frontend');
  return React.createElement('section', { style: { paddingTop: 16 } }, [
    React.createElement('div', { key: 'eyebrow', style: { marginBottom: 8 } },
      React.createElement('span', { className: 'eyebrow' }, 'about')
    ),
    React.createElement('h1', { key: 'h', className: 'section-title' }, 'Why I Love Programming'),
    React.createElement('div', {
      key: 'p',
      style: { marginTop: 16, maxWidth: '64ch', fontFamily: 'Exo 2', fontSize: 14, lineHeight: 1.7 }
    }, [
      React.createElement('p', { key: 'p1' }, "Programming is not just a profession for me, it's a passion. There's something magical about transforming ideas into reality through code. The ability to create something from nothing, to build tools that solve real problems, and to see the immediate impact of your work is incredibly satisfying."),
      React.createElement('p', { key: 'p2' }, "What truly captivates me is the puzzle-solving aspect of development. Each challenge is an opportunity to think critically, to break down complex problems into elegant solutions. The moment when everything clicks into place, when the code finally works after hours of debugging, is pure joy."),
      React.createElement('p', { key: 'p3' }, "The technology landscape never stops evolving, and that's what keeps me energised. There's always a new framework to explore, a better pattern to learn, or an innovative approach to discover.")
    ]),
    React.createElement('div', { key: 'div', className: 'section-divider' }),
    React.createElement('div', { key: 'stack-eyebrow', style: { marginBottom: 12 } },
      React.createElement('span', { className: 'eyebrow' }, 'tech_stack')
    ),
    React.createElement('div', {
      key: 'tabs',
      style: { display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }
    }, Object.keys(STACK_TABS).map((k) =>
      React.createElement('button', {
        key: k,
        className: 'app-nav-link' + (tab === k ? ' active' : ''),
        onClick: () => setTab(k)
      }, k)
    )),
    React.createElement('div', {
      key: 'tags',
      style: { display: 'flex', flexWrap: 'wrap', gap: 8 }
    }, STACK_TABS[tab].map((t) =>
      React.createElement('span', { key: t, className: 'badge badge-secondary' }, t)
    )),
    React.createElement('div', { key: 'div2', className: 'section-divider' }),
    React.createElement('div', { key: 'tl-eyebrow', style: { marginBottom: 16 } },
      React.createElement('span', { className: 'eyebrow' }, 'programming_journey')
    ),
    React.createElement('div', {
      key: 'tl',
      style: { position: 'relative', paddingLeft: 28 }
    }, [
      /* vertical line */
      React.createElement('div', {
        key: 'line',
        style: {
          position: 'absolute', left: 10, top: 6, bottom: 6, width: 1,
          background: 'oklch(0.50 0.28 145 / 0.3)'
        }
      }),
      ...TIMELINE.map((t, i) => React.createElement('div', {
        key: t.period,
        style: { position: 'relative', marginBottom: 18 }
      }, [
        React.createElement('div', {
          key: 'dot',
          style: {
            position: 'absolute', left: -22, top: 18,
            width: 10, height: 10, borderRadius: 999,
            background: 'oklch(0.50 0.28 145)',
            boxShadow: '0 0 10px oklch(0.50 0.28 145 / 0.7)'
          }
        }),
        React.createElement('div', { key: 'card', className: 'card', style: { padding: '14px 16px' } }, [
          React.createElement('div', {
            key: 'h',
            style: { display: 'flex', alignItems: 'center', gap: 10 }
          }, [
            React.createElement('div', {
              key: 'i',
              style: {
                width: 28, height: 28, borderRadius: 6,
                background: 'oklch(0.50 0.28 145 / 0.10)',
                color: 'oklch(0.50 0.28 145)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }
            }, React.createElement(Icon, { name: t.icon, size: 14 })),
            React.createElement('div', { key: 'tt' }, [
              React.createElement('div', {
                key: 't', style: { fontFamily: 'Orbitron', fontSize: 14, letterSpacing: '0.04em' }
              }, t.title),
              React.createElement('div', {
                key: 'p',
                style: { fontFamily: 'Share Tech Mono', fontSize: 11, color: 'oklch(0.60 0.03 145)' }
              }, t.period)
            ])
          ]),
          React.createElement('p', {
            key: 'd',
            style: {
              margin: '10px 0 0', fontFamily: 'Exo 2', fontSize: 13, lineHeight: 1.5,
              color: 'oklch(0.65 0.03 145)'
            }
          }, t.desc)
        ])
      ]))
    ])
  ]);
}

window.ServicesSection = ServicesSection;
window.AboutSection = AboutSection;
