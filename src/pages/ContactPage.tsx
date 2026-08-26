import { useEffect, useState } from 'react';
import { m as motion } from 'framer-motion';
import { Mail, MapPin, Clock, Phone, ArrowRight, Coffee, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons';
import { LINKS } from '@/lib/content';
import { LinkedInBanner } from '@/components/LinkedInBanner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function ContactPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitState('submitting');
    try {
      const formData = new FormData(e.currentTarget);
      const res = await fetch('https://formspree.io/f/xeoeenqv', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setSubmitState('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitState('error');
      }
    } catch {
      setSubmitState('error');
    }
  };

  return (
    <div className="fx-page mx-auto max-w-5xl px-6">
      <LinkedInBanner />
      {/* Page Header */}
      <section className="py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
        >
          Talk it through
        </motion.h1>
        {/* Says what Tom is after, in one line, before the form. An employer's silent
            question is "is he actually available", and this answers it. */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-4 max-w-xl text-muted-foreground"
        >
          Looking for full-time work. Junior for general software, any non-senior level for
          AI. Tell me about the role, or just say hello. I usually reply within a day or two.
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
                <p className="text-sm text-muted-foreground">Leeds, Yorkshire</p>
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

            {/* Availability, framed as a candidate's. It read "Taking on new engagements now"
                while the site sold consultancy; that positioning is shelved (see CLAUDE.md). */}
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <p className="font-heading text-sm font-medium text-foreground">Availability</p>
                <p className="text-sm text-muted-foreground">Open to full-time roles</p>
                <p className="text-sm text-muted-foreground">
                  Leeds, Yorkshire. Remote or hybrid across the UK.
                </p>
                <p className="text-sm text-muted-foreground">
                  CV on request. Ask and I&apos;ll send the one that fits the role.
                </p>
              </div>
            </div>

            {/* Connect */}
            <Card size="sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Terminal className="size-4 text-primary/90" />
                  <CardTitle className="font-mono text-xs uppercase tracking-wider">connect</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <a
                  href={LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-w-0 items-center gap-3 text-sm break-words text-muted-foreground transition-colors hover:text-primary"
                >
                  <GithubIcon className="size-4 shrink-0" />
                  github.com/ThomasJButler
                </a>
                <a
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-w-0 items-center gap-3 text-sm break-words text-muted-foreground transition-colors hover:text-primary"
                >
                  <LinkedinIcon className="size-4 shrink-0" />
                  linkedin.com/in/thomasbutleruk
                </a>
                {/* The tip jar is back. It was removed while the page sold five-figure
                    engagements (a tip jar next to a price list tells the buyer which one you
                    really expect); on a personal site it is just a link. */}
                <a
                  href={LINKS.coffee}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-w-0 items-center gap-3 text-sm break-words text-muted-foreground transition-colors hover:text-primary"
                >
                  <Coffee className="size-4 shrink-0" />
                  buymeacoffee.com
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Right Column — Contact Form */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="font-heading text-lg">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              {submitState === 'success' ? (
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-8 text-center">
                  <div className="inline-flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4 font-heading text-xl">✓</div>
                  <h3 className="font-heading text-lg font-medium text-foreground">Message Sent</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Thanks for reaching out! I&apos;ll get back to you within 24-48 hours.
                  </p>
                  <Button variant="ghost" size="sm" className="mt-4" onClick={() => setSubmitState('idle')}>
                    Send another message
                  </Button>
                </div>
              ) : (
              <form
                onSubmit={handleSubmit}
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
                    placeholder="Tell me about the role, the project, or the idea..."
                    required
                  />
                </div>

                {/* Submit */}
                {submitState === 'error' && (
                  <p className="text-sm text-red-400 text-right">Something went wrong. Please try again.</p>
                )}
                <Button type="submit" size="lg" className="mt-2 w-full sm:w-auto sm:self-end" disabled={submitState === 'submitting'}>
                  {submitState === 'submitting' ? 'Sending...' : <>Send Message <ArrowRight className="size-4" /></>}
                </Button>
              </form>
              )}
            </CardContent>
          </Card>
        </div>

      </section>
    </div>
  );
}
