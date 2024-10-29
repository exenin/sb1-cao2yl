import React, { createContext, useContext, useState, useEffect } from 'react';
import { Role, Permission, User } from '../types/auth';
import { useAuth } from './AuthContext';

interface RBACContextType {
  roles: Role[];
  permissions: Permission[];
  createRole: (data: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Role>;
  updateRole: (id: string, data: Partial<Role>) => Promise<Role>;
  deleteRole: (id: string) => Promise<void>;
  assignRole: (userId: string, roleId: string) => Promise<void>;
  assignPermissions: (roleId: string, permissionIds: string[]) => Promise<void>;
  revokePermissions: (roleId: string, permissionIds: string[]) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const defaultPermissions: Permission[] = [
  {
    id: 'users:manage',
    name: 'Manage Users',
    description: 'Create, update, and delete users',
    category: 'users',
    action: 'manage',
    resource: 'users'
  },
  {
    id: 'projects:manage',
    name: 'Manage Projects',
    description: 'Full access to projects',
    category: 'projects',
    action: 'manage',
    resource: 'projects'
  },
  {
    id: 'security:manage',
    name: 'Manage Security',
    description: 'Access to security features',
    category: 'security',
    action: 'manage',
    resource: 'security'
  },
  // Add more default permissions...
];

const defaultRoles: Role[] = [
  {
    id: 'admin',
    name: 'Administrator',
    baseRole: 'admin',
    permissions: defaultPermissions,
    description: 'Full system access',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'manager',
    name: 'Project Manager',
    baseRole: 'manager',
    permissions: defaultPermissions.filter(p => 
      ['projects:manage', 'users:read'].includes(p.id)
    ),
    description: 'Manage projects and teams',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  // Add more default roles...
];

const RBACContext = createContext<RBACContextType | undefined>(undefined);

export function RBACProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [roles, setRoles] = useState<Role[]>(defaultRoles);
  const [permissions, setPermissions] = useState<Permission[]>(defaultPermissions);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRBAC = async () => {
      try {
        // In a real app, fetch roles and permissions from API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRoles(defaultRoles);
        setPermissions(defaultPermissions);
      } catch (err) {
        setError('Failed to load RBAC data');
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      loadRBAC();
    }
  }, [user]);

  const createRole = async (data: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newRole: Role = {
        ...data,
        id: `role_${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setRoles(prev => [...prev, newRole]);
      return newRole;
    } catch (err) {
      setError('Failed to create role');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateRole = async (id: string, data: Partial<Role>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedRole = {
        ...roles.find(r => r.id === id)!,
        ...data,
        updatedAt: new Date().toISOString()
      };

      setRoles(prev => prev.map(role => 
        role.id === id ? updatedRole : role
      ));

      return updatedRole;
    } catch (err) {
      setError('Failed to update role');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRole = async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRoles(prev => prev.filter(role => role.id !== id));
    } catch (err) {
      setError('Failed to delete role');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const assignRole = async (userId: string, roleId: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, update user's role in the backend
    } catch (err) {
      setError('Failed to assign role');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const assignPermissions = async (roleId: string, permissionIds: string[]) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRoles(prev => prev.map(role => {
        if (role.id === roleId) {
          const newPermissions = [
            ...role.permissions,
            ...permissions.filter(p => permissionIds.includes(p.id))
          ];
          return { ...role, permissions: newPermissions };
        }
        return role;
      }));
    } catch (err) {
      setError('Failed to assign permissions');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const revokePermissions = async (roleId: string, permissionIds: string[]) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRoles(prev => prev.map(role => {
        if (role.id === roleId) {
          const newPermissions = role.permissions.filter(
            p => !permissionIds.includes(p.id)
          );
          return { ...role, permissions: newPermissions };
        }
        return role;
      }));
    } catch (err) {
      setError('Failed to revoke permissions');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RBACContext.Provider value={{
      roles,
      permissions,
      createRole,
      updateRole,
      deleteRole,
      assignRole,
      assignPermissions,
      revokePermissions,
      isLoading,
      error
    }}>
      {children}
    </RBACContext.Provider>
  );
}

export function useRBAC() {
  const context = useContext(RBACContext);
  if (context === undefined) {
    throw new Error('useRBAC must be used within a RBACProvider');
  }
  return context;
}