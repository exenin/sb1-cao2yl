import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAdmin } from '../../../contexts/AdminContext';
import UserList from './UserList';
import UserEditor from './UserEditor';
import { User } from '../../../types/auth';

export default function UserManagement() {
  const { isLoading } = useAdmin();
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [showEditor, setShowEditor] = useState(false);

  const handleCreateNew = () => {
    setSelectedUser(undefined);
    setShowEditor(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowEditor(true);
  };

  const handleSave = () => {
    setShowEditor(false);
    setSelectedUser(undefined);
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
          <h2 className="text-2xl font-bold text-white">User Management</h2>
          <p className="text-gray-400">Manage system users and their roles</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </button>
      </div>

      {showEditor ? (
        <UserEditor
          user={selectedUser}
          onSave={handleSave}
          onCancel={() => setShowEditor(false)}
        />
      ) : (
        <UserList onEdit={handleEdit} />
      )}
    </div>
  );
}