import { Role, Permission, BaseRole } from '../types/auth';

export const roleHierarchy: Record<BaseRole, number> = {
  admin: 100,
  manager: 80,
  developer: 60,
  support: 40,
  client: 20
};

export function isRoleHigherThan(role1: BaseRole, role2: BaseRole): boolean {
  return roleHierarchy[role1] > roleHierarchy[role2];
}

export function isRoleAtLeast(role1: BaseRole, role2: BaseRole): boolean {
  return roleHierarchy[role1] >= roleHierarchy[role2];
}

export function getEffectivePermissions(role: Role): Permission[] {
  // Start with the role's explicit permissions
  const permissions = [...role.permissions];

  // Add implied permissions based on role hierarchy
  if (isRoleAtLeast(role.baseRole, 'admin')) {
    // Admins get all permissions
    return permissions;
  }

  if (isRoleAtLeast(role.baseRole, 'manager')) {
    // Managers get project and team management permissions
    permissions.push(
      ...permissions.filter(p => 
        p.category === 'projects' || 
        p.category === 'users'
      )
    );
  }

  if (isRoleAtLeast(role.baseRole, 'developer')) {
    // Developers get technical permissions
    permissions.push(
      ...permissions.filter(p => 
        p.category === 'projects' && 
        ['read', 'update'].includes(p.action)
      )
    );
  }

  if (isRoleAtLeast(role.baseRole, 'support')) {
    // Support gets customer-facing permissions
    permissions.push(
      ...permissions.filter(p => 
        p.category === 'support' || 
        (p.category === 'projects' && p.action === 'read')
      )
    );
  }

  // Remove duplicates
  return Array.from(new Set(permissions));
}

export function mergePermissions(permissions: Permission[]): Permission[] {
  const mergedPermissions: Record<string, Permission> = {};

  permissions.forEach(permission => {
    const key = `${permission.category}:${permission.resource}`;
    
    if (!mergedPermissions[key] || permission.action === 'manage') {
      mergedPermissions[key] = permission;
    } else if (mergedPermissions[key].action !== 'manage') {
      // Combine actions if not already "manage"
      const actions = new Set([
        mergedPermissions[key].action,
        permission.action
      ]);
      
      if (actions.size >= 3) { // If has create, read, update - upgrade to manage
        mergedPermissions[key] = {
          ...permission,
          action: 'manage'
        };
      }
    }
  });

  return Object.values(mergedPermissions);
}

export function validateRoleConfiguration(role: Role): string[] {
  const errors: string[] = [];

  // Check required fields
  if (!role.name) errors.push('Role name is required');
  if (!role.baseRole) errors.push('Base role is required');
  if (!role.permissions?.length) errors.push('Role must have at least one permission');

  // Check permission conflicts
  const permissionMap = new Map<string, Permission>();
  role.permissions.forEach(permission => {
    const key = `${permission.category}:${permission.resource}`;
    if (permissionMap.has(key)) {
      errors.push(`Duplicate permission for ${key}`);
    }
    permissionMap.set(key, permission);
  });

  // Check role hierarchy consistency
  if (role.baseRole === 'client' && role.permissions.some(p => p.action === 'manage')) {
    errors.push('Client roles cannot have manage permissions');
  }

  return errors;
}