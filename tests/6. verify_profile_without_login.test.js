const { test, expect } = require('@playwright/test');

test('Navigate to profile without login on demoqa.com/books', async ({ page }) => {
  // Navigate to the demoqa books page
  await page.goto('https://demoqa.com/books');

  // Click on the profile link to navigate to the profile page
  await page.click('text=Profile');

  // Wait for the page to load
  await page.waitForLoadState('networkidle');

  // Wait for the error message element to appear
  const errorMessageElement = await page.waitForSelector('text=Currently you are not logged', { timeout: 5000 });
});