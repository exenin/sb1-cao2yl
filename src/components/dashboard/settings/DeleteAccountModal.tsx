import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

interface DeleteAccountModalProps {
  show: boolean;
  onClose: () => void;
}

export default function DeleteAccountModal({ show, onClose }: DeleteAccountModalProps) {
  const [confirmation, setConfirmation] = useState('');

  if (!show) return null;

  const handleDelete = () => {
    if (confirmation === 'DELETE') {
      // Handle account deletion
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center space-x-3 mb-6">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          <h3 className="text-lg font-semibold text-white">Delete Account</h3>
        </div>

        <div className="space-y-4">
          <p className="text-gray-400">
            This action cannot be undone. All your data will be permanently deleted.
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Type "DELETE" to confirm
            </label>
            <input
              type="text"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={confirmation !== 'DELETE'}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}