import { test as base } from '@playwright/test';
import { loginUser } from './auth-helpers';

// Extend base test with custom fixtures
export const test = base.extend({
  // Auto-login fixture
  authedPage: async ({ page }, use) => {
    await loginUser(page, 'customer@example.com', 'Customer123!');
    await use(page);
  },
  
  // Admin page fixture
  adminPage: async ({ page }, use) => {
    await loginUser(page, 'admin@cyberallstars.com', 'Admin123!');
    await use(page);
  }
});

export { expect } from '@playwright/test';