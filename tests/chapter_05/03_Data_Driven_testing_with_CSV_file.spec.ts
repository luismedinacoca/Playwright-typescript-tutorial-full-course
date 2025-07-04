import { test, expect } from '@playwright/test';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

type TestRecord = {
  'skill_01': string;
  'skill_02': string;
};

try {
  // 1. Ruta del archivo con verificación
  const csvPath = path.join(__dirname, '../../test-data/qa/testdata.csv');
  if (!fs.existsSync(csvPath)) {
    throw new Error(`Archivo CSV no encontrado: ${csvPath}`);
  }

  // 2. Leer archivo con encoding explícito
  const fileContent = fs.readFileSync(csvPath, { encoding: 'utf-8' });

  // 3. Parsear CSV manteniendo nombres originales
  const records: TestRecord[] = parse(
    fileContent, 
    {
      columns: headers => headers.map(header => header.trim()), // Mantener nombres originales
      skip_empty_lines: true,
      delimiter: ';',
      relax_quotes: true,
      trim: true,
      bom: true
    }
  );

  // 4. Verificar datos
  console.log('Registros parseados:', records);
  if (records.length === 0) {
    // Registrar test de falla si no hay registros
    test('CSV vacío - Error de configuración', () => {
      throw new Error('El archivo CSV no contiene registros');
    });
  } else {
    // 5. Registrar tests dinámicos
    records.forEach((record, rowIndex) => {
      const skill1 = record['skill_01'];
      const skill2 = record['skill_02'];

      test(`Test #${rowIndex + 1}.1: Buscar "${skill1}"`, async ({ page }) => {
        await performSearch(page, skill1);
      });

      test(`Test #${rowIndex + 1}.2: Buscar "${skill2}"`, async ({ page }) => {
        await performSearch(page, skill2);
      });
    });
  }
} catch (error) {
  // Registrar test de error si falla el setup
  test('Error de configuración', () => {
    throw error;
  });
}

async function performSearch(page: any, skill: string) {
  // Validación crítica
  if (!skill || typeof skill !== 'string') {
    throw new Error(`Habilidad inválida: ${skill}`);
  }

  await page.goto(process.env.DUCK_GO_URL || 'https://duckduckgo.com/');
  
  // Llenar campo de búsqueda
  await page.locator('#searchbox_input').fill(skill);
  
  // Enviar búsqueda (manejo mejorado)
  /*
  await Promise.all([
    page.waitForURL(url => url.includes('duckduckgo.com')),
    page.locator('[type="submit"]').first().click()
  ]);
  */
  await Promise.all([
    page.waitForURL(url => url.hostname.includes('duckduckgo.com')),
    page.locator('[type="submit"]').first().click()
  ]);
  
  // Buscar enlace específico
  const youtubeLink = page.getByRole('link', { name: "JoanMedia - YouTube" }).first();
  await expect(youtubeLink).toBeVisible({ timeout: 10000 });
  
  // Navegar a YouTube
  await Promise.all([
    page.waitForURL(url => url.hostname.includes('youtube.com')),
    youtubeLink.click()
  ]);
  
  // Verificar URL final
  await expect(page).toHaveURL(/youtube\.com/);
}

