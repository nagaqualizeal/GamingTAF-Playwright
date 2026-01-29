import { test, expect } from '@playwright/test';
import { DemoGamePage } from '../../pages/DemoGamePage';
import { readTestData } from '../../utils/testDataHelper';

// Load test data for JIRA-111
const testData = readTestData('JIRA-111');

// Use the first homepage URL and expected values from test data
const homepageUrl = testData.homepageUrls[0];
const expectedPageTitle = 'Our Games - Light & Wonder';
const expectedFirstGameCardTitle = '3-Wonders Phoenix 2';

// Test suite for Demo Launch and Game Functionality Verification
// JIRA-111

test.describe('Demo Launch and Game Functionality Verification (JIRA-111)', () => {
  let demoGamePage: DemoGamePage;

  test.beforeEach(async ({ page }) => {
    demoGamePage = new DemoGamePage(page);
    await demoGamePage.navigateTo(homepageUrl);
  });

  test('should load homepage, show demo modal, and allow playing demo on desktop', async () => {
    // Step 1: Verify homepage loaded and title
    const homepageLoaded = await demoGamePage.verifyHomepageLoadedAndTitle(expectedPageTitle);
    expect(homepageLoaded).toBeTruthy();

    // Step 2: Accept age consent and cookies (handled in page object launch method)
    // Step 3: Accept cookies (handled in page object launch method)

    // Step 4: Verify first game card title
    const gameCardTitleCorrect = await demoGamePage.verifyFirstGameCardTitle(expectedFirstGameCardTitle);
    expect(gameCardTitleCorrect).toBeTruthy();

    // Step 5: Open demo menu and verify device options
    await demoGamePage.hoverOver(demoGamePage.firstGameCard); // Ensure hover triggers tooltip
    await demoGamePage.scrollToElement(demoGamePage.demoButton);
    await demoGamePage.click(demoGamePage.demoButton);
    const demoMenuOptionsVisible = await demoGamePage.verifyDemoMenuOptions();
    expect(demoMenuOptionsVisible).toBeTruthy();

    // Step 6: Click 'Play on Desktop' and verify game modal/overlay
    await demoGamePage.click(demoGamePage.playOnDesktopOption);
    await expect(demoGamePage.gameModal).toBeVisible({ timeout: 15000 });
  });

  // Optionally, add more tests for edge cases or device options using testData.demoGameModal
});
