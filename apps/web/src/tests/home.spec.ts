import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => await page.goto('/'));

test('should display the login form', async ({ page }) => {
  expect(await page.isVisible('form')).toBeTruthy();
});

test('login form should have email and password fields', async ({ page }) => {
  expect(await page.isVisible('input[name="email"]')).toBeTruthy();
  expect(await page.isVisible('input[name="password"]')).toBeTruthy();
});

test('should display the login button', async ({ page }) => {
  expect(await page.isVisible('button[type="submit"]')).toBeTruthy();
});

test('login with valid credentials', async ({ page, baseURL }) => {
  await page.fill('input[name="email"]', 'prof@example.com');
  await page.fill('input[name="password"]', 'password123');

  await page.click('button[type="submit"]');
  await page.waitForSelector('text="Déconnexion"');

  expect(page.url()).toBe(baseURL + '/app');
});
