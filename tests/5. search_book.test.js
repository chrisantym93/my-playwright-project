const { test, expect } = require('@playwright/test');

test('Search for a book', async ({ page }) => {
  // Navigate to the demoqa books page
  await page.goto('https://demoqa.com/books');

  // Type the title of the book you want to search for
  const searchTitle = 'Git';

  // Type the search title into the search box
  await page.fill('#searchBox', searchTitle);

  // Click the search button
  await page.click('#basic-addon2');

  // Wait for the search results to appear
  await page.waitForSelector('.rt-tbody');

  // Get the title of the clicked book
  const clickedBookTitleElement = await page.$('text=Git Pocket Guide');
  const clickedBookTitle = await clickedBookTitleElement.innerText();

  // Assert that the title of the clicked book matches the expected title
  expect(clickedBookTitle).toBe('Git Pocket Guide');
});