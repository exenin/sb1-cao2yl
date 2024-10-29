export type InvoiceStatus = 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled';
export type PaymentMethod = 'credit_card' | 'bank_transfer' | 'debit_order';
export type CurrencyCode = 'ZAR' | 'USD' | 'EUR' | 'GBP';

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  number: string;
  issueDate: string;
  dueDate: string;
  customerId: string;
  items: InvoiceItem[];
  subtotal: number;
  taxTotal: number;
  total: number;
  currency: CurrencyCode;
  status: InvoiceStatus;
  terms?: string;
  notes?: string;
  paymentMethod?: PaymentMethod;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}