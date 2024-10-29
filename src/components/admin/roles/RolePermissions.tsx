import React, { useState } from 'react';
import { Shield, Plus, X } from 'lucide-react';
import { useRBAC } from '../../../contexts/RBACContext';
import { Role, Permission } from '../../../types/auth';
import PermissionList from './PermissionList';

interface RolePermissionsProps {
  role: Role;
  onClose: () => void;
}

export default function RolePermissions({ role, onClose }: RolePermissionsProps) {
  const { permissions, assignPermissions, revokePermissions } = useRBAC();
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    role.permissions.map(p => p.id)
  );

  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissions(prev => {
      if (prev.includes(permissionId)) {
        return prev.filter(id => id !== permissionId);
      }
      return [...prev, permissionId];
    });
  };

  const handleSave = async () => {
    try {
      const currentPermissionIds = role.permissions.map(p => p.id);
      const permissionsToAdd = selectedPermissions.filter(
        id => !currentPermissionIds.includes(id)
      );
      const permissionsToRemove = currentPermissionIds.filter(
        id => !selectedPermissions.includes(id)
      );

      if (permissionsToAdd.length > 0) {
        await assignPermissions(role.id, permissionsToAdd);
      }
      if (permissionsToRemove.length > 0) {
        await revokePermissions(role.id, permissionsToRemove);
      }
      onClose();
    } catch (error) {
      console.error('Failed to update permissions:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-cyan-500" />
            <h3 className="text-lg font-semibold text-white">
              Manage Permissions for {role.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <PermissionList
          permissions={permissions}
          selectedPermissions={selectedPermissions}
          onToggle={handlePermissionToggle}
        />

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400"
          >
            Save Permissions
          </button>
        </div>
      </div>
    </div>
  );
}