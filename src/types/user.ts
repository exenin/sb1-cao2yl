import { Role } from './auth';

export interface UserStatus {
  isActive: boolean;
  lastLogin?: string;
  loginCount: number;
  failedLoginAttempts: number;
  isSuspended: boolean;
  suspendedReason?: string;
  suspendedUntil?: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  company?: string;
  position?: string;
  department?: string;
  location?: string;
  timezone: string;
  language: string;
}

export interface UserPermission {
  id: string;
  name: string;
  description: string;
  group: string;
}

export interface User {
  id: string;
  email: string;
  role: Role;
  permissions: string[];
  profile: UserProfile;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  lastPasswordChange?: string;
  requiresPasswordChange: boolean;
  twoFactorEnabled: boolean;
}