import { test as base}  from '@playwright/test';
import { GitHubProfilePage } from '../pages/github_joanMedia/GitHubProfilePage';
import { GitHubRepositoriesPage } from '../pages/github_joanMedia/GitHubRepositoriesPage';

import { loadTestData } from '../utils/JsonHelper';
import { TestData } from '../interface/Module1TestData.interface';

export const test = base.extend<{ 
  saveLogs: void,
  testData: TestData,
  githubProfilePage: GitHubProfilePage,
  githubRepositoriesPage: GitHubRepositoriesPage,
}>({
  saveLogs: [async ({ }, use) => {
    console.log('Global before is running....');
    await use();
    console.log('Global afterEach is running...');
  },
  {
    auto: true,
  }],
  githubProfilePage: async ({ page }, use) => {
    const githubProfilePage = new GitHubProfilePage(page);
    await use(githubProfilePage);
  },
  githubRepositoriesPage: async ({ page }, use) => {
    const githubRepositoriesPage = new GitHubRepositoriesPage(page);
    await use(githubRepositoriesPage);
  },
  testData: async ({ }, use) => {
    const testData = await loadTestData();
    await use(testData);
  },
});

export { expect } from '@playwright/test';