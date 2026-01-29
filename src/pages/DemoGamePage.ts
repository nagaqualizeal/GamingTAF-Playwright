import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DemoGamePage extends BasePage {
  // Locators
  readonly ageConsentButton: Locator;
  readonly acceptAllCookiesButton: Locator;
  readonly firstGameCard: Locator;
  readonly gameCardDemoButton: Locator;
  readonly demoMenuDesktopOption: Locator;
  readonly demoMenuMobileOption: Locator;
  readonly demoMenu: Locator;
  readonly gameModal: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize locators for demo launch flow
    this.ageConsentButton = page.locator("a[data-behaviour='age-consent-btn-yes']").first();
    this.acceptAllCookiesButton = page.locator("#onetrust-accept-btn-handler").first();
    this.firstGameCard = page.locator('[class*="game-card"], [data-testid*="game"]').first();
    this.gameCardDemoButton = this.firstGameCard.locator('button.game-card__view.button.button--solid').first();
    this.demoMenu = page.locator('.game-card__view-tooltip-wrapper').first();
    this.demoMenuDesktopOption = this.demoMenu.locator('div.game-card__view-tooltip-demo--desktop').first();
    this.demoMenuMobileOption = this.demoMenu.locator('div.game-card__view-tooltip-demo--mobile').first();
    this.gameModal = page.locator('.game-modal, .modal, [class*="game-overlay"]').first(); // TODO: Replace with actual locator if needed
    this.pageTitle = page.locator('h1').first();
  }

  /**
   * Complete the demo game launch flow for '3-Wonders Phoenix 2' game
   * - Handles age consent, cookies, demo menu, and launches desktop demo
   * - Returns true if the demo modal/overlay appears
   */
  async launchDemoGameOnDesktop(): Promise<boolean> {
    // Wait for homepage to load
    await this.waitForNavigation();
    // Optionally verify page title
    const title = await this.getPageTitle();
    // Accept age consent if present
    try {
      if (await this.ageConsentButton.isVisible({ timeout: 5000 })) {
        await this.click(this.ageConsentButton);
      }
    } catch (e) {
      // Age consent not present
    }
    // Accept cookies if present
    try {
      if (await this.acceptAllCookiesButton.isVisible({ timeout: 5000 })) {
        await this.click(this.acceptAllCookiesButton);
      }
    } catch (e) {
      // Cookie banner not present
    }
    // Wait for first game card to be visible
    await this.firstGameCard.waitFor({ state: "visible", timeout: 10000 });
    // Optionally verify first game card text
    const gameCardText = await this.firstGameCard.textContent();
    // Click Demo button on first game card
    await this.scrollToElement(this.gameCardDemoButton);
    await this.click(this.gameCardDemoButton);
    // Wait for demo menu to appear
    await this.demoMenu.waitFor({ state: "visible", timeout: 5000 });
    // Click 'Play on Desktop' option
    await this.click(this.demoMenuDesktopOption);
    // Wait for game modal/overlay to appear
    try {
      await this.gameModal.waitFor({ state: "visible", timeout: 15000 });
      return await this.isElementVisible(this.gameModal);
    } catch (e) {
      return false;
    }
  }

  /**
   * Launch demo game on mobile (from demo menu)
   * - Returns true if the demo modal/overlay appears
   */
  async launchDemoGameOnMobile(): Promise<boolean> {
    // Assumes demo menu is already open
    await this.demoMenuMobileOption.waitFor({ state: "visible", timeout: 5000 });
    await this.click(this.demoMenuMobileOption);
    try {
      await this.gameModal.waitFor({ state: "visible", timeout: 15000 });
      return await this.isElementVisible(this.gameModal);
    } catch (e) {
      return false;
    }
  }

  /**
   * Verify the demo menu displays both Desktop and Mobile options
   */
  async verifyDemoMenuOptions(): Promise<boolean> {
    await this.demoMenu.waitFor({ state: "visible", timeout: 5000 });
    const desktopVisible = await this.isElementVisible(this.demoMenuDesktopOption);
    const mobileVisible = await this.isElementVisible(this.demoMenuMobileOption);
    return desktopVisible && mobileVisible;
  }

  /**
   * Verify the first game card displays the expected game name
   * @param expectedName The expected game name (e.g., '3-Wonders Phoenix 2')
   */
  async verifyFirstGameCardName(expectedName: string): Promise<boolean> {
    await this.firstGameCard.waitFor({ state: "visible", timeout: 10000 });
    const text = await this.firstGameCard.textContent();
    return text !== null && text.includes(expectedName);
  }
}
