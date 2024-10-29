import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useRBAC } from '../../../contexts/RBACContext';
import RoleList from './RoleList';
import RoleEditor from './RoleEditor';
import { Role } from '../../../types/auth';

export default function RoleManagement() {
  const { isLoading } = useRBAC();
  const [selectedRole, setSelectedRole] = useState<Role | undefined>();
  const [showEditor, setShowEditor] = useState(false);

  const handleCreateNew = () => {
    setSelectedRole(undefined);
    setShowEditor(true);
  };

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setShowEditor(true);
  };

  const handleSave = () => {
    setShowEditor(false);
    setSelectedRole(undefined);
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-700 rounded w-1/4"></div>
        <div className="h-64 bg-gray-700 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Role Management</h2>
          <p className="text-gray-400">Manage user roles and permissions</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Role
        </button>
      </div>

      {showEditor ? (
        <RoleEditor
          role={selectedRole}
          onSave={handleSave}
          onCancel={() => setShowEditor(false)}
        />
      ) : (
        <RoleList onEdit={handleEdit} />
      )}
    </div>
  );
}