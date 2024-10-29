import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { BlogPost } from '../../types/blog';

interface BlogPostSortProps {
  sortField: keyof BlogPost;
  sortDirection: 'asc' | 'desc';
  onSort: (field: keyof BlogPost) => void;
}

export default function BlogPostSort({
  sortField,
  sortDirection,
  onSort
}: BlogPostSortProps) {
  const sortOptions: { field: keyof BlogPost; label: string }[] = [
    { field: 'title', label: 'Title' },
    { field: 'createdAt', label: 'Created Date' },
    { field: 'updatedAt', label: 'Updated Date' },
    { field: 'status', label: 'Status' },
    { field: 'views', label: 'Views' }
  ];

  return (
    <div className="flex items-center space-x-4">
      <span className="text-gray-400">Sort by:</span>
      {sortOptions.map(({ field, label }) => (
        <button
          key={field}
          onClick={() => onSort(field)}
          className={`flex items-center px-3 py-1 rounded-lg ${
            sortField === field
              ? 'bg-cyan-500/10 text-cyan-500'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {label}
          {sortField === field && (
            <ArrowUpDown className={`h-4 w-4 ml-1 ${
              sortDirection === 'asc' ? 'rotate-180' : ''
            }`} />
          )}
        </button>
      ))}
    </div>
  );
}