import { test, expect, FrameLocator } from '@playwright/test';

test.describe('Hard Assertions in Playwright', () => {
  let page: FrameLocator;
  test.beforeEach(async ({page}) => {
    // Go to URL:
    await page.goto('https://duckduckgo.com/');
  })

  // test.afterAll( async ({page}) => {
  //   await page.waitForTimeout(2000);
  //   await page.close();
  // })

  test('Visible assertion - toBeVisible()', async({ page }) => {
    // visible, editable, enabled, empty
    const search = page.getByRole('combobox', {name: 'Search with DuckDuckGo'});
    await expect(search.first()).toBeVisible();  // 👈🏽
    console.log("await expect(search.first()).toBeVisible();")
  })

  test('Editable assertion - toBeEditable()', async({ page }) => {
    // visible, editable, enabled, empty
    const search = page.getByRole('combobox', {name: 'Search with DuckDuckGo'});
    await expect(search.first()).toBeEditable();  // 👈🏽
    console.log("await expect(search.first()).toBeEditable();")
  })

  test('Enabled assertion - toBeEnabled()', async({ page }) => {
    // visible, editable, enabled, empty
    const search = page.getByRole('combobox', {name: 'Search with DuckDuckGo'});
    await expect(search.first()).toBeEnabled();  // 👈🏽
    console.log("await expect(search.first()).toBeEnabled();")
  })

  test('Empty assertion - toBeEmpty()', async({ page }) => {
    // visible, editable, enabled, empty
    const search = page.getByRole('combobox', {name: 'Search with DuckDuckGo'});
    await expect(search.first()).toBeEmpty();  // 👈🏽
    console.log("await expect(search.first()).toBeEmpty();")
  })

  test('URL, Title, Text assertions', async({ page }) => {
    // visible, editable, enabled, empty
    const search = page.getByRole('combobox', {name: 'Search with DuckDuckGo'});
    await search.first().click();
    await search.first().fill('playwright by testers talk');
    await search.first().first().press('Enter');

    await page.getByRole('link', {name: 'Playwright by Testers Talk☑ - YouTube'}).first().click();
    
    await test.step('URL Assertion - expect(page).toHaveURL()', async () => {
      await expect(page).toHaveURL('https://www.youtube.com/playlist?list=PLUeDIlio4THEgPRVJRqZRS8uw8hhVNQCM');  // 👈🏽
      console.log("await expect(page).toHaveURL('https://www.youtube.com/playlist?list=PLUeDIlio4THEgPRVJRqZRS8uw8hhVNQCM');");
    })

    await test.step('Title assertion - expect(page).toHaveTitle()', async () => {
      await expect(page).toHaveTitle('Playwright by Testers Talk☑️ - YouTube');  // 👈🏽
      console.log("await expect(page).toHaveTitle('Playwright by Testers Talk☑️ - YouTube');");
    })

    await test.step('Text assertion - expect(page.locator()).toHaveText("Text")', async () => {
      await expect(page.locator('h1 span[role="text"]').nth(1)).toHaveText('Playwright by Testers Talk☑️')
      console.log(`await expect(page.locator('h1 span[role="text"]').nth(1)).toHaveText('Playwright by Testers Talk☑️')`);
    })

    await test.step('Count assertion - expect(page.locator()).toHaveCount(number)', async () => {
      await expect(page.locator('h1 span[role="text"]')).toHaveCount(2)
      console.log(`await expect(page.locator('h1 span[role="text"]')).toHaveCount(2)`);
    })

    await test.step('Disabled assertion - expect(page.locator()).toHaveCount(number)', async () => {
      await expect(page.locator('h1 span[role="text"]').first()).not.toBeDisabled();
      console.log(`await expect(page.locator('h1 span[role="text"]').nth(0)).not.toBeDisabled();`);
    })
  })
});