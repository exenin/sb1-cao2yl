import { test, expect } from '@playwright/test';
import { loginUser } from '../utils/auth-helpers';

test.describe('Service Subscription', () => {
  test.beforeEach(async ({ page }) => {
    await loginUser(page, 'customer@example.com', 'Customer123!');
    await page.goto('/dashboard/services');
  });

  test('subscribe to basic security package', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Service' }).click();
    await page.getByText('Basic Security Package').click();
    await page.getByRole('button', { name: 'Add' }).click();
    
    await expect(page.getByText('Service added successfully')).toBeVisible();
    await expect(page.getByText('Basic Security Package')).toBeVisible();
  });

  test('view service details', async ({ page }) => {
    await page.getByText('Basic Security Package').click();
    
    await expect(page.getByText('Service Details')).toBeVisible();
    await expect(page.getByText('R25,000/month')).toBeVisible();
    await expect(page.getByText('Cyber Risk Assessment')).toBeVisible();
  });

  test('cancel service subscription', async ({ page }) => {
    await page.getByText('Basic Security Package').click();
    await page.getByRole('button', { name: 'Cancel Subscription' }).click();
    
    // Confirm cancellation
    await page.getByRole('button', { name: 'Confirm' }).click();
    
    await expect(page.getByText('Subscription cancelled successfully')).toBeVisible();
  });
});