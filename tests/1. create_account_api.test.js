const { test, expect, request } = require('@playwright/test');
const fs = require('fs');

// Helper function to generate a random string
function getRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Helper function to generate a random password
function generateRandomPassword() {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  const special = '!@#$%^&*()-_=+[]{}|;:,.<>?';

  const allChars = upper + lower + digits + special;
  let password = '';
  
  password += upper.charAt(Math.floor(Math.random() * upper.length));
  password += lower.charAt(Math.floor(Math.random() * lower.length));
  password += digits.charAt(Math.floor(Math.random() * digits.length));
  password += special.charAt(Math.floor(Math.random() * special.length));

  for (let i = 4; i < 8; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  return password;
}

test('API create account', async ({ request }) => {
  const apiUrl = 'https://demoqa.com/Account/v1/User'; // Replace with the actual API endpoint

  const randomUsername = `User${getRandomString(8)}`;
  const randomPassword = generateRandomPassword();

  // Define the request payload
  const requestBody = {
    userName: randomUsername,
    password: randomPassword
  };

  // Log the request details
  console.log('Request Payload:', requestBody);

  try {
    // Send a POST request to the API
    const response = await request.post(apiUrl, {
      data: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Check the response status
    console.log('Response Status:', response.status());
    expect(response.status()).toBe(201);

    // Parse the response JSON
    const responseBody = await response.json();

    // Extract the generated username and password
    const generatedCredentials = {
      username: responseBody.username,
      password: randomPassword // Use the randomly generated password
    };

    // Save the generated credentials to a JSON file
    fs.writeFileSync('generated_credentials.json', JSON.stringify(generatedCredentials, null, 2));
    console.log('Generated credentials saved to generated_credentials.json');

    // Verify the response content
    console.log('Response Body:', responseBody);
    expect(responseBody).toHaveProperty('userID');
    expect(responseBody).toHaveProperty('username', randomUsername);

    // Log the generated credentials and response
    console.log(`Created account with Username: ${randomUsername}, Password: ${randomPassword}`);
    console.log('Response:', responseBody);
    
  } catch (error) {
    console.error('Error during API request:', error);
    throw error;
  }
});