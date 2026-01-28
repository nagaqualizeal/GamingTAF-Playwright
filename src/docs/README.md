# Gaming TAF - Playwright Hybrid Automation Framework

A robust, scalable Playwright-based test automation framework for testing the iGaming website with hybrid approach combining Page Object Model and data-driven testing.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Data Management](#test-data-management)
- [Page Objects](#page-objects)
- [Base Page Functions](#base-page-functions)
- [Reports](#reports)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v16.0.0 or higher
  - Download from: https://nodejs.org/
  - Verify installation: `node --version` and `npm --version`

- **Git**: For version control
  - Download from: https://git-scm.com/

- **Visual Studio Code** (Recommended): Code editor
  - Download from: https://code.visualstudio.com/
  - Recommended Extensions: Playwright Test for VSCode

## Project Structure

```
GamingTAF-Playwright/
├── src/
│   ├── pages/
│   │   ├── BasePage.ts              # Base class with reusable functions
│   │   ├── HomePage.ts              # HomePage page object
│   │   └── SignInPage.ts            # SignInPage page object
│   ├── tests/
│   │   ├── smoke/
│   │   │   └── homepage_IGAME-001.spec.ts
│   │   └── regression/
│   │       └── signInPage_IGAME-002.spec.ts
│   ├── test-data/
│   │   ├── IGAME-001.json           # Test data for IGAME-001
│   │   └── IGAME-002.json           # Test data for IGAME-002
│   └── utils/
│       └── testDataHelper.ts         # Utility functions for test data management
├── playwright.config.ts              # Playwright configuration
├── package.json                      # Project dependencies and scripts
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # This file
```

## Installation & Setup

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd GamingTAF-Playwright
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- `@playwright/test` - Playwright testing framework
- `typescript` - TypeScript compiler
- `@types/node` - Node.js type definitions

### Step 3: Install Playwright Browsers

```bash
npm run install:browsers
```

Or if you need system dependencies:

```bash
npm run install:deps
```

### Step 4: Verify Installation

```bash
npx playwright --version
```

## Configuration

### Playwright Configuration (`playwright.config.ts`)

The framework includes a comprehensive Playwright configuration with:

- **Default Browser**: Chrome (Chromium) - headed mode
- **Other Browsers Available**: Firefox, WebKit, Mobile Chrome, Mobile Safari (commented out)
- **Headed Mode**: Browser window visible by default
- **Video Recording**: Enabled for failed tests
- **Screenshots**: Captured on test failures
- **HTML Reporter**: Automatic report generation and opening
- **Retries**: Configurable retry strategy
- **Parallel Execution**: 4 workers by default
- **Tracing**: First-retry tracing enabled

Key configuration options:
```typescript
{
  fullyParallel: false,          // Serial execution by default
  workers: 4,                     // 4 parallel workers on local
  retries: 0,                     // No retries locally (2 on CI)
  reporter: 'html',              // HTML report generation
  use: {
    headless: false,             // Browser visible (headed mode)
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium' }         // Chrome by default
    // Other browsers commented out
  ]
}
```

**To enable other browsers:** Uncomment the desired browser configurations in `playwright.config.ts`

## Running Tests

> **Note:** Tests run in **headed mode** (browser visible) on **Chrome** by default. The browser window will open automatically during test execution.

### Run All Tests

```bash
npm test
```

### Run Smoke Tests

```bash
npm run test:smoke
```

### Run Regression Tests

```bash
npm run test:regression
```

### Run a Single Test File

```bash
npx playwright test src/tests/smoke/homepage_IGAME-001.spec.ts
```

### Run Tests with Specific Options

#### Run on Different Browsers

By default, tests run on **Chrome (Chromium)**. To run on other browsers:

**Firefox:**
```bash
npx playwright test --project=firefox
```

**Safari (WebKit):**
```bash
npx playwright test --project=webkit
```

**Mobile Chrome:**
```bash
npx playwright test --project="Mobile Chrome"
```

**Mobile Safari:**
```bash
npx playwright test --project="Mobile Safari"
```

**Run on All Browsers:**
```bash
npx playwright test --project=chromium --project=firefox --project=webkit
```

> **Note:** To enable other browsers permanently, uncomment the browser configurations in `playwright.config.ts`

#### Headless Mode (without browser UI)

If you want to run tests in headless mode (faster, no browser window):

```bash
npx playwright test --headed=false
```

Or set environment variable:
```bash
$env:HEADLESS="true"; npm test     # PowerShell
set HEADLESS=true && npm test      # CMD
export HEADLESS=true && npm test   # Mac/Linux
```

#### Debug Mode (interactive debugging)
```bash
npm run test:debug
```

#### With Custom Workers
```bash
npm run test:parallel    # 4 workers
npm run test:serial      # 1 worker (sequential)
```

#### With Retries
```bash
npm run test:retry       # Runs with 2 retries
```

### Filtering Tests by Name

```bash
npx playwright test --grep "homepage"
npx playwright test --grep "sign in"
```

### Running Tests in a Specific Folder

```bash
npx playwright test src/tests/smoke/
npx playwright test src/tests/regression/
```

### Environment-Specific Execution

For CI/CD pipelines:
```bash
CI=true npm test         # Enables retries and single worker
```

## Test Data Management

### Test Data Structure

Test data files are JSON files stored in `src/test-data/` with naming convention matching test suffixes:

**Test File**: `homepage_IGAME-001.spec.ts`  
**Data File**: `IGAME-001.json`

### Test Data Format

```json
{
  "description": "Test scenario description",
  "url": "https://www.igaming.com/",
  "expectedElements": ["Element 1", "Element 2"],
  "testTimeout": 30000,
  "expectedPageTitle": "iGaming",
  "customData": "Any custom data needed"
}
```

### Using Test Data in Tests

The framework automatically reads test data based on the test file name:

```typescript
import { readTestData, extractJiraId } from '../../utils/testDataHelper';

test.beforeEach(async ({ page }) => {
  const testFileName = test.info().file.split('\\').pop() || '';
  const jiraId = extractJiraId(testFileName) || 'IGAME-001';
  const testData = readTestData(jiraId);
  
  console.log('Test Data:', testData);
});
```

### Test Data Helper Functions

#### Extract JIRA ID
```typescript
import { extractJiraId } from '../../utils/testDataHelper';

const jiraId = extractJiraId('homepage_IGAME-001.spec.ts');
// Returns: 'IGAME-001'
```

#### Read Test Data
```typescript
import { readTestData } from '../../utils/testDataHelper';

const testData = readTestData('IGAME-001');
// Returns: { description: "...", url: "..." }
```

#### Get Specific Value
```typescript
import { getTestDataValue } from '../../utils/testDataHelper';

const url = getTestDataValue('IGAME-001', 'url');
// Returns: 'https://www.igaming.com/'
```

#### Create Test Data File Programmatically
```typescript
import { createTestDataFile } from '../../utils/testDataHelper';

createTestDataFile('IGAME-003', {
  description: 'New test',
  url: 'https://www.igaming.com/'
});
```

## Page Objects

### BasePage Class

Located in `src/pages/BasePage.ts`, provides reusable functions:

#### Navigation & Wait Functions
- `navigateTo(url: string)` - Navigate to URL
- `waitForElement(selector: string, timeout?: number)` - Wait for element visibility
- `waitForNavigation()` - Wait for page load

#### Click & Input Functions
- `click(locator)` - Click on element
- `fillText(locator, text)` - Fill text input
- `doubleClick(locator)` - Double click
- `rightClick(locator)` - Right click
- `pressKey(key: string)` - Press keyboard key

#### Text & Attribute Functions
- `getText(locator)` - Get element text
- `getAttributeValue(locator, attributeName)` - Get attribute value
- `getAllText(locator)` - Get text from multiple elements

#### Assertion Functions
- `assertElementVisible(locator, shouldBeVisible)` - Assert visibility
- `assertTextMatch(locator, expectedText)` - Assert text contains
- `assertTextExact(locator, expectedText)` - Assert exact text match

#### Element State Functions
- `isElementVisible(locator)` - Check if visible
- `isElementEnabled(locator)` - Check if enabled
- `elementExists(selector)` - Check if exists
- `getElementCount(locator)` - Get element count

#### Utility Functions
- `takeScreenshot(fileName)` - Capture screenshot
- `scrollToElement(locator)` - Scroll to element
- `hoverOver(locator)` - Hover over element
- `selectDropdownOption(locator, optionValue)` - Select dropdown
- `wait(milliseconds)` - Wait for time period
- `getCurrentUrl()` - Get current page URL
- `getPageTitle()` - Get page title

### Creating New Page Objects

Template for creating page objects:

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class MyPage extends BasePage {
  // Define locators
  readonly myButton: Locator;
  readonly myInput: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.myButton = page.locator('button:has-text("My Button")');
    this.myInput = page.locator('input[id="myInput"]');
  }

  // Define actions
  async clickMyButton(): Promise<void> {
    await this.click(this.myButton);
  }

  async enterTextInInput(text: string): Promise<void> {
    await this.fillText(this.myInput, text);
  }
}
```

## Base Page Functions

### Example Usage in Tests

```typescript
import { HomePage } from '../../pages/HomePage';

test('Example test', async ({ page }) => {
  const homePage = new HomePage(page);

  // Navigate
  await homePage.navigateToHomepage();

  // Wait and verify
  await homePage.waitForElement('.game-card');
  
  // Get count
  const count = await homePage.getElementCount('.game-card');
  expect(count).toBeGreaterThan(0);

  // Assert
  await homePage.assertElementVisible(homePage.signInButton);
  
  // Take screenshot
  await homePage.takeScreenshot('test-name');

  // Perform actions
  await homePage.click(homePage.signInButton);
});
```

## Reports

### Generate HTML Report

Reports are automatically generated after test execution.

### View Report

#### After Test Run
```bash
npm run report
```

Or manually:
```bash
npx playwright show-report
```

#### Using Script
```bash
npm run report:open
```

### Report Contents

The HTML report includes:
- Test summary (passed, failed, skipped)
- Execution time
- Screenshots on failures
- Video recordings (if available)
- Detailed test steps
- Error messages

### Report Locations

- **HTML Report**: `playwright-report/`
- **JSON Results**: `test-results/results.json`
- **Screenshots**: `screenshots/`
- **Videos**: `test-results/` (embedded in HTML report)

## Creating New Tests

### Test Template

```typescript
import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { readTestData, extractJiraId } from '../../utils/testDataHelper';

test.describe('Feature Name - IGAME-XXX', () => {
  let homePage: HomePage;
  let testData: Record<string, any>;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    
    // Automatically read test data based on test file name
    const testFileName = test.info().file.split('\\').pop() || '';
    const jiraId = extractJiraId(testFileName) || 'IGAME-XXX';
    testData = readTestData(jiraId);

    console.log(`Test Data for ${jiraId}:`, testData);
  });

  test('Test scenario 1', async ({ page }) => {
    // Test code here
  });

  test('Test scenario 2', async ({ page }) => {
    // Test code here
  });
});
```

### Test Naming Convention

Test files must follow this pattern:
```
<description>_<JIRA-ID>.spec.ts
```

Examples:
- `homepage_IGAME-001.spec.ts`
- `signInPage_IGAME-002.spec.ts`
- `gameSelection_IGAME-003.spec.ts`

## Best Practices

### 1. Page Object Model
- Keep page objects lean and focused
- One page object per page/feature
- Use descriptive locator names
- Extend BasePage for reusable functions

### 2. Test Structure
- Follow AAA pattern: Arrange, Act, Assert
- Use meaningful test descriptions
- Keep tests independent and isolated
- Avoid test data hardcoding

### 3. Locators
- Use semantic selectors (prefer `role=button` over class)
- Add descriptive comments for complex locators
- Use data-testid when possible
- Avoid brittle CSS selectors

### 4. Test Data
- Keep test data in JSON files
- One JSON file per test (matching JIRA ID)
- Use meaningful key names
- Document expected values

### 5. Assertions
- Use explicit assertions from test runner
- Verify user-visible behavior
- Include meaningful error messages
- Avoid multiple assertions in one test when possible

### 6. Debugging
- Use debug mode: `npm run test:debug`
- Check screenshots and videos on failures
- Use `console.log()` for debugging
- Review HTML report after runs

## Troubleshooting

### Issue: Tests Timeout

**Solution**: Increase timeout in playwright.config.ts
```typescript
timeout: 120 * 1000  // 2 minutes
```

### Issue: Element Not Found

**Solution**: 
1. Verify locator in browser dev tools
2. Wait for element: `await homePage.waitForElement(selector)`
3. Increase timeout: `waitForSelector(selector, { timeout: 60000 })`

### Issue: Test Data File Not Found

**Solution**:
1. Ensure JSON file exists in `src/test-data/`
2. Verify JIRA ID matches test file name
3. Check for typos in file names

### Issue: Browser Not Found

**Solution**: Install browsers
```bash
npm run install:browsers
```

### Issue: Module Not Found

**Solution**: Reinstall dependencies
```bash
npm install
npm run install:browsers
```

### Issue: Tests Pass Locally but Fail on CI

**Solution**: 
1. Check `CI=true npm test` command
2. Review CI-specific configuration in playwright.config.ts
3. Verify environment variables
4. Check network connectivity on CI system

### Issue: Screenshots/Videos Not Captured

**Solution**:
1. Verify `screenshot` and `video` settings in playwright.config.ts
2. Check file permissions in output directories
3. Ensure sufficient disk space

### Clearing Test Artifacts

```bash
# Remove previous reports
rmdir /s /q playwright-report    # Windows
rm -rf playwright-report         # Linux/Mac

# Remove previous test results
rmdir /s /q test-results
rm -rf test-results

# Remove screenshots
rmdir /s /q screenshots
rm -rf screenshots
```

## Additional Resources

- **Playwright Documentation**: https://playwright.dev/
- **Playwright Test Runner**: https://playwright.dev/docs/intro
- **Best Practices**: https://playwright.dev/docs/best-practices
- **Debugging Guide**: https://playwright.dev/docs/debug
- **Configuration Guide**: https://playwright.dev/docs/test-configuration

## Support & Contributing

For issues, questions, or contributions:

1. Check existing documentation
2. Review test examples
3. Check Playwright documentation
4. Contact the QA team

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Framework**: Playwright Test v1.40.0+  
**Node**: v16.0.0+
