import { ReactNode } from 'react';

export type BaseRole = 'admin' | 'manager' | 'support' | 'developer' | 'client';

export interface Role {
  id: string;
  name: string;
  baseRole: BaseRole;
  permissions: Permission[];
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'users' | 'projects' | 'security' | 'support' | 'billing' | 'system';
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
  resource: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  roleId: string;
  permissions: string[];
  profile: UserProfile;
  status: UserStatus;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  twoFactorEnabled: boolean;
  requiresPasswordChange: boolean;
}

export interface UserProfile {
  avatar?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  position?: string;
  department?: string;
  location?: string;
  timezone: string;
  bio?: string;
}

export interface UserStatus {
  isActive: boolean;
  isSuspended: boolean;
  suspendedReason?: string;
  suspendedUntil?: string;
  failedLoginAttempts: number;
  lastPasswordChange: string;
}

export interface AuthContextType {
  user: User | null;
  role: Role | null;
  permissions: Permission[];
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  hasRole: (roleId: string) => boolean;
}

export interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermissions?: string[];
  requiredRoles?: string[];
}