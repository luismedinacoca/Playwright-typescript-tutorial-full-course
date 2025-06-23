import { test, expect } from '@playwright/test';

test('Capture Screenshot in Playwright', async ({ page }) => {
  const date = Date.now();
  await page.goto('https://www.youtube.com/@testerstalk');

  // Element screenshot
  const date01 = Date.now();
  await page.getByRole('heading', {name: "Testers Talk"})
    .nth(0)
    .screenshot({path: `./screenshots/ElementScreenshot_${date01}.png`});
    
  await page.waitForTimeout(500);
  await page.locator('#page-header-container')
    .screenshot({path: `./screenshots/ElementScreenshot_${date}.png`});

  // Page screenshot
  await page.screenshot({path: `./screenshots/PageScreenshot_${date}.png`});

  await page.waitForTimeout(1500);
  
  // Full page screenshot
  await page.screenshot({path: `./screenshots/FullPageScreenshot_${date01}.png`, fullPage: true});
  
  //await page.close()
});