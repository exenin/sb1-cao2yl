import { test, expect } from '@playwright/test';
import { loginUser } from '../utils/auth-helpers';

test.describe('Logout', () => {
  test.beforeEach(async ({ page }) => {
    await loginUser(page, 'customer@example.com', 'Customer123!');
  });

  test('successful logout', async ({ page }) => {
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page).toHaveURL('/login');
  });

  test('redirects to login after logout when accessing protected route', async ({ page }) => {
    await page.getByRole('button', { name: 'Logout' }).click();
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/login');
  });

  test('clears session data after logout', async ({ page, context }) => {
    await page.getByRole('button', { name: 'Logout' }).click();
    
    // Try accessing protected route in new tab
    const newPage = await context.newPage();
    await newPage.goto('/dashboard');
    await expect(newPage).toHaveURL('/login');
  });
});