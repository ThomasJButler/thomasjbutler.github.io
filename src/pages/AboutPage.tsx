import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Code, Bot, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { MotionSection } from '@/components/MotionSection';

const TECH_TABS = [
  {
    value: 'frontend',
    label: 'Frontend',
    items: ['React', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Vite'],
  },
  {
    value: 'backend',
    label: 'Backend',
    items: ['Node.js', 'Python', 'PostgreSQL', 'REST APIs', '.NET'],
  },
  {
    value: 'cloud-devops',
    label: 'Cloud & DevOps',
    items: ['AWS', 'Azure', 'Docker', 'CI/CD', 'Vercel', 'Netlify'],
  },
  {
    value: 'ai-ml',
    label: 'AI & ML',
    items: ['TensorFlow', 'PyTorch', 'LLMs', 'ML Models', 'Pinecone'],
  },
] as const;

const JOURNEY_MILESTONES = [
  {
    era: '2000s',
    title: 'The Beginning',
    description: 'Started with HTML/CSS as a kid, fascinated by the web and inspired by The Matrix.',
    icon: Terminal,
  },
  {
    era: '2010s',
    title: 'Learning & Growth',
    description:
      'Studied computing, learned JavaScript frameworks, and built first real projects.',
    icon: Code,
  },
  {
    era: '2023-24',
    title: 'AI Exploration',
    description:
      'Dove into AI/ML, completed bootcamps, built RAG applications and intelligent agents.',
    icon: Bot,
  },
  {
    era: '2025',
    title: 'Current Focus',
    description:
      'Full stack AI engineering, building production tools and creative experiments.',
    icon: Briefcase,
  },
] as const;

const badgeStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
};

const badgeItem = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
};

export function AboutPage() {
  useEffect(() => { document.title = 'About | Tom Butler'; }, []);

  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Intro */}
      <section className="py-20">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
        >
          // about
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          Why I Love Programming
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 max-w-2xl space-y-4 text-muted-foreground leading-relaxed"
        >
          <p>
            Programming is not just a profession for me, it&apos;s a passion. There&apos;s something
            magical about transforming ideas into reality through code. The ability to create
            something from nothing, to build tools that solve real problems, and to see the
            immediate impact of your work is incredibly satisfying. Every project is a blank
            canvas, and the only limit is imagination and determination.
          </p>
          <p>
            What truly captivates me is the puzzle-solving aspect of development. Each challenge
            is an opportunity to think critically, to break down complex problems into elegant
            solutions. The moment when everything clicks into place, when the code finally works
            after hours of debugging, is pure joy. It&apos;s like solving a thousand puzzles at
            once, each one teaching you something new.
          </p>
          <p>
            The technology landscape never stops evolving, and that&apos;s what keeps me energised.
            There&apos;s always a new framework to explore, a better pattern to learn, or an
            innovative approach to discover. This constant growth and the vibrant community of
            developers sharing knowledge makes programming an endless journey of learning and
            improvement.
          </p>
        </motion.div>
      </section>

      <Separator />

      {/* Tech Stack */}
      <MotionSection className="py-16">
        <h2 className="font-heading text-sm font-medium uppercase tracking-widest text-primary/70">
          Tech Stack
        </h2>

        <Tabs defaultValue="frontend" className="mt-6">
          <TabsList className="flex-wrap">
            {TECH_TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {TECH_TABS.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="pt-4">
              <motion.div
                className="flex flex-wrap gap-2"
                variants={badgeStagger}
                initial="hidden"
                animate="visible"
                key={tab.value}
              >
                {tab.items.map((item) => (
                  <motion.span key={item} variants={badgeItem}>
                    <Badge variant="secondary" className="font-mono text-xs">
                      {item}
                    </Badge>
                  </motion.span>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </MotionSection>

      <Separator />

      {/* Programming Journey */}
      <MotionSection className="py-16" delay={0.1}>
        <h2 className="font-heading text-sm font-medium uppercase tracking-widest text-primary/70">
          Programming Journey
        </h2>

        <div className="relative mt-8 ml-4 space-y-4 border-l-2 border-primary/20 pl-8">
          {JOURNEY_MILESTONES.map((milestone, i) => {
            const Icon = milestone.icon;
            return (
              <motion.div
                key={milestone.era}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[calc(2rem+5px)] top-4 flex size-2.5 items-center justify-center rounded-full bg-primary ring-4 ring-background" />
                <Card className="h-full transition-shadow hover:ring-2 hover:ring-primary/30">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">{milestone.title}</CardTitle>
                        <CardDescription className="font-mono text-xs">
                          {milestone.era}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6">
          <Button asChild variant="ghost" size="sm">
            <Link to="/updates">
              View full timeline <ArrowRight className="size-3" />
            </Link>
          </Button>
        </div>
      </MotionSection>
    </div>
  );
}
