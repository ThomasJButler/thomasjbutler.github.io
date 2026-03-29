import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md shadow-[0_1px_20px_oklch(0.50_0.28_145/0.04)]">
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
                  ? 'bg-surface-2 text-matrix-300 shadow-[0_1px_0_oklch(0.50_0.28_145/0.5)]'
                  : 'text-text-muted hover:bg-surface-2 hover:text-text'
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-2 flex items-center gap-1 border-l border-border pl-3">
            <a
              href="https://github.com/thomasjbutler"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded-md p-1.5 text-text-muted transition-colors hover:text-primary"
            >
              <GithubIcon className="size-4" />
            </a>
            <a
              href="https://linkedin.com/in/thomasbutleruk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-md p-1.5 text-text-muted transition-colors hover:text-primary"
            >
              <LinkedinIcon className="size-4" />
            </a>
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
                      ? 'bg-surface-2 text-primary'
                      : 'text-text-muted hover:bg-surface-1 hover:text-text'
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 flex items-center gap-2 border-t border-border pt-3">
                <a
                  href="https://github.com/thomasjbutler"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="rounded-md p-2 text-text-muted transition-colors hover:text-primary"
                >
                  <GithubIcon className="size-4" />
                </a>
                <a
                  href="https://linkedin.com/in/thomasbutleruk"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="rounded-md p-2 text-text-muted transition-colors hover:text-primary"
                >
                  <LinkedinIcon className="size-4" />
                </a>
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
