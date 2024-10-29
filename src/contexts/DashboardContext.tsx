import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface DashboardMetrics {
  totalServices: number;
  activeRequests: number;
  unpaidInvoices: number;
  monthlySpending: number;
}

interface ActivityItem {
  id: string;
  type: 'service' | 'request' | 'invoice' | 'security';
  title: string;
  description: string;
  timestamp: string;
}

interface DashboardContextType {
  metrics: DashboardMetrics;
  recentActivity: ActivityItem[];
  isLoading: boolean;
  error: string | null;
  refreshDashboard: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalServices: 0,
    activeRequests: 0,
    unpaidInvoices: 0,
    monthlySpending: 0
  });
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshDashboard = async () => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMetrics({
        totalServices: 5,
        activeRequests: 3,
        unpaidInvoices: 2,
        monthlySpending: 15000
      });

      setRecentActivity([
        {
          id: '1',
          type: 'service',
          title: 'Security Package Upgraded',
          description: 'Advanced Security Package activated',
          timestamp: new Date().toISOString()
        },
        {
          id: '2',
          type: 'request',
          title: 'Support Ticket Created',
          description: 'Cloud migration assistance requested',
          timestamp: new Date(Date.now() - 3600000).toISOString()
        }
      ]);
    } catch (err) {
      setError('Failed to refresh dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      refreshDashboard();
    }
  }, [isAuthenticated, user]);

  const value = {
    metrics,
    recentActivity,
    isLoading,
    error,
    refreshDashboard
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}