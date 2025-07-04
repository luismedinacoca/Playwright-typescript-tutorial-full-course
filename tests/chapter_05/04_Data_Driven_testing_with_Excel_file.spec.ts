import { test, expect } from '@playwright/test';

import fs from 'fs';
import path from 'path';
import { readExcelFile } from '../../src/utils/ExcelHelper'; // import utility function

// Ruta del archivo Excel
const filePath = path.join(__dirname, '../../test-data/qa/testdata.xlsx');
const records = readExcelFile(filePath);

try {
  // 1. Ruta del archivo con verificación
  if (!fs.existsSync(filePath)) {
    throw new Error(`Archivo Excel no encontrado: ${filePath}`);
  }

  // 2. Leer archivo con encoding explícito
  //const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

  for(const record of records){
    const skill1 = record['skill_01'];
    const skill2 = record['skill_02'];
    
    test(`Test #1.1: Buscar "${skill1}"`, async ({ page }) => {
      await performSearch(page, skill1);
    });

    test(`Test #1.2: Buscar "${skill2}"`, async ({ page }) => {
      await performSearch(page, skill2);
    });
  }
} catch(err){
  // Registrar test de error si falla el setup
  test('Error de configuración', () => {
    throw err;
  });
}

async function performSearch(page: any, skill: string){
  // Validación crítica
  if (!skill || typeof skill !== 'string') {
    throw new Error(`Habilidad inválida: ${skill}`);
  }

  await page.goto('https://github.com/JoanEsquivel');
  await page.getByRole('link', {name: 'Repositories 72'}).click();
  await page.getByRole('searchbox', {name: 'Find a repository…'}).fill(skill);
  //await page.waitForTimeout(1500);

  await Promise.all([
    page.waitForURL((url: URL) => url.href.includes(skill)),
    page.locator('#user-repositories-list a[href*="tab"]').first().waitFor({ state: 'visible' })
  ]);

  const filterVisible = await page.locator('#user-repositories-list a[href*="tab"]').first().isVisible();
  expect(filterVisible).toBeTruthy();
  const repoNames = await page.locator('[itemprop="owns"] h3 a').allInnerTexts();
  console.log(repoNames);

  const isContained = repoNames.some((repoName:string) => repoName.toLowerCase().includes(skill.toLowerCase()));
  console.log("isContained: ", isContained)
  expect(isContained).toBeTruthy();
}



/****************** SECOND TRY - too much code and no DRY ******************/
/*
for(const record of records) {
  test.skip(`Data Driven Testing using Excel file: ${record.skill_01}`, async({ page}) => {
    
    await page.goto('https://github.com/JoanEsquivel');
    await page.getByRole('link', {name: 'Repositories 72'}).click();
    await page.getByRole('searchbox', {name: 'Find a repository…'}).fill(record["skill_01"]);
    //await page.waitForTimeout(1500);
  
    await Promise.all([
      //page.waitForURL(url => url.hostname.includes(`${record.skill_01}`)),
      page.waitForURL(url => url.href.includes(`${record["skill_01"]}`)),
      //page.locator('#user-repositories-list a[href*="tab"]').first().isVisible(),
      page.locator('#user-repositories-list a[href*="tab"]').first().waitFor({ state: 'visible' }),
    ]);
  
    //await expect(page).toHaveURL(/.*${record.skill_01}.*);
    const filterVisible = await page.locator('#user-repositories-list a[href*="tab"]').first().isVisible();
    expect(filterVisible).toBeTruthy();
    const repoNames = await page.locator('[itemprop="owns"] h3 a').allInnerTexts();
    console.log(repoNames);
  
    const isContained = repoNames.some(repoName => repoName.toLowerCase().includes(record["skill_01"].toLowerCase()));
    console.log("isContained: ", isContained)
    expect(isContained).toBeTruthy();
  })

  test.skip(`Data Driven Testing using Excel file: ${record.skill_02}`, async({ page}) => {
    
    await page.goto('https://github.com/JoanEsquivel');
    await page.getByRole('link', {name: 'Repositories 72'}).click();
    await page.getByRole('searchbox', {name: 'Find a repository…'}).fill(record["skill_02"]);
    //await page.waitForTimeout(1500);
  
    await Promise.all([
      //page.waitForURL(url => url.hostname.includes(`${record.skill_01}`)),
      page.waitForURL(url => url.href.includes(`${record["skill_02"]}`)),
      //page.locator('#user-repositories-list a[href*="tab"]').first().isVisible(),
      page.locator('#user-repositories-list a[href*="tab"]').first().waitFor({ state: 'visible' }),
    ]);
  
    //await expect(page).toHaveURL(/.*${record.skill_01}.*);
    const filterVisible = await page.locator('#user-repositories-list a[href*="tab"]').first().isVisible();
    expect(filterVisible).toBeTruthy();
    const repoNames = await page.locator('[itemprop="owns"] h3 a').allInnerTexts();
    console.log(repoNames);
  
    const isContained = repoNames.some(repoName => repoName.toLowerCase().includes(record["skill_02"].toLowerCase()));
    console.log("isContained: ", isContained)
    expect(isContained).toBeTruthy();
  })
}
*/