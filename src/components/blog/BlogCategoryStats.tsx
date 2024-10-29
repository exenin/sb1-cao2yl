import React from 'react';
import { PieChart, BarChart } from 'lucide-react';
import { useBlog } from '../../contexts/BlogContext';

export default function BlogCategoryStats() {
  const { stats, categories, isLoading } = useBlog();

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="h-6 bg-gray-700 rounded w-1/4 mb-6 animate-pulse"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 bg-gray-700 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  const categoryData = categories.map(category => ({
    name: category.name,
    count: stats.postsByCategory[category.id] || 0,
    percentage: ((stats.postsByCategory[category.id] || 0) / stats.totalPosts) * 100
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Posts by Category</h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-white">
            <PieChart className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white">
            <BarChart className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {categoryData.map(({ name, count, percentage }) => (
          <div key={name} className="relative">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-white">{name}</span>
              <span className="text-gray-400">{count} posts</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-cyan-500 rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}