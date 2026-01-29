import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { loadTestDataFromFile } from "../../utils/testDataHelper";

// Load test data for JIRA-111 (IGAME-008)
const testData = loadTestDataFromFile({ fileName: "IGAME-008.json" });

test.describe("Demo Launch and Game Functionality Verification [JIRA-111]", () => {
  test(
    "should verify demo launch and device options for '3-Wonders Phoenix 2'",
    async ({ page }) => {
      const homePage = new HomePage(page);
      // Step 1: Navigate to homepage
      await homePage.navigateToHomepage();
      const homepageLoaded = await homePage.verifyHomepageLoaded();
      expect(homepageLoaded).toBeTruthy();

      // Step 2-6: Complete demo launch workflow using page object
      const demoLaunched = await homePage.launchDemoAndVerifyGameModal(
        "3-Wonders Phoenix 2"
      );
      expect(demoLaunched).toBeTruthy();
    },
    testData.testTimeout || 40000
  );
});
