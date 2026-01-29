import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class GameDemoPage extends BasePage {
  // Locators
  readonly ageConsentButton: Locator;
  readonly acceptAllCookiesButton: Locator;
  readonly firstGameCardTitle: Locator;
  readonly firstGameCardDemoButton: Locator;
  readonly demoMenu: Locator;
  readonly playOnDesktopOption: Locator;
  readonly playOnMobileOption: Locator;
  readonly gameModalOverlay: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize locators for demo launch and game functionality
    this.ageConsentButton = page.locator("a[data-behaviour='age-consent-btn-yes']").first();
    this.acceptAllCookiesButton = page.locator("#onetrust-accept-btn-handler").first();
    this.firstGameCardTitle = page.locator('[class*="game-card"] .game-card__title, [data-testid*="game"] .game-card__title').first(); // TODO: Adjust selector if needed
    this.firstGameCardDemoButton = page.locator('button.game-card__view.button--solid[data-behaviour="card-play-tooltip"]').first();
    this.demoMenu = page.locator('div.game-card__view-tooltip-wrapper').first();
    this.playOnDesktopOption = page.locator('div.game-card__view-tooltip-demo--desktop[data-behaviour="card-play-demo"]').first();
    this.playOnMobileOption = page.locator('div.game-card__view-tooltip-demo--mobile[data-behaviour="card-play-demo-mobile"]').first();
    this.gameModalOverlay = page.locator('.game-modal, .modal, .overlay, [data-testid*="game-modal"]').first(); // TODO: Replace with actual selector
  }

  /**
   * Complete the demo launch flow and verify game modal/overlay
   * - Accept age consent and cookies
   * - Verify homepage title
   * - Verify first game card title
   * - Open demo menu and select desktop option
   * - Verify game modal/overlay appears
   */
  async launchDemoAndVerifyGameModal(expectedTitle: string = "Our Games - Light & Wonder", expectedGameCardTitle: string = "3-Wonders Phoenix 2"): Promise<void> {
    // Wait for homepage load
    await this.waitForNavigation();

    // Accept age consent if present
    if (await this.ageConsentButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await this.click(this.ageConsentButton);
      await this.wait(500); // Wait for popup to close
    }

    // Accept cookies if present
    if (await this.acceptAllCookiesButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await this.click(this.acceptAllCookiesButton);
      await this.wait(500); // Wait for banner to close
    }

    // Verify page title
    const pageTitle = await this.getPageTitle();
    if (pageTitle !== expectedTitle) {
      throw new Error(`Expected page title '${expectedTitle}', but got '${pageTitle}'`);
    }

    // Verify first game card title
    await this.assertTextMatch(this.firstGameCardTitle, expectedGameCardTitle);

    // Click Demo button on first game card
    await this.hoverOver(this.firstGameCardDemoButton);
    await this.click(this.firstGameCardDemoButton);
    await this.waitForElement('div.game-card__view-tooltip-wrapper');

    // Verify demo menu appears with options
    await this.assertElementVisible(this.demoMenu, true);
    await this.assertElementVisible(this.playOnDesktopOption, true);
    await this.assertElementVisible(this.playOnMobileOption, true);

    // Click Play on Desktop option
    await this.click(this.playOnDesktopOption);

    // Wait for game modal/overlay to appear
    await this.waitForElement('.game-modal, .modal, .overlay, [data-testid*="game-modal"]');
    await this.assertElementVisible(this.gameModalOverlay, true);
  }
}
