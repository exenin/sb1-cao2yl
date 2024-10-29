import React, { useState } from 'react';
import { Activity, Filter, Search, Calendar } from 'lucide-react';
import ActivityList from './ActivityList';
import ActivityFilters from './ActivityFilters';
import { useActivity } from '../../../hooks/useActivity';

export default function ActivityMonitor() {
  const { isLoading } = useActivity();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{
    start: string;
    end: string;
  }>({
    start: '',
    end: ''
  });

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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Activity Monitor</h2>
          <p className="text-gray-400">Track system and user activities</p>
        </div>
      </div>

      <ActivityFilters
        searchTerm={searchTerm}
        typeFilter={typeFilter}
        dateRange={dateRange}
        onSearchChange={setSearchTerm}
        onTypeChange={setTypeFilter}
        onDateRangeChange={setDateRange}
      />

      <ActivityList
        searchTerm={searchTerm}
        typeFilter={typeFilter}
        dateRange={dateRange}
      />
    </div>
  );
}