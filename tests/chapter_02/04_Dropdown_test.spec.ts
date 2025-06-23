import { test, expect } from '@playwright/test';
/*
  Mejora 1: Configuración de baseURL en playwright.config.ts (Recomendado)
  En lugar de hardcodear la URL en cada test o en beforeEach, es una buena práctica
  definirla en tu archivo de configuración de Playwright (playwright.config.ts).
  Ejemplo en playwright.config.ts:
  import { defineConfig } from '@playwright/test';
  export default defineConfig({
    use: {
      baseURL: 'https://www.facebook.com', // Tu URL base para los tests
    },
  });
  Con esto configurado, podrías usar await page.goto('/'); en tus tests.
*/

// Mejora 2: Nombre más descriptivo para el bloque 'describe'
// Un nombre más preciso mejora la legibilidad y el propósito de la suite de tests.
test.describe('Formulario de Creación de Cuenta de Facebook', () => {

  // beforeAll: Se ejecuta una única vez antes de que se ejecuten todos los tests en este archivo.
  // Es ideal para configuraciones que solo necesitan hacerse una vez, como iniciar un servidor
  // de prueba o una conexión a una base de datos.
  // Nota: 'beforeAll' no recibe la fixture 'page' directamente, ya que 'page' es una instancia
  // por cada test o contexto.
  test.beforeAll(() => {
    console.log("1️⃣ Ejecutando beforeAll: Configuración inicial para todos los tests en este archivo.");
    // Ejemplo: Iniciar un servidor de prueba si fuera necesario
    // await startTestServer();
  });

  // beforeEach: Se ejecuta antes de cada test individual dentro de este bloque 'describe'.
  // Es excelente para asegurar que cada test comience desde un estado limpio y consistente.
  test.beforeEach(async ({ page }) => {
    // Mejora 3: Usar baseURL si está configurada, de lo contrario, mantener la URL completa.
    await page.goto('https://www.facebook.com'); // Navega a la página de Facebook
    await page.getByRole('button', { name: "Create new account" }).click(); // Clic en "Crear nueva cuenta"

    // Mejora 4: Añadir una aserción para confirmar que estamos en el formulario correcto.
    // Esto hace que el setup sea más robusto. Si el clic no lleva al formulario esperado,
    // el test fallará aquí y no en pasos posteriores, facilitando la depuración.
    // Asumiendo que el formulario de creación de cuenta tiene un encabezado "Sign Up" o similar.
    await expect(page.getByRole('button', { name: 'Sign Up' })).toBeVisible(); [1]
    console.log("① Ejecutando beforeEach: Navegado al formulario de creación de cuenta.");
  });

  // afterEach: Se ejecuta después de cada test individual.
  // Es ideal para limpiar el estado después de cada test si es necesario,
  // aunque Playwright ya aísla los tests por defecto.
  // Mejora 5: Se eliminó la fixture 'page' de los argumentos, ya que no se usaba explícitamente
  // para acciones de limpieza dentro de este hook.
  test.afterEach(async ({ page }) => {
    console.log("② Ejecutando afterEach: Limpieza después de cada test.");
    // Ejemplo: Limpiar cookies o almacenamiento local si fuera necesario para un aislamiento aún mayor.
    await page.context().clearCookies();
  });

  // afterAll: Se ejecuta una única vez después de que todos los tests en este archivo hayan terminado.
  // Es ideal para limpiar recursos globales que se configuraron en 'beforeAll'.
  // Mejora 6: Se eliminó la fixture 'page' de los argumentos.
  // Playwright gestiona automáticamente el cierre de las instancias de 'page' y 'context'
  // después de cada test. Si hubieras abierto una instancia de navegador o página manualmente
  // en 'beforeAll' y la hubieras almacenado en una variable global, la cerrarías aquí.
  // En este caso, 'await page.close()' en 'afterAll' es redundante y podría causar errores
  // si 'page' no es una instancia global gestionada manualmente.
  
  // test.afterAll(async ({ page }) => {
  //   await page.close();
  //   console.log("2️⃣ Ejecutando afterAll: Limpieza final después de todos los tests en este archivo.");
  //   // Ejemplo: Detener el servidor de prueba iniciado en beforeAll
  //   // await stopTestServer();
  // });

  test('Test #01: Seleccionar Mes por valor (Abril)', async ({ page }) => {
    await page.getByLabel('Month').selectOption('4');
    // Mejora 7: Añadir aserción para verificar que la opción fue seleccionada correctamente.
    // Es crucial verificar el resultado de la acción para que el test sea significativo.
    await expect(page.getByLabel('Month')).toHaveValue('4');
    console.log("👉🏽 Ejecutando Test #01 - Mes seleccionado por valor: 4 (Abril)");
  });

  test('Test #02: Seleccionar Mes por texto visible (Octubre)', async ({ page }) => {
    await page.getByLabel('Month').selectOption('Oct');
    // Mejora 8: Añadir aserción para verificar que la opción fue seleccionada correctamente.
    // Asumiendo que 'Oct' (Octubre) corresponde al valor '10' en el HTML subyacente del dropdown.
    await expect(page.getByLabel('Month')).toHaveValue('10');
    console.log("👉🏽 Ejecutando Test #02 - Mes seleccionado por texto visible: Oct");
  });

  // test.skip: Se utiliza correctamente para omitir la ejecución de un test.
  test('Test #03: Seleccionar Mes por index (Diciembre)', async ({ page }) => {
    await page.getByLabel('Month').selectOption({index: 11});
    console.log("👉🏽 Ejecutando Test #02 - Mes seleccionado por index: 11 (Diciembre)");
    await expect(page.getByLabel('Month')).toHaveValue('12');
  });

  test('Should validate all month options', async ({ page }) => {
    // Configuration
    const expectedMonths = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    // Verification
    const options = await page.locator('#month option').allInnerTexts();
    console.log("options: ", options);
    const visibleOptions = options.filter(opt => opt.trim() !== '');
    
    await expect(visibleOptions).toEqual(expectedMonths);
    console.log("visibleOptions: ", visibleOptions);
  });

  test('Verifying', async ({ page }) => {
    const expectedMonths = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    await page.getByLabel('Month').selectOption('Nov');
    expect(await page.getByLabel('Month')).toContainText('Nov');
  })
});