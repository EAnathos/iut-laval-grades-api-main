import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => 
  await page.goto('http://127.0.0.1:3000')
);

test('should display the login form', async ({ page }) => {
  // Check if the login form is visible
  expect(await page.isVisible('form')).toBeTruthy();
});

test('login form should have email and password fields', async ({ page }) => {
  // Check if the email and password fields are visible
  expect(await page.isVisible('input[name="email"]')).toBeTruthy();
  expect(await page.isVisible('input[name="password"]')).toBeTruthy();
});

test('should display the login button', async ({ page }) => {
  // Check if the login button is visible
  expect(await page.isVisible('button[type="submit"]')).toBeTruthy();
});

// test('login with valid credentials', async ({ page }) => {
//   // Fill the email and password fields
//   await page.fill('input[name="email"]', 'prof@example.com');
//   await page.fill('input[name="password"]', 'password123');

// // Click the login button
//   await page.click('button[type="submit"]');
// // Wait for the page to navigate
//   await page.waitForNavigation();
// // Check if the page navigated to the dashboard
//   expect(page.url()).toBe('http://localhost:3000/app');
// });

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
