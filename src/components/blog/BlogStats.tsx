import React from 'react';
import { 
  FileText, Eye, Clock, Calendar, TrendingUp, TrendingDown 
} from 'lucide-react';
import { useBlog } from '../../contexts/BlogContext';

export default function BlogStats() {
  const { stats, isLoading } = useBlog();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-gray-700 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  const metrics = [
    {
      icon: FileText,
      label: 'Total Posts',
      value: stats.totalPosts,
      trend: '+12%',
      trendType: 'up' as const
    },
    {
      icon: Eye,
      label: 'Total Views',
      value: stats.totalViews,
      trend: '+8%',
      trendType: 'up' as const
    },
    {
      icon: Clock,
      label: 'Draft Posts',
      value: stats.draftPosts,
      trend: '-3%',
      trendType: 'down' as const
    },
    {
      icon: Calendar,
      label: 'Scheduled Posts',
      value: stats.scheduledPosts,
      trend: '2 pending',
      trendType: 'neutral' as const
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">{metric.label}</p>
              <p className="text-2xl font-bold text-white">{metric.value}</p>
              <div className={`flex items-center mt-2 ${
                metric.trendType === 'up' ? 'text-green-500' :
                metric.trendType === 'down' ? 'text-red-500' :
                'text-yellow-500'
              }`}>
                {metric.trendType === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> :
                 metric.trendType === 'down' ? <TrendingDown className="h-4 w-4 mr-1" /> :
                 <Clock className="h-4 w-4 mr-1" />}
                <span>{metric.trend}</span>
              </div>
            </div>
            <div className="p-3 bg-gray-700 rounded-lg">
              <metric.icon className="h-6 w-6 text-cyan-500" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}