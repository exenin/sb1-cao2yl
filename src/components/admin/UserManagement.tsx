import React, { useState } from 'react';
import { 
  Search, Filter, Plus, Edit2, Trash2, Shield, 
  UserPlus, Mail, Check, X 
} from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { User, Role } from '../../types/auth';

export default function UserManagement() {
  const { users, createUser, updateUser, deleteUser, isLoading } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    role: 'customer_company' as Role,
    companyId: ''
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, newUserData);
      } else {
        await createUser(newUserData);
      }
      setShowAddModal(false);
      setSelectedUser(null);
      setNewUserData({
        name: '',
        email: '',
        role: 'customer_company',
        companyId: ''
      });
    } catch (error) {
      console.error('Failed to save user:', error);
    }
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
        <h2 className="text-2xl font-bold text-white">User Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 w-full bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            className="pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none cursor-pointer"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="customer_company">Customer Company</option>
            <option value="customer_employee">Customer Employee</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="py-3 px-4 text-gray-400 font-medium">Name</th>
                <th className="py-3 px-4 text-gray-400 font-medium">Email</th>
                <th className="py-3 px-4 text-gray-400 font-medium">Role</th>
                <th className="py-3 px-4 text-gray-400 font-medium">Status</th>
                <th className="py-3 px-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-cyan-500 flex items-center justify-center">
                        <span className="text-black font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="ml-3 text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-white">{user.email}</td>
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
                    <span className="flex items-center text-green-500">
                      <Check className="h-4 w-4 mr-1" />
                      Active
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setNewUserData({
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            companyId: user.companyId || ''
                          });
                          setShowAddModal(true);
                        }}
                        className="p-2 hover:bg-gray-600 rounded-lg"
                      >
                        <Edit2 className="h-4 w-4 text-gray-400" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 hover:bg-gray-600 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">
                {selectedUser ? 'Edit User' : 'Add New User'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setSelectedUser(null);
                  setNewUserData({
                    name: '',
                    email: '',
                    role: 'customer_company',
                    companyId: ''
                  });
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={newUserData.name}
                  onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Role
                </label>
                <select
                  value={newUserData.role}
                  onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value as Role })}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="customer_company">Customer Company</option>
                  <option value="customer_employee">Customer Employee</option>
                </select>
              </div>

              {(newUserData.role === 'customer_company' || newUserData.role === 'customer_employee') && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Company ID
                  </label>
                  <input
                    type="text"
                    value={newUserData.companyId}
                    onChange={(e) => setNewUserData({ ...newUserData, companyId: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  />
                </div>
              )}

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setSelectedUser(null);
                    setNewUserData({
                      name: '',
                      email: '',
                      role: 'customer_company',
                      companyId: ''
                    });
                  }}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400"
                >
                  {selectedUser ? 'Update User' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}