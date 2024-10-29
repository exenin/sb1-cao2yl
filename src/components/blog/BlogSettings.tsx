import React, { useState } from 'react';
import { Save, Upload, X } from 'lucide-react';
import { useBlog } from '../../contexts/BlogContext';
import { BlogSettings as BlogSettingsType } from '../../types/blog';

export default function BlogSettings() {
  const { settings, updateSettings, uploadImage, isLoading } = useBlog();
  const [formData, setFormData] = useState<BlogSettingsType>(settings);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSettings(formData);
    } catch (error) {
      console.error('Failed to update settings:', error);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const logoUrl = await uploadImage(file);
        setFormData(prev => ({ ...prev, logo: logoUrl }));
      } catch (error) {
        console.error('Failed to upload logo:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General Settings */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">General Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Blog Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                title: e.target.value
              }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Blog Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                description: e.target.value
              }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Logo
            </label>
            <div className="flex items-center space-x-4">
              {formData.logo && (
                <div className="relative">
                  <img
                    src={formData.logo}
                    alt="Logo"
                    className="h-12 w-12 object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, logo: undefined }))}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              <label className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg cursor-pointer hover:bg-gray-600">
                <Upload className="h-4 w-4 mr-2" />
                Upload Logo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Settings */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">SEO Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Default Title Format
            </label>
            <input
              type="text"
              value={formData.seoSettings.defaultTitle}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                seoSettings: {
                  ...prev.seoSettings,
                  defaultTitle: e.target.value
                }
              }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Default Meta Description
            </label>
            <textarea
              value={formData.seoSettings.defaultDescription}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                seoSettings: {
                  ...prev.seoSettings,
                  defaultDescription: e.target.value
                }
              }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Twitter Username
            </label>
            <input
              type="text"
              value={formData.seoSettings.twitterUsername || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                seoSettings: {
                  ...prev.seoSettings,
                  twitterUsername: e.target.value
                }
              }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Facebook
            </label>
            <input
              type="url"
              value={formData.socialLinks.facebook || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                socialLinks: {
                  ...prev.socialLinks,
                  facebook: e.target.value
                }
              }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Twitter
            </label>
            <input
              type="url"
              value={formData.socialLinks.twitter || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                socialLinks: {
                  ...prev.socialLinks,
                  twitter: e.target.value
                }
              }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              LinkedIn
            </label>
            <input
              type="url"
              value={formData.socialLinks.linkedin || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                socialLinks: {
                  ...prev.socialLinks,
                  linkedin: e.target.value
                }
              }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Instagram
            </label>
            <input
              type="url"
              value={formData.socialLinks.instagram || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                socialLinks: {
                  ...prev.socialLinks,
                  instagram: e.target.value
                }
              }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Custom Scripts */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Custom Scripts</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Header Scripts
            </label>
            <textarea
              value={formData.headerScripts || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                headerScripts: e.target.value
              }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
              rows={4}
              placeholder="<!-- Add custom header scripts here -->"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Footer Scripts
            </label>
            <textarea
              value={formData.footerScripts || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                footerScripts: e.target.value
              }))}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
              rows={4}
              placeholder="<!-- Add custom footer scripts here -->"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </>
          )}
        </button>
      </div>
    </form>
  );
}