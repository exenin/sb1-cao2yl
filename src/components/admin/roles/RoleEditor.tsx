import React, { useState } from 'react';
import { Role, Permission, BaseRole } from '../../../types/auth';
import { useRBAC } from '../../../contexts/RBACContext';

interface RoleEditorProps {
  role?: Role;
  onSave: () => void;
  onCancel: () => void;
}

export default function RoleEditor({ role, onSave, onCancel }: RoleEditorProps) {
  const { permissions, createRole, updateRole } = useRBAC();
  const [formData, setFormData] = useState({
    name: role?.name || '',
    description: role?.description || '',
    baseRole: role?.baseRole || 'manager' as BaseRole,
    permissions: role?.permissions.map(p => p.id) || []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (role) {
        await updateRole(role.id, {
          ...formData,
          permissions: permissions.filter(p => formData.permissions.includes(p.id))
        });
      } else {
        await createRole({
          ...formData,
          permissions: permissions.filter(p => formData.permissions.includes(p.id))
        });
      }
      onSave();
    } catch (error) {
      console.error('Failed to save role:', error);
    }
  };

  const handlePermissionToggle = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(id => id !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const groupedPermissions = permissions.reduce((groups, permission) => {
    const category = permission.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(permission);
    return groups;
  }, {} as Record<string, Permission[]>);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">
          {role ? 'Edit Role' : 'Create New Role'}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Role Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Base Role
            </label>
            <select
              value={formData.baseRole}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                baseRole: e.target.value as BaseRole 
              }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="admin">Administrator</option>
              <option value="manager">Manager</option>
              <option value="support">Support</option>
              <option value="developer">Developer</option>
              <option value="client">Client</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Permissions</h3>

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
                      checked={formData.permissions.includes(permission.id)}
                      onChange={() => handlePermissionToggle(permission.id)}
                      className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500 bg-gray-700"
                    />
                    <div>
                      <p className="text-white font-medium">{permission.name}</p>
                      <p className="text-sm text-gray-400">{permission.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-400 hover:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400"
        >
          {role ? 'Update Role' : 'Create Role'}
        </button>
      </div>
    </form>
  );
}