import { Page, Locator, expect } from "@playwright/test";

export class ResultPage{
  readonly page: Page;
  
  constructor(page: Page) {
    this.page = page;
      
  }

  //methods:
  async clickOnPlaylist(link: string){
    await this.page.getByRole('link', {name: link})
      .first()
      .click();
  }
}