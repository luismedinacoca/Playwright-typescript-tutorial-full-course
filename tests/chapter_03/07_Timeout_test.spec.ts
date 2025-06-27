import { test, expect, FrameLocator } from '@playwright/test';

test.describe.only('TimeOut - Describe', () => {
  let iframe: FrameLocator;
  
  const myToday = () => {
    const today = new Date();
    const todayDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}/${today.getFullYear()}`;
    return todayDate;
  }
  
  test.beforeEach(async ({ page }) => {
    // 1. Navigate to JqueryUI URL:
    await page.goto('https://jqueryui.com/datepicker/');
    // 2. Initialize frameLocator for all tests
    iframe = page.frameLocator('.demo-frame');
  });

  test.afterAll( async () => {
    console.log("Finish Handling Datepicker test cases!")
  })

  test.afterEach( async ({ page }) => {
    await page.waitForTimeout(1500);
  })

  test('Test #01: Tiemouts in test', async({page}) => {
    test.setTimeout(1 * 60 * 1000);
    const dateInput = iframe.locator('#datepicker');
    await dateInput.fill('04/06/1977');
    await dateInput.press('Tab');
    await expect(dateInput).toHaveValue('04/06/1977');
    await page.waitForTimeout(60000);
  });

  test.only('Test #02: Selecting the today date', async () => {
    const today = myToday();
    const dateInput = iframe.locator('#datepicker');
    await dateInput.click();
    await iframe.locator('.ui-datepicker-today').click();
    await dateInput.press('Tab');
    await expect(dateInput).toHaveValue(today + 10, {timeout: 5000});
  });
});

  test('Test #03: Selenium - YouTube', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('Selenium JoanMedia');
    await page.getByRole('button', { name: 'Search', exact: true }).click();
    await expect(page.getByRole('link', { name: 'JoanMedia - YouTube' })).toBeVisible();
    await page.getByRole('link', { name: 'JoanMedia youtuube' }).click({ timeout: 5000 });
    await page.waitForTimeout(1500);
  });


