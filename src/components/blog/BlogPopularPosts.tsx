import React from 'react';
import { Eye, ArrowRight } from 'lucide-react';
import { useBlog } from '../../contexts/BlogContext';

export default function BlogPopularPosts() {
  const { stats, isLoading } = useBlog();

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="h-6 bg-gray-700 rounded w-1/4 mb-6 animate-pulse"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-700 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Popular Posts</h3>
      <div className="space-y-4">
        {stats.popularPosts.map((post) => (
          <div key={post.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer">
            <div>
              <h4 className="font-medium text-white">{post.title}</h4>
              <p className="text-sm text-gray-400">{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-400">
                <Eye className="h-4 w-4 mr-1" />
                {post.views}
              </div>
              <ArrowRight className="h-4 w-4 text-cyan-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}