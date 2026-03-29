import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons';

export function Footer() {
  return (
    <footer className="border-t border-primary/10 shadow-[0_-1px_20px_oklch(0.50_0.28_145/0.03)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <p className="font-mono text-xs text-text-muted">
          &copy; {new Date().getFullYear()} Tom Butler
        </p>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/thomasjbutler"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-text-muted transition-colors hover:text-matrix-300"
          >
            <GithubIcon className="size-4" />
          </a>
          <a
            href="https://linkedin.com/in/thomasbutleruk"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-text-muted transition-colors hover:text-matrix-300"
          >
            <LinkedinIcon className="size-4" />
          </a>
          <a
            href="mailto:dev@thomasjbutler.me"
            aria-label="Email"
            className="text-text-muted transition-colors hover:text-matrix-300"
          >
            <Mail className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
