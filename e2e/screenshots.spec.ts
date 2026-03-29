import { test } from '@playwright/test';
import path from 'path';

const pages = [
  { name: 'home', route: '/' },
  { name: 'about', route: '/about' },
  { name: 'projects', route: '/projects' },
  { name: 'services', route: '/services' },
  { name: 'contact', route: '/contact' },
  { name: 'sitemap', route: '/sitemap' },
  { name: 'updates', route: '/updates' },
];

const screenshotDir = path.join(__dirname, '..', 'playwright-screenshots');

for (const pg of pages) {
  test(`screenshot: ${pg.name}`, async ({ page, browserName }, testInfo) => {
    const viewport = testInfo.project.name.includes('iPhone') ? 'mobile' : 'desktop';

    // The app loads from /react.html and uses ?redirect= for client-side routing
    const url = pg.route === '/'
      ? '/react.html'
      : `/react.html?redirect=${pg.route}`;

    await page.goto(url, { waitUntil: 'networkidle' });
    // Allow animations and lazy-loaded content to settle
    await page.waitForTimeout(3000);

    await page.screenshot({
      path: path.join(screenshotDir, `${pg.name}-${viewport}-${browserName}.png`),
      fullPage: true,
    });
  });
}
