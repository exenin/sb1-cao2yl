import React from 'react';
import { 
  Shield, User, Settings, Database, AlertTriangle,
  Clock, MapPin
} from 'lucide-react';
import { useActivity } from '../../../hooks/useActivity';

interface ActivityListProps {
  searchTerm: string;
  typeFilter: string;
  dateRange: {
    start: string;
    end: string;
  };
}

export default function ActivityList({
  searchTerm,
  typeFilter,
  dateRange
}: ActivityListProps) {
  const { activities } = useActivity();

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = 
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || activity.type === typeFilter;
    const matchesDate = (!dateRange.start || activity.timestamp >= dateRange.start) &&
                       (!dateRange.end || activity.timestamp <= dateRange.end);
    return matchesSearch && matchesType && matchesDate;
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'security':
        return Shield;
      case 'user':
        return User;
      case 'system':
        return Settings;
      case 'data':
        return Database;
      default:
        return AlertTriangle;
    }
  };

  return (
    <div className="space-y-4">
      {filteredActivities.map((activity) => {
        const Icon = getActivityIcon(activity.type);
        
        return (
          <div
            key={activity.id}
            className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gray-700 rounded-lg">
                <Icon className="h-5 w-5 text-cyan-500" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white font-medium">{activity.description}</p>
                    <p className="text-sm text-gray-400">
                      By {activity.user.name} • {activity.user.role}
                    </p>
                  </div>
                  <div className="text-sm text-gray-400">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </div>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {activity.location}
                    </div>
                  </div>
                </div>

                {activity.metadata && (
                  <div className="mt-2 p-2 bg-gray-700 rounded text-sm">
                    <pre className="text-gray-400 overflow-x-auto">
                      {JSON.stringify(activity.metadata, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}