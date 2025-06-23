import { test, expect } from '@playwright/test';

test.describe('Formulario de Creación de Cuenta de Facebook', () => {
  test.beforeEach(async ({ page }) => {
    // go to URL:
    await page.goto('https://jqueryui.com/droppable/');
  });
  

  test('Test #01: Handling Drag & Drop element which failed', async ({ page }) => {
    /*********** This drag & drop belongs to an Iframe ***********/
    const dragElement = await page.locator('[#draggable]');
    const dropElement = await page.locator('[#droppable]');
    
    await dragElement.dragTo(dropElement);

    expect(dragElement).toBeVisible();
    expect(dropElement).toBeVisible();    
    /*************************************************************/
  });

  test.only('Test #02: Seleccionar Mes por texto visible (Octubre)', async ({ page }) => {
    console.log(`Test execution started...`);
    const iframe = page.frameLocator('[class="demo-frame"]');

    const dragElement = iframe.locator('[id="draggable"]');
    const dropElement = iframe.locator('[id="droppable"]');

    await dragElement.dragTo(dropElement);
    expect(dragElement).toBeVisible();
    expect(dropElement).toBeVisible();
  });
});