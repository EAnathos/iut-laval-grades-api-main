import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => await page.goto('/students'));

test('should display the students list', async ({ page }) => {
  await page.fill('input[name="email"]', 'prof@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  await page.waitForSelector('text="Déconnexion"');
  await page.waitForSelector('.space-y-4');

  expect(await page.isVisible('.space-y-4')).toBeTruthy();
});

test('should display Alice', async ({ page }) => {
  await page.fill('input[name="email"]', 'prof@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  await page.waitForSelector('text="Déconnexion"');
  await page.waitForSelector('.space-y-4');

  await page.click('a[href="/students/1"]');
  await page.waitForSelector('.rounded-lg');

  expect(await page.isVisible('.rounded-lg')).toBeTruthy();
  expect(await page.textContent('.rounded-lg')).toContain('Alice');
});

test('should display the add note form', async ({ page }) => {
  await page.fill('input[name="email"]', 'prof@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  await page.waitForSelector('text="Déconnexion"');
  await page.waitForSelector('.space-y-4');

  await page.click('a[href="/students/1"]');
  await page.waitForSelector('.rounded-lg');
  await page.click('button:has-text("Ajouter une note")');
  await page.waitForSelector('.text-sm.text-muted-foreground');
  await page.click('button:has-text("Annuler")');
});
