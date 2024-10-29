import React, { useState } from 'react';
import { Key, Copy, Plus, Trash2 } from 'lucide-react';

interface ApiKeyModalProps {
  show: boolean;
  onClose: () => void;
}

export default function ApiKeyModal({ show, onClose }: ApiKeyModalProps) {
  const [apiKeys, setApiKeys] = useState([
    {
      id: '1',
      name: 'Development API Key',
      key: 'sk_test_123456789',
      created: new Date().toISOString(),
      lastUsed: new Date().toISOString()
    }
  ]);

  if (!show) return null;

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    // Show toast notification
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== id));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Key className="h-6 w-6 text-cyan-500" />
            <h3 className="text-lg font-semibold text-white">API Keys</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            Close
          </button>
        </div>

        <div className="mb-6">
          <button className="flex items-center px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400">
            <Plus className="h-4 w-4 mr-2" />
            Generate New Key
          </button>
        </div>

        <div className="space-y-4">
          {apiKeys.map(apiKey => (
            <div key={apiKey.id} className="p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white">{apiKey.name}</h4>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleCopyKey(apiKey.key)}
                    className="p-2 hover:bg-gray-600 rounded-lg"
                  >
                    <Copy className="h-4 w-4 text-gray-400" />
                  </button>
                  <button
                    onClick={() => handleDeleteKey(apiKey.id)}
                    className="p-2 hover:bg-gray-600 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </button>
                </div>
              </div>
              <div className="font-mono text-sm text-gray-400 mb-2">
                {apiKey.key}
              </div>
              <div className="text-xs text-gray-500">
                Created: {new Date(apiKey.created).toLocaleString()}
                <span className="mx-2">•</span>
                Last used: {new Date(apiKey.lastUsed).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}