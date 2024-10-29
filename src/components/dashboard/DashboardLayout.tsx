import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  BarChart, 
  Activity, 
  MessageSquare, 
  FileText, 
  Settings,
  Receipt,
  Shield,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { icon: BarChart, label: 'Dashboard', path: '/dashboard' },
  { icon: Shield, label: 'Services', path: '/dashboard/services' },
  { icon: Receipt, label: 'Invoices', path: '/dashboard/invoices' },
  { icon: Activity, label: 'Service Requests', path: '/dashboard/requests' },
  { icon: MessageSquare, label: 'Support Chat', path: '/dashboard/support' },
  { icon: FileText, label: 'Documents', path: '/dashboard/documents' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' }
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="h-16"></div>
      
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-gray-800 overflow-y-auto">
          <div className="p-4 border-b border-gray-700">
            <p className="text-white font-medium">{user?.name}</p>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>

          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200 ${
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
              className="flex items-center space-x-2 p-2 w-full rounded-lg text-red-400 hover:bg-gray-700 transition-colors duration-200"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 ml-64 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}