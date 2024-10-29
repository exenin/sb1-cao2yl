import React, { useState } from 'react';
import { 
  CheckCircle, XCircle, AlertCircle, Clock, 
  RefreshCw, Play, Pause 
} from 'lucide-react';
import { useInfrastructure } from '../../hooks/useInfrastructure';
import { Service } from '../../types/infrastructure';

export default function ServiceStatus() {
  const { services, restartService } = useInfrastructure();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleRestart = async (serviceId: string) => {
    try {
      await restartService(serviceId);
    } catch (error) {
      console.error('Failed to restart service:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'stopped':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-medium text-white mb-6">Service Status</h3>
      
      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-center space-x-4">
              {getStatusIcon(service.status)}
              <div>
                <h4 className="font-medium text-white">{service.name}</h4>
                <p className="text-sm text-gray-400">{service.description}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">Uptime</p>
                <p className="text-white">{service.uptime}</p>
              </div>

              {service.status === 'running' ? (
                <button
                  onClick={() => handleRestart(service.id)}
                  className="p-2 hover:bg-gray-500 rounded-lg"
                  title="Restart Service"
                >
                  <RefreshCw className="h-5 w-5 text-cyan-500" />
                </button>
              ) : (
                <button
                  onClick={() => handleRestart(service.id)}
                  className="p-2 hover:bg-gray-500 rounded-lg"
                  title="Start Service"
                >
                  <Play className="h-5 w-5 text-green-500" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}