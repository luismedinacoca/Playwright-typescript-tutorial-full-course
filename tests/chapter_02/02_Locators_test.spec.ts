import { test, expect } from '@playwright/test';

test.describe('Locators in Github', () => {
  test.beforeEach(async ({ page }) => {
    // Use baseURL from config instead of hardcoding
    await page.goto('https://github.com/luismedinacoca');
    // Wait for homepage to load instead of fixed timeout
    await expect(page.getByRole('heading', { name: 'Luis Javier Medina Coca luismedinacoca' })).toBeVisible();
  });

  // test.afterAll(async ({ page }) => {
  //   await page.waitForTimeout(1500);

  //   // Close the shared page after all tests complete
  //   //await page.close();
  // });

  test('Locator getByRole - Sign in', async ({ page }) => {
    // Added navigation promise to handle page load
    const navigationPromise = page.waitForURL('**/luismedinacoca');
    await page.getByRole('link', { name: 'Sign in' }).click();
    await navigationPromise;
    
    // Verify we reached the login page
    await expect(page).toHaveURL(/login/);
    await expect(page.getByRole('heading', { name: 'Sign in to GitHub' })).toBeVisible();
  });

  test('Locator getByLabel - Homepage navigation', async ({ page }) => {
    // Click Pricing link with proper waiting
    await page.getByRole('link', { name: 'Pricing' }).first().click();
    await expect(page).toHaveURL(/pricing/);
    await expect(page.getByRole('heading', { name: 'Try the Copilot-powered platform' })).toBeVisible();
    
    // Use more reliable locator for homepage link
    await page.getByLabel('Homepage', { exact: true }).click();
    await expect(page).toHaveURL('https://github.com');
    await expect(page.getByRole('heading', { name: 'Build and ship software on a single, collaborative platform' })).toBeVisible();
  });

  test('Locator getByAltText - Click on Avatar image', async ({ page }) => {
    await page.getByAltText("View luismedinacoca's full-sized avatar", { exact: true }).click();
    await expect(page).toHaveURL(/githubusercontent/);
  })

  test('Locator getByTestId - Repositories & Projects navigation', async ({ page }) => {
    /*
     *  Open "playwright.config.ts" file
     *  Add in 'use: { ... }' section:
     *     testIdAttribute: 'data-tab-item',
     */
    await page.getByTestId('repositories').first().click();
    await expect(page).toHaveURL(/repositories/);

    await page.goBack();
    await page.waitForTimeout(1000);

    await page.getByTestId('projects').first().click();
    await expect(page).toHaveURL(/projects/);
  })

  test('Locator getByText - Sign up page', async ({ page }) => {
    const signUpBtn = await page.getByText('Sign up').isVisible();
    expect(signUpBtn).toBeTruthy();
    await page.getByText('Sign up').click();

    await expect(page).toHaveURL(/signup/);
  })
});

test.describe('Locators in Youtube', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.youtube.com/');
    await expect(page).toHaveURL(/youtube/);
  })

  test.afterEach(async ({page}) => {
    await page.waitForTimeout(2000);
    await expect(page.locator('#channel-title')).toContainText('Playwright');
    await expect(page.getByRole('link', { name: 'Subscribe', exact: true })).toBeVisible();
    await expect(page.getByRole('link').filter({ hasText: /^$/ })).toBeVisible();
  })

  // test.afterAll(async ({ page }) => {
  //   await page.waitForTimeout(500);
  //   // Close the shared page after all tests complete
  //   await page.close();
  // });

  test('Locator getByPlaceholder - Search PlaywrightDev', async ({ page }) => {
    await page.getByPlaceholder('Search').fill('@Playwrightdev');
    await page.getByRole('combobox', { name: 'Search' }).press('Enter');

  })

  test('Locator Xpath - ', async ({ page }) => {
    await page.locator('//input[@name="search_query"]').fill('@Playwrightdev');
    await page.getByRole('combobox', { name: 'Search' }).press('Enter');
  })

  test('Locator CSS Selector - ', async ({ page }) => {
    await page.locator('input[name="search_query"]').fill('@Playwrightdev');
    await page.getByRole('combobox', { name: 'Search' }).press('Enter');   
  })
})

test.describe('Element Locator Strategies', () => {
  test('Use getByTitle() for essential UI elements - YouTube logo navigation', async ({ page }) => {
    // Navigate to YouTube
    await page.goto('https://www.youtube.com/@PlaywrightDev');
    
    // Verify homepage loaded using title locator (essential check)
    const youtubeLogo = page.getByTitle('YouTube Home').first();
    await expect(youtubeLogo).toBeVisible();

    // Click using title locator (mandatory usage)
    await youtubeLogo.click();

    // Verify navigation back to homepage using multiple checks
    await expect(page).toHaveURL('https://www.youtube.com/');
    await expect(page).toHaveTitle('YouTube');
    await expect(page.getByRole('button', { name: 'Search' }).first()).toBeVisible();
    
    // Additional verification using title locator
    await expect(page.getByTitle('YouTube Home').first()).toBeInViewport();
    await page.waitForTimeout(1500);

    await page.close();
  });
});