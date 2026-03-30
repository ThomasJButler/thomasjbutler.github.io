import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, animate as motionAnimate } from 'framer-motion';
import {
  ArrowRight,
  ExternalLink,
  Terminal,
  Cpu,
  GitBranch,
  Zap,
  Globe,
  Code,
  Bot,
  Database,
  Sparkles,
} from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const TYPING_PHRASES = [
  'AI-powered apps',
  'production web apps',
  'intelligent agents',
  'creative solutions',
];

/* ─── System Status Dashboard Data ─── */
const SKILL_BARS = [
  { label: 'React / Next.js', value: 95, color: 'oklch(0.50 0.28 145)' },
  { label: 'TypeScript', value: 90, color: 'oklch(0.55 0.25 145)' },
  { label: 'Python / AI', value: 85, color: 'oklch(0.75 0.15 195)' },
  { label: 'Node.js / APIs', value: 88, color: 'oklch(0.50 0.28 145)' },
  { label: 'Cloud / DevOps', value: 75, color: 'oklch(0.80 0.15 85)' },
];

const SYSTEM_STATS = [
  { icon: GitBranch, label: 'Projects', value: '15+', numericValue: 15, desc: 'shipped' },
  { icon: Cpu, label: 'AI Models', value: '7', numericValue: 7, desc: 'integrated' },
  { icon: Globe, label: 'Deployments', value: '20+', numericValue: 20, desc: 'live' },
  { icon: Zap, label: 'Uptime', value: '99.9%', numericValue: 99, desc: 'reliability' },
];

const RECENT_ACTIVITY = [
  { icon: Bot, text: 'Built RAG pipeline with LangChain + Pinecone', time: '2025', badge: 'AI' },
  { icon: Code, text: 'Shipped ModelViz — AI model comparison platform', time: '2025', badge: 'Web' },
  { icon: Database, text: 'SQL Ball: NL-to-SQL football analytics', time: '2025', badge: 'Data' },
  { icon: Terminal, text: 'Portfolio redesign with ShadCN + Tailwind v4', time: '2025', badge: 'Dev' },
];

/* ─── Animated Counter ─── */
function AnimatedNumber({ target, duration = 1.5 }: { target: number; duration?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = motionAnimate(count, target, { duration, ease: 'easeOut' });
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return () => { controls.stop(); unsub(); };
  }, [target, duration, count, rounded]);

  return <span>{display}</span>;
}

/* ─── Skill Bar ─── */
function SkillBar({ label, value, color, delay }: { label: string; value: number; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-mono text-xs text-foreground/80">{label}</span>
        <span className="font-mono text-xs text-primary/70">
          <AnimatedNumber target={value} duration={1.5 + delay} />%
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted/60 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: delay + 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            boxShadow: `0 0 12px ${color}40`,
          }}
        />
      </div>
    </motion.div>
  );
}

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
      {/* ═══ Hero — Terminal Session ═══ */}
      <section className="pt-12 pb-2 sm:pt-16 sm:pb-4">
        {/* Terminal window frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-xl border border-border/50 overflow-hidden"
        >
          {/* Terminal title bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/30 border-b border-border/30">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-red-500/60" />
              <span className="size-2.5 rounded-full bg-yellow-500/60" />
              <span className="size-2.5 rounded-full bg-green-500/60" />
            </div>
            <span className="font-mono text-[10px] text-muted-foreground/60 ml-2">tom@matrix ~ </span>
          </div>

          {/* Terminal content */}
          <div className="px-6 py-12 sm:py-16 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glow-text font-heading text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            >
              Hey, I&apos;m Tom
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4 font-mono text-lg text-muted-foreground sm:text-xl"
            >
              <span className="text-primary/60">// I build </span>
              <span className="text-primary">{displayText}</span>
              <span className="inline-block w-[0.55em] h-[1.05em] bg-primary/80 animate-pulse rounded-sm align-text-bottom shadow-[0_0_8px_oklch(0.50_0.28_145/0.4)]" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-3 text-sm text-muted-foreground"
            >
              Full Stack AI Engineer from the UK
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="mt-8 flex justify-center gap-3"
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
          </div>
        </motion.div>

      </section>

      {/* ═══ System Status Dashboard ═══ */}
      <section className="py-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-5">
            <Terminal className="size-4 text-primary" />
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-primary/70">
              system_status
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
            <span className="font-mono text-[10px] text-primary/40 flex items-center gap-1.5">
              <span className="inline-block size-1.5 rounded-full bg-green-500 animate-pulse" />
              online
            </span>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-5">
          {SYSTEM_STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card size="sm" className="text-center group hover:border-primary/30">
                  <CardContent className="pt-5 pb-4">
                    <Icon className="size-4 mx-auto mb-2.5 text-primary/50 group-hover:text-primary transition-colors" />
                    <div className="font-heading text-3xl font-bold text-foreground glow-text">{stat.value}</div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Two Column: Skills + Activity */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Skill Levels */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Cpu className="size-4 text-primary/60" />
                <CardTitle className="font-mono text-xs uppercase tracking-wider">core_skills</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {SKILL_BARS.map((skill, i) => (
                <SkillBar key={skill.label} {...skill} delay={i * 0.1} />
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <GitBranch className="size-4 text-primary/60" />
                <CardTitle className="font-mono text-xs uppercase tracking-wider">recent_activity</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {RECENT_ACTIVITY.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <div className="flex size-6 shrink-0 items-center justify-center rounded bg-primary/10 text-primary mt-0.5">
                        <Icon className="size-3" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground/90 leading-tight">{item.text}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">{item.badge}</Badge>
                          <span className="font-mono text-[10px] text-muted-foreground">{item.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent my-2" />

      {/* ═══ Currently Working On ═══ */}
      <section className="py-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-lg border border-primary/20 bg-primary/[0.03] p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="size-3.5 text-primary" />
            <span className="font-mono text-xs uppercase tracking-wider text-primary/70">now</span>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Building AI-powered applications and exploring agentic workflows.
            Currently focused on RAG systems, LangChain integrations, and
            pushing the boundaries of what&apos;s possible with modern web tech.
          </p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            <Badge variant="cyan" className="text-[10px]">LangChain</Badge>
            <Badge variant="cyan" className="text-[10px]">RAG</Badge>
            <Badge variant="amber" className="text-[10px]">Agents</Badge>
            <Badge variant="secondary" className="text-[10px]">ShadCN</Badge>
          </div>
        </motion.div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent my-2" />

      {/* ═══ About Quote — Terminal Output ═══ */}
      <section className="py-6 pb-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-lg border border-border/30 overflow-hidden">
            <div className="px-4 py-1.5 bg-muted/20 border-b border-border/20">
              <span className="font-mono text-[10px] text-muted-foreground/50">$ cat about.md</span>
            </div>
            <div className="p-5">
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                Ever since I watched The Matrix as a kid, I&apos;ve been obsessed with building things on the web.
                This site is the sci-fi playground I always dreamed of — a space to experiment with AI,
                cyberpunk aesthetics, and creative code.
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link to="/about">More about me <ArrowRight className="size-3" /></Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <a href="https://thomasjbutler.me" target="_blank" rel="noopener noreferrer">
                Commercial portfolio <ExternalLink className="size-3" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <a href="https://github.com/thomasjbutler" target="_blank" rel="noopener noreferrer">
                <GithubIcon className="size-3" /> GitHub
              </a>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <a href="https://thomasjbutler.github.io/version-timetravel/" target="_blank" rel="noopener noreferrer">
                TimeTravel <ExternalLink className="size-3" />
              </a>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
