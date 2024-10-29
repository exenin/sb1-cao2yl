import { test, expect } from '@playwright/test';
import { loginUser } from '../utils/auth-helpers';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('successful login with valid credentials', async ({ page }) => {
    await loginUser(page, 'customer@example.com', 'Customer123!');
    await expect(page.getByText('Dashboard')).toBeVisible();
    await expect(page).toHaveURL('/dashboard');
  });

  test('failed login with invalid credentials', async ({ page }) => {
    await loginUser(page, 'invalid@example.com', 'wrongpassword');
    await expect(page.getByText('Invalid credentials')).toBeVisible();
    await expect(page).toHaveURL('/login');
  });

  test('admin login redirects to admin dashboard', async ({ page }) => {
    await loginUser(page, 'admin@cyberallstars.com', 'Admin123!');
    await expect(page.getByText('Admin Dashboard')).toBeVisible();
    await expect(page).toHaveURL('/admin/dashboard');
  });

  test('remembers user session', async ({ page, context }) => {
    await loginUser(page, 'customer@example.com', 'Customer123!');
    
    // Open new tab
    const newPage = await context.newPage();
    await newPage.goto('/dashboard');
    await expect(newPage.getByText('Dashboard')).toBeVisible();
  });
});