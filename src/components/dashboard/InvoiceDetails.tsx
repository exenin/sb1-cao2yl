import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Download, ArrowLeft } from 'lucide-react';
import { useInvoices } from '../../contexts/InvoiceContext';
import { Invoice } from '../../types/invoice';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function InvoiceDetails() {
  const { id } = useParams();
  const { invoices } = useInvoices();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        // For demo, find invoice in context
        const found = invoices.find(inv => inv.id === id);
        if (found) {
          setInvoice(found);
        }
      } catch (error) {
        console.error('Failed to load invoice:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id, invoices]);

  const handleDownloadPDF = async () => {
    const element = document.getElementById('invoice-content');
    if (!element) return;

    try {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`invoice-${invoice?.number || 'download'}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-white mb-4">Invoice Not Found</h2>
        <p className="text-gray-400">The requested invoice could not be found.</p>
        <a 
          href="/dashboard/invoices" 
          className="mt-4 flex items-center text-cyan-500 hover:text-cyan-400"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Invoices
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Actions */}
      <div className="flex justify-between items-center mb-6">
        <a 
          href="/dashboard/invoices" 
          className="flex items-center text-cyan-500 hover:text-cyan-400"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Invoices
        </a>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400"
        >
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </button>
      </div>

      {/* Invoice Content */}
      <div id="invoice-content" className="bg-white text-black rounded-lg p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">CyberAllStars (PTY)LTD</h1>
            <div className="text-gray-600">
              <p>10 Vygeboom Crescent</p>
              <p>Vygeboom, Durbanville</p>
              <p>Cape Town, 7550</p>
              <p>US: +1 321 444 3896 | ZA: +27 71 489 0871</p>
              <p>accounts@cyberallstars.com</p>
              <p>Entity Registration: 2024/112526/07</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-bold text-cyan-600 mb-2">INVOICE</h2>
            <p className="text-gray-600">#{invoice.number}</p>
            <p className="text-gray-600">Date: {new Date(invoice.issueDate).toLocaleDateString()}</p>
            <p className="text-gray-600">Due: {new Date(invoice.dueDate).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Client Info */}
        <div className="mb-8">
          <h3 className="text-gray-800 font-bold mb-2">Bill To:</h3>
          <div className="text-gray-600">
            <p>{invoice.customerId}</p>
            <p>Unit 3-4 Cranmere Court</p>
            <p>Lustleigh Close, Marsh Barton Trading Estate</p>
            <p>Exeter, EX2 8PW</p>
          </div>
        </div>

        {/* Items */}
        <table className="w-full mb-8">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-2">Description</th>
              <th className="text-right py-2">Quantity</th>
              <th className="text-right py-2">Rate</th>
              <th className="text-right py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-2">{item.description}</td>
                <td className="text-right py-2">{item.quantity}</td>
                <td className="text-right py-2">
                  {new Intl.NumberFormat('en-GB', {
                    style: 'currency',
                    currency: invoice.currency
                  }).format(item.unitPrice)}
                </td>
                <td className="text-right py-2">
                  {new Intl.NumberFormat('en-GB', {
                    style: 'currency',
                    currency: invoice.currency
                  }).format(item.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary */}
        <div className="flex justify-end mb-8">
          <div className="w-64">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">
                {new Intl.NumberFormat('en-GB', {
                  style: 'currency',
                  currency: invoice.currency
                }).format(invoice.subtotal)}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Tax ({(invoice.taxTotal / invoice.subtotal * 100).toFixed(0)}%):</span>
              <span className="font-medium">
                {new Intl.NumberFormat('en-GB', {
                  style: 'currency',
                  currency: invoice.currency
                }).format(invoice.taxTotal)}
              </span>
            </div>
            <div className="flex justify-between py-2 border-t-2 border-gray-200">
              <span className="font-bold">Total Due:</span>
              <span className="font-bold">
                {new Intl.NumberFormat('en-GB', {
                  style: 'currency',
                  currency: invoice.currency
                }).format(invoice.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="border-t-2 border-gray-200 pt-8">
          <h3 className="text-gray-800 font-bold mb-4">Payment Instructions</h3>
          <div className="grid grid-cols-2 gap-4 text-gray-600">
            <div>
              <p><span className="font-medium">Bank:</span> Capitec Business</p>
              <p><span className="font-medium">Account Name:</span> CYBERALLSTARS (PTY)LTD</p>
              <p><span className="font-medium">Account Number:</span> 1052073450</p>
            </div>
            <div>
              <p><span className="font-medium">Type:</span> Business Account</p>
              <p><span className="font-medium">SWIFT:</span> CABLZAJJ</p>
              <p><span className="font-medium">Branch:</span> Relationship Suite (450105)</p>
            </div>
          </div>
          <p className="mt-4 text-gray-600">
            <span className="font-medium">Payment Reference:</span> Invoice #{invoice.number}
          </p>
        </div>

        {/* Terms */}
        <div className="mt-8 text-sm text-gray-600">
          <p className="font-medium mb-2">Terms & Conditions:</p>
          <p>{invoice.terms || 'Payment is due within 30 days of invoice date. Please include the invoice number as payment reference.'}</p>
        </div>
      </div>
    </div>
  );
}