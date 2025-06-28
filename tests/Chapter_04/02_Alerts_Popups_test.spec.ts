import { test, expect, Browser, chromium } from '@playwright/test';

test.describe('Handling Alerts & Pop-up in Playwright', () => {

  test('Test #01: Handling Alerts - accept', async ({ page }) => {
    await page.goto('https://www.selenium.dev/documentation/webdriver/interactions/alerts/');
    
    page.once('dialog', dialog => {
      dialog.accept(); // 🚧
      console.log(`Alert message is: ${dialog.message()}`);
      console.log(`Dialog type is: ${dialog.type()}`);
    });

    await page.getByText('See an example alert', {exact: true}).click(); // 🚧
    await page.waitForTimeout(2000);
  });

  test('Test #02: Handling Alerts - dismiss', async ({ page }) => {
    await page.goto('https://www.selenium.dev/documentation/webdriver/interactions/alerts/');
    
    page.once('dialog', dialog => {
      dialog.dismiss(); // 🚧
      console.log(`Alert message is: ${dialog.message()}`);
      console.log(`Dialog type is: ${dialog.type()}`);
    });

    await page.getByText('See an example alert', {exact: true}).click(); // 🚧
    await page.waitForTimeout(2000);
  });

  test('Test #03: Handling Popups - Accept', async ({ page }) => {
    await page.goto('https://www.selenium.dev/documentation/webdriver/interactions/alerts/');
    
    page.once('dialog', dialog => {
      dialog.accept();
      console.log(`Popups message is: ${dialog.message()}`);
      console.log(`Dialog type is: ${dialog.type()}`);
    });

    await page.getByText('See a sample confirm', {exact: true}).click();
    await page.waitForTimeout(2000);
  });

  test('Test #04: Handling Popups - Dismiss', async ({ page }) => {
    await page.goto('https://www.selenium.dev/documentation/webdriver/interactions/alerts/');
    
    page.once('dialog', dialog => {
      dialog.dismiss();
      console.log(`Popups message is: ${dialog.message()}`);
      console.log(`Dialog type is: ${dialog.type()}`);
    });

    await page.getByText('See a sample confirm', {exact: true}).click();
    await page.waitForTimeout(2000);
  });

  test('Test #05: Handling Prompts - Accept', async ({ page }) => {
    await page.goto('https://www.selenium.dev/documentation/webdriver/interactions/alerts/');
    
    page.once('dialog', async(dialog) => {
      console.log(`Prompts message is: ${dialog.message()}`);
      await dialog.accept('PlaYRighT');
      console.log(`Dialog type is: ${dialog.type()}`);
    });

    await page.getByText('See a sample prompt', {exact: true}).click();
    await page.waitForTimeout(2000);
  });

  test('Test #06: Handling Prompts - Dismiss', async ({ page }) => {
    await page.goto('https://www.selenium.dev/documentation/webdriver/interactions/alerts/');
    
    page.once('dialog', async(dialog) => {
      await dialog.dismiss();
      console.log(`Prompts message is: ${dialog.message()}`);
      console.log(`Dialog type is: ${dialog.type()}`);
    });

    await page.getByText('See a sample prompt', {exact: true}).click();
    await page.waitForTimeout(2000);
  });

});