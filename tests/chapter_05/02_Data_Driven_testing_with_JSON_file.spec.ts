import { test, expect } from '@playwright/test';
import testData from '../../test-data/qa/testdata.json';

type Testdata = {
  TestDataSet1: {
    skill_01: string,
    skill_02: string
  },
  TestDataSet2: {
    skill_01: string,
    skill_02: string
  }
}

const typedTestData = testData as Testdata;
for (const dataSetName in typedTestData) {
  const skill = typedTestData[dataSetName as keyof TestData];

  test(`Testv #01: Data Driven Testing using JSON file: ${skill.skill_01}`, async ({ page }) => {
    await page.goto(`${process.env.DUCK_GO_URL}`);
    await page.locator('#searchbox_input').fill(`${skill.skill_01}`);
    await page.locator('[type="submit"]').first().click();
    await page.getByRole('link', {name:"JoanMedia - YouTube"}).first().click();
    await page.waitForTimeout(2500);
  });

  test(`Testv #02: Data Driven Testing using JSON file: ${skill.skill_02}`, async ({ page }) => {
    await page.goto(`${process.env.DUCK_GO_URL}`);
    await page.locator('#searchbox_input').fill(`${skill.skill_02}`);
    await page.locator('[type="submit"]').first().click();
    await page.getByRole('link', {name:"JoanMedia - YouTube"}).first().click();
    await page.waitForTimeout(2500);
  });
}
