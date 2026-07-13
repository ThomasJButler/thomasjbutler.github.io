/* SystemStatus.jsx — // system_status section */

const STATS = [
  { icon: 'gitBranch', value: '15+', label: 'Projects' },
  { icon: 'cpuBox',    value: '7',   label: 'AI Models' },
  { icon: 'globe',     value: '20+', label: 'Deployments' },
  { icon: 'zap',       value: '99.9%', label: 'Uptime' }
];
const SKILLS = [
  { label: 'React / Next.js',  value: 95 },
  { label: 'TypeScript',       value: 90 },
  { label: 'Python / AI',      value: 85 },
  { label: 'Node.js / APIs',   value: 88 },
  { label: 'Cloud / DevOps',   value: 75 }
];
const ACTIVITY = [
  { icon: 'bot',      text: 'Built RAG pipeline with LangChain + Pinecone',  time: '2025', badge: 'AI'   },
  { icon: 'code',     text: 'Shipped ModelViz — AI model comparison platform', time: '2025', badge: 'Web'  },
  { icon: 'database', text: 'SQL Ball: NL-to-SQL football analytics',         time: '2025', badge: 'Data' },
  { icon: 'terminal', text: 'Portfolio redesign with ShadCN + Tailwind v4',   time: '2025', badge: 'Dev'  }
];

function StatCard({ icon, value, label }) {
  return React.createElement('div', { className: 'card', style: { textAlign: 'center', alignItems: 'center' } }, [
    React.createElement('div', {
      key: 'i',
      style: { color: 'oklch(0.50 0.28 145 / 0.65)', display: 'flex', justifyContent: 'center' }
    }, React.createElement(Icon, { name: icon, size: 18 })),
    React.createElement('div', {
      key: 'v',
      style: {
        fontFamily: 'Orbitron', fontSize: 32, fontWeight: 700, lineHeight: 1,
        marginTop: 4,
        textShadow: '0 0 20px oklch(0.50 0.28 145 / 0.20)'
      }
    }, value),
    React.createElement('div', {
      key: 'l',
      style: {
        fontFamily: 'Share Tech Mono', fontSize: 10,
        textTransform: 'uppercase', letterSpacing: '0.15em',
        color: 'oklch(0.60 0.03 145)', marginTop: 4
      }
    }, label)
  ]);
}

function SkillBar({ label, value }) {
  return React.createElement('div', { className: 'skill' }, [
    React.createElement('div', { key: 'r', className: 'skill-row' }, [
      React.createElement('span', { key: 'l', className: 'skill-label' }, label),
      React.createElement('span', { key: 'v', className: 'skill-val' }, value + '%')
    ]),
    React.createElement('div', { key: 't', className: 'skill-track' },
      React.createElement('div', {
        className: 'skill-fill',
        style: { width: value + '%' }
      })
    )
  ]);
}

