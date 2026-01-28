import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { loadTestDataFromFile } from "../../utils/testDataHelper";

test.describe("Our Offices Links Navigation - IGAME-005", () => {
  let homePage: HomePage;
  let testData: Record<string, any>;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    testData = loadTestDataFromFile(test.info());
  });

  test("Verify Our Offices Links Navigation", async ({ page }) => {
    // Navigate to homepage
    await homePage.navigateToHomepage();

    // Accept cookies if present
    await homePage.acceptCookiesIfPresent();

    // Verify URL matches expected
    const currentUrl = await homePage.getCurrentUrl();
    expect(currentUrl).toContain("igaming.com");

    // Iterate through office locations from test data
    for (const office of testData.officeLocations) {
      await test.step(`Click and verify ${office.name}`, async () => {
        // Click on office link
        await homePage.clickOfficeLink(office.name);

        // Verify expected heading is visible
        const headingVisible = await homePage.verifyHeadingVisible(
          office.verificationHeading
        );
        expect(headingVisible).toBeTruthy();

        console.log(`✓ ${office.name} office link verified successfully`);

        // Navigate back to homepage
        await homePage.navigateToHomepage();
      });
    }

    // Take final screenshot
    await homePage.takeScreenshot("office-links-verified-IGAME-005");

    console.log("✓ All office links verification passed");
  });
});
