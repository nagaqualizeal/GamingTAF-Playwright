# 🎭 Playwright Hybrid Automation Framework
## Complete Project Documentation Index

Welcome to the Gaming TAF Playwright framework! This document serves as the main index to navigate all documentation and resources.

---

## 📚 Documentation Files

### 🚀 Getting Started
**Start here if you're new to the project:**
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** ⭐ **START HERE**
  - Quick 5-minute setup
  - Common commands reference
  - Essential troubleshooting
  - Perfect for first-time users

### 📖 Main Documentation
- **[README.md](README.md)** - Comprehensive Framework Documentation
  - Complete project overview
  - Detailed installation steps
  - All available commands
  - Page object usage guide
  - Test data management
  - Best practices
  - Full troubleshooting guide

### 🎯 Project Overview
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Executive Summary
  - Framework architecture
  - Feature overview
  - Project structure
  - Available methods reference
  - Quick reference tables
  - Learning path

### 🧪 Test Execution
- **[TEST_EXECUTION_GUIDE.md](TEST_EXECUTION_GUIDE.md)** - How to Run Tests
  - Step-by-step execution instructions
  - Running different test suites
  - Filtering tests
  - Viewing reports
  - Performance metrics
  - CI/CD integration
  - Troubleshooting execution issues

---

## 🗂️ Project Structure

```
GamingTAF-Playwright/
│
├── 📄 Documentation Files
│   ├── README.md                    ← Full documentation
│   ├── SETUP_GUIDE.md               ← Quick start
│   ├── PROJECT_SUMMARY.md           ← Project overview
│   ├── TEST_EXECUTION_GUIDE.md      ← How to run tests
│   └── INDEX.md                     ← This file
│
├── 📋 Configuration Files
│   ├── playwright.config.ts         ← Playwright settings
│   ├── tsconfig.json                ← TypeScript settings
│   ├── package.json                 ← Dependencies & scripts
│   ├── .npmrc                       ← NPM configuration
│   ├── .gitignore                   ← Git rules
│   └── .env.example                 ← Environment template
│
├── 💻 Source Code
│   └── src/
│       ├── pages/                   ← Page Objects
│       │   ├── BasePage.ts          ← 25+ reusable methods
│       │   ├── HomePage.ts          ← Homepage page object
│       │   └── SignInPage.ts        ← Sign-in page object
│       │
│       ├── tests/                   ← Test Scripts
│       │   ├── smoke/
│       │   │   └── homepage_IGAME-001.spec.ts
│       │   └── regression/
│       │       └── signInPage_IGAME-002.spec.ts
│       │
│       ├── test-data/               ← Test Data (JSON)
│       │   ├── IGAME-001.json
│       │   └── IGAME-002.json
│       │
│       └── utils/                   ← Utilities
│           ├── testDataHelper.ts    ← Data management
│           └── locatorPatterns.ts   ← Locator reference
│
├── 🔧 IDE Configuration
│   └── .vscode/
│       ├── settings.json            ← VS Code settings
│       └── extensions.json          ← Recommended extensions
│
└── 🚀 CI/CD
    └── .github/
        └── workflows/
            └── playwright.yml       ← GitHub Actions
```

---

## 🎯 Quick Navigation

### "I want to..."

#### ✅ Get Started
→ [SETUP_GUIDE.md](SETUP_GUIDE.md) (5 minutes)

#### ✅ Run Tests
→ [TEST_EXECUTION_GUIDE.md](TEST_EXECUTION_GUIDE.md)
- Run all tests: `npm test`
- Run smoke tests: `npm run test:smoke`
- Run regression tests: `npm run test:regression`

