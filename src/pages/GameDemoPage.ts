import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class GameDemoPage extends BasePage {
  // Locators
  readonly ageConsentButton: Locator;
  readonly acceptAllCookiesButton: Locator;
  readonly firstGameCard: Locator;
  readonly demoButton: Locator;
  readonly demoMenu: Locator;
  readonly playOnDesktopOption: Locator;
  readonly playOnMobileOption: Locator;
  readonly gameModalOverlay: Locator;
  readonly gameCardTitle: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize locators for demo/game functionality
    this.ageConsentButton = page.locator('a.button:has-text("I am 18 years or older")').first();
    this.acceptAllCookiesButton = page.locator('#onetrust-accept-btn-handler').first();
    this.firstGameCard = page.locator('[class*="game-card"], [data-testid*="game"]').first();
    this.demoButton = this.firstGameCard.locator('button.button--solid:has-text("Demo")').first();
    this.demoMenu = page.locator('.game-card__view-tooltip-wrapper').first();
    this.playOnDesktopOption = this.demoMenu.locator('.game-card__view-tooltip-demo--desktop').first();
    this.playOnMobileOption = this.demoMenu.locator('.game-card__view-tooltip-demo--mobile').first();
    this.gameModalOverlay = page.locator('.game-modal, .modal-overlay, [class*="game-modal"], [class*="modal-overlay"]').first(); // TODO: Replace with actual selector if needed
    this.gameCardTitle = this.firstGameCard.locator('.game-card__title, .game-title, h3, h2').first(); // TODO: Replace with actual selector if needed
  }

  /**
   * Complete the full demo launch and game functionality verification flow
   * Steps:
   * 1. Navigate to homepage
   * 2. Accept age consent and cookies
   * 3. Verify first game card title
   * 4. Open demo menu
   * 5. Verify demo menu options
   * 6. Launch game in desktop demo mode
   * 7. Verify game modal/overlay is displayed
   *
   * @param homepageUrl The URL of the iGaming homepage
   * @param expectedGameTitle The expected title of the first game card (e.g., '3-Wonders Phoenix 2')
   */
  async launchDemoAndVerifyGameFunctionality(
    homepageUrl: string,
    expectedGameTitle: string
  ): Promise<void> {
    // 1. Navigate to homepage
    await this.navigateTo(homepageUrl);

    // 2. Accept age consent if present
    try {
      if (await this.ageConsentButton.isVisible({ timeout: 5000 })) {
        await this.click(this.ageConsentButton);
      }
    } catch (error) {
      // Age consent popup not present
    }

    // 3. Accept cookies if present
    try {
      if (await this.acceptAllCookiesButton.isVisible({ timeout: 5000 })) {
        await this.click(this.acceptAllCookiesButton);
      }
    } catch (error) {
      // Cookie banner not present
    }

    // 4. Verify first game card title
    await this.firstGameCard.waitFor({ state: "visible", timeout: 10000 });
    const actualTitle = (await this.getText(this.gameCardTitle)).trim();
    if (expectedGameTitle && actualTitle !== expectedGameTitle) {
      throw new Error(`Expected game card title '${expectedGameTitle}', but found '${actualTitle}'`);
    }

    // 5. Click the Demo button
    await this.scrollToElement(this.demoButton);
    await this.click(this.demoButton);

    // 6. Wait for demo menu to appear and verify options
    await this.demoMenu.waitFor({ state: "visible", timeout: 5000 });
    await this.assertElementVisible(this.playOnDesktopOption);
    await this.assertElementVisible(this.playOnMobileOption);
    await this.assertTextMatch(this.playOnDesktopOption, "Play on Desktop");
    await this.assertTextMatch(this.playOnMobileOption, "Play on Mobile");

    // 7. Click 'Play on Desktop' to launch the game
    await this.click(this.playOnDesktopOption);

    // 8. Wait for game modal/overlay to appear
    await this.gameModalOverlay.waitFor({ state: "visible", timeout: 15000 });
    await this.assertElementVisible(this.gameModalOverlay);
  }
}
