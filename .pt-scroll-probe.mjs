import { chromium } from 'playwright';

const BASE = 'http://localhost:4181';
const browser = await chromium.launch();

async function fresh(path) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.addInitScript(() => {
    window.__scrolls = [];
    const orig = window.scrollTo.bind(window);
    window.scrollTo = (...args) => {
      window.__scrolls.push({ args: JSON.parse(JSON.stringify(args)), from: window.scrollY });
      return orig(...args);
    };
  });
  await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500); // hydration
  return { ctx, page };
}

// TEST 1: land on /services, scroll down, click the theme toggle
{
  const { ctx, page } = await fresh('/services/');
  await page.evaluate(() => window.scrollTo(0, 1600));
  await page.waitForTimeout(400);
  await page.evaluate(() => (window.__scrolls = []));
  const before = await page.evaluate(() => window.scrollY);
  const toggle = page.getByRole('button', { name: /switch to (light|dark) mode/i });
  await toggle.first().click();
  await page.waitForTimeout(700);
  const after = await page.evaluate(() => window.scrollY);
  console.log('TEST 1  theme toggle on landing /services');
  console.log('  scrollY before:', before, ' after:', after);
  console.log('  scrollTo calls:', JSON.stringify(await page.evaluate(() => window.__scrolls)));
  console.log('  VERDICT:', before > 100 && after === 0 ? '*** JUMPED TO TOP ***' : 'no jump');
  await ctx.close();
}

// TEST 2: land on /, scroll, touch nothing, wait out the 22s rabbit timer
{
  const { ctx, page } = await fresh('/');
  await page.evaluate(() => window.scrollTo(0, 1400));
  await page.waitForTimeout(400);
  await page.evaluate(() => (window.__scrolls = []));
  const before = await page.evaluate(() => window.scrollY);
  console.log('TEST 2  zero interaction, wait 24s on landing /');
  console.log('  scrollY before wait:', before);
  await page.waitForTimeout(24000);
  const after = await page.evaluate(() => window.scrollY);
  console.log('  scrollY after 24s:', after);
  console.log('  scrollTo calls:', JSON.stringify(await page.evaluate(() => window.__scrolls)));
  console.log('  VERDICT:', before > 100 && after === 0 ? '*** JUMPED TO TOP ***' : 'no jump');
  await ctx.close();
}

// TEST 3 (control): navigate once, scroll, then toggle theme -> should NOT jump
{
  const { ctx, page } = await fresh('/services/');
  await page.getByRole('link', { name: /^about$/i }).first().click();
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(300);
  await page.evaluate(() => (window.__scrolls = []));
  const before = await page.evaluate(() => window.scrollY);
  await page.getByRole('button', { name: /switch to (light|dark) mode/i }).first().click();
  await page.waitForTimeout(700);
  const after = await page.evaluate(() => window.scrollY);
  console.log('TEST 3  control: after a real navigation, toggle theme');
  console.log('  scrollY before:', before, ' after:', after);
  console.log('  scrollTo calls:', JSON.stringify(await page.evaluate(() => window.__scrolls)));
  await ctx.close();
}

await browser.close();