/** Explanation

Hola! Veo que tienes un fragmento de código que se usa para leer y procesar datos de un archivo, probablemente un CSV, en JavaScript/TypeScript.
En pocas palabras, lo que hace este código es tomar el contenido de un archivo de texto (como un CSV), dividirlo en filas y columnas, limpiar un poco los datos, y luego te los devuelve organizados en un formato que es fácil de usar en tu programa.

Desglose simple del código:
Analicemos cada parte:

* const records: TestRecord[] = ...
  - Esto simplemente dice que la variable records va a almacenar el resultado de la operación.
  - : TestRecord[] es una notación de TypeScript que indica que records será un arreglo de objetos, donde cada objeto tendrá la forma definida por tu tipo TestRecord (que probablemente tiene propiedades como skill_01, skill_02, etc., que coinciden con los encabezados de tus columnas).

* parse(fileContent, { ... })
  - Aquí es donde ocurre la magia principal. La función parse (que viene de una librería como csv-parse) es la encargada de leer el fileContent (el texto completo de tu archivo) y convertirlo en datos estructurados.
  - El segundo argumento { ... } es un objeto de configuración que le dice a parse cómo debe interpretar el archivo.

* fileContent
  - Esta variable ya debería contener el texto completo de tu archivo (por ejemplo, el resultado de leer un CSV con fs.readFileSync).

* columns: headers => headers.map(header => header.trim())
  - Esto le dice a parse cómo manejar los encabezados de tus columnas.
  - headers => headers.map(header => header.trim()): Significa que la primera fila de tu archivo se usará como nombres de las columnas. Y además, si esos nombres de columna tienen espacios extra al principio o al final (por ejemplo, " skill_01 "), la función trim() los eliminará para que sean "skill_01". Esto es muy útil para evitar errores al acceder a las propiedades luego.

* skip_empty_lines: true
  - Si tu archivo tiene líneas en blanco (vacías) entre los datos, esta opción le dice a parse que simplemente las ignore. Así no obtendrás filas vacías en tus records.

* delimiter: ';'
  - ¡Esta es crucial! Le indica a parse qué carácter está usando tu archivo para separar las columnas en cada fila. En tu caso, le estás diciendo que las columnas están separadas por un punto y coma (;). Si tu archivo usara comas (,), tendrías que cambiarlo a delimiter: ','.

* relax_quotes: true
  - Esto hace que el parser sea un poco más "relajado" con el manejo de las comillas. Si tienes datos que contienen comillas dentro de ellos y no están perfectamente escapados, esta opción ayuda a que el parser no falle y los interprete correctamente. Por ejemplo, si tienes ;"esto es un "ejemplo" en comillas"; sin un escape adecuado, relax_quotes podría ayudar.

* trim: true
  - Similar a headers.map(header => header.trim()), pero esta opción se aplica a los valores de cada celda de datos. Si una celda tiene un valor como "  valor_dato  ", trim: true lo convertirá a "valor_dato", eliminando espacios en blanco innecesarios al principio y al final. Esto es muy útil para asegurar la limpieza de los datos.

* bom: true
  - BOM significa "Byte Order Mark". Es un carácter especial que a veces se encuentra al principio de archivos de texto (especialmente CSV) que han sido guardados con codificación Unicode (como UTF-8). Si tu archivo tiene un BOM, esta opción le dice al parser que lo detecte y lo omita para que no interfiera con el contenido real de los datos.

* En resumen:
El código lee el contenido de un archivo, lo procesa asumiendo que las columnas están separadas por punto y coma y que la primera línea son los encabezados. Además, limpia los espacios extra en los nombres de las columnas y en los datos, ignora líneas vacías y es más tolerante con las comillas, todo para devolverte un arreglo de objetos fácil de manejar con los datos de tu archivo.
*/


/******************************** FIFTH TRY *******************************

import { test, expect } from '@playwright/test';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

type TestRecord = {
  'skill_01': string;
  'skill_02': string;
};

// 1. Leer el archivo con codificación explícita
const filePath = path.join(__dirname, '../../test-data/qa/testdata.csv');
const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

// 2. Limpiar espacios en blanco y caracteres especiales
const cleanedContent = fileContent
  .replace(/[\u200B-\u200D\uFEFF]/g, '') // Eliminar caracteres invisibles
  .replace(/^\s+|\s+$/gm, ''); // Trim por línea

// 3. Parsear con configuración robusta
const records: TestRecord[] = parse(cleanedContent, {
  columns: true,
  skip_empty_lines: true,
  delimiter: ';',
  relax_quotes: true,
  trim: true,
  bom: true // Manejar Byte Order Mark
});

// 4. Validar los datos obtenidos
if (records.length === 0 || !records[0]['skill_01']) {
  throw new Error('Error parsing CSV. Records: ' + JSON.stringify(records, null, 2));
}

// 5. Crear tests con acceso seguro a propiedades
records.forEach((record, index) => {
  const skill1 = record['skill_01'];
  const skill2 = record['skill_02'];

  test(`Test #${index + 1}.1: Buscar "${skill1}"`, async ({ page }) => {
    await performSearch(page, skill1);
  });

  test(`Test #${index + 1}.2: Buscar "${skill2}"`, async ({ page }) => {
    await performSearch(page, skill2);
  });
});

// 6. Función mejorada con validaciones
async function performSearch(page: any, skill: string) {
  if (!skill || typeof skill !== 'string') {
    throw new Error(`Invalid search skill: ${skill}`);
  }

  await page.goto(process.env.DUCK_GO_URL || 'https://duckduckgo.com/');
  
  await page.locator('#searchbox_input').fill(skill);
  
  await Promise.all([
    page.waitForNavigation(),
    page.locator('[type="submit"]').first().click()
  ]);
  
  const youtubeLink = page.getByRole('link', { name: "JoanMedia - YouTube" }).first();
  await expect(youtubeLink).toBeVisible();
  
  await Promise.all([
    page.waitForNavigation(),
    youtubeLink.click()
  ]);
  
  await expect(page).toHaveURL(/youtube\.com/);
}
*/

