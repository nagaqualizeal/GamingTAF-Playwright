import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { loadTestDataFromFile } from "../../utils/testDataHelper";

// Load test data for JIRA-111
const testData = loadTestDataFromFile({ title: "JIRA-111" });

test.describe("Demo Launch and Game Functionality Verification (JIRA-111)", () => {
  test(
    "should load homepage, handle popups, launch demo, and verify game modal/overlay",
    async ({ page }) => {
      const homePage = new HomePage(page);

      // Step 1: Navigate to homepage
      await homePage.navigateToHomepage();
      const homepageLoaded = await homePage.verifyHomepageLoaded();
      expect(homepageLoaded).toBeTruthy();

      // Step 2-6: Complete demo launch and modal verification workflow
      const demoModalVisible = await homePage.launchDemoAndVerifyGameModal();
      expect(demoModalVisible).toBeTruthy();
    },
    testData.testTimeout || 40000
  );
});
