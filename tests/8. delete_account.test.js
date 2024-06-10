const { test, expect } = require('@playwright/test');
const fs = require('fs');

// Helper function to read credentials from JSON file
function readCredentials() {
  const credentials = JSON.parse(fs.readFileSync('generated_credentials.json', 'utf8'));
  return credentials;
}

test('Delete account', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://demoqa.com/login');

  // Read credentials from the JSON file
  const credentials = readCredentials();

  // Fill in the login form
  await page.fill('#userName', credentials.username);
  await page.fill('#password', credentials.password);

  // Click on the login button
  await page.click('#login');

  // Wait for navigation to complete after login
  await page.waitForNavigation();

  // Navigate to the profile page
  await page.goto('https://demoqa.com/profile');

  await page.getByRole('button', { name: 'Delete Account' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.getByRole('button', { name: 'Delete Account' }).click();
  await page.getByRole('button', { name: 'OK' }).click();

});
