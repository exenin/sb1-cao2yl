import { useAuth } from '../contexts/AuthContext';
import { useRBAC } from '../contexts/RBACContext';
import { Role, Permission } from '../types/auth';

export function useRolePermissions() {
  const { user } = useAuth();
  const { roles, permissions } = useRBAC();

  const getUserRole = (): Role | undefined => {
    if (!user) return undefined;
    return roles.find(role => role.id === user.roleId);
  };

  const getRolePermissions = (roleId: string): Permission[] => {
    const role = roles.find(r => r.id === roleId);
    return role?.permissions || [];
  };

  const hasPermission = (permissionId: string): boolean => {
    if (!user) return false;
    const role = getUserRole();
    if (!role) return false;
    return role.permissions.some(p => p.id === permissionId);
  };

  const hasAnyPermission = (permissionIds: string[]): boolean => {
    if (!user) return false;
    const role = getUserRole();
    if (!role) return false;
    return permissionIds.some(id => 
      role.permissions.some(p => p.id === id)
    );
  };

  const hasAllPermissions = (permissionIds: string[]): boolean => {
    if (!user) return false;
    const role = getUserRole();
    if (!role) return false;
    return permissionIds.every(id => 
      role.permissions.some(p => p.id === id)
    );
  };

  const getPermissionsByCategory = (category: Permission['category']): Permission[] => {
    return permissions.filter(p => p.category === category);
  };

  const canAccessResource = (resource: string, action: Permission['action']): boolean => {
    if (!user) return false;
    const role = getUserRole();
    if (!role) return false;
    return role.permissions.some(p => 
      p.resource === resource && (p.action === action || p.action === 'manage')
    );
  };

  return {
    getUserRole,
    getRolePermissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getPermissionsByCategory,
    canAccessResource
  };
}