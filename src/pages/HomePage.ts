import { Page, Locator, expect } from "@playwright/test";

export class HomePage{
  readonly page: Page;
  readonly searchTextbox: Locator;

  constructor(page: Page) {
    this.page = page;
    //elements
    this.searchTextbox = page.locator('#searchbox_input');
  }

  //methods:
  async goToURL(){
    await this.page.goto(process.env.DUCK_GO_URL || 'https://duckduckgo.com/');
  }

  async searchWithKeywords(keywords: string){
    await this.searchTextbox.click();
    await this.searchTextbox.fill(keywords);
    await this.page.keyboard.press('Enter');
  }
}