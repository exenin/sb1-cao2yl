import React from 'react';
import { Search } from 'lucide-react';
import { useBlog } from '../../contexts/BlogContext';

interface BlogPostFiltersProps {
  searchTerm: string;
  categoryFilter: string;
  tagFilter: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onTagChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function BlogPostFilters({
  searchTerm,
  categoryFilter,
  tagFilter,
  statusFilter,
  onSearchChange,
  onCategoryChange,
  onTagChange,
  onStatusChange
}: BlogPostFiltersProps) {
  const { categories, tags } = useBlog();

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search posts..."
          className="pl-10 pr-4 py-2 w-full bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex space-x-4">
        <select
          className="px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          className="px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={tagFilter}
          onChange={(e) => onTagChange(e.target.value)}
        >
          <option value="all">All Tags</option>
          {tags.map(tag => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
        <select
          className="px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>
    </div>
  );
}