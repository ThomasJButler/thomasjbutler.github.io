import { Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { ArrowRight, Terminal, Code, Bot, Briefcase, Users, Building2 } from 'lucide-react';
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
    description:
      'Jailbreaking an iPod Touch, obsessed with The Matrix, and always the one with app ideas and no way to build them.',
    icon: Terminal,
  },
  {
    era: '2014-20',
    title: 'Everything but code',
    description:
      'Two seasons of Victorian Premier League cricket in Melbourne, commercial diving, paraplanning in financial services, and a conveyancing desk in Southport. Not a line of code in any of it.',
    icon: Briefcase,
  },
  {
    era: '2021-23',
    title: 'DWP Work Coach',
    description:
      "Twenty appointments a day, 150 people on the caseload, and I could only ever help one of them at a time. That's the whole reason I moved into software.",
    icon: Users,
  },
  {
    era: 'Early 2022',
    title: 'First line of code',
    description:
      'From a standing start, teaching myself around a full-time job at the DWP. Cloud Engineering and Data Science bootcamp with The Growth Company in 2023.',
    icon: Code,
  },
  {
    era: '2023-24',
    title: 'Fuelius',
    description:
      'Eighteen months as an apprentice full-stack developer at a HubSpot partner agency. Twelve named clients, an NHS trust among them. Level 4 apprenticeship, studied 2023-24. Made redundant December 2024.',
    icon: Building2,
  },
  {
    era: '2024-now',
    title: 'AiTomatic',
    description:
      'Started building under AiTomatic. Solo, self-funded, no clients yet. RAG pipelines, multi-agent tooling, an entity-resolution engine across two government registers, and Sanctuary on native iOS, on-device. Not being pursued commercially while I look for full-time work.',
    icon: Bot,
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
          The h1 is the first line of Tom's own answer to "why does this site exist", and
          the paragraphs under it are the rest of it (ABOUT_CURRENT_FOCUS in content.ts).
          It replaced "I build AI that businesses actually own" when the offer was shelved.
          "Why I love this work" stays, one rung down: the charm goes second.
        */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 max-w-3xl font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          You&apos;re probably wondering why this site exists.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="fx-scrim mt-6 max-w-2xl space-y-4 leading-relaxed text-muted-foreground"
        >
          {ABOUT_CURRENT_FOCUS.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
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

      {/* The charm, one rung down. */}
      <MotionSection className="py-16">
        <SectionHead
          title="Why I love this work"
          deck="The honest answer."
        />
        <div className="fx-scrim max-w-2xl space-y-4 leading-relaxed text-muted-foreground">
          <p>
            I never got into software for the paycheck. I got into it to help people at scale
            and to use the creative side of my brain. Money matters, of course, but if it
            means earning a bit less and loving what I do, that&apos;s the trade I&apos;ll
            take every time.
          </p>
          <p>
            I&apos;m always trying to improve my code and my fundamentals, because
            that&apos;s the only part of this job that doesn&apos;t change every few years.
            Whatever I&apos;m learning, I build something alongside it. Some of those side
            projects have properly kicked on since, and they&apos;re how I keep going deeper
            on one thing over time.
          </p>
          <p>
            Software should give people time back, not take it from them. Most of what I
            build is aimed at that: making tech adapt to humans rather than the other way
            round.
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
          deck="From a standing start in 2022 to AI systems in production, by way of the DWP and a lot of debugging."
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

      {/* Someone who has read to the bottom of an about page is deciding whether to talk
          to me, not whether to keep reading, so the contact button leads and the timeline
          is the secondary. */}
      <MotionSection className="py-16 text-center" delay={0.15}>
        <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">
          That&apos;s the background. Want a chat?
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
          I&apos;m after a full-time role: junior for general software, any non-senior level
          for AI. If that lines up with something you&apos;re hiring for, I&apos;d like to hear
          about it.
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
