import { test } from '../../src/fixture/Testfixture';
import { HomePage } from '../../src/pages/duckduckgo/HomePage';
import { ResultPage } from '../../src/pages/duckduckgo/ResultPage';
import { PlaylistPage } from '../../src/pages/duckduckgo/PlaylistPage';

test('Implementing Fixture Test', async({ page })=> {
  console.log('Test execution is starting...');
  await page.setViewportSize({
    width: 1920,
    height: 1080,
  });
  
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
  
  console.log('Test execution is ending...');
});