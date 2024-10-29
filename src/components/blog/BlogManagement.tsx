import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { BlogPost } from '../../types/blog';
import { useBlog } from '../../contexts/BlogContext';
import BlogPostList from './BlogPostList';
import BlogPostEditor from './editor/BlogPostEditor';
import BlogSettings from './BlogSettings';

export default function BlogManagement() {
  const [activeView, setActiveView] = useState<'list' | 'editor' | 'settings'>('list');
  const [selectedPost, setSelectedPost] = useState<BlogPost | undefined>();
  const { isLoading } = useBlog();

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setActiveView('editor');
  };

  const handleCreateNew = () => {
    setSelectedPost(undefined);
    setActiveView('editor');
  };

  const handleSave = () => {
    setActiveView('list');
    setSelectedPost(undefined);
  };

  const handleCancel = () => {
    setActiveView('list');
    setSelectedPost(undefined);
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-700 rounded w-1/4"></div>
        <div className="h-64 bg-gray-700 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Blog Management</h2>
          <p className="text-gray-400">Create and manage your blog content</p>
        </div>
        <div className="flex items-center space-x-4">
          {activeView === 'list' && (
            <>
              <button
                onClick={() => setActiveView('settings')}
                className="px-4 py-2 text-gray-400 hover:text-white"
              >
                Settings
              </button>
              <button
                onClick={handleCreateNew}
                className="flex items-center px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </button>
            </>
          )}
          {activeView !== 'list' && (
            <button
              onClick={() => setActiveView('list')}
              className="px-4 py-2 text-gray-400 hover:text-white"
            >
              Back to List
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {activeView === 'list' && (
        <BlogPostList onEdit={handleEdit} />
      )}

      {activeView === 'editor' && (
        <BlogPostEditor
          post={selectedPost}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      {activeView === 'settings' && (
        <BlogSettings onClose={() => setActiveView('list')} />
      )}
    </div>
  );
}