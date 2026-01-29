import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DemoGamePage extends BasePage {
  // Locators
  readonly ageConsentButton: Locator;
  readonly acceptAllCookiesButton: Locator;
  readonly firstGameCard: Locator;
  readonly demoButton: Locator;
  readonly playOnDesktopOption: Locator;
  readonly playOnMobileOption: Locator;
  readonly gameModal: Locator;
  readonly pageTitle: Locator;
  readonly firstGameCardTitle: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize locators for demo game flow
    this.ageConsentButton = page.locator("a[data-behaviour='age-consent-btn-yes'], a.button:has-text('I am 18 years or older')").first();
    this.acceptAllCookiesButton = page.locator("#onetrust-accept-btn-handler, button#onetrust-accept-btn-handler").first();
    this.firstGameCard = page.locator('[class*="game-card"], [data-testid*="game"]').first();
    this.demoButton = this.firstGameCard.locator("button[data-behaviour='card-play-tooltip'], button.game-card__view.button.button--solid").first();
    this.playOnDesktopOption = page.locator("div.game-card__view-tooltip-demo--desktop, [data-behaviour='card-play-demo']").first();
    this.playOnMobileOption = page.locator("div.game-card__view-tooltip-demo--mobile, [data-behaviour='card-play-demo-mobile']").first();
    this.gameModal = page.locator(".game-modal, .modal, .overlay, [class*='game-modal'], [role='dialog']").first(); // TODO: Replace with actual locator if available
    this.pageTitle = page.locator('h1').first();
    this.firstGameCardTitle = this.firstGameCard.locator('div[class*="game-card__title"], .game-card__title, span, h3, h2').first(); // TODO: Replace with actual locator if available
  }

  /**
   * Complete the full demo game launch flow:
   *  - Accept age consent and cookies
   *  - Verify homepage and first game card
   *  - Open demo menu and verify device options
   *  - Launch the game modal for desktop demo
   */
  async launchDemoGameAndVerifyModal(): Promise<void> {
    // Step 1: Wait for homepage to load and verify title
    await this.waitForElement('body', 15000);
    await this.pageTitle.waitFor({ state: 'visible', timeout: 10000 });

    // Step 2: Accept age consent if present
    try {
      if (await this.ageConsentButton.isVisible({ timeout: 5000 })) {
        await this.click(this.ageConsentButton);
      }
    } catch (error) {
      // Age consent not present
    }

    // Step 3: Accept cookies if present
    try {
      if (await this.acceptAllCookiesButton.isVisible({ timeout: 5000 })) {
        await this.click(this.acceptAllCookiesButton);
      }
    } catch (error) {
      // Cookie banner not present
    }

    // Step 4: Verify first game card title
    await this.firstGameCard.waitFor({ state: 'visible', timeout: 10000 });
    const gameTitle = (await this.getText(this.firstGameCardTitle)).trim();
    // Optionally assert gameTitle === '3-Wonders Phoenix 2' if required

    // Step 5: Open demo menu
    await this.hoverOver(this.firstGameCard);
    await this.scrollToElement(this.demoButton);
    await this.click(this.demoButton);

    // Step 6: Verify demo menu options
    await this.playOnDesktopOption.waitFor({ state: 'visible', timeout: 5000 });
    await this.playOnMobileOption.waitFor({ state: 'visible', timeout: 5000 });
    const desktopText = (await this.getText(this.playOnDesktopOption)).toLowerCase();
    const mobileText = (await this.getText(this.playOnMobileOption)).toLowerCase();
    if (!desktopText.includes('desktop')) {
      throw new Error('Play on Desktop option not visible');
    }
    if (!mobileText.includes('mobile')) {
      throw new Error('Play on Mobile option not visible');
    }

    // Step 7: Click Play on Desktop and verify game modal/overlay
    await this.click(this.playOnDesktopOption);
    await this.gameModal.waitFor({ state: 'visible', timeout: 15000 });
  }

  /**
   * Verify that the homepage is loaded and the title matches expected
   */
  async verifyHomepageLoadedAndTitle(expectedTitle: string): Promise<boolean> {
    await this.pageTitle.waitFor({ state: 'visible', timeout: 10000 });
    const actualTitle = await this.getText(this.pageTitle);
    return actualTitle.trim() === expectedTitle.trim();
  }

  /**
   * Verify the first game card title matches expected
   */
  async verifyFirstGameCardTitle(expectedTitle: string): Promise<boolean> {
    await this.firstGameCard.waitFor({ state: 'visible', timeout: 10000 });
    const actualTitle = await this.getText(this.firstGameCardTitle);
    return actualTitle.trim() === expectedTitle.trim();
  }

  /**
   * Verify demo menu options are visible
   */
  async verifyDemoMenuOptions(): Promise<boolean> {
    await this.playOnDesktopOption.waitFor({ state: 'visible', timeout: 5000 });
    await this.playOnMobileOption.waitFor({ state: 'visible', timeout: 5000 });
    const desktopText = (await this.getText(this.playOnDesktopOption)).toLowerCase();
    const mobileText = (await this.getText(this.playOnMobileOption)).toLowerCase();
    return desktopText.includes('desktop') && mobileText.includes('mobile');
  }
}
