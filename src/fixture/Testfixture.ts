import { test as base}  from '@playwright/test';
import { HomePage } from '../pages/duckduckgo/HomePage';
import { ResultPage } from '../pages/duckduckgo/ResultPage';
import { GitHubProfilePage } from '../pages/github_joanMedia/GitHubProfilePage';
import { GitHubRepositoriesPage } from '../pages/github_joanMedia/GitHubRepositoriesPage';
import { PlaylistPage } from '../pages/duckduckgo/PlaylistPage';

import { loadTestData } from '../utils/JsonHelper';
import { TestData } from '../interface/Module1TestData.interface';

export const test = base.extend<{ 
  saveLogs: void,
  homePage: HomePage,
  resultPage: ResultPage,
  playlistPage: PlaylistPage,
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
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  resultPage: async ({ page }, use) => {
    const resultPage = new ResultPage(page);
    await use(resultPage);
  },
  playlistPage: async ({ page }, use) => {
    const playlistPage = new PlaylistPage(page);
    await use(playlistPage);
  },
  testData: async ({ }, use) => {
    const testData = await loadTestData();
    await use(testData);
  },
  githubProfilePage: async ({ page }, use) => {
    const githubProfilePage = new GitHubProfilePage(page);
    await use(githubProfilePage);
  },
  githubRepositoriesPage: async ({ page }, use) => {
    const githubRepositoriesPage = new GitHubRepositoriesPage(page);
    await use(githubRepositoriesPage);
  }
});

export { expect } from '@playwright/test';