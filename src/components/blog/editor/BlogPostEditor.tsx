import React, { useState } from 'react';
import { BlogPost } from '../../../types/blog';
import { useBlog } from '../../../contexts/BlogContext';
import EditorHeader from './EditorHeader';
import EditorContent from './EditorContent';
import EditorMetadata from './EditorMetadata';
import EditorPublishing from './EditorPublishing';
import EditorSEO from './EditorSEO';

interface BlogPostEditorProps {
  post?: BlogPost;
  onSave: () => void;
  onCancel: () => void;
}

export default function BlogPostEditor({ post, onSave, onCancel }: BlogPostEditorProps) {
  const { createPost, updatePost, generateSlug, isLoading } = useBlog();
  const [showSchedule, setShowSchedule] = useState(false);

  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    excerpt: post?.excerpt || '',
    featuredImage: post?.featuredImage,
    status: post?.status || 'draft',
    visibility: post?.visibility || 'public',
    password: post?.password || '',
    categories: post?.categories || [],
    tags: post?.tags || [],
    scheduledAt: post?.scheduledAt || '',
    seoTitle: post?.seoTitle || '',
    seoDescription: post?.seoDescription || '',
    ogImage: post?.ogImage
  });

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

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'title' && !post ? { seoTitle: value } : {})
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <EditorHeader
        title={formData.title}
        onChange={value => handleFormChange('title', value)}
      />

      <EditorContent
        content={formData.content}
        onChange={value => handleFormChange('content', value)}
      />

      <EditorMetadata
        excerpt={formData.excerpt}
        featuredImage={formData.featuredImage}
        categories={formData.categories}
        tags={formData.tags}
        onChange={handleFormChange}
      />

      <EditorPublishing
        status={formData.status}
        visibility={formData.visibility}
        password={formData.password}
        scheduledAt={formData.scheduledAt}
        showSchedule={showSchedule}
        onShowScheduleChange={setShowSchedule}
        onChange={handleFormChange}
      />

      <EditorSEO
        title={formData.seoTitle}
        description={formData.seoDescription}
        ogImage={formData.ogImage}
        onChange={handleFormChange}
      />

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
          className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Save Post'}
        </button>
      </div>
    </form>
  );
}