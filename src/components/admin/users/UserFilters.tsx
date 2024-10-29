import React from 'react';
import { Search, Filter } from 'lucide-react';

interface UserFiltersProps {
  searchTerm: string;
  roleFilter: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function UserFilters({
  searchTerm,
  roleFilter,
  statusFilter,
  onSearchChange,
  onRoleChange,
  onStatusChange
}: UserFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search users..."
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
            value={roleFilter}
            onChange={(e) => onRoleChange(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="customer_company">Customer Company</option>
            <option value="customer_employee">Customer Employee</option>
          </select>
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            className="pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none cursor-pointer"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>
    </div>
  );
}