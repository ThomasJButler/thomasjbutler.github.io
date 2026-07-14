import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { ArrowRight, Terminal, Code, Bot, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { MotionSection } from '@/components/MotionSection';
import { SectionHead } from '@/components/SectionHead';
import { ABOUT_CURRENT_FOCUS, ABOUT_CURRENT_FOCUS_TAGS } from '@/lib/content';

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
    items: ['Claude', 'LangChain', 'LangGraph', 'MCP', 'RAG', 'Pinecone', 'PyTorch', 'LLMs', 'AI Agents'],
  },
  {
    value: 'mobile-design',
    label: 'Mobile & Design',
    items: ['Swift', 'Xcode', 'iOS', 'SwiftUI', 'Figma', 'Claude Design', 'Prototyping'],
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
    <div className="fx-page mx-auto max-w-5xl px-6">
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

        {/*
          The headline used to be "Why I Love Programming", above three paragraphs about
          how magical it is to transform ideas into reality. The one thing on this page a
          buyer actually needed (Odysseus, Sanctuary, "audits that sometimes conclude you
          don't need me") was in a small box, below the fold, under a label reading
          `current_focus`. The order is now the other way round: what I do, then why I love
          doing it. The Matrix story is charm, and charm goes second.
        */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 max-w-3xl font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          I build AI that businesses actually own
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="fx-scrim mt-6 max-w-2xl leading-relaxed text-muted-foreground"
        >
          <p>{ABOUT_CURRENT_FOCUS}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {ABOUT_CURRENT_FOCUS_TAGS.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[10px]">
                {tag}
              </Badge>
            ))}
          </div>
        </motion.div>
      </section>

      <Separator />

      {/* The part that is not a sales pitch. It has earned its place, one rung down. */}
      <MotionSection className="py-16">
        <SectionHead
          title="Why I love this work"
          deck="The honest answer, which has nothing to do with business cases."
        />
        <div className="fx-scrim max-w-2xl space-y-4 leading-relaxed text-muted-foreground">
          <p>
            Programming is not just a profession for me, it&apos;s a passion. There&apos;s
            something magical about transforming ideas into reality through code. The ability
            to create something from nothing, to build tools that solve real problems, and to
            see the immediate impact of your work is incredibly satisfying.
          </p>
          <p>
            What truly captivates me is the puzzle-solving. Each challenge is an opportunity
            to break down a complex problem into an elegant solution, and the moment when
            everything clicks into place, when the code finally works after hours of
            debugging, is pure joy.
          </p>
          <p>
            The technology landscape never stops evolving, and that is what keeps me
            energised. There is always a new framework to explore, a better pattern to learn,
            or an innovative approach to discover.
          </p>
        </div>
      </MotionSection>

      <Separator />

      {/* Tech Stack */}
      <MotionSection className="py-16">
        <SectionHead
          title="What I build with"
          deck="The tools I actually reach for, grouped by where they sit in the stack."
        />

        <Tabs defaultValue="frontend">
          {/* h-auto so the wrapped rows aren't crushed into TabsList's fixed h-8. */}
          <TabsList className="h-auto min-h-8 flex-wrap gap-1">
            {TECH_TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="h-auto py-1">
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
        <SectionHead
          title="How I got here"
          deck="From HTML in a bedroom to AI systems in production, via a lot of debugging."
        />

        <div className="relative ml-4 space-y-4 border-l-2 border-primary/20 pl-8">
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
      </MotionSection>

      <Separator />

      {/* The only way out of this page used to be deeper into the hobby content. The
          timeline link survives, but as the secondary: someone who has read to the bottom
          of an about page is deciding whether to talk to me, not whether to keep reading. */}
      <MotionSection className="py-16 text-center" delay={0.15}>
        <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">
          That is the background. What is the problem?
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
          If you have an AI bill you cannot explain, or data that should not be leaving the
          building, that is the conversation I am most useful in.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="xl" className="glow-pulse">
            <Link to="/contact">
              Talk it through <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/updates">View full timeline</Link>
          </Button>
        </div>
      </MotionSection>
    </div>
  );
}
