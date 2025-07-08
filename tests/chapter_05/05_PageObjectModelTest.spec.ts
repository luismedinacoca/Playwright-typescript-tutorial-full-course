import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { ResultPage } from '../../src/pages/ResultPage';
import { PlaylistPage } from '../../src/pages/PLaylistPage';

test('Page Object Model Test', async({ page })=> {
  //create homepage object
  const homepage = new HomePage(page);
  await homepage.goToURL();
  await homepage.searchWithKeywords(`${process.env.SEARCH_KEYWORD}`);

  //create ResusltPage object
  const resultPage = new ResultPage(page);
  await resultPage.clickOnPlaylist(`${process.env.SEARCH_KEYWORD}`);

  //create playlistPage object
  const playlistPage = new PlaylistPage(page);
  await playlistPage.validatePageTitle(`${process.env.SEARCH_KEYWORD}`);
})