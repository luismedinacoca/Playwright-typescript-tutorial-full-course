import { test, expect } from '@playwright/test';

test.describe('Locators in Github', () => {
  test.beforeAll( () => {
    console.log("1️⃣ Running before all Tests")
  })
  
  test.afterAll(async ({ page }) => {
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
