import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ConfirmationDialogProps {
  show: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationDialog({
  show,
  title,
  message,
  onConfirm,
  onCancel
}: ConfirmationDialogProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center space-x-3 mb-4">
          <AlertCircle className="h-6 w-6 text-cyan-500" />
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <p className="text-gray-400 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}