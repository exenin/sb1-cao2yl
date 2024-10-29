import React from 'react';
import { 
  BarChart3, 
  Activity, 
  FileText, 
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';

export default function DashboardHome() {
  const { metrics, recentActivity, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-700 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Total Services</p>
              <p className="text-2xl font-bold text-white">{metrics.totalServices}</p>
            </div>
            <div className="p-3 bg-cyan-500/10 rounded-lg">
              <BarChart3 className="h-6 w-6 text-cyan-500" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Active Requests</p>
              <p className="text-2xl font-bold text-white">{metrics.activeRequests}</p>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <Activity className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Unpaid Invoices</p>
              <p className="text-2xl font-bold text-white">{metrics.unpaidInvoices}</p>
            </div>
            <div className="p-3 bg-red-500/10 rounded-lg">
              <FileText className="h-6 w-6 text-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Monthly Spending</p>
              <p className="text-2xl font-bold text-white">
                R{metrics.monthlySpending.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity) => {
            const Icon = activity.type === 'service' ? CheckCircle2 :
                        activity.type === 'request' ? Clock :
                        AlertCircle;
            
            return (
              <div 
                key={activity.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-700/50 transition-colors"
              >
                <div className="p-2 bg-gray-700 rounded-lg">
                  <Icon className="h-4 w-4 text-cyan-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}