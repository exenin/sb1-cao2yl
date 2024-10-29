import React from 'react';
import { Edit2, Trash2, Shield, Users } from 'lucide-react';
import { useRBAC } from '../../../contexts/RBACContext';
import { Role } from '../../../types/auth';

interface RoleListProps {
  onEdit: (role: Role) => void;
}

export default function RoleList({ onEdit }: RoleListProps) {
  const { roles, deleteRole } = useRBAC();

  const handleDelete = async (roleId: string) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      try {
        await deleteRole(roleId);
      } catch (error) {
        console.error('Failed to delete role:', error);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {roles.map((role) => (
        <div key={role.id} className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <Shield className="h-5 w-5 text-cyan-500" />
              </div>
              <h3 className="text-lg font-semibold text-white">{role.name}</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onEdit(role)}
                className="p-2 hover:bg-gray-700 rounded-lg"
              >
                <Edit2 className="h-4 w-4 text-gray-400" />
              </button>
              <button
                onClick={() => handleDelete(role.id)}
                className="p-2 hover:bg-gray-700 rounded-lg"
              >
                <Trash2 className="h-4 w-4 text-red-400" />
              </button>
            </div>
          </div>

          <p className="text-gray-400 mb-4">{role.description}</p>

          <div className="space-y-4">
            <div className="flex items-center text-gray-400">
              <Users className="h-4 w-4 mr-2" />
              <span>Base Role: {role.baseRole}</span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Permissions</h4>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((permission) => (
                  <span
                    key={permission.id}
                    className="px-2 py-1 bg-gray-700 rounded-full text-xs text-cyan-500"
                  >
                    {permission.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}