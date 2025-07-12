import { Page, Locator, expect } from "@playwright/test";

export class GitHubRepositoriesPage {
  readonly page: Page;
  readonly repositoriesList: Locator;
  readonly repositoryItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.repositoriesList = page.locator('#user-repositories-list');
    this.repositoryItems = page.locator('[itemprop="owns"]');
  }

  async validateRepositoriesPage(expectedUrl: string | RegExp = /tab=repositories/) {
    await expect(this.page).toHaveURL(expectedUrl);
    //await expect(this.repositoriesList).toBeVisible();
  }

  async getRepositoryCount(): Promise<number> {
    return await this.repositoryItems.count();
  }

  async validateRepositoryCountGreaterThan(minCount: number) {
    await expect(this.repositoriesList).toBeVisible();
    const count = await this.getRepositoryCount();
    expect(count).toBeGreaterThan(minCount);
  }

  async clickOnRepository(repoName: string) {
    await this.page.getByRole('link', { name: repoName }).first().click();
  }

  async enterRepositoryName(repoName: string) {
    await this.page.getByRole('searchbox', { name: 'Find a repository…' }).fill(repoName);
  }

  async validateFilteredRepositoryBtn(){
    await expect(this.page.getByRole('link', { name: 'Clear filter' })).toBeVisible();
  }
}