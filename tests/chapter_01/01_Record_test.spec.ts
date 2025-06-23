import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await test.step('Navigating to URL', async () => {
    await page.goto('https://github.com/');
  });

  await test.step('Enter username & password', async () => {
    await page.getByRole('link', { name: 'Sign in' }).click();
    await page.getByRole('textbox', { name: 'Username or email address' }).fill('testing.proof');
    await page.getByRole('textbox', { name: 'Password' }).fill('test!123');
  });
  
  await test.step('Click on Sign In', async () => {
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  });
  
  await test.step('Validate error message', async () => {
    await expect(page.getByRole('alert')).toContainText('Incorrect username or password.');
  });
});