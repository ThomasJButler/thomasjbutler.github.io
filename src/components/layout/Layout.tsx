import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header } from './Header';
import { Footer } from './Footer';
import { PageTransition } from './PageTransition';
import { MatrixRain } from '@/components/MatrixRain';
import { Atmosphere } from '@/components/system/Atmosphere';
import { SkipLink } from '@/components/system/SkipLink';
import { Toaster } from '@/components/system/Toaster';
import { BootIntro, BOOT_SESSION_KEY } from '@/components/system/BootIntro';
import { SpoonOverlay } from '@/components/system/SpoonOverlay';
import { WhiteRabbit } from '@/components/system/WhiteRabbit';
import { useKonami } from '@/hooks/useKonami';
import { useTheme } from '@/hooks/useTheme';
import { useAccent } from '@/hooks/useAccent';
import { useFx } from '@/hooks/useFx';
import { burstRain } from '@/lib/rain-bus';
import { toast } from '@/lib/toast-bus';
import type { CommandContext } from '@/lib/commands';
// The single source of the document title, shared with the build-time prerender, so a
// client navigation can never set a title the crawler did not see.
import { titleForPath } from '../../../scripts/routes.mjs';

/**
 * The palette is behind ⌘K, but it was in the entry chunk on every cold visit.
 *
 * It statically pulls base-ui's Dialog and the whole vendored floating-ui positioning
 * stack: 19.1 kB gzipped of code that most visitors never trigger. Lazy, it costs a
 * ~17 kB chunk on the first press, which is imperceptible against a keystroke, and the
 * mounted-but-closed component below renders nothing until `open` anyway.
 */
const CommandPalette = lazy(() =>
  import('@/components/system/CommandPalette').then((m) => ({ default: m.CommandPalette }))
);

const RABBIT_SESSION_KEY = 'v5:rabbit';
/** How long before the rabbit shows up, and how long it waits to be caught. */
const RABBIT_APPEARS_AFTER = 22_000;
const RABBIT_LEAVES_AFTER = 15_000;

/**
 * The fallback reserves a full viewport, and that height is the whole point of it.
 *
 * `main` is flex-1 inside a min-h-screen column, so a short fallback leaves the footer
 * sitting at the bottom edge of the viewport — visible. The route chunk then lands, the
 * real page is ~2,400px tall, and the footer is shoved down off-screen. That single move
 * scored 0.115 of a 0.118-0.144 CLS on every lazy route: it was essentially the site's
 * entire layout-shift score.
 *
 * CLS only counts elements that are *in* the viewport when they move. Reserving a full
 * screen here puts the footer below the fold from the first paint, so the swap moves it
 * from off-screen to further off-screen and scores zero.
 */
