# iGaming.com Smoke Test Plan

## Application Overview

This test plan covers smoke testing for https://www.igaming.com/, focusing on header and footer navigation links, as well as office location links. The application is a lead generation company website in the digital media sector with multiple navigation elements, including header links, footer links, and a dedicated "Our Offices" section with links to different office locations (Varna, Berlin, Netanya, Amsterdam, and Milan).

## Test Scenarios

### 1. Header and Footer Navigation Links

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Header Links Navigation

**File:** `tests/smoke/header-footer-links.spec.ts`

**Steps:**
  1. Navigate to https://www.igaming.com/ homepage
  2. Verify page title is 'iGaming.com - Connecting the World of iGaming'
  3. Click on 'About Us' link in the header navigation
  4. Verify URL changes to /about-us/ or verify the page header contains 'About Us' content
  5. Click the browser back button to return to homepage
  6. Verify page returns to https://www.igaming.com/
  7. Click on 'Career' link in the header navigation
  8. Verify URL changes to /career/ or verify the page header contains 'Career' content
  9. Click the browser back button to return to homepage
  10. Verify page returns to https://www.igaming.com/
  11. Click on 'Contact' link in the header navigation
  12. Verify URL changes to /contact/ or verify the page header contains 'Contact' content
  13. Click the browser back button to return to homepage
  14. Verify page returns to https://www.igaming.com/
  15. Click on 'iGamingCare' link in the header navigation
  16. Verify URL changes to /igamingcare/ or verify the page displays iGamingCare content
  17. Click the browser back button to return to homepage
  18. Verify page returns to https://www.igaming.com/

**Expected Results:**
  - All header navigation links successfully navigate to their respective pages
  - Each page displays correct content matching the link destination
  - Browser back button successfully returns to the homepage after each link navigation
  - No console errors or broken links are detected during navigation
  - Page titles and URLs correctly reflect the navigation destinations

#### 1.2. Verify Footer Links Navigation

**File:** `tests/smoke/footer-links.spec.ts`

**Steps:**
  1. Navigate to https://www.igaming.com/ homepage
  2. Scroll to the footer section
  3. Click on 'About Us' link in the footer navigation
  4. Verify URL changes to /about-us/ or verify the page header contains 'About Us' content
  5. Click the browser back button to return to homepage
  6. Verify page returns to https://www.igaming.com/
  7. Click on 'Locations' link in the footer navigation
  8. Verify URL changes to /locations/ or verify the page header contains location information
  9. Click the browser back button to return to homepage
  10. Verify page returns to https://www.igaming.com/
  11. Click on 'Career' link in the footer navigation
  12. Verify URL changes to /career/ or verify the page header contains 'Career' content
  13. Click the browser back button to return to homepage
  14. Verify page returns to https://www.igaming.com/
  15. Click on 'Contact' link in the footer navigation
  16. Verify URL changes to /contact/ or verify the page header contains 'Contact' content
  17. Click the browser back button to return to homepage
  18. Verify page returns to https://www.igaming.com/
  19. Click on 'Privacy Policy' link in the footer navigation
  20. Verify URL changes to /privacy-policy/ or verify the page displays privacy policy content
  21. Click the browser back button to return to homepage
  22. Verify page returns to https://www.igaming.com/
  23. Click on 'Terms' link in the footer navigation
  24. Verify URL changes to /terms-conditions/ or verify the page displays terms and conditions content
  25. Click the browser back button to return to homepage
  26. Verify page returns to https://www.igaming.com/
  27. Click on 'Data Protection' link in the footer navigation
  28. Verify URL changes to /data-protection/ or verify the page displays data protection content
  29. Click the browser back button to return to homepage
  30. Verify page returns to https://www.igaming.com/

**Expected Results:**
  - All footer navigation links successfully navigate to their respective pages
  - Each page displays correct content matching the link destination
  - Browser back button successfully returns to the homepage after each link navigation
  - URLs correctly update to reflect the navigated pages
  - No broken links are encountered during footer navigation testing
  - Social media links (Facebook, Twitter, Instagram, LinkedIn) are present and clickable in footer

### 2. Our Offices Section Links

**Seed:** `tests/seed.spec.ts`

#### 2.1. Verify Our Offices Links Navigation

**File:** `tests/smoke/our-offices-links.spec.ts`

**Steps:**
  1. Navigate to https://www.igaming.com/ homepage
  2. Scroll down to the footer 'Our Offices' section
  3. Click on 'Varna' link in the Our Offices section
  4. Verify URL changes to /locations/#varna or page scrolls to Varna office section
  5. Verify the page displays 'Varna, Bulgaria' heading and office location details
  6. Click the browser back button to return to homepage
  7. Verify page returns to https://www.igaming.com/
  8. Click on 'Berlin' link in the Our Offices section
  9. Verify URL changes to /locations/#berlin or page scrolls to Berlin office section
  10. Verify the page displays 'Berlin, Germany' heading and office location details
  11. Click the browser back button to return to homepage
  12. Verify page returns to https://www.igaming.com/
  13. Click on 'Netanya' link in the Our Offices section
  14. Verify URL changes to /locations/#netanya or page scrolls to Netanya office section
  15. Verify the page displays 'Netanya, Israel' heading and office location details
  16. Click the browser back button to return to homepage
  17. Verify page returns to https://www.igaming.com/
  18. Click on 'Amsterdam' link in the Our Offices section
  19. Verify URL changes to /locations/#amsterdam or page scrolls to Amsterdam office section
  20. Verify the page displays 'Amsterdam' heading and office location details
  21. Click the browser back button to return to homepage
  22. Verify page returns to https://www.igaming.com/
  23. Click on 'Milan' link in the Our Offices section
  24. Verify URL changes to /locations/#milano or page scrolls to Milan office section
  25. Verify the page displays 'Milan, Italy' heading and office location details
  26. Click the browser back button to return to homepage
  27. Verify page returns to https://www.igaming.com/

**Expected Results:**
  - All 'Our Offices' links (Varna, Berlin, Netanya, Amsterdam, Milan) successfully navigate to the Locations page with correct anchors
  - Each office location section displays accurate office information including address and description
  - URL updates correctly reflect the office location anchors (#varna, #berlin, #netanya, #amsterdam, #milano)
  - Browser back button successfully returns to the homepage after each office link navigation
  - Page correctly scrolls to or displays the relevant office section when anchor links are clicked
  - All office details are properly loaded and visible on the Locations page
