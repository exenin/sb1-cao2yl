import React from 'react';
import { AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';
import { useInfrastructure } from '../../hooks/useInfrastructure';

export default function PerformanceAlerts() {
  const { alerts } = useInfrastructure();

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-medium text-white mb-6">Performance Alerts</h3>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start space-x-4 p-4 bg-gray-700 rounded-lg"
          >
            <div className={`p-2 rounded-lg ${
              alert.severity === 'critical' ? 'bg-red-500/10' :
              alert.severity === 'warning' ? 'bg-yellow-500/10' :
              'bg-green-500/10'
            }`}>
              {getAlertIcon(alert.severity)}
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-white">{alert.title}</h4>
                  <p className="text-sm text-gray-400">{alert.description}</p>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Clock className="h-4 w-4 mr-1" />
                  {new Date(alert.timestamp).toLocaleTimeString()}
                </div>
              </div>

              {alert.metrics && (
                <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                  {Object.entries(alert.metrics).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-gray-400">{key}</p>
                      <p className="text-white">{value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}