import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, animate as motionAnimate } from 'framer-motion';
import {
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Terminal,
  Cpu,
  GitBranch,
  Zap,
  Globe,
  Code,
  Bot,
  Database,
} from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// Badge available for future use

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
  { icon: GitBranch, label: 'Projects', value: '15+', desc: 'shipped' },
  { icon: Cpu, label: 'AI Models', value: '7', desc: 'integrated' },
  { icon: Globe, label: 'Deployments', value: '20+', desc: 'live' },
  { icon: Zap, label: 'Uptime', value: '99.9%', desc: 'reliability' },
];

const RECENT_ACTIVITY = [
  { icon: Bot, text: 'Built RAG pipeline with LangChain + Pinecone', time: '2025' },
  { icon: Code, text: 'Shipped ModelViz — AI model comparison platform', time: '2025' },
  { icon: Database, text: 'SQL Ball: NL-to-SQL football analytics', time: '2025' },
  { icon: Terminal, text: 'Portfolio redesign with ShadCN + Tailwind v4', time: '2025' },
];

/* ─── Animated Counter Hook ─── */
function AnimatedNumber({ target, duration = 1.5 }: { target: number; duration?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = motionAnimate(count, target, {
      duration,
      ease: 'easeOut',
    });
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [target, duration, count, rounded]);

  return <span>{display}</span>;
}

/* ─── Skill Bar Component ─── */
function SkillBar({ label, value, color, delay }: { label: string; value: number; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-mono text-xs text-foreground/80">{label}</span>
        <span className="font-mono text-xs text-primary/70">
          <AnimatedNumber target={value} duration={1.5 + delay} />%
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
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
      {/* Hero */}
      <section className="flex flex-col items-center justify-center py-24 sm:py-28 text-center">
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

      {/* ═══ System Status Dashboard ═══ */}
      <section className="py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-8">
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
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-8">
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
                <Card size="sm" className="text-center">
                  <CardContent className="pt-4 pb-3">
                    <Icon className="size-4 mx-auto mb-2 text-primary/60" />
                    <div className="font-heading text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
                      {stat.label} <span className="text-primary/40">{stat.desc}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Two Column: Skills + Activity */}
        <div className="grid gap-6 md:grid-cols-2">
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
                      className="flex items-start gap-3 group"
                    >
                      <div className="flex size-6 shrink-0 items-center justify-center rounded bg-primary/10 text-primary mt-0.5">
                        <Icon className="size-3" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground/90 leading-tight">{item.text}</p>
                        <span className="font-mono text-[10px] text-muted-foreground">{item.time}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Brief About */}
      <section className="py-12">
        <blockquote className="border-l-2 border-primary/50 pl-6 text-muted-foreground leading-relaxed">
          <p>
            Ever since I watched The Matrix as a kid, I&apos;ve been obsessed with building things on the web.
            This site is the sci-fi playground I always dreamed of — a space to experiment with AI,
            cyberpunk aesthetics, and creative code.
          </p>
        </blockquote>
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
        </div>
      </section>
    </div>
  );
}
