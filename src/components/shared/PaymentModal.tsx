import React, { useState } from 'react';
import { CreditCard, Lock, Calendar, X } from 'lucide-react';

interface PaymentModalProps {
  show: boolean;
  onClose: () => void;
  amount: number;
  description: string;
  onPaymentComplete: () => void;
}

export default function PaymentModal({
  show,
  onClose,
  amount,
  description,
  onPaymentComplete
}: PaymentModalProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [processing, setProcessing] = useState(false);

  if (!show) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      onPaymentComplete();
      onClose();
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <CreditCard className="h-6 w-6 text-cyan-500" />
            <h3 className="text-lg font-semibold text-white">Payment Details</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div className="mb-6">
          <div className="text-gray-400 mb-2">{description}</div>
          <div className="text-2xl font-bold text-white">
            R{amount.toLocaleString()}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Card Number
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              maxLength={19}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                maxLength={5}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="MM/YY"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                CVC
              </label>
              <input
                type="text"
                value={cvc}
                onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                maxLength={4}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="123"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="flex items-center text-sm text-gray-400 mt-4">
            <Lock className="h-4 w-4 mr-2" />
            <span>Your payment information is secure and encrypted</span>
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full mt-6 px-6 py-3 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2" />
                Processing...
              </>
            ) : (
              `Pay R${amount.toLocaleString()}`
            )}
          </button>
        </form>
      </div>
    </div>
  );
}