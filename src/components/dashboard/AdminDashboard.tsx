import React from 'react';
import { 
  Users,
  BarChart,
  Activity,
  Bell,
  Settings,
  Shield,
  Cloud,
  Database
} from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      {/* Sidebar */}
      <aside className="fixed left-0 top-16 h-full w-64 bg-gray-800 p-4">
        <nav className="space-y-2">
          <a href="#" className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-700 rounded-lg">
            <BarChart className="h-5 w-5" />
            <span>Overview</span>
          </a>
          <a href="#" className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-700 rounded-lg">
            <Users className="h-5 w-5" />
            <span>Customers</span>
          </a>
          <a href="#" className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-700 rounded-lg">
            <Activity className="h-5 w-5" />
            <span>Service Requests</span>
          </a>
          <a href="#" className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-700 rounded-lg">
            <Shield className="h-5 w-5" />
            <span>Security</span>
          </a>
          <a href="#" className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-700 rounded-lg">
            <Cloud className="h-5 w-5" />
            <span>Cloud Services</span>
          </a>
          <a href="#" className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-700 rounded-lg">
            <Database className="h-5 w-5" />
            <span>Resources</span>
          </a>
          <a href="#" className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-700 rounded-lg">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Customer Overview */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">Customer Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Customers</span>
                <span className="text-cyan-500">150</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Active Subscriptions</span>
                <span className="text-green-500">125</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Trial Users</span>
                <span className="text-yellow-500">25</span>
              </div>
            </div>
          </div>

          {/* Service Metrics */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">Service Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Active Services</span>
                <span className="text-cyan-500">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Pending Requests</span>
                <span className="text-yellow-500">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Completed Today</span>
                <span className="text-green-500">15</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-4">
              <button className="w-full py-2 px-4 bg-cyan-500 text-black rounded hover:bg-cyan-400 transition-colors">
                Add New Customer
              </button>
              <button className="w-full py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors">
                View Service Requests
              </button>
              <button className="w-full py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors">
                Generate Reports
              </button>
            </div>
          </div>

          {/* Available Services */}
          <div className="col-span-full bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">Available Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* SOC Service */}
              <div className="bg-gray-700 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">SOC as a Service</h4>
                  <Shield className="h-6 w-6 text-cyan-500" />
                </div>
                <p className="text-gray-400 mb-4">24/7 Security Operations Center monitoring and incident response</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Active Customers:</span>
                    <span className="text-cyan-500">45</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Monthly Revenue:</span>
                    <span className="text-green-500">$67,500</span>
                  </div>
                </div>
                <button className="mt-4 w-full py-2 px-4 bg-cyan-500 text-black rounded hover:bg-cyan-400 transition-colors">
                  Manage Service
                </button>
              </div>

              {/* IT Support */}
              <div className="bg-gray-700 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">IT Support</h4>
                  <Settings className="h-6 w-6 text-cyan-500" />
                </div>
                <p className="text-gray-400 mb-4">Enterprise IT support and infrastructure management</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Active Customers:</span>
                    <span className="text-cyan-500">78</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Monthly Revenue:</span>
                    <span className="text-green-500">$156,000</span>
                  </div>
                </div>
                <button className="mt-4 w-full py-2 px-4 bg-cyan-500 text-black rounded hover:bg-cyan-400 transition-colors">
                  Manage Service
                </button>
              </div>

              {/* Cloud Management */}
              <div className="bg-gray-700 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">Cloud Management</h4>
                  <Cloud className="h-6 w-6 text-cyan-500" />
                </div>
                <p className="text-gray-400 mb-4">Cloud infrastructure and optimization services</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Active Customers:</span>
                    <span className="text-cyan-500">32</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Monthly Revenue:</span>
                    <span className="text-green-500">$96,000</span>
                  </div>
                </div>
                <button className="mt-4 w-full py-2 px-4 bg-cyan-500 text-black rounded hover:bg-cyan-400 transition-colors">
                  Manage Service
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="col-span-full bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Activity className="h-5 w-5 text-cyan-500" />
                  <div>
                    <p className="text-white">New customer onboarding</p>
                    <p className="text-sm text-gray-400">TechCorp Industries</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Bell className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-white">Security Alert</p>
                    <p className="text-sm text-gray-400">Unusual network activity detected</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">4 hours ago</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Database className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-white">System Update Completed</p>
                    <p className="text-sm text-gray-400">Cloud infrastructure maintenance</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}