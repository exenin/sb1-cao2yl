import React, { useState } from 'react';
import { Save, RefreshCw, Shield, Cloud, Database, Bell } from 'lucide-react';
import { useConfig } from '../../../contexts/ConfigContext';
import LoadingSpinner from '../../shared/LoadingSpinner';
import ErrorMessage from '../../shared/ErrorMessage';

export default function SystemSettings() {
  const { forumEndpoint, setForumEndpoint, apiEndpoint, setApiEndpoint } = useConfig();
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    general: {
      forumEndpoint,
      apiEndpoint,
      companyName: 'CyberAllStars',
      supportEmail: 'support@cyberallstars.com'
    },
    security: {
      mfaRequired: true,
      passwordExpiration: 90,
      sessionTimeout: 30,
      loginAttempts: 5
    },
    notifications: {
      emailEnabled: true,
      smsEnabled: false,
      alertThreshold: 'medium'
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    
    try {
      // Update config context values
      setForumEndpoint(formData.general.forumEndpoint);
      setApiEndpoint(formData.general.apiEndpoint);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert('Settings updated successfully');
    } catch (err) {
      setError('Failed to update settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Database },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">System Settings</h2>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-700">
        <div className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 -mb-px ${
                activeTab === tab.id
                  ? 'text-cyan-500 border-b-2 border-cyan-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {error && (
        <ErrorMessage 
          message={error} 
          onRetry={() => setError(null)} 
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">General Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.general.companyName}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    general: { ...prev.general, companyName: e.target.value }
                  }))}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Support Email
                </label>
                <input
                  type="email"
                  value={formData.general.supportEmail}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    general: { ...prev.general, supportEmail: e.target.value }
                  }))}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Forum API Endpoint
                </label>
                <input
                  type="url"
                  value={formData.general.forumEndpoint}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    general: { ...prev.general, forumEndpoint: e.target.value }
                  }))}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Main API Endpoint
                </label>
                <input
                  type="url"
                  value={formData.general.apiEndpoint}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    general: { ...prev.general, apiEndpoint: e.target.value }
                  }))}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">Security Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-white">
                    Require Two-Factor Authentication
                  </label>
                  <p className="text-sm text-gray-400">
                    Enforce 2FA for all admin users
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.security.mfaRequired}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      security: { ...prev.security, mfaRequired: e.target.checked }
                    }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-500/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Password Expiration (days)
                </label>
                <input
                  type="number"
                  value={formData.security.passwordExpiration}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    security: { ...prev.security, passwordExpiration: parseInt(e.target.value) }
                  }))}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Session Timeout (minutes)
                </label>
                <input
                  type="number"
                  value={formData.security.sessionTimeout}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    security: { ...prev.security, sessionTimeout: parseInt(e.target.value) }
                  }))}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Max Login Attempts
                </label>
                <input
                  type="number"
                  value={formData.security.loginAttempts}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    security: { ...prev.security, loginAttempts: parseInt(e.target.value) }
                  }))}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">Notification Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-white">
                    Email Notifications
                  </label>
                  <p className="text-sm text-gray-400">
                    Send notifications via email
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.notifications.emailEnabled}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, emailEnabled: e.target.checked }
                    }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-500/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-white">
                    SMS Notifications
                  </label>
                  <p className="text-sm text-gray-400">
                    Send notifications via SMS
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.notifications.smsEnabled}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, smsEnabled: e.target.checked }
                    }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-500/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Alert Threshold
                </label>
                <select
                  value={formData.notifications.alertThreshold}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, alertThreshold: e.target.value }
                  }))}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-gray-400 hover:text-white flex items-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isSaving ? (
              <>
                <LoadingSpinner size="small" className="mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}