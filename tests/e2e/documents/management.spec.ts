import { test, expect } from '@playwright/test';
import { loginUser } from '../utils/auth-helpers';

test.describe('Document Management', () => {
  test.beforeEach(async ({ page }) => {
    await loginUser(page, 'customer@example.com', 'Customer123!');
    await page.goto('/dashboard/documents');
  });

  test('create and manage folders', async ({ page }) => {
    // Create folder
    await page.getByRole('button', { name: 'New Folder' }).click();
    await page.getByLabel('Folder Name').fill('Test Folder');
    await page.getByRole('button', { name: 'Create' }).click();
    await expect(page.getByText('Test Folder')).toBeVisible();
    
    // Rename folder
    await page.getByText('Test Folder').click({ button: 'right' });
    await page.getByRole('menuitem', { name: 'Rename' }).click();
    await page.getByLabel('Folder Name').fill('Updated Folder');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Updated Folder')).toBeVisible();
    
    // Delete folder
    await page.getByText('Updated Folder').click({ button: 'right' });
    await page.getByRole('menuitem', { name: 'Delete' }).click();
    await page.getByRole('button', { name: 'Confirm' }).click();
    await expect(page.getByText('Updated Folder')).not.toBeVisible();
  });

  test('upload and manage documents', async ({ page }) => {
    // Upload document
    await page.getByRole('button', { name: 'Upload' }).click();
    await page.setInputFiles('input[type="file"]', {
      name: 'test.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('test content')
    });
    await expect(page.getByText('test.pdf')).toBeVisible();
    
    // Move document
    await page.getByText('test.pdf').dragTo(page.getByText('Documents'));
    await expect(page.getByText('Document moved successfully')).toBeVisible();
    
    // Share document
    await page.getByText('test.pdf').click({ button: 'right' });
    await page.getByRole('menuitem', { name: 'Share' }).click();
    await page.getByLabel('Email').fill('colleague@example.com');
    await page.getByRole('button', { name: 'Share' }).click();
    await expect(page.getByText('Document shared successfully')).toBeVisible();
  });

  test('search and filter documents', async ({ page }) => {
    await page.getByPlaceholder('Search documents...').fill('test');
    await expect(page.getByTestId('document-list')).toContainText('test.pdf');
    
    await page.getByLabel('Type').selectOption('pdf');
    await expect(page.getByTestId('document-list')).toContainText('test.pdf');
    await expect(page.getByTestId('document-list')).not.toContainText('image.jpg');
  });
});