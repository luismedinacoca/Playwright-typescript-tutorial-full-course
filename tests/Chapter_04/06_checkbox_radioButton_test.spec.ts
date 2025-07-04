import { test, expect } from '@playwright/test';

test.describe('Working with checkbo & radio buttons', () => {
  test('Test #01: Applying .allInnerTexts() method', async ({ page }) => {
    await page.goto('https://jqueryui.com/checkboxradio');

    const iframe = await page.frameLocator('[class="demo-frame"]');

    await expect(iframe.locator('[for="radio-1"]')).not.toBeChecked();
    await page.waitForTimeout(1500);
    
    await iframe.locator('[for="radio-1"]').check();  
    await expect(iframe.locator('[for="radio-1"]')).toBeChecked();
    await page.waitForTimeout(1500);
    
    console.log("===========================");
    
    await expect(iframe.locator('[for="checkbox-3"]')).not.toBeChecked();
    await page.waitForTimeout(1500);
    await iframe.locator('[for="checkbox-3"]').check();
    await page.waitForTimeout(1500);
    await expect(iframe.locator('[for="checkbox-3"]')).toBeChecked();
    await iframe.locator('[for="checkbox-3"]').uncheck();
    await page.waitForTimeout(1500);
    await expect(iframe.locator('[for="checkbox-3"]')).not.toBeChecked();
  })  
});