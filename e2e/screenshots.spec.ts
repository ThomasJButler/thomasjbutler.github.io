import { test, expect } from '@playwright/test';
import path from 'path';

const pages = [
  { name: 'home', route: '/' },
  { name: 'about', route: '/about' },
  { name: 'projects', route: '/projects' },
  { name: 'services', route: '/services' },
  { name: 'contact', route: '/contact' },
  { name: 'updates', route: '/updates' },
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
  test('home page has hero and system status dashboard', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('text=Hey, I\'m Tom')).toBeVisible();
    await expect(page.locator('text=Full Stack AI Engineer')).toBeVisible();
    // System status dashboard
    await autoScroll(page);
    await page.waitForTimeout(1000);
    await expect(page.locator('text=system_status')).toBeVisible();
    // Stats + skill/activity cards
    const cards = page.locator('[data-slot="card"]');
    expect(await cards.count()).toBeGreaterThanOrEqual(4);
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
    await page.goto('/projects', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Click the "AI & ML" tab
    await page.locator('[data-slot="tabs-trigger"]', { hasText: 'AI & ML' }).click();
    await page.waitForTimeout(500);

    // All visible cards should be AI projects
    const cards = page.locator('[data-slot="card"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(15); // Should be filtered down

    // Click "All" tab to reset
    await page.locator('[data-slot="tabs-trigger"]', { hasText: 'All' }).click();
    await page.waitForTimeout(500);
    expect(await cards.count()).toBeGreaterThanOrEqual(10);
  });

  test('about page has tech stack tabs and journey', async ({ page }) => {
    await page.goto('/about', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('text=Why I Love Programming')).toBeVisible();
    // Tech stack tabs
    await expect(page.locator('[data-slot="tabs-trigger"]')).toHaveCount(4, { timeout: 5000 });
    // Journey milestone cards
    await autoScroll(page);
    await page.waitForTimeout(500);
    const journeyCards = page.locator('text=The Beginning');
    await expect(journeyCards).toBeVisible();
  });

  test('about page tech stack tab switching works', async ({ page }) => {
    await page.goto('/about', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Click "Backend" tab
    await page.locator('[data-slot="tabs-trigger"]', { hasText: 'Backend' }).click();
    await page.waitForTimeout(500);
    // Should show backend tech badges
    await expect(page.locator('text=Node.js')).toBeVisible();

    // Click "AI & Tools" tab
    await page.locator('[data-slot="tabs-trigger"]', { hasText: 'AI' }).click();
    await page.waitForTimeout(500);
    await expect(page.locator('text=LangChain')).toBeVisible();
  });

  test('services page has service cards and accordion', async ({ page }) => {
    await page.goto('/services', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('text=What I Build')).toBeVisible();
    // Service cards
    const serviceCards = page.locator('[data-slot="card"]');
    await expect(serviceCards.first()).toBeVisible({ timeout: 5000 });
    expect(await serviceCards.count()).toBeGreaterThanOrEqual(4);
    // Accordion triggers
    await autoScroll(page);
    await page.waitForTimeout(500);
    const accordionTriggers = page.locator('[data-slot="accordion-trigger"]');
    expect(await accordionTriggers.count()).toBeGreaterThanOrEqual(1);
  });

  test('services accordion expands', async ({ page }) => {
    await page.goto('/services', { waitUntil: 'domcontentloaded' });
    await autoScroll(page);
    await page.waitForTimeout(1000);

    // Click first accordion trigger
    const trigger = page.locator('[data-slot="accordion-trigger"]').first();
    await trigger.click();
    await page.waitForTimeout(500);

    // Content should be visible
    const content = page.locator('[data-slot="accordion-content"]').first();
    await expect(content).toBeVisible();
  });

  test('contact page has form and info', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('text=Get in Touch')).toBeVisible();
    // Contact info
    await expect(page.locator('text=York, UK')).toBeVisible();
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
    await expect(page.locator('text=Dev Journey')).toBeVisible();
    // Scroll to reveal all timeline cards
    await autoScroll(page);
    await page.waitForTimeout(1000);
    // Check specific milestones exist
    await expect(page.locator('text=The Beginning')).toBeVisible();
    await expect(page.locator('text=Full Stack AI Engineering')).toBeVisible();
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
    await expect(page.locator('text=Hey, I\'m Tom')).toBeVisible();

    // Navigate to Projects via nav link
    await page.locator('nav a', { hasText: 'Projects' }).first().click();
    await page.waitForURL('/projects');
    await expect(page.locator('h1', { hasText: 'Projects' })).toBeVisible();

    // Navigate to About
    await page.locator('nav a', { hasText: 'About' }).first().click();
    await page.waitForURL('/about');
    await expect(page.locator('text=Why I Love Programming')).toBeVisible();

    // Navigate to Contact
    await page.locator('nav a', { hasText: 'Contact' }).first().click();
    await page.waitForURL('/contact');
    await expect(page.locator('text=Get in Touch')).toBeVisible();
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
