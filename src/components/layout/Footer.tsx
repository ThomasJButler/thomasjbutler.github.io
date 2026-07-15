import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons';

export function Footer() {
  return (
    <footer className="shadow-[0_-1px_20px_color-mix(in_oklab,var(--primary)_3%,transparent)]">
      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <p className="font-mono text-xs text-muted-foreground">
          <span className="text-primary/50">&gt;</span> &copy;{' '}
          {/* The build bakes this year into the prerendered HTML; the client recomputes it
              on hydration. suppressHydrationWarning stops the mismatch React would otherwise
              flag between 1 January and the next deploy, and lets the client's (correct)
              year win. */}
          <span suppressHydrationWarning>{new Date().getFullYear()}</span> Tom Butler
          <span className="ml-1 inline-block w-1.5 h-3.5 bg-primary/40 animate-pulse align-text-bottom" />
        </p>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/thomasjbutler"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <GithubIcon className="size-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/thomasjbutler"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <LinkedinIcon className="size-4" />
          </a>
          <a
            href="mailto:dev@thomasjbutler.me"
            aria-label="Email"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Mail className="size-4" />
          </a>
          <span className="text-muted-foreground/30">|</span>
          <a
            href="https://thomasjbutler.github.io/version-timetravel/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] text-muted-foreground transition-colors hover:text-primary"
          >
            TimeTravel
          </a>
        </div>
      </div>
    </footer>
  );
}
