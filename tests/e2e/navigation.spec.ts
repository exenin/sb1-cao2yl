import { test, expect } from '@playwright/test';
import { loginUser } from './utils/auth-helpers';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await loginUser(page, 'customer@example.com', 'Customer123!');
  });

  test('main navigation flow', async ({ page }) => {
    // Dashboard
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/dashboard');
    
    // Services
    await page.getByRole('link', { name: 'Services' }).click();
    await expect(page).toHaveURL('/dashboard/services');
    
    // Invoices
    await page.getByRole('link', { name: 'Invoices' }).click();
    await expect(page).toHaveURL('/dashboard/invoices');
    
    // Settings
    await page.getByRole('link', { name: 'Settings' }).click();
    await expect(page).toHaveURL('/dashboard/settings');
  });

  test('deep linking', async ({ page }) => {
    // Direct navigation to protected route
    await page.goto('/dashboard/invoices/INV-2024-001');
    await expect(page.getByText('Invoice Details')).toBeVisible();
    
    // Invalid invoice ID
    await page.goto('/dashboard/invoices/invalid-id');
    await expect(page.getByText('Invoice not found')).toBeVisible();
  });

  test('browser history', async ({ page }) => {
    await page.goto('/dashboard');
    await page.getByRole('link', { name: 'Services' }).click();
    await page.getByRole('link', { name: 'Invoices' }).click();
    
    await page.goBack();
    await expect(page).toHaveURL('/dashboard/services');
    
    await page.goBack();
    await expect(page).toHaveURL('/dashboard');
    
    await page.goForward();
    await expect(page).toHaveURL('/dashboard/services');
  });

  test('URL parameters', async ({ page }) => {
    // Search functionality
    await page.goto('/dashboard/documents?search=test');
    await expect(page.getByPlaceholder('Search documents...')).toHaveValue('test');
    
    // Filters
    await page.goto('/dashboard/invoices?status=pending');
    await expect(page.getByLabel('Status')).toHaveValue('pending');
    
    // Pagination
    await page.goto('/dashboard/services?page=2');
    await expect(page.getByRole('button', { name: '2' })).toHaveClass(/active/);
  });
});