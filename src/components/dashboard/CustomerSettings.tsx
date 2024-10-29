import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useSettings } from '../../contexts/SettingsContext';
import { 
  Bell, Lock, User, Building, Mail, Shield, 
  Smartphone, Globe, Users, Trash2, LogOut,
  Camera, Key, History, AlertCircle, CreditCard
} from 'lucide-react';
import DeleteAccountModal from './settings/DeleteAccountModal';
import SecurityLogModal from './settings/SecurityLogModal';
import ApiKeyModal from './settings/ApiKeyModal';
import TeamMemberModal from './settings/TeamMemberModal';
import ConfirmationDialog from '../shared/ConfirmationDialog';

export default function CustomerSettings() {
  const { user, logout } = useAuth();
  const { 
    profile,
    company,
    notifications,
    communication,
    security,
    updateProfile,
    updateCompany,
    updateNotifications,
    updateCommunication,
    updateSecurity,
    uploadAvatar,
    enableTwoFactor,
    disableTwoFactor,
    changePassword,
    isLoading
  } = useSettings();

  const [activeTab, setActiveTab] = useState('profile');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSecurityLog, setShowSecurityLog] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationData, setConfirmationData] = useState<{
    title: string;
    message: string;
    action: () => void;
  }>({ title: '', message: '', action: () => {} });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'company', label: 'Company', icon: Building },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'communication', label: 'Communication', icon: Mail }
  ];

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await uploadAvatar(file);
      } catch (error) {
        console.error('Failed to upload avatar:', error);
      }
    }
  };

  const handlePasswordChange = async (oldPassword: string, newPassword: string) => {
    try {
      await changePassword(oldPassword, newPassword);
      setShowConfirmation(true);
      setConfirmationData({
        title: 'Password Updated',
        message: 'Your password has been successfully changed.',
        action: () => setShowConfirmation(false)
      });
    } catch (error) {
      console.error('Failed to change password:', error);
    }
  };

  const handleTwoFactorToggle = async () => {
    try {
      if (security.twoFactorEnabled) {
        await disableTwoFactor();
      } else {
        await enableTwoFactor();
      }
    } catch (error) {
      console.error('Failed to toggle 2FA:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Settings</h2>

      <div className="flex space-x-4 border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center space-x-2 px-4 py-2 -mb-px ${
              activeTab === tab.id
                ? 'text-cyan-500 border-b-2 border-cyan-500'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        {/* Profile Settings */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* Avatar Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Profile Picture
              </label>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="h-20 w-20 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                    {profile.avatar ? (
                      <img 
                        src={profile.avatar} 
                        alt="Profile" 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 p-1 bg-gray-700 rounded-full cursor-pointer hover:bg-gray-600">
                    <Camera className="h-4 w-4 text-cyan-500" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                    />
                  </label>
                </div>
                <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
                  Remove Photo
                </button>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={profile.name}
                  onChange={(e) => updateProfile({ name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue={profile.email}
                  onChange={(e) => updateProfile({ email: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue={profile.phone}
                  onChange={(e) => updateProfile({ phone: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  defaultValue={profile.bio}
                  onChange={(e) => updateProfile({ bio: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            {/* Danger Zone */}
            <div className="mt-8 p-4 border border-red-500/20 rounded-lg bg-red-500/10">
              <h3 className="text-lg font-medium text-red-500 mb-4">Danger Zone</h3>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white">Delete Account</p>
                  <p className="text-sm text-gray-400">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            {/* Password Change */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Change Password</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <button className="mt-4 px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400">
                Update Password
              </button>
            </div>

            {/* Two-Factor Authentication */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <p className="text-white">
                    {security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </p>
                  <p className="text-sm text-gray-400">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <button
                  onClick={handleTwoFactorToggle}
                  className={`px-4 py-2 rounded-lg ${
                    security.twoFactorEnabled
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-black'
                  }`}
                >
                  {security.twoFactorEnabled ? 'Disable' : 'Enable'}
                </button>
              </div>
            </div>

            {/* Security Log */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Security Log</h3>
              <div className="space-y-4">
                {security.loginHistory.slice(0, 3).map((log, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div>
                      <p className="text-white">{log.device}</p>
                      <p className="text-sm text-gray-400">{log.location}</p>
                    </div>
                    <p className="text-sm text-gray-400">
                      {new Date(log.date).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowSecurityLog(true)}
                className="mt-4 text-cyan-500 hover:text-cyan-400"
              >
                View Full History
              </button>
            </div>

            {/* API Keys */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">API Keys</h3>
              <button
                onClick={() => setShowApiKeyModal(true)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Manage API Keys
              </button>
            </div>
          </div>
        )}

        {/* Company Settings */}
        {activeTab === 'company' && (
          <div className="space-y-6">
            {/* Company Details */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    defaultValue={company.name}
                    onChange={(e) => updateCompany({ name: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    defaultValue={company.registrationNumber}
                    onChange={(e) => updateCompany({ registrationNumber: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Address
                  </label>
                  <textarea
                    defaultValue={company.address}
                    onChange={(e) => updateCompany({ address: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Team Management */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Team Members</h3>
              <button
                onClick={() => setShowTeamModal(true)}
                className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400"
              >
                Manage Team
              </button>
            </div>

            {/* Billing Information */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Billing Information</h3>
              <div className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Current Plan: Professional</p>
                    <p className="text-sm text-gray-400">Billed monthly</p>
                  </div>
                  <button className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400">
                    Manage Billing
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            {/* Email Notifications */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Email Notifications</h3>
              <div className="space-y-4">
                {Object.entries(notifications.email).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div>
                      <p className="text-white capitalize">{key.replace(/_/g, ' ')}</p>
                      <p className="text-sm text-gray-400">
                        Receive email notifications for {key.replace(/_/g, ' ')}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => updateNotifications({
                          email: { ...notifications.email, [key]: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-500/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Push Notifications */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Push Notifications</h3>
              <div className="space-y-4">
                {Object.entries(notifications.push).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div>
                      <p className="text-white capitalize">{key.replace(/_/g, ' ')}</p>
                      <p className="text-sm text-gray-400">
                        Receive push notifications for {key.replace(/_/g, ' ')}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => updateNotifications({
                          push: { ...notifications.push, [key]: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-500/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Communication Settings */}
        {activeTab === 'communication' && (
          <div className="space-y-6">
            {/* Language and Timezone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Preferred Language
                </label>
                <select
                  value={communication.preferredLanguage}
                  onChange={(e) => updateCommunication({ preferredLanguage: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Timezone
                </label>
                <select
                  value={communication.timezone}
                  onChange={(e) => updateCommunication({ timezone: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                </select>
              </div>
            </div>

            {/* Contact Preferences */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Contact Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <p className="text-white">Marketing Communications</p>
                    <p className="text-sm text-gray-400">
                      Receive updates about new features and promotions
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={communication.marketingConsent}
                      onChange={(e) => updateCommunication({ marketingConsent: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-500/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <DeleteAccountModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
      <SecurityLogModal
        show={showSecurityLog}
        onClose={() => setShowSecurityLog(false)}
        loginHistory={security.loginHistory}
      />
      <ApiKeyModal
        show={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
      />
      <TeamMemberModal
        show={showTeamModal}
        onClose={() => setShowTeamModal(false)}
      />
      <ConfirmationDialog
        show={showConfirmation}
        title={confirmationData.title}
        message={confirmationData.message}
        onConfirm={confirmationData.action}
        onCancel={() => setShowConfirmation(false)}
      />
    </div>
  );
}