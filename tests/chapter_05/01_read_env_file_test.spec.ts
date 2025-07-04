import { test, expect } from '@playwright/test';

test('Read ENV file config', async ({ page }) => {
  await page.goto(`${process.env.DUCK_GO_URL}`);
  await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('@PlaywrightDev');
  await page.getByRole('option', { name: 'playwright dev', exact: true }).click();
  await page.getByRole('link', { name: 'https://playwright.dev'}).first().click();
  await page.waitForTimeout(1500);
})  

test.describe('Iterating matching elements', () => {
  test('Test #01: Applying .allInnerTexts() method', async ({ page }) => {
    await page.goto(`${process.env.GITHUB_URL}Klerith?tab=repositories`);
    const repoNames = await page.locator('[itemprop="name codeRepository"]').allInnerTexts();
    
    for(const repo of repoNames){
      console.log(`test 01: ${repo}`);
    }
  })
  
  test('Test #02: applying page.$$() method', async ({ page }) => {
    await page.goto(`${process.env.GITHUB_URL}Klerith?tab=repositories`);
    const repoLinks = await page.$$('[itemprop="name codeRepository"]');
    
    for (const repoLink of repoLinks) {
      const text = await repoLink.textContent();
      console.log("test 02: ", text?.trim());
    }
  })
  
  test('Test #03: classic foor loop', async ({ page }) => {
    await page.goto(`${process.env.GITHUB_URL}Klerith?tab=repositories`);
    const repoLinks = await page.$$('[itemprop="name codeRepository"]');
    
    for(let index = 0; index < repoLinks.length; index++){
      const repoLink = repoLinks[index];
      const text = await repoLink.textContent();
      console.log("test 03: ", text?.trim());
    }
  })
  
  test('Test #04: classic foor loop', async ({ page }) => {
    await page.goto(`${process.env.GITHUB_URL}Klerith?tab=repositories`);
    const repoLinks = await page.locator('[itemprop="name codeRepository"]');
    const count = await repoLinks.count();
    
    for(let index = 0; index < count; index++){
      const text = await repoLinks.nth(index).textContent();
      console.log(`test 04: ${text?.trim()}`);
    }
  })
});