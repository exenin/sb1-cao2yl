import React, { useState } from 'react';
import { 
  Search, Filter, Edit2, Trash2, Shield, 
  UserPlus, Mail, Check, X, MoreVertical,
  Lock, AlertTriangle, Ban
} from 'lucide-react';
import { User, Role } from '../../../types/user';
import { useAdmin } from '../../../contexts/AdminContext';
import UserActions from './UserActions';
import UserFilters from './UserFilters';

export default function UserList() {
  const { users, deleteUser, isLoading } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showActions, setShowActions] = useState<string | null>(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.profile.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.profile.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && user.status.isActive) ||
      (statusFilter === 'inactive' && !user.status.isActive) ||
      (statusFilter === 'suspended' && user.status.isSuspended);
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        setShowActions(null);
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const getStatusIcon = (user: User) => {
    if (user.status.isSuspended) return <Ban className="h-4 w-4 text-red-500" />;
    if (!user.status.isActive) return <X className="h-4 w-4 text-gray-400" />;
    if (user.requiresPasswordChange) return <Lock className="h-4 w-4 text-yellow-500" />;
    if (!user.twoFactorEnabled) return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    return <Check className="h-4 w-4 text-green-500" />;
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
      <UserFilters
        searchTerm={searchTerm}
        roleFilter={roleFilter}
        statusFilter={statusFilter}
        onSearchChange={setSearchTerm}
        onRoleChange={setRoleFilter}
        onStatusChange={setStatusFilter}
      />

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="py-3 px-4 text-gray-400 font-medium">User</th>
                <th className="py-3 px-4 text-gray-400 font-medium">Role</th>
                <th className="py-3 px-4 text-gray-400 font-medium">Status</th>
                <th className="py-3 px-4 text-gray-400 font-medium">Last Login</th>
                <th className="py-3 px-4 text-gray-400 font-medium">2FA</th>
                <th className="py-3 px-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {user.profile.avatar ? (
                        <img
                          src={user.profile.avatar}
                          alt={`${user.profile.firstName} ${user.profile.lastName}`}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-cyan-500 flex items-center justify-center">
                          <span className="text-black font-medium">
                            {user.profile.firstName[0]}
                          </span>
                        </div>
                      )}
                      <div className="ml-3">
                        <p className="text-white font-medium">
                          {user.profile.firstName} {user.profile.lastName}
                        </p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin'
                        ? 'bg-purple-500/10 text-purple-500'
                        : 'bg-cyan-500/10 text-cyan-500'
                    }`}>
                      {user.role.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(user)}
                      <span className={`text-sm ${
                        user.status.isSuspended ? 'text-red-500' :
                        !user.status.isActive ? 'text-gray-400' :
                        'text-green-500'
                      }`}>
                        {user.status.isSuspended ? 'Suspended' :
                         user.status.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-400">
                    {user.status.lastLogin ? (
                      new Date(user.status.lastLogin).toLocaleString()
                    ) : (
                      'Never'
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {user.twoFactorEnabled ? (
                      <Shield className="h-4 w-4 text-green-500" />
                    ) : (
                      <Shield className="h-4 w-4 text-gray-400" />
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="relative">
                      <button
                        onClick={() => setShowActions(showActions === user.id ? null : user.id)}
                        className="p-2 hover:bg-gray-600 rounded-lg"
                      >
                        <MoreVertical className="h-4 w-4 text-gray-400" />
                      </button>
                      
                      {showActions === user.id && (
                        <UserActions
                          user={user}
                          onClose={() => setShowActions(null)}
                          onDelete={() => handleDeleteUser(user.id)}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}