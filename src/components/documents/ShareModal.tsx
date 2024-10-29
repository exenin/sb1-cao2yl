import React, { useState } from 'react';
import { X, Users, Send } from 'lucide-react';
import { useDocuments } from '../../contexts/DocumentContext';
import { Document } from '../../types/documents';

interface ShareModalProps {
  show: boolean;
  onClose: () => void;
  items: Document[];
}

export default function ShareModal({ show, onClose, items }: ShareModalProps) {
  const { shareItems } = useDocuments();
  const [email, setEmail] = useState('');
  const [sharedEmails, setSharedEmails] = useState<string[]>([]);
  const [error, setError] = useState('');

  if (!show) return null;

  const handleAddEmail = () => {
    if (!email) return;
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      return;
    }
    setSharedEmails(prev => [...prev, email]);
    setEmail('');
    setError('');
  };

  const handleShare = async () => {
    if (sharedEmails.length === 0) {
      setError('Please add at least one email address');
      return;
    }

    try {
      await shareItems(items, sharedEmails);
      onClose();
    } catch (err) {
      setError('Failed to share items');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Share Documents</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-400 mb-2">
            Sharing {items.length} document{items.length !== 1 ? 's' : ''}
          </p>
          <div className="space-y-2">
            {items.map(item => (
              <div key={item.id} className="text-sm text-white">
                {item.name}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Share with
          </label>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddEmail()}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter email address"
              />
            </div>
            <button
              onClick={handleAddEmail}
              className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400"
            >
              Add
            </button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
        </div>

        {sharedEmails.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {sharedEmails.map((email, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 px-3 py-1 bg-gray-700 rounded-full"
                >
                  <span className="text-sm text-white">{email}</span>
                  <button
                    onClick={() => setSharedEmails(prev => prev.filter((_, i) => i !== index))}
                    className="p-1 hover:bg-gray-600 rounded-full"
                  >
                    <X className="h-3 w-3 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleShare}
            disabled={sharedEmails.length === 0}
            className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <Send className="h-4 w-4 mr-2" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}