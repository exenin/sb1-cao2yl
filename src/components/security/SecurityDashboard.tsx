import React from 'react';
import { Shield, AlertTriangle, Activity, Lock } from 'lucide-react';
import SecurityMetrics from './SecurityMetrics';
import SecurityAlerts from './SecurityAlerts';
import SecurityScanner from './SecurityScanner';
import ComplianceStatus from './ComplianceStatus';
import { useSecurity } from '../../contexts/SecurityContext';

export default function SecurityDashboard() {
  const { dashboardStats, isLoading } = useSecurity();

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
          <h2 className="text-2xl font-bold text-white">Security Dashboard</h2>
          <p className="text-gray-400">Monitor and manage system security</p>
        </div>
      </div>

      <SecurityMetrics stats={dashboardStats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SecurityAlerts />
        <ComplianceStatus />
      </div>

      <SecurityScanner />
    </div>
  );
}