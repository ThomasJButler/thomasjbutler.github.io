/* Header + Footer + ThemeToggle for v4.0 kit */

function ThemeToggle({ theme, setTheme }) {
  return React.createElement('button', {
    className: 'iconbtn',
    'aria-label': 'Toggle theme',
    onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark')
  }, React.createElement(Icon, { name: theme === 'dark' ? 'sun' : 'moon' }));
}

function Header({ route, setRoute, theme, setTheme }) {
  const items = [
    { label: 'Home', value: 'home' },
    { label: 'Projects', value: 'projects' },
    { label: 'About', value: 'about' },
    { label: 'Services', value: 'services' },
    { label: 'Contact', value: 'contact' }
  ];
  return React.createElement('header', { className: 'app-header' }, [
    React.createElement('div', { key: 'inner', className: 'app-header-inner' }, [
      React.createElement('a', {
        key: 'logo',
        className: 'app-logo',
        href: '#',
        onClick: (e) => { e.preventDefault(); setRoute('home'); }
      }, [
        React.createElement('span', { key: 'gt', className: 'gt' }, '>'),
        'tom_butler'
      ]),
      React.createElement('nav', { key: 'nav', className: 'app-nav' }, [
        ...items.map((it) =>
          React.createElement('button', {
            key: it.value,
            className: 'app-nav-link' + (route === it.value ? ' active' : ''),
            onClick: () => setRoute(it.value)
          }, it.label)
        ),
        React.createElement('div', { key: 'side', className: 'app-nav-side' }, [
          React.createElement('a', {
            key: 'gh',
            className: 'iconbtn',
            href: 'https://github.com/thomasjbutler',
            target: '_blank',
            rel: 'noopener noreferrer',
            'aria-label': 'GitHub'
          }, React.createElement(GithubIcon)),
          React.createElement('a', {
            key: 'li',
            className: 'iconbtn',
            href: 'https://linkedin.com/in/thomasbutleruk',
            target: '_blank',
            rel: 'noopener noreferrer',
            'aria-label': 'LinkedIn'
          }, React.createElement(LinkedinIcon)),
          React.createElement(ThemeToggle, { key: 'tt', theme, setTheme })
        ])
      ])
    ]),
    React.createElement('div', { key: 'glow', className: 'header-glow' })
  ]);
}

function Footer() {
  return React.createElement('footer', { className: 'app-footer' }, [
    React.createElement('div', { key: 'glow', className: 'header-glow' }),
    React.createElement('div', { key: 'inner', className: 'app-footer-inner' }, [
      React.createElement('span', { key: 'left' }, [
        React.createElement('span', { key: 'gt', className: 'gt' }, '> '),
        '© ',
        new Date().getFullYear(),
        ' Tom Butler',
        React.createElement('span', { key: 'cur', className: 'cur' })
      ]),
      React.createElement('div', {
        key: 'right',
        style: { display: 'flex', gap: '12px', alignItems: 'center' }
      }, [
        React.createElement('a', {
          key: 'gh',
          className: 'iconbtn',
          href: 'https://github.com/thomasjbutler',
          target: '_blank', rel: 'noopener noreferrer',
          'aria-label': 'GitHub'
        }, React.createElement(GithubIcon)),
        React.createElement('a', {
          key: 'li',
          className: 'iconbtn',
          href: 'https://linkedin.com/in/thomasbutleruk',
          target: '_blank', rel: 'noopener noreferrer',
          'aria-label': 'LinkedIn'
        }, React.createElement(LinkedinIcon)),
        React.createElement('a', {
          key: 'mail',
          className: 'iconbtn',
          href: 'mailto:dev@thomasjbutler.me',
          'aria-label': 'Email'
        }, React.createElement(Icon, { name: 'mail' })),
        React.createElement('span', {
          key: 'sep',
          style: { opacity: 0.3, margin: '0 4px' }
        }, '|'),
        React.createElement('a', {
          key: 'tt',
          href: 'https://thomasjbutler.github.io/version-timetravel/',
          target: '_blank',
          rel: 'noopener noreferrer',
          style: {
            fontFamily: '"Share Tech Mono", monospace',
            fontSize: 10,
            color: 'inherit',
            textDecoration: 'none'
          }
        }, 'TimeTravel')
      ])
    ])
  ]);
}

Object.assign(window, { Header, Footer, ThemeToggle });
