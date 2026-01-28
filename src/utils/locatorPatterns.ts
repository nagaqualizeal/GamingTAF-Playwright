/**
 * Common Locator Patterns for iGaming Website
 * Use these patterns as reference when creating page objects
 */

// ============================================
// Button Locators
// ============================================
export const BUTTON_LOCATORS = {
  signIn: 'button:has-text("Sign In"), a:has-text("Sign In")',
  signUp: 'button:has-text("Sign Up"), a:has-text("Sign Up")',
  playNow: 'button:has-text("Play Now"), a:has-text("Play Now")',
  login: 'button[type="submit"]:has-text("Login")',
  submit: 'button[type="submit"]',
  acceptCookies: 'button:has-text("Accept")',
  close: 'button[aria-label="Close"], button:has-text("Close")',
};

// ============================================
// Input Field Locators
// ============================================
export const INPUT_LOCATORS = {
  email: 'input[type="email"], input[name*="email"], input[id*="email"]',
  password: 'input[type="password"]',
  username:
    'input[type="text"][name*="user"], input[type="text"][name*="login"]',
  search: 'input[placeholder*="Search"], input[type="search"]',
  phone: 'input[type="tel"], input[name*="phone"]',
  zipCode: 'input[name*="zip"], input[name*="postcode"]',
};

// ============================================
// Menu & Navigation Locators
// ============================================
export const MENU_LOCATORS = {
  games: 'a:has-text("Games"), button:has-text("Games")',
  promotions: 'a:has-text("Promotions"), button:has-text("Promotions")',
  account: 'a:has-text("Account"), button:has-text("Account")',
  support: 'a:has-text("Support"), a:has-text("Help")',
  about: 'a:has-text("About")',
  logo: 'a[href="/"], img[alt*="logo"]',
};

// ============================================
// Content Locators
// ============================================
export const CONTENT_LOCATORS = {
  mainContent: 'main, [role="main"], .content-main',
  pageHeading: "h1",
  pageSubHeading: "h2",
  errorMessage: '.error, [class*="error"], .alert-danger',
  successMessage: '.success, [class*="success"], .alert-success',
  banner: '[role="banner"]',
  footer: 'footer, [role="contentinfo"]',
};

// ============================================
// Game/Card Locators
// ============================================
export const CARD_LOCATORS = {
  gameCard: '[class*="game-card"], [data-testid*="game"]',
  gameImage: 'img[alt*="game"]',
  gameTitle: '[class*="game-title"]',
  gamePrice: '[class*="price"], [class*="bet"]',
};

// ============================================
// Form Locators
// ============================================
export const FORM_LOCATORS = {
  form: "form",
  loginForm: 'form[id*="login"], form[class*="login"]',
  signupForm: 'form[id*="signup"], form[class*="signup"]',
  checkbox: 'input[type="checkbox"]',
  radio: 'input[type="radio"]',
  textarea: "textarea",
};

// ============================================
// Link Locators
// ============================================
export const LINK_LOCATORS = {
  forgotPassword: 'a:has-text("Forgot"), a:has-text("forget")',
  privacyPolicy: 'a:has-text("Privacy")',
  termsOfService: 'a:has-text("Terms")',
  contactUs: 'a:has-text("Contact")',
};

// ============================================
// Status/Alert Locators
// ============================================
export const STATUS_LOCATORS = {
  loader: '[class*="loader"], [class*="spinner"], [class*="loading"]',
  tooltip: '[role="tooltip"]',
  modal: '[role="dialog"]',
  alert: '[role="alert"]',
};

/**
 * Helper function to wait for element with retry
 */
export async function waitForElementWithRetry(
  page: any,
  selector: string,
  timeout: number = 30000,
  retries: number = 3
): Promise<void> {
  for (let i = 0; i < retries; i++) {
    try {
      await page.waitForSelector(selector, { timeout: timeout / retries });
      return;
    } catch (error) {
      if (i === retries - 1) throw error;
      console.log(`Retry ${i + 1}/${retries} for selector: ${selector}`);
    }
  }
}

/**
 * Helper function to get element with default fallback
 */
export function getElementWithFallback(
  page: any,
  primarySelector: string,
  fallbackSelector?: string
): any {
  const element = page.locator(primarySelector);
  if (fallbackSelector) {
    return element.or(page.locator(fallbackSelector));
  }
  return element;
}

/**
 * Common test data patterns
 */
export const COMMON_TEST_DATA = {
  validEmail: "testuser@example.com",
  invalidEmail: "invalid-email",
  validPassword: "TestPassword123!",
  invalidPassword: "short",
  validPhone: "+1234567890",
  validZipCode: "12345",
};
