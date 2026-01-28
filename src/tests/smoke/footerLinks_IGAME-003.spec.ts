import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { loadTestDataFromFile } from "../../utils/testDataHelper";

test.describe("Footer Links Navigation - IGAME-003", () => {
  let homePage: HomePage;
  let testData: Record<string, any>;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    testData = loadTestDataFromFile(test.info());
  });

  test("Verify Footer Links Navigation", async ({ page }) => {
    // Navigate to homepage
    await homePage.navigateToHomepage();

    // Accept cookies if present
    await homePage.acceptCookiesIfPresent();

    // Verify URL matches expected
    const currentUrl = await homePage.getCurrentUrl();
    expect(currentUrl).toContain("igaming.com");

    // Iterate through footer links from test data
    for (const link of testData.footerLinks) {
      await test.step(`Click and verify ${link.name}`, async () => {
        // Click on footer link
        await homePage.clickFooterLink(link.name);

        // Verify URL contains expected path
        const linkUrl = await homePage.getCurrentUrl();
        expect(linkUrl).toContain(link.urlPath);

        // Verify expected content is visible
        if (link.verificationText) {
          const textVisible = await homePage.verifyTextVisible(
            link.verificationText
          );
          expect(textVisible).toBeTruthy();
        }

        if (link.verificationHeading) {
          const headingVisible = await homePage.verifyHeadingVisible(
            link.verificationHeading
          );
          expect(headingVisible).toBeTruthy();
        }

        if (link.verificationHeadingPattern) {
          const headingVisible = await homePage.verifyHeadingVisibleByPattern(
            link.verificationHeadingPattern
          );
          expect(headingVisible).toBeTruthy();
        }

        console.log(`✓ ${link.name} link verified successfully`);

        // Navigate back to homepage
        await homePage.navigateToHomepage();
      });
    }

    // Take final screenshot
    await homePage.takeScreenshot("footer-links-verified-IGAME-003");

    console.log("✓ All footer links verification passed");
  });
});
