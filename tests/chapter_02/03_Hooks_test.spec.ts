import { test, expect } from '@playwright/test';

test.describe('Locators in Github', () => {
  test.beforeAll( () => {
    console.log("1️⃣ Running before all Tests")
  })
  
  test.afterAll( async () => {
    console.log("2️⃣ Running after all Tests")
  });

  test.beforeEach(() => {
    console.log("① Running before each Tests")
  });

  test.afterEach(() => {
    console.log("② Running after each Tests")
  });

  test('Test #01', async ({ page }) => {
    console.log("👉🏽 Running Test #01")
  });

  test('Test #02', async ({ page }) => {
    console.log("👉🏽 Running Test #02")
  });

  test('Test #03', async ({ page }) => {
    console.log("👉🏽 Running Test #03")
  })
});


test.describe('Hooks in Playwright - Suggested and enhanced by Deepseek', () => {
  // 1. Eliminar afterAll problemático
  test.beforeAll(() => {
    console.log("1️⃣ Running before all Tests");
    // Aquí puedes inicializar recursos GLOBALES (DB, API, etc.)
  });
  
  // 2. Añadir cierre de browser si fue abierto manualmente
  test.afterAll(async () => {
    console.log("2️⃣ Running after all Tests");
    // Limpieza de recursos GLOBALES aquí
  });

  // 3. Usar page en beforeEach para configuración inicial
  test.beforeEach(async ({ page }) => {
    console.log("① Running before each Test");
    // Configuración INICIAL COMÚN para cada test
    await page.goto('https://github.com');
    await expect(page).toHaveTitle(/GitHub/);
  });

  // 4. Usar page en afterEach para limpieza
  test.afterEach(async ({ page }, testInfo) => {
    console.log("② Running after each Test");
    
    // Capturar screenshot si falló el test
    if (testInfo.status === 'failed') {
      const screenshot = await page.screenshot();
      await testInfo.attach('screenshot', {
        body: screenshot,
        contentType: 'image/png'
      });
    }
    
    // Limpiar estado (cookies, storage, etc.)
    await page.context().clearCookies();
    await page.context().storageState();
  });

  test('Test #01: Search repository', async ({ page }) => {
    console.log("👉🏽 Running Test #01");
    // Ejemplo real usando locators
    await page.getByRole('button', { name: 'Search or jump to…' }).click();
    await page.getByRole('combobox', { name: 'Search' }).fill('playwright');
    await page.getByText('playwright Search all of').click();
    await expect(page.getByRole('link', { name: 'microsoft/playwright', exact: true })).toBeVisible();
    await expect(page.locator('[data-testid="results-list"]')).toContainText('microsoft/playwright');
  });

  test('Test #02: Navigate to issues', async ({ page }) => {
    console.log("👉🏽 Running Test #02");
    await page.getByLabel('Global').getByRole('link', { name: 'Pricing' }).click();
    await expect(page).toHaveURL(/pricing/);
    await expect(page.getByRole('heading', { name: 'Free' }).first()).toBeVisible();
    await expect(page.getByRole('main')).toContainText('Free');
    await expect(page.getByRole('heading', { name: 'Team' }).first()).toBeVisible();
    await expect(page.getByRole('main')).toContainText('Team');
    await expect(page.getByRole('heading', { name: 'Enterprise' }).first()).toBeVisible();
    await expect(page.getByRole('main')).toContainText('Enterprise');
    await expect(page.getByRole('heading', { name: 'Try the Copilot-powered' })).toBeVisible();
  });

  test('Test #03: Check user profile', {tag: ['@PlaywrightWithJenkins']}, async ({ page }) => {
    console.log("👉🏽 Running Test #03");
    await page.goto('https://github.com/');
    await page.getByRole('link', { name: 'Sign up' }).click();
    await expect(page.getByRole('heading', { name: 'Create your free account' })).toBeVisible();
    await expect(page.getByRole('main')).toContainText('Create your free account');
    await expect(page.getByRole('heading', { name: 'Sign up to GitHub' })).toBeVisible();
    await expect(page.locator('#signup-form-fields')).toContainText('Sign up to GitHub');
  });
});
