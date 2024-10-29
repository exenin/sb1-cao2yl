import React, { createContext, useContext, useState } from 'react';
import { Invoice, InvoiceItem } from '../types/invoice';

interface InvoiceContextType {
  invoices: Invoice[];
  getInvoiceById: (id: string) => Promise<Invoice>;
  createInvoice: (data: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateInvoice: (id: string, data: Partial<Invoice>) => Promise<void>;
  deleteInvoice: (id: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    number: '0001-0000002',
    date: '2024/10/28',
    items: [
      {
        description: 'DevSecOps Contract Work - October (8h * 23)',
        quantity: 184,
        rate: 56.25,
        amount: 10350.00
      }
    ],
    subtotal: 10350.00,
    discount: 0,
    tax: 0,
    total: 10350.00,
    status: 'pending',
    client: {
      name: 'Better Design Digital',
      address: 'Unit 3-4 Cranmere Court, Lustleigh Close, Marsh Barton Trading Estate, Exeter, EX2 8PW',
      email: 'accounts@betterdesign.digital'
    }
  }
  // Add more mock invoices as needed
];

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export function InvoiceProvider({ children }: { children: React.ReactNode }) {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getInvoiceById = async (id: string): Promise<Invoice> => {
    const invoice = invoices.find(inv => inv.id === id);
    if (!invoice) {
      throw new Error('Invoice not found');
    }
    return invoice;
  };

  const createInvoice = async (data: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      const newInvoice: Invoice = {
        ...data,
        id: `inv_${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setInvoices(prev => [...prev, newInvoice]);
    } catch (err) {
      setError('Failed to create invoice');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateInvoice = async (id: string, data: Partial<Invoice>) => {
    setIsLoading(true);
    try {
      setInvoices(prev => prev.map(invoice => 
        invoice.id === id
          ? { ...invoice, ...data, updatedAt: new Date().toISOString() }
          : invoice
      ));
    } catch (err) {
      setError('Failed to update invoice');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteInvoice = async (id: string) => {
    setIsLoading(true);
    try {
      setInvoices(prev => prev.filter(invoice => invoice.id !== id));
    } catch (err) {
      setError('Failed to delete invoice');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <InvoiceContext.Provider value={{
      invoices,
      getInvoiceById,
      createInvoice,
      updateInvoice,
      deleteInvoice,
      isLoading,
      error
    }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoices() {
  const context = useContext(InvoiceContext);
  if (context === undefined) {
    throw new Error('useInvoices must be used within an InvoiceProvider');
  }
  return context;
}