function PageLoader() {
  return (
    <div className="flex min-h-screen items-start justify-center pt-[30vh]">
      <div className="size-8 animate-spin rounded-full border-2 border-border border-t-primary" />
    </div>
  );
}

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();
  const { accent, setAccent } = useAccent();
  const { motionOk, toggleFx, toggleMorph } = useFx();

  const [paletteOpen, setPaletteOpen] = useState(false);
  // Latches on the first open, from whichever route in (⌘K, the header button, a command).
  const [paletteUsed, setPaletteUsed] = useState(false);
  const [spoon, setSpoon] = useState(false);
  const [rabbit, setRabbit] = useState(false);
  /*
   * The boot sequence no longer plays on arrival, and it is not coming back.
   *
   * It held an opaque, scroll-locked black overlay for 2.2-2.9s, swallowed the first
   * click, and the real page had already rendered *behind* it: it was pure dead time,
   * paid for by the one visitor who matters, the one arriving cold from a link. Lighthouse
   * does not emulate reduced motion, so it sat through the black screen too.
   *
   * The sequence itself is good and it survives: ⌘K → "replay intro" plays it on demand.
   * Personality you choose to see is charm. Personality you cannot skip is a toll.
   *
   * Incidentally this was also the only unguarded browser-global read during render in the
   * whole tree (`sessionStorage` in a useState initialiser), which is what made the app
   * impossible to prerender.
   */
  const [booting, setBooting] = useState(false);

  const catchRabbit = useCallback(() => {
    setRabbit(false);
    sessionStorage.setItem(RABBIT_SESSION_KEY, '1');
    burstRain();
    navigate('/updates');
    toast('> the rabbit hole goes deeper...');
  }, [navigate]);

  const ctx: CommandContext = useMemo(
    () => ({
      navigate: (path) => navigate(path),
      toggleTheme,
      toggleFx,
      toggleMorph,
      setAccent,
      replayIntro: () => setBooting(true),
      showSpoon: () => setSpoon(true),
      releaseRabbit: () => setRabbit(true),
    }),
    [navigate, toggleTheme, toggleFx, toggleMorph, setAccent]
  );

  useEffect(() => {
    if (paletteOpen) setPaletteUsed(true);
  }, [paletteOpen]);

  // One title effect for the whole app. Each page used to set its own, and all seven had
  // drifted from what the build prerendered. The prerendered HTML already carries the right
  // title on a cold load; this keeps it right across client-side navigation.
  useEffect(() => {
    document.title = titleForPath(location.pathname);
  }, [location.pathname]);

  useKonami(useCallback(() => setSpoon(true), []));

  // Cmd/Ctrl-K toggles the palette from anywhere.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // The rabbit, once per session. It used to wait for the boot intro to finish; now the
  // intro only plays on request, so the timer simply starts on arrival. It still holds
  // off while the intro is replaying, so it cannot hop about behind a black overlay.
  useEffect(() => {
    if (!motionOk || booting || sessionStorage.getItem(RABBIT_SESSION_KEY)) return;

    const appear = setTimeout(() => setRabbit(true), RABBIT_APPEARS_AFTER);
    return () => clearTimeout(appear);
  }, [motionOk, booting]);

  useEffect(() => {
    if (!rabbit) return;
    const leave = setTimeout(() => {
      setRabbit(false);
      sessionStorage.setItem(RABBIT_SESSION_KEY, '1');
    }, RABBIT_LEAVES_AFTER);
    return () => clearTimeout(leave);
  }, [rabbit]);

  useEffect(() => {
    console.log(
      '%cWake up, Neo...',
      'color:#00ff41;font-family:monospace;font-size:18px;text-shadow:0 0 8px #00ff41'
    );
    console.log(
      '%c> follow the white rabbit. (try the konami code, or press ⌘K and take a pill)',
      'color:#00aa44;font-family:monospace;font-size:12px'
    );
  }, []);

  const finishBoot = useCallback(() => {
    sessionStorage.setItem(BOOT_SESSION_KEY, '1');
    setBooting(false);
  }, []);

  // The accent overrides --primary on the document element rather than on a wrapper,
  // because base-ui portals dialogs to document.body — a wrapper would leave the
  // palette and every modal un-accented. --primary-foreground has to move with it or
  // a filled button becomes near-black text on blue.
  useEffect(() => {
    const root = document.documentElement;
    if (accent) {
      root.style.setProperty('--primary', accent);
      root.style.setProperty('--ring', accent);
      root.style.setProperty('--primary-foreground', 'oklch(0.98 0 0)');
    } else {
      root.style.removeProperty('--primary');
      root.style.removeProperty('--ring');
      root.style.removeProperty('--primary-foreground');
    }
  }, [accent]);

  return (
    <div className="relative flex min-h-screen flex-col">
      <SkipLink />
      <MatrixRain />
      <Atmosphere />
      <Header onOpenPalette={() => setPaletteOpen(true)} />

      {/* tabIndex lets the skip link actually move focus here. */}
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </PageTransition>
        </AnimatePresence>
      </main>

      <Footer />

      <Toaster />
      {/* Mounted on first open and kept mounted thereafter, so the close animation still
          plays and the chunk is only fetched once. */}
      {paletteUsed && (
        <Suspense fallback={null}>
          <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} ctx={ctx} />
        </Suspense>
      )}

      {spoon && <SpoonOverlay onDone={() => setSpoon(false)} />}
      {rabbit && !booting && <WhiteRabbit onCatch={catchRabbit} />}
      {booting && <BootIntro onDone={finishBoot} />}
    </div>
  );
}
