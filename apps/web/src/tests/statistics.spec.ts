import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto('/');

  await page.fill('input[name="email"]', 'prof@example.com');
  await page.fill('input[name="password"]', 'password123');

  await page.click('button[type="submit"]');
  await page.waitForSelector('text="Déconnexion"');

  await page.goto('/statistics');
  await page.waitForTimeout(500);
});

test('should display the global statistics', async ({ page }) => {
  expect(await page.isVisible('text="Statistiques Globales"')).toBeTruthy();
  expect(await page.isVisible('text="Moyenne de toutes les notes"')).toBeTruthy();
  expect(await page.isVisible('text="Total des étudiants inscrits"')).toBeTruthy();
  expect(await page.isVisible('text="Total des cours disponibles"')).toBeTruthy();
  expect(await page.isVisible('text="Taux de réussite moyen"')).toBeTruthy();
});
