const { test, expect } = require('@playwright/test');

test('Verify elements on the book list', async ({ page }) => {
  // Navigate to the demoqa books page
  await page.goto('https://demoqa.com/books');

  // Wait for the search box to appear
  await page.waitForSelector('#searchBox');

  // Wait for the search button to appear
  await page.waitForSelector('#basic-addon2');

  // Wait for the header row to appear
  await page.waitForSelector('.rt-th');

  // Wait for the first book row to appear
  await page.waitForSelector('.rt-tr-group');
});
