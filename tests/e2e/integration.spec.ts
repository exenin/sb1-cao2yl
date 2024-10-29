import { test, expect } from '@playwright/test';
import { loginUser } from './utils/auth-helpers';

test.describe('Integration Tests', () => {
  test.beforeEach(async ({ page }) => {
    await loginUser(page, 'customer@example.com', 'Customer123!');
  });

  test('API response handling', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Verify data loading states
    await expect(page.getByTestId('loading-spinner')).toBeVisible();
    await expect(page.getByTestId('dashboard-metrics')).toBeVisible();
    
    // Test error handling
    await page.route('**/api/metrics', route => route.abort());
    await page.reload();
    await expect(page.getByText('Failed to load metrics')).toBeVisible();
  });

  test('real-time updates', async ({ page }) => {
    await page.goto('/dashboard/support');
    
    // Send chat message
    await page.getByLabel('Message').fill('Test message');
    await page.getByRole('button', { name: 'Send' }).click();
    
    // Verify message appears
    await expect(page.getByText('Test message')).toBeVisible();
    
    // Verify typing indicator
    await page.getByLabel('Message').type('Hello');
    await expect(page.getByTestId('typing-indicator')).toBeVisible();
  });

  test('file upload handling', async ({ page }) => {
    await page.goto('/dashboard/documents');
    
    // Test file size limit
    const largeFile = await page.evaluate(() => {
      const file = new File(['x'.repeat(11 * 1024 * 1024)], 'large.txt', { type: 'text/plain' });
      return file;
    });
    
    await page.setInputFiles('input[type="file"]', largeFile);
    await expect(page.getByText('File size exceeds 10MB limit')).toBeVisible();
    
    // Test valid file upload
    const validFile = await page.evaluate(() => {
      const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
      return file;
    });
    
    await page.setInputFiles('input[type="file"]', validFile);
    await expect(page.getByText('File uploaded successfully')).toBeVisible();
  });

  test('data synchronization', async ({ page, context }) => {
    // Open two tabs
    const secondPage = await context.newPage();
    await Promise.all([
      page.goto('/dashboard/documents'),
      secondPage.goto('/dashboard/documents')
    ]);
    
    // Make changes in first tab
    await page.getByRole('button', { name: 'New Folder' }).click();
    await page.getByLabel('Folder Name').fill('Sync Test');
    await page.getByRole('button', { name: 'Create' }).click();
    
    // Verify changes appear in second tab
    await expect(secondPage.getByText('Sync Test')).toBeVisible();
  });
});