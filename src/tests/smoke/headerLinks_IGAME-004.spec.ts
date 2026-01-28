import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { loadTestDataFromFile } from "../../utils/testDataHelper";

test.describe("Header Links Navigation - IGAME-004", () => {
  let homePage: HomePage;
  let testData: Record<string, any>;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    testData = loadTestDataFromFile(test.info());
  });

  test("Verify Header Links Navigation", async ({ page }) => {
    // Navigate to homepage
    await homePage.navigateToHomepage();

    // Accept cookies if present
    await homePage.acceptCookiesIfPresent();

    // Verify URL matches expected
    const currentUrl = await homePage.getCurrentUrl();
    expect(currentUrl).toContain(testData.url);

    // Iterate through header links from test data
    for (const link of testData.headerLinks) {
      await test.step(`Click and verify ${link.name}`, async () => {
        // Click on header link
        await homePage.clickHeaderLink(link.name);

        // Verify URL contains expected path
        const linkUrl = await homePage.getCurrentUrl();
        expect(linkUrl).toContain(link.urlPath);

        // Verify expected content is visible
        if (link.verificationPattern) {
          const headingVisible = await homePage.verifyHeadingVisibleByPattern(
            link.verificationPattern
          );
          expect(headingVisible).toBeTruthy();
        } else if (link.verificationHeading) {
          const headingVisible = await homePage.verifyHeadingVisible(
            link.verificationHeading
          );
          expect(headingVisible).toBeTruthy();
        } else if (link.verificationText) {
          const textVisible = await homePage.verifyTextVisible(
            link.verificationText
          );
          expect(textVisible).toBeTruthy();
        }

        console.log(`✓ ${link.name} link verified successfully`);

        // Navigate back to homepage
        await homePage.navigateToHomepage();
      });
    }

    // Take final screenshot
    await homePage.takeScreenshot("header-links-verified-IGAME-004");

    console.log("✓ All header links verification passed");
  });
});
