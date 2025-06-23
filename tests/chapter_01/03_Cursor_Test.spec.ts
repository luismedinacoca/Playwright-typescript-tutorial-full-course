// Import playwright module
import { test, expect } from '@playwright/test';

test('Cursor', async ({page}) => {
  await page.goto('https://www.youtube.com/');
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Playwright by Testers Talk');
  await page.getByRole('combobox', { name: 'Search' }).press('Enter');
  await expect(page.getByRole('link', { name: 'Playwright API Testing Tutorial Crash Course 2024 1 hour, 59 minutes' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Playwright with JavaScript by' })).toBeVisible();
  await expect(page.locator('ytd-section-list-renderer')).toContainText('Playwright with JavaScript by Testers Talk');
})

test('Cursor en Swag Demo', async ({page}) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="product-sort-container"]').selectOption('za');
  await expect(page.locator('[data-test="item-3-title-link"]')).toBeVisible();
  await expect(page.locator('[data-test="item-3-title-link"] [data-test="inventory-item-name"]')).toContainText('Test.allTheThings() T-Shirt (Red)');
  await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
  await expect(page.locator('[data-test="item-4-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
  await page.locator('[data-test="product-sort-container"]').selectOption('az');
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await expect(page.locator('[data-test="item-1-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Bolt T-Shirt');
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="item-1-title-link"]').click();
  await expect(page.locator('[data-test="inventory-item-name"]')).toBeVisible();
  await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Bolt T-Shirt');
  await expect(page.locator('[data-test="remove"]')).toContainText('Remove');
  await page.locator('[data-test="back-to-products"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="continue-shopping"]')).toBeVisible();
  await expect(page.locator('[data-test="checkout"]')).toBeVisible();
  await expect(page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="cart-desc-label"]')).toBeVisible();
  await expect(page.locator('[data-test="cart-quantity-label"]')).toBeVisible();
  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
  await page.locator('[data-test="checkout"]').click();
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('Lemos');
  await page.locator('[data-test="firstName"]').press('Tab');
  await page.locator('[data-test="lastName"]').fill('Carlos');
  await page.locator('[data-test="lastName"]').press('Tab');
  await page.locator('[data-test="postalCode"]').fill('5501');
  await page.locator('form').click();
  await page.locator('[data-test="continue"]').click();
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Overview');
  await expect(page.locator('[data-test="payment-info-label"]')).toBeVisible();
  await expect(page.locator('[data-test="payment-info-label"]')).toContainText('Payment Information:');
  await expect(page.locator('[data-test="shipping-info-label"]')).toBeVisible();
  await expect(page.locator('[data-test="shipping-info-label"]')).toContainText('Shipping Information:');
  await expect(page.locator('[data-test="total-info-label"]')).toBeVisible();
  await expect(page.locator('[data-test="total-info-label"]')).toContainText('Price Total');
  await expect(page.locator('[data-test="total-label"]')).toBeVisible();
  await expect(page.locator('[data-test="total-label"]')).toContainText('Total: $17.27');
  await page.locator('[data-test="finish"]').click();
  await expect(page.locator('[data-test="pony-express"]')).toBeVisible();
  await expect(page.locator('[data-test="complete-header"]')).toBeVisible();
  await expect(page.locator('[data-test="complete-text"]')).toBeVisible();
  await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
  await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
  await expect(page.locator('[data-test="complete-text"]')).toContainText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
  await page.locator('[data-test="back-to-products"]').click();
})

