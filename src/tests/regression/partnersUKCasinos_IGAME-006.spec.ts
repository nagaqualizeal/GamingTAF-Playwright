import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { loadTestDataFromFile } from "../../utils/testDataHelper";

test.describe("Partners UK Online Casinos Top 10 - IGAME-006", () => {
  let homePage: HomePage;
  let testData: Record<string, any>;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    testData = loadTestDataFromFile(test.info());
  });

  test("Verify Top 10 UK Online Casinos List Navigation", async ({ page }) => {
    // Navigate to iGaming.com homepage
    await homePage.navigateToHomepage();
    await expect(page).toHaveURL(/igaming\.com\/$/);

    // Click on Partners to show dropdown menu
    const partnersLink = page.getByText("Partners");
    await expect(partnersLink).toBeVisible();
    await partnersLink.click();

    // Wait for dropdown menu to appear and click on Online Casinos in the UK
    const ukCasinosLink = page.getByRole("link", {
      name: "Online Casinos in the UK",
    });
    await expect(ukCasinosLink).toBeVisible();
    await ukCasinosLink.click();

    // Pause for a second to allow page navigation
    await page.waitForTimeout(1000);

    // Wait for UK casinos page to load
    await page.waitForURL(new RegExp(testData.expectedUrl));
    await expect(page).toHaveTitle(new RegExp(testData.pageTitle));

    console.log("📍 Current URL:", page.url());

    // Check if we need to scroll to Top 10 section
    const topTenLink = page.getByRole("link", { name: "To the Top 10" });
    const isTopTenLinkVisible = await topTenLink.isVisible().catch(() => false);

    if (isTopTenLinkVisible) {
      console.log(
        "📍 Found 'To the Top 10' link - clicking it to scroll to top 10 section"
      );
      await topTenLink.click();
      await page.waitForTimeout(500);
    }

    // Verify the page heading is visible
    const heading = page.getByRole("heading", {
      name: new RegExp(testData.heading),
    });
    await expect(heading).toBeVisible();

    console.log("✓ Successfully navigated to Partners UK Online Casinos page");

    // Verify all 10 casinos are displayed on the page with their descriptions
    await test.step("Verify the Top 10", async () => {
      for (const casino of testData.casinos) {
        const casinoLink = page.getByRole("link", {
          name: casino.name,
          exact: true,
        });
        await expect(casinoLink).toBeVisible();

        // Verify the casino description is visible
        const description = page.getByText(casino.description);
        await expect(description).toBeVisible();

        console.log(`✓ ${casino.name} - ${casino.description}`);
      }
    });

    // Take final screenshot for reporting
    await homePage.takeScreenshot("partners-uk-casinos-top10-IGAME-006");

    console.log("✓ All top10 casinos verification passed");
  });
});
