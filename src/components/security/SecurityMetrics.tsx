import React from 'react';
import { Shield, AlertTriangle, Activity, Lock } from 'lucide-react';
import { SecurityDashboardStats } from '../../types/security';

interface SecurityMetricsProps {
  stats: SecurityDashboardStats;
}

export default function SecurityMetrics({ stats }: SecurityMetricsProps) {
  const metrics = [
    {
      title: 'Active Alerts',
      value: stats.activeAlerts,
      icon: AlertTriangle,
      color: 'red',
      trend: '+5%'
    },
    {
      title: 'Security Score',
      value: `${stats.securityScore}%`,
      icon: Shield,
      color: 'cyan',
      trend: '-2%'
    },
    {
      title: 'Patch Compliance',
      value: `${stats.patchCompliance}%`,
      icon: Activity,
      color: 'green',
      trend: '+3%'
    },
    {
      title: 'Critical Vulnerabilities',
      value: stats.criticalVulnerabilities,
      icon: Lock,
      color: 'yellow',
      trend: '-8%'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">{metric.title}</p>
              <p className="text-2xl font-bold text-white">{metric.value}</p>
              <p className={`text-sm ${
                metric.trend.startsWith('+') ? 'text-red-500' : 'text-green-500'
              }`}>
                {metric.trend} from last month
              </p>
            </div>
            <div className={`p-3 bg-${metric.color}-500/10 rounded-lg`}>
              <metric.icon className={`h-6 w-6 text-${metric.color}-500`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}