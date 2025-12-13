/**
 * Selenium WebDriver configuration for E2E tests
 * Provides Chrome driver setup with appropriate options
 */

import { Builder, type WebDriver } from 'selenium-webdriver';
import { Options, ServiceBuilder } from 'selenium-webdriver/chrome';

/**
 * Base URL for the application
 * Defaults to localhost dev server, can be overridden via BASE_URL env variable
 */
export const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';

/**
 * Creates a configured Chrome WebDriver instance
 * @param headless - Whether to run in headless mode (default: false)
 * @returns Configured WebDriver instance
 */
export async function createDriver(headless: boolean = false): Promise<WebDriver> {
  const chromeOptions = new Options();
  
  if (headless) {
    chromeOptions.addArguments('--headless=new');
  }
  
  // Additional Chrome options for stability
  chromeOptions.addArguments('--no-sandbox');
  chromeOptions.addArguments('--disable-dev-shm-usage');
  chromeOptions.addArguments('--disable-gpu');
  chromeOptions.addArguments('--window-size=1920,1080');
  
  // Use ChromeDriverService - will use system ChromeDriver if available
  // In CI, ChromeDriver is installed to match Chrome version
  const service = new ServiceBuilder();
  
  // If ChromeDriver is in PATH (like in CI), use it
  // Otherwise, selenium-webdriver will try to find it automatically
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .setChromeService(service)
    .build();
  
  // Set implicit wait timeout
  await driver.manage().setTimeouts({ implicit: 10000 });
  
  return driver;
}

/**
 * Helper function to wait for an element to be present
 * @param driver - WebDriver instance
 * @param selector - CSS selector or XPath
 * @param timeout - Timeout in milliseconds (default: 10000)
 */
export async function waitForElement(
  driver: WebDriver,
  selector: string,
  timeout: number = 10000
): Promise<void> {
  await driver.wait(
    async () => {
      try {
        const elements = await driver.findElements({ css: selector });
        return elements.length > 0;
      } catch {
        return false;
      }
    },
    timeout,
    `Element with selector "${selector}" not found within ${timeout}ms`
  );
}

