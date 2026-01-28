# 🎬 Quick Reference Card

## Getting Started in 60 Seconds

### Installation (First Time Only)
```bash
npm install
npm run install:browsers
```

### Run Tests
```bash
npm test                 # All tests
npm run test:smoke       # Smoke tests  
npm run test:regression  # Regression tests
npm run report            # View results
```

---

## 📊 What's Included

### ✅ 2 Complete Test Scenarios
1. **Homepage Testing** (IGAME-001)
   - 3 test cases
   - Location: `src/tests/smoke/`

2. **Sign-In Page Testing** (IGAME-002)
   - 3 test cases
   - Location: `src/tests/regression/`

### ✅ 3 Page Objects
- `BasePage.ts` - 25+ reusable methods
- `HomePage.ts` - Homepage actions
- `SignInPage.ts` - Sign-in page actions

### ✅ Advanced Features
- Multi-browser testing (5 browsers)
- Screenshot capture on failures
- Video recording on failures
- HTML report with interactive UI
- Parallel execution (4 workers)
- Automatic retry logic

---

## 🚀 Common Commands

```bash
# Run tests (Chrome, headed mode by default)
npm test                  # All tests
npm run test:smoke        # Smoke tests
npm run test:regression   # Regression tests

# View results
npm run report            # Open HTML report

# Different browsers
npm run test:firefox      # Firefox only
npm run test:webkit       # Safari (WebKit) only
npm run test:mobile       # Mobile browsers
npm run test:all-browsers # All browsers

# Debug modes
npm run test:headless     # No browser UI (faster)
npm run test:debug        # Interactive debugging

# Execution options
npm run test:parallel     # 4 workers (fast)
npm run test:serial       # 1 worker (sequential)
npm run test:retry        # With 2 retries
```

---

## 📁 Project Structure

```
src/
├── pages/               ← Page Objects
│   ├── BasePage.ts      ← Base class
│   ├── HomePage.ts      ← Homepage
│   └── SignInPage.ts    ← Sign-in page
│
├── tests/               ← Tests
│   ├── smoke/           ← Quick tests
│   └── regression/      ← Full tests
│
├── test-data/           ← Test Data (JSON)
│   ├── IGAME-001.json
│   └── IGAME-002.json
│
└── utils/               ← Utilities
    ├── testDataHelper.ts
    └── locatorPatterns.ts
```

---

## 💡 Key Concepts

### Page Object Model
```typescript
export class HomePage extends BasePage {
  readonly signInButton: Locator;
  
  async clickSignIn(): Promise<void> {
    await this.click(this.signInButton);
  }
}
```

### Test Data Auto-Loading
```
Test: homepage_IGAME-001.spec.ts
      ↓
JIRA ID: IGAME-001
      ↓
Data: IGAME-001.json (auto-loaded)
```

### Using in Tests
```typescript
test('My test', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHomepage();
  await homePage.takeScreenshot('my-test');
});
```

---

## 🎯 BasePage Methods Quick Reference

### Click & Fill
- `click(locator)` - Click element
- `fillText(locator, text)` - Enter text
- `doubleClick(locator)` - Double click
- `pressKey(key)` - Press keyboard

### Get Data
- `getText(locator)` - Get text
- `getAttributeValue(locator, attr)` - Get attribute
- `getCurrentUrl()` - Get page URL

### Assertions
- `assertElementVisible(locator)` - Assert visible
- `assertTextMatch(locator, text)` - Assert contains text
- `assertTextExact(locator, text)` - Assert exact text

### Wait & Capture
- `waitForElement(selector)` - Wait for element
- `takeScreenshot(name)` - Capture screenshot
- `wait(ms)` - Wait for time

---

## 🧪 Test Execution Flow

```
1. Run Tests
   ↓
2. Tests Execute
   ├─ Smoke: 30-45 sec
   ├─ Regression: 30-45 sec
   └─ All: 5-15 min (depending on workers)
   ↓
3. Capture Screenshots
   ✓ On failures
   ✓ On request
   ↓
4. Record Videos
   ✓ On failures
   ✓ Embedded in report
   ↓
5. Generate Report
   ✓ HTML format
   ✓ Interactive UI
   ↓
6. Auto-Open Report
   ✓ Browser opens
   ✓ Results visible
```

---

## ✨ Most Common Tasks

### View Report
```bash
npm run report
```

### Run Single Test File
```bash
npx playwright test src/tests/smoke/homepage_IGAME-001.spec.ts
```

### Debug a Test
```bash
npm run test:debug
# Opens browser with debugging controls
```

### Create New Test
1. Create test file: `src/tests/smoke/mytest_IGAME-XXX.spec.ts`
2. Create test data: `src/test-data/IGAME-XXX.json`
3. Write test logic
4. Run: `npm test`

### Filter Tests
```bash
# By name
npx playwright test --grep "homepage"

# By folder
npx playwright test src/tests/smoke/
```

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Tests won't run | `npm run install:browsers` |
| Element not found | Use `npm run test:headed` |
| Tests timeout | Increase timeout in config |
| Report not open | Run `npm run report` |
| Locked files error | Close browser and retry |

---

## 📚 Documentation

- **Quick Start**: [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **Full Docs**: [README.md](README.md)
- **Project Info**: [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
- **Run Tests**: [TEST_EXECUTION_GUIDE.md](TEST_EXECUTION_GUIDE.md)
- **Navigation**: [INDEX.md](INDEX.md)

---

## 🎓 Learning Path

```
1. SETUP_GUIDE (5 min)
   ↓
2. Run tests (2 min)
   ↓
3. View report (1 min)
   ↓
4. Study HomePage.ts (10 min)
   ↓
5. Study BasePage.ts (10 min)
   ↓
6. Create new test (20 min)
   ↓
7. Explore advanced features (20 min)
```

Total: ~70 minutes to proficiency

---

## ✅ Verification Checklist

After setup, verify:
- ✅ `npm test` runs successfully
- ✅ Tests pass (6 passed expected)
- ✅ Report opens in browser
- ✅ Screenshots captured on failures
- ✅ Can see test results
- ✅ Can navigate documentation

---

## 📞 When Stuck

1. **Check SETUP_GUIDE.md** - Most common issues
2. **Read README.md** - Detailed documentation
3. **Run `npm run test:debug`** - Debug mode
4. **Check examples** - Look at existing tests
5. **Check Playwright docs** - https://playwright.dev/

---

## 🎉 You're All Set!

Your framework is ready. Start with:
```bash
npm install
npm run install:browsers
npm test
npm run report
```

Then read the documentation and create your first test!

---

**Version**: 1.0.0  
**Status**: ✅ Production Ready  
**For**: https://www.igaming.com/

Happy Testing! 🚀
