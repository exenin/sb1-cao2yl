import { test, expect } from '@playwright/test';
import { setupTestUser, loginUser, cleanupTestUser } from './utils/auth-helpers';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
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

  test('admin login and access to admin dashboard', async ({ page }) => {
    await loginUser(page, 'admin@cyberallstars.com', 'Admin123!');
    await expect(page.getByText('Admin Dashboard')).toBeVisible();
    await expect(page).toHaveURL('/admin/dashboard');
  });

  test('logout functionality', async ({ page }) => {
    await loginUser(page, 'customer@example.com', 'Customer123!');
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page).toHaveURL('/login');
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/login');
  });

  test('session persistence', async ({ page, context }) => {
    await loginUser(page, 'customer@example.com', 'Customer123!');
    await page.goto('/dashboard');
    await expect(page.getByText('Dashboard')).toBeVisible();

    // Create a new page in the same browser context
    const newPage = await context.newPage();
    await newPage.goto('/dashboard');
    await expect(newPage.getByText('Dashboard')).toBeVisible();
  });

  test('password reset flow', async ({ page }) => {
    await page.goto('/login');
    await page.getByText('Forgot password?').click();
    await expect(page).toHaveURL('/forgot-password');
    
    const email = 'customer@example.com';
    await page.getByLabel('Email').fill(email);
    await page.getByRole('button', { name: 'Reset Password' }).click();
    
    await expect(page.getByText('Password reset instructions sent')).toBeVisible();
  });
});

test.describe('Authorization', () => {
  test('customer cannot access admin routes', async ({ page }) => {
    await loginUser(page, 'customer@example.com', 'Customer123!');
    await page.goto('/admin/dashboard');
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Unauthorized')).toBeVisible();
  });

  test('admin can access all routes', async ({ page }) => {
    await loginUser(page, 'admin@cyberallstars.com', 'Admin123!');
    
    // Admin dashboard
    await page.goto('/admin/dashboard');
    await expect(page).toHaveURL('/admin/dashboard');
    
    // User management
    await page.goto('/admin/dashboard/users');
    await expect(page.getByText('User Management')).toBeVisible();
    
    // Settings
    await page.goto('/admin/dashboard/settings');
    await expect(page.getByText('System Settings')).toBeVisible();
  });

  test('permission-based UI elements', async ({ page }) => {
    // Customer view
    await loginUser(page, 'customer@example.com', 'Customer123!');
    await expect(page.getByText('Admin Portal')).not.toBeVisible();
    
    await page.goto('/dashboard/services');
    await expect(page.getByRole('button', { name: 'Add Service' })).toBeVisible();
    
    // Admin view
    await loginUser(page, 'admin@cyberallstars.com', 'Admin123!');
    await expect(page.getByText('User Management')).toBeVisible();
    await expect(page.getByText('System Settings')).toBeVisible();
  });
});