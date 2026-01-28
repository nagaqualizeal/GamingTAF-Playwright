import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { loadTestDataFromFile } from "../../utils/testDataHelper";

test.describe("iGamingCare Gambling Support Database - IGAME-007", () => {
  let homePage: HomePage;
  let testData: Record<string, any>;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    testData = loadTestDataFromFile(test.info());
  });

  test("Verify Professional Help Database Filters", async ({ page }) => {
    // Navigate to homepage
    await homePage.navigateToHomepage();
    await expect(page).toHaveURL(/igaming\.com\/$/);

    // Accept cookies if present
    await homePage.acceptCookiesIfPresent();

    // Click on iGamingCare link in the navigation menu
    await test.step("Navigate to iGamingCare page", async () => {
      const igamingCareLink = page
        .locator("#nav")
        .getByRole("link", { name: "iGamingCare" });
      await expect(igamingCareLink).toBeVisible();
      await igamingCareLink.click();
      await page.waitForURL(new RegExp(testData.igamingcareUrl));

      // Verify iGamingCare page loaded
      const currentUrl = await homePage.getCurrentUrl();
      expect(currentUrl).toContain("igamingcare");

      console.log("✓ Successfully navigated to iGamingCare page");
    });

    // Scroll to the professional help section
    await test.step("Scroll to professional help section", async () => {
      const profesionalHelpSection = page.getByRole("heading", {
        name: new RegExp(testData.expectedResultsHeading),
      });
      await expect(profesionalHelpSection).toBeVisible();
      await profesionalHelpSection.scrollIntoViewIfNeeded();

      // Scroll down a bit more to see the filters
      await page.evaluate(() => window.scrollBy(0, 300));
      await page.waitForTimeout(500);

      console.log("✓ Professional help section is visible");
    });

    // Apply database filters
    await test.step("Apply database filters", async () => {
      // Select country using the custom dropdown function
      await homePage.selectFromCustomDropdown(
        "gambling-centers-filter",
        testData.country
      );
      console.log(`✓ Selected country: ${testData.country}`);

      // Select language from combobox
      const languageDropdown = page.getByRole("combobox").nth(0);
      await expect(languageDropdown).toBeVisible();
      await languageDropdown.selectOption(testData.language);
      await page.waitForTimeout(300);
      console.log(`✓ Selected language: ${testData.language}`);

      // Select form of help from combobox
      const formOfHelpDropdown = page.getByRole("combobox").nth(1);
      await expect(formOfHelpDropdown).toBeVisible();
      await formOfHelpDropdown.selectOption(testData.formOfHelp);
      await page.waitForTimeout(300);
      console.log(`✓ Selected form of help: ${testData.formOfHelp}`);
    });

    // Verify filtered results
    await test.step("Verify filtered results", async () => {
      const resultsText = page.getByText(/Showing \d+ results/);
      await expect(resultsText).toBeVisible();

      // Extract and verify the number of results
      const resultsContent = await resultsText.first().textContent();
      const matches = resultsContent?.match(/Showing (\d+) results/);
      const count = matches ? parseInt(matches[1]) : 0;
      expect(count).toBeGreaterThanOrEqual(testData.minExpectedResults);

      console.log(`✓ Results displayed: ${count} centers found`);

      // Verify each expected center
      for (const center of testData.expectedCenters) {
        const centerLocator = page.getByText(center).first();
        await expect(centerLocator).toBeVisible();
        console.log(`✓ ${center} is visible`);
      }
    });

    // Take final screenshot for reporting
    await homePage.takeScreenshot("igamingcare-database-filters-IGAME-007");

    console.log("✓ All professional help database filters verification passed");
  });
});
