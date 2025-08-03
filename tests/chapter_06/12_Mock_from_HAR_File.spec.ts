import { test, expect } from '@playwright/test';

test('Mock API from HAR file', async({page}) =>{

  // Recoding a HAR file:
  await page.routeFromHAR('./har/fruits.har', {
  //await page.routeFromHAR('./tests/chapter_06/har/fruits.har', {   /* HAR original file spot */
    url: '*/**/api/v1/fruits',
    update: false,
  })

  // Go to URL
  await page.goto('https://demo.playwright.dev/api-mocking');

  // Validate text:
  await expect(page.getByText('Strawberry')).toBeVisible();
  await expect(page.getByText('playwright typescript by tester talk')).toBeVisible();
  await expect(page.getByText('playwright javascript by tester talk')).toBeVisible();
  await expect(page.getByText('Cypress by tester talk')).toBeVisible();
  await expect(page.getByText('api testing by tester talk')).toBeVisible();
  await expect(page.getByText('rest assured by tester talk')).toBeVisible();
})

