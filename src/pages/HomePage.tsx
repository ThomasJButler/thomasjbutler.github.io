import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, ChevronDown } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const TYPING_PHRASES = [
  'AI-powered apps',
  'production web apps',
  'intelligent agents',
  'creative solutions',
];

const FEATURED_PROJECTS = [
  {
    id: 'modelviz',
    name: 'ModelViz',
    description: 'Compare AI models across providers with real-time metrics, cost analysis, and 3D visualisations.',
    topics: ['Next.js', 'TypeScript', 'Three.js'],
    links: { demo: 'https://modelviz.vercel.app/', github: 'https://github.com/ThomasJButler/ModelViz' },
  },
  {
    id: 'matrix-arcade',
    name: 'The Matrix Arcade',
    description: 'Retro-style arcade games with a Matrix theme. Built with React, Vite, and Canvas API.',
    topics: ['React', 'Canvas API', 'Vite'],
    links: { demo: 'https://the-matrix-arcade.vercel.app/', github: 'https://github.com/ThomasJButler/The-Matrix-Arcade' },
  },
];

export function HomePage() {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const animateTyping = useCallback(() => {
    const currentPhrase = TYPING_PHRASES[phraseIndex];
    const speed = isDeleting ? 50 : 100;
    const pause = isDeleting ? 500 : 2000;

    if (!isDeleting && displayText === currentPhrase) {
      setTimeout(() => setIsDeleting(true), pause);
      return;
    }
    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
      return;
    }

    const nextText = isDeleting
      ? currentPhrase.substring(0, displayText.length - 1)
      : currentPhrase.substring(0, displayText.length + 1);

    setTimeout(() => setDisplayText(nextText), speed);
  }, [displayText, phraseIndex, isDeleting]);

  useEffect(() => {
    const timer = setTimeout(animateTyping, 100);
    return () => clearTimeout(timer);
  }, [animateTyping]);

  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center py-28 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glow-text font-heading text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
        >
          Hey, I&apos;m Tom
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 font-mono text-lg text-muted-foreground sm:text-xl"
        >
          <span className="text-primary/60">// I build </span>
          <span className="text-primary">{displayText}</span>
          <span className="inline-block w-[0.55em] h-[1.05em] bg-primary/80 animate-pulse rounded-sm align-text-bottom shadow-[0_0_8px_oklch(0.50_0.28_145/0.4)]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-3 text-sm text-muted-foreground"
        >
          Full Stack AI Engineer from the UK
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 flex gap-3"
        >
          <Button asChild size="lg" className="glow-pulse">
            <Link to="/projects">
              View Projects <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5, y: [0, 6, 0] }}
          transition={{
            opacity: { delay: 2, duration: 0.8 },
            y: { delay: 2.5, duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="mt-16 flex flex-col items-center gap-1"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">scroll</span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </motion.div>
      </section>

      {/* Featured Work */}
      <section className="py-16">
        <h2 className="font-heading text-sm font-medium uppercase tracking-widest text-primary/70">
          Featured Work
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {FEATURED_PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="h-full transition-shadow hover:ring-primary/30 hover:ring-2">
                <CardHeader>
                  <CardTitle className="font-heading text-base">{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {project.topics.map((t) => (
                      <Badge key={t} variant="secondary">{t}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  {project.links.demo && (
                    <Button asChild variant="ghost" size="xs">
                      <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="size-3" /> Live
                      </a>
                    </Button>
                  )}
                  {project.links.github && (
                    <Button asChild variant="ghost" size="xs">
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                        <GithubIcon className="size-3" /> Code
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brief About */}
      <section className="py-16">
        <blockquote className="border-l-2 border-primary/50 pl-6 text-muted-foreground leading-relaxed">
          <p>
            Ever since I watched The Matrix as a kid, I&apos;ve been obsessed with building things on the web.
            This site is the sci-fi playground I always dreamed of — a space to experiment with AI,
            cyberpunk aesthetics, and creative code.
          </p>
        </blockquote>
        <div className="mt-4 flex gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link to="/about">More about me <ArrowRight className="size-3" /></Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <a href="https://thomasjbutler.me" target="_blank" rel="noopener noreferrer">
              Commercial portfolio <ExternalLink className="size-3" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
