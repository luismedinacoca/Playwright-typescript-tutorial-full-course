import { test, expect, Browser, chromium } from '@playwright/test';

test.describe('Handling Mouse Actions from DuckDuckGo page', () => {
  test.beforeEach(async ({ page }) => {
    let browser: Browser;
    // 1. Navigate to DuckDuckGo URL:
    await page.goto('https://duckduckgo.com/');
  });

  test.afterEach( async({ page }) => {
    await page.context().clearCookies();
  })

  test('Test #01: Left click', async ({ page }) => {
    // 2. Enter action from keyboard: Enter
    await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('@PlaywrightDev');
    await page.getByRole('option', { name: 'playwright dev', exact: true }).click();
    await page.getByRole('link', { name: 'https://playwright.dev'}).first().click({button: 'left'});
    await page.waitForTimeout(1500);
  });

  test('Test #02: Middle click', async ({ page }) => {
    // 2. Enter action from keyboard: Enter
    await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('@PlaywrightDev');
    await page.getByRole('option', { name: 'playwright dev', exact: true }).click();
    await page.getByRole('link', { name: 'https://playwright.dev'}).first().click({button: 'middle'});
    await page.waitForTimeout(1500);
  });

  test('Test #03: Right click', async ({ page }) => {
    // 2. Enter action from keyboard: Enter
    await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('@PlaywrightDev');
    await page.getByRole('option', { name: 'playwright dev', exact: true }).click();
    await page.getByRole('link', { name: 'https://playwright.dev'}).first().click({button: 'right'});
    await page.keyboard.press('ArrowDown'); // Navigate to "Open link in new tab"
    await page.keyboard.press('Enter'); // Select the option
    await page.waitForTimeout(500);
  });

  test('Test #04: Mouse hover', async ({ page }) => {
    // 2. Enter action from keyboard: Enter
    await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('@PlaywrightDev');
    await page.getByRole('option', { name: 'playwright dev', exact: true }).click();
    await page.waitForTimeout(1500);
    await page.locator('[data-testid="privacy-reminder"]').first().hover();
    await page.waitForTimeout(1500);
  });

  test('Test #05: Double click', async ({ page }) => {
    console.log(`Test execution started...`);
    // 2. Enter action from keyboard: Enter
    await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('@PlaywrightDev');
    await page.getByRole('option', { name: 'playwright dev', exact: true }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('link', { name: 'https://playwright.dev'}).nth(0).dblclick();;
    await page.waitForTimeout(1500);
  });
});