import React from 'react';
import { Calendar, Globe, Lock } from 'lucide-react';
import { PostVisibility } from '../../../types/blog';

interface EditorPublishingProps {
  status: string;
  visibility: PostVisibility;
  password: string;
  scheduledAt: string;
  showSchedule: boolean;
  onShowScheduleChange: (show: boolean) => void;
  onChange: (field: string, value: any) => void;
}

export default function EditorPublishing({
  status,
  visibility,
  password,
  scheduledAt,
  showSchedule,
  onShowScheduleChange,
  onChange
}: EditorPublishingProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-medium text-white mb-4">Publishing Options</h3>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => onChange('status', 'draft')}
            className={`px-3 py-1 rounded-lg ${
              status === 'draft'
                ? 'bg-yellow-500/10 text-yellow-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => onShowScheduleChange(!showSchedule)}
            className={`px-3 py-1 rounded-lg ${
              showSchedule
                ? 'bg-purple-500/10 text-purple-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Calendar className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onChange('status', 'published')}
            className={`px-3 py-1 rounded-lg ${
              status === 'published'
                ? 'bg-green-500/10 text-green-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Globe className="h-4 w-4" />
          </button>
        </div>

        {showSchedule && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Schedule Publication
            </label>
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => {
                onChange('scheduledAt', e.target.value);
                onChange('status', 'scheduled');
              }}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Visibility
          </label>
          <select
            value={visibility}
            onChange={(e) => onChange('visibility', e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="password-protected">Password Protected</option>
          </select>
        </div>

        {visibility === 'password-protected' && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => onChange('password', e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required={visibility === 'password-protected'}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}