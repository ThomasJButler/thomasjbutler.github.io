/* ProjectsSection.jsx — Featured + filterable all-projects grid */

const PROJECTS = [
  { id: 'modelviz',     name: 'ModelViz',                desc: 'Compare AI models across providers with real-time metrics, cost analysis, and 3D visualisations.', cat: 'ai',       lang: 'TypeScript', langColor: '#3178c6', topics: ['Next.js','React 19','TypeScript','Three.js'], featured: true,  links: { demo: '#', github: '#' } },
  { id: 'commercial',   name: 'Commercial Portfolio',    desc: 'Professional commercial portfolio showcasing 3+ years of full-stack development. Built with React v2.0 architecture.', cat: 'web', lang: 'TypeScript', langColor: '#3178c6', topics: ['React','TypeScript','Vite','Node.js'], featured: true, links: { demo: '#', github: '#' } },
  { id: 'arcade',       name: 'The Matrix Arcade',       desc: 'Collection of 6 Matrix-themed arcade games: CTRL-S, Snake, Vortex Pong, Matrix Cloud, Matrix Invaders, and Metris.', cat: 'creative', lang: 'JavaScript', langColor: '#f1e05a', topics: ['React','Canvas API','Vite','Game Dev'], featured: true, links: { demo: '#', github: '#' } },
  { id: 'sql-ball',     name: 'SQL Ball Analytics',      desc: 'Football analytics platform converting natural language to SQL queries across 20+ collated datasets.', cat: 'ai',       lang: 'Python', langColor: '#3572A5', topics: ['Supabase','LangChain','OpenAI','RAG'] },
  { id: 'morpheus',     name: 'Morpheus',                 desc: 'Intelligent document Q&A with semantic search and source citations using RAG.', cat: 'ai',       lang: 'Python', langColor: '#3572A5', topics: ['Pinecone','Anthropic','LangChain','FastAPI'] },
  { id: 'reviewbot',    name: 'ReviewBot Protocol',       desc: 'AI-powered GitHub PR review system with automated code analysis and intelligent feedback.', cat: 'ai',       lang: 'TypeScript', langColor: '#3178c6', topics: ['Next.js','LangGraph','FastAPI','GitHub API'] },
  { id: 'news',         name: 'News Perspective',         desc: 'AI-powered news analysis that rewrites sensationalised headlines and generates balanced takes.', cat: 'ai',       lang: 'Python', langColor: '#3572A5', topics: ['Azure OpenAI','AI Search','Python','Streamlit'] },
  { id: 'lfc',          name: 'LFC News App',             desc: 'Distraction-free Reddit viewer for LFC content. No ads, no tracking, three kit themes.', cat: 'personal', lang: 'JavaScript', langColor: '#f1e05a', topics: ['React','Redux','Reddit API'] },
  { id: 'calendar',     name: '.NET/React Calendar',      desc: 'Full-stack calendar app with .NET Core 9 FastEndpoints backend and React frontend.', cat: 'web',      lang: 'C#', langColor: '#178600', topics: ['.NET','React','C#','Fast Endpoints'] },
  { id: 'css-show',     name: 'CSS Learning Showcase',    desc: 'Interactive CSS reference with 30+ pages of live demos, playgrounds, and modern techniques.', cat: 'web',      lang: 'CSS', langColor: '#563d7c', topics: ['CSS',':has()','Container Queries','Responsive'] },
  { id: 'bigbang',      name: 'Big Bang Canvas',          desc: 'Responsive gallery of 50+ AI-generated cosmic artworks with 3D tilt effects.', cat: 'creative', lang: 'JavaScript', langColor: '#f1e05a', topics: ['Canvas','Animation','Creative','Design'] },
  { id: 'pyhobby',      name: 'Python Projects Collection', desc: 'Collection of Python hobby projects: mathematical tools, climate visualisation, games.', cat: 'personal', lang: 'Python', langColor: '#3572A5', topics: ['Python','Algorithms','ML','Games'] },
  { id: 'timetravel',   name: 'Version TimeTravel',       desc: 'Interactive timeline showcasing 9 portfolio versions from static HTML to modern React.', cat: 'personal', lang: 'JavaScript', langColor: '#f1e05a', topics: ['Timeline','Interactive','History'] }
];

const CATEGORIES = [
  { id: 'all',      label: 'All' },
  { id: 'ai',       label: 'AI & ML' },
  { id: 'web',      label: 'Web' },
  { id: 'creative', label: 'Creative' },
  { id: 'personal', label: 'Personal' }
];
const CAT_LABEL = { ai: 'AI & ML', web: 'Web', creative: 'Creative', personal: 'Personal' };
const CAT_VARIANT = { ai: 'cyan', web: 'secondary', creative: 'amber', personal: 'secondary' };

