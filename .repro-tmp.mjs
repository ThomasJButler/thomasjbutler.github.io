import { chromium } from 'playwright';

const base = 'http://localhost:4321';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.addInitScript(() => {
  window.__calls = [];
  const orig = window.scrollTo.bind(window);
  window.scrollTo = function (...args) {
    window.__calls.push({ t: Math.round(performance.now()), args: JSON.parse(JSON.stringify(args)), from: Math.round(window.scrollY) });
    return orig(...args);
  };
});
await page.goto(`${base}/services`, { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
console.log('reducedMotion mq:', await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches));
console.log('fx localStorage:', await page.evaluate(() => JSON.stringify(Object.entries(localStorage))));
console.log('rabbit sessionStorage:', await page.evaluate(() => sessionStorage.getItem('v5:rabbit')));

await page.mouse.move(600, 400);
await page.mouse.wheel(0, 1400);
await page.waitForTimeout(800);
console.log('scrollY after wheel:', await page.evaluate(() => Math.round(window.scrollY)));

// now sit still for 26s (rabbit appears at 22s)
for (let i = 0; i < 13; i++) {
  await page.waitForTimeout(2000);
  const y = await page.evaluate(() => Math.round(window.scrollY));
  const calls = await page.evaluate(() => window.__calls.length);
  process.stdout.write(`t=${(i + 1) * 2}s scrollY=${y} scrollToCalls=${calls}\n`);
}
console.log('calls:', JSON.stringify(await page.evaluate(() => window.__calls)));
await browser.close();
