import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');

  await page.fill('input[name="email"]', 'prof@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  await page.waitForSelector('text="Déconnexion"');
  await page.click('a:has-text("Cours")');
});

test('should display the courses list', async ({ page }) => {
  const coursesList = await page.waitForSelector('text="Liste des cours"');
  expect(coursesList).not.toBeNull();
});

test('should display CS101', async ({ page }) => {
  const courseTitle = await page.waitForSelector('text="CS101"');
  expect(courseTitle).not.toBeNull();
});

test('should display the add course form', async ({ page }) => {
  await page.click('button:has-text("Ajouter un cours")');
  await page.waitForSelector('text="Ajouter un cours"');
  await page.click('button:has-text("Annuler")');
});

test('should delete CS101', async ({ page }) => {
  await page.click('button:has(svg.lucide-trash2)');
  await page.waitForSelector('text="CS101"', { state: 'detached' });

  expect(await page.isVisible('text="CS101"')).toBeFalsy();
});

