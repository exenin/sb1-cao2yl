import { useState, useEffect } from 'react';
import { 
  SystemMetrics, 
  Service, 
  ResourceUsage, 
  PerformanceAlert 
} from '../types/infrastructure';

export function useInfrastructure() {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    serverHealth: 95,
    databaseLoad: 65,
    networkTraffic: 150,
    storageUsage: 72
  });

  const [services, setServices] = useState<Service[]>([
    {
      id: 'web-server',
      name: 'Web Server',
      description: 'Main application server',
      status: 'running',
      uptime: '15d 4h 23m'
    },
    {
      id: 'database',
      name: 'Database Server',
      description: 'Primary database instance',
      status: 'running',
      uptime: '30d 12h 45m'
    },
    {
      id: 'cache',
      name: 'Cache Server',
      description: 'Redis cache instance',
      status: 'warning',
      uptime: '5d 18h 12m'
    }
  ]);

  const [resources, setResources] = useState<ResourceUsage>({
    cpu: {
      trend: 'stable',
      cores: Array(8).fill(0).map(() => ({
        usage: Math.floor(Math.random() * 100)
      }))
    },
    memory: {
      trend: 'up',
      total: 32,
      used: 24,
      available: 8,
      cached: 4,
      usage: 75
    },
    storage: {
      trend: 'up',
      volumes: [
        {
          name: 'System Drive',
          total: 500,
          used: 350,
          usage: 70
        },
        {
          name: 'Data Drive',
          total: 1000,
          used: 800,
          usage: 80
        }
      ]
    },
    network: {
      trend: 'up',
      inbound: 75,
      outbound: 45,
      connections: 1250
    }
  });

  const [alerts, setAlerts] = useState<PerformanceAlert[]>([
    {
      id: 'alert-1',
      severity: 'warning',
      title: 'High CPU Usage',
      description: 'CPU usage has exceeded 80% for the last 5 minutes',
      timestamp: new Date().toISOString(),
      metrics: {
        'CPU Usage': '85%',
        'Process Count': '245',
        'Load Average': '4.52'
      }
    },
    {
      id: 'alert-2',
      severity: 'critical',
      title: 'Low Disk Space',
      description: 'Data drive is running low on available space',
      timestamp: new Date().toISOString(),
      metrics: {
        'Free Space': '50 GB',
        'Total Size': '500 GB',
        'Usage': '90%'
      }
    }
  ]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInfrastructureData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load infrastructure data');
        setIsLoading(false);
      }
    };

    loadInfrastructureData();

    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        serverHealth: Math.max(0, Math.min(100, prev.serverHealth + (Math.random() * 2 - 1))),
        databaseLoad: Math.max(0, Math.min(100, prev.databaseLoad + (Math.random() * 2 - 1))),
        networkTraffic: Math.max(0, prev.networkTraffic + (Math.random() * 10 - 5)),
        storageUsage: Math.max(0, Math.min(100, prev.storageUsage + (Math.random() * 2 - 1)))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const restartService = async (serviceId: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setServices(prev => prev.map(service => 
        service.id === serviceId
          ? { ...service, status: 'running', uptime: '0m' }
          : service
      ));
    } catch (err) {
      setError('Failed to restart service');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    metrics,
    services,
    resources,
    alerts,
    isLoading,
    error,
    restartService
  };
}