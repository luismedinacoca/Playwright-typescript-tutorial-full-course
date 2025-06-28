import { test } from '@playwright/test';

test.describe('Handling Mouse Actions from DuckDuckGo page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
  });

  test.afterEach( async({ page }) => {
    await page.context().clearCookies();
  })

  test('Test #01: Left click', {tag: ['@SmokeTesting']}, async ({ page }) => {
    // 2. Enter action from keyboard: Enter
    await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('@PlaywrightDev');
    await page.getByRole('option', { name: 'playwright dev', exact: true }).click();
    await page.getByRole('link', { name: 'https://playwright.dev'}).first().click({button: 'left'});
  });

  test('Test #02: Middle click', {tag: ['@SmokeTesting', '@RegressionTesting']}, async ({ page }) => {
    // 2. Enter action from keyboard: Enter
    await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('@PlaywrightDev');
    await page.getByRole('option', { name: 'playwright dev', exact: true }).click();
    await page.getByRole('link', { name: 'https://playwright.dev'}).first().click({button: 'middle'});
  });

  test('Test #03: Right click', {tag: ['@RegressionTesting']}, async ({ page }) => {
    // 2. Enter action from keyboard: Enter
    await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('@PlaywrightDev');
    await page.getByRole('option', { name: 'playwright dev', exact: true }).click();
    await page.getByRole('link', { name: 'https://playwright.dev'}).first().click({button: 'right'});
    await page.keyboard.press('ArrowDown'); // Navigate to "Open link in new tab"
    await page.keyboard.press('Enter'); // Select the option
  });

  test('Test #04: Mouse hover', {tag: ['@SmokeTesting']}, async ({ page }) => {
    // 2. Enter action from keyboard: Enter
    await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('@PlaywrightDev');
    await page.getByRole('option', { name: 'playwright dev', exact: true }).click();
    await page.locator('[data-testid="privacy-reminder"]').first().hover();
  });

  test('Test #05: Double click', {tag: ['@RegressionTesting', '@SmokeTesting']}, async ({ page }) => {
    console.log(`Test execution started...`);
    // 2. Enter action from keyboard: Enter
    await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('@PlaywrightDev');
    await page.getByRole('option', { name: 'playwright dev', exact: true }).click();
    await page.getByRole('link', { name: 'https://playwright.org'}).nth(0).click();;
  });
});