function SystemStatus() {
  return React.createElement('section', { style: { marginTop: 56 } }, [
    React.createElement('div', {
      key: 'hd',
      style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }
    }, [
      React.createElement(Icon, { key: 'i', name: 'terminal', size: 14, style: { color: 'oklch(0.50 0.28 145)' } }),
      React.createElement('h2', {
        key: 't',
        style: {
          margin: 0, fontFamily: 'Share Tech Mono', fontSize: 12,
          textTransform: 'uppercase', letterSpacing: '0.2em',
          color: 'oklch(0.50 0.28 145 / 0.7)'
        }
      }, 'system_status'),
      React.createElement('div', {
        key: 'r',
        style: {
          flex: 1, height: 1,
          background: 'linear-gradient(90deg, oklch(0.50 0.28 145 / 0.2), transparent)'
        }
      }),
      React.createElement('span', {
        key: 's',
        style: {
          fontFamily: 'Share Tech Mono', fontSize: 10,
          color: 'oklch(0.50 0.28 145 / 0.4)',
          display: 'flex', alignItems: 'center', gap: 6
        }
      }, [
        React.createElement('span', {
          key: 'dot',
          style: {
            width: 6, height: 6, borderRadius: 999,
            background: 'oklch(0.65 0.20 145)',
            boxShadow: '0 0 8px oklch(0.65 0.20 145)'
          }
        }),
        'online'
      ])
    ]),
    React.createElement('div', {
      key: 'stats',
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: 12, marginBottom: 20
      }
    }, STATS.map((s) => React.createElement(StatCard, { key: s.label, ...s }))),
    React.createElement('div', {
      key: 'two',
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 16
      }
    }, [
      React.createElement('div', { key: 'skills', className: 'card' }, [
        React.createElement('div', {
          key: 'h',
          style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }
        }, [
          React.createElement(Icon, { key: 'i', name: 'cpuBox', size: 14, style: { color: 'oklch(0.50 0.28 145 / 0.6)' } }),
          React.createElement('span', {
            key: 't',
            style: {
              fontFamily: 'Share Tech Mono', fontSize: 11,
              textTransform: 'uppercase', letterSpacing: '0.15em'
            }
          }, 'core_skills')
        ]),
        React.createElement('div', {
          key: 'list',
          style: { display: 'flex', flexDirection: 'column', gap: 12 }
        }, SKILLS.map((s) => React.createElement(SkillBar, { key: s.label, ...s })))
      ]),
      React.createElement('div', { key: 'act', className: 'card' }, [
        React.createElement('div', {
          key: 'h',
          style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }
        }, [
          React.createElement(Icon, { key: 'i', name: 'gitBranch', size: 14, style: { color: 'oklch(0.50 0.28 145 / 0.6)' } }),
          React.createElement('span', {
            key: 't',
            style: {
              fontFamily: 'Share Tech Mono', fontSize: 11,
              textTransform: 'uppercase', letterSpacing: '0.15em'
            }
          }, 'recent_activity')
        ]),
        React.createElement('div', {
          key: 'rows',
          style: { display: 'flex', flexDirection: 'column', gap: 14 }
        }, ACTIVITY.map((a, i) =>
          React.createElement('div', { key: i, className: 'activity-row' }, [
            React.createElement('div', { key: 'i', className: 'activity-icon' },
              React.createElement(Icon, { name: a.icon, size: 12 })
            ),
            React.createElement('div', { key: 't', className: 'activity-text' }, [
              React.createElement('p', {
                key: 'p',
                style: { margin: 0, fontFamily: 'Exo 2', fontSize: 13, lineHeight: 1.4 }
              }, a.text),
              React.createElement('div', { key: 'm', className: 'activity-meta' }, [
                React.createElement('span', { key: 'b', className: 'badge badge-secondary', style: { height: 18, fontSize: 9, padding: '0 6px' } }, a.badge),
                React.createElement('span', { key: 't' }, a.time)
              ])
            ])
          ])
        ))
      ])
    ]),
    /* "now" panel */
    React.createElement('div', {
      key: 'now',
      style: {
        marginTop: 16, padding: 20,
        borderRadius: 10,
        border: '1px solid oklch(0.50 0.28 145 / 0.2)',
        background: 'oklch(0.50 0.28 145 / 0.03)'
      }
    }, [
      React.createElement('div', {
        key: 'h',
        style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }
      }, [
        React.createElement(Icon, { key: 'i', name: 'sparkles', size: 14, style: { color: 'oklch(0.50 0.28 145)' } }),
        React.createElement('span', {
          key: 't',
          style: {
            fontFamily: 'Share Tech Mono', fontSize: 11,
            textTransform: 'uppercase', letterSpacing: '0.15em',
            color: 'oklch(0.50 0.28 145 / 0.7)'
          }
        }, 'now')
      ]),
      React.createElement('p', {
        key: 'p',
        style: { margin: 0, fontFamily: 'Exo 2', fontSize: 13, lineHeight: 1.6 }
      }, "Building AI-powered applications and exploring agentic workflows. Currently focused on RAG systems, LangChain integrations, and pushing the boundaries of what's possible with modern web tech."),
      React.createElement('div', {
        key: 'tags',
        style: { display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }
      }, [
        React.createElement('span', { key: 1, className: 'badge badge-cyan' }, 'LangChain'),
        React.createElement('span', { key: 2, className: 'badge badge-cyan' }, 'RAG'),
        React.createElement('span', { key: 3, className: 'badge badge-amber' }, 'Agents'),
        React.createElement('span', { key: 4, className: 'badge badge-secondary' }, 'ShadCN')
      ])
    ])
  ]);
}

window.SystemStatus = SystemStatus;
