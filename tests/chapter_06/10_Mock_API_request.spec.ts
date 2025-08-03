import { test, expect } from '@playwright/test';

test('Mock API request', async({page}) =>{

  // Mock API request
  await page.route('*/**/api/v1/fruits', async (route) => {
    const json = [
      {name: 'playwright typescript by testers talk', id: 18},
      {name: 'cypress bytesters talk', id: 46},
      {name: 'playwright javascript by testers talk', id: 53},
      {name: 'api testing by testers talk', id: 72},
    ];
    await route.fulfill({json});

    // Go to URL:
    await page.goto('https://demo.playwright.dev/api-mocking');

    // Validate the response:
    await expect(page.getByText('playwright typescript by testers talk')).toBeVisible();
    await expect(page.getByText('cypress bytesters talk')).toBeVisible();
    await expect(page.getByText('playwright javascript by testers talk')).toBeVisible();
    await expect(page.getByText('api testing by testers talk')).toBeVisible();
  })
})
