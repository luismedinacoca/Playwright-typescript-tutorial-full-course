import { Page, Locator, expect } from "@playwright/test";

export class GitHubProfilePage {
  readonly page: Page;
  readonly repositoriesTab: Locator;
  readonly profileName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.repositoriesTab = page.getByRole('link', { name: 'Repositories' });
    this.profileName = page.locator('span.p-name');
  }

  async goToProfile() {
    await this.page.goto(process.env.GITHUB_JOAN_ESQUIVEL || 'https://github.com/JoanEsquivel');
  }

  async goToRepositoriesTab() {
    await this.repositoriesTab.click();
    await this.page.waitForURL(/tab=repositories/);
  }

  async validateProfileName(expectedName: string) {
    await expect(this.profileName).toHaveText(expectedName);
  }
}