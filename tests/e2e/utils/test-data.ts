import { Page } from '@playwright/test';

export async function createTestDocument(page: Page) {
  await page.goto('/dashboard/documents');
  await page.getByRole('button', { name: 'Upload' }).click();
  await page.setInputFiles('input[type="file"]', {
    name: 'test.pdf',
    mimeType: 'application/pdf',
    buffer: Buffer.from('test content')
  });
  await page.waitForSelector('text=test.pdf');
}

export async function createTestFolder(page: Page, name: string) {
  await page.goto('/dashboard/documents');
  await page.getByRole('button', { name: 'New Folder' }).click();
  await page.getByLabel('Folder Name').fill(name);
  await page.getByRole('button', { name: 'Create' }).click();
  await page.waitForSelector(`text=${name}`);
}

export async function subscribeToService(page: Page, serviceName: string) {
  await page.goto('/dashboard/services');
  await page.getByRole('button', { name: 'Add Service' }).click();
  await page.getByText(serviceName).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.waitForSelector(`text=${serviceName}`);
}

export async function createSupportTicket(page: Page, title: string, description: string) {
  await page.goto('/dashboard/requests');
  await page.getByRole('button', { name: 'New Request' }).click();
  await page.getByLabel('Title').fill(title);
  await page.getByLabel('Description').fill(description);
  await page.getByRole('button', { name: 'Submit Request' }).click();
  await page.waitForSelector(`text=${title}`);
}