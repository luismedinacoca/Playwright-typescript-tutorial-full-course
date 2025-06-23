import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://duckduckgo.com/');
  await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('@PlaywrightDev');
  await page.getByRole('option', { name: 'playwright dev', exact: true }).click();
});