import React, { useState } from 'react';
import { Folder, X } from 'lucide-react';
import { useDocuments } from '../../contexts/DocumentContext';

interface FolderCreatorProps {
  show: boolean;
  onClose: () => void;
  parentFolderId?: string | null;
}

export default function FolderCreator({ show, onClose, parentFolderId }: FolderCreatorProps) {
  const { createFolder } = useDocuments();
  const [folderName, setFolderName] = useState('');
  const [error, setError] = useState('');

  if (!show) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!folderName.trim()) {
      setError('Folder name is required');
      return;
    }

    try {
      await createFolder(folderName, parentFolderId || undefined);
      onClose();
    } catch (err) {
      setError('Failed to create folder');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Create New Folder</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Folder Name
            </label>
            <div className="flex items-center space-x-2">
              <Folder className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter folder name"
                autoFocus
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400"
            >
              Create Folder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}