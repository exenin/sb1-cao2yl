import React, { useState } from 'react';
import { AlertTriangle, Shield, Activity, X, Check } from 'lucide-react';
import { useSecurity } from '../../contexts/SecurityContext';
import { SecurityAlert } from '../../types/security';

export default function SecurityAlerts() {
  const { alerts, resolveAlert } = useSecurity();
  const [selectedAlert, setSelectedAlert] = useState<SecurityAlert | null>(null);

  const handleResolve = async (alertId: string) => {
    try {
      await resolveAlert(alertId, 'Manually resolved by admin');
    } catch (error) {
      console.error('Failed to resolve alert:', error);
    }
  };

  const getAlertIcon = (level: string) => {
    switch (level) {
      case 'critical':
        return AlertTriangle;
      case 'high':
        return Shield;
      default:
        return Activity;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-medium text-white mb-6">Security Alerts</h3>
      
      <div className="space-y-4">
        {alerts.map((alert) => {
          const Icon = getAlertIcon(alert.level);
          
          return (
            <div
              key={alert.id}
              className="flex items-start space-x-4 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
              onClick={() => setSelectedAlert(alert)}
            >
              <div className={`p-2 rounded-lg ${
                alert.level === 'critical' ? 'bg-red-500/10' :
                alert.level === 'high' ? 'bg-yellow-500/10' :
                'bg-cyan-500/10'
              }`}>
                <Icon className={`h-5 w-5 ${
                  alert.level === 'critical' ? 'text-red-500' :
                  alert.level === 'high' ? 'text-yellow-500' :
                  'text-cyan-500'
                }`} />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-white">{alert.title}</h4>
                    <p className="text-sm text-gray-400">{alert.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.status === 'active' ? 'bg-red-500/10 text-red-500' :
                      alert.status === 'investigating' ? 'bg-yellow-500/10 text-yellow-500' :
                      'bg-green-500/10 text-green-500'
                    }`}>
                      {alert.status}
                    </span>
                    {alert.status === 'active' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleResolve(alert.id);
                        }}
                        className="p-1 hover:bg-gray-500 rounded"
                      >
                        <Check className="h-4 w-4 text-green-500" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-2 text-sm text-gray-400">
                  Detected {new Date(alert.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-white">Alert Details</h3>
              <button
                onClick={() => setSelectedAlert(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400">Description</h4>
                <p className="text-white">{selectedAlert.description}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-400">Affected Systems</h4>
                <ul className="mt-2 space-y-2">
                  {selectedAlert.affectedSystems.map((system, index) => (
                    <li key={index} className="text-white">{system}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-400">Recommendations</h4>
                <ul className="mt-2 space-y-2">
                  {selectedAlert.recommendations.map((rec, index) => (
                    <li key={index} className="text-white">{rec}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setSelectedAlert(null)}
                className="px-4 py-2 text-gray-400 hover:text-white"
              >
                Close
              </button>
              {selectedAlert.status === 'active' && (
                <button
                  onClick={() => handleResolve(selectedAlert.id)}
                  className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400"
                >
                  Mark as Resolved
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}