function ProjectCard({ p }) {
  return React.createElement('div', {
    className: 'card',
    'data-cat': p.cat,
    'data-featured': p.featured ? '' : undefined,
    style: { height: '100%' }
  }, [
    React.createElement('h3', { key: 'h', className: 'card-title' }, p.name),
    React.createElement('p', { key: 'd', className: 'card-desc' }, p.desc),
    React.createElement('div', {
      key: 't',
      style: { display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }
    }, p.topics.map((t) =>
      React.createElement('span', { key: t, className: 'badge badge-secondary' }, t)
    )),
    React.createElement('div', {
      key: 'meta',
      style: {
        display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto',
        paddingTop: 8, fontFamily: 'Share Tech Mono', fontSize: 11,
        color: 'oklch(0.60 0.03 145)'
      }
    }, [
      React.createElement('span', { key: 'lang', style: { display: 'inline-flex', alignItems: 'center', gap: 6 } }, [
        React.createElement('span', {
          key: 'dot',
          style: {
            width: 8, height: 8, borderRadius: 999, background: p.langColor
          }
        }),
        p.lang
      ]),
      React.createElement('span', {
        key: 'cat',
        className: 'badge badge-' + CAT_VARIANT[p.cat],
        style: { height: 16, fontSize: 10, padding: '0 6px' }
      }, CAT_LABEL[p.cat] || p.cat)
    ]),
    React.createElement('div', {
      key: 'links',
      style: { display: 'flex', gap: 6, marginTop: 8 }
    }, [
      p.links?.demo && React.createElement('a', {
        key: 'd', href: '#', className: 'btn btn-ghost btn-xs',
        onClick: (e) => e.preventDefault()
      }, [
        React.createElement(Icon, { key: 'i', name: 'externalLink', size: 12 }),
        ' Live'
      ]),
      p.links?.github && React.createElement('a', {
        key: 'g', href: '#', className: 'btn btn-ghost btn-xs',
        onClick: (e) => e.preventDefault()
      }, [
        React.createElement(GithubIcon, { key: 'i', size: 12 }),
        ' Code'
      ])
    ].filter(Boolean))
  ]);
}

function ProjectsSection() {
  const [cat, setCat] = React.useState('all');
  const filtered = cat === 'all' ? PROJECTS : PROJECTS.filter((p) => p.cat === cat);
  const featured = PROJECTS.filter((p) => p.featured);
  return React.createElement('section', { style: { paddingTop: 16 } }, [
    React.createElement('div', {
      key: 'head',
      style: { marginBottom: 24 }
    }, [
      React.createElement('h1', { key: 'h', className: 'section-title' }, 'Projects'),
      React.createElement('p', {
        key: 'p',
        style: {
          marginTop: 8, fontFamily: 'Exo 2', fontSize: 14,
          color: 'oklch(0.65 0.03 145)'
        }
      }, 'A collection of AI, web, and creative projects.')
    ]),
    React.createElement('div', {
      key: 'feat',
      style: { marginBottom: 32 }
    }, [
      React.createElement('div', {
        key: 'h',
        style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }
      }, [
        React.createElement(Icon, { key: 'i', name: 'star', size: 14, style: { color: 'oklch(0.80 0.15 85)' } }),
        React.createElement('span', { key: 'l', className: 'eyebrow' }, 'featured'),
        React.createElement('div', {
          key: 'r',
          style: {
            flex: 1, height: 1,
            background: 'linear-gradient(90deg, oklch(0.50 0.28 145 / 0.2), transparent)'
          }
        })
      ]),
      React.createElement('div', {
        key: 'grid',
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16
        }
      }, featured.map((p) => React.createElement(ProjectCard, { key: p.id, p })))
    ]),
    React.createElement('div', {
      key: 'allhead',
      style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }
    }, [
      React.createElement(Icon, { key: 'i', name: 'terminal', size: 14, style: { color: 'oklch(0.50 0.28 145)' } }),
      React.createElement('span', { key: 'l', className: 'eyebrow' }, 'all_projects'),
      React.createElement('div', {
        key: 'r',
        style: {
          flex: 1, height: 1,
          background: 'linear-gradient(90deg, oklch(0.50 0.28 145 / 0.2), transparent)'
        }
      })
    ]),
    React.createElement('div', {
      key: 'tabs',
      style: { display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }
    }, CATEGORIES.map((c) =>
      React.createElement('button', {
        key: c.id,
        className: 'app-nav-link' + (cat === c.id ? ' active' : ''),
        onClick: () => setCat(c.id)
      }, [
        c.label,
        ' ',
        React.createElement('span', {
          key: 'count',
          style: { fontSize: 10, opacity: 0.6, marginLeft: 4 }
        }, '(' + (c.id === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.cat === c.id).length) + ')')
      ])
    )),
    React.createElement('div', {
      key: 'grid',
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 16
      }
    }, filtered.map((p) => React.createElement(ProjectCard, { key: p.id, p })))
  ]);
}

window.ProjectsSection = ProjectsSection;
