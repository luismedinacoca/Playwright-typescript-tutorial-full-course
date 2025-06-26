import { test, expect } from '@playwright/test';

test('Visual Page Comparison', async ({ page }) => {
  await page.goto('https://github.com/login');
  await expect(page).toHaveScreenshot('GithubPage.png');

  await page.locator('#login_field').fill('username_email'); // due to this username_email entered!
  await expect(page).toHaveScreenshot('Githubpage.png'); // it fails here!
})
  
test('Element Visual Comparison - FAILED', async ({ page }) => {
  // Go to URL
  await page.goto('https://github.com/login');
  //await expect(page).toHaveScreenshot('Github-login.png');
  
  const form = await page.locator('[class="auth-form-body mt-3"]')
  await expect(form).toHaveScreenshot('GithubForm.png');
  
  await page.locator('#login_field').fill('username_email');
  await expect(form).toHaveScreenshot('GithubForm.png');
})

test('Element Visual Comparison - PASSED', async ({page}) => {
  await page.goto('https://github.com/login');

  const form = await page.locator('[class="auth-form-body mt-3"]');
  const emptyForm =await form.screenshot({path: `./screenshots/emptyForm.png`});
    
  await page.locator('#login_field').fill('username_email');
  const filledForm = await form.screenshot({path: `./screenshots/filledForm.png`});

  await expect(emptyForm.equals(filledForm)).toBeFalsy();
})

