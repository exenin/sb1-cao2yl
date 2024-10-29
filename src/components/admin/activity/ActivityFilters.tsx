import React from 'react';
import { Search, Filter, Calendar } from 'lucide-react';

interface ActivityFiltersProps {
  searchTerm: string;
  typeFilter: string;
  dateRange: {
    start: string;
    end: string;
  };
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onDateRangeChange: (range: { start: string; end: string }) => void;
}

export default function ActivityFilters({
  searchTerm,
  typeFilter,
  dateRange,
  onSearchChange,
  onTypeChange,
  onDateRangeChange
}: ActivityFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search activities..."
          className="pl-10 pr-4 py-2 w-full bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex space-x-4">
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            className="pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none cursor-pointer"
            value={typeFilter}
            onChange={(e) => onTypeChange(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="security">Security</option>
            <option value="user">User</option>
            <option value="system">System</option>
            <option value="data">Data</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => onDateRangeChange({
                ...dateRange,
                start: e.target.value
              })}
              className="pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <span className="text-gray-400">to</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => onDateRangeChange({
              ...dateRange,
              end: e.target.value
            })}
            className="px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>
    </div>
  );
}