import React from 'react';
import { Server, Database, Cloud, Activity } from 'lucide-react';
import { SystemMetrics as Metrics } from '../../types/infrastructure';

interface SystemMetricsProps {
  metrics: Metrics;
}

export default function SystemMetrics({ metrics }: SystemMetricsProps) {
  const cards = [
    {
      title: 'Server Health',
      value: `${metrics.serverHealth}%`,
      icon: Server,
      color: 'cyan',
      trend: metrics.serverHealth > 90 ? '+2%' : '-3%'
    },
    {
      title: 'Database Load',
      value: `${metrics.databaseLoad}%`,
      icon: Database,
      color: 'purple',
      trend: metrics.databaseLoad < 70 ? '-5%' : '+8%'
    },
    {
      title: 'Network Traffic',
      value: `${metrics.networkTraffic} MB/s`,
      icon: Activity,
      color: 'green',
      trend: '+12%'
    },
    {
      title: 'Storage Usage',
      value: `${metrics.storageUsage}%`,
      icon: Cloud,
      color: 'yellow',
      trend: '+3%'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">{card.title}</p>
              <p className="text-2xl font-bold text-white">{card.value}</p>
              <p className={`text-sm ${
                card.trend.startsWith('+') ? 'text-red-500' : 'text-green-500'
              }`}>
                {card.trend} from last hour
              </p>
            </div>
            <div className={`p-3 bg-${card.color}-500/10 rounded-lg`}>
              <card.icon className={`h-6 w-6 text-${card.color}-500`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}