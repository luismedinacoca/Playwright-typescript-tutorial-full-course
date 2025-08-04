import { test, expect, FrameLocator } from '@playwright/test';

test.describe('SmokeTesting', () => {
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

  test('Test #01: hardcode date', async() => {
    const dateInput = iframe.locator('#datepicker');
    await dateInput.fill('04/06/1977');
    await dateInput.press('Tab');
    await expect(dateInput).toHaveValue('04/06/1977');
  });

  test('Test #03: Random month and day selection - PAST', async ({ page }) => {
    const dateInput = iframe.locator('#datepicker');
    await dateInput.click();
    await page.waitForTimeout(1500);

    const randomTimes = Math.floor(Math.random()*10 + 1);
    console.log("randomTimes: ", randomTimes);
    for(let i = 0; i < randomTimes; i++) {
      await iframe.locator('[title="Prev"]').click();
      await page.waitForTimeout(150);
    }

    const randomDay = Math.floor(Math.random()*30 + 1).toString();
    console.log("Random date:", randomDay);
    await iframe.locator(`text="${randomDay}"`).click()
    await page.waitForTimeout(2000);
  });

  test('Test #05: Random month and day selection - FUTURE', async ({ page }) => {
    const dateInput = iframe.locator('#datepicker');
    await dateInput.click();
    await page.waitForTimeout(1500);

    const randomTimes = Math.floor(Math.random()*10 + 1);
    console.log("randomTimes: ", randomTimes);
    for(let i = 0; i < randomTimes; i++) {
      await iframe.locator('[title="Next"]').click();
      await page.waitForTimeout(150);
    }

    const randomDay = Math.floor(Math.random()*30 + 1).toString();
    console.log("Random date:", randomDay);
    await iframe.locator(`text="${randomDay}"`).click()
    await page.waitForTimeout(2000);

  })

  test('Test #07: Dynamically Today date', async () => {
    const todayDate = myToday();
    const dateInput = iframe.locator('#datepicker');
    await dateInput.fill(todayDate);
    await dateInput.press('Tab');
    await expect(dateInput).toHaveValue(todayDate);
  });
});

test.describe('RegressionTesting', () => {
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

  test('Test #02: Selecting the today date', async () => {
    const today = myToday();
    const dateInput = iframe.locator('#datepicker');
    await dateInput.click();
    await iframe.locator('.ui-datepicker-today').click();
    await dateInput.press('Tab');
    await expect(dateInput).toHaveValue(today);
  });

  test('Test #04: PAST Random month and day selection with verification', async ({ page }) => {
    const dateInput = iframe.locator('#datepicker');
    
    // Abrir el datepicker
    await dateInput.click();
    
    // Esperar a que el datepicker esté visible (mejor que timeout)
    await expect(iframe.locator('#ui-datepicker-div')).toBeVisible();

    // Hacer clic en Prev de 1 a 10 veces
    const randomTimes = Math.floor(Math.random() * 10) + 1;
    console.log("Clics en Prev:", randomTimes);
    
    for (let i = 0; i < randomTimes; i++) {
      await iframe.locator('[title="Prev"]').click();
      // Esperar breve actualización del UI
      await page.waitForTimeout(100);
    }

    // Obtener mes y año actual del datepicker
    const currentMonth = await iframe.locator('.ui-datepicker-month').innerText();
    const currentYear = await iframe.locator('.ui-datepicker-year').innerText();
    
    // Seleccionar día aleatorio (1-30 para evitar problemas con meses de 31 días)
    const randomDay = Math.floor(Math.random() * 30) + 1;
    console.log("Día seleccionado:", randomDay);
    
    // Seleccionar el día en el calendario
    await iframe.locator(`td[data-handler="selectDay"]:not(.ui-datepicker-other-month) a:has-text("${randomDay}")`).first().click();
    
    // Construir la fecha esperada en formato MM/dd/yyyy
    const monthMap: Record<string, string> = {
      'January': '01', 'February': '02', 'March': '03', 'April': '04',
      'May': '05', 'June': '06', 'July': '07', 'August': '08',
      'September': '09', 'October': '10', 'November': '11', 'December': '12'
    };
    
    const formattedDay = randomDay.toString().padStart(2, '0');
    const expectedDate = `${monthMap[currentMonth]}/${formattedDay}/${currentYear}`;
    
    // Verificar que el input tiene la fecha correcta
    await expect(dateInput).toHaveValue(expectedDate);
    
    // Opcional: Verificar en consola
    console.log("Fecha esperada:", expectedDate);
    console.log("Fecha actual en input:", await dateInput.inputValue());
  });

  test('Test #06: PAST Random month and day selection with verification', {tag: ['@PlaywrightWithJenkins']}, async ({ page }) => {
    const dateInput = iframe.locator('#datepicker');
    
    // Abrir el datepicker
    await dateInput.click();
    
    // Esperar a que el datepicker esté visible (mejor que timeout)
    await expect(iframe.locator('#ui-datepicker-div')).toBeVisible();

    // Hacer clic en Prev de 1 a 10 veces
    const randomTimes = Math.floor(Math.random() * 10) + 1;
    console.log("Clicks en Next:", randomTimes);
    
    for (let i = 0; i < randomTimes; i++) {
      await iframe.locator('[title="Next"]').click();
      // Esperar breve actualización del UI
      await page.waitForTimeout(100);
    }

    // Obtener mes y año actual del datepicker
    const currentMonth = await iframe.locator('.ui-datepicker-month').innerText();
    const currentYear = await iframe.locator('.ui-datepicker-year').innerText();
    
    // Seleccionar día aleatorio (1-30 para evitar problemas con meses de 31 días)
    const randomDay = Math.floor(Math.random() * 30) + 1;
    console.log("Día seleccionado:", randomDay);
    
    // Seleccionar el día en el calendario
    await iframe.locator(`td[data-handler="selectDay"]:not(.ui-datepicker-other-month) a:has-text("${randomDay}")`).first().click();
    
    // Construir la fecha esperada en formato MM/dd/yyyy
    const monthMap: Record<string, string> = {
      'January': '01', 'February': '02', 'March': '03', 'April': '04',
      'May': '05', 'June': '06', 'July': '07', 'August': '08',
      'September': '09', 'October': '10', 'November': '11', 'December': '12'
    };
    
    const formattedDay = randomDay.toString().padStart(2, '0');
    const expectedDate = `${monthMap[currentMonth]}/${formattedDay}/${currentYear}`;
    
    // Verificar que el input tiene la fecha correcta
    await expect(dateInput).toHaveValue(expectedDate);
    
    // Opcional: Verificar en consola
    console.log("Fecha esperada:", expectedDate);
    console.log("Fecha actual en input:", await dateInput.inputValue());
  });
});