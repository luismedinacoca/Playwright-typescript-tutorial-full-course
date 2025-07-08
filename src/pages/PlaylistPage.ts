import { Page, Locator, expect } from "@playwright/test";

export class PlaylistPage{
  readonly page: Page;
  
  constructor(page: Page) {
    this.page = page;

  }

  //methods:
  async validatePageTitle(title: string){
    await expect(this.page).toHaveTitle(title)
  }
}