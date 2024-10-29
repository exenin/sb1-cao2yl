import React from 'react';
import { Server, Database, Cloud, Activity } from 'lucide-react';
import SystemMetrics from './SystemMetrics';
import ServiceStatus from './ServiceStatus';
import ResourceUsage from './ResourceUsage';
import PerformanceAlerts from './PerformanceAlerts';
import { useInfrastructure } from '../../hooks/useInfrastructure';

export default function InfrastructureDashboard() {
  const { metrics, isLoading } = useInfrastructure();

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-700 rounded-lg"></div>
          ))}
        </div>
        <div className="h-96 bg-gray-700 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Infrastructure Monitor</h2>
          <p className="text-gray-400">Real-time system performance and health</p>
        </div>
      </div>

      <SystemMetrics metrics={metrics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ServiceStatus />
        <PerformanceAlerts />
      </div>

      <ResourceUsage />
    </div>
  );
}