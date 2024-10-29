import { test, expect } from '@playwright/test';

test.describe('Password Reset', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('request password reset', async ({ page }) => {
    await page.getByText('Forgot password?').click();
    await expect(page).toHaveURL('/forgot-password');
    
    const email = 'customer@example.com';
    await page.getByLabel('Email').fill(email);
    await page.getByRole('button', { name: 'Reset Password' }).click();
    
    await expect(page.getByText('Password reset instructions sent')).toBeVisible();
  });

  test('invalid email shows error', async ({ page }) => {
    await page.getByText('Forgot password?').click();
    await page.getByLabel('Email').fill('invalid@email');
    await page.getByRole('button', { name: 'Reset Password' }).click();
    
    await expect(page.getByText('Please enter a valid email address')).toBeVisible();
  });

  test('reset password with valid token', async ({ page }) => {
    // Simulate clicking reset link from email
    await page.goto('/reset-password?token=valid-token');
    
    await page.getByLabel('New Password').fill('NewPass123!');
    await page.getByLabel('Confirm Password').fill('NewPass123!');
    await page.getByRole('button', { name: 'Change Password' }).click();
    
    await expect(page.getByText('Password changed successfully')).toBeVisible();
    await expect(page).toHaveURL('/login');
  });
});