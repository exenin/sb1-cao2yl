import React, { useState } from 'react';
import { 
  Users, Shield, DollarSign, Clock, TrendingUp, TrendingDown, 
  Activity, AlertCircle, MessageSquare
} from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { useAI } from '../../contexts/AIContext';
import AIAssistant from '../shared/AIAssistant';
import AlertDrawer from '../shared/AlertDrawer';
import LoadingSpinner from '../shared/LoadingSpinner';
import { mockServiceUsage, mockSupportTickets } from '../../data/mockData';

export default function AdminOverview() {
  const { metrics, isLoading } = useAdmin();
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState(null);

  const alerts = [
    {
      id: 'alert-1',
      title: 'High CPU Usage',
      description: 'Server CPU usage above 90%',
      type: 'warning',
      timestamp: new Date().toISOString(),
      details: {
        server: 'prod-server-01',
        currentUsage: '92%',
        duration: '15 minutes',
        affectedServices: ['web-api', 'database']
      }
    },
    {
      id: 'alert-2',
      title: 'Failed Login Attempts',
      description: 'Multiple failed login attempts detected',
      type: 'error',
      timestamp: new Date().toISOString(),
      details: {
        ipAddresses: ['192.168.1.100'],
        attempts: 5,
        timeframe: '10 minutes'
      }
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Users',
            value: metrics.totalUsers,
            trend: '+12%',
            trendType: 'up',
            icon: Users,
            color: 'blue'
          },
          {
            title: 'Active Services',
            value: metrics.activeServices,
            trend: '+8%',
            trendType: 'up',
            icon: Shield,
            color: 'cyan'
          },
          {
            title: 'Monthly Revenue',
            value: `R${metrics.monthlyRevenue.toLocaleString()}`,
            trend: '-3%',
            trendType: 'down',
            icon: DollarSign,
            color: 'green'
          },
          {
            title: 'Pending Requests',
            value: metrics.pendingRequests,
            trend: '4 urgent',
            trendType: 'neutral',
            icon: Clock,
            color: 'yellow'
          }
        ].map((metric, index) => (
          <div 
            key={index}
            className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700/50 transition-all relative group"
            onClick={() => {
              setSelectedMetric(metric);
              setShowAIAssistant(true);
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">{metric.title}</p>
                <p className="text-2xl font-bold text-white">{metric.value}</p>
                <div className={`flex items-center mt-2 ${
                  metric.trendType === 'up' ? 'text-green-500' :
                  metric.trendType === 'down' ? 'text-red-500' :
                  'text-yellow-500'
                }`}>
                  {metric.trendType === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> :
                   metric.trendType === 'down' ? <TrendingDown className="h-4 w-4 mr-1" /> :
                   <Activity className="h-4 w-4 mr-1" />}
                  <span>{metric.trend}</span>
                </div>
              </div>
              <div className={`p-3 bg-${metric.color}-500/10 rounded-lg`}>
                <metric.icon className={`h-6 w-6 text-${metric.color}-500`} />
              </div>
            </div>
            
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                className="p-1 hover:bg-gray-600 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAIAssistant(true);
                  setSelectedMetric(metric);
                }}
              >
                <MessageSquare className="h-4 w-4 text-cyan-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Service Usage and Support Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Usage */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Service Usage</h3>
          <div className="space-y-4">
            {mockServiceUsage.map((usage) => (
              <div key={usage.customerId} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{usage.customerId}</h4>
                  <span className="text-cyan-500">Active</span>
                </div>
                {usage.services.map((service) => (
                  <div key={service.id} className="text-sm text-gray-400">
                    <p>Service: {service.id}</p>
                    <div className="mt-1 grid grid-cols-2 gap-2">
                      {Object.entries(service.usage).map(([key, value]) => (
                        <div key={key}>
                          <span className="text-gray-500">{key}: </span>
                          <span className="text-white">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Support Tickets */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Support Tickets</h3>
          <div className="space-y-4">
            {mockSupportTickets.map((ticket) => (
              <div key={ticket.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{ticket.subject}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    ticket.priority === 'high' ? 'bg-red-500/10 text-red-500' :
                    ticket.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-green-500/10 text-green-500'
                  }`}>
                    {ticket.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-2">{ticket.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {new Date(ticket.createdAt).toLocaleString()}
                  </span>
                  <span className={`${
                    ticket.status === 'open' ? 'text-yellow-500' :
                    ticket.status === 'in-progress' ? 'text-cyan-500' :
                    'text-green-500'
                  }`}>
                    {ticket.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Alerts */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">System Alerts</h3>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div 
              key={alert.id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer"
              onClick={() => setSelectedAlert(alert)}
            >
              <div className="p-2 bg-gray-700 rounded-lg">
                <AlertCircle className={`h-4 w-4 ${
                  alert.type === 'warning' ? 'text-yellow-500' :
                  alert.type === 'error' ? 'text-red-500' :
                  'text-green-500'
                }`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">
                  {alert.title}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {alert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alert Detail Drawer */}
      <AlertDrawer 
        alert={selectedAlert}
        onClose={() => setSelectedAlert(null)}
      />

      {/* AI Assistant */}
      <AIAssistant
        show={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
        context={selectedMetric}
      />
    </div>
  );
}