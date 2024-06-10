const { test, expect } = require('@playwright/test');
const fs = require('fs');

// Helper function to read credentials from JSON file
function readCredentials() {
  const credentials = JSON.parse(fs.readFileSync('generated_credentials.json', 'utf8'));
  return credentials;
}

test('Login with valid credentials', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://demoqa.com/login');

  // Read credentials from the JSON file
  const credentials = readCredentials();

  // Fill in the login form
  await page.fill('#userName', credentials.username);
  await page.fill('#password', credentials.password);

  // Click on the login button
  await page.click('#login');

  // Wait for navigation to complete
  await page.waitForNavigation();

  // Verify successful login by checking for the presence of a logout button
  const logoutButton = await page.waitForSelector('#submit', { timeout: 5000 });
  expect(logoutButton).not.toBeNull();

  // Optionally, you can take a screenshot for verification
  await page.screenshot({ path: 'login_success.png' });
});