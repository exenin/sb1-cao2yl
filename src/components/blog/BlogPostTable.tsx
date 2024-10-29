import React from 'react';
import { 
  Edit2, Trash2, Eye, Calendar, Lock, ArrowUpDown
} from 'lucide-react';
import { BlogPost } from '../../types/blog';
import { useBlog } from '../../contexts/BlogContext';

interface BlogPostTableProps {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onDelete: (postId: string) => void;
  sortField: keyof BlogPost;
  sortDirection: 'asc' | 'desc';
  onSort: (field: keyof BlogPost) => void;
}

export default function BlogPostTable({ 
  posts, 
  onEdit, 
  onDelete,
  sortField,
  sortDirection,
  onSort
}: BlogPostTableProps) {
  const { categories } = useBlog();

  const renderSortIcon = (field: keyof BlogPost) => {
    if (sortField !== field) return null;
    return (
      <ArrowUpDown className={`h-4 w-4 ml-1 ${
        sortDirection === 'asc' ? 'rotate-180' : ''
      }`} />
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th 
                className="py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white"
                onClick={() => onSort('title')}
              >
                <div className="flex items-center">
                  Title
                  {renderSortIcon('title')}
                </div>
              </th>
              <th className="py-3 px-4 text-gray-400 font-medium">Author</th>
              <th 
                className="py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white"
                onClick={() => onSort('status')}
              >
                <div className="flex items-center">
                  Status
                  {renderSortIcon('status')}
                </div>
              </th>
              <th 
                className="py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white"
                onClick={() => onSort('createdAt')}
              >
                <div className="flex items-center">
                  Date
                  {renderSortIcon('createdAt')}
                </div>
              </th>
              <th 
                className="py-3 px-4 text-gray-400 font-medium cursor-pointer hover:text-white"
                onClick={() => onSort('views')}
              >
                <div className="flex items-center">
                  Views
                  {renderSortIcon('views')}
                </div>
              </th>
              <th className="py-3 px-4 text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                <td className="py-3 px-4">
                  <div>
                    <p className="text-white font-medium">{post.title}</p>
                    <p className="text-sm text-gray-400">
                      {post.categories.map(catId => 
                        categories.find(c => c.id === catId)?.name
                      ).join(', ')}
                    </p>
                  </div>
                </td>
                <td className="py-3 px-4 text-white">{post.author.name}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.status === 'published' ? 'bg-green-500/10 text-green-500' :
                      post.status === 'draft' ? 'bg-yellow-500/10 text-yellow-500' :
                      post.status === 'scheduled' ? 'bg-purple-500/10 text-purple-500' :
                      'bg-gray-500/10 text-gray-500'
                    }`}>
                      {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                    </span>
                    {post.visibility !== 'public' && (
                      <Lock className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-400">
                  {post.publishedAt ? (
                    new Date(post.publishedAt).toLocaleDateString()
                  ) : post.scheduledAt ? (
                    <div className="flex items-center text-purple-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(post.scheduledAt).toLocaleDateString()}
                    </div>
                  ) : (
                    'Not published'
                  )}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center text-gray-400">
                    <Eye className="h-4 w-4 mr-1" />
                    {post.views}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onEdit(post)}
                      className="p-2 hover:bg-gray-600 rounded-lg"
                    >
                      <Edit2 className="h-4 w-4 text-gray-400" />
                    </button>
                    <button
                      onClick={() => onDelete(post.id)}
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
  );
}