#### ✅ Understand the Framework
→ [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
- Architecture overview
- Key features
- Available methods

#### ✅ Learn Detailed Usage
→ [README.md](README.md)
- Complete documentation
- Best practices
- Examples

#### ✅ View Test Reports
```bash
npm run report
```

#### ✅ Write New Tests
→ [README.md#adding-new-tests](README.md)
1. Create page object
2. Create test data JSON
3. Create test file
4. Run and verify

#### ✅ Debug a Failed Test
→ [TEST_EXECUTION_GUIDE.md#troubleshooting-test-execution](TEST_EXECUTION_GUIDE.md)
```bash
npm run test:debug
npm run test:headed
```

#### ✅ Access BasePage Methods
→ [README.md#base-page-functions](README.md#base-page-functions)
- 25+ available methods
- Interaction functions
- Assertion functions
- State check functions

#### ✅ Manage Test Data
→ [README.md#test-data-management](README.md#test-data-management)
- Test data format
- Helper functions
- Automatic loading

#### ✅ Set Up CI/CD
→ [README.md#cici-d-integration](README.md#cici-d-integration)
- GitHub Actions configured
- Environment variables
- Running on CI

---

## 📋 Available Test Scenarios

### Scenario 1: Homepage (IGAME-001) ✅
**Location:** `src/tests/smoke/homepage_IGAME-001.spec.ts`  
**Data:** `src/test-data/IGAME-001.json`  
**Tests:**
1. Verify homepage loads with main elements
2. Verify games displayed on homepage
3. Verify navigation menus functional

**Run:**
```bash
npx playwright test src/tests/smoke/homepage_IGAME-001.spec.ts
```

### Scenario 2: Sign-In Page (IGAME-002) ✅
**Location:** `src/tests/regression/signInPage_IGAME-002.spec.ts`  
**Data:** `src/test-data/IGAME-002.json`  
**Tests:**
1. Verify sign-in page loads with required elements
2. Verify form elements are functional
3. Verify links and navigation

**Run:**
```bash
npx playwright test src/tests/regression/signInPage_IGAME-002.spec.ts
```

---

## 🔧 Essential Commands

| Command | Purpose | Duration |
|---------|---------|----------|
| `npm install` | Install dependencies | 1-2 min |
| `npm run install:browsers` | Install Playwright browsers | 3-5 min |
| `npm test` | Run all tests | 10-15 min |
| `npm run test:smoke` | Run smoke tests | 1-2 min |
| `npm run test:regression` | Run regression tests | 1-2 min |
| `npm run test:headed` | Run with visible browser | 5-10 min |
| `npm run test:debug` | Debug mode | Interactive |
| `npm run report` | View HTML report | Instant |
| `npm run test:retry` | Run with retries | 10-20 min |

**Full command reference:** [README.md#running-tests](README.md#running-tests)

---

## 📊 Framework Features

✅ **Page Object Model** - Organized locators and actions  
✅ **Data-Driven Testing** - Automatic test data loading  
✅ **25+ Reusable Methods** - BasePage utility functions  
✅ **Multi-Browser Support** - Chromium, Firefox, WebKit, Mobile  
✅ **Screenshot Capture** - Automatic on failures  
✅ **Video Recording** - Failed test recording  
✅ **HTML Reports** - Interactive test results  
✅ **Parallel Execution** - 4 workers default  
✅ **Retry Logic** - Automatic retries on CI  
✅ **TypeScript Support** - Full type safety  
✅ **CI/CD Ready** - GitHub Actions configured  
✅ **Comprehensive Docs** - All features documented  

---

## 🎓 Learning Resources

### For Different Experience Levels

**Beginners:**
1. Read [SETUP_GUIDE.md](SETUP_GUIDE.md) (5 min)
2. Run `npm test` to see tests execute
3. View results: `npm run report`
4. Study existing tests in `src/tests/`
5. Review [README.md](README.md)

**Intermediate Users:**
1. Create a new page object (see template in README)
2. Add new test data JSON file
3. Write your own test
4. Run and verify
5. Review [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for architecture

**Advanced Users:**
1. Extend BasePage with custom functions
2. Create utility helpers
3. Implement custom reporters
4. Set up advanced CI/CD
5. Contribute improvements

---

## 🐛 Troubleshooting Quick Links

| Issue | Solution |
|-------|----------|
| Tests won't run | [Setup Issues](SETUP_GUIDE.md#troubleshooting) |
| Element not found | [Debugging Guide](README.md#troubleshooting) |
| Tests timing out | [Timeout Guide](TEST_EXECUTION_GUIDE.md#issue-tests-hangtimeout) |
| Report won't open | [Report Issues](README.md#troubleshooting) |
| CI/CD failing | [CI/CD Guide](README.md#cici-d-integration) |

---

## 📞 Support Workflow

1. **Check Documentation** → Start with relevant guide above
2. **Search Examples** → Look at existing tests in `src/tests/`
3. **Debug** → Use `npm run test:debug` or `npm run test:headed`
4. **Review Logs** → Check console output and screenshots
5. **Check Playwright Docs** → https://playwright.dev/

---

## 🎯 Next Steps

### Recommended Path for New Users:
```
1. Read SETUP_GUIDE.md (5 min)
    ↓
2. Run: npm install && npm run install:browsers (5 min)
    ↓
3. Run: npm test (2 min)
    ↓
4. Run: npm run report (1 min)
    ↓
5. Read README.md (10 min)
    ↓
6. Study HomePage.ts and SignInPage.ts (10 min)
    ↓
7. Create your first test (15-20 min)
    ↓
Total: ~45-60 minutes to be productive
```

---

## 📈 Version Information

- **Framework Version**: 1.0.0
- **Playwright Version**: 1.40.0+
- **Node.js**: 16.0.0+
- **TypeScript**: 5.3.3+
- **Status**: ✅ Production Ready

---

## 🔗 Additional Resources

- **Playwright Official Docs**: https://playwright.dev/
- **Playwright Best Practices**: https://playwright.dev/docs/best-practices
- **Playwright API Reference**: https://playwright.dev/docs/api/class-playwright
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Testing Best Practices**: https://playwright.dev/docs/best-practices

---

## 📝 Documentation Maintenance

This framework is actively maintained. To report issues or suggest improvements:

1. Check existing documentation
2. Review current test examples
3. Try different approaches
4. Document findings
5. Share improvements with team

---

## ✨ Quick Reference Cards

### Running Tests
```bash
npm test                  # All tests
npm run test:smoke        # Smoke tests
npm run test:regression   # Regression tests
npm run test:headed       # With visible browser
npm run test:debug        # Debug mode
npm run report            # View report
```

### Common Page Object Methods
```typescript
await page.navigateTo(url);
await page.click(locator);
await page.fillText(locator, text);
await page.getText(locator);
await page.assertElementVisible(locator);
await page.takeScreenshot(name);
```

### Test Data Usage
```typescript
const testData = readTestData(jiraId);
const value = getTestDataValue(jiraId, 'key');
```

---

## 📞 Support & Questions

For additional help:
1. **Quick Questions** → Check SETUP_GUIDE.md
2. **Detailed Help** → Check README.md
3. **Running Tests** → Check TEST_EXECUTION_GUIDE.md
4. **Architecture** → Check PROJECT_SUMMARY.md
5. **Examples** → Look at `src/tests/` folder

---

**Last Updated:** January 2026  
**Status:** ✅ Production Ready  
**Questions?** Check the relevant documentation file above!
