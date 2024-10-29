import React, { useState } from 'react';
import { Search, Tag } from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';

interface QuickResponseSelectorProps {
  onSelect: (response: { title: string; content: string; tags: string[] }) => void;
  onClose: () => void;
}

export default function QuickResponseSelector({ onSelect, onClose }: QuickResponseSelectorProps) {
  const { quickResponses } = useChat();
  const [search, setSearch] = useState('');

  const filteredResponses = quickResponses.filter(
    response =>
      response.title.toLowerCase().includes(search.toLowerCase()) ||
      response.content.toLowerCase().includes(search.toLowerCase()) ||
      response.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="absolute bottom-full left-0 right-0 bg-gray-800 border-t border-gray-700 rounded-t-lg shadow-lg max-h-64 overflow-y-auto">
      <div className="sticky top-0 bg-gray-800 p-4 border-b border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search quick responses..."
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>

      <div className="p-2">
        {filteredResponses.map((response) => (
          <button
            key={response.id}
            onClick={() => onSelect(response)}
            className="w-full p-3 hover:bg-gray-700 rounded-lg text-left transition-colors"
          >
            <h4 className="text-white font-medium mb-1">{response.title}</h4>
            <p className="text-sm text-gray-400 mb-2 line-clamp-2">{response.content}</p>
            <div className="flex items-center space-x-2">
              <Tag className="h-3 w-3 text-gray-400" />
              <div className="flex flex-wrap gap-1">
                {response.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}