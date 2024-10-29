import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User } from '../types/auth';

const MOCK_USERS = {
  'customer@example.com': {
    id: '2',
    email: 'customer@example.com',
    password: 'Customer123!',
    role: 'customer_company',
    name: 'Customer User',
    companyId: 'comp_1',
    permissions: ['view_services', 'manage_company_users', 'view_invoices']
  },
  'admin@cyberallstars.com': {
    id: '1',
    email: 'admin@cyberallstars.com',
    password: 'Admin123!',
    role: 'admin',
    name: 'Admin User',
    permissions: ['all']
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const mockUser = MOCK_USERS[email as keyof typeof MOCK_USERS];
    
    if (!mockUser || mockUser.password !== password) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = mockUser;
    const token = btoa(JSON.stringify({ email, timestamp: Date.now() }));
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    
    setUser(userWithoutPassword);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}