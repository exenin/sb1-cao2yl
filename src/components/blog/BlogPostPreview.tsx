import React from 'react';
import { Calendar, User, Tag, Eye } from 'lucide-react';
import { BlogPost } from '../../types/blog';
import { useBlog } from '../../contexts/BlogContext';

interface BlogPostPreviewProps {
  post: BlogPost;
}

export default function BlogPostPreview({ post }: BlogPostPreviewProps) {
  const { categories, tags } = useBlog();

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      {post.featuredImage && (
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-4">{post.title}</h2>
        
        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            {post.author.name}
          </div>
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            {post.views} views
          </div>
        </div>

        <div className="prose prose-invert max-w-none mb-6">
          {post.excerpt || post.content.slice(0, 200) + '...'}
        </div>

        <div className="flex flex-wrap gap-2">
          {post.categories.map(catId => {
            const category = categories.find(c => c.id === catId);
            return category ? (
              <span
                key={category.id}
                className="px-2 py-1 bg-gray-700 rounded-full text-xs text-cyan-500"
              >
                {category.name}
              </span>
            ) : null;
          })}
          
          {post.tags.map(tagId => {
            const tag = tags.find(t => t.id === tagId);
            return tag ? (
              <span
                key={tag.id}
                className="flex items-center px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-400"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag.name}
              </span>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}