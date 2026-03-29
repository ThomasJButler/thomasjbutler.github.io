import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  MapPin,
  Clock,
  Phone,
  Coffee,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  FileText,
  Rocket,
  Headphones,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons';
import { LinkedInBanner } from '@/components/LinkedInBanner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export function ContactPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-6">
      <LinkedInBanner />
      {/* Page Header */}
      <section className="py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
        >
          Get in Touch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-4 max-w-lg font-mono text-sm text-muted-foreground"
        >
          // Whether it&apos;s a project, opportunity, or just a chat about code
        </motion.p>
      </section>

      {/* Two-Column Layout */}
      <section className="pb-24">
        <div className="grid gap-8 md:grid-cols-5">
          {/* Left Column — Contact Info */}
          <div className="flex flex-col gap-6 md:col-span-2">
            {/* Location */}
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <p className="font-heading text-sm font-medium text-foreground">Location</p>
                <p className="text-sm text-muted-foreground">York, UK</p>
                <p className="text-sm text-muted-foreground">Available remotely</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <p className="font-heading text-sm font-medium text-foreground">Email</p>
                <a
                  href="mailto:dev@thomasjbutler.me"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  dev@thomasjbutler.me
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <p className="font-heading text-sm font-medium text-foreground">Phone</p>
                <a
                  href="tel:+447903352059"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  +44 7903352059
                </a>
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <p className="font-heading text-sm font-medium text-foreground">Availability</p>
                <p className="text-sm text-muted-foreground">Full-time &amp; freelance</p>
                <p className="text-sm text-muted-foreground">Resume upon request</p>
              </div>
            </div>

            <Separator />

            {/* Social Links */}
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="icon">
                <a
                  href="https://github.com/ThomasJButler"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <GithubIcon className="size-4" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <a
                  href="https://www.linkedin.com/in/thomasjbutler/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="size-4" />
                </a>
              </Button>
              <span className="text-muted-foreground">|</span>
              <a
                href="https://buymeacoffee.com/thomasjbutler"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                <Coffee className="size-3" />
                Buy me a coffee
                <ExternalLink className="size-3" />
              </a>
            </div>
          </div>

          {/* Right Column — Contact Form */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="font-heading text-lg">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                action="https://formspree.io/f/xeoeenqv"
                method="POST"
                className="flex flex-col gap-4"
              >
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="name">
                    Name <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                    autoComplete="name"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email">
                    Email <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                  />
                </div>

                {/* Phone (optional) */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+44 ..."
                    autoComplete="tel"
                  />
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="subject">
                    Subject <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What is this about?"
                    required
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="message">
                    Message <span className="text-primary">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project or idea..."
                    required
                  />
                </div>

                {/* Submit */}
                <Button type="submit" size="lg" className="mt-2 w-full sm:w-auto sm:self-end">
                  Send Message <ArrowRight className="size-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Process Timeline */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: <MessageSquare className="size-4" />, title: '1. Discovery Call', description: 'Free consultation to understand your goals, timeline, and requirements.' },
            { icon: <FileText className="size-4" />, title: '2. Detailed Quote', description: 'Clear, itemised proposal with no hidden costs or surprises.' },
            { icon: <Rocket className="size-4" />, title: '3. Build & Deliver', description: 'Agile development with regular updates and milestone reviews.' },
            { icon: <Headphones className="size-4" />, title: '4. Ongoing Support', description: 'Post-launch support, maintenance, and future enhancements.' },
          ].map((step) => (
            <Card key={step.title} size="sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    {step.icon}
                  </div>
                  <CardTitle className="text-sm">{step.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
