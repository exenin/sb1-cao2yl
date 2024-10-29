import React from 'react';
import { Shield } from 'lucide-react';
import { Permission } from '../../../types/auth';

interface PermissionListProps {
  permissions: Permission[];
  selectedPermissions: string[];
  onToggle: (permissionId: string) => void;
}

export default function PermissionList({
  permissions,
  selectedPermissions,
  onToggle
}: PermissionListProps) {
  const groupedPermissions = permissions.reduce((groups, permission) => {
    const category = permission.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(permission);
    return groups;
  }, {} as Record<string, Permission[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
        <div key={category}>
          <h4 className="text-sm font-medium text-gray-400 mb-3 capitalize">
            {category}
          </h4>
          <div className="space-y-2">
            {categoryPermissions.map((permission) => (
              <label
                key={permission.id}
                className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600"
              >
                <input
                  type="checkbox"
                  checked={selectedPermissions.includes(permission.id)}
                  onChange={() => onToggle(permission.id)}
                  className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500 bg-gray-700"
                />
                <div className="flex items-center space-x-3">
                  <Shield className="h-4 w-4 text-cyan-500" />
                  <div>
                    <p className="text-white font-medium">{permission.name}</p>
                    <p className="text-sm text-gray-400">{permission.description}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}