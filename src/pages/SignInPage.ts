import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SignInPage extends BasePage {
  // Locators
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInSubmitButton: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly forgotPasswordLink: Locator;
  readonly signUpLink: Locator;
  readonly errorMessage: Locator;
  readonly pageHeading: Locator;
  readonly loginForm: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize locators for sign-in page
    this.emailInput = page
      .locator('input[type="email"], input[name*="email"], input[id*="email"]')
      .first();
    this.passwordInput = page.locator('input[type="password"]').first();
    this.signInSubmitButton = page
      .locator('button:has-text("Sign In"), button[type="submit"]')
      .first();
    this.rememberMeCheckbox = page.locator('input[type="checkbox"]').first();
    this.forgotPasswordLink = page
      .locator('a:has-text("Forgot"), a:has-text("forget")')
      .first();
    this.signUpLink = page
      .locator('a:has-text("Sign Up"), a:has-text("Register")')
      .first();
    this.errorMessage = page
      .locator('.error, [class*="error"], .alert-danger')
      .first();
    this.pageHeading = page.locator("h1, h2").first();
    this.loginForm = page.locator("form").first();
  }

  /**
   * Navigate to sign in page
   */
  async navigateToSignIn(): Promise<void> {
    await this.navigateTo("https://www.igaming.com/signin");
  }

  /**
   * Login with email and password
   */
  async login(email: string, password: string): Promise<void> {
    await this.fillText(this.emailInput, email);
    await this.fillText(this.passwordInput, password);
    await this.click(this.signInSubmitButton);
    await this.waitForNavigation();
  }

  /**
   * Login with remember me option
   */
  async loginWithRememberMe(email: string, password: string): Promise<void> {
    await this.fillText(this.emailInput, email);
    await this.fillText(this.passwordInput, password);

    // Check remember me checkbox
    if (await this.isElementVisible(this.rememberMeCheckbox)) {
      await this.click(this.rememberMeCheckbox);
    }

    await this.click(this.signInSubmitButton);
    await this.waitForNavigation();
  }

  /**
   * Click forgot password link
   */
  async clickForgotPassword(): Promise<void> {
    await this.click(this.forgotPasswordLink);
    await this.waitForNavigation();
  }

  /**
   * Click sign up link
   */
  async clickSignUp(): Promise<void> {
    await this.click(this.signUpLink);
    await this.waitForNavigation();
  }

  /**
   * Verify sign in page is loaded
   */
  async verifySignInPageLoaded(): Promise<boolean> {
    try {
      await this.loginForm.waitFor({ state: "visible", timeout: 10000 });
      return await this.isElementVisible(this.loginForm);
    } catch (error) {
      return false;
    }
  }

  /**
   * Get error message
   */
  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }

  /**
   * Verify error message is visible
   */
  async isErrorMessageVisible(): Promise<boolean> {
    return await this.isElementVisible(this.errorMessage);
  }

  /**
   * Get page heading
   */
  async getPageHeading(): Promise<string> {
    return await this.getText(this.pageHeading);
  }

  /**
   * Check if email input is visible
   */
  async isEmailInputVisible(): Promise<boolean> {
    return await this.isElementVisible(this.emailInput);
  }

  /**
   * Check if password input is visible
   */
  async isPasswordInputVisible(): Promise<boolean> {
    return await this.isElementVisible(this.passwordInput);
  }

  /**
   * Clear email input
   */
  async clearEmailInput(): Promise<void> {
    await this.fillText(this.emailInput, "");
  }

  /**
   * Clear password input
   */
  async clearPasswordInput(): Promise<void> {
    await this.fillText(this.passwordInput, "");
  }
}
