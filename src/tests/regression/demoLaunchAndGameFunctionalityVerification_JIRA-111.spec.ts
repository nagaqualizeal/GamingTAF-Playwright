import { test, expect } from '@playwright/test';
import { GameDemoPage } from '../../pages/GameDemoPage';
import * as path from 'path';
import { readTestData } from '../../utils/testDataHelper';

// Test Data
const jiraId = 'JIRA-111';
const testDataPath = path.resolve(__dirname, '../../test-data/demo-launch-and-game-functionality-verification-data.json');
let demoTestData: any;

// Homepage URL and expected first game title (could be parameterized or loaded from config)
const HOMEPAGE_URL = 'https://igaming.lnw.com/';
const EXPECTED_FIRST_GAME_TITLE = '3-Wonders Phoenix 2';

test.describe('Demo Launch and Game Functionality Verification [JIRA-111]', () => {
  test.beforeAll(async () => {
    // Load test data for this test case
    // Prefer using testDataHelper if present, else require JSON directly
    try {
      demoTestData = readTestData(jiraId);
    } catch (e) {
      demoTestData = require('../../test-data/demo-launch-and-game-functionality-verification-data.json');
    }
  });

  test('should display demo menu with device options and open game modal overlay', async ({ page }) => {
    const gameDemoPage = new GameDemoPage(page);

    // Run the main workflow (includes all steps and assertions)
    await gameDemoPage.launchDemoAndVerifyGameFunctionality(
      HOMEPAGE_URL,
      EXPECTED_FIRST_GAME_TITLE
    );

    // Additional assertions using test data (optional, for edge cases or extra validation)
    // Validate demo menu options (labels)
    if (demoTestData && Array.isArray(demoTestData.demoMenuOptions)) {
      // Check that both expected options are present and visible
      const expectedOptions = demoTestData.demoMenuOptions.map((opt: any) => opt.label);
      // Use Page Object methods for assertions
      await gameDemoPage.assertTextMatch(gameDemoPage.playOnDesktopOption, expectedOptions[0]);
      await gameDemoPage.assertTextMatch(gameDemoPage.playOnMobileOption, expectedOptions[1]);
    }
    // Validate game modal/overlay is visible
    if (demoTestData && demoTestData.expectedGameModal && demoTestData.expectedGameModal.isVisible) {
      await gameDemoPage.assertElementVisible(gameDemoPage.gameModalOverlay);
    }
  });
});
