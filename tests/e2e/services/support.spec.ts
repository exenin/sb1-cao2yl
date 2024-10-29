import { test, expect } from '@playwright/test';
import { loginUser } from '../utils/auth-helpers';

test.describe('Support System', () => {
  test.beforeEach(async ({ page }) => {
    await loginUser(page, 'customer@example.com', 'Customer123!');
    await page.goto('/dashboard/support');
  });

  test('create support ticket', async ({ page }) => {
    await page.getByRole('button', { name: 'New Request' }).click();
    
    await page.getByLabel('Title').fill('Test Support Request');
    await page.getByLabel('Description').fill('This is a test support request');
    await page.getByLabel('Priority').selectOption('high');
    
    await page.getByRole('button', { name: 'Submit Request' }).click();
    
    await expect(page.getByText('Request submitted successfully')).toBeVisible();
    await expect(page.getByText('Test Support Request')).toBeVisible();
  });

  test('chat with support agent', async ({ page }) => {
    await page.getByRole('button', { name: 'Start Chat' }).click();
    
    await page.getByLabel('Message').fill('Hello, I need help');
    await page.getByRole('button', { name: 'Send' }).click();
    
    await expect(page.getByText('Hello, I need help')).toBeVisible();
    await expect(page.getByTestId('typing-indicator')).toBeVisible();
    await expect(page.getByText('Hello! How can I help you today?')).toBeVisible();
  });

  test('upload attachment to ticket', async ({ page }) => {
    await page.getByRole('button', { name: 'New Request' }).click();
    
    await page.setInputFiles('input[type="file"]', {
      name: 'test.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('test content')
    });
    
    await expect(page.getByText('test.pdf')).toBeVisible();
    await expect(page.getByText('File uploaded successfully')).toBeVisible();
  });
});