# Test Execution Guide

## Pre-Execution Checklist

- ✅ Node.js installed (v16+)
- ✅ npm dependencies installed (`npm install`)
- ✅ Playwright browsers installed (`npm run install:browsers`)
- ✅ Network connectivity verified
- ✅ Target website accessible (https://www.igaming.com/)

## Running Tests - Step by Step

### 1. First Time Setup

```bash
# Navigate to project directory
cd d:\PlayWirghtProjects\GamingTAF-Playwright

# Install dependencies
npm install

# Install Playwright browsers
npm run install:browsers

# Verify installation
npx playwright --version
```

### 2. Running All Tests

```bash
npm test
```

This will:
- Execute all test files in `src/tests/`
- Run across all configured browsers (Chromium, Firefox, WebKit, Mobile)
- Capture screenshots on failures
- Record videos on failures
- Generate HTML report

**Expected Output:**
```
Running 6 tests from 2 files...
✓ 1 test passes
✓ 2 test passes
✓ 3 test passes
✓ 4 test passes
✓ 5 test passes
✓ 6 test passes

Passed: 6
```

### 3. Running Smoke Tests Only

```bash
npm run test:smoke
```

Executes tests in `src/tests/smoke/` folder:
- `homepage_IGAME-001.spec.ts` (3 test cases)

**Expected Duration:** ~30-45 seconds

### 4. Running Regression Tests Only

```bash
npm run test:regression
```

Executes tests in `src/tests/regression/` folder:
- `signInPage_IGAME-002.spec.ts` (3 test cases)

**Expected Duration:** ~30-45 seconds

### 5. Running a Single Test File

```bash
# Smoke test
npx playwright test src/tests/smoke/homepage_IGAME-001.spec.ts

# Regression test
npx playwright test src/tests/regression/signInPage_IGAME-002.spec.ts
```

### 6. Running with Specific Options

#### Headed Mode (See browser UI)
```bash
npm run test:headed
```
Browser window will open and you'll see test execution in real-time.

#### Debug Mode (Interactive)
```bash
npm run test:debug
```
Provides interactive debugging with browser open and step controls.

#### Chromium Only
```bash
npm run test:chromium
```

#### Firefox Only
```bash
npm run test:firefox
```

#### Safari (WebKit) Only
```bash
npm run test:webkit
```

#### Mobile Browsers
```bash
npm run test:mobile
```
Runs on Mobile Chrome and Mobile Safari.

#### Parallel Execution (4 workers)
```bash
npm run test:parallel
```

#### Sequential Execution (1 worker)
```bash
npm run test:serial
```

#### With Retries
```bash
npm run test:retry
```
Failed tests will be retried up to 2 times.

### 7. Filtering Tests

#### By Test Name (using grep)
```bash
npx playwright test --grep "homepage"
npx playwright test --grep "sign in"
npx playwright test --grep "elements"
```

#### By Tag
```bash
npx playwright test --grep "@smoke"
npx playwright test --grep "@regression"
```

#### Combine Multiple Filters
```bash
npx playwright test --grep "homepage|sign" src/tests/smoke/
```

## Viewing Test Results

### Open HTML Report
```bash
npm run report
```

Or manually navigate to:
```
file://d:/PlayWirghtProjects/GamingTAF-Playwright/playwright-report/index.html
```

### Report Contents
- Test summary (passed/failed/skipped)
- Execution timeline
- Screenshots on failure
- Video recordings
- Detailed test steps
- Error messages and traces

### Check JSON Results
```bash
cat test-results/results.json
```

## Expected Test Execution Flow

### Scenario 1: Homepage Tests (IGAME-001)
1. Navigate to https://www.igaming.com/
2. Accept cookies if present
3. Verify homepage loads with main elements
4. Verify sign-in button is visible and enabled
5. Verify games menu is visible
6. Verify promotions menu is visible
7. Count and verify games displayed (minimum 5 expected)
8. Verify logo is visible and clickable
9. Screenshot captured on success

**Expected Result:** ✅ All 3 tests pass

### Scenario 2: Sign-In Page Tests (IGAME-002)
1. Navigate to https://www.igaming.com/
2. Accept cookies if present
3. Click sign-in button
4. Verify sign-in page loads
5. Verify email input field is visible
6. Verify password input field is visible
7. Verify sign-in submit button is visible
8. Enter test email: testuser@example.com
9. Verify email was entered correctly
10. Enter test password
11. Verify password field has content
12. Verify forgot password link is visible
13. Verify sign-up link is visible
14. Screenshot captured on success

**Expected Result:** ✅ All 3 tests pass

## Troubleshooting Test Execution

### Issue: Tests Hang/Timeout

**Solution:**
```bash
# Increase timeout in playwright.config.ts from 60000 to 120000
# Or run with specific timeout:
npx playwright test --timeout=120000
```

### Issue: "Element Not Found"

**Solution:**
1. Run in headed mode to see what's happening:
   ```bash
   npm run test:headed
   ```

2. Run in debug mode:
   ```bash
   npm run test:debug
   ```

3. Check element selector is correct

### Issue: "Test Data File Not Found"

**Solution:**
1. Verify test data file exists:
   ```
   src/test-data/IGAME-001.json
   src/test-data/IGAME-002.json
   ```

2. Verify JIRA ID matches between:
   - Test file name: `homepage_IGAME-001.spec.ts`
   - Test data file: `IGAME-001.json`

### Issue: "Website Not Accessible"

**Solution:**
1. Verify internet connection
2. Check if website is accessible:
   ```bash
   curl https://www.igaming.com/
   ```

3. Check network proxy settings
4. Try with `--headed` mode to verify browser loads

### Issue: Screenshots Not Captured

**Solution:**
1. Check disk space
2. Verify folder permissions
3. Check `playwright.config.ts` settings:
   ```typescript
   use: {
     screenshot: 'only-on-failure',
   }
   ```

### Issue: Previous Test Artifacts in Way

**Solution:**
```bash
# Remove previous reports
rmdir /s /q playwright-report
rmdir /s /q test-results
rmdir /s /q screenshots

# Then run tests again
npm test
```

## Performance Metrics

### Single Test Duration
- **Homepage test**: ~10-15 seconds
- **Sign-in test**: ~10-15 seconds

### Full Suite Duration
- **Smoke tests only**: ~30-45 seconds
- **Regression tests only**: ~30-45 seconds
- **All tests (1 browser)**: ~1-2 minutes
- **All tests (all browsers)**: ~10-15 minutes
- **All tests with retries**: ~15-25 minutes

### Parallel Execution (4 workers)
- **All tests**: ~5-8 minutes

## Continuous Integration

### Running Tests in CI Environment
```bash
# Set CI flag
$env:CI = "true"
npm test
```

Or on Linux/Mac:
```bash
CI=true npm test
```

### GitHub Actions
Tests run automatically on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

View results in GitHub Actions tab.

## Post-Test Steps

### 1. Review Report
```bash
npm run report
```

### 2. Check Artifacts
- Screenshots in `screenshots/` folder
- Videos in HTML report
- Full logs in `test-results/`

### 3. Analyze Failures (if any)
1. Check test output
2. Review screenshots
3. Watch video recording
4. Check stack trace

### 4. Document Issues
If tests fail:
1. Note the error message
2. Capture the screenshot
3. Check if it's environmental or code issue
4. Create ticket/issue if needed

## Advanced Execution Scenarios

### Run Specific Test Case
```bash
npx playwright test --grep "Verify user can navigate to homepage"
```

### Run with Custom Reporter
```bash
npx playwright test --reporter=list
npx playwright test --reporter=json
npx playwright test --reporter=html
```

### Run and Update Snapshots
```bash
npx playwright test --update-snapshots
```

### Run with Trace Enabled
```bash
npx playwright test --trace=on
```

### Inspect Failed Test
```bash
npx playwright test --debug src/tests/smoke/homepage_IGAME-001.spec.ts
```

## Success Indicators

✅ All tests passed  
✅ Report generated without errors  
✅ Screenshots captured for verification  
✅ No timeout errors  
✅ Console shows no JavaScript errors  
✅ Website loads and responds correctly  
✅ Elements found and interacted with successfully  

## Next Steps After Execution

1. **Review Results**: Open HTML report
2. **Verify Screenshots**: Check captured screenshots
3. **Check Logs**: Review test execution logs
4. **Document**: Note any issues or improvements
5. **Plan**: Add more test scenarios as needed
6. **Commit**: Push results to version control

---

For detailed command references, see [README.md](README.md)  
For quick reference, see [SETUP_GUIDE.md](SETUP_GUIDE.md)
