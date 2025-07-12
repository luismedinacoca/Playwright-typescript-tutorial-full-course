import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://github.com/joanEsquivel');
  await page.getByRole('link', { name: 'Repositories' }).click();
  await page.getByRole('searchbox', { name: 'Find a repository…' }).click();
  await page.getByRole('searchbox', { name: 'Find a repository…' }).fill('Cypress');
  await page.getByRole('searchbox', { name: 'Find a repository…' }).press('Enter');
  await expect(page.getByRole('link', { name: 'curso-de-cypress' })).toBeVisible();
  await expect(page.locator('#user-profile-frame')).toContainText('curso-de-cypress');
});