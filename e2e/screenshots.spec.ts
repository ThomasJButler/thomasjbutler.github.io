import { test, expect } from '@playwright/test';
import path from 'path';

const pages = [
  { name: 'home', route: '/' },
  { name: 'about', route: '/about' },
  { name: 'projects', route: '/projects' },
  { name: 'contact', route: '/contact' },
  { name: 'updates', route: '/updates' },
  // Added for the v5 archive in version-timetravel. The case study did not exist in v4, so a
  // set captured without it would under-represent what changed between the two versions.
  { name: 'case-study', route: '/case-study' },
];

const screenshotDir = path.join(__dirname, '..', 'playwright-screenshots');

const themes = ['dark', 'light'] as const;

for (const theme of themes) {
  for (const pg of pages) {
    test(`screenshot: ${pg.name} (${theme})`, async ({ page, browserName }, testInfo) => {
      const viewport = testInfo.project.name.includes('iPhone') ? 'mobile' : 'desktop';

      await page.goto(pg.route, { waitUntil: 'domcontentloaded' });

      // Set theme
      await page.evaluate((t) => {
        localStorage.setItem('theme', t);
        if (t === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }, theme);

      // Wait for theme to apply and content to render
      await page.waitForTimeout(2000);

      // Scroll the full page to trigger all whileInView animations
      await autoScroll(page);

      // Scroll back to top and let animations settle
      await page.evaluate(() => window.scrollTo({ top: 0 }));
      await page.waitForTimeout(1000);

      const suffix = theme === 'dark' ? '' : `-${theme}`;
      await page.screenshot({
        path: path.join(screenshotDir, `${pg.name}-${viewport}-${browserName}${suffix}.png`),
        fullPage: true,
      });
    });
  }
}

// Page-specific content assertions
test.describe('page content checks', () => {
  test('home page has hero and proof section', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { level: 1 })).toContainText("Hey, I'm Tom");
    await expect(page.locator('text=software developer · leeds, yorkshire').first()).toBeVisible();
    // Proof section: the case study card and the "recently" card
    await autoScroll(page);
    await page.waitForTimeout(1000);
    await expect(page.locator('text=case_study')).toBeVisible();
    const cards = page.locator('[data-slot="card"]');
    expect(await cards.count()).toBeGreaterThanOrEqual(2);
  });

  test('projects page has filter tabs and project cards', async ({ page }) => {
    await page.goto('/projects', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1')).toBeVisible();
    // Filter tabs
    await expect(page.locator('[data-slot="tabs-trigger"]')).toHaveCount(6, { timeout: 5000 });
    // At least some project cards visible
    const cards = page.locator('[data-slot="card"]');
    await expect(cards.first()).toBeVisible({ timeout: 5000 });
    expect(await cards.count()).toBeGreaterThanOrEqual(10);
  });

  test('projects page filtering works', async ({ page }) => {
    // networkidle, not domcontentloaded: this route is lazy-loaded, so the prerendered
    // markup is on screen and NOT interactive for a while. Clicking a tab in that window
    // does nothing, the grid stays on "All", and the count assertion below fails with a
    // number that looks like a filtering bug rather than a timing one.
    await page.goto('/projects', { waitUntil: 'networkidle' });

    // Scroll it in and let the whileInView reveals finish before clicking. The tab bar
    // sits below the fold, and the sections above it animate in as you arrive, so a click
    // fired mid-reveal lands where the tab used to be. The filter itself is fine.
    const aiTab = page.locator('[data-slot="tabs-trigger"]', { hasText: 'AI & ML' });
    await aiTab.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
    await aiTab.click();
    // Prove the click landed before counting anything.
    await expect(aiTab).toHaveAttribute('aria-selected', 'true');

    // The featured strip only renders on "All", so a filtered page is grid cards only.
    const cards = page.locator('[data-slot="card"]');
    await expect.poll(() => cards.count()).toBeLessThan(15);
    expect(await cards.count()).toBeGreaterThan(0);

    const allTab = page.locator('[data-slot="tabs-trigger"]', { hasText: 'All' });
    await allTab.click();
    await expect(allTab).toHaveAttribute('aria-selected', 'true');
    await expect.poll(() => cards.count()).toBeGreaterThanOrEqual(10);
  });

  test('about page has tech stack tabs and journey', async ({ page }) => {
    await page.goto('/about', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('text=why this site exists')).toBeVisible();
    // Tech stack tabs
    await expect(page.locator('[data-slot="tabs-trigger"]')).toHaveCount(5, { timeout: 5000 });
    // Journey milestone cards
    await autoScroll(page);
    await page.waitForTimeout(500);
    const journeyCards = page.locator('text=The Beginning');
    await expect(journeyCards).toBeVisible();
  });

  test('about page tech stack tab switching works', async ({ page }) => {
    // networkidle for the same reason as the projects filter: a lazy route is painted
    // long before it can be clicked.
    await page.goto('/about', { waitUntil: 'networkidle' });

    // Same reveal-settling as the projects filter.
    const backend = page.locator('[data-slot="tabs-trigger"]', { hasText: 'Backend' });
    await backend.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
    await backend.click();
    await expect(backend).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('text=Node.js')).toBeVisible();

    const ai = page.locator('[data-slot="tabs-trigger"]', { hasText: 'AI' });
    await ai.click();
    await expect(ai).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('text=LangChain')).toBeVisible();
  });

  test('contact page has form and info', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('text=Talk it through')).toBeVisible();
    // Contact info
    await expect(page.getByText('Leeds, Yorkshire', { exact: true })).toBeVisible();
    await expect(page.locator('text=dev@thomasjbutler.me')).toBeVisible();
    // Form fields
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    // Submit button
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('contact form validation works', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Try to submit empty form — HTML5 validation should prevent it
    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.click();

    // The name field should show validation (it's required)
    const nameInput = page.locator('input[name="name"]');
    await expect(nameInput).toHaveAttribute('required', '');
  });

  test('updates page has timeline milestones', async ({ page }) => {
    await page.goto('/updates', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { name: 'Dev Journey' })).toBeVisible();
    // Scroll to reveal all timeline cards
    await autoScroll(page);
    await page.waitForTimeout(1000);
    // Real entry titles from src/lib/timeline.ts. This used to check "The Beginning",
    // which is an About page milestone and has never existed on this page: text= is a
    // case-insensitive substring match, so it was quietly matching "...the beginning of
    // the career change" inside an entry's prose.
    await expect(page.getByText('Started My Coding Journey', { exact: true })).toBeVisible();
    await expect(page.getByText('Work Coach at the DWP', { exact: true })).toBeVisible();
    // Check we have multiple timeline cards
    const cards = page.locator('[data-slot="card"]');
    expect(await cards.count()).toBeGreaterThanOrEqual(8);
  });

  test('navigation works between pages', async ({ page }, testInfo) => {
    // Desktop nav links are hidden on mobile — skip (mobile menu has its own test)
    if (testInfo.project.name.includes('iPhone')) {
      test.skip();
    }
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { level: 1 })).toContainText("Hey, I'm Tom");

    // Generous timeouts on every hop from here. A client-side navigation into a lazy
    // route takes seconds in a headless browser: AnimatePresence mode="wait" holds the
    // outgoing page for its exit, then the route chunk loads, then the enter animation
    // runs, all while the rain canvas is being software-rasterised. Measured at ~10s a
    // hop locally. It is a headless cost, not a user-facing one.
    await page.locator('nav a', { hasText: 'Projects' }).first().click();
    await page.waitForURL('/projects');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/projects/i, { timeout: 20000 });

    // Navigate to About
    await page.locator('nav a', { hasText: 'About' }).first().click();
    await page.waitForURL('/about');
    await expect(page.locator('text=why this site exists')).toBeVisible({ timeout: 20000 });

    // Navigate to Contact
    await page.locator('nav a', { hasText: 'Contact' }).first().click();
    await page.waitForURL('/contact');
    await expect(page.locator('text=Talk it through').first()).toBeVisible({ timeout: 20000 });
  });

  test('header is sticky and visible on scroll', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Scroll down
    await page.evaluate(() => window.scrollTo({ top: 500 }));
    await page.waitForTimeout(500);

    // Header should still be visible
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(header).toHaveCSS('position', 'sticky');
  });

  test('mobile menu opens and closes', async ({ page }, testInfo) => {
    // Only run on mobile projects
    if (!testInfo.project.name.includes('iPhone')) {
      test.skip();
    }

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Menu toggle button should be visible on mobile
    const menuBtn = page.locator('button[aria-label="Toggle menu"]');
    await expect(menuBtn).toBeVisible();

    // Open menu
    await menuBtn.click();
    await page.waitForTimeout(500);

    // Navigation links should be visible
    await expect(page.locator('nav[aria-label="Mobile navigation"]')).toBeVisible();
    await expect(page.locator('nav[aria-label="Mobile navigation"] a', { hasText: 'Projects' })).toBeVisible();

    // Close menu by clicking a link
    await page.locator('nav[aria-label="Mobile navigation"] a', { hasText: 'Projects' }).click();
    await page.waitForURL('/projects');
  });

  test('footer has social links', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await autoScroll(page);
    await page.waitForTimeout(500);

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.locator('a[aria-label="GitHub"]')).toBeVisible();
    await expect(footer.locator('a[aria-label="LinkedIn"]')).toBeVisible();
    await expect(footer.locator('a[aria-label="Email"]')).toBeVisible();
  });

  test('matrix rain canvas renders', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    // Wait for the delayed canvas to appear (1.5s delay in component)
    await page.waitForTimeout(2500);
    const canvas = page.locator('canvas[aria-hidden="true"]');
    await expect(canvas).toBeVisible();
  });
});

/**
 * Auto-scroll the page in steps to trigger all whileInView animations
 */
async function autoScroll(page: import('@playwright/test').Page) {
  await page.evaluate(async () => {
    const distance = 400;
    const delay = 150;
    const scrollHeight = document.body.scrollHeight;
    let currentPosition = 0;

    while (currentPosition < scrollHeight) {
      window.scrollTo({ top: currentPosition, behavior: 'instant' });
      currentPosition += distance;
      await new Promise((r) => setTimeout(r, delay));
    }
    // Scroll to absolute bottom
    window.scrollTo({ top: scrollHeight });
    await new Promise((r) => setTimeout(r, 300));
  });
}
