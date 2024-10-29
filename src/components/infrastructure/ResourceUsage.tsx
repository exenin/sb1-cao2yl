import React, { useState } from 'react';
import { 
  Cpu, Memory, HardDrive, Network,
  TrendingUp, TrendingDown, AlertTriangle 
} from 'lucide-react';
import { useInfrastructure } from '../../hooks/useInfrastructure';

export default function ResourceUsage() {
  const { resources } = useInfrastructure();
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h');

  const timeframes = [
    { value: '1h', label: '1 Hour' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' }
  ];

  const getUsageColor = (usage: number) => {
    if (usage >= 90) return 'text-red-500';
    if (usage >= 70) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getUsageIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-green-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-white">Resource Usage</h3>
        <div className="flex space-x-2">
          {timeframes.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setSelectedTimeframe(value)}
              className={`px-3 py-1 rounded-lg text-sm ${
                selectedTimeframe === value
                  ? 'bg-cyan-500 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CPU Usage */}
        <div className="p-4 bg-gray-700 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Cpu className="h-5 w-5 text-cyan-500" />
              <h4 className="font-medium text-white">CPU Usage</h4>
            </div>
            {getUsageIcon(resources.cpu.trend)}
          </div>

          <div className="space-y-4">
            {resources.cpu.cores.map((core, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Core {index + 1}</span>
                  <span className={getUsageColor(core.usage)}>
                    {core.usage}%
                  </span>
                </div>
                <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      core.usage >= 90 ? 'bg-red-500' :
                      core.usage >= 70 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${core.usage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Memory Usage */}
        <div className="p-4 bg-gray-700 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Memory className="h-5 w-5 text-purple-500" />
              <h4 className="font-medium text-white">Memory Usage</h4>
            </div>
            {getUsageIcon(resources.memory.trend)}
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Used</span>
                <span className={getUsageColor(resources.memory.usage)}>
                  {resources.memory.used} GB / {resources.memory.total} GB
                </span>
              </div>
              <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    resources.memory.usage >= 90 ? 'bg-red-500' :
                    resources.memory.usage >= 70 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${resources.memory.usage}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Cached</p>
                <p className="text-white">{resources.memory.cached} GB</p>
              </div>
              <div>
                <p className="text-gray-400">Available</p>
                <p className="text-white">{resources.memory.available} GB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Storage Usage */}
        <div className="p-4 bg-gray-700 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <HardDrive className="h-5 w-5 text-yellow-500" />
              <h4 className="font-medium text-white">Storage Usage</h4>
            </div>
            {getUsageIcon(resources.storage.trend)}
          </div>

          <div className="space-y-4">
            {resources.storage.volumes.map((volume, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">{volume.name}</span>
                  <span className={getUsageColor(volume.usage)}>
                    {volume.used} GB / {volume.total} GB
                  </span>
                </div>
                <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      volume.usage >= 90 ? 'bg-red-500' :
                      volume.usage >= 70 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${volume.usage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Network Usage */}
        <div className="p-4 bg-gray-700 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Network className="h-5 w-5 text-green-500" />
              <h4 className="font-medium text-white">Network Usage</h4>
            </div>
            {getUsageIcon(resources.network.trend)}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400 mb-1">Inbound</p>
                <div className="flex items-center space-x-2">
                  <TrendingDown className="h-4 w-4 text-cyan-500" />
                  <span className="text-white">{resources.network.inbound} MB/s</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Outbound</p>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-cyan-500" />
                  <span className="text-white">{resources.network.outbound} MB/s</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-1">Active Connections</p>
              <p className="text-white">{resources.network.connections}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}