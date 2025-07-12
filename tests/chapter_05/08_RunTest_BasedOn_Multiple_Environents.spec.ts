import { test, expect } from '../../src/fixture/Githubfixture';
test.describe(`Validar perfil y repositorios de JoanEsquivel en GitHub - ${process.env.TEST_EXECUTION_ENV?.toUpperCase()} environment`, () => { 
  test(`Repositorios de JoanEsquivel en GitHub - ${process.env.TEST_EXECUTION_ENV?.toUpperCase()} environment - Skill 01`, async ({ githubProfilePage, githubRepositoriesPage,testData }) => {
    await githubProfilePage.goToProfile();
    await githubProfilePage.validateProfileName('Joan Esquivel');
    await githubProfilePage.goToRepositoriesTab();
    await githubRepositoriesPage.validateRepositoriesPage();
    await githubRepositoriesPage.validateRepositoryCountGreaterThan(0);
    await githubRepositoriesPage.enterRepositoryName(String(testData.Module1TestData?.skill01));
    await githubRepositoriesPage.validateFilteredRepositoryBtn();
    await githubRepositoriesPage.clickOnRepository(String(testData.Module1TestData?.skill01));
    await githubRepositoriesPage.validateRepositoriesPage(`${process.env.GITHUB_JOAN_MEDIA}` + String(testData.Module1TestData?.skill01));
  });

  test(`Repositorios de JoanEsquivel en GitHub - ${process.env.TEST_EXECUTION_ENV?.toUpperCase()} environment - Skill 02`, async ({ githubProfilePage, githubRepositoriesPage,testData }) => {
    await githubProfilePage.goToProfile();
    await githubProfilePage.validateProfileName('Joan Esquivel');
    await githubProfilePage.goToRepositoriesTab();
    await githubRepositoriesPage.validateRepositoriesPage();
    await githubRepositoriesPage.validateRepositoryCountGreaterThan(0);
    await githubRepositoriesPage.enterRepositoryName(String(testData.Module1TestData?.skill02))
    await githubRepositoriesPage.validateFilteredRepositoryBtn();
    await githubRepositoriesPage.clickOnRepository(String(testData.Module1TestData?.skill02));
    await githubRepositoriesPage.validateRepositoriesPage(`${process.env.GITHUB_JOAN_MEDIA}` + String(testData.Module1TestData?.skill02));
  });

  test(`Repositorios de JoanEsquivel en GitHub - ${process.env.TEST_EXECUTION_ENV?.toUpperCase()} environment - Skill 03`, async ({ githubProfilePage, githubRepositoriesPage,testData }) => {
    await githubProfilePage.goToProfile();
    await githubProfilePage.validateProfileName('Joan Esquivel');
    await githubProfilePage.goToRepositoriesTab();
    await githubRepositoriesPage.validateRepositoriesPage();
    await githubRepositoriesPage.validateRepositoryCountGreaterThan(0);
    await githubRepositoriesPage.enterRepositoryName(String(testData.Module1TestData?.skill03))
    await githubRepositoriesPage.validateFilteredRepositoryBtn();
    await githubRepositoriesPage.clickOnRepository(String(testData.Module1TestData?.skill03));
    await githubRepositoriesPage.validateRepositoriesPage(`${process.env.GITHUB_JOAN_MEDIA}` + String(testData.Module1TestData?.skill03));
  });
})