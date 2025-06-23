import { test, expect } from '@playwright/test';

test.describe('Handling Keyboard from DuckDuckGo page', () => {
  test.beforeEach(async ({ page }) => {
    // 1. Navigate to DuckDuckGo URL:
    await page.goto('https://duckduckgo.com/');
  });
  
  test.afterAll(async ({ page }) => {
    await page.close();  
  });

  test('Test #01: Hadling Keyboard - Enter/ControlOrMeta+A/Delete', async ({ page }) => {
    // 2. Enter action from keyboard: Enter
    await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('@PlaywrightDev');
    await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).press('Enter');
    await expect(page.getByRole('link', { name: 'Fast and reliable end-to-end testing for modern web apps | Playwright', exact: true })).toBeVisible();
    await expect(page.locator('[data-testid="web-vertical"] [data-testid="mainline"]')).toContainText('Fast and reliable end-to-end testing for modern web apps | Playwright');
    await page.waitForTimeout(1500);

    // 3. Enter action from keyboard: ControlOrmeta+A/Delete
    await page.locator('#search_form_input').click();
    //await page.locator('#search_form_input').press('ControlOrMeta+Shift+ArrowLeft');
    await page.locator('#search_form_input').press('ControlOrMeta+A');
    await page.locator('#search_form_input').press('Delete');
    //await page.locator('#search_form_input').click();
    await page.locator('#search_form_input').fill('cypress');
    await page.locator('#search_form_input').press('Enter');
    await page.waitForTimeout(2500);
  });

  test('Test #02: Handling Keyboard using tab/Delete/ControOrMeta+A/Enter', async ({ page }) => {
    // 2. Buscar término inicial
    const searchBox = page.getByRole('combobox', { name: 'Search with DuckDuckGo' });
    await searchBox.fill('@PlaywrightDev');
    await searchBox.press('Enter');
    
    // 3. Verificar resultados (con espera implícita)
    await expect(page.getByRole('link', { 
      name: 'Fast and reliable end-to-end testing for modern web apps | Playwright',
      exact: true 
    })).toBeVisible();

    // 4. Limpiar el campo de búsqueda de forma eficiente
    const searchBoxText = page.locator('#search_form_input');
    await searchBoxText.press('ControlOrMeta+A');
    await searchBoxText.press('Delete');
    
    // 5. Realizar nueva búsqueda
    await searchBoxText.fill('cypress');
    //expect(await page.getByRole('option', {name: 'cypress documentation'})).toBeVisible({timeout: 5000});
    await searchBoxText.press('Tab');
    await searchBoxText.press('Enter');
    
    // 6. Verificar cambio de resultados
    await expect(page.getByText('Testing Frameworks for Javascript | Write, Run, Debug | Cypress', { exact: true }).first()).toBeVisible({
      timeout: 5000
    });
  });
});