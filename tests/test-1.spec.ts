import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  /*
  await page.goto('https://duckduckgo.com/');
  await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('Selenium JoanMedia');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await expect(page.getByRole('link', { name: 'JoanMedia - YouTube' })).toBeVisible();
  await expect(page.locator('[data-testid="web-vertical"] [data-testid="mainline"]')).toContainText('JoanMedia - YouTube');
  await expect(page.locator('[data-testid="web-vertical"]').getByRole('list').first()).toContainText('› c › joanmedia');
  await page.getByText('JoanMedia - YouTube', { exact: true  }).first().click();
  await expect(page.getByText('Playlists')).toBeVisible();
  await expect(page.locator('yt-tab-group-shape')).toContainText('Playlists');
  await page.getByText('Playlists').click();
  await page.waitForTimeout(1500);
  */

  /*
  await page.goto('https://duckduckgo.com/');
  await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('Cypress JoanMedia');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await expect(page.getByRole('link', { name: 'JoanMedia - YouTube' })).toBeVisible();
  await expect(page.locator('[data-testid="web-vertical"] [data-testid="mainline"]')).toContainText('JoanMedia - YouTube');
  await expect(page.locator('[data-testid="web-vertical"]').getByRole('list').first()).toContainText('› c › joanmedia');
  await page.getByText('JoanMedia - YouTube', { exact: true  }).first().click();
  await expect(page.getByText('Playlists')).toBeVisible();
  await expect(page.locator('yt-tab-group-shape')).toContainText('Playlists');
  await page.getByText('Playlists').click();
  await page.waitForTimeout(1500);
  */

  await page.goto('https://duckduckgo.com/');
  await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('Playwright JoanMedia');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await expect(page.getByRole('link', { name: 'JoanMedia - YouTube' })).toBeVisible();
  await expect(page.locator('[data-testid="web-vertical"] [data-testid="mainline"]')).toContainText('JoanMedia - YouTube');
  await expect(page.locator('[data-testid="web-vertical"]').getByRole('list').first()).toContainText('› c › joanmedia');
  await page.getByText('JoanMedia - YouTube', { exact: true  }).first().click();
  await expect(page.getByText('Playlists')).toBeVisible();
  await expect(page.locator('yt-tab-group-shape')).toContainText('Playlists');
  await page.getByText('Playlists').click();
  await page.waitForTimeout(1500);
});


test('test002', async ({ page }) => {
  await page.goto('https://github.com/joanEsquivel');
  await page.getByRole('link', { name: 'Repositories' }).click();
  await page.getByRole('searchbox', { name: 'Find a repository…' }).click();
  await page.getByRole('searchbox', { name: 'Find a repository…' }).fill('Cypress');
  await page.getByRole('searchbox', { name: 'Find a repository…' }).press('Enter');
  await expect(page.getByRole('link', { name: 'curso-de-cypress' })).toBeVisible();
  await expect(page.locator('#user-profile-frame')).toContainText('curso-de-cypress');
});