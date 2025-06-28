import { test, expect, Browser, chromium } from '@playwright/test';

test.describe('Handling Browser & Context in Playwright', () => {

  test('Test #01: Simple Browser/Tab', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('playwright youtube');
    await page.getByRole('option', { name: 'playwright youtube', exact: true }).first().click();
    await page.getByRole('link', { name: 'Playwright - YouTube'}).first().click();
    await page.waitForTimeout(2000);
  });

  test('Test #02: Multiple Browser', async ({ page, browser }) => {
    await page.goto('https://duckduckgo.com/');
    await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('playwright youtube');
    await page.getByRole('option', { name: 'playwright youtube', exact: true }).first().click();
    await page.getByRole('link', { name: 'Playwright - YouTube'}).first().click();
    await expect(page).toHaveTitle('Playwright - YouTube');

    // Create new Browser:
    const context02 = await browser.newContext();
    const page02 = await context02.newPage();

    await page02.goto('https://duckduckgo.com/');
    await page02.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('playwright youtube');
    await page02.getByRole('option', { name: 'playwright youtube', exact: true }).first().click();
    await page02.getByRole('link', { name: 'Playwright - YouTube'}).first().click();
    await expect(page02).toHaveTitle('Playwright - YouTube');

    await context02.close();
  });

  test('Test #03: Multiple tabs', async ({ browser }) => {
    // Craeate context for handling multiple tabs
    const context = await browser.newContext();
    
    // First tab
    const page1 = await context.newPage();
    await page1.goto('https://duckduckgo.com/');
    
    // Search and select on first tab
    await page1.locator('#searchbox_input').fill('playwright youtube');
    await page1.getByRole('option', { name: 'playwright youtube', exact: true }).first().click();
    
    // Click on Youtube link
    await page1.getByRole('link', { name: 'Playwright - YouTube' }).first().click();
    await expect(page1).toHaveURL(/youtube\.com/i);
    
    // Second tabs (same context/browser)
    const page2 = await context.newPage();
    await page2.goto('https://duckduckgo.com/');
    
    // Search and select on Second tab
    await page2.locator('#searchbox_input').fill('playwright youtube');
    await page2.getByRole('option', { name: 'playwright youtube', exact: true }).first().click();

    await page2.getByRole('link', { name: 'Playwright - YouTube' }).first().click();
    
    // Final assertion/assessment
    await expect(page2).toHaveURL(/youtube\.com/i);
    await expect(page2.getByRole('link', {name: 'playwright.dev'})).toBeVisible();
    
    await page1.waitForTimeout(1500)
    await page2.waitForTimeout(1500)

    // Closing context at the end
    await context.close();
  });
});