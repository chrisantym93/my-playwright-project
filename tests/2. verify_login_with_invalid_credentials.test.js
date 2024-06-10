const { test, expect } = require('@playwright/test');

test('Login with incorrect credentials', async ({ page }) => {
  // Navigate to the demoqa login page
  await page.goto('https://demoqa.com/login');

  // Fill in the login form with incorrect username and password
  await page.fill('#userName', 'incorrect_username');
  await page.fill('#password', 'incorrect_password');
  
  // Click the login button
  await page.click('#login');

  // Wait for the error message element to appear
  const errorMessageElement = await page.waitForSelector('text=Invalid username or password!', { timeout: 5000 });

  // Check if the error message element exists
  if (errorMessageElement) {
    // Click on the error message
    await errorMessageElement.click();
  } else {
    // If the error message element does not appear, the test should fail
    throw new Error('Error message element not found');
  }

  // Verify that the URL remains on the login page
  expect(page.url()).toBe('https://demoqa.com/login');
});