export interface SystemMetrics {
  serverHealth: number;
  databaseLoad: number;
  networkTraffic: number;
  storageUsage: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  status: 'running' | 'stopped' | 'warning';
  uptime: string;
}

export interface ResourceUsage {
  cpu: {
    trend: 'up' | 'down' | 'stable';
    cores: Array<{
      usage: number;
    }>;
  };
  memory: {
    trend: 'up' | 'down' | 'stable';
    total: number;
    used: number;
    available: number;
    cached: number;
    usage: number;
  };
  storage: {
    trend: 'up' | 'down' | 'stable';
    volumes: Array<{
      name: string;
      total: number;
      used: number;
      usage: number;
    }>;
  };
  network: {
    trend: 'up' | 'down' | 'stable';
    inbound: number;
    outbound: number;
    connections: number;
  };
}

export interface PerformanceAlert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: string;
  metrics?: Record<string, string>;
}