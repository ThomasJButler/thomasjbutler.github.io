import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header } from './Header';
import { Footer } from './Footer';
import { PageTransition } from './PageTransition';
import { MatrixRain } from '@/components/MatrixRain';
import { Atmosphere } from '@/components/system/Atmosphere';
import { SkipLink } from '@/components/system/SkipLink';
import { Toaster } from '@/components/system/Toaster';
import { CommandPalette } from '@/components/system/CommandPalette';
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
      <div className="size-8 animate-spin rounded-full border-2 border-matrix-700 border-t-matrix-500" />
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
  const [spoon, setSpoon] = useState(false);
  const [rabbit, setRabbit] = useState(false);
  const [booting, setBooting] = useState(
    () => motionOk && !sessionStorage.getItem(BOOT_SESSION_KEY)
  );

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

  // The rabbit, once per session, and only once the boot intro is out of the way.
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
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} ctx={ctx} />

      {spoon && <SpoonOverlay onDone={() => setSpoon(false)} />}
      {rabbit && !booting && <WhiteRabbit onCatch={catchRabbit} />}
      {booting && <BootIntro onDone={finishBoot} />}
    </div>
  );
}