/******************************** THRID TRY *******************************
import { test, expect } from '@playwright/test';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

type TestRecord = {
  'skill_01': string;  // Usar nombres exactos del CSV
  'skill_02': string;  // Mantener guión bajo
};

const fileContent = fs.readFileSync(
  path.join(__dirname, '../../test-data/qa/testdata.csv'),
  { encoding: 'utf-8' }
);

const records: TestRecord[] = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
  delimiter: ';',
  relax_quotes: true,
  trim: true
});

// Verificar datos (opcional para debug)
console.log("Parsed records:", records);

records.forEach((record, index) => {
  test(`Test #${index + 1}.1: Buscar "${record['skill_01']}"`, async ({ page }) => {
    await performSearch(page, record['skill_01']);
  });

  test(`Test #${index + 1}.2: Buscar "${record['skill_02']}"`, async ({ page }) => {
    await performSearch(page, record['skill_02']);
  });
});

async function performSearch(page: any, skill: string) {
  // Validación de seguridad
  if (typeof skill !== 'string') {
    throw new Error(`Valor de búsqueda inválido: ${skill}`);
  }

  await page.goto(process.env.DUCK_GO_URL || 'https://duckduckgo.com/');
  
  // Llenar campo de búsqueda
  await page.locator('#searchbox_input').fill(skill);
  
  // Enviar búsqueda (versión mejorada)
  await Promise.all([
    page.waitForNavigation(),
    page.locator('[type="submit"]').first().click()
  ]);
  
  // Buscar enlace y hacer clic
  const youtubeLink = page.getByRole('link', { name: "JoanMedia - YouTube" }).first();
  await expect(youtubeLink).toBeVisible();
  
  await Promise.all([
    page.waitForNavigation(),
    youtubeLink.click()
  ]);
  
  // Verificar redirección
  await expect(page).toHaveURL(/youtube\.com/);
}
*/



/******************************** SECOND TRY *******************************
import { test, expect } from '@playwright/test';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

type TestRecord = {
  skill_01: string;
  skill_02: string;
};

const records: TestRecord[] = parse(
  fs.readFileSync(path.join(__dirname, '../../test-data/qa/testdata.csv')),
  {
    columns: true,
    skip_empty_lines: true,
    delimiter: ';' // Especifica el delimitador usado en el CSV
  }
);

records.forEach((record, index) => {
  const skills = [record.skill_01, record.skill_02];
  
  skills.forEach((skill, skillIndex) => {
    test(`Test #${index + 1}.${skillIndex + 1}: Buscar "${skill}"`, async ({ page }) => {
      // 1. Navegación mejorada con verificación
      await page.goto(process.env.DUCK_GO_URL || 'https://duckduckgo.com/');
      await expect(page).toHaveTitle('DuckDuckGo — Privacy, simplified.');
      
      // 2. Búsqueda con espera inteligente
      await page.locator('#searchbox_input').fill(skill);
      await page.keyboard.press('Enter');
      
      // 3. Espera condicional en lugar de timeout fijo
      await page.waitForURL(`**  /?q=${encodeURIComponent(skill)}*`, { timeout: 5000 });
      
      // 4. Verificación explícita antes de interactuar
      const youtubeLink = page.getByRole('link', { name: `${skill.split(' ')[1]} - YouTube` });
      await expect(youtubeLink).toBeVisible();
      
      // 5. Click con navegación controlada
      await Promise.all([
        page.waitForNavigation(),
        youtubeLink.click()
      ]);
      
      // 6. Verificación final
      await expect(page).toHaveURL(/youtube\.com/);
      await expect(page.locator('#channel-name')).toContainText(skill.split(' ')[1]);
    });
  });
});
*/


/******************************** FIRST TRY *******************************
import { test, expect } from '@playwright/test';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

type TestRecord = {
  skill_01: string;
  skill_02: string;
};

const records = parse(
  fs.readFileSync(path.join(__dirname, '../../test-data/qa/testdata.csv')),
  {
    columns: true,
    skip_empty_lines: true,
    delimiter: ';' // Especificar el delimitador usado en el CSV
  }
) as TestRecord[];

// Solución 1: Usando forEach (recomendada)
records.forEach((record, index) => {
  test(`Test #${index + 1}.1: Buscar "${record.skill_01}"`, async ({ page }) => {
    await performSearch(page, record.skill_01);
  });

  test(`Test #${index + 1}.2: Buscar "${record.skill_02}"`, async ({ page }) => {
    await performSearch(page, record.skill_02);
  });
});

// Solución 2: Usando for...of
// for (const [index, record] of records.entries()) {
//   [record.skill_01, record.skill_02].forEach((skill, i) => {
//     test(`Test #${index + 1}.${i + 1}: Buscar "${skill}"`, async ({ page }) => {
//       await performSearch(page, skill);
//     });
//   });
// }

async function performSearch(page: any, skill: string) {
  await page.goto(process.env.DUCK_GO_URL || 'https://duckduckgo.com/');
  await page.locator('#searchbox_input').fill(skill);
  
  // Usar Promise.all para esperar la navegación
  await Promise.all([
    page.waitForNavigation(),
    page.locator('[type="submit"]').first().click()
  ]);
  
  // Esperar que el link esté visible antes de hacer clic
  const youtubeLink = page.getByRole('link', { name: "JoanMedia - YouTube" }).first();
  await expect(youtubeLink).toBeVisible();
  
  // Nuevamente esperar navegación
  await Promise.all([
    page.waitForNavigation(),
    youtubeLink.click()
  ]);
  
  // Verificar que estamos en YouTube
  await expect(page).toHaveURL(/youtube\.com/);
}
*/
