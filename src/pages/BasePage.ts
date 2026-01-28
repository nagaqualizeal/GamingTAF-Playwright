import { Page, expect, Locator } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a URL
   */
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: "load" });
  }

  /**
   * Capture screenshot with timestamp
   */
  async takeScreenshot(fileName: string): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const screenshotDir = path.join(process.cwd(), "screenshots");

    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    const filePath = path.join(screenshotDir, `${fileName}-${timestamp}.png`);
    await this.page.screenshot({ path: filePath, fullPage: true });
    console.log(`Screenshot saved: ${filePath}`);
    return filePath;
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(
    selector: string,
    timeout: number = 30000
  ): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Click on element
   */
  async click(locator: Locator | string): Promise<void> {
    if (typeof locator === "string") {
      await this.page.locator(locator).click();
    } else {
      await locator.click();
    }
  }

  /**
   * Fill text input
   */
  async fillText(locator: Locator | string, text: string): Promise<void> {
    if (typeof locator === "string") {
      await this.page.locator(locator).fill(text);
    } else {
      await locator.fill(text);
    }
  }

  /**
   * Get text from element
   */
  async getText(locator: Locator | string): Promise<string> {
    if (typeof locator === "string") {
      return (await this.page.locator(locator).textContent()) || "";
    } else {
      return (await locator.textContent()) || "";
    }
  }

  /**
   * Assert element is visible
   */
  async assertElementVisible(
    locator: Locator | string,
    shouldBeVisible: boolean = true
  ): Promise<void> {
    if (typeof locator === "string") {
      locator = this.page.locator(locator);
    }
    if (shouldBeVisible) {
      await expect(locator).toBeVisible();
    } else {
      await expect(locator).not.toBeVisible();
    }
  }

  /**
   * Assert element text matches
   */
  async assertTextMatch(
    locator: Locator | string,
    expectedText: string
  ): Promise<void> {
    if (typeof locator === "string") {
      locator = this.page.locator(locator);
    }
    await expect(locator).toContainText(expectedText);
  }

  /**
   * Assert exact text match
   */
  async assertTextExact(
    locator: Locator | string,
    expectedText: string
  ): Promise<void> {
    if (typeof locator === "string") {
      locator = this.page.locator(locator);
    }
    await expect(locator).toHaveText(expectedText);
  }

  /**
   * Wait for navigation
   */
  async waitForNavigation(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Get attribute value
   */
  async getAttributeValue(
    locator: Locator | string,
    attributeName: string
  ): Promise<string | null> {
    if (typeof locator === "string") {
      locator = this.page.locator(locator);
    }
    return await locator.getAttribute(attributeName);
  }

  /**
   * Check if element is enabled
   */
  async isElementEnabled(locator: Locator | string): Promise<boolean> {
    if (typeof locator === "string") {
      locator = this.page.locator(locator);
    }
    return await locator.isEnabled();
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(locator: Locator | string): Promise<boolean> {
    if (typeof locator === "string") {
      locator = this.page.locator(locator);
    }
    return await locator.isVisible();
  }

  /**
   * Wait for specific time (in milliseconds)
   */
  async wait(milliseconds: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  /**
   * Hover over element
   */
  async hoverOver(locator: Locator | string): Promise<void> {
    if (typeof locator === "string") {
      locator = this.page.locator(locator);
    }
    await locator.hover();
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get current URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Switch to iframe and return iframe page object
   */
  async switchToIFrame(frameSelector: string): Promise<Page> {
    const frame = await this.page.waitForSelector(frameSelector);
    const iframeElement = await this.page.$(frameSelector);
    if (iframeElement) {
      const frameHandle = await iframeElement.contentFrame();
      if (frameHandle) {
        return frameHandle;
      }
    }
    return this.page;
  }

  /**
   * Close page/browser
   */
  async closePage(): Promise<void> {
    await this.page.close();
  }

  /**
   * Scroll to element
   */
  async scrollToElement(locator: Locator | string): Promise<void> {
    if (typeof locator === "string") {
      locator = this.page.locator(locator);
    }
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Select option from dropdown by value
   */
  async selectDropdownOption(
    locator: Locator | string,
    optionValue: string
  ): Promise<void> {
    if (typeof locator === "string") {
      locator = this.page.locator(locator);
    }
    await locator.selectOption(optionValue);
  }

  /**
   * Get all text from multiple elements
   */
  async getAllText(locator: Locator | string): Promise<string[]> {
    if (typeof locator === "string") {
      locator = this.page.locator(locator);
    }
    return await locator.allTextContents();
  }

  /**
   * Check if element exists
   */
  async elementExists(selector: string): Promise<boolean> {
    const count = await this.page.locator(selector).count();
    return count > 0;
  }

  /**
   * Get element count
   */
  async getElementCount(locator: Locator | string): Promise<number> {
    if (typeof locator === "string") {
      locator = this.page.locator(locator);
    }
    return await locator.count();
  }

  /**
   * Press keyboard key
   */
  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  /**
   * Double click on element
   */
  async doubleClick(locator: Locator | string): Promise<void> {
    if (typeof locator === "string") {
      locator = this.page.locator(locator);
    }
    await locator.dblclick();
  }

  /**
   * Right click on element
   */
  async rightClick(locator: Locator | string): Promise<void> {
    if (typeof locator === "string") {
      locator = this.page.locator(locator);
    }
    await locator.click({ button: "right" });
  }

  /**
   * Select value from custom dropdown filter (li-based dropdown)
   * Handles dropdowns with structure:
   * <div class="gambling-centers-filter">
   *   <div>Current Value</div>
   *   <ul class="custom-select">
   *     <li>Option 1</li>
   *     <li>Option 2</li>
   *   </ul>
   * </div>
   */
  async selectFromCustomDropdown(
    filterClass: string,
    optionValue: string
  ): Promise<void> {
    // Find the filter container
    const filterContainer = this.page.locator(`.${filterClass}`).first();

    // Click to open dropdown
    await filterContainer.click();
    await this.page.waitForTimeout(300);

    // Find and click the li item with matching text
    const option = this.page
      .locator(`.${filterClass} ul li`)
      .filter({ hasText: optionValue })
      .first();

    // Scroll into view and click
    await option.scrollIntoViewIfNeeded();
    await option.click();
    await this.page.waitForTimeout(300);
  }
}
