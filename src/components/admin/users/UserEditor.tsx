import React, { useState } from 'react';
import { User, Role } from '../../../types/auth';
import { useAdmin } from '../../../contexts/AdminContext';
import { useRBAC } from '../../../contexts/RBACContext';

interface UserEditorProps {
  user?: User;
  onSave: () => void;
  onCancel: () => void;
}

export default function UserEditor({ user, onSave, onCancel }: UserEditorProps) {
  const { createUser, updateUser } = useAdmin();
  const { roles } = useRBAC();
  
  const [formData, setFormData] = useState({
    email: user?.email || '',
    name: user?.name || '',
    roleId: user?.roleId || '',
    profile: {
      firstName: user?.profile.firstName || '',
      lastName: user?.profile.lastName || '',
      phone: user?.profile.phone || '',
      position: user?.profile.position || '',
      department: user?.profile.department || '',
      location: user?.profile.location || '',
      timezone: user?.profile.timezone || 'UTC',
      bio: user?.profile.bio || ''
    },
    status: {
      isActive: user?.status.isActive ?? true,
      isSuspended: user?.status.isSuspended ?? false,
      suspendedReason: user?.status.suspendedReason || '',
      failedLoginAttempts: user?.status.failedLoginAttempts ?? 0,
      lastPasswordChange: user?.status.lastPasswordChange || new Date().toISOString()
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (user) {
        await updateUser(user.id, formData);
      } else {
        await createUser(formData);
      }
      onSave();
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">
          {user ? 'Edit User' : 'Create New User'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Role
            </label>
            <select
              value={formData.roleId}
              onChange={(e) => setFormData(prev => ({ ...prev, roleId: e.target.value }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            >
              <option value="">Select Role</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              First Name
            </label>
            <input
              type="text"
              value={formData.profile.firstName}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                profile: { ...prev.profile, firstName: e.target.value }
              }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={formData.profile.lastName}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                profile: { ...prev.profile, lastName: e.target.value }
              }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.profile.phone}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                profile: { ...prev.profile, phone: e.target.value }
              }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Position
            </label>
            <input
              type="text"
              value={formData.profile.position}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                profile: { ...prev.profile, position: e.target.value }
              }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Department
            </label>
            <input
              type="text"
              value={formData.profile.department}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                profile: { ...prev.profile, department: e.target.value }
              }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Location
            </label>
            <input
              type="text"
              value={formData.profile.location}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                profile: { ...prev.profile, location: e.target.value }
              }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Timezone
            </label>
            <select
              value={formData.profile.timezone}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                profile: { ...prev.profile, timezone: e.target.value }
              }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="UTC">UTC</option>
              <option value="Africa/Johannesburg">Africa/Johannesburg</option>
              {/* Add more timezone options */}
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Bio
          </label>
          <textarea
            value={formData.profile.bio}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              profile: { ...prev.profile, bio: e.target.value }
            }))}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            rows={3}
          />
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Account Status</h3>

        <div className="space-y-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.status.isActive}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                status: { ...prev.status, isActive: e.target.checked }
              }))}
              className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500 bg-gray-700"
            />
            <span className="text-white">Account Active</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.status.isSuspended}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                status: { ...prev.status, isSuspended: e.target.checked }
              }))}
              className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500 bg-gray-700"
            />
            <span className="text-white">Account Suspended</span>
          </label>

          {formData.status.isSuspended && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Suspension Reason
              </label>
              <input
                type="text"
                value={formData.status.suspendedReason}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  status: { ...prev.status, suspendedReason: e.target.value }
                }))}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required={formData.status.isSuspended}
              />
            </div>
          )}
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
          {user ? 'Update User' : 'Create User'}
        </button>
      </div>
    </form>
  );
}