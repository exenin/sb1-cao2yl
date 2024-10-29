import React from 'react';
import { X, Share2, AlertCircle } from 'lucide-react';

interface AlertDrawerProps {
  alert: any;
  onClose: () => void;
}

export default function AlertDrawer({ alert, onClose }: AlertDrawerProps) {
  if (!alert) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-lg bg-gray-800 shadow-lg">
        <div className="p-6 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <AlertCircle className={`h-5 w-5 ${
              alert.type === 'warning' ? 'text-yellow-500' :
              alert.type === 'error' ? 'text-red-500' :
              'text-green-500'
            }`} />
            <h3 className="text-lg font-semibold text-white">{alert.title}</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              className="p-2 hover:bg-gray-700 rounded-lg"
              onClick={() => {
                const shareUrl = `${window.location.origin}/admin/dashboard/alerts/${alert.id}`;
                navigator.clipboard.writeText(shareUrl);
              }}
            >
              <Share2 className="h-5 w-5 text-gray-400" />
            </button>
            <button 
              className="p-2 hover:bg-gray-700 rounded-lg"
              onClick={onClose}
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Description</h4>
            <p className="text-white">{alert.description}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Details</h4>
            <div className="space-y-4">
              {Object.entries(alert.details).map(([key, value]) => (
                <div key={key}>
                  <p className="text-sm text-gray-400 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  {Array.isArray(value) ? (
                    <ul className="mt-1 space-y-1">
                      {value.map((item, index) => (
                        <li key={index} className="text-white">{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-white">{value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Timeline</h4>
            <p className="text-white">
              {new Date(alert.timestamp).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
          <button className="w-full py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-colors">
            Mark as Resolved
          </button>
        </div>
      </div>
    </div>
  );
}