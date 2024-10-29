import React from 'react';
import { History, MapPin, Monitor } from 'lucide-react';

interface SecurityLogModalProps {
  show: boolean;
  onClose: () => void;
  loginHistory: Array<{
    date: string;
    ip: string;
    location: string;
    device: string;
  }>;
}

export default function SecurityLogModal({ show, onClose, loginHistory }: SecurityLogModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <History className="h-6 w-6 text-cyan-500" />
            <h3 className="text-lg font-semibold text-white">Security Log</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            Close
          </button>
        </div>

        <div className="space-y-4">
          {loginHistory.map((log, index) => (
            <div key={index} className="p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <Monitor className="h-5 w-5 text-gray-400" />
                  <span className="text-white">{log.device}</span>
                </div>
                <span className="text-sm text-gray-400">
                  {new Date(log.date).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>{log.location}</span>
                <span>•</span>
                <span>IP: {log.ip}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}