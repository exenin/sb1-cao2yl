import { Page } from '@playwright/test';

export async function loginUser(page: Page, email: string, password: string) {
  await page.goto('/login');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();
}

export async function setupTestUser(page: Page) {
  // Create test user via API
  const response = await page.request.post('/api/users', {
    data: {
      email: 'test@example.com',
      password: 'Test123!',
      role: 'customer_company'
    }
  });
  return response.json();
}

export async function cleanupTestUser(page: Page, userId: string) {
  // Delete test user via API
  await page.request.delete(`/api/users/${userId}`);
}