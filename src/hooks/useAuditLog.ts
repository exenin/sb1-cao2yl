import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useActivity } from './useActivity';

interface AuditLogEntry {
  id: string;
  action: string;
  resource: string;
  userId: string;
  userName: string;
  userRole: string;
  timestamp: string;
  details: Record<string, any>;
  status: 'success' | 'failure';
}

export function useAuditLog() {
  const { user } = useAuth();
  const { logActivity } = useActivity();
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAuditLogs = async () => {
      if (!user) return;

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock audit logs
        const mockLogs: AuditLogEntry[] = [
          {
            id: '1',
            action: 'create',
            resource: 'user',
            userId: user.id,
            userName: user.name,
            userRole: user.roleId,
            timestamp: new Date().toISOString(),
            details: {
              newUser: {
                email: 'newuser@example.com',
                role: 'customer_company'
              }
            },
            status: 'success'
          },
          // Add more mock logs...
        ];

        setAuditLogs(mockLogs);
      } catch (err) {
        setError('Failed to load audit logs');
      } finally {
        setIsLoading(false);
      }
    };

    loadAuditLogs();
  }, [user]);

  const logAuditEntry = async (data: Omit<AuditLogEntry, 'id' | 'timestamp' | 'userId' | 'userName' | 'userRole'>) => {
    if (!user) return;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const newEntry: AuditLogEntry = {
        id: `audit_${Date.now()}`,
        timestamp: new Date().toISOString(),
        userId: user.id,
        userName: user.name,
        userRole: user.roleId,
        ...data
      };

      setAuditLogs(prev => [newEntry, ...prev]);

      // Also log to activity monitor
      await logActivity({
        type: 'system',
        description: `${data.action.toUpperCase()} ${data.resource}`,
        location: 'System',
        metadata: data.details
      });

      return newEntry;
    } catch (err) {
      setError('Failed to create audit log entry');
      throw err;
    }
  };

  const getLogsByResource = (resource: string) => {
    return auditLogs.filter(log => log.resource === resource);
  };

  const getLogsByAction = (action: string) => {
    return auditLogs.filter(log => log.action === action);
  };

  const getLogsByUser = (userId: string) => {
    return auditLogs.filter(log => log.userId === userId);
  };

  return {
    auditLogs,
    isLoading,
    error,
    logAuditEntry,
    getLogsByResource,
    getLogsByAction,
    getLogsByUser
  };
}