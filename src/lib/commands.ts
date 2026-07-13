import { LINKS } from './content';
import { toast } from './toast-bus';
import { burstRain } from './rain-bus';
import { ACCENT_BLUE, ACCENT_GREEN } from '@/contexts/AccentContext';
import { BOOT_SESSION_KEY } from '@/components/system/BootIntro';

export type CommandType = 'goto' | 'sys' | 'link' | 'pill' | 'egg';

/** Everything a command might need. Built once, in Layout. */
export interface CommandContext {
  navigate: (path: string) => void;
  toggleTheme: () => void;
  toggleFx: () => void;
  setAccent: (accent: string | null) => void;
  replayIntro: () => void;
  showSpoon: () => void;
  releaseRabbit: () => void;
}

export interface Command {
  id: string;
  label: string;
  type: CommandType;
  /** Extra words to match against, so "email" finds "copy email address". */
  keywords: string;
  /** Swatch shown beside the pills. Not the accent applied — just the pill's colour. */
  dot?: string;
  /** Eggs stay out of the list until someone types at least three characters. */
  hidden?: boolean;
  run: (ctx: CommandContext) => void;
}

export const COMMANDS: Command[] = [
  // Same business-first order as the header nav.
  { id: 'home', label: 'go: home', type: 'goto', keywords: 'navigate start hero', run: (c) => c.navigate('/') },
  { id: 'services', label: 'go: services', type: 'goto', keywords: 'navigate what i build local ai hire work with', run: (c) => c.navigate('/services') },
  { id: 'projects', label: 'go: projects', type: 'goto', keywords: 'navigate work portfolio cards', run: (c) => c.navigate('/projects') },
  { id: 'about', label: 'go: about', type: 'goto', keywords: 'navigate bio tech stack journey', run: (c) => c.navigate('/about') },
  { id: 'contact', label: 'go: contact', type: 'goto', keywords: 'navigate email form get in touch', run: (c) => c.navigate('/contact') },
  { id: 'updates', label: 'go: dev journey (timetravel)', type: 'goto', keywords: 'navigate updates timeline history', run: (c) => c.navigate('/updates') },

  { id: 'theme', label: 'toggle light / dark', type: 'sys', keywords: 'theme circuit neon terminal mode', run: (c) => c.toggleTheme() },
  {
    id: 'fx',
    label: 'toggle motion & effects',
    type: 'sys',
    keywords: 'reduce motion rain cursor animation accessibility calm',
    run: (c) => c.toggleFx(),
  },
  {
    id: 'email',
    label: 'copy email address',
    type: 'sys',
    keywords: 'contact clipboard dev@',
    run: () => {
      navigator.clipboard
        .writeText(LINKS.email)
        .then(() => toast(`> ${LINKS.email} copied to clipboard`))
        .catch(() => toast(`> ${LINKS.email}`));
    },
  },
  { id: 'github', label: 'open github ↗', type: 'link', keywords: 'code repositories', run: () => window.open(LINKS.github, '_blank', 'noopener') },
  { id: 'linkedin', label: 'open linkedin ↗', type: 'link', keywords: 'connect network', run: () => window.open(LINKS.linkedin, '_blank', 'noopener') },
  {
    id: 'boot',
    label: 'replay intro',
    type: 'sys',
    keywords: 'boot wake up sequence again',
    run: (c) => {
      sessionStorage.removeItem(BOOT_SESSION_KEY);
      c.replayIntro();
    },
  },

  {
    id: 'redpill',
    label: 'take the red pill',
    type: 'pill',
    dot: '#ff4b4b',
    keywords: 'matrix wonderland truth green',
    run: (c) => {
      c.setAccent(ACCENT_GREEN);
      toast('You stay in Wonderland, and I show you how deep the rabbit hole goes.');
    },
  },
  {
    id: 'bluepill',
    label: 'take the blue pill',
    type: 'pill',
    dot: '#4a9eff',
    keywords: 'matrix story ends believe blue',
    run: (c) => {
      c.setAccent(ACCENT_BLUE);
      toast('The story ends. You wake up and believe whatever you want to believe.');
    },
  },

  {
    id: 'spoon',
    label: 'there is no spoon',
    type: 'egg',
    hidden: true,
    keywords: 'spoon bend truth matrix',
    run: (c) => {
      burstRain();
      c.showSpoon();
    },
  },
  {
    id: 'rabbit',
    label: 'follow the white rabbit',
    type: 'egg',
    hidden: true,
    keywords: 'rabbit white wonderland follow',
    run: (c) => c.releaseRabbit(),
  },
];

/**
 * Substring match over label + keywords.
 * Eggs stay hidden until the query is specific enough to be deliberate.
 */
export function filterCommands(query: string): Command[] {
  const q = query.trim().toLowerCase();
  return COMMANDS.filter((command) => {
    const matches = !q || `${command.label} ${command.keywords}`.toLowerCase().includes(q);
    if (command.hidden) return q.length > 2 && matches;
    return matches;
  });
}
