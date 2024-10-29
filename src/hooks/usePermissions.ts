import { useAuth } from '../contexts/AuthContext';
import { Permission } from '../types/auth';

export function usePermissions() {
  const { user, permissions } = useAuth();

  const hasPermission = (permissionId: string) => {
    if (!user || !permissions) return false;
    return permissions.some(p => p.id === permissionId);
  };

  const hasAnyPermission = (permissionIds: string[]) => {
    if (!user || !permissions) return false;
    return permissionIds.some(id => hasPermission(id));
  };

  const hasAllPermissions = (permissionIds: string[]) => {
    if (!user || !permissions) return false;
    return permissionIds.every(id => hasPermission(id));
  };

  const getPermissionsByCategory = (category: Permission['category']) => {
    return permissions.filter(p => p.category === category);
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getPermissionsByCategory
  };
}