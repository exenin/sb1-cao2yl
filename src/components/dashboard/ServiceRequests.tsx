import React, { useState } from 'react';
import { Plus, Search, Filter, Paperclip, X } from 'lucide-react';

interface ServiceRequest {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  created: string;
  updated: string;
  description: string;
  attachments?: string[];
}

const mockRequests: ServiceRequest[] = [
  {
    id: 'REQ-001',
    title: 'Security Assessment Request',
    status: 'in-progress',
    priority: 'high',
    created: '2024-03-15T10:00:00',
    updated: '2024-03-15T14:30:00',
    description: 'Comprehensive security assessment for cloud infrastructure',
    attachments: ['security-requirements.pdf']
  },
  {
    id: 'REQ-002',
    title: 'Cloud Migration Support',
    status: 'pending',
    priority: 'medium',
    created: '2024-03-14T09:00:00',
    updated: '2024-03-14T09:00:00',
    description: 'Assistance needed with AWS migration'
  }
];

export default function ServiceRequests() {
  const [requests, setRequests] = useState<ServiceRequest[]>(mockRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    priority: 'medium',
    attachments: [] as File[]
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-500/10';
      case 'in-progress':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'pending':
        return 'text-blue-500 bg-blue-500/10';
      case 'cancelled':
        return 'text-red-500 bg-red-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setNewRequest(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...Array.from(files)]
      }));
    }
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const request: ServiceRequest = {
      id: `REQ-${String(requests.length + 1).padStart(3, '0')}`,
      title: newRequest.title,
      description: newRequest.description,
      priority: newRequest.priority as 'low' | 'medium' | 'high',
      status: 'pending',
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      attachments: newRequest.attachments.map(file => file.name)
    };

    setRequests(prev => [request, ...prev]);
    setShowNewRequestModal(false);
    setNewRequest({
      title: '',
      description: '',
      priority: 'medium',
      attachments: []
    });
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Service Requests</h2>
        <button 
          onClick={() => setShowNewRequestModal(true)}
          className="flex items-center px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Request
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search requests..."
            className="pl-10 pr-4 py-2 w-full bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              className="pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              className="pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none cursor-pointer"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="py-3 px-4 text-gray-400 font-medium">ID</th>
                <th className="py-3 px-4 text-gray-400 font-medium">Title</th>
                <th className="py-3 px-4 text-gray-400 font-medium">Status</th>
                <th className="py-3 px-4 text-gray-400 font-medium">Priority</th>
                <th className="py-3 px-4 text-gray-400 font-medium">Created</th>
                <th className="py-3 px-4 text-gray-400 font-medium">Updated</th>
                <th className="py-3 px-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="py-3 px-4 text-white">{request.id}</td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-white">{request.title}</p>
                      <p className="text-sm text-gray-400">{request.description}</p>
                      {request.attachments && request.attachments.length > 0 && (
                        <div className="flex items-center mt-1">
                          <Paperclip className="h-3 w-3 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-400">
                            {request.attachments.length} attachment(s)
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-medium ${getPriorityColor(request.priority)}`}>
                      {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">
                    {new Date(request.created).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-gray-400">
                    {new Date(request.updated).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-cyan-500 hover:text-cyan-400">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Request Modal */}
      {showNewRequestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">New Service Request</h3>
              <button 
                onClick={() => setShowNewRequestModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={newRequest.title}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Description
                </label>
                <textarea
                  value={newRequest.description}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Priority
                </label>
                <select
                  value={newRequest.priority}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, priority: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Attachments
                </label>
                <div className="flex items-center space-x-4">
                  <label className="px-4 py-2 bg-gray-700 text-white rounded-lg cursor-pointer hover:bg-gray-600">
                    <Paperclip className="h-4 w-4 inline-block mr-2" />
                    Add Files
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      onChange={handleFileUpload}
                    />
                  </label>
                  {newRequest.attachments.length > 0 && (
                    <span className="text-gray-400">
                      {newRequest.attachments.length} file(s) selected
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowNewRequestModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}