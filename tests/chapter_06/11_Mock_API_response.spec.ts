import { test, expect } from '@playwright/test';

test('Mock API request', async({page}) =>{

  // Mock API response
  await page.route('*/**/api/v1/fruits', async (route) => {

    const response = await route.fetch();
    const json = await response.json();

    json.push({name: 'playwright typescript by testers talk', id: 18})
    json.push({name: 'cypress bytesters talk', id: 46})
    json.push({name: 'playwright javascript by testers talk', id: 53})
    json.push({name: 'api testing by testers talk', id: 72})
    
    await route.fulfill({response, json});

    // Go to URL:
    await page.goto('http://demo.playwright.dev/api-mocking');

    // Validate the response:
    await expect(page.getByText('playwright typescript by testers talk')).toBeVisible();
    await expect(page.getByText('cypress bytesters talk')).toBeVisible();
    await expect(page.getByText('playwright javascript by testers talk')).toBeVisible();
    await expect(page.getByText('api testing by testers talk')).toBeVisible();
  })
})
