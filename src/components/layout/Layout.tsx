import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header } from './Header';
import { Footer } from './Footer';
import { PageTransition } from './PageTransition';
import { MatrixRain } from '@/components/MatrixRain';
import { Atmosphere } from '@/components/system/Atmosphere';
import { SkipLink } from '@/components/system/SkipLink';

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="size-8 animate-spin rounded-full border-2 border-matrix-700 border-t-matrix-500" />
    </div>
  );
}

export function Layout() {
  const location = useLocation();

  return (
    <div className="relative flex min-h-screen flex-col">
      <SkipLink />
      <MatrixRain />
      <Atmosphere />
      <Header />

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
    </div>
  );
}
