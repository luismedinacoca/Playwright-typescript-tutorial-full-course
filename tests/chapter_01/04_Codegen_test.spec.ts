import { test, expect } from '@playwright/test';

test('Codegen Test Case', async ({ page }) => {
  await page.goto('https://www.youtube.com/');
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Playwright Testers Talk');
  await page.getByRole('button', { name: 'playwright testers talk' }).click();
  await expect(page.getByRole('link', { name: 'Playwright by Testers Talk☑️' })).toBeVisible();
  await expect(page.locator('ytd-section-list-renderer')).toContainText('Playwright by Testers Talk☑️');
  await page.getByRole('link', { name: 'Playwright by Testers Talk☑️' }).click();
  await expect(page.getByRole('link', { name: 'Playwright by Testers Talk☑️' })).toBeVisible();
  await expect(page.locator('#secondary-inner')).toContainText('Playwright by Testers Talk☑️');
  await expect(page.getByRole('link', { name: '▶ Playwright Tutorial Full' })).toBeVisible();
  await expect(page.locator('#secondary-inner')).toContainText('Playwright Tutorial Full Course 2024 | Playwright Testing Tutorial');
});