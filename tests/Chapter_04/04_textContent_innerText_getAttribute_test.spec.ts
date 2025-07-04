import { test, expect } from '@playwright/test';

test.describe('textContent() - innerText() - getAttribute() methods', () => {
  test('Test #01: textContent() method', async ({ page }) => {
    await page.goto('https://github.com/klerith');
    
    const username = await page.locator('[itemprop="name"]').textContent();
    const finalname = username?.trim();
    console.log(`Final name is: ${finalname}`);
    expect(finalname).toBe('Fernando Herrera');
  });

  test('Test #02: innertext() method', async ({ page }) => {
    await page.goto('https://github.com/klerith');
    
    const username = await page.locator('[itemprop="additionalName"]').innerText();
    const finalname = username?.trim();
    console.log(`Final name is: ${finalname}`);
    expect(finalname).toBe('Klerith');
  });

  test('Test #03: getByAttribute() method', async ({ page }) => {
    await page.goto('https://github.com/klerith');
  
    const attributeValue = await page.getByTestId('repositories').first().getAttribute('data-selected-links');
    console.log(`Attribute value: ${attributeValue}`);
    expect(attributeValue).toBe('repositories /Klerith?tab=repositories');
  });
});