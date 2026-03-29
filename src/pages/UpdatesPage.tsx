import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Terminal,
  ExternalLink,
  GraduationCap,
  Code,
  Briefcase,
  Brain,
  Heart,
  Palette,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { timelineData, getCategoryColor } from '@/lib/timeline';
import type { TimelineEntry } from '@/lib/timeline';

const CURRENT_YEAR = new Date().getFullYear();
const YEARS_CODING = CURRENT_YEAR - 2022;

const categoryIcons: Record<TimelineEntry['category'], React.ReactNode> = {
  education: <GraduationCap className="size-4" />,
  project: <Code className="size-4" />,
  career: <Briefcase className="size-4" />,
  'ai-ml': <Brain className="size-4" />,
  personal: <Heart className="size-4" />,
  creative: <Palette className="size-4" />,
};

const categoryLabels: Record<TimelineEntry['category'], string> = {
  education: 'Education',
  project: 'Project',
  career: 'Career',
  'ai-ml': 'AI / ML',
  personal: 'Personal',
  creative: 'Creative',
};

export function UpdatesPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Dev Timeline & Journey | Thomas J Butler';
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Page Header */}
      <section className="py-16 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
        >
          // timeline
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
        >
          Dev Journey
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-4 max-w-md text-sm text-muted-foreground"
        >
          From a kid writing HTML after watching The Matrix to building production AI systems —
          tracking the milestones along the way.
        </motion.p>
      </section>

      {/* Hero Stats */}
      <section className="pb-12">
        <div className="grid grid-cols-3 gap-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <p className="font-heading text-3xl font-bold text-primary">{timelineData.length}</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">Milestones</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <p className="font-heading text-3xl font-bold text-primary">{YEARS_CODING}+</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">Years Coding</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <p className="font-heading text-3xl font-bold text-primary">&infin;</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">Passion</p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="pb-24">
        <div className="relative ml-4 border-l-2 border-primary/20 pl-8">
          {timelineData.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px' }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="relative pb-8 last:pb-0"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[calc(2rem+5px)] top-1 flex size-2.5 items-center justify-center rounded-full bg-primary ring-4 ring-background" />

              <Card className="border-l-2 border-l-primary/40 transition-shadow hover:ring-2 hover:ring-primary/20">
                <CardHeader className="flex-row items-start gap-3">
                  <div
                    className="flex size-8 shrink-0 items-center justify-center rounded-md text-white"
                    style={{ backgroundColor: entry.iconBg }}
                  >
                    {categoryIcons[entry.category] || <Terminal className="size-4" />}
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <CardTitle className="text-base">{entry.title}</CardTitle>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="font-mono text-xs">
                        {entry.date}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{entry.location}</span>
                    </div>
                    {entry.institution && (
                      <p className="text-xs font-medium text-muted-foreground">
                        {entry.institution}
                      </p>
                    )}
                  </div>
                  <Badge
                    className="shrink-0 text-[10px]"
                    style={{
                      backgroundColor: `${getCategoryColor(entry.category)}20`,
                      color: getCategoryColor(entry.category),
                      borderColor: `${getCategoryColor(entry.category)}40`,
                    }}
                  >
                    {categoryLabels[entry.category]}
                  </Badge>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {entry.description}
                  </p>

                  {entry.achievements.length > 0 && (
                    <ul className="flex flex-col gap-1">
                      {entry.achievements.map((achievement) => (
                        <li key={achievement} className="flex items-start gap-2 text-xs">
                          <span className="mt-px font-mono text-primary">&gt;</span>
                          <span className="text-muted-foreground">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {entry.links && entry.links.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {entry.links.map((link) => (
                        <Button key={link.href} asChild variant="outline" size="sm" className="h-7 text-xs">
                          <a href={link.href} target="_blank" rel="noopener noreferrer">
                            {link.label}
                            <ExternalLink className="ml-1 size-3" />
                          </a>
                        </Button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Terminal end marker */}
          <div className="absolute -left-[calc(2rem+5px)] bottom-0 flex size-2.5 items-center justify-center rounded-full bg-primary/50 ring-4 ring-background" />
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 text-center">
        <p className="font-mono text-xs text-muted-foreground">// what&apos;s next?</p>
        <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">
          Let&apos;s Build Something
        </h2>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/contact">
              Get in Touch <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/projects">View Projects</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
