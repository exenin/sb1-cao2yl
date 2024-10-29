import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface Activity {
  id: string;
  type: 'security' | 'user' | 'system' | 'data';
  description: string;
  user: {
    id: string;
    name: string;
    role: string;
  };
  timestamp: string;
  location: string;
  metadata?: Record<string, any>;
}

export function useActivity() {
  const { user } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadActivities = async () => {
      if (!user) return;

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock activities data
        const mockActivities: Activity[] = [
          {
            id: '1',
            type: 'security',
            description: 'Failed login attempt detected',
            user: {
              id: user.id,
              name: user.name,
              role: user.roleId
            },
            timestamp: new Date().toISOString(),
            location: 'Cape Town, ZA',
            metadata: {
              ip: '192.168.1.1',
              attempts: 3,
              browser: 'Chrome'
            }
          },
          {
            id: '2',
            type: 'user',
            description: 'User profile updated',
            user: {
              id: user.id,
              name: user.name,
              role: user.roleId
            },
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            location: 'Johannesburg, ZA'
          },
          // Add more mock activities...
        ];

        setActivities(mockActivities);
      } catch (err) {
        setError('Failed to load activities');
      } finally {
        setIsLoading(false);
      }
    };

    loadActivities();
  }, [user]);

  const logActivity = async (data: Omit<Activity, 'id' | 'timestamp' | 'user'>) => {
    if (!user) return;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const newActivity: Activity = {
        id: `activity_${Date.now()}`,
        timestamp: new Date().toISOString(),
        user: {
          id: user.id,
          name: user.name,
          role: user.roleId
        },
        ...data
      };

      setActivities(prev => [newActivity, ...prev]);
    } catch (err) {
      setError('Failed to log activity');
      throw err;
    }
  };

  return {
    activities,
    isLoading,
    error,
    logActivity
  };
}