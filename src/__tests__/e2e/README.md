# E2E Tests with Selenium WebDriver

This directory contains end-to-end (E2E) tests for the application using Selenium WebDriver.

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Ensure Chrome browser is installed on your system.

3. The `chromedriver` package will automatically manage the ChromeDriver binary.

## Running Tests

### Run FullProfile Page Tests

```bash
pnpm test:selenium
```

### Environment Variables

- `BASE_URL`: Base URL for the application (default: `http://localhost:5173`)
- `HEADLESS`: Set to `true` to run tests in headless mode (default: `false`)

Example:
```bash
BASE_URL=http://localhost:5173 HEADLESS=true pnpm test:selenium
```

## Test Structure

### FullProfile.test.ts

Comprehensive E2E tests for the FullProfile page (`/profile`):

1. **Page Load Tests**
   - Verifies page loads successfully
   - Checks page title and main heading

2. **Contact Information Links**
   - Tests "Contact on LinkedIn" link
   - Tests email mailto link

3. **Links & Profiles Section**
   - Tests LinkedIn profile link
   - Tests GitHub link

4. **Content Verification**
   - Verifies key content is displayed
   - Checks experience and education sections

5. **SEO Word Density**
   - Calculates word density of "Michael Simoneau"
   - Ensures density is approximately 5% (4.5% - 5.5% range)

6. **SEO Meta Tags**
   - Verifies page title meta tag
   - Checks description meta tag
   - Validates Open Graph tags
   - Verifies structured data (JSON-LD)
   - Checks canonical URL

## Configuration

### selenium.config.ts

Contains Selenium WebDriver configuration:
- Chrome driver setup
- Headless mode support
- Helper functions for element waiting

## Requirements

- Node.js 18+
- Chrome browser installed
- Development server running (if testing against localhost)

## Notes

- Tests require the application to be running (either dev server or production build)
- Tests are designed to be idempotent and not depend on external services
- Word density calculation accounts for phrase occurrences vs individual word counts

