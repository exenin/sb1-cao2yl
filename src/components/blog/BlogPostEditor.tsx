import React, { useState, useRef } from 'react';
import { 
  Save, Calendar, Image, Tag, Globe, Lock, 
  Eye, Clock, Upload, X, Plus 
} from 'lucide-react';
import { useBlog } from '../../contexts/BlogContext';
import { BlogPost, PostStatus, PostVisibility } from '../../types/blog';

interface BlogPostEditorProps {
  post?: BlogPost;
  onSave: () => void;
  onCancel: () => void;
}

export default function BlogPostEditor({ post, onSave, onCancel }: BlogPostEditorProps) {
  const { 
    categories, 
    tags, 
    createPost, 
    updatePost, 
    uploadImage, 
    generateSlug,
    isLoading 
  } = useBlog();

  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    excerpt: post?.excerpt || '',
    featuredImage: post?.featuredImage,
    status: post?.status || 'draft' as PostStatus,
    visibility: post?.visibility || 'public' as PostVisibility,
    password: post?.password || '',
    categories: post?.categories || [],
    tags: post?.tags || [],
    scheduledAt: post?.scheduledAt || '',
    seoTitle: post?.seoTitle || '',
    seoDescription: post?.seoDescription || '',
    ogImage: post?.ogImage
  });

  const [showSchedule, setShowSchedule] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (post) {
        await updatePost(post.id, formData);
      } else {
        await createPost({
          ...formData,
          slug: generateSlug(formData.title),
          author: { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', permissions: ['all'] }
        });
      }
      onSave();
    } catch (error) {
      console.error('Failed to save post:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await uploadImage(file);
        setFormData(prev => ({ ...prev, featuredImage: imageUrl }));
      } catch (error) {
        console.error('Failed to upload image:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            title: e.target.value,
            seoTitle: e.target.value // Auto-populate SEO title
          }))}
          placeholder="Post Title"
          className="w-full px-4 py-2 text-2xl bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
      </div>

      {/* Content Editor */}
      <div>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          placeholder="Write your post content here..."
          className="w-full h-96 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
      </div>

      {/* Featured Image */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-400">Featured Image</label>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center px-3 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        {formData.featuredImage && (
          <div className="relative">
            <img
              src={formData.featuredImage}
              alt="Featured"
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, featuredImage: undefined }))}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Categories and Tags */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Categories
          </label>
          <select
            multiple
            value={formData.categories}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              categories: Array.from(e.target.selectedOptions, option => option.value)
            }))}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Tags
          </label>
          <select
            multiple
            value={formData.tags}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              tags: Array.from(e.target.selectedOptions, option => option.value)
            }))}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {tags.map(tag => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Publishing Options */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">Publishing Options</h3>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, status: 'draft' }))}
              className={`px-3 py-1 rounded-lg ${
                formData.status === 'draft'
                  ? 'bg-yellow-500/10 text-yellow-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Save className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setShowSchedule(!showSchedule)}
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
              onClick={() => setFormData(prev => ({ 
                ...prev, 
                status: 'published',
                publishedAt: new Date().toISOString()
              }))}
              className={`px-3 py-1 rounded-lg ${
                formData.status === 'published'
                  ? 'bg-green-500/10 text-green-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Globe className="h-4 w-4" />
            </button>
          </div>
        </div>

        {showSchedule && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Schedule Publication
            </label>
            <input
              type="datetime-local"
              value={formData.scheduledAt}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                scheduledAt: e.target.value,
                status: 'scheduled'
              }))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Visibility
            </label>
            <select
              value={formData.visibility}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                visibility: e.target.value as PostVisibility
              }))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="password-protected">Password Protected</option>
            </select>
          </div>
          {formData.visibility === 'password-protected' && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  password: e.target.value
                }))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required={formData.visibility === 'password-protected'}
              />
            </div>
          )}
        </div>
      </div>

      {/* SEO Settings */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-medium text-white mb-4">SEO Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              SEO Title
            </label>
            <input
              type="text"
              value={formData.seoTitle}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                seoTitle: e.target.value
              }))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              SEO Description
            </label>
            <textarea
              value={formData.seoDescription}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                seoDescription: e.target.value
              }))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-400 hover:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Post
            </>
          )}
        </button>
      </div>
    </form>
  );
}