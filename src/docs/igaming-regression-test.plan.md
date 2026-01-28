# iGaming.com Regression Test Plan

## Application Overview

This test plan covers two regression test scenarios for https://www.igaming.com/. The first scenario verifies the iGamingCare professional help database filtering functionality for gambling addiction support in Canada. The second scenario validates the UK online casinos Top 10 list accessibility through the Partners navigation.

## Test Scenarios

### 1. iGamingCare Gambling Support Database

**Seed:** `src/tests/seed.spec.ts`

#### 1.1. Verify Professional Help Database Filters for Canada

**File:** `src/tests/regression/igamingcare-database-filters.spec.ts`

**Steps:**
  1. Navigate to https://www.igaming.com/
  2. Click on 'iGamingCare' link in the main navigation menu
  3. Scroll down to the 'Where to Look for Professional Help with Gambling Addiction?' section
  4. Locate the filtering dropdowns for Country, Language, and Form of Help
  5. Click on the 'Country' dropdown
  6. Select 'Canada' from the dropdown options
  7. Click on the 'Language' dropdown
  8. Select 'English' from the dropdown options
  9. Click on the 'Form of Help' dropdown
  10. Select 'Personal' from the dropdown options
  11. Wait for the filtered results to load
  12. Extract the names of all displayed gambling centers

**Expected Results:**
  - The iGaming.com homepage loads successfully
  - The iGamingCare link is visible and clickable in the navigation menu
  - The iGamingCare page loads with the professional help section visible
  - Three dropdown filters are displayed: Country, Language, and Form of Help
  - The Country dropdown opens showing multiple country options including Canada
  - Canada is successfully selected in the Country dropdown
  - The Language dropdown opens showing multiple language options including English
  - English is successfully selected in the Language dropdown
  - The Form of Help dropdown opens showing multiple options including Personal
  - Personal is successfully selected in the Form of Help dropdown
  - The database results update automatically to show filtered centers
  - The following 5 gambling centers are displayed: 1) Gambling Support BC, 2) Responsible Gambling Council (RGC) - Find a Treatment Centre, 3) Canadian Centre on Substance Use and Addiction (CCSA), 4) Gambling: Help and Referral, 5) Saskatchewan Problem Gambling Helpline

### 2. Partners UK Online Casinos Navigation

**Seed:** `src/tests/seed.spec.ts`

#### 2.1. Verify Top 10 UK Online Casinos List Navigation

**File:** `src/tests/regression/partners-uk-casinos-top10.spec.ts`

**Steps:**
  1. Navigate to https://www.igaming.com/
  2. Click on 'Partners' in the main navigation menu
  3. Wait for the Partners dropdown menu to appear
  4. Click on 'Online Casinos in the UK' link from the dropdown
  5. Wait for the UK casinos page to load completely
  6. Locate the 'Our List of the Top 10 Online Casinos in the UK' section
  7. Extract the names of all 10 casinos from the top 10 list

**Expected Results:**
  - The iGaming.com homepage loads successfully
  - The Partners navigation item is visible and clickable
  - A dropdown menu appears showing 4 partner website options
  - 'Online Casinos in the UK' link is visible in the dropdown
  - The UK online casinos page (https://www.igaming.com/best-casino-sites/) loads successfully
  - The page title reads 'Our Best Online Casino Sites 2026 - iGaming.com UK'
  - A heading 'Our List of the Top 10 Online Casinos in the UK' is visible on the page
  - The following 10 casinos are displayed in order: 1) Ladbrokes - Best Online Casino in the UK, 2) Duelz - Extensive Library & Top New Games, 3) Coral - Best New Online Casino, 4) Betfred - Best Casino Site for Table Games, 5) bet365 - Excellent Bonuses and Promotions, 6) Grosvenor - Top Choice for Bingo Players, 7) Casumo - Packed with Games from the Best Software Studios, 8) The Grand Ivy - Ideal Casino for High Rollers, 9) Casimba - Top Pick for Jackpot Slots, 10) Fitzdares Casino - Recommended for Mobile Players
