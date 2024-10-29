import React from 'react';

interface EditorSEOProps {
  title: string;
  description: string;
  ogImage?: string;
  onChange: (field: string, value: any) => void;
}

export default function EditorSEO({
  title,
  description,
  ogImage,
  onChange
}: EditorSEOProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-medium text-white mb-4">SEO Settings</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            SEO Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => onChange('seoTitle', e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Meta Description
          </label>
          <textarea
            value={description}
            onChange={(e) => onChange('seoDescription', e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Social Image URL
          </label>
          <input
            type="url"
            value={ogImage}
            onChange={(e) => onChange('ogImage', e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="https://..."
          />
        </div>
      </div>
    </div>
  );
}