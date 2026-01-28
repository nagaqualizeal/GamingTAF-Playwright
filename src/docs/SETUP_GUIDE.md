# Quick Setup Guide

## Installation (First Time Only)

```bash
# 1. Install Node dependencies
npm install

# 2. Install Playwright browsers
npm run install:browsers

# 3. Verify everything is working
npx playwright --version
```

## Running Tests

### Quick Start - Run All Tests
```bash
npm test
```
*Note: Tests run in **headed mode** (browser visible) on **Chrome** by default.*

### Run Smoke Tests
```bash
npm run test:smoke
```

### Run Regression Tests
```bash
npm run test:regression
```

### Run Single Test File
```bash
npx playwright test src/tests/smoke/homepage_IGAME-001.spec.ts
```

### Run on Different Browsers
```bash
npm run test:firefox      # Firefox browser
npm run test:webkit       # Safari (WebKit)
npm run test:mobile       # Mobile browsers
npm run test:all-browsers # All browsers
```

### Run with Options
```bash
npm run test:headless     # No browser UI (faster)
npm run test:debug        # Interactive debug mode
npm run test:parallel     # 4 workers in parallel
npm run test:serial       # 1 worker (sequential)
npm run test:retry        # With 2 retries
```

## Viewing Reports

```bash
# Open HTML report after test run
npm run report

# Or manually:
npx playwright show-report
```

## Adding New Tests

1. Create test file in `src/tests/smoke/` or `src/tests/regression/`
   - Naming format: `featureName_JIRA-ID.spec.ts`
   - Example: `gameSelection_IGAME-003.spec.ts`

2. Create corresponding test data file in `src/test-data/`
   - Naming format: `JIRA-ID.json`
   - Example: `IGAME-003.json`

3. Import page objects and use them in tests

## Project Structure Overview

```
GamingTAF-Playwright/
├── src/
│   ├── pages/           ← Page objects (HomePage, SignInPage, etc.)
│   ├── tests/           ← Test files organized by type
│   │   ├── smoke/       ← Quick smoke tests
│   │   └── regression/  ← Comprehensive regression tests
│   ├── test-data/       ← JSON test data files
│   └── utils/           ← Helper functions for test data
├── playwright.config.ts ← Playwright configuration
├── package.json         ← Dependencies and scripts
└── README.md           ← Full documentation
```

## Common Commands Reference

| Command | Purpose |
|---------|---------|
| `npm test` | Run all tests |
| `npm run test:smoke` | Run smoke tests |
| `npm run test:regression` | Run regression tests |
| `npm run test:headed` | Run with visible browser |
| `npm run test:debug` | Interactive debugging |
| `npm run report` | View HTML report |
| `npm run install:browsers` | Install/update browsers |
| `npx playwright codegen` | Record test automatically |

## Test Data Automatic Loading

Tests automatically load test data based on file name:

```
Test File: src/tests/smoke/homepage_IGAME-001.spec.ts
↓
JIRA ID: IGAME-001
↓
Test Data: src/test-data/IGAME-001.json
```

No hardcoding needed! Data is automatically loaded in `test.beforeEach()`.

## Page Objects Available

### HomePage
- `navigateToHomepage()` - Go to homepage
- `acceptCookiesIfPresent()` - Accept cookies
- `clickSignIn()` - Click sign in button
- `clickGamesMenu()` - Open games menu
- `getGameCardsCount()` - Count games displayed
- And more...

### SignInPage
- `verifySignInPageLoaded()` - Verify page is loaded
- `login(email, password)` - Login action
- `loginWithRememberMe(email, password)` - Login with checkbox
- `clickForgotPassword()` - Click forgot password
- `isErrorMessageVisible()` - Check error message
- And more...

### BasePage (Available in All Pages)
- `navigateTo(url)` - Navigate to URL
- `takeScreenshot(name)` - Capture screenshot
- `click(locator)` - Click element
- `fillText(locator, text)` - Enter text
- `getText(locator)` - Get element text
- `assertElementVisible(locator)` - Assert visibility
- And 20+ more utility functions

## Troubleshooting

### Tests not running?
```bash
npm install
npm run install:browsers
```

### Can't find element?
- Use `npm run test:headed` to see the UI
- Use `npm run test:debug` for interactive debugging
- Check selectors match actual page elements

### Report not opening?
```bash
npm run report
# Or manually open: playwright-report/index.html
```

## Next Steps

1. ✅ Installation complete
2. ✅ Framework ready to use
3. → Add more page objects in `src/pages/`
4. → Create new tests in `src/tests/`
5. → Create corresponding test data JSON files

---

For full documentation, see [README.md](README.md)
