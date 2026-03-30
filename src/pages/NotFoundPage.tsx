import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  useEffect(() => {
    document.title = '404 — Page Not Found | Tom Butler';
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-6 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-6">
          <Terminal className="size-3.5 text-primary" />
          <span className="font-mono text-xs text-primary">error_404</span>
        </div>

        <h1 className="glow-text font-heading text-6xl font-bold text-foreground sm:text-8xl">
          404
        </h1>

        <p className="mt-4 font-mono text-lg text-primary/70">
          &quot;There is no spoon&quot;
        </p>

        <p className="mt-6 max-w-md mx-auto text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist in this version of the Matrix.
          It may have been moved, deleted, or never constructed.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/">
              <ArrowLeft className="size-4" /> Back to Homepage
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/projects">View Projects</Link>
          </Button>
        </div>

        <div className="mt-16 font-mono text-xs text-muted-foreground/40">
          <p>$ find / -name &quot;page&quot; -type f</p>
          <p className="mt-1">find: no matches found</p>
        </div>
      </motion.div>
    </div>
  );
}
