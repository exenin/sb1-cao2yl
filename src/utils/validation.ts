import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'customer_company', 'customer_employee']),
  companyId: z.string().optional()
});

export const companySchema = z.object({
  name: z.string().min(2, 'Company name must be at least 2 characters'),
  registrationNumber: z.string().regex(/^\d{4}\/\d{6}\/\d{2}$/, 'Invalid registration number format'),
  vatNumber: z.string().regex(/^\d{10}$/, 'Invalid VAT number'),
  address: z.string().min(5, 'Address is required'),
  industry: z.string().min(2, 'Industry is required'),
  size: z.string(),
  website: z.string().url().optional()
});

export const serviceSchema = z.object({
  name: z.string().min(2, 'Service name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be positive'),
  features: z.array(z.string()).min(1, 'At least one feature is required')
});