import React from 'react';
import { BlogPost } from '../../types/blog';
import BlogPostPreview from './BlogPostPreview';

interface BlogPostGridProps {
  posts: BlogPost[];
  onPostClick?: (post: BlogPost) => void;
}

export default function BlogPostGrid({ posts, onPostClick }: BlogPostGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map(post => (
        <div
          key={post.id}
          onClick={() => onPostClick?.(post)}
          className={onPostClick ? 'cursor-pointer' : ''}
        >
          <BlogPostPreview post={post} />
        </div>
      ))}
    </div>
  );
}