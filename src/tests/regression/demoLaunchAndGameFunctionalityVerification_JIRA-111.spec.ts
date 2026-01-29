import { test, expect } from '@playwright/test';
import { GameDemoPage } from '../../pages/GameDemoPage';
import * as testDataHelper from '../../utils/testDataHelper';

// Load test data for JIRA-111
const jiraId = 'JIRA-111';
const testData = testDataHelper.readTestData(jiraId) || require('../../test-data/demo-launch-and-game-functionality-verification-data.json');

test.describe('Demo Launch and Game Functionality Verification (JIRA-111)', () => {
  test('should load homepage, close popups, verify game card, launch demo and open game modal', async ({ page }) => {
    // Arrange: Navigate to homepage
    const baseUrl = process.env.BASE_URL || 'https://igaming.lnw.com/';
    await page.goto(baseUrl);
    const gameDemoPage = new GameDemoPage(page);

    // Act & Assert: Complete the demo launch and game modal verification flow
    await gameDemoPage.launchDemoAndVerifyGameModal(
      testData.homepageTitle,
      testData.firstGameCard.displayName
    );
  });
});
