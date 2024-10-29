import { test, expect } from '@playwright/test';
import { loginUser } from './utils/auth-helpers';

test.describe('Core Features', () => {
  test.beforeEach(async ({ page }) => {
    await loginUser(page, 'customer@example.com', 'Customer123!');
  });

  test('service subscription workflow', async ({ page }) => {
    await page.goto('/dashboard/services');
    await page.getByRole('button', { name: 'Add Service' }).click();
    
    // Select a service package
    await page.getByText('Basic Security Package').click();
    await page.getByRole('button', { name: 'Add' }).click();
    
    // Verify service was added
    await expect(page.getByText('Service added successfully')).toBeVisible();
    await expect(page.getByText('Basic Security Package')).toBeVisible();
  });

  test('support ticket creation', async ({ page }) => {
    await page.goto('/dashboard/requests');
    await page.getByRole('button', { name: 'New Request' }).click();
    
    // Fill ticket details
    await page.getByLabel('Title').fill('Test Support Request');
    await page.getByLabel('Description').fill('This is a test support request');
    await page.getByLabel('Priority').selectOption('high');
    
    await page.getByRole('button', { name: 'Submit Request' }).click();
    
    // Verify ticket creation
    await expect(page.getByText('Request submitted successfully')).toBeVisible();
    await expect(page.getByText('Test Support Request')).toBeVisible();
  });

  test('invoice management', async ({ page }) => {
    await page.goto('/dashboard/invoices');
    
    // View invoice details
    await page.getByText('INV-2024-001').click();
    await expect(page.getByText('Invoice Details')).toBeVisible();
    
    // Download invoice
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download PDF' }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain('invoice');
  });

  test('document management', async ({ page }) => {
    await page.goto('/dashboard/documents');
    
    // Create folder
    await page.getByRole('button', { name: 'New Folder' }).click();
    await page.getByLabel('Folder Name').fill('Test Folder');
    await page.getByRole('button', { name: 'Create Folder' }).click();
    
    // Upload document
    await page.getByRole('button', { name: 'Upload' }).click();
    await page.setInputFiles('input[type="file"]', 'path/to/test-file.pdf');
    await page.getByRole('button', { name: 'Upload' }).click();
    
    // Verify upload
    await expect(page.getByText('test-file.pdf')).toBeVisible();
  });
});

test.describe('Data Validation', () => {
  test('form validation', async ({ page }) => {
    await page.goto('/dashboard/settings');
    
    // Empty required fields
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await expect(page.getByText('Name is required')).toBeVisible();
    
    // Invalid email format
    await page.getByLabel('Email').fill('invalid-email');
    await expect(page.getByText('Invalid email address')).toBeVisible();
    
    // Valid form submission
    await page.getByLabel('Name').fill('John Doe');
    await page.getByLabel('Email').fill('john@example.com');
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await expect(page.getByText('Settings updated successfully')).toBeVisible();
  });

  test('input validation', async ({ page }) => {
    await page.goto('/dashboard/services');
    
    // Test numeric input validation
    await page.getByLabel('Budget').fill('-1000');
    await expect(page.getByText('Budget must be a positive number')).toBeVisible();
    
    // Test required fields
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Please fill in all required fields')).toBeVisible();
  });
});