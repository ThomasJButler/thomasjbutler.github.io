import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons';
import { ThemeToggle } from '@/components/ThemeToggle';
import { MotionToggle } from '@/components/system/MotionToggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Business-first: the offer comes before the portfolio. Someone arriving to hire Tom
 * should reach Services before Projects.
 */
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Header({ onOpenPalette }: { onOpenPalette?: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // The drawer is hidden by `md:hidden` when the window widens, but the state stays
  // true — so narrowing back below 768px popped it open again unbidden.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)');
    const close = () => desktop.matches && setMobileOpen(false);
    desktop.addEventListener('change', close);
    return () => desktop.removeEventListener('change', close);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md shadow-[0_1px_20px_color-mix(in_oklab,var(--primary)_4%,transparent)]">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/"
          className="font-mono text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          <span className="text-primary/60">&gt;</span> tom_butler
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'rounded-md px-3 py-1.5 font-mono text-xs transition-colors',
                location.pathname === item.href
                  ? 'bg-accent text-primary shadow-[0_1px_0_color-mix(in_oklab,var(--primary)_50%,transparent)]'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-2 flex items-center gap-1 border-l border-border pl-3">
            {onOpenPalette && (
              <button
                type="button"
                onClick={onOpenPalette}
                className="fx-kbd"
                aria-keyshortcuts="Meta+K Control+K"
                title="Command palette (⌘K)"
              >
                ⌘K
              </button>
            )}
            <a
              href="https://github.com/thomasjbutler"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-primary"
            >
              <GithubIcon className="size-4" />
            </a>
            <a
              href="https://linkedin.com/in/thomasbutleruk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-primary"
            >
              <LinkedinIcon className="size-4" />
            </a>
            <MotionToggle />
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <nav
            className="fixed inset-x-0 top-14 z-50 border-b border-border bg-background/95 backdrop-blur-md p-4 md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'rounded-md px-4 py-2.5 font-mono text-sm transition-colors',
                    location.pathname === item.href
                      ? 'bg-accent text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  {item.label}
                </Link>
              ))}
              {/* Dev Journey is not in the desktop nav, so without this it is
                  unreachable on mobile except via the command palette. */}
              <Link
                to="/updates"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'rounded-md px-4 py-2.5 font-mono text-sm transition-colors',
                  location.pathname === '/updates'
                    ? 'bg-accent text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                Dev Journey
              </Link>
              {onOpenPalette && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenPalette();
                  }}
                  className="rounded-md px-4 py-2.5 text-left font-mono text-sm text-primary transition-colors hover:bg-muted"
                >
                  ⌘K palette
                </button>
              )}
              <div className="mt-2 flex items-center gap-2 border-t border-border pt-3">
                <a
                  href="https://github.com/thomasjbutler"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <GithubIcon className="size-4" />
                </a>
                <a
                  href="https://linkedin.com/in/thomasbutleruk"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <LinkedinIcon className="size-4" />
                </a>
                {/* MotionToggle belongs here too: it is the in-page control for stopping
                    the rain, and without it a phone user has no way to switch the
                    effects off at all. */}
                <MotionToggle />
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </>
      )}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </header>
  );
}
