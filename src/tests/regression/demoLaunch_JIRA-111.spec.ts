import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { loadTestDataFromFile } from "../../utils/testDataHelper";

// Load test data for JIRA-111
const testData = loadTestDataFromFile({ title: "JIRA-111" });

test.describe("Demo Launch and Game Functionality Verification (JIRA-111)", () => {
  test(
    "should verify demo launch and game modal overlay for '3-Wonders Phoenix 2'",
    async ({ page }) => {
      const homePage = new HomePage(page);
      // Navigate to the configured URL from test data
      await homePage.navigateTo(testData.url);
      // Run the full demo launch and modal verification workflow
      const result = await homePage.launchDemoAndVerifyGameModal();
      expect(result).toBe(true);
    },
    testData.testTimeout || 40000
  );
});
