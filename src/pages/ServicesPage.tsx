import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Mail,
  Globe,
  Server,
  Bot,
  Smartphone,
  Palette,
  Handshake,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { MotionSection } from '@/components/MotionSection';

const SERVICES = [
  {
    title: 'Website & Web Apps',
    icon: Globe,
    description:
      'Responsive, performance-first websites and web apps built with modern stacks.',
    tech: ['React', 'TypeScript', 'WordPress', 'HubSpot', 'Next.js'],
    highlights: ['React/Next.js', 'Performance & SEO', 'Accessible & Responsive'],
  },
  {
    title: 'Backend & APIs',
    icon: Server,
    description:
      'Robust servers and APIs that scale with your product. Production-ready from day one.',
    tech: ['Node.js', 'Django', 'PostgreSQL', 'GraphQL', 'Flask'],
    highlights: ['Node.js/Python', 'PostgreSQL/MongoDB', 'Auth & Security'],
  },
  {
    title: 'AI & Automation',
    icon: Bot,
    description:
      'Practical AI features and automation to save time and make data useful.',
    tech: ['ChatGPT', 'Claude', 'PyTorch', 'TensorFlow', 'n8n'],
    highlights: ['GPT Integration', 'n8n Workflows', 'Custom ML Models'],
  },
  {
    title: 'Mobile Applications',
    icon: Smartphone,
    description:
      'Cross-platform apps with native feel and store readiness.',
    tech: ['React Native', 'Expo', 'iOS', 'Android'],
    highlights: ['React Native', 'iOS & Android', 'Push & Offline'],
  },
  {
    title: 'Design & Brand',
    icon: Palette,
    description:
      'Clear, usable interfaces and identity design that scales with your product.',
    tech: ['Figma', 'Adobe XD', 'UI/UX', 'Wireframes'],
    highlights: ['UI/UX Design', 'Brand Identity', 'Design Systems'],
  },
  {
    title: 'Consultancy & Custom',
    icon: Handshake,
    description:
      'Architecture reviews, training and bespoke engineering for special requirements.',
    tech: ['DevOps', 'Git', 'Agile', 'Testing', 'Cloud'],
    highlights: ['Architecture Review', 'Team Training', 'Bespoke Solutions'],
  },
] as const;

const CREDENTIALS = [
  {
    category: 'Cloud & Infrastructure',
    items: [
      'AWS Qualified — Cloud Architecture & Serverless',
      'Azure Qualified — Cloud Infrastructure & DevOps',
      'Cisco Qualified — Network Security & Analytics',
    ],
  },
  {
    category: 'Engineering & AI',
    items: [
      'ML & LLM Bootcamp — CodeCademy Certificate',
      'Full Stack Engineer — CodeCademy Certificate',
      'Level 4 Software Dev — Estio Apprenticeship',
    ],
  },
  {
    category: 'Platforms',
    items: [
      'HubSpot Qualified — CMS Development & Integration',
      'Umbraco Qualified — Enterprise CMS & .NET',
      'WordPress Qualified — Theme Development & Customisation',
    ],
  },
] as const;

export function ServicesPage() {
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
          // services
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          What I Build
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 max-w-2xl text-muted-foreground leading-relaxed"
        >
          Fast, resilient digital products. From performance-first websites to AI integrations and
          mobile apps — I handle the architecture, delivery, and support so you can focus on
          outcomes.
        </motion.p>
      </section>

      <Separator />

      {/* Service Cards */}
      <MotionSection className="py-16">
        <h2 className="font-heading text-sm font-medium uppercase tracking-widest text-primary/70">
          Services
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="h-full transition-shadow hover:ring-2 hover:ring-primary/30">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Icon className="size-4" />
                      </div>
                      <CardTitle>{service.title}</CardTitle>
                    </div>
                    <CardDescription className="mt-1">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="mb-3 space-y-1.5">
                      {service.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-center gap-2 text-sm text-foreground/80">
                          <span className="text-primary text-xs">›</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5">
                      {service.tech.map((t) => (
                        <Badge key={t} variant="secondary" className="font-mono text-xs">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </MotionSection>

      <Separator />

      {/* Credentials */}
      <MotionSection className="py-16" delay={0.1}>
        <h2 className="font-heading text-sm font-medium uppercase tracking-widest text-primary/70">
          <Award className="mr-1.5 inline size-4 align-text-bottom" />
          Credentials
        </h2>

        <Accordion className="mt-6">
          {CREDENTIALS.map((group) => (
            <AccordionItem key={group.category} value={group.category}>
              <AccordionTrigger className="font-heading text-sm">
                {group.category}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1 pl-1 text-muted-foreground">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-primary">&#8250;</span> {item}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </MotionSection>

      <Separator />

      {/* CTA */}
      <MotionSection className="py-16 text-center" delay={0.15}>
        <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">
          Let&apos;s Build Something Great
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Free consultation. No obligation. Let&apos;s discuss your project.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="glow-pulse">
            <Link to="/contact">
              Get in Touch <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="mailto:hello@thomasjbutler.co.uk">
              <Mail className="size-4" /> Email Directly
            </a>
          </Button>
        </div>
      </MotionSection>
    </div>
  );
}
