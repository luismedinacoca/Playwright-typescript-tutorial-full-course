import { test, expect, Browser, chromium } from '@playwright/test';

test.describe('Handling Mouse Actions from DuckDuckGo page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
  });

  test.afterEach( async({ page }) => {
    await page.context().clearCookies();
  })

  test.afterAll( async() => {
    console.log('Finalizing this test cases execution...');
  })

  test('Test #01: Playwright - YouTube', async ({ page }) => {
    await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('Playwright JoanMedia');
    await page.getByRole('button', { name: 'Search', exact: true }).click();
    await expect(page.getByRole('link', { name: 'JoanMedia - YouTube' })).toBeVisible();
    await expect(page.locator('[data-testid="web-vertical"] [data-testid="mainline"]')).toContainText('JoanMedia - YouTube');
    await expect(page.locator('[data-testid="web-vertical"]').getByRole('list').first()).toContainText('› c › joanmedia');
    await page.getByText('JoanMedia - YouTube', { exact: true  }).first().click();
    await expect(page.getByText('Playlists')).toBeVisible();
    await expect(page.locator('yt-tab-group-shape')).toContainText('Playlists');
    await page.getByText('Playlists').click();
    await page.waitForTimeout(1500);
  });

  test('Test #02: Cypress - YouTube', async ({ page }) => {
    await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('Cypress JoanMedia');
    await page.getByRole('button', { name: 'Search', exact: true }).click();
    await expect(page.getByRole('link', { name: 'JoanMedia - YouTube' })).toBeVisible();
    await expect(page.locator('[data-testid="web-vertical"] [data-testid="mainline"]')).toContainText('JoanMedia - YouTube');
    await expect(page.locator('[data-testid="web-vertical"]').getByRole('list').first()).toContainText('› c › joanmedia');
    await page.getByText('JoanMedia - YouTube', { exact: true  }).first().click();
    await expect(page.getByText('Playlists')).toBeVisible();
    await expect(page.locator('yt-tab-group-shape')).toContainText('Playlists');
    await page.getByText('Playlists').click();
    await page.waitForTimeout(1500);
  });

  test('Test #03: Selenium - YouTube', async ({ page }) => {
    await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('Selenium JoanMedia');
    await page.getByRole('button', { name: 'Search', exact: true }).click();
    await expect(page.getByRole('link', { name: 'JoanMedia - YouTube' })).toBeVisible();
    await expect(page.locator('[data-testid="web-vertical"] [data-testid="mainline"]')).toContainText('JoanMedia - YouTube');
    await page.getByText('JoanMedia - YouTube', { exact: true  }).first().click();
    await expect(page.getByText('Playlists')).toBeVisible();
    await expect(page.locator('yt-tab-group-shape')).toContainText('Playlists');
    await page.getByText('Playlists').click();
    await page.keyboard.press('ControlOrMeta+F')
    await page.waitForTimeout(1500);
  });
})


test.describe('Handling Mouse Actions from DuckDuckGo page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
  });

  test.afterEach( async({ page }) => {
    await page.context().clearCookies();
  })

  test.afterAll( async() => {
    console.log('Finalizing this test cases execution...');
  })

  const searchKeyboard = [
    'Playwright JoanMedia', 
    'Cypress JoanMedia', 
    'Selenium JoanMedia', 
    'API JoanMedia'
  ];

  for(let i = 0; i < searchKeyboard.length; i++) {
    test(`Test #0${i+1}: ${searchKeyboard[i]}`, async ({ page }) => {
      await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill(`${searchKeyboard[i]}`);
      await page.getByRole('button', { name: 'Search', exact: true }).click();
      await expect(page.getByRole('link', { name: 'JoanMedia - YouTube' })).toBeVisible();
      await expect(page.locator('[data-testid="web-vertical"] [data-testid="mainline"]')).toContainText('JoanMedia - YouTube');
      await page.getByText('JoanMedia - YouTube', { exact: true  }).first().click();
      await expect(page.getByText('Playlists')).toBeVisible();
      await expect(page.locator('yt-tab-group-shape')).toContainText('Playlists');
      await page.getByText('Playlists').click();
      await page.keyboard.press('ControlOrMeta+F')
      await page.waitForTimeout(1500);
    });
  }
})


test.describe.skip('Manejo de Acciones del Ratón en la Página de DuckDuckGo', () => {
  // Prepara la página antes de cada test.
  test.beforeEach(async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
  });

  // Limpia las cookies después de cada test para asegurar un estado limpio.
  test.afterEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  // Mensaje de finalización al concluir todos los tests.
  test.afterAll(async () => {
    console.log('Finalizando la ejecución de estos casos de prueba...');
  });

  // Lista de términos de búsqueda que se usarán en los tests.
  const searchTerms = [
    'Playwright - YouTube',
    'Cypress - YouTube',
    'Selenium - YouTube',
  ];

  /**
   * Transforma una cadena de búsqueda para adaptarla a los resultados esperados de DuckDuckGo.
   * Por ejemplo: "Playwright - YouTube" -> "playwright youtube"
   * @param {string} term El término de búsqueda original.
   * @returns {string} El término transformado.
   */
  function transformSearchTerm(term) {
    return term.toLowerCase().replace(/-/g, ' ');
  }

  // Itera sobre cada término de búsqueda para crear un test individual.
  // Usamos 'for...of' para mayor legibilidad y acceso directo al elemento.
  for (const term of searchTerms) {
    // Genera un nombre de test descriptivo para cada iteración.
    // Evitamos el uso de índices como #01, #02, etc., ya que el nombre del test ya es único y descriptivo.
    test(`Debería buscar "${term}" y navegar al video correspondiente`, async ({ page }) => {
      const transformedTerm = transformSearchTerm(term);

      // Llena el campo de búsqueda con el término original.
      await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill(term);

      // Espera y hace clic en la opción de autocompletado que coincida con el término transformado.
      // Se añade una pequeña espera para la visibilidad si es necesario, aunque Playwright suele manejarlo bien.
      await page.getByRole('option', { name: transformedTerm, exact: true }).click();

      // Hace clic en el primer enlace que coincide con el término de búsqueda original.
      // Se utiliza `waitForURL` en lugar de `waitForTimeout` para una espera más robusta y específica,
      // asegurando que la navegación se haya completado a una URL esperada.
      // También se podría usar `expect(page).toHaveURL(/youtube\.com/)` si solo se quiere verificar el dominio.
      const [newPage] = await Promise.all([
        page.waitForEvent('popup'), // Espera que se abra una nueva pestaña
        page.getByRole('link', { name: term }).first().click(),
      ]);

      // Espera a que la nueva página cargue completamente.
      await newPage.waitForLoadState('domcontentloaded');

      // Afirmación: Verifica que la URL de la nueva página contenga "youtube.com".
      // Esto es más robusto que solo esperar un tiempo fijo.
      await expect(newPage).toHaveURL(/youtube\.com/);
    });
  }
});