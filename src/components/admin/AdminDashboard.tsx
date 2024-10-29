import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { 
  Users, BarChart, Activity, Bell, Settings, 
  Shield, Cloud, Database, LogOut, Building
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AdminOverview from './AdminOverview';
import UserManagement from './UserManagement';
import CompanyManagement from './CompanyManagement';
import ServiceManagement from './ServiceManagement';
import SystemSettings from './settings/SystemSettings';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { icon: BarChart, label: 'Overview', path: '/admin/dashboard' },
    { icon: Building, label: 'Companies', path: '/admin/dashboard/companies' },
    { icon: Users, label: 'Users', path: '/admin/dashboard/users' },
    { icon: Shield, label: 'Services', path: '/admin/dashboard/services' },
    { icon: Activity, label: 'Activity', path: '/admin/dashboard/activity' },
    { icon: Bell, label: 'Notifications', path: '/admin/dashboard/notifications' },
    { icon: Settings, label: 'Settings', path: '/admin/dashboard/settings' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-gray-800 border-b border-gray-700 z-50">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8 text-cyan-500" />
            <span className="text-xl font-bold text-white">Admin Portal</span>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-gray-800 border-r border-gray-700 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-cyan-500/10 text-cyan-500'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-4 py-3 text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 pt-16 min-h-screen">
        <div className="p-8 max-w-7xl mx-auto">
          <Routes>
            <Route index element={<AdminOverview />} />
            <Route path="companies" element={<CompanyManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="services" element={<ServiceManagement />} />
            <Route path="settings" element={<SystemSettings />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}