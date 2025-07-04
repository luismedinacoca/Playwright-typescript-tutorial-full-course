import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 1 * 30 * 1000,
  globalTimeout: 1 * 60 * 1000,  // 1 hour the whole execution
  expect: {
    timeout: 10000,
  },
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
  retries: process.env.CI ? 2 : 0, // "1" from local retries from terminal execution! 
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['line'],
    ['allure-playwright', {
      outputFolder: 'allure-results', // Carpeta donde se guardarán los resultados raw de Allure
      detail: true, // Incluir detalles de cada paso
      // Otras opciones de Allure si las necesitas, por ejemplo:
      // suiteTitle: false,
      // categories: [ { name: 'Flaky tests', messageRegex: '.*Flaky.*' } ],
    }],
    ['list'],
    //['dot'],
    ['json', {outputFile: './playwright-report/json-report/json-test-report.json'}],
    ['junit', {outputFile: './playwright-report/json-report/junit-test-report.xml'}],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 10000,
    video: 'on',
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',
    testIdAttribute: 'data-tab-item',
    screenshot: 'only-on-failure',
    headless: false,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    //trace: ['off' | 'on' | 'on-first-retry' | 'on-all-retries' | 'retain-on-failure' | 'retain-on-first-failure' ]
    trace: 'on-all-retries',
  },

  /* Configure projects for major browsers */
  projects: [
    /*
    {
      name: 'firefox',
      use: { 
      ...devices['Desktop Firefox'],
      viewport: { width: 1512, height: 972 },
      },
    },
    */
  
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        viewport: { width: 1512, height: 972 }
      },
    },

    /*
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    /*
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },*/
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
