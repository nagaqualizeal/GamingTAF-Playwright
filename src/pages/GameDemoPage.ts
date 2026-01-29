import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class GameDemoPage extends BasePage {
  // Locators
  readonly ageConsentButton: Locator;
  readonly acceptAllCookiesButton: Locator;
  readonly firstGameCard: Locator;
  readonly demoButton: Locator;
  readonly playOnDesktopOption: Locator;
  readonly gameModalOverlay: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize locators for demo launch flow
    this.ageConsentButton = page.locator("a[data-behaviour='age-consent-btn-yes']").first();
    this.acceptAllCookiesButton = page.locator("#onetrust-accept-btn-handler").first();
    this.firstGameCard = page.locator(".game-card, [class*='game-card']").first(); // TODO: Replace with actual locator if needed
    this.demoButton = this.firstGameCard.locator("button[data-behaviour='card-play-tooltip'], button.game-card__view.button--solid, span:text-is('Demo')").first();
    this.playOnDesktopOption = page.locator(".game-card__view-tooltip-demo--desktop").first();
    this.gameModalOverlay = page.locator(".game-modal, .modal, [class*='game-overlay']").first(); // TODO: Replace with actual locator
  }

  /**
   * Complete the full demo launch flow for the first game card
   * - Accept age consent
   * - Accept cookies
   * - Open demo menu for first game card
   * - Click 'Play on Desktop'
   * - Wait for game modal/overlay
   */
  async launchDemoAndVerifyGameModal(): Promise<void> {
    // Accept age consent if present
    try {
      if (await this.ageConsentButton.isVisible({ timeout: 5000 })) {
        await this.click(this.ageConsentButton);
        await this.wait(500); // Wait for popup to close
      }
    } catch (error) {
      // Age consent popup not present
    }

    // Accept cookies if present
    try {
      if (await this.acceptAllCookiesButton.isVisible({ timeout: 5000 })) {
        await this.click(this.acceptAllCookiesButton);
        await this.wait(500); // Wait for banner to close
      }
    } catch (error) {
      // Cookie banner not present
    }

    // Wait for first game card to be visible
    await this.firstGameCard.waitFor({ state: "visible", timeout: 10000 });

    // Optionally verify the first game card title
    // const gameTitle = await this.firstGameCard.locator(".game-card__title, .game-title, h3").first();
    // await this.assertTextMatch(gameTitle, "3-Wonders Phoenix 2");

    // Click the Demo button on the first game card
    await this.hoverOver(this.firstGameCard);
    await this.demoButton.waitFor({ state: "visible", timeout: 5000 });
    await this.click(this.demoButton);

    // Wait for demo menu to appear and click 'Play on Desktop'
    await this.playOnDesktopOption.waitFor({ state: "visible", timeout: 5000 });
    await this.click(this.playOnDesktopOption);

    // Wait for the game modal/overlay to open
    await this.gameModalOverlay.waitFor({ state: "visible", timeout: 15000 });
    await this.assertElementVisible(this.gameModalOverlay, true);
  }
}
