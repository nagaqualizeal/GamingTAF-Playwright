import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  // Locators
  readonly acceptCookiesButton: Locator;
  readonly signInButton: Locator;
  readonly gamesMenu: Locator;
  readonly promotionsMenu: Locator;
  readonly searchInput: Locator;
  readonly logoLink: Locator;
  readonly mainContent: Locator;
  readonly pageTitle: Locator;
  readonly popularGamesSection: Locator;
  readonly gameCards: Locator;
  readonly playNowButton: Locator;
  readonly headerNav: Locator;
  readonly footerNav: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize locators for homepage elements
    this.acceptCookiesButton = page
      .locator('button:has-text("Accept")')
      .first();
    this.signInButton = page
      .locator('button:has-text("Sign In"), a:has-text("Sign In")')
      .first();
    this.gamesMenu = page
      .locator('a:has-text("Games"), button:has-text("Games")')
      .first();
    this.promotionsMenu = page
      .locator('a:has-text("Promotions"), button:has-text("Promotions")')
      .first();
    this.searchInput = page
      .locator('input[placeholder*="Search"], input[type="search"]')
      .first();
    this.logoLink = page.locator('a[href="/"], img[alt*="logo"]').first();
    this.mainContent = page
      .locator('main, [role="main"], .content-main')
      .first();
    this.pageTitle = page.locator("h1").first();
    this.popularGamesSection = page
      .locator('section, [class*="popular"]')
      .first();
    this.gameCards = page.locator(
      '[class*="game-card"], [data-testid*="game"]'
    );
    this.playNowButton = page
      .locator('button:has-text("Play Now"), a:has-text("Play Now")')
      .first();
    this.headerNav = page.locator("#nav");
    this.footerNav = page.locator("footer.footer");
  }

  /**
   * Navigate to homepage
   */
  async navigateToHomepage(): Promise<void> {
    await this.navigateTo("https://www.igaming.com/");
  }

  /**
   * Accept cookies if present
   */
  async acceptCookiesIfPresent(): Promise<void> {
    try {
      if (await this.acceptCookiesButton.isVisible({ timeout: 5000 })) {
        await this.click(this.acceptCookiesButton);
        console.log("Cookies accepted");
      }
    } catch (error) {
      console.log("No cookies banner found");
    }
  }

  /**
   * Click on sign in button
   */
  async clickSignIn(): Promise<void> {
    await this.click(this.signInButton);
  }

  /**
   * Click on games menu
   */
  async clickGamesMenu(): Promise<void> {
    await this.click(this.gamesMenu);
    await this.waitForNavigation();
  }

  /**
   * Click on promotions menu
   */
  async clickPromotions(): Promise<void> {
    await this.click(this.promotionsMenu);
    await this.waitForNavigation();
  }

  /**
   * Search for a game
   */
  async searchGame(gameName: string): Promise<void> {
    await this.fillText(this.searchInput, gameName);
    await this.pressKey("Enter");
    await this.waitForNavigation();
  }

  /**
   * Verify homepage is loaded
   */
  async verifyHomepageLoaded(): Promise<boolean> {
    try {
      await this.mainContent.waitFor({ state: "visible", timeout: 10000 });
      return await this.isElementVisible(this.mainContent);
    } catch (error) {
      return false;
    }
  }

  /**
   * Get popular games count
   */
  async getGameCardsCount(): Promise<number> {
    return await this.getElementCount(this.gameCards);
  }

  /**
   * Click play now button
   */
  async clickPlayNow(): Promise<void> {
    await this.scrollToElement(this.playNowButton);
    await this.click(this.playNowButton);
  }

  /**
   * Get page heading text
   */
  async getPageHeading(): Promise<string> {
    return await this.getText(this.pageTitle);
  }

  /**
   * Verify logo is visible
   */
  async verifyLogoVisible(): Promise<boolean> {
    return await this.isElementVisible(this.logoLink);
  }

  /**
   * Click logo to return home
   */
  async clickLogo(): Promise<void> {
    await this.click(this.logoLink);
    await this.waitForNavigation();
  }

  /**
   * Scroll to footer section
   */
  async scrollToFooter(): Promise<void> {
    await this.footerNav.scrollIntoViewIfNeeded();
  }

  /**
   * Click footer link by name
   */
  async clickFooterLink(linkName: string): Promise<void> {
    const link = this.footerNav
      .locator(".nav-footer")
      .getByRole("link", { name: linkName });
    await link.click();
  }

  /**
   * Click header link by name
   */
  async clickHeaderLink(linkName: string): Promise<void> {
    const link = this.headerNav.getByRole("link", { name: linkName });
    await link.click();
  }

  /**
   * Click office location link by name
   */
  async clickOfficeLink(officeName: string): Promise<void> {
    const link = this.page.getByRole("link", { name: officeName });
    await link.click();
  }

  /**
   * Verify heading is visible by text
   */
  async verifyHeadingVisible(headingText: string): Promise<boolean> {
    const heading = this.page
      .getByRole("heading", { name: headingText })
      .first();
    return await this.isElementVisible(heading);
  }

  /**
   * Verify heading is visible by pattern
   */
  async verifyHeadingVisibleByPattern(pattern: string): Promise<boolean> {
    const regex = new RegExp(pattern, "i");
    const heading = this.page.getByRole("heading", { name: regex }).first();
    return await this.isElementVisible(heading);
  }

  /**
   * Verify text is visible
   */
  async verifyTextVisible(text: string): Promise<boolean> {
    const element = this.page.getByText(text).first();
    return await this.isElementVisible(element);
  }
}
