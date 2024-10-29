import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/auth';

interface AdminMetrics {
  totalUsers: number;
  activeServices: number;
  monthlyRevenue: number;
  pendingRequests: number;
}

interface AdminContextType {
  metrics: AdminMetrics;
  users: User[];
  isLoading: boolean;
  error: string | null;
  createUser: (userData: Omit<User, 'id'>) => Promise<void>;
  updateUser: (id: string, userData: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  refreshData: () => Promise<void>;
}

const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@cyberallstars.com',
    name: 'Admin User',
    role: 'admin',
    permissions: ['all']
  },
  {
    id: '2',
    email: 'customer@example.com',
    name: 'Customer User',
    role: 'customer_company',
    companyId: 'comp_1',
    permissions: ['view_services', 'manage_company_users', 'view_invoices']
  }
];

const mockMetrics: AdminMetrics = {
  totalUsers: 150,
  activeServices: 85,
  monthlyRevenue: 250000,
  pendingRequests: 12
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [metrics, setMetrics] = useState<AdminMetrics>(mockMetrics);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMetrics(mockMetrics);
      setUsers(mockUsers);
    } catch (err) {
      setError('Failed to load admin data');
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async (userData: Omit<User, 'id'>) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newUser: User = {
        ...userData,
        id: `user_${Date.now()}`
      };
      setUsers(prev => [...prev, newUser]);
    } catch (err) {
      setError('Failed to create user');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (id: string, userData: Partial<User>) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers(prev => 
        prev.map(user => user.id === id ? { ...user, ...userData } : user)
      );
    } catch (err) {
      setError('Failed to update user');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (err) {
      setError('Failed to delete user');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <AdminContext.Provider value={{
      metrics,
      users,
      isLoading,
      error,
      createUser,
      updateUser,
      deleteUser,
      refreshData
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}