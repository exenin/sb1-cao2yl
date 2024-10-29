import { test, expect } from '@playwright/test';
import { loginUser } from './utils/auth-helpers';

test.describe('Data Persistence', () => {
  test.beforeEach(async ({ page }) => {
    await loginUser(page, 'customer@example.com', 'Customer123!');
  });

  test('CRUD operations', async ({ page }) => {
    await page.goto('/dashboard/documents');
    
    // Create
    await page.getByRole('button', { name: 'New Folder' }).click();
    await page.getByLabel('Folder Name').fill('Test Folder');
    await page.getByRole('button', { name: 'Create' }).click();
    await expect(page.getByText('Test Folder')).toBeVisible();
    
    // Read
    await page.getByText('Test Folder').click();
    await expect(page).toHaveURL(/.*\/documents\/.*$/);
    
    // Update
    await page.getByRole('button', { name: 'Rename' }).click();
    await page.getByLabel('Folder Name').fill('Updated Folder');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Updated Folder')).toBeVisible();
    
    // Delete
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.getByRole('button', { name: 'Confirm' }).click();
    await expect(page.getByText('Updated Folder')).not.toBeVisible();
  });

  test('local storage persistence', async ({ page, context }) => {
    // Set theme preference
    await page.goto('/dashboard/settings');
    await page.getByLabel('Dark Mode').check();
    
    // Verify persistence across pages
    const newPage = await context.newPage();
    await newPage.goto('/dashboard');
    const isDarkMode = await newPage.evaluate(() => {
      return localStorage.getItem('theme') === 'dark';
    });
    expect(isDarkMode).toBeTruthy();
  });

  test('cache behavior', async ({ page }) => {
    await page.goto('/dashboard/documents');
    
    // Cache document list
    const documents = await page.getByTestId('document-list').all();
    
    // Go to another page and back
    await page.goto('/dashboard/services');
    await page.goBack();
    
    // Verify instant load from cache
    await expect(page.getByTestId('loading-spinner')).not.toBeVisible();
    const cachedDocuments = await page.getByTestId('document-list').all();
    expect(cachedDocuments.length).toBe(documents.length);
  });

  test('state preservation', async ({ page }) => {
    await page.goto('/dashboard/services');
    
    // Apply filters
    await page.getByLabel('Status').selectOption('active');
    await page.getByLabel('Type').selectOption('security');
    
    // Navigate away and back
    await page.goto('/dashboard/invoices');
    await page.goBack();
    
    // Verify filters are preserved
    await expect(page.getByLabel('Status')).toHaveValue('active');
    await expect(page.getByLabel('Type')).toHaveValue('security');
  });
});